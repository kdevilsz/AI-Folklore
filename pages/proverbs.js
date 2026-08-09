function getStarString(confidence) {
    if (confidence === "published") return "★★★★★";
    if (confidence === "interview") return "★★★★☆";
    return "★★★☆☆";
}

function getLabelString(confidence) {
    if (confidence === "published") return "Verified from published literature";
    if (confidence === "interview") return "Recorded from elder interview";
    return "Community submission — awaiting verification";
}

function getInitials(name) {
    if (!name) return "?";
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
}

function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-US', options);
    } catch (e) {
        return dateStr;
    }
}

export async function renderProverbs(container) {
    const lang = window.currentLanguage || 'en';

    const pageTitle = lang === 'as' ? "ফকৰা-যোজনা" : "Assamese Proverbs";
    const pageSubtitle = lang === 'as' ? 
        "অসমীয়া সমাজত ব্যৱহৃত প্ৰাচীন বুৰঞ্জী আৰু পূৰ্বপুৰুষৰ জ্ঞান অন্বেষণ কৰক।" :
        "Discover the ancestral wisdom and cultural idioms of Assam.";
    const loadingText = lang === 'as' ? "পূৰ্বপুৰুষৰ জ্ঞান অন্বেষণ কৰা হৈছে..." : "Unearthing ancestral wisdom...";

    container.innerHTML = `
        <h1 class="page-title">${pageTitle}</h1>
        <p class="page-subtitle">${pageSubtitle}</p>
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p style="color:var(--primary);">${loadingText}</p>
        </div>
    `;
    
    try {
        const res = await fetch('/proverbs.json');
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const proverbs = data.entries;
        
        // Extract unique tags
        const tagsSet = new Set();
        proverbs.forEach(p => {
            if (p.source) tagsSet.add(p.source);
            if (p.theme) {
                p.theme.forEach(t => tagsSet.add(t));
            }
        });
        const uniqueTags = Array.from(tagsSet).sort();

        let sidebarHtml = `
            <aside class="filter-sidebar">
                <h4 style="color: var(--primary); font-family: 'Playfair Display', serif; margin-top:0;">${lang === 'as' ? 'ফিল্টাৰ কৰক' : 'Filter by Tag'}</h4>
                <div style="display:flex; flex-direction:column; gap:0.5rem; margin-top:1rem;">
                    <button class="filter-chip active" onclick="window.filterCards(this, 'all', 'proverb')">${lang === 'as' ? 'আটাইবোৰ' : 'All Proverbs'}</button>
                    <button class="filter-chip" onclick="window.filterCards(this, 'favorites', 'proverb')" style="border-color: #ff4b4b; color: #ff4b4b;">${lang === 'as' ? 'মোৰ প্ৰিয়' : 'My Favorites'}</button>
                    ${uniqueTags.map(tag => `<button class="filter-chip" onclick="window.filterCards(this, '${tag.replace(/'/g, "\\'")}', 'proverb')">${tag}</button>`).join('')}
                </div>
            </aside>
        `;

        let html = `
            <h1 class="page-title">${pageTitle}</h1>
            <p class="page-subtitle">${pageSubtitle}</p>
            <div class="page-layout-with-sidebar">
                ${sidebarHtml}
                <div class="card-grid-container" id="proverb-grid">
        `;
        
        proverbs.forEach(p => {
            const roots = p.source || 'Oral Tradition';
            const themes = p.theme ? p.theme : [];
            const cardTags = [roots, ...themes].map(t => t.toLowerCase()).join('|');
            
            const primaryHeader = lang === 'as' ? p.proverb : p.translation;
            const secondaryHeader = lang === 'as' ? p.translation : p.proverb;
            
            html += `
                <div class="card proverb-card" data-tags="${cardTags.replace(/"/g, '&quot;')}" data-id="${p.id}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <div style="flex:1;">
                            <h4 style="font-size: 1.5rem; color: var(--text); margin-bottom: 0.5rem; font-family: 'Playfair Display', serif; line-height: 1.35;">
                                ${primaryHeader}
                            </h4>
                            <p style="color: var(--primary); font-weight: 500; font-size: 1.1rem; margin-bottom: 0; font-family: 'Outfit', sans-serif;">${secondaryHeader}</p>
                        </div>
                        <div style="display:flex; gap:0.5rem; align-items:center;">
                            <span id="view-count-${p.id}" style="font-size:0.8rem; color:var(--text-muted); cursor:help;" title="Views">👁️ ${window.getViewCount ? window.getViewCount(p.id) : 0}</span>
                            <button class="btn-icon" style="width: 32px; height: 32px; font-size: 0.9rem;" onclick="window.shareStory(this, '${p.proverb.replace(/'/g, "\\'")}', '${p.meaning.replace(/'/g, "\\'")}')" title="Share">📤</button>
                            <button class="btn-icon fav-btn" style="width: 32px; height: 32px; font-size: 0.9rem;" onclick="window.toggleFavorite(this, '${p.id}')" title="Favorite">
                                ${window.isFavorite && window.isFavorite(p.id) ? '❤️' : '🤍'}
                            </button>
                        </div>
                    </div>
                    
                    <div class="card-badges">
                        ${themes.map(t => `<span class="badge">${t}</span>`).join('')}
                    </div>
                    
                    <div class="audio-player-container" data-type="proverb" data-id="${p.id}"></div>
                    
                    <button class="expand-btn" onclick="
                        const el = document.getElementById('details-${p.id}'); 
                        const isOpening = !el.classList.contains('open');
                        el.classList.toggle('open'); 
                        this.innerText = isOpening ? 'Read Less' : 'View Context & Examples';
                        if (isOpening && window.trackView) window.trackView('${p.id}');
                    ">View Context & Examples</button>
                    
                    <div id="details-${p.id}" class="expand-details">
                        <div>
                            <div class="card-section" style="margin-top: 1rem;">
                                <h5>Meaning</h5>
                                <p style="color: var(--primary); font-weight: 400;">${p.meaning}</p>
                            </div>
                            <div class="card-section">
                                <h5>English Translation</h5>
                                <p>${p.translation}</p>
                            </div>
                             <div class="card-section" style="margin-top: auto; padding-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1);">
                                <h5>Cultural Context</h5>
                                <p style="font-size: 0.85rem; color: var(--text-muted);">${p.cultural_context}</p>
                            </div>
                            <div class="card-section" style="margin-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1rem;">
                                <h5>Source Confidence</h5>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="color: #ffd700; font-size: 1rem; letter-spacing: 2px;">${getStarString(p.confidence)}</span>
                                    <span style="color: var(--text-muted); font-size: 0.85rem;">(${getLabelString(p.confidence)})</span>
                                </div>
                            </div>
                            
                            <!-- Ask Oracle Button -->
                            <button class="btn-primary" style="margin-top: 1.2rem; width: 100%; padding: 0.8rem; font-size: 0.85rem; border-radius: 6px; letter-spacing: 1px;" onclick="window.location.hash = '#chat?id=${p.id}'">🔮 Ask Oracle about this proverb</button>
                            ${p.contributor ? `
                            <div class="contributor-card" style="margin-top: 1.5rem; padding: 1.2rem; background: rgba(230, 200, 106, 0.03); border: 1px solid var(--border); border-radius: 12px; display: flex; gap: 1rem; align-items: center; justify-content: space-between;">
                                <div style="display: flex; gap: 1rem; align-items: center;">
                                    <div class="contributor-avatar" style="width: 44px; height: 44px; border-radius: 50%; background: var(--primary); color: #000; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1rem; flex-shrink: 0; box-shadow: 0 0 10px var(--primary-glow);">
                                        ${getInitials(p.contributor.name)}
                                    </div>
                                    <div>
                                        <h6 style="margin: 0; font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Contributor</h6>
                                        <p style="margin: 0; font-weight: 500; font-size: 1rem; color: var(--text);">${p.contributor.name}</p>
                                        <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">${p.contributor.village ? p.contributor.village + ', ' : ''}${p.contributor.district} District</p>
                                    </div>
                                </div>
                                <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem;">
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Submitted: ${formatDate(p.contributor.date_submitted)}</span>
                                    ${p.contributor.approved ? `
                                        <span class="badge" style="border-color: #4ade80; color: #4ade80; background: rgba(74, 222, 128, 0.05); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">✓ Verified by LoreBridge Team</span>
                                    ` : ''}
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <!-- Star Rating Badge in bottom-right corner -->
                    <div class="confidence-badge" title="${getLabelString(p.confidence || 'interview')}">
                        <span class="confidence-stars">${getStarString(p.confidence || 'interview')}</span>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
        container.innerHTML = html;
        
        if (window.initAudioPlayers) {
            window.initAudioPlayers(container);
        }
        
    } catch (e) {
        container.innerHTML = `
            <h1 class="page-title">Assamese Proverbs</h1>
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h2>Failed to load proverbs</h2>
                <p>The archives are currently unreachable. Please try again later.</p>
            </div>
        `;
    }
}
