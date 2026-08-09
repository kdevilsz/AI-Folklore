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
            <p style="color:var(--primary);">Verifying authentication status...</p>
        </div>
    `;

    // Check user authentication via Supabase
    let user = null;
    if (window.getSupabaseUser) {
        user = await window.getSupabaseUser();
    } else if (window.currentAuthUser) {
        user = window.currentAuthUser;
    }

    if (user) {
        renderSubmissionForm(container, user);
    } else {
        renderAuthRequired(container);
    }
}

function renderAuthRequired(container) {
    container.innerHTML = `
        <h1 class="page-title">Share Your Story</h1>
        <p class="page-subtitle">Contribute to LoreBridge and preserve our cultural heritage.</p>
        
        <div class="card" style="max-width: 580px; margin: 2rem auto; text-align: center; border: 1px solid var(--border); padding: 3rem 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔐</div>
            <h3 style="color: var(--primary); font-family: 'Playfair Display', serif; margin-top: 0; margin-bottom: 1rem; font-size: 1.6rem;">Authentication Required</h3>
            <p style="color: var(--text-muted); font-size: 0.98rem; line-height: 1.7; margin-bottom: 2rem;">
                To ensure authenticity, citation integrity, and community moderation, you must be logged in to share a story or proverb.
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 0.8rem; max-width: 320px; margin: 0 auto;">
                <button type="button" class="btn-primary" onclick="window.openAuthModal('signin')" style="width: 100%;">Sign In</button>
                <button type="button" class="btn-primary" onclick="window.openAuthModal('signup')" style="width: 100%; background: transparent; border: 1px solid var(--primary); color: var(--primary);">Create Free Account</button>
            </div>

            <!-- Assamese Heritage Callout -->
            <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px dashed var(--border); font-size: 0.85rem; color: var(--text-muted);">
                <span style="color: var(--primary);">🎋 Community Archive:</span> Your contributions help preserve endangered oral traditions, regional dialects, and folklore for future generations.
            </div>
        </div>
    `;
}

function renderSubmissionForm(container, user) {
    const todayStr = new Date().toISOString().split('T')[0];
    const userEmail = user.email || '';
    
    container.innerHTML = `
        <h1 class="page-title">Share Your Story</h1>
        <p class="page-subtitle">Contribute to LoreBridge and preserve our cultural heritage.</p>

        <!-- User Header Info -->
        <div style="max-width: 650px; margin: 0 auto 1.5rem auto; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--text-muted); background: rgba(230, 200, 106, 0.05); padding: 0.8rem 1.2rem; border-radius: 10px; border: 1px solid var(--border);">
            <div>
                <span class="user-avatar-icon" style="margin-right: 6px;">👤</span>
                <span>Signed in as: <strong style="color: var(--primary);">${userEmail}</strong></span>
            </div>
            <button class="nav-btn-auth nav-btn-logout" style="padding: 0.3rem 0.8rem; font-size: 0.75rem;" onclick="window.handleSignOut()">Sign Out</button>
        </div>

        <div class="card" style="max-width: 650px; margin: 0 auto; text-align: left;">
            <form id="share-form">
                <!-- Type Selection -->
                <div class="form-group" style="margin-bottom: 1.5rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-weight: 500;">Type of Submission *</label>
                    <select id="share-type" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: #0a0f0d; color: var(--text); font-family: inherit;">
                        <option value="folktale">Folktale / Oral Story (সাধুকথা)</option>
                        <option value="proverb">Proverb / Idiom (ফকৰা-যোজনা)</option>
                    </select>
                </div>

                <!-- Title Fields -->
                <div class="form-group" style="margin-bottom: 1.2rem;">
                    <label id="label-title-en" style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Story Title (English) *</label>
                    <input type="text" id="share-title-en" required placeholder="e.g., The Cunning Fox and the Elephant" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>
                
                <div class="form-group" style="margin-bottom: 1.2rem;">
                    <label id="label-title-as" style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Story Title (Assamese Script) *</label>
                    <input type="text" id="share-title-as" required placeholder="e.g., শিয়াল আৰু হাতীৰ সাধু" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <!-- Content Fields -->
                <div class="form-group" style="margin-bottom: 1.2rem;">
                    <label id="label-content-en" style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Story Content / Meaning (English) *</label>
                    <textarea id="share-content-en" required placeholder="Narrate the full story or the proverb's core meaning..." style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text); min-height: 120px; font-family: inherit;"></textarea>
                </div>

                <div class="form-group" id="group-content-as" style="margin-bottom: 1.2rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Story Content (Assamese Script / Optional)</label>
                    <textarea id="share-content-as" placeholder="সাধুটো অসমীয়াত লিখক..." style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text); min-height: 100px; font-family: inherit;"></textarea>
                </div>

                <div class="form-group" id="group-moral" style="margin-bottom: 1.2rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Moral of the Story *</label>
                    <input type="text" id="share-moral" required placeholder="e.g., True wisdom triumphs over brute force" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <!-- Metadata Fields -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.2rem;" class="two-col-grid">
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Your Name / Submitter *</label>
                        <input type="text" id="share-name" required placeholder="e.g., Ananya Bora" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                    </div>
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Email Address *</label>
                        <input type="email" id="share-email" required value="${userEmail}" readonly style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(255,255,255,0.05); color: var(--text-muted); cursor: not-allowed;">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.2rem;" class="two-col-grid">
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Village / Town (Assam)</label>
                        <input type="text" id="share-village" placeholder="e.g., Sarthebari" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                    </div>
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">District *</label>
                        <select id="share-district" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: #0a0f0d; color: var(--text); font-family: inherit;">
                            <option value="">Select District...</option>
                            ${districts.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.8rem;" class="two-col-grid">
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Who did you hear this from?</label>
                        <input type="text" id="share-heard-from" placeholder="e.g. My grandmother (Kamrup)" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                    </div>
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Submission Date</label>
                        <input type="date" id="share-date" value="${todayStr}" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                    </div>
                </div>

                <!-- Action / Feedback -->
                <div id="share-message" style="margin-bottom: 1.2rem; padding: 1rem; border-radius: 8px; border: 1px solid transparent; display: none; font-size: 0.9rem; line-height: 1.5;"></div>

                <button type="submit" id="share-submit-btn" class="btn-primary" style="width: 100%; padding: 1rem; font-size: 1rem;">
                    Submit Folklore for Archival Review
                </button>
            </form>
        </div>
    `;

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
            labelContentEn.innerText = "Story Content / Meaning (English) *";
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
        btn.innerHTML = '<span class="loading-spinner" style="width:16px; height:16px; border-width:2px; display:inline-block; vertical-align:middle; margin-right:8px;"></span> Submitting to Archives...';
        msg.style.display = 'none';

        const submitType = typeSelect.value;

        const data = {
            type: submitType,
            title_en: document.getElementById('share-title-en').value.trim(),
            title_as: document.getElementById('share-title-as').value.trim(),
            content_en: document.getElementById('share-content-en').value.trim(),
            content_as: submitType === 'folktale' ? document.getElementById('share-content-as').value.trim() : '',
            moral: submitType === 'folktale' ? document.getElementById('share-moral').value.trim() : '',
            contributor_name: document.getElementById('share-name').value.trim(),
            submitter_email: userEmail,
            village: document.getElementById('share-village').value.trim(),
            district: document.getElementById('share-district').value,
            heard_from: document.getElementById('share-heard-from').value.trim(),
            submission_date: document.getElementById('share-date').value,
            confidence: "community",
            user_id: user.id || "anon",
            created_at: new Date().toISOString()
        };

        const supabase = window.getSupabase ? window.getSupabase() : null;

        if (supabase) {
            try {
                const { error } = await supabase.from('submissions').insert([data]);
                if (error) throw error;

                document.getElementById('share-form').reset();
                document.getElementById('share-date').value = todayStr;
                typeSelect.dispatchEvent(new Event('change'));

                msg.style.color = '#4ade80';
                msg.style.borderColor = 'rgba(74, 222, 128, 0.3)';
                msg.style.backgroundColor = 'rgba(74, 222, 128, 0.08)';
                msg.innerHTML = `<strong>✨ Thank You! Submission Received</strong><br>Your folklore entry has been securely saved to the Supabase cultural archives. It will be reviewed by the moderation team before joining the public directory.`;
                msg.style.display = 'block';
            } catch (err) {
                console.warn("Supabase database insert fallback:", err);
                // Fallback to local storage
                saveLocalSubmission(data, msg);
            } finally {
                btn.disabled = false;
                btn.innerText = 'Submit Folklore for Archival Review';
            }
        } else {
            // Local storage fallback for local development / testing
            saveLocalSubmission(data, msg);
            btn.disabled = false;
            btn.innerText = 'Submit Folklore for Archival Review';
        }
    });
}

function saveLocalSubmission(data, msg) {
    const mockSubs = JSON.parse(localStorage.getItem('mock_submissions') || '[]');
    data.id = 'sub_' + Date.now();
    mockSubs.push(data);
    localStorage.setItem('mock_submissions', JSON.stringify(mockSubs));

    document.getElementById('share-form').reset();
    document.getElementById('share-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('share-type').dispatchEvent(new Event('change'));

    msg.style.color = '#4ade80';
    msg.style.borderColor = 'rgba(74, 222, 128, 0.3)';
    msg.style.backgroundColor = 'rgba(74, 222, 128, 0.08)';
    msg.innerHTML = `<strong>✨ Thank You! Submission Received</strong><br>Your folklore contribution has been recorded in the local queue. Once verified, it will be published to the Lore Web.`;
    msg.style.display = 'block';
}
