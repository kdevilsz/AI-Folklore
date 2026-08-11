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

