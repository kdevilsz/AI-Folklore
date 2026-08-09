export async function renderHome(container) {
    const lang = window.currentLanguage || 'en';
    
    const title = lang === 'as' ? "ব্ৰহ্মপুত্ৰৰ প্ৰতিধ্বনি" : "Echoes of the Brahmaputra";
    const subtitle = lang === 'as' ? 
        `<span class="dropcap">ল</span>ৰীব্ৰীজে অসমৰ কালজয়ী সাধুকথা, ফকৰা-যোজনা আৰু পৰম্পৰাগত জ্ঞান সংৰক্ষণ কৰে আৰু পোহৰাই তোলে। নদীয়ে গীত গোৱা আৰু আত্মাই ফুচফুচাই কথা কোৱা এখন জগতত প্ৰৱেশ কৰক। <a href="#about" style="color: var(--primary); text-decoration: underline; font-weight: 500;">আমাৰ কাহিনী পঢ়ক &rarr;</a>` :
        `<span class="dropcap">L</span>oreBridge preserves and illuminates the timeless folktales, proverbs, and traditional wisdom of Assam. Step into a world where rivers sing and spirits whisper. <a href="#about" style="color: var(--primary); text-decoration: underline; font-weight: 500;">Read our story &rarr;</a>`;

    container.innerHTML = `
        <div style="text-align: center; padding: 4rem 0;">
            <h1 class="page-title">${title}</h1>
            <p class="page-subtitle">${subtitle}</p>
            
            <div id="home-widgets" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 1000px; margin: 2rem auto; text-align: left;">
                <div class="card" style="flex: 1; min-width: 300px;">
                    <div class="loading-spinner" style="margin: 2rem auto;"></div>
                </div>
            </div>

            <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 2rem; max-width: 900px; margin: 3rem auto; text-align: left; padding: 0 1rem;">
                <div class="card" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.4rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                            ${lang === 'as' ? 'অৰাকল আপোনাৰ অপেক্ষাত' : 'The Oracle Awaits'}
                        </h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
                            ${lang === 'as' ? 'অসমৰ প্ৰাচীন সাধুকথা অন্বেষণ কৰিবলৈ আমাৰ এআই-চালিত অৰাকলৰ সহায় লওক। তেজীমলা, বুধিয়ক শিয়াল বা অৰণ্যৰ ৰহস্যময় জীৱবোৰৰ বিষয়ে সোধক।' : 'Consult our AI-powered Oracle to delve deep into the ancient stories. Ask about Tejimola, the witty Phikori, or the mystic creatures of the forest.'}
                        </p>
                    </div>
                    <button class="btn-primary" onclick="window.location.hash='#chat'" style="margin-top: 1.5rem; align-self: flex-start;">
                        ${lang === 'as' ? 'অৰাকলৰ পৰামৰ্শ লওক' : 'Consult the Oracle'}
                    </button>
                </div>
                <div class="card" style="flex: 1; min-width: 280px; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <h3 style="font-size: 1.4rem; margin-bottom: 1rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                            ${lang === 'as' ? 'প্ৰকল্পৰ বিষয়ে' : 'About the Project'}
                        </h3>
                        <p style="font-size: 0.95rem; color: var(--text-muted); line-height: 1.6;">
                            ${lang === 'as' ? 'লৰীব্ৰীজ হৈছে এআই ব্যৱহাৰ কৰি অসমৰ সংবেদনশীল মৌখিক পৰম্পৰা, সাধুকথা আৰু পূৰ্বপুৰুষৰ জ্ঞান সংৰক্ষণ কৰাৰ বাবে উৎসৰ্গিত এক ডিজিটেল আশ্ৰয়স্থল।' : 'LoreBridge is a digital sanctuary dedicated to preserving the fragile oral traditions, folktales, and ancestral wisdom of Assam using modern AI.'}
                        </p>
                    </div>
                    <button class="btn-primary" onclick="window.location.hash='#about'" style="margin-top: 1.5rem; align-self: flex-start;">
                        ${lang === 'as' ? 'আমাৰ কাহিনী জানক' : 'Learn Our Story'}
                    </button>
                </div>
            </div>
        </div>
    `;

    try {
        const [ftRes, prRes] = await Promise.all([
            fetch('/folktales.json'),
            fetch('/proverbs.json')
        ]);
        const ftData = await ftRes.json();
        const prData = await prRes.json();
        
        const folktales = ftData.entries;
        const proverbs = prData.entries;
        
        const randomFolktale = folktales[Math.floor(Math.random() * folktales.length)];
        const randomProverb = proverbs[Math.floor(Math.random() * proverbs.length)];
        
        // Extract Unique Themes
        const themeCounts = {};
        [...folktales, ...proverbs].forEach(item => {
            const itemThemes = item.themes || item.theme || [];
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

        const themeTranslations = {
            'magic': 'যাদুকৰী', 'animals': 'পশু-পক্ষী', 'stepmother': 'মাহী আই', 'justice': 'ন্যায়',
            'nature': 'প্ৰকৃতি', 'family': 'পৰিয়াল', 'love': 'প্ৰেম', 'humor': 'কৌতুক', 'survival': 'জীৱন সংগ্ৰাম',
            'greed': 'লোভ', 'friendship': 'বন্ধুত্ব'
        };

        function parseTitle(titleStr, language) {
            const match = titleStr.match(/^([^(]+)\s*(?:\(([^)]+)\))?$/);
            if (match) {
                const enTitle = match[1].trim();
                const asTitle = match[2] ? match[2].trim() : "";
                if (language === 'as' && asTitle) {
                    return asTitle;
                }
                return enTitle;
            }
            return titleStr;
        }
 
        const widgetsContainer = document.getElementById('home-widgets');
        if (widgetsContainer) {
            widgetsContainer.innerHTML = `
                <div class="card" style="flex: 1; min-width: 300px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(230, 200, 106, 0.3);">
                    <h3 style="color: var(--primary); font-size: 1.2rem; margin-bottom: 1rem;">
                        ${lang === 'as' ? '📖 যাদৃচ্ছিক সাধু' : '📖 Random Tale'}
                    </h3>
                    <h4 style="font-size: 1.3rem; margin-bottom: 0.5rem; font-family: 'Playfair Display', serif;">
                        ${parseTitle(randomFolktale.title, lang)}
                    </h4>
                    <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">${randomFolktale.summary.substring(0, 150)}...</p>
                    <button class="btn-primary" style="padding: 0.4rem 1rem; font-size: 0.9rem;" onclick="window.location.hash='#folktales'">
                        ${lang === 'as' ? 'সাধুকথা অন্বেষণ কৰক' : 'Explore Tales'}
                    </button>
                </div>
                
                <div class="card" style="flex: 1; min-width: 300px; background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(230, 200, 106, 0.3);">
                    <h3 style="color: var(--primary); font-size: 1.2rem; margin-bottom: 1rem;">
                        ${lang === 'as' ? '💡 দৈনিক প্ৰজ্ঞা' : '💡 Daily Wisdom'}
                    </h3>
                    <h4 style="font-size: 1.4rem; font-family: 'Outfit', sans-serif; margin-bottom: 0.5rem; color: var(--text); font-weight: 500;">
                        ${randomProverb.proverb}
                    </h4>
                    <p style="color: var(--primary); font-weight: bold; font-size: 0.95rem; margin-bottom: 0.5rem;">${randomProverb.meaning}</p>
                    <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 1rem;">${randomProverb.translation}</p>
                    <button class="btn-primary" style="padding: 0.4rem 1rem; font-size: 0.9rem;" onclick="window.location.hash='#proverbs'">
                        ${lang === 'as' ? 'ফকৰা-যোজনা অন্বেষণ কৰক' : 'Discover Proverbs'}
                    </button>
                </div>
            `;
            
            const themeHTML = `
                <div style="width: 100%; margin-top: 3rem; text-align: center;">
                    <h3 style="font-size: 1.8rem; margin-bottom: 0.5rem; font-family: 'Playfair Display', serif; color: var(--primary);">
                        ${lang === 'as' ? 'বিষয় অনুসৰি অন্বেষণ কৰক' : 'Explore by Theme'}
                    </h3>
                    <p style="color: var(--text-muted); margin-bottom: 1.5rem;">
                        ${lang === 'as' ? 'অসমীয়া লোক-সংস্কৃতি গঢ়ি তোলা মটিফবোৰৰ গভীৰতালৈ যাওক' : 'Dive into the motifs that shape Assamese lore'}
                    </p>
                    <div class="theme-explorer-grid">
                        ${topThemes.map(t => {
                            const themeLabel = lang === 'as' ? (themeTranslations[t] || t) : t;
                            return `
                                <div class="theme-explore-card" onclick="window.location.hash='#folktales'; setTimeout(() => { const btn = Array.from(document.querySelectorAll('.filter-chip')).find(el => el.innerText.toLowerCase() === '${t}' || el.innerText === '${themeLabel}'); if(btn) btn.click(); }, 300);">
                                    <span class="theme-explore-icon">${themeIcons[t] || '🔖'}</span>
                                    <span class="theme-explore-label" style="text-transform: capitalize;">${themeLabel}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
            
            widgetsContainer.insertAdjacentHTML('afterend', themeHTML);
        }
    } catch (e) {
        console.error("Failed to load widgets", e);
    }
}
