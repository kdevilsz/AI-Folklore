import { folktales } from '../js/data.js';

export function renderFolktales(container) {
    let html = `
        <h1 class="page-title">Tales of Old</h1>
        <p class="page-subtitle">Stories passed down through generations by the firelight.</p>
        <div class="masonry-grid">
    `;
    folktales.forEach((f, idx) => {
        // We can add inline animation delays based on the index to stagger the fade up
        html += `<div class="card" style="animation-delay: ${0.1 * (idx + 1)}s;">
            <h3 style="font-size: 1.6rem; margin-bottom: 1rem; border-bottom: 1px solid var(--border); padding-bottom: 0.5rem;">${f.title}</h3>
            <p style="color: var(--text-muted);">${f.summary}</p>
        </div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}
