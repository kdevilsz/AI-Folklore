import { proverbs } from '../js/data.js';

export function renderProverbs(container) {
    let html = `
        <h1 class="page-title">Ancient Proverbs</h1>
        <p class="page-subtitle">Timeless wisdom from the soil of Assam.</p>
        <div class="masonry-grid">
    `;
    proverbs.forEach((p, idx) => {
        html += `<div class="card" style="animation-delay: ${0.1 * (idx + 1)}s;">
            <h3 style="font-size: 2rem; color: var(--primary); font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; text-align: center;">"${p.assamese}"</h3>
            <p style="text-align: center; color: var(--text-muted); font-style: italic; margin-bottom: 1.5rem; letter-spacing: 1px;">${p.transliteration}</p>
            <p style="border-top: 1px solid var(--border); padding-top: 1rem; font-size: 0.95rem;">${p.meaning}</p>
        </div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
}
