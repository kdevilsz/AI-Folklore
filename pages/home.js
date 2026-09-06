export async function renderHome(container) {
    const lang = window.currentLanguage || 'en';
    
    const title = "Echoes of the Brahmaputra";
    const subtitle = `<span class="dropcap">L</span>oreBridge preserves and illuminates the timeless folktales, proverbs, and traditional wisdom of Assam. Step into a digital sanctuary where the mighty Brahmaputra whispers legends of spirits, kings, and ancient wisdom. <a href="#about" style="color: var(--primary); text-decoration: underline; font-weight: 500;">Read our story &rarr;</a>`;

    // Authentic Full-Width Assamese Geometric Section Divider Component
    function getAssameseDividerSVG() {
        return `
            <div class="assamese-section-divider" aria-hidden="true">
                <svg class="assamese-divider-svg" viewBox="0 0 1200 42" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="dividerFade" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stop-color="#C8960C" stop-opacity="0"/>
                            <stop offset="15%" stop-color="#C8960C" stop-opacity="0.8"/>
                            <stop offset="50%" stop-color="#C8960C" stop-opacity="1"/>
                            <stop offset="85%" stop-color="#C8960C" stop-opacity="0.8"/>
                            <stop offset="100%" stop-color="#C8960C" stop-opacity="0"/>
                        </linearGradient>
                        <pattern id="assameseDividerPattern" width="40" height="42" patternUnits="userSpaceOnUse">
                            <!-- Stepped Diamonds & River Chevrons -->
                            <path d="M20 5 L33 18 L20 31 L7 18 Z" stroke="#C8960C" stroke-width="1.3" fill="rgba(200, 150, 12, 0.08)"/>
                            <circle cx="20" cy="18" r="2.2" fill="#C8960C"/>
                            <path d="M0 18 L7 18 M33 18 L40 18" stroke="#C8960C" stroke-width="1"/>
                            <!-- River Ripple Chevrons with subtle red woven accent -->
                            <path d="M0 5 L20 20 L40 5 M0 31 L20 16 L40 31" stroke="#b8251b" stroke-width="1" opacity="0.45"/>
                            <!-- Lotus Bud Repeats -->
                            <circle cx="20" cy="3" r="1.5" fill="#ffd866"/>
                            <circle cx="20" cy="33" r="1.5" fill="#ffd866"/>
                        </pattern>
                    </defs>
                    <!-- Horizontal Guide Lines -->
                    <line x1="30" y1="21" x2="1170" y2="21" stroke="url(#dividerFade)" stroke-width="1.2" opacity="0.5"/>
                    <line x1="80" y1="8" x2="1120" y2="8" stroke="url(#dividerFade)" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>
                    <line x1="80" y1="34" x2="1120" y2="34" stroke="url(#dividerFade)" stroke-width="1" stroke-dasharray="4 4" opacity="0.4"/>
                    
                    <!-- Repeating Geometric Assamese Motif Band -->
                    <rect x="90" y="3" width="1020" height="36" fill="url(#assameseDividerPattern)" opacity="0.85"/>
                    
                    <!-- Center Ceremonial Kingkhap Medallion -->
                    <g transform="translate(600, 21)">
                        <rect x="-60" y="-18" width="120" height="36" fill="var(--bg-dark, #080d0a)" rx="4"/>
                        <!-- Outer Stepped Diamond -->
                        <path d="M0 -18 L25 0 L0 18 L-25 0 Z" fill="#C8960C" fill-opacity="0.2" stroke="#C8960C" stroke-width="1.8"/>
                        <!-- Inner Red Silk Diamond -->
                        <path d="M0 -11 L15 0 L0 11 L-15 0 Z" fill="#b8251b" fill-opacity="0.4" stroke="#b8251b" stroke-width="1.2"/>
                        <!-- Lotus Core -->
                        <circle cx="0" cy="0" r="4" fill="#C8960C"/>
                        <circle cx="0" cy="-5.5" r="1.3" fill="#ffd866"/>
                        <circle cx="0" cy="5.5" r="1.3" fill="#ffd866"/>
                        <circle cx="-5.5" cy="0" r="1.3" fill="#ffd866"/>
                        <circle cx="5.5" cy="0" r="1.3" fill="#ffd866"/>
                        <!-- Flanking Traditional Rosettes -->
                        <path d="M-36 0 L-46 -7 L-40 0 L-46 7 Z" fill="#C8960C"/>
                        <path d="M36 0 L46 -7 L40 0 L46 7 Z" fill="#C8960C"/>
                    </g>
                </svg>
            </div>
        `;
    }

    container.innerHTML = `
        <div class="hero-section">
            <!-- Full-Width Assamese Gamosa Decorative Banner Strip (Real Photo, Cropped to Decorative Border End) -->
            <div class="hero-gamosa-banner" role="presentation">
                <img src="assets/images/gamosa-banner.png" alt="Traditional Assamese Gamosa Decorative Woven Border" class="hero-gamosa-img">
                <div class="gamosa-gold-overlay" aria-hidden="true"></div>
            </div>

            <!-- Floating Decorative Assamese Elements (Opacity 0.15 Gold) -->
            <div class="hero-floating-elements" aria-hidden="true">
                <!-- One-Horned Rhino (Kaziranga Rhino Outline) -->
                <svg class="floating-elem floating-rhino" viewBox="0 0 160 100" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Kaziranga One-Horned Rhino">
                    <path d="M14 62 C20 54 26 50 36 50 C40 45 46 42 54 42 C64 42 70 38 76 34 C82 30 92 28 104 28 C118 28 126 34 132 38 C138 34 144 32 150 36 C154 39 156 44 154 48 C158 46 160 48 158 52 C154 58 146 62 138 64 C132 70 128 78 128 88 L120 88 C120 80 122 74 118 70 C108 72 96 72 84 72 C80 78 78 84 78 88 L70 88 C70 80 72 74 68 70 C58 70 48 68 40 72 L38 88 L30 88 C30 78 32 72 26 68 C20 68 16 66 14 62 Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M148 34 C150 24 156 16 160 12 C157 20 155 28 153 36 Z" fill="currentColor" stroke-width="1.5"/>
                    <path d="M128 28 L130 20 L134 26" stroke-width="1.5"/>
                    <path d="M122 28 L124 22 L127 27" stroke-width="1.5"/>
                    <path d="M110 32 C106 42 106 56 112 66" stroke-width="1.8" stroke-dasharray="3 3"/>
                    <path d="M60 44 C56 52 56 60 62 68" stroke-width="1.8" stroke-dasharray="3 3"/>
                    <path d="M80 34 C86 44 86 58 82 70" stroke-width="1.5" opacity="0.6"/>
                    <circle cx="138" cy="42" r="1.5" fill="currentColor"/>
                </svg>

                <!-- Bihu Dhol (Traditional Drum Silhouette) -->
                <svg class="floating-elem floating-dhol" viewBox="0 0 120 90" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Assamese Bihu Dhol">
                    <ellipse cx="28" cy="45" rx="14" ry="26" stroke-width="2"/>
                    <ellipse cx="92" cy="45" rx="14" ry="26" stroke-width="2"/>
                    <path d="M28 19 C55 14 65 14 92 19 M28 71 C55 76 65 76 92 71" stroke-width="2"/>
                    <path d="M28 22 L50 74 L70 20 L92 70 M28 68 L50 16 L70 70 L92 20" stroke-width="1.4" opacity="0.75"/>
                    <ellipse cx="60" cy="45" rx="8" ry="28" stroke-width="1.2" stroke-dasharray="2 3"/>
                    <path d="M12 78 Q45 68 85 82" stroke-width="2.5" stroke-linecap="round"/>
                    <circle cx="28" cy="45" r="5" fill="currentColor" opacity="0.3"/>
                    <circle cx="92" cy="45" r="5" fill="currentColor" opacity="0.3"/>
                </svg>

                <!-- Floating Sacred Lotus (Padum Phool) -->
                <svg class="floating-elem floating-lotus lotus-left" viewBox="0 0 80 80" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Assamese Lotus Motif">
                    <path d="M40 14 C36 26 24 38 12 46 C26 48 36 44 40 54 C44 44 54 48 68 46 C56 38 44 26 40 14 Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"/>
                    <path d="M40 26 C38 34 32 42 22 48 C30 49 37 47 40 54 C43 47 50 49 58 48 C48 42 42 34 40 26 Z" stroke-width="1.2"/>
                    <path d="M40 54 L40 68" stroke-width="2" stroke-linecap="round"/>
                    <path d="M30 62 Q40 58 50 62" stroke-width="1.5"/>
                </svg>

                <svg class="floating-elem floating-lotus lotus-right" viewBox="0 0 80 80" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Assamese Lotus Motif">
                    <path d="M40 14 C36 26 24 38 12 46 C26 48 36 44 40 54 C44 44 54 48 68 46 C56 38 44 26 40 14 Z" stroke-width="1.8" fill="currentColor" fill-opacity="0.12"/>
                    <path d="M40 26 C38 34 32 42 22 48 C30 49 37 47 40 54 C43 47 50 49 58 48 C48 42 42 34 40 26 Z" stroke-width="1.2"/>
                    <path d="M40 54 L40 68" stroke-width="2" stroke-linecap="round"/>
                    <path d="M30 62 Q40 58 50 62" stroke-width="1.5"/>
                </svg>
            </div>

            <!-- Real Illustrated Assamese Jappi Hat Photo Centered Above Title -->
            <div class="hero-jappi-container">
                <div class="hero-jappi-wrapper">
                    <img src="assets/images/hero-jappi.png" alt="Authentic Assamese Phulam Jappi Hat" class="hero-jappi-img" width="220" height="220">
                    <div class="jappi-gold-blend" aria-hidden="true"></div>
                </div>
            </div>

            <!-- Hero Center Content -->
            <div class="hero-center-content">
                <div class="hero-kicker-badge">
                    <span class="motif-glyph">❖</span>
                    <span>অসমৰ লোককথা আৰু ঐতিহ্য &bull; DIGITAL SANCTUARY</span>
                    <span class="motif-glyph">❖</span>
                </div>
                <h1 class="page-title hero-title">${title}</h1>
                <p class="page-subtitle hero-subtitle">${subtitle}</p>
            </div>

            <!-- Full-Width Assamese Geometric Section Divider -->
            ${getAssameseDividerSVG()}

            <!-- Interactive Widgets Grid -->
            <div id="home-widgets" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 1040px; margin: 2rem auto; text-align: left;">
                <div class="card manuscript-card" style="flex: 1; min-width: 300px;">
                    <div class="loading-spinner" style="margin: 2rem auto;"></div>
                </div>
            </div>

            <!-- Full-Width Assamese Geometric Section Divider -->
            ${getAssameseDividerSVG()}

            <!-- Direct Entry Sanctuaries -->
            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 900px; margin: 2rem auto 3rem auto; text-align: left; padding: 0 1rem;">
                <div class="card wisdom-card" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary); font-weight: 600; margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(200, 150, 12, 0.3); padding-bottom: 0.3rem;">
                            <span>🔮 AI CULTURAL CONSULTANT</span>
                        </div>
                        <h3 style="font-size: 1.45rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                            The Oracle Awaits
                        </h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.65;">
                            Consult our AI-powered Oracle to delve deep into ancient stories, analyze morals, or request bilingual explanations of Assamese folk traditions.
                        </p>
                    </div>
                    <button class="btn-primary" style="margin-top: 1.5rem; width: 100%;" onclick="window.location.hash='#chat'">
                        Enter Sanctuary &rarr;
                    </button>
                </div>
                
                <div class="card wisdom-card" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary); font-weight: 600; margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(200, 150, 12, 0.3); padding-bottom: 0.3rem;">
                            <span>🕸️ LIVING FOLKLORE GRAPH</span>
                        </div>
                        <h3 style="font-size: 1.45rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                            Lore Web
                        </h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.65;">
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
                <!-- Featured Story Card: Ancient Assamese Sanchi Paat Manuscript / Scroll -->
                <div class="card manuscript-card" style="flex: 1.1; min-width: 320px;">
                    <!-- Vermilion 3D Wax Seal with Royal Emblem Relief -->
                    <div class="wax-seal" title="Royal Assamese Sanchi Paat Wax Seal" aria-hidden="true">
                        <div class="wax-seal-inner">
                            <svg viewBox="0 0 24 24" width="22" height="22" fill="#ffd866" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2 L14.5 7.5 L20.5 8.5 L16 12.8 L17.2 18.8 L12 15.8 L6.8 18.8 L8 12.8 L3.5 8.5 L9.5 7.5 Z" fill="#ffd866" stroke="#80130b" stroke-width="0.6"/>
                                <circle cx="12" cy="12" r="2.8" fill="#80130b"/>
                                <circle cx="12" cy="12" r="1.3" fill="#ffd866"/>
                            </svg>
                        </div>
                    </div>

                    <div>
                        <div class="manuscript-tag">
                            <span>📜 সাঁচিপাত &bull; FEATURED FOLKTALE</span>
                        </div>
                        <h4 class="manuscript-title">
                            ${taleTitle}
                        </h4>
                        <p class="manuscript-excerpt">
                            &ldquo;${taleSummary.substring(0, 160)}...&rdquo;
                        </p>
                    </div>
                    
                    <div style="margin-top: 1.2rem; display: flex; align-items: center; justify-content: space-between;">
                        <button class="manuscript-btn" onclick="window.location.hash='#folktales'">
                            Unroll Scroll &rarr;
                        </button>
                        <span style="font-size: 0.8rem; color: var(--primary); opacity: 0.8; font-style: italic;">
                            Assam Oral Archive
                        </span>
                    </div>
                </div>
                
                <!-- Daily Wisdom Card: Sattriya Vani Tablet -->
                <div class="card wisdom-card" style="flex: 0.9; min-width: 300px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 0.75rem; letter-spacing: 1.5px; text-transform: uppercase; color: var(--primary); font-weight: 600; margin-bottom: 0.8rem; border-bottom: 1px dashed rgba(200, 150, 12, 0.3); padding-bottom: 0.3rem;">
                            <span>🎋 প্ৰবচন &bull; DAILY WISDOM</span>
                        </div>
                        <h4 style="font-size: 1.35rem; font-family: 'Playfair Display', serif; margin-bottom: 0.5rem; color: var(--text); font-weight: 600; line-height: 1.35;">
                            ${proverbPrimary}
                        </h4>
                        <p style="color: var(--primary); font-weight: 500; font-size: 0.95rem; margin-bottom: 0.5rem; font-style: italic;">${proverbSecondary}</p>
                        <p style="color: var(--text-muted); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1rem;">${randomProverb.meaning}</p>
                    </div>
                    <button class="btn-primary" style="padding: 0.45rem 1.2rem; font-size: 0.9rem; align-self: flex-start;" onclick="window.location.hash='#proverbs'">
                        Discover Proverbs &rarr;
                    </button>
                </div>
            `;
            
            const themeHTML = `
                <div style="width: 100%; margin-top: 3rem; text-align: center;">
                    <div style="font-size: 0.8rem; letter-spacing: 2px; text-transform: uppercase; color: var(--primary); font-weight: 600; margin-bottom: 0.4rem;">
                        <span>❖ সাংস্কৃতিক বৈশিষ্ট্যসমূহ ❖</span>
                    </div>
                    <h3 style="font-size: 2rem; margin-bottom: 0.5rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                        Explore by Cultural Theme
                    </h3>
                    <p style="color: var(--text-muted); margin-bottom: 1.8rem; max-width: 600px; margin-left: auto; margin-right: auto;">
                        Immerse yourself in the sacred motifs, forest spirits, and moral traditions that shape Assamese lore
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
