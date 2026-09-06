import { renderHome } from '../pages/home.js';
import { renderFolktales } from '../pages/folktales.js';
import { renderProverbs } from '../pages/proverbs.js';
import { renderChat } from '../pages/chat.js';
import { renderAbout } from '../pages/about.js';
import { renderAdmin } from '../pages/admin.js';
import { renderGraph } from '../pages/graph.js';
import { renderQuality } from '../pages/quality.js';
import { renderEval } from '../pages/eval.js';
import { renderIngest } from '../pages/ingest.js';
import { renderShare } from '../pages/share.js';

function route() {
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

    // Global Search & Archive Discovery
    const overlayInput = document.getElementById('overlay-search-input');
    const searchBackdrop = document.getElementById('search-overlay-backdrop');
    const searchClearBtn = document.getElementById('search-clear-btn');
    const filterPillsContainer = document.getElementById('search-filter-pills');

    let searchData = [];
    let dataLoaded = false;
    let activeFilter = 'all';

    function escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    function highlightMatches(text, tokens) {
        if (!text) return '';
        const escaped = escapeHtml(text);
        if (!tokens || tokens.length === 0) return escaped;
        
        let result = escaped;
        tokens.forEach(tok => {
            if (!tok) return;
            const re = new RegExp(`(${escapeRegex(tok)})`, 'gi');
            result = result.replace(re, '<mark class="search-match-highlight">$1</mark>');
        });
        return result;
    }

    async function fetchJsonSafely(url) {
        try {
            const res = await fetch(url);
            if (res.ok) return await res.json();
        } catch (e) {}
        try {
            const relUrl = url.startsWith('/') ? '.' + url : './' + url;
            const res = await fetch(relUrl);
            if (res.ok) return await res.json();
        } catch (e) {}
        return { entries: [] };
    }

    async function loadSearchData() {
        if (dataLoaded) return;
        try {
            const [ftData, prData] = await Promise.all([
                fetchJsonSafely('/folktales.json'),
                fetchJsonSafely('/proverbs.json')
            ]);

            const ftItems = (ftData.entries || []).map(f => {
                let category = 'folktale';
                let badgeClass = 'badge-folktale';
                let badgeText = '📖 Folktale';

                if (f.type === 'historical' || f.type === 'historical/spiritual') {
                    category = 'historical';
                    badgeClass = 'badge-historical';
                    badgeText = '⚔️ Historical';
                } else if (f.type === 'community_tale') {
                    category = 'community_tale';
                    badgeClass = 'badge-community';
                    badgeText = '🌿 Community Tale';
                }

                const title = f.title_en || f.title || f.title_as || 'Untitled Tale';
                const assameseTitle = f.title_as || f.assamese || '';
                const summary = f.summary_en || f.summary || f.summary_as || f.assamese || '';
                const moral = f.moral_en || f.moral || f.moral_as || '';
                const cultural = f.cultural_significance || (f.metadata && f.metadata.roots) || f.source || '';
                const community = (f.metadata && f.metadata.community) || (f.contributor && f.contributor.district) || '';
                const era = (f.metadata && f.metadata.era) || '';
                const themes = Array.isArray(f.themes) ? f.themes : (f.metadata && Array.isArray(f.metadata.themes) ? f.metadata.themes : []);
                const characters = Array.isArray(f.characters) ? f.characters : [];

                const searchableText = [
                    title,
                    assameseTitle,
                    summary,
                    moral,
                    cultural,
                    community,
                    era,
                    themes.join(' '),
                    characters.join(' '),
                    f.english || '',
                    f.assamese || ''
                ].join(' ').toLowerCase();

                return {
                    id: f.id,
                    type: category,
                    rawType: f.type || 'folktale',
                    title,
                    assameseTitle,
                    summary,
                    moral,
                    cultural,
                    community,
                    era,
                    themes,
                    characters,
                    badgeClass,
                    badgeText,
                    searchableText
                };
            });

            const prItems = (prData.entries || []).map(p => {
                const title = p.translation || p.english || p.title_en || p.proverb || 'Traditional Proverb';
                const assameseTitle = p.proverb || p.assamese || p.title_as || '';
                const summary = p.meaning || p.translation || '';
                const moral = p.cultural_context || '';
                const cultural = p.source || '';
                const community = (p.contributor && p.contributor.district) || 'Assam';
                const era = 'Ancient Oral Wisdom';
                const themes = Array.isArray(p.theme) ? p.theme : (Array.isArray(p.themes) ? p.themes : []);

                const searchableText = [
                    title,
                    assameseTitle,
                    summary,
                    moral,
                    cultural,
                    community,
                    era,
                    themes.join(' '),
                    p.proverb || '',
                    p.meaning || '',
                    p.translation || ''
                ].join(' ').toLowerCase();

                return {
                    id: p.id,
                    type: 'proverb',
                    rawType: 'proverb',
                    title,
                    assameseTitle,
                    summary,
                    moral,
                    cultural,
                    community,
                    era,
                    themes,
                    characters: [],
                    badgeClass: 'badge-proverb',
                    badgeText: '🎋 Proverb',
                    searchableText
                };
            });

            searchData = [...ftItems, ...prItems];
            dataLoaded = true;

            // Update badge counts
            updateFilterCounts();
            
            // If overlay is already active, refresh view
            if (searchOverlay && searchOverlay.classList.contains('active')) {
                const currentVal = overlayInput ? overlayInput.value : '';
                renderSearch(currentVal);
            }
        } catch (e) {
            console.error("Search data load error", e);
        }
    }

    function updateFilterCounts() {
        const countAll = document.getElementById('count-all');
        const countFt = document.getElementById('count-folktale');
        const countHist = document.getElementById('count-historical');
        const countComm = document.getElementById('count-community');
        const countPr = document.getElementById('count-proverb');

        if (countAll) countAll.innerText = searchData.length;
        if (countFt) countFt.innerText = searchData.filter(i => i.type === 'folktale').length;
        if (countHist) countHist.innerText = searchData.filter(i => i.type === 'historical').length;
        if (countComm) countComm.innerText = searchData.filter(i => i.type === 'community_tale').length;
        if (countPr) countPr.innerText = searchData.filter(i => i.type === 'proverb').length;
    }

    function openSearchOverlay() {
        if (!searchOverlay) return;
        searchOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (searchInput && overlayInput && searchInput.value && !overlayInput.value) {
            overlayInput.value = searchInput.value;
        }

        if (searchClearBtn && overlayInput) {
            searchClearBtn.style.display = overlayInput.value ? 'block' : 'none';
        }

        if (!dataLoaded) {
            loadSearchData();
        }

        const query = overlayInput ? overlayInput.value : '';
        renderSearch(query);

        // Auto-focus the modal input so users can type immediately
        setTimeout(() => {
            if (overlayInput) {
                overlayInput.focus();
                if (overlayInput.value) overlayInput.select();
            }
        }, 50);
    }

    function closeSearchOverlay() {
        if (!searchOverlay) return;
        searchOverlay.classList.remove('active');
        document.body.style.overflow = '';
        if (overlayInput) overlayInput.blur();
    }

    // Global navigation function to jump to story/proverb
    window.navigateToItem = function(itemId, itemType) {
        closeSearchOverlay();
        
        const isProverb = itemType === 'proverb' || (typeof itemId === 'string' && itemId.startsWith('pr_'));
        const targetHash = isProverb ? '#proverbs' : '#folktales';

        const executeScrollAndHighlight = () => {
            let attempts = 0;
            const maxAttempts = 30; // 30 * 100ms = 3 seconds
            const interval = setInterval(() => {
                attempts++;
                const selector = isProverb 
                    ? `.proverb-card[data-id="${itemId}"], [data-id="${itemId}"]`
                    : `.folktale-card[data-id="${itemId}"], [data-id="${itemId}"]`;
                const el = document.querySelector(selector);

                if (el) {
                    clearInterval(interval);
                    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    // Pulse highlight effect
                    document.querySelectorAll('.search-highlight').forEach(n => n.classList.remove('search-highlight'));
                    el.classList.add('search-highlight');
                    setTimeout(() => el.classList.remove('search-highlight'), 3500);

                    // Expand details if available
                    const detailsEl = document.getElementById(`details-${itemId}`);
                    if (detailsEl && !detailsEl.classList.contains('open')) {
                        detailsEl.classList.add('open');
                        const expandBtn = el.querySelector('.expand-btn');
                        if (expandBtn) expandBtn.innerText = 'Read Less';
                        if (window.trackView) window.trackView(itemId);
                        if (!isProverb && window.loadRelatedStories) window.loadRelatedStories(itemId);
                    }
                } else if (attempts >= maxAttempts) {
                    clearInterval(interval);
                }
            }, 100);
        };

        if (window.location.hash !== targetHash) {
            window.location.hash = targetHash;
            setTimeout(executeScrollAndHighlight, 120);
        } else {
            executeScrollAndHighlight();
        }
    };

    // Close handlers
    if (searchClose) {
        searchClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            closeSearchOverlay();
        });
    }

    if (searchBackdrop) {
        searchBackdrop.addEventListener('click', (e) => {
            e.preventDefault();
            closeSearchOverlay();
        });
    }

    // Escape Key Handler (Window level & Input level)
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' || e.keyCode === 27) {
            if (searchOverlay && searchOverlay.classList.contains('active')) {
                closeSearchOverlay();
            }
        }
    });

    // Navbar input interactions
    if (searchInput) {
        searchInput.addEventListener('focus', openSearchOverlay);
        searchInput.addEventListener('click', openSearchOverlay);
        searchInput.addEventListener('input', (e) => {
            if (overlayInput) overlayInput.value = e.target.value;
            openSearchOverlay();
            renderSearch(e.target.value);
        });
    }

    // Modal overlay input interactions
    if (overlayInput) {
        overlayInput.addEventListener('input', (e) => {
            const val = e.target.value;
            if (searchInput) searchInput.value = val;
            if (searchClearBtn) searchClearBtn.style.display = val ? 'block' : 'none';
            renderSearch(val);
        });

        overlayInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const firstResult = searchResults ? searchResults.querySelector('.search-result-item') : null;
                if (firstResult) {
                    const id = firstResult.getAttribute('data-id');
                    const type = firstResult.getAttribute('data-type');
                    if (id && window.navigateToItem) {
                        window.navigateToItem(id, type);
                    }
                }
            } else if (e.key === 'Escape') {
                closeSearchOverlay();
            }
        });
    }

    // Clear button
    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            if (overlayInput) overlayInput.value = '';
            if (searchInput) searchInput.value = '';
            searchClearBtn.style.display = 'none';
            renderSearch('');
            if (overlayInput) overlayInput.focus();
        });
    }

    // Category Filter Pills
    if (filterPillsContainer) {
        filterPillsContainer.querySelectorAll('.search-pill').forEach(pill => {
            pill.addEventListener('click', () => {
                filterPillsContainer.querySelectorAll('.search-pill').forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                activeFilter = pill.getAttribute('data-filter') || 'all';
                const query = overlayInput ? overlayInput.value : '';
                renderSearch(query);
            });
        });
    }

    function renderSearch(query) {
        if (!searchResults) return;

        const trimmed = (query || '').trim();
        const tokens = trimmed.toLowerCase().split(/\s+/).filter(Boolean);

        // Filter items
        let items = searchData;
        if (activeFilter !== 'all') {
            items = items.filter(item => item.type === activeFilter);
        }

        if (tokens.length > 0) {
            items = items.filter(item => tokens.every(tok => item.searchableText.includes(tok)));

            // Sort: prioritize matches in title
            items.sort((a, b) => {
                const aTitleMatch = tokens.some(tok => a.title.toLowerCase().includes(tok) || a.assameseTitle.toLowerCase().includes(tok));
                const bTitleMatch = tokens.some(tok => b.title.toLowerCase().includes(tok) || b.assameseTitle.toLowerCase().includes(tok));
                if (aTitleMatch && !bTitleMatch) return -1;
                if (!aTitleMatch && bTitleMatch) return 1;
                return 0;
            });
        }

        // When query is empty, show a curated welcome selection or prompt
        if (tokens.length === 0) {
            const featuredItems = items.slice(0, 6);
            if (featuredItems.length === 0) {
                searchResults.innerHTML = `
                    <div class="search-empty-state">
                        <p class="search-hint">Loading folklore archive...</p>
                    </div>
                `;
                return;
            }

            searchResults.innerHTML = `
                <div style="padding: 0.4rem 0 0.6rem 0; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(200, 150, 12, 0.15); margin-bottom: 0.75rem;">
                    <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--primary); font-weight: 600;">✨ Featured Tales &amp; Proverbs</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${items.length} items in archive</span>
                </div>
                ${featuredItems.map(item => renderResultCard(item, [])).join('')}
            `;
            return;
        }

        // When search returns no items
        if (items.length === 0) {
            searchResults.innerHTML = `
                <div class="search-empty-state">
                    <span style="font-size: 2.2rem; display: block; margin-bottom: 0.6rem;">📜</span>
                    <h4 style="color: var(--text); margin-bottom: 0.4rem; font-family: 'Playfair Display', serif;">No matching folklore found</h4>
                    <p class="search-hint">No results matching "<strong>${escapeHtml(trimmed)}</strong>" in ${activeFilter === 'all' ? 'the archive' : activeFilter}. Try searching for words like <em>Lachit, Tejimola, Chilarai, river, flood, courage, or wisdom</em>.</p>
                </div>
            `;
            return;
        }

        // Display search results
        const displayItems = items.slice(0, 25);
        searchResults.innerHTML = `
            <div style="padding: 0.3rem 0 0.6rem 0; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(200, 150, 12, 0.15); margin-bottom: 0.75rem;">
                <span style="font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px; color: var(--primary); font-weight: 600;">
                    Found ${items.length} ${items.length === 1 ? 'match' : 'matches'}
                </span>
                <span style="font-size: 0.75rem; color: var(--text-muted);">Showing top ${displayItems.length}</span>
            </div>
            ${displayItems.map(item => renderResultCard(item, tokens)).join('')}
        `;
    }

    function renderResultCard(item, tokens) {
        const rawSnippet = item.summary || item.moral || item.cultural || '';
        const truncated = rawSnippet.length > 150 ? rawSnippet.substring(0, 147) + '...' : rawSnippet;

        return `
            <div class="search-result-item" data-id="${item.id}" data-type="${item.type}" tabindex="0" role="button" aria-label="Open ${escapeHtml(item.title)}" onclick="window.navigateToItem('${item.id}', '${item.type}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();window.navigateToItem('${item.id}', '${item.type}');}">
                <div class="search-item-top">
                    <h4 class="search-item-title">${highlightMatches(item.title, tokens)}</h4>
                    <span class="search-item-badge ${item.badgeClass}">${item.badgeText}</span>
                </div>
                ${item.assameseTitle && item.assameseTitle !== item.title ? `
                    <div style="font-size: 0.95rem; color: var(--primary); margin-bottom: 0.35rem; font-weight: 500;">
                        ${highlightMatches(item.assameseTitle, tokens)}
                    </div>
                ` : ''}
                <p class="search-item-snippet">${highlightMatches(truncated, tokens)}</p>
                <div class="search-item-tags">
                    ${item.community ? `<span class="search-item-tag">🌿 ${escapeHtml(item.community)}</span>` : ''}
                    ${item.era ? `<span class="search-item-tag">⏳ ${escapeHtml(item.era)}</span>` : ''}
                    ${(item.themes || []).slice(0, 3).map(t => `<span class="search-item-tag">#${escapeHtml(t)}</span>`).join('')}
                    <span style="margin-left: auto; color: var(--primary); font-size: 0.82rem; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                        Read Lore <span aria-hidden="true">&rarr;</span>
                    </span>
                </div>
            </div>
        `;
    }

    // Pre-load data eagerly so search is instant when clicked
    loadSearchData();
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
        const endpoint = window.getApiUrl ? window.getApiUrl(`/api/related/${storyId}`) : `/api/related/${storyId}`;
        const res = await fetch(endpoint);
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

