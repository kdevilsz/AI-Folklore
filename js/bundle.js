// === home.js ===
async function renderHome(container) {
    const lang = window.currentLanguage || 'en';
    
    const title = "Echoes of the Brahmaputra";
    const subtitle = `<span class="dropcap">L</span>oreBridge preserves and illuminates the timeless folktales, proverbs, and traditional wisdom of Assam. Step into a world where rivers sing and spirits whisper. <a href="#about" style="color: var(--primary); text-decoration: underline; font-weight: 500;">Read our story &rarr;</a>`;

    container.innerHTML = `
        <div style="text-align: center; padding: 3.5rem 0 2rem 0;">
            <!-- Authentic Assamese Cultural Motif -->
            <div class="hero-motif-container" style="margin-bottom: 1.2rem; display: flex; justify-content: center;">
                <svg class="hero-assamese-motif" viewBox="0 0 260 36" width="260" height="36" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M130 3 L145 18 L130 33 L115 18 Z" fill="var(--primary)" fill-opacity="0.18" stroke="var(--primary)" stroke-width="1.6"/>
                    <circle cx="130" cy="18" r="3.5" fill="var(--primary)"/>
                    <path d="M130 0 L130 3 M130 33 L130 36" stroke="var(--primary)" stroke-width="1.5"/>
                    <path d="M102 10 L112 18 L102 26 L92 18 Z" fill="var(--primary)" fill-opacity="0.1" stroke="var(--primary)" stroke-width="1.2"/>
                    <path d="M158 10 L168 18 L158 26 L148 18 Z" fill="var(--primary)" fill-opacity="0.1" stroke="var(--primary)" stroke-width="1.2"/>
                    <path d="M78 13 L85 18 L78 23 L71 18 Z" fill="var(--primary)" fill-opacity="0.08" stroke="var(--primary)" stroke-width="1"/>
                    <path d="M182 13 L189 18 L182 23 L175 18 Z" fill="var(--primary)" fill-opacity="0.08" stroke="var(--primary)" stroke-width="1"/>
                    <path d="M10 18 L64 18 M196 18 L250 18" stroke="var(--primary)" stroke-width="1.2" stroke-linecap="round" opacity="0.45"/>
                    <circle cx="10" cy="18" r="2.5" fill="var(--primary)" opacity="0.7"/>
                    <circle cx="250" cy="18" r="2.5" fill="var(--primary)" opacity="0.7"/>
                </svg>
            </div>

            <h1 class="page-title">${title}</h1>
            <p class="page-subtitle">${subtitle}</p>
            
            <div id="home-widgets" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 1000px; margin: 2rem auto; text-align: left;">
                <div class="card" style="flex: 1; min-width: 300px;">
                    <div class="loading-spinner" style="margin: 2rem auto;"></div>
                </div>
            </div>

            <!-- Traditional Assamese Section Separator -->
            <div class="assamese-separator">
                <span class="assamese-separator-icon">❖</span>
            </div>

            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 900px; margin: 2rem auto 3rem auto; text-align: left; padding: 0 1rem;">
                <div class="card" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.4rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                            The Oracle Awaits
                        </h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
                            Consult our AI-powered Oracle to delve deep into ancient stories, analyze morals, or request bilingual explanations of Assamese folk traditions.
                        </p>
                    </div>
                    <button class="btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="window.location.hash='#chat'">
                        Enter Sanctuary &rarr;
                    </button>
                </div>
                
                <div class="card" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.4rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                            Lore Web
                        </h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
                            Navigate the interconnected web of motifs, characters, and cultural archetypes across Assam's folklore collections.
                        </p>
                    </div>
                    <button class="btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="window.location.hash='#graph'">
                        Explore Web &rarr;
                    </button>
                </div>
            </div>
        </div>
    `;

    try {
        const [folktalesRes, proverbsRes] = await Promise.all([
            fetch('/folktales.json'),
            fetch('/proverbs.json')
        ]);
        
        const folktalesData = await folktalesRes.json();
        const proverbsData = await proverbsRes.json();
        
        const folktales = folktalesData.entries || [];
        const proverbs = proverbsData.entries || [];
        
        if (folktales.length === 0 || proverbs.length === 0) return;

        const randomFolktale = folktales[Math.floor(Math.random() * folktales.length)];
        const randomProverb = proverbs[Math.floor(Math.random() * proverbs.length)];
        
        const themeCounts = {};
        folktales.forEach(f => {
            const itemThemes = f.themes || [];
            itemThemes.forEach(t => {
                const key = t.toLowerCase().trim();
                themeCounts[key] = (themeCounts[key] || 0) + 1;
            });
        });
        
        const topThemes = Object.entries(themeCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 8)
            .map(t => t[0]);

        const themeIcons = {
            'magic': '✨', 'animals': '🐅', 'stepmother': '👩‍👧', 'justice': '⚖️',
            'nature': '🌿', 'family': '👨‍👩‍👧', 'love': '❤️', 'humor': '😂', 'survival': '🔥',
            'greed': '💰', 'friendship': '🤝'
        };

        const taleTitle = lang === 'as' ? (randomFolktale.title_as || randomFolktale.title) : (randomFolktale.title_en || randomFolktale.title.replace(/\s*\(.*?\)/, ''));
        const taleSummary = lang === 'as' ? (randomFolktale.summary_as || randomFolktale.summary) : (randomFolktale.summary_en || randomFolktale.summary);
        
        const proverbPrimary = lang === 'as' ? randomProverb.proverb : randomProverb.translation;
        const proverbSecondary = lang === 'as' ? randomProverb.translation : randomProverb.proverb;

        const widgetsContainer = document.getElementById('home-widgets');
        if (widgetsContainer) {
            widgetsContainer.innerHTML = `
                <div class="card" style="flex: 1; min-width: 300px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(230, 200, 106, 0.3);">
                    <h3 style="color: var(--primary); font-size: 1.2rem; margin-bottom: 1rem;">
                        📖 Random Tale
                    </h3>
                    <h4 style="font-size: 1.3rem; margin-bottom: 0.5rem; font-family: 'Playfair Display', serif;">
                        ${taleTitle}
                    </h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">${taleSummary.substring(0, 150)}...</p>
                    <button class="btn-primary" style="padding: 0.4rem 1rem; font-size: 0.9rem;" onclick="window.location.hash='#folktales'">
                        Explore Tales
                    </button>
                </div>
                
                <div class="card" style="flex: 1; min-width: 300px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(230, 200, 106, 0.3);">
                    <h3 style="color: var(--primary); font-size: 1.2rem; margin-bottom: 1rem;">
                        💡 Daily Wisdom
                    </h3>
                    <h4 style="font-size: 1.35rem; font-family: 'Playfair Display', serif; margin-bottom: 0.4rem; color: var(--text); font-weight: 500;">
                        ${proverbPrimary}
                    </h4>
                    <p style="color: var(--primary); font-weight: 500; font-size: 0.95rem; margin-bottom: 0.4rem;">${proverbSecondary}</p>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">${randomProverb.meaning}</p>
                    <button class="btn-primary" style="padding: 0.4rem 1rem; font-size: 0.9rem;" onclick="window.location.hash='#proverbs'">
                        Discover Proverbs
                    </button>
                </div>
            `;
            
            const themeHTML = `
                <div style="width: 100%; margin-top: 3rem; text-align: center;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                        Explore by Theme
                    </h3>
                    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
                        Dive into the motifs that shape Assamese lore
                    </p>
                    <div class="theme-explorer-grid">
                        ${topThemes.map(t => `
                            <div class="theme-explore-card" onclick="window.location.hash='#folktales'; setTimeout(() => { const btn = Array.from(document.querySelectorAll('.filter-chip')).find(el => el.innerText.toLowerCase() === '${t}'); if(btn) btn.click(); }, 300);">
                                <span class="theme-explore-icon">${themeIcons[t] || '🔖'}</span>
                                <span class="theme-explore-label" style="text-transform: capitalize;">${t}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            
            widgetsContainer.insertAdjacentHTML('afterend', themeHTML);
        }
    } catch (e) {
        console.error("Failed to load widgets", e);
    }
}

// === folktales.js ===
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

async function renderFolktales(container) {
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
                    
                    <div class="audio-player-container" data-type="folktale" data-id="${f.id}"></div>
                    
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
        
        if (window.initAudioPlayers) {
            window.initAudioPlayers(container);
        }
        
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

// === proverbs.js ===
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

async function renderProverbs(container) {
    const lang = window.currentLanguage || 'en';

    // UI Headings & Labels always remain clean and consistent in English
    const pageTitle = "Assamese Proverbs";
    const pageSubtitle = "Discover the ancestral wisdom and cultural idioms of Assam.";
    const loadingText = "Unearthing ancestral wisdom...";

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
                <h4 style="color: var(--primary); font-family: 'Playfair Display', serif; margin-top:0;">Filter by Tag</h4>
                <div class="filter-options">
                    <button class="filter-chip active" onclick="window.filterCards(this, 'all', 'proverb')">All Proverbs</button>
                    <button class="filter-chip" onclick="window.filterCards(this, 'favorites', 'proverb')" style="border-color: #ff4b4b; color: #ff4b4b;">My Favorites</button>
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
            
            // In Assamese mode, headline is Assamese script with English subtitle
            // In English mode, headline is English translation with Assamese subtitle
            const primaryHeader = lang === 'as' ? p.proverb : p.translation;
            const secondaryHeader = lang === 'as' ? p.translation : p.proverb;
            
            html += `
                <div class="card proverb-card" data-tags="${cardTags.replace(/"/g, '&quot;')}" data-id="${p.id}">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1rem;">
                        <div style="flex:1;">
                            <h4 style="font-size: 1.45rem; color: var(--text); margin-bottom: 0.5rem; font-family: 'Playfair Display', serif; line-height: 1.35;">
                                ${primaryHeader}
                            </h4>
                            <p style="color: var(--primary); font-weight: 500; font-size: 1.05rem; margin-bottom: 0; font-family: 'Outfit', sans-serif;">${secondaryHeader}</p>
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
                                <p style="font-size: 0.85rem; color: var(--text-muted);">${p.cultural_context || 'Used in traditional Assamese discourse to impart ancestral wisdom.'}</p>
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

// === graph.js ===
async function renderGraph(container) {
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

// === chat.js ===
async function renderChat(container) {
    const hash = window.location.hash;
    let storyId = null;
    if (hash.includes('?')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        storyId = params.get('story') || params.get('id');
    }

    let storyTitle = "";
    let storyContent = "";
    let storyType = "";

    if (storyId) {
        try {
            const [ftRes, prRes] = await Promise.all([
                fetch('/folktales.json'),
                fetch('/proverbs.json')
            ]);
            const ftData = await ftRes.json();
            const prData = await prRes.json();
            
            const entries = [...ftData.entries, ...prData.entries];
            const activeStory = entries.find(e => e.id === storyId);
            
            if (activeStory) {
                storyId = activeStory.id;
                storyType = (storyId.startsWith('ft_') || storyId.startsWith('f')) ? 'folktale' : 'proverb';
                storyTitle = activeStory.title || activeStory.proverb || "";
                storyContent = activeStory.summary || activeStory.translation || activeStory.meaning || "";
            }
        } catch (e) {
            console.error("Error loading story details for chat", e);
        }
    }

    const lang = window.currentLanguage || 'en';
    const pageTitle = "The Oracle";
    const pageSubtitle = "Seek the wisdom of the ancients. The Oracle has read the old texts and knows the tales.";
    const bannerLabel = "Conversing about";
    const clearBtnLabel = "Clear Context";
    const botTitle = "The Oracle";
    
    let greetingText = "";
    if (storyTitle) {
        greetingText = `I have focused my thoughts on <strong>"${storyTitle}"</strong>. Select an explanation mode below or ask me anything about it.`;
    } else {
        greetingText = "Greetings, traveler. What tale or proverb of Assam do you wish to uncover today?";
    }

    const placeholderText = storyTitle ? `Ask about "${storyTitle}"...` : 'E.g., Tell me about Tejimola...';
    const sendButtonText = "Seek";

    const chip1 = "✨ Explain Simply";
    const chip2 = "🧒 Explain for Children";
    const chip3 = "🎋 Explain Culturally";
    const chip4 = "🕰️ Explain Historically";
    const chip5 = "🔄 Compare with Another Story";

    const suggest1 = "Tell me the story of Tejimola";
    const suggest2 = "Give me a proverb about hard work";
    const suggest3 = "What is the moral of Burhi Aair Sadhu?";

    container.innerHTML = `
        <h1 class="page-title">${pageTitle}</h1>
        <p class="page-subtitle">${pageSubtitle}</p>
        
        <!-- Active Story Context Banner -->
        ${storyTitle ? `
        <div class="chat-context-banner" style="max-width: 900px; margin: 0 auto 1.5rem auto; padding: 0.8rem 1.2rem; background: rgba(230, 200, 106, 0.05); border: 1px solid var(--border); border-radius: 12px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 20px rgba(0,0,0,0.15);">
            <div>
                <span style="font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1.5px; display: block; margin-bottom: 2px;">${bannerLabel}</span>
                <strong style="color: var(--primary); font-family: 'Playfair Display', serif; font-size: 1.2rem;">${storyTitle}</strong>
            </div>
            <button class="btn-primary" style="padding: 0.4rem 1rem; font-size: 0.8rem; border-radius: 20px; background: transparent; border: 1px solid var(--border); color: var(--text-muted); text-transform: none; letter-spacing: 0;" onclick="window.location.hash = '#chat'">${clearBtnLabel}</button>
        </div>
        ` : ''}

        <div class="chat-container">
            <div id="chat-history" class="chat-history">
                <div class="chat-bubble-wrapper bot">
                    <div class="chat-bubble">
                        <strong style="color: var(--primary); font-family: 'Playfair Display', serif; font-size: 1.1rem; display: block; margin-bottom: 0.5rem;">${botTitle}</strong>
                        ${greetingText}
                    </div>
                </div>
            </div>
            
            <div class="chat-input-area">
                <div class="prompt-suggestions chat-suggestions" id="prompt-suggestions">
                    ${storyTitle ? `
                        <button class="suggestion-chip explanation-chip" data-mode="simply">${chip1}</button>
                        <button class="suggestion-chip explanation-chip" data-mode="children">${chip2}</button>
                        <button class="suggestion-chip explanation-chip" data-mode="culturally">${chip3}</button>
                        <button class="suggestion-chip explanation-chip" data-mode="historically">${chip4}</button>
                        <button class="suggestion-chip explanation-chip" data-mode="compare">${chip5}</button>
                    ` : `
                        <button class="suggestion-chip" onclick="document.getElementById('chat-input').value=this.innerText; document.getElementById('chat-send').click();">${suggest1}</button>
                        <button class="suggestion-chip" onclick="document.getElementById('chat-input').value=this.innerText; document.getElementById('chat-send').click();">${suggest2}</button>
                        <button class="suggestion-chip" onclick="document.getElementById('chat-input').value=this.innerText; document.getElementById('chat-send').click();">${suggest3}</button>
                    `}
                </div>

                <div class="chat-input-row">
                    <input type="text" id="chat-input" placeholder="${placeholderText}" autocomplete="off">
                    <button id="mic-btn" class="btn-icon" title="Speak to the Oracle">🎤</button>
                    <button id="chat-send" class="btn-primary">${sendButtonText}</button>
                </div>
            </div>
        </div>
    `;

    // Global function for highlighting citations
    if (!window.highlightSource) {
        window.highlightSource = function(id) {
            const el = document.getElementById('source-' + id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.style.backgroundColor = 'rgba(230, 200, 106, 0.3)';
                el.style.color = '#fff';
                el.style.padding = '0.5rem';
                el.style.borderRadius = '4px';
                el.style.transition = 'all 0.3s ease';
                setTimeout(() => {
                    el.style.backgroundColor = 'transparent';
                    el.style.color = 'var(--text-muted)';
                    el.style.padding = '0';
                }, 2000);
            }
        };
    }
    
    if (!window.copyChatText) {
        window.copyChatText = function(btn, textToCopy) {
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = btn.innerHTML;
                btn.innerHTML = '✅ Copied!';
                setTimeout(() => { btn.innerHTML = originalText; }, 2000);
            });
        };
    }
    
    if (!window.regenerateChat) {
        window.regenerateChat = function(queryText) {
            const input = document.getElementById('chat-input');
            const btn = document.getElementById('chat-send');
            if (input && btn) {
                input.value = queryText;
                btn.click();
            }
        };
    }

    const btn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    const history = document.getElementById('chat-history');
    const micBtn = document.getElementById('mic-btn');
    
    let chatHistory = [];

    // Voice Input Setup
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        micBtn.style.display = 'none';
    } else {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-IN';
        recognition.continuous = false;
        recognition.interimResults = false;

        micBtn.onclick = () => {
            micBtn.classList.add('listening');
            recognition.start();
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            micBtn.classList.remove('listening');
            btn.click();
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error", event.error);
            micBtn.classList.remove('listening');
        };

        recognition.onend = () => {
            micBtn.classList.remove('listening');
        };
    }
    
    function parseFolkloreResponse(text) {
        let title = "Unknown Tale";
        let roots = "Assamese Folklore";
        let moral = "A lesson lost to time.";
        let remainingText = text;

        const titleMatch = text.match(/(?:\*\*Title\*\*|\*\*Title:\*\*|Title:|🌟 Title)\s*([^\n]+)/i);
        if (titleMatch) title = titleMatch[1].trim();

        const rootsMatch = text.match(/(?:\*\*Roots\*\*|\*\*Cultural Roots:\*\*|Cultural Roots:|📍 Roots)\s*([^\n]+)/i);
        if (rootsMatch) roots = rootsMatch[1].trim();

        const moralMatch = text.match(/(?:\*\*Moral\*\*|\*\*Implied Moral:\*\*|\*\*Moral\/Theme:\*\*|Moral:|📜 Moral)\s*([^\n]+)/i);
        if (moralMatch) moral = moralMatch[1].trim();

        remainingText = remainingText.replace(/(?:\*\*Title\*\*|\*\*Title:\*\*|Title:|🌟 Title)\s*([^\n]+)\n?/gi, '');
        remainingText = remainingText.replace(/(?:\*\*Roots\*\*|\*\*Cultural Roots:\*\*|Cultural Roots:|📍 Roots)\s*([^\n]+)\n?/gi, '');
        remainingText = remainingText.replace(/(?:\*\*Moral\*\*|\*\*Implied Moral:\*\*|\*\*Moral\/Theme:\*\*|Moral:|📜 Moral)\s*([^\n]+)\n?/gi, '');

        let narrative = remainingText.trim().replace(/\n/g, '<br>');
        
        narrative = narrative.replace(/\[(\d+)\]/g, '<span style="background:var(--primary-glow); color:var(--primary); padding:0 4px; border-radius:4px; font-size:0.8rem; cursor:pointer; font-weight:bold; margin:0 2px;" onclick="highlightSource($1)" title="View Source $1">[$1]</span>');

        return {
            title: title.replace(/\*\*/g, ''),
            roots: roots.replace(/\*\*/g, ''),
            moral: moral.replace(/\*\*/g, ''),
            narrative: narrative
        };
    }

    async function sendOracleQuery(queryText, displayText) {
        const messageId = Date.now();
        
        // User Message
        history.innerHTML += `
            <div class="chat-bubble-wrapper user">
                <div class="chat-bubble">
                    ${displayText}
                </div>
            </div>
        `;
        input.value = '';
        history.scrollTop = history.scrollHeight;
        
        // Typing Indicator
        const loadingId = 'loading-' + Date.now();
        history.innerHTML += `
            <div id="${loadingId}" class="chat-bubble-wrapper bot">
                <div class="rune-loader">
                    <span>✧</span><span>✧</span><span>✧</span>
                </div>
            </div>
        `;
        history.scrollTop = history.scrollHeight;

        try {
            let apiQuery = queryText;
            if (window.currentLanguage === 'as') {
                apiQuery += " (Please respond primarily in the Assamese language and script (অসমীয়া). Retell the story, explanation, roots, and moral in Assamese. Keep the section labels EXACTLY as '**Title**', '**Roots**', and '**Moral**' in English so they can be parsed, but write all their values and the rest of the response text in Assamese.)";
            }

            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: apiQuery, history: chatHistory})
            });
            const data = await res.json();
            
            chatHistory.push({role: 'user', text: queryText});
            chatHistory.push({role: 'model', text: data.answer});
            if (chatHistory.length > 6) chatHistory = chatHistory.slice(-6);

            const loaderEl = document.getElementById(loadingId);
            if (loaderEl) loaderEl.remove();
            
            if (data.answer.startsWith("Error:")) {
                history.innerHTML += `
                    <div class="chat-bubble-wrapper bot">
                        <div class="chat-bubble" style="background: rgba(163, 42, 29, 0.1); border-color: rgba(163, 42, 29, 0.3); color: #ff8c8c;">
                            <strong>⚠️ The Oracle Rests</strong><br>
                            ${data.answer.replace('Error: ', '')}
                        </div>
                    </div>
                `;
                history.scrollTop = history.scrollHeight;
                return;
            }

            const parsed = parseFolkloreResponse(data.answer);
            let localizedNarrative = parsed.narrative.replace(/onclick="highlightSource\((\d+)\)"/g, `onclick="highlightSource('${messageId}-$1')"`);
            
            let sourcesHtml = '';
            let confidenceScore = data.confidence || 0;
            
            if (data.sources && data.sources.length > 0) {
                sourcesHtml = `
                    <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px dashed var(--border);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <h6 style="color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin: 0; font-size: 0.8rem;">Verified Sources</h6>
                            <span class="badge" style="font-size: 0.75rem; background: ${confidenceScore > 80 ? 'rgba(46, 204, 113, 0.2)' : 'rgba(241, 196, 15, 0.2)'}; color: ${confidenceScore > 80 ? '#2ecc71' : '#f1c40f'};">Confidence: ${confidenceScore}%</span>
                        </div>
                        <ul style="margin: 0; padding-left: 1.2rem; color: var(--text-muted); font-size: 0.85rem; list-style-type: square;">
                            ${data.sources.map((s, i) => `<li id="source-${messageId}-${i+1}" style="margin-bottom: 0.3rem;">[${i+1}] ${s}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            const skillCardHtml = `
                <div class="chat-bubble-wrapper bot">
                    <div class="chat-bubble" style="width: 100%; max-width: 100%;">
                        <strong style="color: var(--primary); font-family: 'Playfair Display', serif; font-size: 1.1rem; display: block; margin-bottom: 1rem;">The Oracle</strong>
                        <div style="margin-bottom: 1.5rem; font-size: 1.05rem;">${localizedNarrative || "I have analyzed the lore."}</div>
                        
                        <div class="chat-insight-card">
                            <h5>✨ Folklore Insight Transformer</h5>
                            
                            <div class="card-section">
                                <h5>Tale / Identity</h5>
                                <p style="display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem; color: #fff; font-size: 1.1rem;">
                                    ${parsed.title}
                                    <button class="audio-btn" title="Listen to Pronunciation" style="width: 28px; height: 28px; font-size: 0.8rem;" onclick="playAssameseAudio(this, '${parsed.title.replace(/'/g, "\\'")}')">▶</button>
                                </p>
                            </div>
                            
                            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                                <div class="card-section">
                                    <h5>Roots</h5>
                                    <p>${parsed.roots}</p>
                                </div>
                                <div class="card-section">
                                    <h5>Implied Moral</h5>
                                    <p style="color: var(--primary);">${parsed.moral}</p>
                                </div>
                            </div>
                            
                            ${sourcesHtml}
                            
                            <div style="margin-top: 1rem; display: flex; gap: 0.5rem; justify-content: flex-end;">
                                <button class="btn-primary" style="background: transparent; border: 1px solid var(--border); color: var(--text-muted); padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="window.copyChatText(this, \`${parsed.narrative.replace(/<[^>]+>/g, '')}\`)">📋 Copy</button>
                                <button class="btn-primary" style="background: transparent; border: 1px solid var(--border); color: var(--text-muted); padding: 0.3rem 0.6rem; font-size: 0.8rem;" onclick="window.regenerateChat(\`${queryText.replace(/`/g, "\\`").replace(/\$/g, "\\$")}\`)">🔄 Regenerate</button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            history.innerHTML += skillCardHtml;
            
        } catch(e) {
            console.error("Chat error", e);
            const loader = document.getElementById(loadingId);
            if(loader) loader.remove();
            history.innerHTML += `
                <div class="chat-bubble-wrapper bot">
                    <div class="chat-bubble" style="background: rgba(163, 42, 29, 0.1); border-color: rgba(163, 42, 29, 0.3); color: #ff8c8c;">
                        <strong>⚠️ Connection Lost</strong><br>
                        The connection to the spirit realm has faded. The backend server might be unreachable or heavily loaded.
                    </div>
                </div>
            `;
        }
        history.scrollTop = history.scrollHeight;
    }

    btn.onclick = () => {
        const text = input.value.trim();
        if(!text) return;
        sendOracleQuery(text, text);
    };
    
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
      }
    });

    // Event listeners for explanation modes
    if (storyTitle) {
        document.querySelectorAll('.explanation-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const mode = chip.dataset.mode;
                let userDisplay = "";
                let fullPrompt = "";
                
                if (mode === "simply") {
                    userDisplay = `Explain simply: "${storyTitle}"`;
                    fullPrompt = `Explain the Assamese ${storyType} "${storyTitle}" in very simple English, as if talking to someone who has never heard of Assam. Here is the story text for reference: "${storyContent}"`;
                } else if (mode === "children") {
                    userDisplay = `Explain for children: "${storyTitle}"`;
                    fullPrompt = `Retell the Assamese ${storyType} "${storyTitle}" in fun, simple language suitable for a 8-10 year old child. Use short sentences and simple words. Here is the story text for reference: "${storyContent}"`;
                } else if (mode === "culturally") {
                    userDisplay = `Explain culturally: "${storyTitle}"`;
                    fullPrompt = `Explain the Assamese cultural context of "${storyTitle}". What customs, festivals, or traditions does this story reflect? Here is the story text for reference: "${storyContent}"`;
                } else if (mode === "historically") {
                    userDisplay = `Explain historically: "${storyTitle}"`;
                    fullPrompt = `Place the Assamese ${storyType} "${storyTitle}" in its historical period and explain what life in Assam was like when this story originated. Here is the story text for reference: "${storyContent}"`;
                } else if (mode === "compare") {
                    userDisplay = `Compare with another story: "${storyTitle}"`;
                    fullPrompt = `Find the most similar story in the database to "${storyTitle}", and compare the themes, characters, and morals of both. Here is the story text for reference: "${storyContent}"`;
                }
                
                sendOracleQuery(fullPrompt, userDisplay);
            });
        });
    }
}

// === about.js ===
function renderAbout(container) {
    const pageTitle = "About the Project";
    const pageSubtitle = "LoreBridge — Preserving the Oral Traditions of the Brahmaputra Valley";
    
    const header1 = "🎋 Why Assamese Folklore Matters";
    const text1 = "Assam, nestled along the banks of the mighty Brahmaputra River, has one of the world's most rich and diverse oral traditions. For generations, traditional stories, ethical codes, and ecological wisdom have been passed down by mouth. These tales are not merely children's entertainment; they represent the cultural DNA, identity, and collective wisdom of the Assamese people, passing vital ancestral insights to new generations.";

    const header2 = "⚠️ The Looming Risk: Endangered Oral Traditions";
    const text2 = "UNESCO estimates that globally, one language dies every two weeks. When a language is lost, its oral history and folklore fade with it. In Assam, many stories exist only in the memories of elders or in rare, out-of-print books. With rapid modernization and changing lifestyle patterns, these tales are at risk of being lost forever as the old keepers of our oral traditions pass away.";

    const header3 = "🔮 Our Solution: The AI-Powered Digital Sanctuary";
    const text3 = "LoreBridge addresses this urgent crisis by building a comprehensive, interactive digital archive. Rather than keeping these stories locked away in static, dry PDF archives, we bring them to life through:";

    const li3_1 = "<strong>The Oracle AI Chatbot:</strong> A context-aware guide trained on Assamese folklore that users can converse with to analyze morals, customs, or request multiple explanation modes.";
    const li3_2 = "<strong>Lore Web:</strong> An interactive, graphical web mapping the interconnected network of characters, themes, and proverbs to reveal cultural patterns.";
    const li3_3 = "<strong>Community Recognition & Sharing:</strong> A system allowing users across Assam to submit their own stories, highlighting local village and district contributions.";

    const header4 = "✨ Creator's Personal Mission";
    const text4 = "As a student growing up in Guwahati, I spent my childhood listening to my grandmother's retellings of the classic stories from <em>Burhi Aair Sadhu</em>. Seeing that my peers were gradually losing touch with these magical narratives, I felt a deep responsibility to act. My personal mission with LoreBridge is to build a bridge between traditional Assamese heritage and modern computer science, using AI to present the stories of our ancestors in a medium that resonates with the digital generation.";

    const header5 = "⚙️ Technical Architecture";
    const text5 = "LoreBridge is built using a modern, scalable technology stack configured for semantic query understanding and retrieval:";

    const tech1 = "Backend Server";
    const tech1_desc = "Python FastAPI powering search pipelines, similarity scoring, and API endpoints.";
    const tech2 = "RAG & Vector Search";
    const tech2_desc = "Retrieval-Augmented Generation (RAG) using Pinecone vector database and semantic embeddings.";
    const tech3 = "Generative LLM";
    const tech3_desc = "Gemini LLM integrating story payloads to generate context-aware, structured folklore analyses.";

    const creator_role = "Project Creator & Developer";
    const creator_school = "Class 12 Student • Delhi Public School, Guwahati, Assam";
    const creator_initiative = "Cultural Technology Preservation Initiative";

    container.innerHTML = `
        <h1 class="page-title">${pageTitle}</h1>
        <p class="page-subtitle">${pageSubtitle}</p>
        
        <!-- Decorative Assamese Motif Border -->
        <svg viewBox="0 0 200 20" width="200" height="20" style="margin: 0 auto 3rem auto; display: block; stroke: var(--primary); fill: none; stroke-width: 1.5; stroke-linecap: round; opacity: 0.8;">
            <path d="M 10 10 L 30 10 M 170 10 L 190 10 M 30 10 L 40 0 L 50 10 L 40 20 Z M 50 10 L 60 0 L 70 10 L 60 20 Z M 70 10 L 90 10 M 110 10 L 130 10 M 130 10 L 140 0 L 150 10 L 140 20 Z M 150 10 L 160 0 L 170 10 L 160 20 Z M 90 10 L 100 0 L 110 10 L 100 20 Z" />
        </svg>

        <div style="max-width: 850px; margin: 0 auto; display: flex; flex-direction: column; gap: 2.5rem; text-align: left; padding: 0 1rem;">
            
            <!-- Row 1: Why It Matters & The Problem -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;" class="about-grid-2col">
                <div class="card">
                    <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                        ${header1}
                    </h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin: 0;">
                        ${text1}
                    </p>
                </div>
                <div class="card">
                    <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                        ${header2}
                    </h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin: 0;">
                        ${text2}
                    </p>
                </div>
            </div>

            <!-- Row 2: Our Solution -->
            <div class="card">
                <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                    ${header3}
                </h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
                    ${text3}
                </p>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="background: rgba(0,0,0,0.2); border-left: 3px solid var(--primary); padding: 0.8rem 1.2rem; border-radius: 0 8px 8px 0;">
                        <p style="color: var(--text); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                            ${li3_1}
                        </p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border-left: 3px solid var(--primary); padding: 0.8rem 1.2rem; border-radius: 0 8px 8px 0;">
                        <p style="color: var(--text); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                            ${li3_2}
                        </p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border-left: 3px solid var(--primary); padding: 0.8rem 1.2rem; border-radius: 0 8px 8px 0;">
                        <p style="color: var(--text); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                            ${li3_3}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Row 3: Creator Mission Statement -->
            <div class="card" style="border: 1px solid var(--primary); background: radial-gradient(circle at top right, rgba(230, 200, 106, 0.05) 0%, var(--surface) 100%);">
                <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                    ${header4}
                </h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.8; margin-bottom: 1.5rem; font-style: italic;">
                    "${text4}"
                </p>
                <div style="display: flex; align-items: center; gap: 1rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1.2rem;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; flex-shrink: 0; box-shadow: 0 0 10px var(--primary-glow);">
                        DD
                    </div>
                    <div>
                        <h4 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--text);">Devansh Deka</h4>
                        <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: var(--primary);">${creator_role}</p>
                        <p style="margin: 0.1rem 0 0 0; font-size: 0.8rem; color: var(--text-muted);">${creator_school}</p>
                    </div>
                </div>
            </div>

            <!-- Row 4: Technical Architecture -->
            <div class="card">
                <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                    ${header5}
                </h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
                    ${text5}
                </p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;" class="about-grid-3col">
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); padding: 1rem; border-radius: 8px; text-align: center;">
                        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">⚡</span>
                        <h4 style="margin: 0 0 0.4rem 0; font-size: 0.95rem; color: var(--primary); font-family: 'Outfit', sans-serif;">${tech1}</h4>
                        <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${tech1_desc}</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); padding: 1rem; border-radius: 8px; text-align: center;">
                        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🌲</span>
                        <h4 style="margin: 0 0 0.4rem 0; font-size: 0.95rem; color: var(--primary); font-family: 'Outfit', sans-serif;">${tech2}</h4>
                        <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${tech2_desc}</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); padding: 1rem; border-radius: 8px; text-align: center;">
                        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🔮</span>
                        <h4 style="margin: 0 0 0.4rem 0; font-size: 0.95rem; color: var(--primary); font-family: 'Outfit', sans-serif;">${tech3}</h4>
                        <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${tech3_desc}</p>
                    </div>
                </div>
            </div>

            <!-- Footer Quote / Disclaimer -->
            <div style="text-align: center; margin-top: 1rem; padding: 1rem; border-top: 1px dashed rgba(255,255,255,0.1);">
                <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0; font-style: italic;">
                    "Dedicated to the preservation of Assam's rich oral legacy — where ancient tales find digital permanence."
                </p>
            </div>
            
        </div>
    `;
}

// === admin.js ===
async function renderAdmin(container) {
    container.innerHTML = `
        <h1 class="page-title">Admin Dashboard</h1>
        <p class="page-subtitle">Manage lore, monitor indexing, and verify schema integrity.</p>
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p style="color:var(--primary);">Connecting to admin console...</p>
        </div>
    `;

    // Inject inline styles for Admin page if not present
    if (!document.getElementById('admin-styles')) {
        const style = document.createElement('style');
        style.id = 'admin-styles';
        style.innerHTML = `
            .admin-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.5rem; margin-bottom: 2rem; }
            .stat-card { background: rgba(0,0,0,0.4); border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem; text-align: center; }
            .stat-card h3 { margin: 0 0 0.5rem 0; font-size: 2rem; color: var(--primary); }
            .stat-card p { margin: 0; color: var(--text-muted); font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; }
            .admin-table { width: 100%; border-collapse: collapse; margin-top: 1rem; font-size: 0.9rem; }
            .admin-table th, .admin-table td { padding: 1rem; text-align: left; border-bottom: 1px solid rgba(255,255,255,0.1); }
            .admin-table th { color: var(--primary); font-weight: 500; text-transform: uppercase; letter-spacing: 1px; }
            .admin-table tr:hover { background: rgba(230, 200, 106, 0.05); }
            .btn-sm { padding: 0.4rem 0.8rem; font-size: 0.8rem; border-radius: 4px; cursor: pointer; border: 1px solid transparent; transition: all 0.2s ease; background: transparent; }
            .btn-edit { color: var(--primary); border-color: var(--primary); }
            .btn-edit:hover { background: var(--primary); color: #000; }
            .btn-delete { color: #ff6b6b; border-color: #ff6b6b; }
            .btn-delete:hover { background: #ff6b6b; color: #fff; }
            .admin-modal-backdrop { position: fixed; top:0; left:0; width:100%; height:100%; background: rgba(0,0,0,0.8); backdrop-filter: blur(5px); z-index: 1000; display: flex; align-items: center; justify-content: center; }
            .admin-modal { background: var(--bg-dark); border: 1px solid var(--primary); border-radius: 12px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto; padding: 2rem; box-shadow: 0 10px 50px rgba(0,0,0,0.5); }
            .form-group { margin-bottom: 1rem; }
            .form-group label { display: block; margin-bottom: 0.5rem; color: var(--primary); font-size: 0.9rem; }
            .form-group input, .form-group textarea { width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text); font-family: inherit; }
            .form-group textarea { resize: vertical; min-height: 100px; }
        `;
        document.head.appendChild(style);
    }

    const API_URL = 'http://127.0.0.1:8000/api/admin';

    async function loadPendingSubmissions() {
        let subs = [];
        
        // 1. Local Storage
        const mockSubs = JSON.parse(localStorage.getItem('mock_submissions') || '[]');
        subs = [...mockSubs];

        // 2. Firestore
        try {
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
            const { getFirestore, collection, getDocs } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
            const firebaseConfig = window.firebaseConfig || {
                projectId: "lorebridge-placeholder",
                storageBucket: "lorebridge-placeholder.appspot.com"
            };
            const app = initializeApp(firebaseConfig);
            const db = getFirestore(app);
            const querySnapshot = await getDocs(collection(db, "pending_submissions"));
            querySnapshot.forEach((doc) => {
                const subData = doc.data();
                // Avoid duplicating if we mock wrote it
                if (!subs.some(s => s.uid === subData.uid && s.timestamp === subData.timestamp)) {
                    subs.push({ firestoreId: doc.id, ...subData });
                }
            });
        } catch (e) {
            console.warn("Could not fetch submissions from Firestore, showing local mocks only.", e);
        }
        
        return subs;
    }

    async function loadDashboard() {
        try {
            const [statusRes, dataRes, analyticsRes] = await Promise.all([
                fetch(`${API_URL}/status`),
                fetch(`${API_URL}/data`),
                fetch(`${API_URL}/analytics`)
            ]);
            
            if (!statusRes.ok || !dataRes.ok || !analyticsRes.ok) throw new Error("API Error");

            const status = await statusRes.json();
            const data = await dataRes.json();
            const analytics = await analyticsRes.json();

            renderDashboard(status, data, analytics);
        } catch (e) {
            container.innerHTML = `
                <h1 class="page-title">Admin Dashboard</h1>
                <div class="error-state">
                    <div class="error-icon">⚠️</div>
                    <h2>Connection Failed</h2>
                    <p>Could not connect to the FastAPI Admin endpoints.</p>
                </div>
            `;
        }
    }

    function renderDashboard(status, data, analytics) {
        window.adminData = data; // store globally for modal access
        
        let ftRows = data.folktales.map(ft => `
            <tr>
                <td>${ft.id}</td>
                <td style="font-weight: 500;">${ft.title}</td>
                <td><span class="badge">${ft.source || 'Oral Tradition'}</span></td>
                <td>
                    <button class="btn-sm btn-edit" onclick="window.openFolktaleModal('${ft.id}')">Edit</button>
                    <button class="btn-sm btn-delete" onclick="window.deleteItem('folktale', '${ft.id}')">Delete</button>
                </td>
            </tr>
        `).join('');

        let prRows = data.proverbs.map(pr => `
            <tr>
                <td>${pr.id}</td>
                <td style="font-weight: 500;">${pr.proverb}</td>
                <td><span class="badge">${pr.source || 'Oral Tradition'}</span></td>
                <td>
                    <button class="btn-sm btn-edit" onclick="window.openProverbModal('${pr.id}')">Edit</button>
                    <button class="btn-sm btn-delete" onclick="window.deleteItem('proverb', '${pr.id}')">Delete</button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = `
            <h1 class="page-title">Admin Dashboard</h1>
            <p class="page-subtitle">Manage lore, monitor indexing, and verify schema integrity.</p>

            <div class="admin-stats">
                <div class="stat-card">
                    <h3>${data.folktales.length}</h3>
                    <p>Folktales</p>
                </div>
                <div class="stat-card">
                    <h3>${data.proverbs.length}</h3>
                    <p>Proverbs</p>
                </div>
                <div class="stat-card" style="border-color: ${status.folktales_valid && status.proverbs_valid ? '#4ade80' : '#ff6b6b'};">
                    <h3 style="color: ${status.folktales_valid && status.proverbs_valid ? '#4ade80' : '#ff6b6b'};">
                        ${status.folktales_valid && status.proverbs_valid ? 'PASS' : 'FAIL'}
                    </h3>
                    <p>Schema Integrity</p>
                </div>
                <div class="stat-card">
                    <h3>${status.vector_count}</h3>
                    <p>Pinecone Vectors</p>
                </div>
            </div>

            <div class="card" style="margin-bottom: 2rem;">
                <h4 style="margin: 0 0 1rem 0;">System Analytics</h4>
                <div class="admin-stats" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));">
                    <div class="stat-card">
                        <h3 style="font-size: 1.5rem;">${analytics.total_sources}</h3>
                        <p>Total Sources</p>
                    </div>
                    <div class="stat-card">
                        <h3 style="font-size: 1.5rem;">${analytics.retrieval_success_rate}%</h3>
                        <p>RAG Success Rate</p>
                    </div>
                    <div class="stat-card">
                        <h3 style="font-size: 1.2rem; margin-bottom: 0.2rem;">${analytics.most_searched_themes.length ? analytics.most_searched_themes.join(', ') : 'None yet'}</h3>
                        <p>Top Themes</p>
                    </div>
                </div>
                <div style="margin-top: 1.5rem;">
                    <h5>Most Viewed Stories</h5>
                    <ul style="color: var(--text-muted); font-size: 0.9rem; margin-top: 0.5rem; padding-left: 1.2rem;">
                        ${analytics.most_viewed_stories.map(v => `<li><strong>${v.title}</strong> - ${v.views} views</li>`).join('') || '<li>No views yet</li>'}
                    </ul>
                </div>
            </div>

            <!-- Pending Submissions -->
            <div class="card" style="margin-bottom: 2rem; border: 1px solid var(--primary); background: rgba(230, 200, 106, 0.01);">
                <h4 style="color: var(--primary); margin: 0 0 1.2rem 0; font-family: 'Playfair Display', serif; font-size: 1.3rem; display: flex; align-items: center; gap: 8px;">
                    <span>📥</span> Pending Community Submissions
                </h4>
                <div id="pending-submissions-container">
                    <p style="color: var(--text-muted); font-size: 0.9rem; font-style: italic;">Loading submissions...</p>
                </div>
            </div>

            <div class="card" style="margin-bottom: 2rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="margin: 0;">Folktales Database</h4>
                    <button class="btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.85rem;" onclick="window.openFolktaleModal()">+ Add Folktale</button>
                </div>
                <div style="overflow-x: auto;">
                    <table class="admin-table">
                        <thead><tr><th>ID</th><th>Title</th><th>Source</th><th>Actions</th></tr></thead>
                        <tbody>${ftRows}</tbody>
                    </table>
                </div>
            </div>

            <div class="card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                    <h4 style="margin: 0;">Proverbs Database</h4>
                    <button class="btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.85rem;" onclick="window.openProverbModal()">+ Add Proverb</button>
                </div>
                <div style="overflow-x: auto;">
                    <table class="admin-table">
                        <thead><tr><th>ID</th><th>Proverb</th><th>Source</th><th>Actions</th></tr></thead>
                        <tbody>${prRows}</tbody>
                    </table>
                </div>
            </div>
            <div id="modal-container"></div>
        `;

        window.loadAndRenderPendingSubmissions();
    }

    window.closeModal = () => {
        document.getElementById('modal-container').innerHTML = '';
        window.pendingContributor = null;
        window.activePendingIds = null;
    };

    window.openFolktaleModal = (id = null, prefSub = null, fId = '', lId = '') => {
        let ft = id ? window.adminData.folktales.find(f => f.id === id) : {};
        const isEdit = !!id;
        
        window.activePendingIds = (fId || lId) ? { fId, lId } : null;

        if (prefSub) {
            ft = {
                title: `${prefSub.title_en} (${prefSub.title_as})`,
                summary: prefSub.content_en,
                moral: prefSub.moral,
                source: "Oral Tradition",
                cultural_significance: `A community folktale submitted by ${prefSub.contributor_name} from ${prefSub.village ? prefSub.village + ', ' : ''}${prefSub.district} district.`,
                verified: true
            };
            window.pendingContributor = {
                name: prefSub.contributor_name,
                village: prefSub.village || "",
                district: prefSub.district,
                date_submitted: prefSub.submission_date,
                approved: true
            };
        }

        const html = `
            <div class="admin-modal-backdrop">
                <div class="admin-modal">
                    <h2 style="color: var(--primary); margin-top: 0;">${isEdit ? 'Edit Folktale' : (prefSub ? 'Approve Community Folktale' : 'Add Folktale')}</h2>
                    <form id="ft-form" onsubmit="window.saveFolktale(event, '${id || ''}')">
                        <div class="form-group"><label>Title</label><input type="text" name="title" value="${ft.title || ''}" required></div>
                        <div class="form-group"><label>Summary</label><textarea name="summary" required>${ft.summary || ''}</textarea></div>
                        <div class="form-group"><label>Moral</label><input type="text" name="moral" value="${ft.moral || ''}" required></div>
                        <div class="form-group"><label>Source</label><input type="text" name="source" value="${ft.source || 'Oral Tradition'}"></div>
                        <div class="form-group"><label>Characters (comma separated)</label><input type="text" name="characters" value="${ft.characters ? ft.characters.join(', ') : ''}"></div>
                        <div class="form-group"><label>Themes (comma separated)</label><input type="text" name="themes" value="${ft.themes ? ft.themes.join(', ') : ''}"></div>
                        <div class="form-group"><label>Cultural Significance</label><textarea name="cultural_significance">${ft.cultural_significance || ''}</textarea></div>
                        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" name="verified" id="ft-verified" style="width: auto;" ${ft.verified ? 'checked' : ''}>
                            <label for="ft-verified" style="margin: 0; color: #4ade80;">Verified (Ready for Production)</label>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button type="button" class="btn-primary" style="background: transparent; color: var(--text); border: 1px solid var(--border);" onclick="window.closeModal()">Cancel</button>
                            <button type="submit" class="btn-primary" style="flex: 1;">Save & Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('modal-container').innerHTML = html;
    };

    window.saveFolktale = async (e, id) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = {
            title: fd.get('title'),
            summary: fd.get('summary'),
            moral: fd.get('moral'),
            source: fd.get('source'),
            cultural_significance: fd.get('cultural_significance'),
            characters: fd.get('characters').split(',').map(s => s.trim()).filter(s => s),
            themes: fd.get('themes').split(',').map(s => s.trim()).filter(s => s),
            verified: fd.get('verified') === 'on',
            contributor: window.pendingContributor || null
        };
        
        try {
            let url = `${API_URL}/folktale`;
            let method = 'POST';
            if (id) {
                url += `/${id}`;
                method = 'PUT';
            }
            const res = await fetch(url, {
                method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
            });
            if (res.ok) {
                if (window.activePendingIds) {
                    await window.deletePendingSubmission(window.activePendingIds.fId, window.activePendingIds.lId);
                }
                window.closeModal(); 
                loadDashboard(); 
            } else {
                alert("Failed to save");
            }
        } catch (err) { alert("Error saving folktale."); }
    };

    window.openProverbModal = (id = null, prefSub = null, fId = '', lId = '') => {
        let pr = id ? window.adminData.proverbs.find(p => p.id === id) : {};
        const isEdit = !!id;
        
        window.activePendingIds = (fId || lId) ? { fId, lId } : null;

        if (prefSub) {
            pr = {
                proverb: prefSub.title_as,
                translation: prefSub.title_en,
                meaning: prefSub.content_en,
                source: "Oral Tradition",
                cultural_context: `A community proverb submitted by ${prefSub.contributor_name} from ${prefSub.village ? prefSub.village + ', ' : ''}${prefSub.district} district.`,
                verified: true
            };
            window.pendingContributor = {
                name: prefSub.contributor_name,
                village: prefSub.village || "",
                district: prefSub.district,
                date_submitted: prefSub.submission_date,
                approved: true
            };
        }

        const html = `
            <div class="admin-modal-backdrop">
                <div class="admin-modal">
                    <h2 style="color: var(--primary); margin-top: 0;">${isEdit ? 'Edit Proverb' : (prefSub ? 'Approve Community Proverb' : 'Add Proverb')}</h2>
                    <form id="pr-form" onsubmit="window.saveProverb(event, '${id || ''}')">
                        <div class="form-group"><label>Proverb</label><input type="text" name="proverb" value="${pr.proverb || ''}" required></div>
                        <div class="form-group"><label>Translation</label><input type="text" name="translation" value="${pr.translation || ''}" required></div>
                        <div class="form-group"><label>Meaning</label><textarea name="meaning" required>${pr.meaning || ''}</textarea></div>
                        <div class="form-group"><label>Source</label><input type="text" name="source" value="${pr.source || 'Oral Tradition'}"></div>
                        <div class="form-group"><label>Themes (comma separated)</label><input type="text" name="theme" value="${pr.theme ? pr.theme.join(', ') : ''}"></div>
                        <div class="form-group"><label>Cultural Context</label><textarea name="cultural_context">${pr.cultural_context || ''}</textarea></div>
                        <div class="form-group" style="display: flex; align-items: center; gap: 0.5rem;">
                            <input type="checkbox" name="verified" id="pr-verified" style="width: auto;" ${pr.verified ? 'checked' : ''}>
                            <label for="pr-verified" style="margin: 0; color: #4ade80;">Verified (Ready for Production)</label>
                        </div>
                        
                        <div style="display: flex; gap: 1rem; margin-top: 2rem;">
                            <button type="button" class="btn-primary" style="background: transparent; color: var(--text); border: 1px solid var(--border);" onclick="window.closeModal()">Cancel</button>
                            <button type="submit" class="btn-primary" style="flex: 1;">Save & Publish</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
        document.getElementById('modal-container').innerHTML = html;
    };

    window.saveProverb = async (e, id) => {
        e.preventDefault();
        const fd = new FormData(e.target);
        const data = {
            proverb: fd.get('proverb'),
            translation: fd.get('translation'),
            meaning: fd.get('meaning'),
            source: fd.get('source'),
            cultural_context: fd.get('cultural_context'),
            theme: fd.get('theme').split(',').map(s => s.trim()).filter(s => s),
            verified: fd.get('verified') === 'on',
            contributor: window.pendingContributor || null
        };
        
        try {
            let url = `${API_URL}/proverb`;
            let method = 'POST';
            if (id) {
                url += `/${id}`;
                method = 'PUT';
            }
            const res = await fetch(url, {
                method, headers: {'Content-Type': 'application/json'}, body: JSON.stringify(data)
            });
            if (res.ok) {
                if (window.activePendingIds) {
                    await window.deletePendingSubmission(window.activePendingIds.fId, window.activePendingIds.lId);
                }
                window.closeModal(); 
                loadDashboard(); 
            } else {
                alert("Failed to save");
            }
        } catch (err) { alert("Error saving proverb."); }
    };

    window.deleteItem = async (type, id) => {
        if (!confirm(`Are you sure you want to delete ${id}?`)) return;
        try {
            const res = await fetch(`${API_URL}/${type}/${id}`, { method: 'DELETE' });
            if (res.ok) loadDashboard();
            else alert("Failed to delete");
        } catch (e) { alert("Error deleting"); }
    };

    window.loadAndRenderPendingSubmissions = async () => {
        const container = document.getElementById('pending-submissions-container');
        if (!container) return;

        const subs = await loadPendingSubmissions();
        if (subs.length === 0) {
            container.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem; font-style: italic; margin: 0;">No pending submissions in the moderation queue.</p>`;
            return;
        }

        let rows = subs.map(sub => `
            <tr>
                <td><span class="badge" style="background: rgba(230, 200, 106, 0.05); color: var(--primary);">${sub.type === 'folktale' ? 'Folktale' : 'Proverb'}</span></td>
                <td style="font-weight: 500;">${sub.title_en} (${sub.title_as})</td>
                <td>${sub.contributor_name}</td>
                <td>${sub.village ? sub.village + ', ' : ''}${sub.district}</td>
                <td>
                    <button class="btn-sm btn-edit" style="color: #4ade80; border-color: #4ade80;" onclick="window.approveSubmission('${sub.firestoreId || ''}', '${sub.id || ''}', ${JSON.stringify(sub).replace(/"/g, '&quot;')})">Approve</button>
                    <button class="btn-sm btn-delete" onclick="window.rejectSubmission('${sub.firestoreId || ''}', '${sub.id || ''}')">Reject</button>
                </td>
            </tr>
        `).join('');

        container.innerHTML = `
            <div style="overflow-x: auto;">
                <table class="admin-table" style="margin-top: 0; min-width: 600px;">
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Title / Translation</th>
                            <th>Contributor</th>
                            <th>Origin</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${rows}
                    </tbody>
                </table>
            </div>
        `;
    };

    window.approveSubmission = (firestoreId, localId, sub) => {
        if (sub.type === 'folktale') {
            window.openFolktaleModal(null, sub, firestoreId, localId);
        } else {
            window.openProverbModal(null, sub, firestoreId, localId);
        }
    };

    window.deletePendingSubmission = async (fId, lId) => {
        if (lId) {
            let mockSubs = JSON.parse(localStorage.getItem('mock_submissions') || '[]');
            mockSubs = mockSubs.filter(s => s.id !== lId);
            localStorage.setItem('mock_submissions', JSON.stringify(mockSubs));
        }
        if (fId) {
            try {
                const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
                const { getFirestore, doc, deleteDoc } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js");
                const firebaseConfig = window.firebaseConfig || {
                    projectId: "lorebridge-placeholder",
                    storageBucket: "lorebridge-placeholder.appspot.com"
                };
                const app = initializeApp(firebaseConfig);
                const db = getFirestore(app);
                await deleteDoc(doc(db, "pending_submissions", fId));
            } catch (err) {
                console.error("Firebase deletion failed", err);
            }
        }
    };

    window.rejectSubmission = async (fId, lId) => {
        if (!confirm("Are you sure you want to reject and delete this submission?")) return;
        await window.deletePendingSubmission(fId, lId);
        await window.loadAndRenderPendingSubmissions();
    };

    loadDashboard();
}

// === quality.js ===
async function renderQuality(container) {
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
        const res = await fetch('http://127.0.0.1:8000/api/admin/quality');
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

// === eval.js ===
async function renderEval(container) {
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

// === ingest.js ===
function renderIngest(container) {
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
            const res = await fetch('http://127.0.0.1:8000/api/admin/ingest', {
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

// === share.js ===
const districts = [
    "Bajali", "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", 
    "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", 
    "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", 
    "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", 
    "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", 
    "Tinsukia", "Udalguri", "West Karbi Anglong", "Tamulpur"
].sort();

async function renderShare(container) {
    // Show loader
    container.innerHTML = `
        <h1 class="page-title">Share Your Story</h1>
        <p class="page-subtitle">Contribute to LoreBridge and preserve our cultural heritage.</p>
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p style="color:var(--primary);">Verifying authentication status...</p>
        </div>
    `;

    // Check user authentication via Supabase
    let user = null;
    if (window.getSupabaseUser) {
        user = await window.getSupabaseUser();
    } else if (window.currentAuthUser) {
        user = window.currentAuthUser;
    }

    if (user) {
        renderSubmissionForm(container, user);
    } else {
        renderAuthRequired(container);
    }
}

function renderAuthRequired(container) {
    container.innerHTML = `
        <h1 class="page-title">Share Your Story</h1>
        <p class="page-subtitle">Contribute to LoreBridge and preserve our cultural heritage.</p>
        
        <div class="card" style="max-width: 580px; margin: 2rem auto; text-align: center; border: 1px solid var(--border); padding: 3rem 2rem;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🔐</div>
            <h3 style="color: var(--primary); font-family: 'Playfair Display', serif; margin-top: 0; margin-bottom: 1rem; font-size: 1.6rem;">Authentication Required</h3>
            <p style="color: var(--text-muted); font-size: 0.98rem; line-height: 1.7; margin-bottom: 2rem;">
                To ensure authenticity, citation integrity, and community moderation, you must be logged in to share a story or proverb.
            </p>
            
            <div style="display: flex; flex-direction: column; gap: 0.8rem; max-width: 320px; margin: 0 auto;">
                <button type="button" class="btn-primary" onclick="window.openAuthModal('signin')" style="width: 100%;">Sign In</button>
                <button type="button" class="btn-primary" onclick="window.openAuthModal('signup')" style="width: 100%; background: transparent; border: 1px solid var(--primary); color: var(--primary);">Create Free Account</button>
            </div>

            <!-- Assamese Heritage Callout -->
            <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px dashed var(--border); font-size: 0.85rem; color: var(--text-muted);">
                <span style="color: var(--primary);">🎋 Community Archive:</span> Your contributions help preserve endangered oral traditions, regional dialects, and folklore for future generations.
            </div>
        </div>
    `;
}

function renderSubmissionForm(container, user) {
    const todayStr = new Date().toISOString().split('T')[0];
    const userEmail = user.email || '';
    
    container.innerHTML = `
        <h1 class="page-title">Share Your Story</h1>
        <p class="page-subtitle">Contribute to LoreBridge and preserve our cultural heritage.</p>

        <!-- User Header Info -->
        <div style="max-width: 650px; margin: 0 auto 1.5rem auto; display: flex; justify-content: space-between; align-items: center; font-size: 0.9rem; color: var(--text-muted); background: rgba(230, 200, 106, 0.05); padding: 0.8rem 1.2rem; border-radius: 10px; border: 1px solid var(--border);">
            <div>
                <span class="user-avatar-icon" style="margin-right: 6px;">👤</span>
                <span>Signed in as: <strong style="color: var(--primary);">${userEmail}</strong></span>
            </div>
            <button class="nav-btn-auth nav-btn-logout" style="padding: 0.3rem 0.8rem; font-size: 0.75rem;" onclick="window.handleSignOut()">Sign Out</button>
        </div>

        <div class="card" style="max-width: 650px; margin: 0 auto; text-align: left;">
            <form id="share-form">
                <!-- Type Selection -->
                <div class="form-group" style="margin-bottom: 1.5rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-weight: 500;">Type of Submission *</label>
                    <select id="share-type" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: #0a0f0d; color: var(--text); font-family: inherit;">
                        <option value="folktale">Folktale / Oral Story (সাধুকথা)</option>
                        <option value="proverb">Proverb / Idiom (ফকৰা-যোজনা)</option>
                    </select>
                </div>

                <!-- Title Fields -->
                <div class="form-group" style="margin-bottom: 1.2rem;">
                    <label id="label-title-en" style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Story Title (English) *</label>
                    <input type="text" id="share-title-en" required placeholder="e.g., The Cunning Fox and the Elephant" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>
                
                <div class="form-group" style="margin-bottom: 1.2rem;">
                    <label id="label-title-as" style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Story Title (Assamese Script) *</label>
                    <input type="text" id="share-title-as" required placeholder="e.g., শিয়াল আৰু হাতীৰ সাধু" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <!-- Content Fields -->
                <div class="form-group" style="margin-bottom: 1.2rem;">
                    <label id="label-content-en" style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Story Content / Meaning (English) *</label>
                    <textarea id="share-content-en" required placeholder="Narrate the full story or the proverb's core meaning..." style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text); min-height: 120px; font-family: inherit;"></textarea>
                </div>

                <div class="form-group" id="group-content-as" style="margin-bottom: 1.2rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Story Content (Assamese Script / Optional)</label>
                    <textarea id="share-content-as" placeholder="সাধুটো অসমীয়াত লিখক..." style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text); min-height: 100px; font-family: inherit;"></textarea>
                </div>

                <div class="form-group" id="group-moral" style="margin-bottom: 1.2rem;">
                    <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Moral of the Story *</label>
                    <input type="text" id="share-moral" required placeholder="e.g., True wisdom triumphs over brute force" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                </div>

                <!-- Metadata Fields -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.2rem;" class="two-col-grid">
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Your Name / Submitter *</label>
                        <input type="text" id="share-name" required placeholder="e.g., Ananya Bora" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                    </div>
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Email Address *</label>
                        <input type="email" id="share-email" required value="${userEmail}" readonly style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(255,255,255,0.05); color: var(--text-muted); cursor: not-allowed;">
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.2rem;" class="two-col-grid">
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Village / Town (Assam)</label>
                        <input type="text" id="share-village" placeholder="e.g., Sarthebari" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                    </div>
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">District *</label>
                        <select id="share-district" required style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: #0a0f0d; color: var(--text); font-family: inherit;">
                            <option value="">Select District...</option>
                            ${districts.map(d => `<option value="${d}">${d}</option>`).join('')}
                        </select>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.8rem;" class="two-col-grid">
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Who did you hear this from?</label>
                        <input type="text" id="share-heard-from" placeholder="e.g. My grandmother (Kamrup)" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                    </div>
                    <div class="form-group">
                        <label style="display: block; color: var(--primary); margin-bottom: 0.5rem; font-size: 0.9rem;">Submission Date</label>
                        <input type="date" id="share-date" value="${todayStr}" style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid var(--border); background: rgba(0,0,0,0.3); color: var(--text);">
                    </div>
                </div>

                <!-- Action / Feedback -->
                <div id="share-message" style="margin-bottom: 1.2rem; padding: 1rem; border-radius: 8px; border: 1px solid transparent; display: none; font-size: 0.9rem; line-height: 1.5;"></div>

                <button type="submit" id="share-submit-btn" class="btn-primary" style="width: 100%; padding: 1rem; font-size: 1rem;">
                    Submit Folklore for Archival Review
                </button>
            </form>
        </div>
    `;

    const typeSelect = document.getElementById('share-type');
    const labelTitleEn = document.getElementById('label-title-en');
    const labelTitleAs = document.getElementById('label-title-as');
    const labelContentEn = document.getElementById('label-content-en');
    const groupContentAs = document.getElementById('group-content-as');
    const groupMoral = document.getElementById('group-moral');
    const inputMoral = document.getElementById('share-moral');

    typeSelect.addEventListener('change', () => {
        const type = typeSelect.value;
        if (type === 'proverb') {
            labelTitleEn.innerText = "Proverb Translation (English) *";
            labelTitleAs.innerText = "Proverb Text (Assamese Script) *";
            labelContentEn.innerText = "Proverb Meaning / Cultural Explanation *";
            groupContentAs.style.display = 'none';
            groupMoral.style.display = 'none';
            inputMoral.removeAttribute('required');
        } else {
            labelTitleEn.innerText = "Story Title (English) *";
            labelTitleAs.innerText = "Story Title (Assamese Script) *";
            labelContentEn.innerText = "Story Content / Meaning (English) *";
            groupContentAs.style.display = 'block';
            groupMoral.style.display = 'block';
            inputMoral.setAttribute('required', 'required');
        }
    });

    document.getElementById('share-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = document.getElementById('share-submit-btn');
        const msg = document.getElementById('share-message');
        
        btn.disabled = true;
        btn.innerHTML = '<span class="loading-spinner" style="width:16px; height:16px; border-width:2px; display:inline-block; vertical-align:middle; margin-right:8px;"></span> Submitting to Archives...';
        msg.style.display = 'none';

        const submitType = typeSelect.value;

        const data = {
            type: submitType,
            title_en: document.getElementById('share-title-en').value.trim(),
            title_as: document.getElementById('share-title-as').value.trim(),
            content_en: document.getElementById('share-content-en').value.trim(),
            content_as: submitType === 'folktale' ? document.getElementById('share-content-as').value.trim() : '',
            moral: submitType === 'folktale' ? document.getElementById('share-moral').value.trim() : '',
            contributor_name: document.getElementById('share-name').value.trim(),
            submitter_email: userEmail,
            village: document.getElementById('share-village').value.trim(),
            district: document.getElementById('share-district').value,
            heard_from: document.getElementById('share-heard-from').value.trim(),
            submission_date: document.getElementById('share-date').value,
            confidence: "community",
            user_id: user.id || "anon",
            created_at: new Date().toISOString()
        };

        const supabase = window.getSupabase ? window.getSupabase() : null;

        if (supabase) {
            try {
                const { error } = await supabase.from('submissions').insert([data]);
                if (error) throw error;

                document.getElementById('share-form').reset();
                document.getElementById('share-date').value = todayStr;
                typeSelect.dispatchEvent(new Event('change'));

                msg.style.color = '#4ade80';
                msg.style.borderColor = 'rgba(74, 222, 128, 0.3)';
                msg.style.backgroundColor = 'rgba(74, 222, 128, 0.08)';
                msg.innerHTML = `<strong>✨ Thank You! Submission Received</strong><br>Your folklore entry has been securely saved to the Supabase cultural archives. It will be reviewed by the moderation team before joining the public directory.`;
                msg.style.display = 'block';
            } catch (err) {
                console.warn("Supabase database insert fallback:", err);
                // Fallback to local storage
                saveLocalSubmission(data, msg);
            } finally {
                btn.disabled = false;
                btn.innerText = 'Submit Folklore for Archival Review';
            }
        } else {
            // Local storage fallback for local development / testing
            saveLocalSubmission(data, msg);
            btn.disabled = false;
            btn.innerText = 'Submit Folklore for Archival Review';
        }
    });
}

function saveLocalSubmission(data, msg) {
    const mockSubs = JSON.parse(localStorage.getItem('mock_submissions') || '[]');
    data.id = 'sub_' + Date.now();
    mockSubs.push(data);
    localStorage.setItem('mock_submissions', JSON.stringify(mockSubs));

    document.getElementById('share-form').reset();
    document.getElementById('share-date').value = new Date().toISOString().split('T')[0];
    document.getElementById('share-type').dispatchEvent(new Event('change'));

    msg.style.color = '#4ade80';
    msg.style.borderColor = 'rgba(74, 222, 128, 0.3)';
    msg.style.backgroundColor = 'rgba(74, 222, 128, 0.08)';
    msg.innerHTML = `<strong>✨ Thank You! Submission Received</strong><br>Your folklore contribution has been recorded in the local queue. Once verified, it will be published to the Lore Web.`;
    msg.style.display = 'block';
}

// === auth.js ===
// LoreBridge Supabase Authentication Module

let supabaseClient = null;
let currentAuthUser = null;

function getSupabase() {
    if (supabaseClient) return supabaseClient;
    
    const config = window.LOREBRIDGE_CONFIG || {};
    const url = config.SUPABASE_URL;
    const key = config.SUPABASE_ANON_KEY;

    if (window.supabase && url && key && !url.includes("your-project")) {
        try {
            supabaseClient = window.supabase.createClient(url, key);
            console.log("Supabase Client initialized successfully.");
        } catch (err) {
            console.error("Supabase Client initialization error:", err);
        }
    }
    return supabaseClient;
}

async function signUp(email, password) {
    const client = getSupabase();
    if (!client) {
        throw new Error("Supabase credentials not configured in js/config.js. Please add your SUPABASE_URL and SUPABASE_ANON_KEY.");
    }
    const { data, error } = await client.auth.signUp({
        email,
        password
    });
    if (error) throw error;
    return data;
}

async function signIn(email, password) {
    const client = getSupabase();
    if (!client) {
        throw new Error("Supabase credentials not configured in js/config.js. Please add your SUPABASE_URL and SUPABASE_ANON_KEY.");
    }
    const { data, error } = await client.auth.signInWithPassword({
        email,
        password
    });
    if (error) throw error;
    return data;
}

async function signOut() {
    const client = getSupabase();
    if (client) {
        const { error } = await client.auth.signOut();
        if (error) console.error("SignOut error:", error);
    }
    currentAuthUser = null;
    window.currentAuthUser = null;
    updateNavAuthUI(null);
    if (window.location.hash === '#share') {
        const app = document.getElementById('app');
        if (app && window.renderShare) window.renderShare(app);
    }
}

async function getUser() {
    const client = getSupabase();
    if (!client) return null;
    try {
        const { data: { user } } = await client.auth.getUser();
        currentAuthUser = user;
        window.currentAuthUser = user;
        return user;
    } catch (e) {
        return null;
    }
}

async function getSession() {
    const client = getSupabase();
    if (!client) return null;
    try {
        const { data: { session } } = await client.auth.getSession();
        return session;
    } catch (e) {
        return null;
    }
}

function onAuthStateChange(callback) {
    const client = getSupabase();
    if (!client) return { data: { subscription: { unsubscribe: () => {} } } };
    return client.auth.onAuthStateChange((event, session) => {
        const user = session?.user || null;
        currentAuthUser = user;
        window.currentAuthUser = user;
        updateNavAuthUI(user);
        if (callback) callback(event, session);
    });
}

// UI Helpers
function updateNavAuthUI(user) {
    const container = document.getElementById('nav-auth-container');
    if (!container) return;

    if (user) {
        const displayEmail = user.email || 'User';
        const shortEmail = displayEmail.length > 18 ? displayEmail.substring(0, 15) + '...' : displayEmail;
        container.innerHTML = `
            <div class="nav-user-badge" title="${displayEmail}">
                <span class="user-avatar-icon">👤</span>
                <span class="user-email-text">${shortEmail}</span>
            </div>
            <button class="nav-btn-auth nav-btn-logout" onclick="window.handleSignOut()" title="Sign Out">Sign Out</button>
        `;
    } else {
        container.innerHTML = `
            <button class="nav-btn-auth" onclick="window.openAuthModal('signin')" title="Sign In">Sign In</button>
        `;
    }
}

function openAuthModal(defaultTab = 'signin') {
    const modal = document.getElementById('auth-modal');
    if (!modal) return;
    modal.classList.add('active');
    switchAuthTab(defaultTab);
    const emailInput = document.getElementById('auth-modal-email');
    if (emailInput) {
        setTimeout(() => emailInput.focus(), 100);
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('active');
    const errBox = document.getElementById('auth-modal-error');
    if (errBox) errBox.style.display = 'none';
    const successBox = document.getElementById('auth-modal-success');
    if (successBox) successBox.style.display = 'none';
}

function switchAuthTab(tab) {
    const tabSignIn = document.getElementById('tab-btn-signin');
    const tabSignUp = document.getElementById('tab-btn-signup');
    const submitBtn = document.getElementById('auth-modal-submit');
    const title = document.getElementById('auth-modal-title');
    const note = document.getElementById('auth-modal-note');
    const errBox = document.getElementById('auth-modal-error');
    const successBox = document.getElementById('auth-modal-success');

    if (errBox) errBox.style.display = 'none';
    if (successBox) successBox.style.display = 'none';

    if (tab === 'signup') {
        if (tabSignUp) tabSignUp.classList.add('active');
        if (tabSignIn) tabSignIn.classList.remove('active');
        if (submitBtn) submitBtn.innerText = 'Create Account';
        if (title) title.innerText = 'Join LoreBridge';
        if (note) note.innerHTML = 'Already have an account? <a href="javascript:void(0)" onclick="window.switchAuthTab(\'signin\')" style="color:var(--primary);">Sign In</a>';
        const form = document.getElementById('auth-modal-form');
        if (form) form.dataset.mode = 'signup';
    } else {
        if (tabSignIn) tabSignIn.classList.add('active');
        if (tabSignUp) tabSignUp.classList.remove('active');
        if (submitBtn) submitBtn.innerText = 'Sign In';
        if (title) title.innerText = 'Welcome Back';
        if (note) note.innerHTML = 'Don\'t have an account yet? <a href="javascript:void(0)" onclick="window.switchAuthTab(\'signup\')" style="color:var(--primary);">Sign Up</a>';
        const form = document.getElementById('auth-modal-form');
        if (form) form.dataset.mode = 'signin';
    }
}

async function handleAuthSubmit(e) {
    e.preventDefault();
    const form = document.getElementById('auth-modal-form');
    const email = document.getElementById('auth-modal-email')?.value.trim();
    const password = document.getElementById('auth-modal-password')?.value;
    const submitBtn = document.getElementById('auth-modal-submit');
    const errBox = document.getElementById('auth-modal-error');
    const successBox = document.getElementById('auth-modal-success');
    const mode = form?.dataset.mode || 'signin';

    if (!email || !password) {
        if (errBox) {
            errBox.innerText = 'Please enter both email and password.';
            errBox.style.display = 'block';
        }
        return;
    }

    if (errBox) errBox.style.display = 'none';
    if (successBox) successBox.style.display = 'none';
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="loading-spinner" style="width:16px; height:16px; border-width:2px; display:inline-block; vertical-align:middle; margin-right:8px;"></span> Processing...';
    }

    try {
        if (mode === 'signup') {
            const data = await signUp(email, password);
            if (successBox) {
                if (data.session) {
                    successBox.innerText = 'Account created successfully! Welcome to LoreBridge.';
                    successBox.style.display = 'block';
                    setTimeout(() => {
                        closeAuthModal();
                        if (window.location.hash === '#share') {
                            const app = document.getElementById('app');
                            if (app && window.renderShare) window.renderShare(app);
                        }
                    }, 1000);
                } else {
                    successBox.innerText = 'Account created! Please check your email to confirm your registration.';
                    successBox.style.display = 'block';
                }
            }
        } else {
            await signIn(email, password);
            if (successBox) {
                successBox.innerText = 'Signed in successfully! Welcome back.';
                successBox.style.display = 'block';
            }
            setTimeout(() => {
                closeAuthModal();
                if (window.location.hash === '#share') {
                    const app = document.getElementById('app');
                    if (app && window.renderShare) window.renderShare(app);
                }
            }, 800);
        }
    } catch (err) {
        console.error("Auth error:", err);
        if (errBox) {
            errBox.innerText = err.message || 'Authentication failed. Please check your credentials.';
            errBox.style.display = 'block';
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerText = mode === 'signup' ? 'Create Account' : 'Sign In';
        }
    }
}

// Global Exports
window.getSupabase = getSupabase;
window.signUp = signUp;
window.signIn = signIn;
window.handleSignOut = signOut;
window.getSupabaseUser = getUser;
window.openAuthModal = openAuthModal;
window.closeAuthModal = closeAuthModal;
window.switchAuthTab = switchAuthTab;
window.handleAuthSubmit = handleAuthSubmit;
window.updateNavAuthUI = updateNavAuthUI;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    // Initial check
    const user = await getUser();
    updateNavAuthUI(user);
    onAuthStateChange((event, session) => {
        updateNavAuthUI(session?.user || null);
    });

    // Close on backdrop click
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeAuthModal();
        });
    }

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAuthModal();
    });
});

// === data.js ===
const proverbs = [
    {
        "id": "p_1",
        "assamese": "যি মূলা বাঢ়ে তাৰ দুপাততে চিন",
        "transliteration": "Ji mula bare tar dupatote chin",
        "meaning": "Morning shows the day",
        "themes": [
            "Wisdom",
            " Observation"
        ]
    },
    {
        "id": "p_2",
        "assamese": "বোকাতহে পদুম ফুলে",
        "transliteration": "Bukatohe podum phule",
        "meaning": "The lotus blooms in mud",
        "themes": [
            "Resilience",
            " Nature"
        ]
    },
    {
        "id": "p_3",
        "assamese": "দূৰৰ পাহাৰ সদায় শুৱনি",
        "transliteration": "Dooror pahar sodai xuwani",
        "meaning": "The distant hill always looks beautiful",
        "themes": [
            "Perspective",
            " Wisdom"
        ]
    },
    {
        "id": "p_4",
        "assamese": "একতাই পৰম বল",
        "transliteration": "Ekotaai porom bol",
        "meaning": "Unity is the greatest strength",
        "themes": [
            "Community",
            " Strength"
        ]
    },
    {
        "id": "p_5",
        "assamese": "নিজ বুদ্ধি শিলৰ খুটি",
        "transliteration": "Nij buddhi xilor khuti",
        "meaning": "Your own wisdom is a pillar of stone",
        "themes": [
            "Self-reliance",
            " Wisdom"
        ]
    },
    {
        "id": "p_6",
        "assamese": "লোভেই পাপ, পাপেই মৃত্যু",
        "transliteration": "Lobhei paap, paapei mrityu",
        "meaning": "Greed is sin, sin is death",
        "themes": [
            "Ethics",
            " Karma"
        ]
    },
    {
        "id": "p_7",
        "assamese": "সাহেই সিদ্ধি",
        "transliteration": "Xahei xidhi",
        "meaning": "Courage brings success",
        "themes": [
            "Courage",
            " Action"
        ]
    },
    {
        "id": "p_8",
        "assamese": "এবাৰ সাপে খুটিলে কেছুলৈয়ো ভয়",
        "transliteration": "Ebar xaape khutile kaexulaiyo bhoy",
        "meaning": "Once bitten by a snake, one fears even a worm",
        "themes": [
            "Caution",
            " Fear",
            " Experience"
        ]
    },
    {
        "id": "p_9",
        "assamese": "আপোন ভালেই জগত ভাল",
        "transliteration": "Apun bhalei jogot bhal",
        "meaning": "If you are good, the world is good",
        "themes": [
            "Virtue",
            " Perspective"
        ]
    },
    {
        "id": "p_10",
        "assamese": "অল্প বিদ্যা ভয়ংকৰ",
        "transliteration": "Olpo bidya bhoyongkor",
        "meaning": "A little knowledge is dangerous",
        "themes": [
            "Education",
            " Humility"
        ]
    },
    {
        "id": "p_11",
        "assamese": "🟡 Yellow = Unverified (needs elder/teacher review)   🟢 Green = Verified",
        "transliteration": "",
        "meaning": "",
        "themes": []
    }
];

const folktales = [
    { id: "f1", title: "Tejimola", summary: "A tragic tale of a stepdaughter who turns into various plants. (Check Chat for full details!)" },
    { id: "f2", title: "Burhi Aair Xadhu", summary: "Grandma's tales compilation." }
];

// === app.js ===
function route() {
    if (window.currentAudio) {
        window.currentAudio.pause();
        window.currentAudio = null;
    }
    const hash = window.location.hash || '#home';
    const baseHash = hash.split('?')[0];
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    // Close mobile nav menu if open
    const navLinks = document.getElementById('nav-links');
    const navToggle = document.getElementById('nav-toggle');
    if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        if (navToggle) {
            navToggle.innerText = '☰';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
    
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`nav a[href="${baseHash}"]`);
    if(link) link.classList.add('active');

    if(baseHash === '#home') renderHome(app);
    else if(baseHash === '#folktales') renderFolktales(app);
    else if(baseHash === '#proverbs') renderProverbs(app);
    else if(baseHash === '#graph') renderGraph(app);
    else if(baseHash === '#chat') renderChat(app);
    else if(baseHash === '#about') renderAbout(app);
    else if(baseHash === '#admin') renderAdmin(app);
    else if(baseHash === '#quality') renderQuality(app);
    else if(baseHash === '#eval') renderEval(app);
    else if(baseHash === '#ingest') renderIngest(app);
    else if(baseHash === '#share') renderShare(app);
}

window.initAudioPlayers = async function(container) {
    const playerContainers = container.querySelectorAll('.audio-player-container');
    if (playerContainers.length === 0) return;

    const isMock = window.location.search.includes('mock=true') || window.location.search.includes('test_audio=true');
    let storage = null;

    if (!isMock) {
        try {
            const { initializeApp } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
            const { getStorage } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js");
            
            const firebaseConfig = window.firebaseConfig || {
                projectId: "lorebridge-placeholder",
                storageBucket: "lorebridge-placeholder.appspot.com"
            };
            
            const app = initializeApp(firebaseConfig);
            storage = getStorage(app);
        } catch (err) {
            console.error("Firebase Storage init error:", err);
        }
    }

    playerContainers.forEach(async (playerContainer) => {
        const type = playerContainer.dataset.type;
        const id = playerContainer.dataset.id;
        const path = `audio/${type === 'folktale' ? 'folktales' : 'proverbs'}/${id}.mp3`;
        let audioUrl = null;

        if (isMock) {
            // Mock URL for testing UI layout and playback controls
            audioUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
        } else if (storage) {
            try {
                const { ref, getDownloadURL } = await import("https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js");
                const audioRef = ref(storage, path);
                audioUrl = await getDownloadURL(audioRef);
            } catch (err) {
                // If it fails, audioUrl remains null (leads to "Audio coming soon")
                console.warn(`No audio found for path: ${path}`);
            }
        }

        if (audioUrl) {
            playerContainer.innerHTML = `
                <div class="custom-audio-player">
                    <button class="audio-play-btn" title="Play">▶</button>
                    <input type="range" class="audio-slider" value="0" min="0" max="100">
                    <span class="audio-time-display">0:00 / 0:00</span>
                </div>
            `;

            const audio = new Audio(audioUrl);
            const playBtn = playerContainer.querySelector('.audio-play-btn');
            const slider = playerContainer.querySelector('.audio-slider');
            const timeDisplay = playerContainer.querySelector('.audio-time-display');

            const formatTime = (secs) => {
                if (isNaN(secs)) return '0:00';
                const m = Math.floor(secs / 60);
                const s = Math.floor(secs % 60).toString().padStart(2, '0');
                return `${m}:${s}`;
            };

            audio.addEventListener('loadedmetadata', () => {
                timeDisplay.innerText = `0:00 / ${formatTime(audio.duration)}`;
                slider.max = Math.floor(audio.duration);
            });

            if (audio.readyState >= 1) {
                timeDisplay.innerText = `0:00 / ${formatTime(audio.duration)}`;
                slider.max = Math.floor(audio.duration);
            }

            playBtn.addEventListener('click', () => {
                if (window.currentAudio && window.currentAudio !== audio) {
                    window.currentAudio.pause();
                    const otherPlayBtn = window.currentAudio.playBtnRef;
                    if (otherPlayBtn) otherPlayBtn.innerText = '▶';
                }

                if (audio.paused) {
                    audio.play();
                    playBtn.innerText = '⏸';
                    window.currentAudio = audio;
                    audio.playBtnRef = playBtn;
                } else {
                    audio.pause();
                    playBtn.innerText = '▶';
                    if (window.currentAudio === audio) {
                        window.currentAudio = null;
                    }
                }
            });

            audio.addEventListener('timeupdate', () => {
                slider.value = Math.floor(audio.currentTime);
                timeDisplay.innerText = `${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
            });

            slider.addEventListener('input', () => {
                audio.currentTime = slider.value;
            });

            audio.addEventListener('ended', () => {
                playBtn.innerText = '▶';
                slider.value = 0;
                timeDisplay.innerText = `0:00 / ${formatTime(audio.duration)}`;
                if (window.currentAudio === audio) {
                    window.currentAudio = null;
                }
            });
        } else {
            playerContainer.innerHTML = `
                <span class="audio-coming-soon-badge">⚠️ Audio coming soon</span>
            `;
        }
    });
};

window.addEventListener('hashchange', route);
route();

window.currentLanguage = localStorage.getItem('lorebridge_lang') || 'en';

window.updateLangButtonUI = function() {
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        const isEn = window.currentLanguage === 'en';
        langBtn.innerText = isEn ? 'অ' : 'A';
        langBtn.title = isEn ? 'Switch to Assamese Content (অ)' : 'Switch to English Content (A)';
        langBtn.setAttribute('aria-label', isEn ? 'Switch to Assamese Content' : 'Switch to English Content');
    }
};

window.toggleLanguage = function() {
    window.currentLanguage = window.currentLanguage === 'en' ? 'as' : 'en';
    localStorage.setItem('lorebridge_lang', window.currentLanguage);
    window.updateLangButtonUI();
    route();
};

document.addEventListener('DOMContentLoaded', () => {
    window.updateLangButtonUI();
});


// Favorites Logic
window.toggleFavorite = function(btn, id) {
    let favs = JSON.parse(localStorage.getItem('lorebridge_favs') || '[]');
    if (favs.includes(id)) {
        favs = favs.filter(f => f !== id);
        btn.innerHTML = '🤍';
    } else {
        favs.push(id);
        btn.innerHTML = '❤️';
    }
    localStorage.setItem('lorebridge_favs', JSON.stringify(favs));
    
    // Refresh filter if we are currently looking at favorites
    const activeChip = document.querySelector('.filter-sidebar .filter-chip.active');
    if (activeChip && activeChip.innerText === 'My Favorites') {
        const cardType = window.location.hash === '#proverbs' ? 'proverb' : 'folktale';
        window.filterCards(activeChip, 'favorites', cardType);
    }
};

window.isFavorite = function(id) {
    let favs = JSON.parse(localStorage.getItem('lorebridge_favs') || '[]');
    return favs.includes(id);
};

// Analytics Logic (View Tracking)
window.trackView = function(id) {
    let views = JSON.parse(localStorage.getItem('lorebridge_views') || '{}');
    views[id] = (views[id] || 0) + 1;
    localStorage.setItem('lorebridge_views', JSON.stringify(views));
    
    // Optionally alert the UI to re-render the view counter
    const viewCounter = document.getElementById('view-count-' + id);
    if (viewCounter) {
        viewCounter.innerText = `👁️ ${views[id]}`;
    }
};

window.getViewCount = function(id) {
    let views = JSON.parse(localStorage.getItem('lorebridge_views') || '{}');
    return views[id] || 0;
};

// Share Logic
window.shareStory = function(btn, title, summary) {
    const shareText = `Check out this Assamese tale/proverb from LoreBridge: ${title}\n\n${summary}\n\nExplore more at: ${window.location.origin}`;
    if (navigator.share) {
        navigator.share({
            title: title,
            text: shareText,
            url: window.location.origin
        }).catch(console.error);
    } else {
        navigator.clipboard.writeText(shareText).then(() => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '✅ Copied to clipboard!';
            setTimeout(() => { btn.innerHTML = originalText; }, 2000);
        });
    }
};

// Global Web Speech API setup for Assamese Pronunciation
window.playAssameseAudio = function(btn, text) {
    if (!('speechSynthesis' in window)) {
        alert("Your browser does not support text-to-speech.");
        return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.includes('as-IN') || v.lang.includes('as')) 
                     || voices.find(v => v.lang.includes('hi-IN'))
                     || voices[0];
    if (targetVoice) utterance.voice = targetVoice;
    utterance.lang = targetVoice?.lang.includes('as') ? 'as-IN' : 'hi-IN';
    utterance.rate = 0.85; 
    
    utterance.onstart = () => {
        btn.classList.add('playing');
        btn.innerHTML = '🔊';
    };
    utterance.onend = () => {
        btn.classList.remove('playing');
        btn.innerHTML = '▶';
    };
    utterance.onerror = () => {
        btn.classList.remove('playing');
        btn.innerHTML = '▶';
    };
    window.speechSynthesis.speak(utterance);
};

// Global Filter Logic for Sidebars
window.filterCards = function(btn, tag, type) {
    const sidebar = btn.closest('.filter-sidebar');
    if (sidebar) {
        sidebar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
    }

    const gridId = type === 'folktale' ? 'folktale-grid' : 'proverb-grid';
    const cardClass = type === 'folktale' ? '.folktale-card' : '.proverb-card';
    const grid = document.getElementById(gridId);
    if (!grid) return;

    const cards = grid.querySelectorAll(cardClass);
    cards.forEach(card => {
        if (tag === 'all') {
            card.classList.remove('filtered-out');
            return;
        }
        
        if (tag === 'favorites') {
            const favId = card.getAttribute('data-id');
            if (window.isFavorite(favId)) {
                card.classList.remove('filtered-out');
            } else {
                card.classList.add('filtered-out');
            }
            return;
        }

        const tagsStr = card.getAttribute('data-tags') || '';
        const tags = tagsStr.toLowerCase().split('|');
        if (tags.includes(tag.toLowerCase())) {
            card.classList.remove('filtered-out');
        } else {
            card.classList.add('filtered-out');
        }
    });
};

// Global Search Logic
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('global-search-input');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchResults = document.getElementById('search-results');
    const themeToggle = document.getElementById('theme-toggle');

    // Mobile Hamburger Menu Logic
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = navLinks.classList.toggle('open');
            navToggle.innerText = isOpen ? '✕' : '☰';
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.innerText = '☰';
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        document.addEventListener('click', (e) => {
            const nav = document.getElementById('main-nav') || document.querySelector('nav');
            if (nav && !nav.contains(e.target) && navLinks.classList.contains('open')) {
                navLinks.classList.remove('open');
                navToggle.innerText = '☰';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Theme Toggle Logic
    if (themeToggle) {
        const savedTheme = localStorage.getItem('lorebridge_theme');
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        
        if (savedTheme === 'light' || (!savedTheme && prefersLight)) {
            document.documentElement.setAttribute('data-theme', 'light');
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('lorebridge_theme', 'dark');
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('lorebridge_theme', 'light');
            }
        });
    }

    if (!searchInput) return;

    let searchData = [];
    let dataLoaded = false;

    async function loadSearchData() {
        try {
            const [ftRes, prRes] = await Promise.all([
                fetch('/folktales.json'),
                fetch('/proverbs.json')
            ]);
            const ftData = await ftRes.json();
            const prData = await prRes.json();
            searchData = [...ftData.entries, ...prData.entries];
            dataLoaded = true;
        } catch (e) {
            console.error("Search data load error", e);
        }
    }

    searchInput.addEventListener('focus', () => {
        searchOverlay.classList.add('active');
        if (!dataLoaded) loadSearchData();
        renderSearch(searchInput.value);
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('active');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    searchInput.addEventListener('input', (e) => {
        renderSearch(e.target.value);
    });

    function renderSearch(query) {
        if (!query.trim()) {
            searchResults.innerHTML = '<p style="color:var(--text-muted);">Start typing to search tales and proverbs...</p>';
            return;
        }
        const q = query.toLowerCase();
        const results = searchData.filter(item => {
            const str = JSON.stringify(item).toLowerCase();
            return str.includes(q);
        }).slice(0, 10); // Limit to top 10

        if (results.length === 0) {
            searchResults.innerHTML = '<p style="color:var(--text-muted);">No stories or proverbs found matching your query.</p>';
            return;
        }

        searchResults.innerHTML = results.map(r => {
            const isFolktale = !!r.title;
            const title = isFolktale ? r.title : r.proverb;
            const sub = isFolktale ? r.summary : r.translation;
            const link = isFolktale ? '#folktales' : '#proverbs';
            return `
                <div class="card" style="cursor:pointer;" onclick="window.location.hash='${link}'; document.getElementById('search-close').click();">
                    <div style="display:flex; justify-content:space-between;">
                        <h4 style="margin:0; font-family:'Playfair Display', serif;">${title}</h4>
                        <span class="badge">${isFolktale ? 'Folktale' : 'Proverb'}</span>
                    </div>
                    <p style="margin-top:0.5rem; color:var(--text-muted); font-size:0.9rem;">${sub.substring(0,100)}...</p>
                </div>
            `;
        }).join('');
    }
});

// Load Related Stories
window.loadRelatedStories = async function(storyId) {
    const container = document.querySelector(`#details-${storyId} .related-stories-container`);
    if (!container || container.dataset.loaded === 'true') return;

    container.innerHTML = `
        <p style="color: var(--primary); text-align: center; font-size: 0.9rem; margin-top: 1rem;">
            <span class="loading-spinner" style="width: 16px; height: 16px; display: inline-block; border-width: 2px; vertical-align: middle; margin-right: 8px;"></span>
            Consulting the archives for related tales...
        </p>
    `;

    try {
        const res = await fetch(`/api/related/${storyId}`);
        if (!res.ok) throw new Error();
        const related = await res.json();

        if (related.length === 0) {
            container.style.display = 'none';
            return;
        }

        container.innerHTML = `
            <!-- Small decorative divider -->
            <div style="display: flex; justify-content: center; gap: 8px; margin: 1.5rem 0 1rem 0; color: var(--primary); opacity: 0.4; font-size: 0.8rem;">
                ◆ ❖ ◆
            </div>
            <h5 style="font-family: 'Playfair Display', serif; color: var(--primary); margin: 0 0 1.2rem 0; font-size: 1.1rem; text-align: center; letter-spacing: 0.5px;">You Might Also Enjoy</h5>
            <div class="related-stories-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem;">
                ${related.map(r => `
                    <div class="card related-story-card" style="padding: 1.2rem; background: rgba(0,0,0,0.3); border: 1px solid var(--border); border-radius: 8px; display: flex; flex-direction: column; justify-content: space-between; min-height: 140px; box-shadow: none; transition: var(--transition);">
                        <div>
                            <h6 style="margin: 0 0 0.5rem 0; font-family: 'Playfair Display', serif; font-size: 1rem; color: var(--primary); line-height: 1.3;">${r.title}</h6>
                            <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${r.summary}</p>
                        </div>
                        <button class="btn-primary" style="margin-top: 1rem; padding: 0.4rem 0.8rem; font-size: 0.75rem; border-radius: 4px; text-transform: none; letter-spacing: 0; align-self: flex-start;" onclick="window.scrollToStory('${r.id}')">Read Story</button>
                    </div>
                `).join('')}
            </div>
        `;
        container.dataset.loaded = 'true';
    } catch (e) {
        console.error("Failed to load related stories:", e);
        container.innerHTML = '';
    }
};

window.scrollToStory = function(storyId) {
    const card = document.querySelector(`.folktale-card[data-id="${storyId}"]`);
    if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Open the details if not already open
        const details = card.querySelector('.expand-details');
        const expandBtn = card.querySelector('.expand-btn');
        if (details && !details.classList.contains('open')) {
            details.classList.add('open');
            if (expandBtn) expandBtn.innerText = 'Read Less';
            if (window.trackView) window.trackView(storyId);
            if (window.loadRelatedStories) window.loadRelatedStories(storyId);
        }
    } else {
        // Fallback: if not found, redirect to folktales and scroll after delay
        window.location.hash = '#folktales';
        setTimeout(() => {
            window.scrollToStory(storyId);
        }, 300);
    }
};
