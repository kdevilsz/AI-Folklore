export async function renderHome(container) {
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
