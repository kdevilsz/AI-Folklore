export async function renderQuality(container) {
    container.innerHTML = `
        <h1 class="page-title">Dataset Coverage & Quality</h1>
        <p class="page-subtitle">Track acquisition progress, identify duplicates, and ensure lore integrity.</p>
        <div class="loading-state" id="quality-loading">
            <div class="loading-spinner"></div>
            <p style="color:var(--primary);">Analyzing dataset quality...</p>
        </div>
        <div id="quality-content" style="display: none;"></div>
    `;

    try {
        const endpoint = window.getApiUrl ? window.getApiUrl('/api/admin/quality') : 'http://127.0.0.1:8000/api/admin/quality';
        const res = await fetch(endpoint);
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();
        
        document.getElementById('quality-loading').style.display = 'none';

        const content = document.getElementById('quality-content');
        
        // Progress Bar
        const barColor = data.verification_rate === 100 ? '#4ade80' : 'var(--primary)';
        let html = `
            <div class="card" style="margin-bottom: 2rem;">
                <h3 style="margin-top: 0;">Verification Progress</h3>
                <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                    <span>Production Ready Entries</span>
                    <span style="font-weight: 500; color: ${barColor}">${data.total_verified} / ${data.total_entries} (${data.verification_rate}%)</span>
                </div>
                <div style="width: 100%; background: rgba(255,255,255,0.1); border-radius: 8px; height: 16px; overflow: hidden;">
                    <div style="width: ${data.verification_rate}%; height: 100%; background: ${barColor}; transition: width 0.5s ease;"></div>
                </div>
            </div>
        `;

        // Action Items (Duplicates & Missing Fields)
        html += `
            <div class="card" style="margin-bottom: 2rem;">
                <h3 style="margin-top: 0; color: #ff6b6b;">⚠️ Action Items</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;">
                    <div>
                        <h4 style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">Missing Fields (${data.missing_fields.length})</h4>
                        <ul style="color: var(--text-muted); font-size: 0.9rem; max-height: 200px; overflow-y: auto;">
                            ${data.missing_fields.map(m => `<li><strong>${m.id}</strong>: ${m.issue}</li>`).join('') || '<li>No missing fields!</li>'}
                        </ul>
                    </div>
                    <div>
                        <h4 style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 0.5rem;">Potential Duplicates (${data.duplicates.length})</h4>
                        <ul style="color: var(--text-muted); font-size: 0.9rem; max-height: 200px; overflow-y: auto;">
                            ${data.duplicates.map(d => `<li><strong>${d.id1}</strong> & <strong>${d.id2}</strong>: ${d.reason}</li>`).join('') || '<li>No duplicates found!</li>'}
                        </ul>
                    </div>
                </div>
            </div>
        `;

        // Distributions
        const themeHtml = Object.entries(data.theme_distribution).map(([theme, count]) => `
            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding: 0.5rem 0;">
                <span style="text-transform: capitalize;">${theme}</span>
                <span class="badge">${count}</span>
            </div>
        `).join('');

        const sourceHtml = Object.entries(data.source_distribution).map(([source, count]) => `
            <div style="display: flex; justify-content: space-between; border-bottom: 1px dashed rgba(255,255,255,0.1); padding: 0.5rem 0;">
                <span>${source}</span>
                <span class="badge" style="border-color: var(--primary); color: var(--primary);">${count}</span>
            </div>
        `).join('');

        html += `
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem;">
                <div class="card">
                    <h3 style="margin-top: 0;">Theme Distribution</h3>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${themeHtml || '<p>No themes recorded.</p>'}
                    </div>
                </div>
                <div class="card">
                    <h3 style="margin-top: 0;">Source Tracking</h3>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${sourceHtml || '<p>No sources recorded.</p>'}
                    </div>
                </div>
            </div>
        `;

        content.innerHTML = html;
        content.style.display = 'block';

    } catch (e) {
        container.innerHTML = `
            <h1 class="page-title">Dataset Coverage & Quality</h1>
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h2>Failed to load quality metrics</h2>
                <p>Ensure the FastAPI server is running.</p>
            </div>
        `;
    }
}
