export async function renderEval(container) {
    container.innerHTML = `
        <h1 class="page-title">RAG Evaluation Dashboard</h1>
        <p class="page-subtitle">Automated benchmark metrics for the Oracle Chatbot's retrieval and generation pipeline.</p>
        <div class="loading-state" id="eval-loading">
            <div class="loading-spinner"></div>
            <p style="color:var(--primary);">Loading evaluation benchmarks...</p>
        </div>
        <div id="eval-content" style="display: none;"></div>
    `;

    try {
        const res = await fetch('http://127.0.0.1:8000/api/admin/eval');
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();
        
        document.getElementById('eval-loading').style.display = 'none';
        const content = document.getElementById('eval-content');

        if (!data.results || data.results.length === 0) {
            content.innerHTML = `<p>No evaluation results found. Run <code>python server/evaluator.py</code> to generate benchmarks.</p>`;
            content.style.display = 'block';
            return;
        }

        const metrics = data.metrics;
        
        let html = `
            <div class="admin-stats" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); margin-bottom: 2rem;">
                <div class="stat-card">
                    <h3 style="font-size: 2rem; color: ${metrics.retrieval >= 4 ? '#4ade80' : 'var(--primary)'};">${metrics.retrieval} / 5</h3>
                    <p>Retrieval</p>
                </div>
                <div class="stat-card">
                    <h3 style="font-size: 2rem; color: ${metrics.citation >= 4 ? '#4ade80' : 'var(--primary)'};">${metrics.citation} / 5</h3>
                    <p>Citation Accuracy</p>
                </div>
                <div class="stat-card">
                    <h3 style="font-size: 2rem; color: ${metrics.hallucination >= 4 ? '#4ade80' : '#ff6b6b'};">${metrics.hallucination} / 5</h3>
                    <p>No Hallucinations</p>
                </div>
                <div class="stat-card">
                    <h3 style="font-size: 2rem; color: ${metrics.relevance >= 4 ? '#4ade80' : 'var(--primary)'};">${metrics.relevance} / 5</h3>
                    <p>Context Relevance</p>
                </div>
                <div class="stat-card">
                    <h3 style="font-size: 2rem; color: ${metrics.quality >= 4 ? '#4ade80' : 'var(--primary)'};">${metrics.quality} / 5</h3>
                    <p>Response Quality</p>
                </div>
            </div>

            <div class="card">
                <h3 style="margin-top: 0;">Benchmark Run Logs</h3>
                <div style="overflow-x: auto;">
                    <table class="admin-table" style="min-width: 800px;">
                        <thead>
                            <tr>
                                <th>Test ID</th>
                                <th>Question</th>
                                <th>LLM Critique</th>
                                <th>Scores</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.results.map(r => {
                                const s = r.scores || {};
                                return `
                                <tr>
                                    <td style="font-weight: 500;">${r.id}</td>
                                    <td>${r.question}</td>
                                    <td style="color: var(--text-muted); font-size: 0.85rem; max-width: 300px;">${s.critique || 'N/A'}</td>
                                    <td style="font-size: 0.85rem; white-space: nowrap;">
                                        R: ${s.retrieval || 0} | C: ${s.citation || 0} | H: ${s.hallucination || 0}<br>
                                        Rel: ${s.relevance || 0} | Q: ${s.quality || 0}
                                    </td>
                                </tr>
                                `;
                            }).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;

        content.innerHTML = html;
        content.style.display = 'block';

    } catch (e) {
        container.innerHTML = `
            <h1 class="page-title">RAG Evaluation Dashboard</h1>
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h2>Failed to load evaluation metrics</h2>
                <p>Ensure the FastAPI server is running.</p>
            </div>
        `;
    }
}
