export async function renderGraph(container) {
    container.innerHTML = `
        <h1 class="page-title">Lore Web</h1>
        <p class="page-subtitle">A dynamic constellation of Assamese folktales, proverbs, and their interwoven themes.</p>
        <div id="graph-container" style="width: 100%; height: 70vh; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 12px; margin-top: 1rem;">
            <div class="loading-state" id="graph-loading">
                <div class="loading-spinner"></div>
                <p style="color:var(--primary);">Mapping the constellations...</p>
            </div>
        </div>
    `;

    try {
        const res = await fetch('http://127.0.0.1:8000/api/graph');
        if (!res.ok) throw new Error("API Error");
        const data = await res.json();
        
        document.getElementById('graph-loading').style.display = 'none';

        // Format nodes for vis-network
        const visNodes = new vis.DataSet(data.nodes.map(n => {
            let color, size, fontColor, shape;
            
            if (n.group === 'theme') {
                color = '#e6c86a'; // Gold sun
                size = 35;
                fontColor = '#ffffff';
                shape = 'dot';
            } else if (n.group === 'folktale') {
                color = '#4a90e2'; // Blue planet
                size = 20;
                fontColor = '#cccccc';
                shape = 'dot';
            } else {
                color = '#50c878'; // Green planet (proverb)
                size = 15;
                fontColor = '#cccccc';
                shape = 'dot';
            }

            return {
                id: n.id,
                label: n.label,
                title: n.title, // hover tooltip
                shape: shape,
                size: size,
                color: { background: color, border: 'rgba(255,255,255,0.2)' },
                font: { color: fontColor, size: n.group === 'theme' ? 16 : 12 }
            };
        }));

        const visEdges = new vis.DataSet(data.edges.map(e => ({
            from: e.from,
            to: e.to,
            color: { color: 'rgba(230, 200, 106, 0.2)', highlight: '#e6c86a' },
            width: 1,
            smooth: { type: 'continuous' }
        })));

        const containerNode = document.getElementById('graph-container');
        const networkData = { nodes: visNodes, edges: visEdges };
        const options = {
            physics: {
                forceAtlas2Based: {
                    gravitationalConstant: -50,
                    centralGravity: 0.01,
                    springLength: 100,
                    springConstant: 0.08
                },
                maxVelocity: 50,
                solver: 'forceAtlas2Based',
                timestep: 0.35,
                stabilization: { iterations: 150 }
            },
            interaction: {
                hover: true,
                tooltipDelay: 200
            }
        };

        new vis.Network(containerNode, networkData, options);

    } catch (e) {
        document.getElementById('graph-container').innerHTML = `
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h2>Failed to load graph</h2>
                <p>Ensure the FastAPI server is running.</p>
            </div>
        `;
    }
}
