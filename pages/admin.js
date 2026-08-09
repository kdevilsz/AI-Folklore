export async function renderAdmin(container) {
    container.innerHTML = `
        <h1 class="page-title">Admin Dashboard</h1>
        <p class="page-subtitle">Manage lore, monitor indexing, and verify schema integrity.</p>
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p style="color:var(--primary);">Connecting to admin console...</p>
        </div>
    `;

    // Inject inline styles for Admin page if not present
    if (!document.getElementById('admin-styles')) {
        const style = document.createElement('style');
        style.id = 'admin-styles';
        style.innerHTML = `
            .admin-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
            .stat-card { background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; text-align: center; }
            .stat-card h3 { margin: 0 0 0.5rem 0; font-size: 2rem; color: var(--primary); }
            .stat-card p { margin: 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
            .admin-table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem; }
            .admin-table th, .admin-table td { padding: 1rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); }
            .admin-table th { color: var(--primary); font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
            .admin-table tr:hover { background: rgba(230, 200, 106, 0.05); }
            .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.8rem; border-radius: 4px; cursor: pointer; border: 1px solid transparent; transition: all 0.2s ease; background: transparent; }
            .btn-edit { color: var(--primary); border-color: var(--primary); }
            .btn-edit:hover { background: var(--primary); color: #000; }
            .btn-delete { color: #ff6b6b; border-color: #ff6b6b; }
            .btn-delete:hover { background: #ff6b6b; color: #fff; }
            .admin-modal-backdrop { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
            .admin-modal { background: var(--bg-dark); border: 1px solid var(--primary); border-radius: 12px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; padding: 2rem; box-shadow: 0 10px 50px rgba(0,0,0,0.5); }
            .form-group { margin-bottom: 1rem; }
            .form-group label { display: block; margin-bottom: 0.5rem; color: var(--primary); font-size: 0.9rem; }
            .form-group input, .form-group textarea { width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text); font-family: inherit; }
            .form-group textarea { resize: vertical; min-height: 100px; }
        `;
        document.head.appendChild(style);
    }

    const API_URL = 'http://127.0.0.1:8000/api/admin';

    async function loadPendingSubmissions() {
        let subs = [];
        
        // 1. Local Storage
        const mockSubs = JSON.parse(localStorage.getItem('mock_submissions') || '[]');
        subs = [...mockSubs];

        // 2. Firestore
        try {
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
            const { getFirestore, collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
            const firebaseConfig = window.firebaseConfig || {
                projectId: "lorebridge-placeholder",
                storageBucket: "lorebridge-placeholder.appspot.com"
            };
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const querySnapshot = await getDocs(collection(db, "pending_submissions"));
            querySnapshot.forEach((doc) => {
                const subData = doc.data();
                // Avoid duplicating if we mock wrote it
                if (!subs.some(s => s.uid === subData.uid && s.timestamp === subData.timestamp)) {
                    subs.push({ firestoreId: doc.id, ...subData });
                }
            });
        } catch (e) {
            console.warn("Could not fetch submissions from Firestore, showing local mocks only.", e);
        }
        
        return subs;
    }

    async function loadDashboard() {
        try {
            const [statusRes, dataRes, analyticsRes] = await Promise.all([
                fetch(`${API_URL}/status`),
                fetch(`${API_URL}/data`),
                fetch(`${API_URL}/analytics`)
            ]);
            
            if (!statusRes.ok || !dataRes.ok || !analyticsRes.ok) throw new Error("API Error");

            const status = await statusRes.json();
            const data = await dataRes.json();
            const analytics = await analyticsRes.json();

            renderDashboard(status, data, analytics);
        } catch (e) {
            container.innerHTML = `
                <h1 class="page-title">Admin Dashboard</h1>
                <div class="error-state">
                    <div class="error-icon">⚠️</div>
                    <h2>Connection Failed</h2>
                    <p>Could not connect to the FastAPI Admin endpoints.</p>
                </div>
            `;
        }
    }

    function renderDashboard(status, data, analytics) {
        window.adminData = data; // store globally for modal access
        
        let ftRows = data.folktales.map(ft => `
            <tr>
                <td>${ft.id}</td>
                <td style="font-weight: 500;">${ft.title}</td>
                <td><span class="badge">${ft.source || 'Oral Tradition'}</span></td>
                <td>
                    <button class="btn-sm btn-edit" onclick="window.openFolktaleModal('${ft.id}')">Edit</button>
                    <button class="btn-sm btn-delete" onclick="window.deleteItem('folktale', '${ft.id}')">Delete</button>
                </td>
            </tr>
        `).join('');

        let prRows = data.proverbs.map(pr => `
            <tr>
                <td>${pr.id}</td>
                <td style="font-weight: 500;">${pr.proverb}</td>
                <td><span class="badge">${pr.source || 'Oral Tradition'}</span></td>
                <td>
                    <button class="btn-sm btn-edit" onclick="window.openProverbModal('${pr.id}')">Edit</button>
                    <button class="btn-sm btn-delete" onclick="window.deleteItem('proverb', '${pr.id}')">Delete</button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = `
            <h1 class="page-title">Admin Dashboard</h1>
            <p class="page-subtitle">Manage lore, monitor indexing, and verify schema integrity.</p>

            <div class="admin-stats">
                <div class="stat-card">
                    <h3>${data.folktales.length}</h3>
                    <p>Folktales</p>
                </div>
                <div class="stat-card">
                    <h3>${data.proverbs.length}</h3>
                    <p>Proverbs</p>
                </div>
                <div class="stat-card" style="border-color: ${status.folktales_valid && status.proverbs_valid ? '#4ade80' : '#ff6b6b'};">
                    <h3 style="color: ${status.folktales_valid && status.proverbs_valid ? '#4ade80' : '#ff6b6b'};">
                        ${status.folktales_valid && status.proverbs_valid ? 'PASS' : 'FAIL'}
                    </h3>
                    <p>Schema Integrity</p>
                </div>
                <div class="stat-card">
                    <h3>${status.vector_count}</h3>
                    <p>Pinecone Vectors</p>
                </div>
            </div>

            <div class="card" style="margin-bottom: 2rem;">
                <h4 style="margin: 0 0 1rem 0;">System Analytics</h4>
                <div class="admin-stats" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
                    <div class="stat-card">
                        <h3 style="font-size: 1.5rem;">${analytics.total_sources}</h3>
                        <p>Total Sources</p>
                    </div>
                    <div class="stat-card">
                        <h3 style="font-size: 1.5rem;">${analytics.retrieval_success_rate}%</h3>
                        <p>RAG Success Rate</p>
                    </div>
                    <div class="stat-card">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.2rem;">${analytics.most_searched_themes.length ? analytics.most_searched_themes.join(', ') : 'None yet'}</h3>
                        <p>Top Themes</p>
                    </div>
                </div>
                <div style="margin-top: 1.5rem;">
                    <h5>Most Viewed Stories</h5>
                    <ul style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem; padding-left: 1.2rem;">
                        ${analytics.most_viewed_stories.map(v => `<li><strong>${v.title}</strong> - ${v.views} views</li>`).join('') || '<li>No views yet</li>'}
                    </ul>
                </div>
            </div>

            <!-- Pending Submissions -->
            <div class="card" style="margin-bottom: 2rem; border: 1px solid var(--primary); background: rgba(230, 200, 106, 0.01);">
                <h4 style="color: var(--primary); margin: 0 0 1.2rem 0; font-family: 'Playfair Display', serif; font-size: 1.3rem; display: flex; align-items: center; gap: 8px;">
                    <span>📥</span> Pending Community Submissions
                </h4>
                <div id="pending-submissions-container">
                    <p style="color: var(--text-muted); font-size: 0.9rem; font-style: italic;">Loading submissions...</p>
                </div>
            </div>

            <div class="card" style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="margin: 0;">Folktales Database</h4>
                    <button class="btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.85rem;" onclick="window.openFolktaleModal()">+ Add Folktale</button>
                </div>
                <div style="overflow-x: auto;">
                    <table class="admin-table">
                        <thead><tr><th>ID</th><th>Title</th><th>Source</th><th>Actions</th></tr></thead>
                        <tbody>${ftRows}</tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="margin: 0;">Proverbs Database</h4>
                    <button class="btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.85rem;" onclick="window.openProverbModal()">+ Add Proverb</button>
                </div>
                <div style="overflow-x: auto;">
                    <table class="admin-table">
                        <thead><tr><th>ID</th><th>Proverb</th><th>Source</th><th>Actions</th></tr></thead>
                        <tbody>${prRows}</tbody>
                    </table>
                </div>
            </div>
            <div id="modal-container"></div>
        `;

        window.loadAndRenderPendingSubmissions();
    }

    window.closeModal = () => {
        document.getElementById('modal-container').innerHTML = '';
        window.pendingContributor = null;
        window.activePendingIds = null;
    };

    window.openFolktaleModal = (id = null, prefSub = null, fId = '', lId = '') => {
        let ft = id ? window.adminData.folktales.find(f => f.id === id) : {};
        const isEdit = !!id;
        
        window.activePendingIds = (fId || lId) ? { fId, lId } : null;

        if (prefSub) {
            ft = {
                title: `${prefSub.title_en} (${prefSub.title_as})`,
                summary: prefSub.content_en,
                moral: prefSub.moral,
                source: "Oral Tradition",
                cultural_significance: `A community folktale submitted by ${prefSub.contributor_name} from ${prefSub.village ? prefSub.village + ', ' : ''}${prefSub.district} district.`,
                verified: true
            };
            window.pendingContributor = {
                name: prefSub.contributor_name,
                village: prefSub.village || "",
                district: prefSub.district,
                date_submitted: prefSub.submission_date,
                approved: true
            };
        }

        const html = `
            <div class="admin-modal-backdrop">
                <div class="admin-modal">
                    <h2 style="color: var(--primary); margin-top: 0;">${isEdit ? 'Edit Folktale' : (prefSub ? 'Approve Community Folktale' : 'Add Folktale')}</h2>
                    <form id="ft-form" onsubmit="window.saveFolktale(event, '${id || ''}')">
                        <div class="form-group"><label>Title</label><input type="text" name="title" value="${ft.title || ''}" required></div>
                        <div class="form-group"><label>Summary</label><textarea name="summary" required>${ft.summary || ''}</textarea></div>
                        <div class="form-group"><label>Moral</label><input type="text" name="moral" value="${ft.moral || ''}" required></div>
                        <div class="form-group"><label>Source</label><input type="text" name="source" value="${ft.source || 'Oral Tradition'}"></div>
                        <div class="form-group"><label>Characters (comma separated)</label><input type="text" name="characters" value="${ft.characters ? ft.characters.join(', ') : ''}"></div>
                        <div class="form-group"><label>Themes (comma separated)</label><input type="text" name="themes" value="${ft.themes ? ft.themes.join(', ') : ''}"></div>
                        <div class="form-group"><label>Cultural Significance</label><textarea name="cultural_significance">${ft.cultural_significance || ''}</textarea></div>
                        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" name="verified" id="ft-verified" style="width: auto;" ${ft.verified ? 'checked' : ''}>
                            <label for="ft-verified" style="margin: 0; color: #4ade80;">Verified (Ready for Production)</label>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button type="button" class="btn-primary" style="background: transparent; color: var(--text); border: 1px solid var(--border);" onclick="window.closeModal()">Cancel</button>
                            <button type="submit" class="btn-primary" style="flex: 1;">Save & Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('modal-container').innerHTML = html;
    };

    window.saveFolktale = async (e, id) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = {
            title: fd.get('title'),
            summary: fd.get('summary'),
            moral: fd.get('moral'),
            source: fd.get('source'),
            cultural_significance: fd.get('cultural_significance'),
            characters: fd.get('characters').split(',').map(s => s.trim()).filter(s => s),
            themes: fd.get('themes').split(',').map(s => s.trim()).filter(s => s),
            verified: fd.get('verified') === 'on',
            contributor: window.pendingContributor || null
        };
        
        try {
            let url = `${API_URL}/folktale`;
            let method = 'POST';
            if (id) {
                url += `/${id}`;
                method = 'PUT';
            }
            const res = await fetch(url, {
                method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
            });
            if (res.ok) {
                if (window.activePendingIds) {
                    await window.deletePendingSubmission(window.activePendingIds.fId, window.activePendingIds.lId);
                }
                window.closeModal(); 
                loadDashboard(); 
            } else {
                alert("Failed to save");
            }
        } catch (err) { alert("Error saving folktale."); }
    };

    window.openProverbModal = (id = null, prefSub = null, fId = '', lId = '') => {
        let pr = id ? window.adminData.proverbs.find(p => p.id === id) : {};
        const isEdit = !!id;
        
        window.activePendingIds = (fId || lId) ? { fId, lId } : null;

        if (prefSub) {
            pr = {
                proverb: prefSub.title_as,
                translation: prefSub.title_en,
                meaning: prefSub.content_en,
                source: "Oral Tradition",
                cultural_context: `A community proverb submitted by ${prefSub.contributor_name} from ${prefSub.village ? prefSub.village + ', ' : ''}${prefSub.district} district.`,
                verified: true
            };
            window.pendingContributor = {
                name: prefSub.contributor_name,
                village: prefSub.village || "",
                district: prefSub.district,
                date_submitted: prefSub.submission_date,
                approved: true
            };
        }

        const html = `
            <div class="admin-modal-backdrop">
                <div class="admin-modal">
                    <h2 style="color: var(--primary); margin-top: 0;">${isEdit ? 'Edit Proverb' : (prefSub ? 'Approve Community Proverb' : 'Add Proverb')}</h2>
                    <form id="pr-form" onsubmit="window.saveProverb(event, '${id || ''}')">
                        <div class="form-group"><label>Proverb</label><input type="text" name="proverb" value="${pr.proverb || ''}" required></div>
                        <div class="form-group"><label>Translation</label><input type="text" name="translation" value="${pr.translation || ''}" required></div>
                        <div class="form-group"><label>Meaning</label><textarea name="meaning" required>${pr.meaning || ''}</textarea></div>
                        <div class="form-group"><label>Source</label><input type="text" name="source" value="${pr.source || 'Oral Tradition'}"></div>
                        <div class="form-group"><label>Themes (comma separated)</label><input type="text" name="theme" value="${pr.theme ? pr.theme.join(', ') : ''}"></div>
                        <div class="form-group"><label>Cultural Context</label><textarea name="cultural_context">${pr.cultural_context || ''}</textarea></div>
                        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" name="verified" id="pr-verified" style="width: auto;" ${pr.verified ? 'checked' : ''}>
                            <label for="pr-verified" style="margin: 0; color: #4ade80;">Verified (Ready for Production)</label>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button type="button" class="btn-primary" style="background: transparent; color: var(--text); border: 1px solid var(--border);" onclick="window.closeModal()">Cancel</button>
                            <button type="submit" class="btn-primary" style="flex: 1;">Save & Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('modal-container').innerHTML = html;
    };

    window.saveProverb = async (e, id) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = {
            proverb: fd.get('proverb'),
            translation: fd.get('translation'),
            meaning: fd.get('meaning'),
            source: fd.get('source'),
            cultural_context: fd.get('cultural_context'),
            theme: fd.get('theme').split(',').map(s => s.trim()).filter(s => s),
            verified: fd.get('verified') === 'on',
            contributor: window.pendingContributor || null
        };
        
        try {
            let url = `${API_URL}/proverb`;
            let method = 'POST';
            if (id) {
                url += `/${id}`;
                method = 'PUT';
            }
            const res = await fetch(url, {
                method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
            });
            if (res.ok) {
                if (window.activePendingIds) {
                    await window.deletePendingSubmission(window.activePendingIds.fId, window.activePendingIds.lId);
                }
                window.closeModal(); 
                loadDashboard(); 
            } else {
                alert("Failed to save");
            }
        } catch (err) { alert("Error saving proverb."); }
    };

    window.deleteItem = async (type, id) => {
        if (!confirm(`Are you sure you want to delete ${id}?`)) return;
        try {
            const res = await fetch(`${API_URL}/${type}/${id}`, { method: 'DELETE' });
            if (res.ok) loadDashboard();
            else alert("Failed to delete");
        } catch (e) { alert("Error deleting"); }
    };

    window.loadAndRenderPendingSubmissions = async () => {
        const container = document.getElementById('pending-submissions-container');
        if (!container) return;

        const subs = await loadPendingSubmissions();
        if (subs.length === 0) {
            container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; font-style: italic; margin: 0;">No pending submissions in the moderation queue.</p>`;
            return;
        }

        let rows = subs.map(sub => `
            <tr>
                <td><span class="badge" style="background: rgba(230, 200, 106, 0.05); color: var(--primary);">${sub.type === 'folktale' ? 'Folktale' : 'Proverb'}</span></td>
                <td style="font-weight: 500;">${sub.title_en} (${sub.title_as})</td>
                <td>${sub.contributor_name}</td>
                <td>${sub.village ? sub.village + ', ' : ''}${sub.district}</td>
                <td>
                    <button class="btn-sm btn-edit" style="color: #4ade80; border-color: #4ade80;" onclick="window.approveSubmission('${sub.firestoreId || ''}', '${sub.id || ''}', ${JSON.stringify(sub).replace(/"/g, '&quot;')})">Approve</button>
                    <button class="btn-sm btn-delete" onclick="window.rejectSubmission('${sub.firestoreId || ''}', '${sub.id || ''}')">Reject</button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = `
            <div style="overflow-x: auto;">
                <table class="admin-table" style="margin-top: 0; min-width: 600px;">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Title / Translation</th>
                            <th>Contributor</th>
                            <th>Origin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    };

    window.approveSubmission = (firestoreId, localId, sub) => {
        if (sub.type === 'folktale') {
            window.openFolktaleModal(null, sub, firestoreId, localId);
        } else {
            window.openProverbModal(null, sub, firestoreId, localId);
        }
    };

    window.deletePendingSubmission = async (fId, lId) => {
        if (lId) {
            let mockSubs = JSON.parse(localStorage.getItem('mock_submissions') || '[]');
            mockSubs = mockSubs.filter(s => s.id !== lId);
            localStorage.setItem('mock_submissions', JSON.stringify(mockSubs));
        }
        if (fId) {
            try {
                const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
                const { getFirestore, doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
                const firebaseConfig = window.firebaseConfig || {
                    projectId: "lorebridge-placeholder",
                    storageBucket: "lorebridge-placeholder.appspot.com"
                };
                const app = initializeApp(firebaseConfig);
                const db = getFirestore(app);
                await deleteDoc(doc(db, "pending_submissions", fId));
            } catch (err) {
                console.error("Firebase deletion failed", err);
            }
        }
    };

    window.rejectSubmission = async (fId, lId) => {
        if (!confirm("Are you sure you want to reject and delete this submission?")) return;
        await window.deletePendingSubmission(fId, lId);
        await window.loadAndRenderPendingSubmissions();
    };

    loadDashboard();
}
