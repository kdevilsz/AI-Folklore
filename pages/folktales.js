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

export async function renderFolktales(container) {
    const lang = window.currentLanguage || 'en';

    // UI Headings & Labels always remain clean and consistent in English
    const pageTitle = "Assamese Folktales";
    const pageSubtitle = "Explore the rich oral traditions and magical stories passed down through generations in Assam.";
    const loadingText = "Unearthing ancient manuscripts...";

    container.innerHTML = `
        <h1 class="page-title">${pageTitle}</h1>
        <p class="page-subtitle">${pageSubtitle}</p>
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p style="color:var(--primary);">${loadingText}</p>
        </div>
    `;
    
    try {
        const res = await fetch('/folktales.json');
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        const folktales = data.entries;
        
        // Extract unique tags
        const tagsSet = new Set();
        folktales.forEach(f => {
            if (f.source) tagsSet.add(f.source);
            if (f.themes) {
                f.themes.forEach(t => tagsSet.add(t));
            }
        });
        const uniqueTags = Array.from(tagsSet).sort();
        
        // Render sidebar with filters
        let sidebarHtml = `
            <aside class="filter-sidebar">
                <h4 style="color: var(--primary); font-family: 'Playfair Display', serif; margin-top:0;">Filter by Tag</h4>
                <div class="filter-options">
                    <button class="filter-chip active" onclick="window.filterCards(this, 'all', 'folktale')">All Stories</button>
                    <button class="filter-chip" onclick="window.filterCards(this, 'favorites', 'folktale')" style="border-color: #ff4b4b; color: #ff4b4b;">My Favorites</button>
                    ${uniqueTags.map(tag => `<button class="filter-chip" onclick="window.filterCards(this, '${tag.replace(/'/g, "\\'")}', 'folktale')">${tag}</button>`).join('')}
                </div>
            </aside>
        `;

        let html = `
            <h1 class="page-title">${pageTitle}</h1>
            <p class="page-subtitle">${pageSubtitle}</p>
            <div class="page-layout-with-sidebar">
                ${sidebarHtml}
                <div class="card-grid-container" id="folktale-grid">
        `;
        
        function parseCleanTitle(f, language) {
            if (language === 'as') {
                if (f.title_as) return `${f.title_as} (${f.title_en || f.title.replace(/\s*\(.*?\)/, '')})`;
                const match = (f.title || '').match(/^([^(]+)\s*(?:\(([^)]+)\))?$/);
                if (match && match[2]) return `${match[2].trim()} (${match[1].trim()})`;
                return f.title;
            } else {
                if (f.title_en) return f.title_en;
                const match = (f.title || '').match(/^([^(]+)\s*(?:\(([^)]+)\))?$/);
                if (match) return match[1].trim();
                return f.title;
            }
        }
        
        folktales.forEach(f => {
            const themes = f.themes ? f.themes : [];
            const roots = f.source || 'Oral Tradition';
            const chars = f.characters ? f.characters.join(', ') : 'None listed';
            
            // Build data-tags string
            const cardTags = [roots, ...themes].map(t => t.toLowerCase()).join('|');
            const cardTitle = parseCleanTitle(f, lang);
            
            // Select content based on active language mode
            const storySummary = (lang === 'as' && (f.summary_as || f.assamese)) ? (f.summary_as || f.assamese) : (f.summary_en || f.summary);
            const storyMoral = (lang === 'as' && f.moral_as) ? f.moral_as : (f.moral_en || f.moral);
            
            html += `
                <div class="card folktale-card" data-tags="${cardTags.replace(/"/g, '&quot;')}" data-id="${f.id}">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                        <h4>${cardTitle}</h4>
                        <div style="display:flex; gap:0.5rem; align-items:center;">
                            <span id="view-count-${f.id}" style="font-size:0.8rem; color:var(--text-muted); cursor:help;" title="Views">👁️ ${window.getViewCount ? window.getViewCount(f.id) : 0}</span>
                            <button class="btn-icon" style="width: 32px; height: 32px; font-size: 0.9rem;" onclick="window.shareStory(this, '${(f.title_en || f.title).replace(/'/g, "\\'")}', '${storySummary.replace(/'/g, "\\'")}')" title="Share">📤</button>
                            <button class="btn-icon fav-btn" style="width: 32px; height: 32px; font-size: 0.9rem;" onclick="window.toggleFavorite(this, '${f.id}')" title="Favorite">
                                ${window.isFavorite && window.isFavorite(f.id) ? '❤️' : '🤍'}
                            </button>
                        </div>
                    </div>
                    
                    <div class="card-badges">
                        <span class="badge">${roots}</span>
                        ${themes.map(t => `<span class="badge" style="border-color: rgba(255,255,255,0.2); color: var(--text-muted);">${t}</span>`).join('')}
                    </div>
                    
                    <div class="card-section">
                        <h5>Summary</h5>
                        <p>${storySummary}</p>
                    </div>
                    
                    <button class="expand-btn" onclick="
                        const el = document.getElementById('details-${f.id}'); 
                        const isOpening = !el.classList.contains('open');
                        el.classList.toggle('open'); 
                        this.innerText = isOpening ? 'Read Less' : 'View Deeper Context';
                        if (isOpening && window.trackView) window.trackView('${f.id}');
                        if (isOpening && window.loadRelatedStories) window.loadRelatedStories('${f.id}');
                    ">View Deeper Context</button>
                    
                    <div id="details-${f.id}" class="expand-details">
                        <div>
                            <div class="card-section" style="margin-top: 1rem;">
                                <h5>Moral</h5>
                                <p style="color: var(--primary); font-weight: 400;">${storyMoral}</p>
                            </div>
                            <div class="card-section">
                                <h5>Characters</h5>
                                <p>${chars}</p>
                            </div>
                             <div class="card-section">
                                <h5>Cultural Significance</h5>
                                <p>${f.cultural_significance || 'A cherished folktale from Assamese oral heritage.'}</p>
                            </div>
                            <div class="card-section" style="margin-top: 1rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1rem;">
                                <h5>Source Confidence</h5>
                                <div style="display: flex; align-items: center; gap: 0.5rem;">
                                    <span style="color: #ffd700; font-size: 1rem; letter-spacing: 2px;">${getStarString(f.confidence)}</span>
                                    <span style="color: var(--text-muted); font-size: 0.85rem;">(${getLabelString(f.confidence)})</span>
                                </div>
                            </div>
                            
                            <!-- Ask Oracle Button -->
                            <button class="btn-primary" style="margin-top: 1.2rem; width: 100%; padding: 0.8rem; font-size: 0.85rem; border-radius: 6px; letter-spacing: 1px;" onclick="window.location.hash = '#chat?id=${f.id}'">🔮 Ask Oracle about this story</button>
                            ${f.contributor ? `
                            <div class="contributor-card" style="margin-top: 1.5rem; padding: 1.2rem; background: rgba(230, 200, 106, 0.03); border: 1px solid var(--border); border-radius: 12px; display: flex; gap: 1rem; align-items: center; justify-content: space-between;">
                                <div style="display: flex; gap: 1rem; align-items: center;">
                                    <div class="contributor-avatar" style="width: 44px; height: 44px; border-radius: 50%; background: var(--primary); color: #000; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 1rem; flex-shrink: 0; box-shadow: 0 0 10px var(--primary-glow);">
                                        ${getInitials(f.contributor.name)}
                                    </div>
                                    <div>
                                        <h6 style="margin: 0; font-family: 'Outfit', sans-serif; font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">Contributor</h6>
                                        <p style="margin: 0; font-weight: 500; font-size: 1rem; color: var(--text);">${f.contributor.name}</p>
                                        <p style="margin: 0.15rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">${f.contributor.village ? f.contributor.village + ', ' : ''}${f.contributor.district} District</p>
                                    </div>
                                </div>
                                <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; gap: 0.4rem;">
                                    <span style="font-size: 0.75rem; color: var(--text-muted);">Submitted: ${formatDate(f.contributor.date_submitted)}</span>
                                    ${f.contributor.approved ? `
                                        <span class="badge" style="border-color: #4ade80; color: #4ade80; background: rgba(74, 222, 128, 0.05); font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.5px;">✓ Verified by LoreBridge Team</span>
                                    ` : ''}
                                </div>
                            </div>
                            ` : ''}
                            
                            <!-- Related Stories Container -->
                            <div class="related-stories-container" data-id="${f.id}"></div>
                        </div>
                    </div>
                    
                    <!-- Star Rating Badge in bottom-right corner -->
                    <div class="confidence-badge" title="${getLabelString(f.confidence || 'interview')}">
                        <span class="confidence-stars">${getStarString(f.confidence || 'interview')}</span>
                    </div>
                </div>
            `;
        });
        
        html += `</div></div>`;
        container.innerHTML = html;
        
    } catch (e) {
        container.innerHTML = `
            <h1 class="page-title">Assamese Folktales</h1>
            <div class="error-state">
                <div class="error-icon">⚠️</div>
                <h2>Failed to load tales</h2>
                <p>The archives are currently unreachable. Please try again later.</p>
            </div>
        `;
    }
}
