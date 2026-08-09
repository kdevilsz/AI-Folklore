// LoreBridge Supabase Authentication Module

let supabaseClient = null;
let currentAuthUser = null;

export function getSupabase() {
    if (supabaseClient) return supabaseClient;
    
    const config = window.LOREBRIDGE_CONFIG || {};
    const url = config.SUPABASE_URL;
    const key = config.SUPABASE_ANON_KEY;

    if (window.supabase && url && key && !url.includes("your-project")) {
        try {
            supabaseClient = window.supabase.createClient(url, key);
            console.log("Supabase Client initialized successfully.");
        } catch (err) {
            console.error("Supabase Client initialization error:", err);
        }
    }
    return supabaseClient;
}

export async function signUp(email, password) {
    const client = getSupabase();
    if (!client) {
        throw new Error("Supabase credentials not configured in js/config.js. Please add your SUPABASE_URL and SUPABASE_ANON_KEY.");
    }
    const { data, error } = await client.auth.signUp({
        email,
        password
    });
    if (error) throw error;
    return data;
}

export async function signIn(email, password) {
    const client = getSupabase();
    if (!client) {
        throw new Error("Supabase credentials not configured in js/config.js. Please add your SUPABASE_URL and SUPABASE_ANON_KEY.");
    }
    const { data, error } = await client.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    return data;
}

export async function signOut() {
    const client = getSupabase();
    if (client) {
        const { error } = await client.auth.signOut();
        if (error) console.error("SignOut error:", error);
    }
    currentAuthUser = null;
    window.currentAuthUser = null;
    updateNavAuthUI(null);
    if (window.location.hash === '#share') {
        const app = document.getElementById('app');
        if (app && window.renderShare) window.renderShare(app);
    }
}

export async function getUser() {
    const client = getSupabase();
    if (!client) return null;
    try {
        const { data: { user } } = await client.auth.getUser();
        currentAuthUser = user;
        window.currentAuthUser = user;
        return user;
    } catch (e) {
        return null;
    }
}

export async function getSession() {
    const client = getSupabase();
    if (!client) return null;
    try {
        const { data: { session } } = await client.auth.getSession();
        return session;
    } catch (e) {
        return null;
    }
}

export function onAuthStateChange(callback) {
    const client = getSupabase();
    if (!client) return { data: { subscription: { unsubscribe: () => {} } } };
    return client.auth.onAuthStateChange((event, session) => {
        const user = session?.user || null;
        currentAuthUser = user;
        window.currentAuthUser = user;
        updateNavAuthUI(user);
        if (callback) callback(event, session);
    });
}

// UI Helpers
export function updateNavAuthUI(user) {
    const container = document.getElementById('nav-auth-container');
    if (!container) return;

    if (user) {
        const displayEmail = user.email || 'User';
        const shortEmail = displayEmail.length > 18 ? displayEmail.substring(0, 15) + '...' : displayEmail;
        container.innerHTML = `
            <div class="nav-user-badge" title="${displayEmail}">
                <span class="user-avatar-icon">👤</span>
                <span class="user-email-text">${shortEmail}</span>
            </div>
            <button class="nav-btn-auth nav-btn-logout" onclick="window.handleSignOut()" title="Sign Out">Sign Out</button>
        `;
    } else {
        container.innerHTML = `
            <button class="nav-btn-auth" onclick="window.openAuthModal('signin')" title="Sign In">Sign In</button>
        `;
    }
}

export function openAuthModal(defaultTab = 'signin') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.add('active');
    switchAuthTab(defaultTab);
    const emailInput = document.getElementById('auth-modal-email');
    if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
    }
}

export function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('active');
    const errBox = document.getElementById('auth-modal-error');
    if (errBox) errBox.style.display = 'none';
    const successBox = document.getElementById('auth-modal-success');
    if (successBox) successBox.style.display = 'none';
}

export function switchAuthTab(tab) {
    const tabSignIn = document.getElementById('tab-btn-signin');
    const tabSignUp = document.getElementById('tab-btn-signup');
    const submitBtn = document.getElementById('auth-modal-submit');
    const title = document.getElementById('auth-modal-title');
    const note = document.getElementById('auth-modal-note');
    const errBox = document.getElementById('auth-modal-error');
    const successBox = document.getElementById('auth-modal-success');

    if (errBox) errBox.style.display = 'none';
    if (successBox) successBox.style.display = 'none';

    if (tab === 'signup') {
        if (tabSignUp) tabSignUp.classList.add('active');
        if (tabSignIn) tabSignIn.classList.remove('active');
        if (submitBtn) submitBtn.innerText = 'Create Account';
        if (title) title.innerText = 'Join LoreBridge';
        if (note) note.innerHTML = 'Already have an account? <a href="javascript:void(0)" onclick="window.switchAuthTab(\'signin\')" style="color:var(--primary);">Sign In</a>';
        const form = document.getElementById('auth-modal-form');
        if (form) form.dataset.mode = 'signup';
    } else {
        if (tabSignIn) tabSignIn.classList.add('active');
        if (tabSignUp) tabSignUp.classList.remove('active');
        if (submitBtn) submitBtn.innerText = 'Sign In';
        if (title) title.innerText = 'Welcome Back';
        if (note) note.innerHTML = 'Don\'t have an account yet? <a href="javascript:void(0)" onclick="window.switchAuthTab(\'signup\')" style="color:var(--primary);">Sign Up</a>';
        const form = document.getElementById('auth-modal-form');
        if (form) form.dataset.mode = 'signin';
    }
}

export async function handleAuthSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('auth-modal-form');
    const email = document.getElementById('auth-modal-email')?.value.trim();
    const password = document.getElementById('auth-modal-password')?.value;
    const submitBtn = document.getElementById('auth-modal-submit');
    const errBox = document.getElementById('auth-modal-error');
    const successBox = document.getElementById('auth-modal-success');
    const mode = form?.dataset.mode || 'signin';

    if (!email || !password) {
        if (errBox) {
            errBox.innerText = 'Please enter both email and password.';
            errBox.style.display = 'block';
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (successBox) successBox.style.display = 'none';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner" style="width:16px; height:16px; border-width:2px; display:inline-block; vertical-align:middle; margin-right:8px;"></span> Processing...';
    }

    try {
        if (mode === 'signup') {
            const data = await signUp(email, password);
            if (successBox) {
                if (data.session) {
                    successBox.innerText = 'Account created successfully! Welcome to LoreBridge.';
                    successBox.style.display = 'block';
                    setTimeout(() => {
                        closeAuthModal();
                        if (window.location.hash === '#share') {
                            const app = document.getElementById('app');
                            if (app && window.renderShare) window.renderShare(app);
                        }
                    }, 1000);
                } else {
                    successBox.innerText = 'Account created! Please check your email to confirm your registration.';
                    successBox.style.display = 'block';
                }
            }
        } else {
            await signIn(email, password);
            if (successBox) {
                successBox.innerText = 'Signed in successfully! Welcome back.';
                successBox.style.display = 'block';
            }
            setTimeout(() => {
                closeAuthModal();
                if (window.location.hash === '#share') {
                    const app = document.getElementById('app');
                    if (app && window.renderShare) window.renderShare(app);
                }
            }, 800);
        }
    } catch (err) {
        console.error("Auth error:", err);
        if (errBox) {
            errBox.innerText = err.message || 'Authentication failed. Please check your credentials.';
            errBox.style.display = 'block';
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = mode === 'signup' ? 'Create Account' : 'Sign In';
        }
    }
}

// Global Exports
window.getSupabase = getSupabase;
window.signUp = signUp;
window.signIn = signIn;
window.handleSignOut = signOut;
window.getSupabaseUser = getUser;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.handleAuthSubmit = handleAuthSubmit;
window.updateNavAuthUI = updateNavAuthUI;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Initial check
    const user = await getUser();
    updateNavAuthUI(user);
    onAuthStateChange((event, session) => {
        updateNavAuthUI(session?.user || null);
    });

    // Close on backdrop click
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAuthModal();
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAuthModal();
    });
});
