const districts = [
    "Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
    "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", 
    "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", 
    "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", 
    "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", 
    "Tinsukia", "Udalguri", "West Karbi Anglong", "Tamulpur"
].sort();

export async function renderShare(container) {
    // Show loader
    container.innerHTML = `
        <h1 class="page-title">Share Your Story</h1>
        <p class="page-subtitle">Contribute to LoreBridge and preserve our cultural heritage.</p>
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p style="color:var(--primary);">Initializing authentication portal...</p>
        </div>
    `;

    try {
        const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
        const { getAuth, onAuthStateChanged } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js");
        const { getFirestore } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
        
        const firebaseConfig = window.firebaseConfig || {
            projectId: "lorebridge-placeholder",
            storageBucket: "lorebridge-placeholder.appspot.com"
        };
        
        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const db = getFirestore(app);

        onAuthStateChanged(auth, (user) => {
            if (user) {
                renderSubmissionForm(container, user, db, auth);
            } else {
                renderLoginForm(container, auth);
            }
        });
    } catch (e) {
        console.warn("Firebase Auth load failed, falling back to mock guest mode.", e);
        // Fallback for offline/test mode: render submission form directly with a "Guest Mode" note
        renderSubmissionForm(container, { email: "guest@lorebridge.org", uid: "mock-uid" }, null, null, true);
    }
}

function renderLoginForm(container, auth) {
    container.innerHTML = `
        <h1 class="page-title">Share Your Story</h1>
        <p class="page-subtitle">Contribute to LoreBridge and preserve our cultural heritage.</p>
        
        <div class="card" style="max-width: 450px; margin: 0 auto; text-align: left; border: 1px solid var(--primary); padding: 2.5rem 2rem;">
            <h3 style="color: var(--primary); font-family: 'Playfair Display', serif; margin-top: 0; text-align: center; margin-bottom: 1.5rem; font-size: 1.6rem;">Portal Authentication</h3>
            
            <div id="auth-error" style="color: #ff6b6b; font-size: 0.9rem; margin-bottom: 1.2rem; text-align: center; display: none; padding: 0.5rem; background: rgba(255, 107, 107, 0.05); border: 1px dashed rgba(255, 107, 107, 0.2); border-radius: 6px;"></div>
            
            <form id="login-form">
                <div class="form-group" style="margin-bottom: 1.2rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem; letter-spacing: 0.5px;">Email Address</label>
                    <input type="email" id="auth-email" required placeholder="e.g. yourname@email.com" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>
                <div class="form-group" style="margin-bottom: 1.8rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem; letter-spacing: 0.5px;">Password</label>
                    <input type="password" id="auth-password" required placeholder="••••••••" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>
                
                <div style="display: flex; flex-direction: column; gap: 0.8rem;">
                    <button type="submit" id="btn-login" class="btn-primary" style="width: 100%; padding: 0.8rem;">Sign In</button>
                    <button type="button" id="btn-signup" class="btn-primary" style="width: 100%; padding: 0.8rem; background: transparent; border: 1px solid var(--border); color: var(--text-muted);">Create Account</button>
                    
                    <div style="display: flex; align-items: center; justify-content: center; gap: 10px; margin: 0.5rem 0;">
                        <span style="height: 1px; background: var(--border); flex: 1;"></span>
                        <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase;">Or</span>
                        <span style="height: 1px; background: var(--border); flex: 1;"></span>
                    </div>
                    
                    <button type="button" id="btn-demo" class="btn-primary" style="width: 100%; padding: 0.8rem; background: rgba(230, 200, 106, 0.05); border: 1px dashed var(--primary); color: var(--primary);">Bypass / Demo Login</button>
                </div>
            </form>
        </div>
    `;

    const form = document.getElementById('login-form');
    const emailInput = document.getElementById('auth-email');
    const passInput = document.getElementById('auth-password');
    const loginBtn = document.getElementById('btn-login');
    const signupBtn = document.getElementById('btn-signup');
    const demoBtn = document.getElementById('btn-demo');
    const errorDiv = document.getElementById('auth-error');

    form.onsubmit = async (e) => {
        e.preventDefault();
        loginBtn.disabled = true;
        loginBtn.innerText = 'Signing In...';
        errorDiv.style.display = 'none';

        try {
            await auth.signInWithEmailAndPassword(emailInput.value, passInput.value);
        } catch (err) {
            console.error(err);
            errorDiv.innerText = err.message;
            errorDiv.style.display = 'block';
            loginBtn.disabled = false;
            loginBtn.innerText = 'Sign In';
        }
    };

    signupBtn.onclick = async () => {
        if (!emailInput.value || !passInput.value) {
            errorDiv.innerText = "Please fill in Email and Password to sign up.";
            errorDiv.style.display = 'block';
            return;
        }
        signupBtn.disabled = true;
        signupBtn.innerText = 'Creating Account...';
        errorDiv.style.display = 'none';

        try {
            await auth.createUserWithEmailAndPassword(emailInput.value, passInput.value);
        } catch (err) {
            console.error(err);
            errorDiv.innerText = err.message;
            errorDiv.style.display = 'block';
            signupBtn.disabled = false;
            signupBtn.innerText = 'Create Account';
        }
    };

    demoBtn.onclick = () => {
        auth.signInAnonymously().catch(err => {
            console.warn("Anonymous auth failed, fallback to mock guest", err);
            renderSubmissionForm(container, { email: "demo-user@lorebridge.org", uid: "demo-uid" }, null, null, true);
        });
    };
}

function renderSubmissionForm(container, user, db, auth, isGuest = false) {
    const todayStr = new Date().toISOString().split('T')[0];
    
    container.innerHTML = `
        <h1 class="page-title">Share Your Story</h1>
        <p class="page-subtitle">Contribute to LoreBridge and preserve our cultural heritage.</p>

        <!-- User Header Info -->
        <div style="max-width: 600px; margin: 0 auto 1.5rem auto; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--text-muted);">
            <div>
                <span>Logged in as: <strong>${user.email || 'Anonymous Contributor'}</strong></span>
                ${isGuest ? '<span style="color: var(--primary); margin-left: 5px;">(Demo Guest Mode)</span>' : ''}
            </div>
            ${auth ? `<button class="btn-primary" style="padding: 0.3rem 0.8rem; font-size: 0.75rem; border-radius: 4px; background: transparent; border: 1px solid var(--border); color: var(--text-muted);" onclick="window.shareSignOut()">Sign Out</button>` : ''}
        </div>

        <div class="card" style="max-width: 600px; margin: 0 auto; text-align: left;">
            <form id="share-form">
                <!-- Type Selection -->
                <div class="form-group" style="margin-bottom: 1.5rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-weight: 500;">Type of Submission *</label>
                    <select id="share-type" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: #0a0f0d; color: var(--text); font-family: inherit;">
                        <option value="folktale">Folktale / Story</option>
                        <option value="proverb">Proverb / Wisdom</option>
                    </select>
                </div>

                <!-- Title Fields -->
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label id="label-title-en" style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Story Title (English) *</label>
                    <input type="text" id="share-title-en" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>
                
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label id="label-title-as" style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Story Title (Assamese Script) *</label>
                    <input type="text" id="share-title-as" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <!-- Content Fields -->
                <div class="form-group" style="margin-bottom: 1rem;">
                    <label id="label-content-en" style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Story Content (English) *</label>
                    <textarea id="share-content-en" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text); min-height: 120px;"></textarea>
                </div>

                <div class="form-group" id="group-content-as" style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Story Content (Assamese Script) - Optional</label>
                    <textarea id="share-content-as" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text); min-height: 120px;"></textarea>
                </div>

                <!-- Moral Field (Only for Folktales) -->
                <div class="form-group" id="group-moral" style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Moral of the Story *</label>
                    <input type="text" id="share-moral" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <!-- Contributor Details -->
                <div style="border-top: 1px dashed var(--border); margin: 2rem 0 1rem 0; padding-top: 1.5rem;">
                    <h4 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.2rem;">Contributor Identity</h4>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Contributor Full Name *</label>
                    <input type="text" id="share-name" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Submitter Email Address *</label>
                    <input type="email" id="share-email" required value="${user.email || ''}" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Village Name (Optional)</label>
                    <input type="text" id="share-village" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem;">District *</label>
                    <select id="share-district" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: #0a0f0d; color: var(--text); font-family: inherit;">
                        <option value="" disabled selected>Select your district</option>
                        ${districts.map(d => `<option value="${d}">${d}</option>`).join('')}
                    </select>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem;">How did you hear this story/proverb? *</label>
                    <select id="share-heard-from" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: #0a0f0d; color: var(--text); font-family: inherit;">
                        <option value="" disabled selected>Select an option</option>
                        <option value="From a grandparent">From a grandparent</option>
                        <option value="From a teacher">From a teacher</option>
                        <option value="From a book">From a book</option>
                        <option value="Community event">Community event</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div class="form-group" style="margin-bottom: 1rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem;">Submission Date</label>
                    <input type="date" id="share-date" readonly value="${todayStr}" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.5); color: var(--text-muted); cursor: not-allowed;">
                </div>

                <div class="form-group" style="margin-bottom: 2rem; display: flex; align-items: center; gap: 0.5rem;">
                    <input type="checkbox" id="share-confirm" required style="width: auto;">
                    <label for="share-confirm" style="color: var(--text-muted); font-size: 0.9rem; margin: 0;">I confirm this is authentic Assamese folklore/proverb</label>
                </div>

                <button type="submit" class="btn-primary" id="share-submit-btn" style="width: 100%; padding: 1rem; font-size: 1.1rem;">Submit for Review</button>
                <div id="share-message" style="margin-top: 1.5rem; text-align: center; color: #4ade80; display: none; padding: 1rem; border-radius: 8px; background: rgba(74, 222, 128, 0.05); border: 1px solid rgba(74, 222, 128, 0.2); line-height: 1.5;"></div>
            </form>
        </div>
    `;

    // Global signout handler
    window.shareSignOut = () => {
        if (auth) auth.signOut();
    };

    const typeSelect = document.getElementById('share-type');
    const labelTitleEn = document.getElementById('label-title-en');
    const labelTitleAs = document.getElementById('label-title-as');
    const labelContentEn = document.getElementById('label-content-en');
    const groupContentAs = document.getElementById('group-content-as');
    const groupMoral = document.getElementById('group-moral');
    const inputMoral = document.getElementById('share-moral');

    typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;
        if (type === 'proverb') {
            labelTitleEn.innerText = "Proverb Translation (English) *";
            labelTitleAs.innerText = "Proverb Text (Assamese Script) *";
            labelContentEn.innerText = "Proverb Meaning / Cultural Explanation *";
            groupContentAs.style.display = 'none';
            groupMoral.style.display = 'none';
            inputMoral.removeAttribute('required');
        } else {
            labelTitleEn.innerText = "Story Title (English) *";
            labelTitleAs.innerText = "Story Title (Assamese Script) *";
            labelContentEn.innerText = "Story Content (English) *";
            groupContentAs.style.display = 'block';
            groupMoral.style.display = 'block';
            inputMoral.setAttribute('required', 'required');
        }
    });

    document.getElementById('share-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('share-submit-btn');
        const msg = document.getElementById('share-message');
        
        btn.disabled = true;
        btn.innerText = 'Submitting...';
        msg.style.display = 'none';

        const submitType = typeSelect.value;

        const data = {
            type: submitType,
            title_en: document.getElementById('share-title-en').value,
            title_as: document.getElementById('share-title-as').value,
            content_en: document.getElementById('share-content-en').value,
            content_as: submitType === 'folktale' ? document.getElementById('share-content-as').value : '',
            moral: submitType === 'folktale' ? document.getElementById('share-moral').value : '',
            contributor_name: document.getElementById('share-name').value,
            submitter_email: document.getElementById('share-email').value,
            village: document.getElementById('share-village').value,
            district: document.getElementById('share-district').value,
            heard_from: document.getElementById('share-heard-from').value,
            submission_date: document.getElementById('share-date').value,
            confidence: "community",
            uid: user.uid || "guest",
            timestamp: new Date().toISOString()
        };

        if (db) {
            try {
                const { collection, addDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
                await addDoc(collection(db, "pending_submissions"), data);
                
                document.getElementById('share-form').reset();
                document.getElementById('share-date').value = todayStr;
                typeSelect.dispatchEvent(new Event('change'));

                msg.style.color = '#4ade80';
                msg.style.borderColor = 'rgba(74, 222, 128, 0.2)';
                msg.style.backgroundColor = 'rgba(74, 222, 128, 0.05)';
                msg.innerHTML = `<strong>Thank You! Submission Received</strong><br>Your folklore entry has been submitted successfully. It will undergo moderation by the LoreBridge team before appearing in the public collections.`;
                msg.style.display = 'block';
            } catch (err) {
                console.error("Firestore write error:", err);
                msg.style.color = '#ff6b6b';
                msg.style.borderColor = 'rgba(255, 107, 107, 0.2)';
                msg.style.backgroundColor = 'rgba(255, 107, 107, 0.05)';
                msg.innerText = 'Database write failed. Technical details available in console.';
                msg.style.display = 'block';
            } finally {
                btn.disabled = false;
                btn.innerText = 'Submit for Review';
            }
        } else {
            // Mock local write
            const mockSubs = JSON.parse(localStorage.getItem('mock_submissions') || '[]');
            data.id = 'sub_' + Date.now();
            mockSubs.push(data);
            localStorage.setItem('mock_submissions', JSON.stringify(mockSubs));

            setTimeout(() => {
                document.getElementById('share-form').reset();
                document.getElementById('share-date').value = todayStr;
                typeSelect.dispatchEvent(new Event('change'));

                msg.style.color = '#4ade80';
                msg.style.borderColor = 'rgba(74, 222, 128, 0.2)';
                msg.style.backgroundColor = 'rgba(74, 222, 128, 0.05)';
                msg.innerHTML = `<strong>Thank You! Submission Received (Demo Guest Mode)</strong><br>Your folklore entry has been logged locally in test mode. It has been routed to the pending queue for review.`;
                msg.style.display = 'block';
                btn.disabled = false;
                btn.innerText = 'Submit for Review';
            }, 1000);
        }
    });
}
