export function renderIngest(container) {
    container.innerHTML = `
        <h1 class="page-title">Oral Folklore Ingestion</h1>
        <p class="page-subtitle">Upload raw field interviews and transcripts. The AI will extract structured folklore entries automatically.</p>
        
        <div class="card" style="max-width: 800px; margin: 0 auto;">
            <form id="ingest-form" style="display: flex; flex-direction: column; gap: 1rem;">
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    <div>
                        <label>Interviewer Name</label>
                        <input type="text" id="ingest-interviewer" required placeholder="e.g. Dr. Sharma">
                    </div>
                    <div>
                        <label>Speaker / Elder Name</label>
                        <input type="text" id="ingest-speaker" required placeholder="e.g. Aita Barua">
                    </div>
                </div>

                <div>
                    <label>Region / Village</label>
                    <input type="text" id="ingest-region" required placeholder="e.g. Majuli">
                </div>

                <div>
                    <label>Raw Transcript / Field Notes</label>
                    <p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 0.5rem;">Paste the raw text of the interview or story. The AI will automatically structure it.</p>
                    <textarea id="ingest-transcript" rows="10" required placeholder="Once upon a time..."></textarea>
                </div>

                <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem;">
                    <button type="submit" class="btn-primary" id="ingest-btn">Process via AI Pipeline</button>
                    <span id="ingest-status" style="font-weight: 500;"></span>
                </div>
            </form>
        </div>
    `;

    document.getElementById('ingest-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('ingest-btn');
        const status = document.getElementById('ingest-status');
        
        btn.disabled = true;
        btn.innerText = 'Processing...';
        status.innerText = '';
        status.style.color = 'var(--text)';

        const payload = {
            interviewer: document.getElementById('ingest-interviewer').value,
            speaker: document.getElementById('ingest-speaker').value,
            region: document.getElementById('ingest-region').value,
            transcript: document.getElementById('ingest-transcript').value
        };

        try {
            const endpoint = window.getApiUrl ? window.getApiUrl('/api/admin/ingest') : 'http://127.0.0.1:8000/api/admin/ingest';
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            
            if (data.status === 'success') {
                status.innerText = `✅ Ingested successfully as ${data.id} (${data.type}). Confidence: ${data.confidence}%`;
                status.style.color = '#4ade80';
                document.getElementById('ingest-transcript').value = '';
            } else {
                status.innerText = `❌ Error: ${data.message}`;
                status.style.color = '#ff6b6b';
            }
        } catch (err) {
            status.innerText = `❌ Connection error.`;
            status.style.color = '#ff6b6b';
        } finally {
            btn.disabled = false;
            btn.innerText = 'Process via AI Pipeline';
        }
    });
}
