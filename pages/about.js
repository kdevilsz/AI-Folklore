export function renderAbout(container) {
    container.innerHTML = `
        <h1 class="page-title">The Project</h1>
        <div class="card" style="max-width: 800px; margin: 0 auto; text-align: center;">
            <span class="dropcap">L</span><p style="text-align: left; font-size: 1.1rem; line-height: 1.8;">
            oreBridge is an initiative to digitize, preserve, and make accessible the rich tapestry of folklore, traditional tales, and timeless proverbs from Assam. By bridging ancient wisdom with modern technology, we ensure these stories continue to inspire future generations.
            </p>
            <div style="margin-top: 3rem; border-top: 1px solid var(--border); padding-top: 2rem;">
                <p style="color: var(--primary); font-family: 'Playfair Display', serif; font-size: 1.2rem; font-style: italic;">"A story unshared is a history lost."</p>
            </div>
        </div>
    `;
}
