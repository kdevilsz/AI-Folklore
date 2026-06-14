export function renderHome(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 4rem 0;">
            <h1 class="page-title">Echoes of the Brahmaputra</h1>
            <p class="page-subtitle">
                <span class="dropcap">L</span>oreBridge preserves and illuminates the timeless folktales, proverbs, and traditional wisdom of Assam. Step into a world where rivers sing and spirits whisper.
            </p>
            <div class="card" style="max-width: 600px; margin: 0 auto; text-align: left;">
                <h3 style="font-size: 1.5rem; margin-bottom: 1rem;">The Oracle Awaits</h3>
                <p>Consult our AI-powered Oracle to delve deep into the ancient stories. Ask about Tejimola, the witty Phikori, or the mystic creatures of the forest.</p>
                <button onclick="window.location.hash='#chat'" style="margin-top: 1.5rem;">Consult the Oracle</button>
            </div>
        </div>
    `;
}
