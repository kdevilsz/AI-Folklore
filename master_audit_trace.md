# Master Audit Trace: LoreBridge Project

## 1. COMPREHENSIVE DIRECTORY MAP

```text
c:\Users\Bhaswati Sikdar\Documents\data\
├── .env
├── .git/
├── .gitignore
├── 2015.124533.Folk-Tales-Of-Assam-Ed-1st_text.pdf
├── 2015.462370.Folk-Tales_text.pdf
├── Assamese_Folklore_Dataset (1).xlsx
├── build.py
├── check_titles.py
├── extract_data.py
├── extract_stories.py
├── folklore_data.json
├── grandma-tales-assam_text.pdf
├── index.css
├── index.html
├── js/
│   ├── app.js
│   └── data.js
├── pages/
│   ├── about.js
│   ├── chat.js
│   ├── folktales.js
│   ├── home.js
│   └── proverbs.js
├── restore.py
├── server/
│   ├── __pycache__/
│   ├── ingest.py
│   ├── ingest_pinecone.py
│   ├── parse_excel.py
│   ├── rag.py
│   ├── requirements.txt
│   ├── server.py
│   └── vector_store.pkl
├── skills/
├── test_rag.py
└── test_results.txt
```

## 2. FRONTEND ARCHITECTURE & EXACT INJECTED CODE (Vanilla JS App)

### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LoreBridge</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <div class="grain-overlay"></div>
    <div class="ambient-glow"></div>
    
    <nav>
        <span class="nav-brand">LoreBridge</span>
        <div class="nav-links">
            <a href="#home">Home</a>
            <a href="#folktales">Folktales</a>
            <a href="#proverbs">Proverbs</a>
            <a href="#chat">Oracle</a>
            <a href="#about">About</a>
        </div>
    </nav>
    <div id="app"></div>
    <script type="module" src="js/app.js"></script>
</body>
</html>
```

### `index.css`
```css
/* Mystical Storybook / Heritage Editorial Aesthetic */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&display=swap');

:root {
  --bg-dark: #071310;
  --surface: rgba(17, 36, 31, 0.7);
  --surface-hover: rgba(26, 52, 45, 0.8);
  --primary: #d4af37; /* Muga Silk Gold */
  --primary-glow: rgba(212, 175, 55, 0.2);
  --text: #f4efe6;
  --text-muted: #a8b4af;
  --border: rgba(212, 175, 55, 0.2);
  --accent-red: #8B2519; /* Traditional deep red accent */
}

/* Base Styles & Typography */
body {
  background-color: var(--bg-dark);
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  font-weight: 300;
  line-height: 1.6;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  color: var(--primary);
  margin-top: 0;
  letter-spacing: 0.5px;
}

/* Background Atmosphere */
.grain-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.04'/%3E%3C/svg%3E");
}

.ambient-glow {
  position: fixed;
  top: -20vh;
  left: 20vw;
  width: 60vw;
  height: 60vh;
  background: radial-gradient(circle, var(--primary-glow) 0%, transparent 70%);
  filter: blur(100px);
  pointer-events: none;
  z-index: -1;
  opacity: 0.5;
}

/* Layout */
#app {
  padding: 3rem 2rem;
  max-width: 1000px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

/* Navigation - Editorial Style */
nav {
  padding: 1.5rem 3rem;
  background: transparent;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

.nav-brand {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  font-size: 1.8rem;
  color: var(--primary);
  letter-spacing: 1px;
  text-transform: uppercase;
  text-shadow: 0 0 20px var(--primary-glow);
}

.nav-links {
  display: flex;
  gap: 2.5rem;
}

nav a {
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  position: relative;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 0;
  height: 1px;
  background: var(--primary);
  transition: all 0.4s ease;
  transform: translateX(-50%);
}

nav a:hover, nav a.active {
  color: var(--primary);
}

nav a:hover::after, nav a.active::after {
  width: 100%;
}

/* Cards & Containers - Glassmorphic */
.card {
  background: var(--surface);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  padding: 2.5rem;
  border-radius: 2px; /* Sharp editorial corners */
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.4s ease;
  position: relative;
  overflow: hidden;
  animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(20px);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 50px rgba(0,0,0,0.4);
  border-color: rgba(212, 175, 55, 0.4);
}

/* Adding a subtle top-border accent to cards */
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--primary), transparent);
  opacity: 0.5;
}

/* Forms & Inputs */
input, button {
  padding: 1rem 1.5rem;
  border-radius: 2px;
  border: 1px solid var(--border);
  background: rgba(0,0,0,0.3);
  color: var(--text);
  font-family: 'Outfit', sans-serif;
  font-size: 1rem;
  transition: all 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 15px var(--primary-glow);
}

button {
  background: var(--primary);
  color: #000;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  border: 1px solid var(--primary);
}

button:hover {
  background: transparent;
  color: var(--primary);
  box-shadow: 0 0 20px var(--primary-glow);
}

/* Chat Specific Styles */
#chat-history {
  scrollbar-width: thin;
  scrollbar-color: var(--primary) var(--surface);
}

#chat-history::-webkit-scrollbar {
  width: 6px;
}
#chat-history::-webkit-scrollbar-track {
  background: var(--surface);
}
#chat-history::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  border-radius: 10px;
}

.chat-message {
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  border-radius: 2px;
  animation: fadeIn 0.4s ease forwards;
}

.chat-message.user {
  background: rgba(255, 255, 255, 0.03);
  border-left: 2px solid var(--text-muted);
}

.chat-message.bot {
  background: rgba(212, 175, 55, 0.05);
  border-left: 2px solid var(--primary);
  color: var(--text);
}

.chat-message.bot b {
  color: var(--primary);
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
}

/* Typography Classes */
.page-title {
  font-size: 3.5rem;
  text-align: center;
  margin-bottom: 1rem;
  text-shadow: 0 2px 15px rgba(0,0,0,0.5);
  letter-spacing: 1px;
}

.page-subtitle {
  text-align: center;
  color: var(--text-muted);
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 4rem auto;
  font-weight: 300;
}

.dropcap {
  float: left;
  font-family: 'Playfair Display', serif;
  font-size: 4rem;
  line-height: 0.8;
  padding-top: 4px;
  padding-right: 8px;
  color: var(--primary);
}

/* Animations */
@keyframes fadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Sequential Animation Delays */
.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
.card:nth-child(4) { animation-delay: 0.4s; }
.card:nth-child(5) { animation-delay: 0.5s; }

/* Grid for Folklore / Proverbs */
.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

/* Expandable Tab Styles */
.expand-details {
  max-height: 0;
  overflow: hidden;
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  transform: scaleY(0);
  transform-origin: top;
  border-top: 1px dashed var(--border);
  margin-top: 0;
  padding-top: 0;
}
.expand-details.open {
  max-height: 500px;
  opacity: 1;
  transform: scaleY(1);
  margin-top: 1rem;
  padding-top: 1rem;
}
.expand-btn {
  display: inline-block;
  margin-top: 1rem;
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--border);
  padding: 0.5rem 1.2rem;
  font-size: 0.85rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
}
.expand-btn:hover {
  background: var(--primary-glow);
  color: var(--text);
  border-color: var(--primary);
  box-shadow: 0 0 10px var(--primary-glow);
}

/* Audio Pronunciation Button */
.audio-btn {
  background: transparent;
  color: var(--primary);
  border: 1px solid var(--primary);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-left: 0.5rem;
  vertical-align: middle;
}
.audio-btn:hover {
  background: var(--primary-glow);
  color: var(--text);
  box-shadow: 0 0 10px var(--primary-glow);
}
.audio-btn.playing {
  animation: pulse-audio 1.5s infinite;
  background: var(--primary);
  color: var(--bg);
}
@keyframes pulse-audio {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 183, 77, 0.7); }
  70% { transform: scale(1.1); box-shadow: 0 0 0 10px rgba(255, 183, 77, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 183, 77, 0); }
}

/* Dynamic Sidebar & Filtering Styles */
.page-layout-with-sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: start;
}

@media (min-width: 768px) {
  .page-layout-with-sidebar {
    display: grid;
    grid-template-columns: 250px 1fr;
  }
}

.filter-sidebar {
  position: sticky;
  top: 80px;
  background: rgba(30, 30, 30, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 183, 77, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}

.filter-sidebar h3 {
  color: var(--primary);
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(255, 183, 77, 0.2);
  padding-bottom: 0.5rem;
}

.filter-tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.filter-chip {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: var(--text-muted);
  border-radius: 20px;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.filter-chip:hover {
  background: rgba(255, 183, 77, 0.1);
  border-color: var(--primary);
  color: var(--primary);
}

.filter-chip.active {
  background: var(--primary);
  color: var(--bg);
  border-color: var(--primary);
  box-shadow: 0 0 10px var(--primary-glow);
}

.card-grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  transition: all 0.5s ease;
}

.folklore-skill-card {
  transition: all 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform-origin: top center;
}

.folklore-skill-card.filtered-out {
  opacity: 0;
  transform: scale(0.95);
  position: absolute;
  pointer-events: none;
  visibility: hidden;
}
```

### `js/app.js`
```javascript
import { renderHome } from '../pages/home.js';
import { renderFolktales } from '../pages/folktales.js';
import { renderProverbs } from '../pages/proverbs.js';
import { renderChat } from '../pages/chat.js';
import { renderAbout } from '../pages/about.js';

function route() {
    const hash = window.location.hash || '#home';
    const app = document.getElementById('app');
    app.innerHTML = '';
    
    document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
    const link = document.querySelector(`nav a[href="${hash}"]`);
    if(link) link.classList.add('active');

    if(hash === '#home') renderHome(app);
    else if(hash === '#folktales') renderFolktales(app);
    else if(hash === '#proverbs') renderProverbs(app);
    else if(hash === '#chat') renderChat(app);
    else if(hash === '#about') renderAbout(app);
}

window.addEventListener('hashchange', route);
route();

// Global Web Speech API setup for Assamese Pronunciation
window.playAssameseAudio = function(btn, text) {
    if (!('speechSynthesis' in window)) {
        alert("Your browser does not support text-to-speech.");
        return;
    }
    
    // Prevent overlapping audio
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    // Assamese might not have a dedicated voice on all systems, try Hindi as fallback for closer phonetics
    const voices = window.speechSynthesis.getVoices();
    const targetVoice = voices.find(v => v.lang.includes('as-IN') || v.lang.includes('as')) 
                     || voices.find(v => v.lang.includes('hi-IN'))
                     || voices[0];
    if (targetVoice) utterance.voice = targetVoice;
    utterance.lang = targetVoice?.lang.includes('as') ? 'as-IN' : 'hi-IN';
    utterance.rate = 0.85; // Slightly slower for clarity
    
    // Animation bindings
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
    // Handle active state of chips
    const sidebar = btn.closest('.filter-sidebar');
    if (sidebar) {
        sidebar.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
    }

    // Filter cards
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

        const tagsStr = card.getAttribute('data-tags') || '';
        const tags = tagsStr.toLowerCase().split('|');
        if (tags.includes(tag.toLowerCase())) {
            card.classList.remove('filtered-out');
        } else {
            card.classList.add('filtered-out');
        }
    });
};
```

### `pages/chat.js`
```javascript
export function renderChat(container) {
    container.innerHTML = `
        <h1 class="page-title">The Oracle</h1>
        <p class="page-subtitle">Seek the wisdom of the ancients. The Oracle has read the old texts and knows the tales.</p>
        <div class="card" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; height: 65vh;">
            <div id="chat-history" style="flex: 1; overflow-y: auto; padding-right: 1rem; margin-bottom: 1.5rem;">
                <div class="chat-message bot">
                    <b>Oracle:</b> Greetings, traveler. What tale of Assam do you wish to uncover today?
                </div>
            </div>
            
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;" id="prompt-suggestions">
                <button class="suggestion-chip" onclick="document.getElementById('chat-input').value=this.innerText; document.getElementById('chat-send').click();">Tell me the story of Tejimola</button>
                <button class="suggestion-chip" onclick="document.getElementById('chat-input').value=this.innerText; document.getElementById('chat-send').click();">Give me a proverb about hard work</button>
                <button class="suggestion-chip" onclick="document.getElementById('chat-input').value=this.innerText; document.getElementById('chat-send').click();">What is the moral of Burhi Aair Sadhu?</button>
            </div>

            <div style="display: flex; gap: 1rem; border-top: 1px solid var(--border); padding-top: 1.5rem;">
                <input type="text" id="chat-input" style="flex:1; border-radius: 20px; padding-left: 1.5rem; background: var(--surface); color: var(--text); border: 1px solid var(--border);" placeholder="E.g., Tell me about Tejimola...">
                <button id="chat-send" style="border-radius: 20px; padding: 1rem 2rem; background: var(--primary); color: #000; font-weight: bold; border: none; cursor: pointer;">Seek</button>
            </div>
        </div>
    `;

    // Inline CSS for the Folklore Transformer Skill Cards
    const style = document.createElement('style');
    style.innerHTML = `
        .suggestion-chip {
            background: rgba(255, 183, 77, 0.1);
            border: 1px solid var(--primary);
            color: var(--primary);
            border-radius: 20px;
            padding: 0.4rem 1rem;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s ease;
        }
        .suggestion-chip:hover {
            background: var(--primary);
            color: #000;
        }
        .folklore-skill-card {
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid rgba(255, 183, 77, 0.3);
            border-radius: 12px;
            padding: 1.2rem;
            margin: 1rem 0;
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .folklore-skill-card h4 {
            color: var(--primary);
            margin-top: 0;
            margin-bottom: 1rem;
            font-size: 1.1rem;
            border-bottom: 1px solid rgba(255, 183, 77, 0.2);
            padding-bottom: 0.5rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .skill-metric {
            display: flex;
            align-items: flex-start;
            margin-bottom: 0.8rem;
            background: rgba(0, 0, 0, 0.2);
            padding: 0.8rem;
            border-radius: 8px;
            border-left: 3px solid var(--primary);
        }
        .skill-metric strong {
            color: #fff;
            min-width: 140px;
            display: inline-block;
        }
        .skill-text {
            color: #ddd;
            flex: 1;
        }
        .sources-section {
            margin-top: 1.5rem;
            padding: 1rem;
            background: rgba(30, 30, 30, 0.6);
            border-radius: 8px;
            border: 1px dashed rgba(255, 255, 255, 0.2);
        }
        .sources-section h5 {
            margin: 0 0 0.5rem 0;
            color: var(--text-muted);
            text-transform: uppercase;
            font-size: 0.85rem;
            letter-spacing: 1px;
        }
        .sources-section ul {
            margin: 0;
            padding-left: 1.2rem;
            color: var(--primary);
            font-size: 0.9rem;
        }
        .loading-pulse {
            animation: pulse 1.5s infinite;
        }
        @keyframes pulse {
            0% { opacity: 0.5; }
            50% { opacity: 1; color: var(--primary); }
            100% { opacity: 0.5; }
        }
        .citation-badge {
            background-color: var(--primary-glow);
            color: var(--primary);
            border: 1px solid var(--primary);
            border-radius: 4px;
            padding: 0 4px;
            font-size: 0.75rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.2s ease;
            vertical-align: super;
            margin: 0 2px;
        }
        .citation-badge:hover {
            background-color: var(--primary);
            color: #000;
        }
    `;
    document.head.appendChild(style);

    // Global function for highlighting citations
    if (!window.highlightSource) {
        window.highlightSource = function(id) {
            const el = document.getElementById('source-' + id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                el.style.backgroundColor = 'var(--primary-glow)';
                el.style.color = '#fff';
                el.style.padding = '0.5rem';
                el.style.borderRadius = '4px';
                setTimeout(() => {
                    el.style.backgroundColor = 'transparent';
                    el.style.color = 'var(--primary)';
                    el.style.padding = '0';
                }, 2000);
            }
        };
    }

    const btn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    const history = document.getElementById('chat-history');
    
    let chatHistory = [];
    
    // Skill Parser Function
    function parseFolkloreResponse(text) {
        let title = "Unknown Tale";
        let roots = "Assamese Folklore";
        let moral = "A lesson lost to time.";
        let remainingText = text;

        // Try to extract Title (e.g. **Title:** or Title:)
        const titleMatch = text.match(/(?:\*\*Title\*\*|\*\*Title:\*\*|Title:|🌟 Title)\s*([^\n]+)/i);
        if (titleMatch) title = titleMatch[1].trim();

        // Try to extract Roots
        const rootsMatch = text.match(/(?:\*\*Roots\*\*|\*\*Cultural Roots:\*\*|Cultural Roots:|📍 Roots)\s*([^\n]+)/i);
        if (rootsMatch) roots = rootsMatch[1].trim();

        // Try to extract Moral
        const moralMatch = text.match(/(?:\*\*Moral\*\*|\*\*Implied Moral:\*\*|\*\*Moral\/Theme:\*\*|Moral:|📜 Moral)\s*([^\n]+)/i);
        if (moralMatch) moral = moralMatch[1].trim();

        // Clean up the text by removing the matched lines so we don't duplicate them
        remainingText = remainingText.replace(/(?:\*\*Title\*\*|\*\*Title:\*\*|Title:|🌟 Title)\s*([^\n]+)\n?/gi, '');
        remainingText = remainingText.replace(/(?:\*\*Roots\*\*|\*\*Cultural Roots:\*\*|Cultural Roots:|📍 Roots)\s*([^\n]+)\n?/gi, '');
        remainingText = remainingText.replace(/(?:\*\*Moral\*\*|\*\*Implied Moral:\*\*|\*\*Moral\/Theme:\*\*|Moral:|📜 Moral)\s*([^\n]+)\n?/gi, '');

        let narrative = remainingText.trim().replace(/\n/g, '<br>');
        
        // Parse numerical citations [1], [2], etc.
        narrative = narrative.replace(/\[(\d+)\]/g, '<span class="citation-badge" onclick="highlightSource($1)" title="View Source $1">[$1]</span>');

        return {
            title: title.replace(/\*\*/g, ''),
            roots: roots.replace(/\*\*/g, ''),
            moral: moral.replace(/\*\*/g, ''),
            narrative: narrative
        };
    }

    btn.onclick = async () => {
        const text = input.value;
        if(!text) return;
        
        // Use a unique suffix for source IDs in this specific chat message bubble
        const messageId = Date.now();
        
        history.innerHTML += `
            <div class="chat-message user" style="text-align: right; margin-bottom: 1rem;">
                <span style="background: rgba(255, 255, 255, 0.1); padding: 0.8rem 1.2rem; border-radius: 18px 18px 0 18px; display: inline-block;">
                    ${text}
                </span>
            </div>
        `;
        input.value = '';
        history.scrollTop = history.scrollHeight;
        
        // Add loading indicator
        const loadingId = 'loading-' + Date.now();
        history.innerHTML += `<div id="${loadingId}" class="chat-message bot loading-pulse" style="color: var(--text-muted); margin-bottom: 1rem;"><i>The Oracle is consulting the ancient texts...</i></div>`;
        history.scrollTop = history.scrollHeight;

        try {
            const res = await fetch('http://127.0.0.1:8000/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: text, history: chatHistory})
            });
            const data = await res.json();
            
            // Push to history AFTER successful request
            chatHistory.push({role: 'user', text: text});
            chatHistory.push({role: 'model', text: data.answer});
            
            // keep history short to avoid huge payloads
            if (chatHistory.length > 6) chatHistory = chatHistory.slice(-6);

            
            document.getElementById(loadingId).remove();
            
            const parsed = parseFolkloreResponse(data.answer);
            
            // Rewrite citation badges in narrative to point to this message's specific source IDs
            let localizedNarrative = parsed.narrative.replace(/onclick="highlightSource\((\d+)\)"/g, `onclick="highlightSource('${messageId}-$1')"`);
            
            // Build the sources HTML
            let sourcesHtml = '';
            if (data.sources && data.sources.length > 0) {
                sourcesHtml = `
                    <div class="sources-section">
                        <h5><span style="font-size: 1.2rem;">📚</span> Verified Sources & Context</h5>
                        <ul>
                            ${data.sources.map((s, i) => `<li id="source-${messageId}-${i+1}" class="source-item" style="transition: all 0.3s ease;">[${i+1}] ${s}</li>`).join('')}
                        </ul>
                    </div>
                `;
            } else {
                sourcesHtml = `
                    <div class="sources-section">
                        <h5><span style="font-size: 1.2rem;">📚</span> Verified Sources & Context</h5>
                        <ul style="color: var(--text-muted); list-style-type: none; padding-left: 0;">
                            <li><i>Derived from general folklore knowledge.</i></li>
                        </ul>
                    </div>
                `;
            }

            const skillCardHtml = `
                <div class="chat-message bot" style="margin-bottom: 1.5rem;">
                    <div style="margin-bottom: 1rem;">${localizedNarrative || "I have analyzed the lore."}</div>
                    
                    <div class="folklore-skill-card">
                        <h4>✨ Folklore Insight Transformer</h4>
                        
                        <div class="skill-metric">
                            <strong>🌟 Narrative/Title:</strong>
                            <span class="skill-text" style="display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                                ${parsed.title}
                                <button class="audio-btn" title="Listen to Pronunciation" onclick="playAssameseAudio(this, '${parsed.title.replace(/'/g, "\\'")}')">▶</button>
                            </span>
                        </div>
                        
                        <div class="skill-metric">
                            <strong>📍 Cultural Roots:</strong>
                            <span class="skill-text">${parsed.roots}</span>
                        </div>
                        
                        <div class="skill-metric">
                            <strong>📜 Implied Moral:</strong>
                            <span class="skill-text">${parsed.moral}</span>
                        </div>
                        
                        ${sourcesHtml}
                        
                        <button class="expand-btn" onclick="this.nextElementSibling.classList.toggle('open')">View Academic Details</button>
                        <div class="expand-details">
                            <div class="skill-metric">
                                <strong>📚 Publication Origin:</strong>
                                <span class="skill-text">${parsed.roots}</span>
                            </div>
                            <div class="skill-metric">
                                <strong>🌐 Localized Names:</strong>
                                <span class="skill-text">${parsed.title.includes('(') ? parsed.title.split('(')[1].replace(')', '') : 'Unknown'} (Assamese)</span>
                            </div>
                            <div class="skill-metric">
                                <strong>🔍 Cross-References:</strong>
                                <span class="skill-text">Extracted via RAG Synthesis</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            
            history.innerHTML += skillCardHtml;
            
        } catch(e) {
            const loader = document.getElementById(loadingId);
            if(loader) loader.remove();
            history.innerHTML += `<div class="chat-message bot" style="color: #ff6b6b; background: rgba(255, 0, 0, 0.1); padding: 1rem; border-radius: 8px;"><b>Error:</b> The connection to the spirit realm has faded. Check if the FastAPI server is running.</div>`;
        }
        history.scrollTop = history.scrollHeight;
    };
    
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
      }
    });
}
```

### `pages/folktales.js`
```javascript
export async function renderFolktales(container) {
    container.innerHTML = `<div style="text-align:center; padding: 2rem;"><span style="color:var(--primary);">Fetching ancient tales...</span></div>`;
    
    try {
        const res = await fetch('/folklore_data.json');
        const data = await res.json();
        const folktales = data.entries.filter(e => e.type === 'folktale');
        
        // Extract unique tags
        const tagsSet = new Set();
        folktales.forEach(f => {
            if (f.metadata?.roots) tagsSet.add(f.metadata.roots);
            if (f.metadata?.themes) {
                f.metadata.themes.forEach(t => tagsSet.add(t));
            }
        });
        const uniqueTags = Array.from(tagsSet).sort();

        let sidebarHtml = `
            <aside class="filter-sidebar">
                <h3>🔍 Filter by Tag</h3>
                <div class="filter-tags-container">
                    <button class="filter-chip active" onclick="window.filterCards(this, 'all', 'folktale')">All</button>
                    ${uniqueTags.map(tag => `<button class="filter-chip" onclick="window.filterCards(this, '${tag.replace(/'/g, "\\'")}', 'folktale')">${tag}</button>`).join('')}
                </div>
            </aside>
        `;

        let html = `<h2>Assamese Folktales</h2><div class="page-layout-with-sidebar">${sidebarHtml}<div class="card-grid-container" id="folktale-grid">`;
        folktales.forEach(f => {
            const localizedName = f.assamese ? f.assamese : 'Unknown';
            const themes = f.metadata?.themes ? f.metadata.themes.join(', ') : 'N/A';
            const roots = f.metadata?.roots || 'Oral Tradition';
            
            // Build data-tags string
            const cardTags = [roots, ...(f.metadata?.themes || [])].map(t => t.toLowerCase()).join('|');
            
            html += `<div class="card folklore-skill-card folktale-card" data-tags="${cardTags.replace(/"/g, '&quot;')}">
                <h4 style="display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                    <span style="font-size:1.5rem;">📖</span> ${f.title} (${f.assamese})
                    <button class="audio-btn" title="Listen to Assamese Pronunciation" onclick="playAssameseAudio(this, '${f.assamese.replace(/'/g, "\\'")}')">▶</button>
                </h4>
                <div class="skill-metric">
                    <strong>📍 Source:</strong>
                    <span class="skill-text">${roots}</span>
                </div>
                <div class="skill-metric">
                    <strong>📜 Summary:</strong>
                    <span class="skill-text">${f.english}</span>
                </div>
                <div class="skill-metric">
                    <strong>✨ Moral:</strong>
                    <span class="skill-text" style="color: var(--primary);">${f.moral}</span>
                </div>
                <button class="expand-btn" onclick="this.nextElementSibling.classList.toggle('open')">View Academic Details</button>
                <div class="expand-details">
                    <div class="skill-metric">
                        <strong>📚 Publication Origin:</strong>
                        <span class="skill-text">${roots}</span>
                    </div>
                    <div class="skill-metric">
                        <strong>🌐 Localized Names:</strong>
                        <span class="skill-text">${localizedName} (Assamese)</span>
                    </div>
                    <div class="skill-metric">
                        <strong>🔍 Cross-References:</strong>
                        <span class="skill-text">Archived in LoreBridge DB (${f.type}) - Tags: ${themes}</span>
                    </div>
                </div>
            </div>`;
        });
        html += `</div></div>`;
        container.innerHTML = html;
    } catch (e) {
        container.innerHTML = `<div style="color:red; text-align:center;">Failed to load tales from the archives.</div>`;
    }
}
```

### `pages/proverbs.js`
```javascript
export async function renderProverbs(container) {
    container.innerHTML = `<div style="text-align:center; padding: 2rem;"><span style="color:var(--primary);">Fetching ancestral wisdom...</span></div>`;
    
    try {
        const res = await fetch('/folklore_data.json');
        const data = await res.json();
        const proverbs = data.entries.filter(e => e.type === 'proverb');
        
        // Extract unique tags
        const tagsSet = new Set();
        proverbs.forEach(p => {
            if (p.metadata?.roots) tagsSet.add(p.metadata.roots);
            if (p.metadata?.themes) {
                p.metadata.themes.forEach(t => tagsSet.add(t));
            }
        });
        const uniqueTags = Array.from(tagsSet).sort();

        let sidebarHtml = `
            <aside class="filter-sidebar">
                <h3>🔍 Filter by Tag</h3>
                <div class="filter-tags-container">
                    <button class="filter-chip active" onclick="window.filterCards(this, 'all', 'proverb')">All</button>
                    ${uniqueTags.map(tag => `<button class="filter-chip" onclick="window.filterCards(this, '${tag.replace(/'/g, "\\'")}', 'proverb')">${tag}</button>`).join('')}
                </div>
            </aside>
        `;

        let html = `<h2>Assamese Proverbs</h2><div class="page-layout-with-sidebar">${sidebarHtml}<div class="card-grid-container" id="proverb-grid">`;
        proverbs.forEach(p => {
            const roots = p.metadata?.roots || 'Oral Tradition';
            const cardTags = [roots, ...(p.metadata?.themes || [])].map(t => t.toLowerCase()).join('|');
            
            html += `<div class="card folklore-skill-card proverb-card" data-tags="${cardTags.replace(/"/g, '&quot;')}">
                <h4 style="font-size: 1.6rem; color: #fff; display:flex; align-items:center; flex-wrap:wrap; gap:0.5rem;">
                    ${p.assamese}
                    <button class="audio-btn" title="Listen to Assamese Pronunciation" onclick="playAssameseAudio(this, '${p.assamese.replace(/'/g, "\\'")}')">▶</button>
                </h4>
                <div class="skill-metric">
                    <strong>📝 Meaning:</strong>
                    <span class="skill-text">${p.meaning}</span>
                </div>
                <div class="skill-metric">
                    <strong>✨ English:</strong>
                    <span class="skill-text">${p.english}</span>
                </div>
                <div class="skill-metric" style="border-left-color: #888;">
                    <strong>📍 Source:</strong>
                    <span class="skill-text">${roots}</span>
                </div>
            </div>`;
        });
        html += `</div></div>`;
        container.innerHTML = html;
    } catch (e) {
        container.innerHTML = `<div style="color:red; text-align:center;">Failed to load proverbs from the archives.</div>`;
    }
}
```

## 3. BACKEND SERVER IMPLEMENTATION (FastAPI)

### `server/server.py`
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import sys

# Add current dir to path to allow imports
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from rag import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

import math

# Semantic Cache Registry
semantic_cache = []

def cosine_similarity(v1, v2):
    dot_product = sum(a * b for a, b in zip(v1, v2))
    magnitude1 = math.sqrt(sum(a * a for a in v1))
    magnitude2 = math.sqrt(sum(b * b for b in v2))
    if magnitude1 == 0 or magnitude2 == 0:
        return 0.0
    return dot_product / (magnitude1 * magnitude2)

class ChatRequest(BaseModel):
    query: str
    history: list[dict] | None = None

@app.post("/api/chat")
def chat(request: ChatRequest):
    # Only use cache if it's a fresh query (no conversational history)
    if not request.history or len(request.history) == 0:
        # Get query vector
        try:
            query_vector = engine._get_embedding(request.query)
            
            # Check cache
            best_match_score = -1.0
            best_match_response = None
            
            for item in semantic_cache:
                sim = cosine_similarity(query_vector, item["vector"])
                if sim > best_match_score:
                    best_match_score = sim
                    best_match_response = item["response"]
                    
            if best_match_response:
                print(f"Checked cache. Best match similarity: {best_match_score:.4f}")
            if best_match_score > 0.85 and best_match_response:
                print(f"CACHE HIT! Similarity: {best_match_score:.4f}")
                return best_match_response
        except Exception as e:
            print(f"Cache checking failed: {e}")
            query_vector = None
    else:
        query_vector = None

    # Cache Miss or History Active: Run Full RAG Pipeline
    print("CACHE MISS or History Active. Running RAG Pipeline...")
    response = engine.query(request.query, history=request.history)
    
    # Store in cache if no history was active
    if query_vector and not request.history:
        semantic_cache.append({
            "query": request.query,
            "vector": query_vector,
            "response": response
        })
        # Keep cache from growing infinitely
        if len(semantic_cache) > 100:
            semantic_cache.pop(0)
            
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
```

## 4. THE CORE AI RAG ENGINE (`server/rag.py`)

### `server/rag.py`
```python
import os
from google import genai
from google.genai import types
from pinecone import Pinecone

DATA_DIR = r"c:\Users\Bhaswati Sikdar\Documents\data"
INDEX_NAME = "assamese-folklore"

def _load_env():
    env_file = os.path.join(DATA_DIR, ".env")
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    k, v = line.strip().split("=", 1)
                    os.environ[k] = v

class RAGEngine:
    def __init__(self):
        _load_env()
        self.gemini_api_key = os.environ.get("GEMINI_API_KEY")
        self.pinecone_api_key = os.environ.get("PINECONE_API_KEY")
        
        self.gemini_client = None
        self.pinecone_index = None
        
        if self.gemini_api_key:
            self.gemini_client = genai.Client(api_key=self.gemini_api_key)
        else:
            print("Warning: GEMINI_API_KEY not set.")
            
        if self.pinecone_api_key:
            pc = Pinecone(api_key=self.pinecone_api_key)
            if INDEX_NAME in pc.list_indexes().names():
                self.pinecone_index = pc.Index(INDEX_NAME)
            else:
                print(f"Warning: Pinecone index {INDEX_NAME} not found. Run ingest_pinecone.py")
        else:
            print("Warning: PINECONE_API_KEY not set.")

    def _get_embedding(self, text):
        if not self.gemini_client:
            return []
        response = self.gemini_client.models.embed_content(
            model='gemini-embedding-2',
            contents=text
        )
        return response.embeddings[0].values

    def hybrid_retrieve(self, query: str, top_k: int = 12):
        if not self.pinecone_index or not self.gemini_client:
            return []
            
        query_embedding = self._get_embedding(query)
        
        # Over-fetch for re-ranking
        fetch_k = max(top_k * 2, 24)
        results = self.pinecone_index.query(
            vector=query_embedding,
            top_k=fetch_k,
            include_metadata=True
        )
        
        matches = results.get("matches", [])
        if not matches:
            return []
            
        import re
        # Extract meaningful keywords for active filtering (ignoring short words)
        keywords = [word.lower() for word in re.findall(r'\b\w+\b', query) if len(word) > 3]

        # Convert matches to dict to allow adding new keys
        dict_matches = []
        for match in matches:
            semantic_score = match.score if hasattr(match, 'score') else match.get("score", 0.0)
            meta = match.metadata if hasattr(match, 'metadata') else match.get("metadata", {})
            text = meta.get("text", "").lower()
            title = meta.get("title", "").lower()
            
            keyword_score = 0.0
            for kw in keywords:
                # Strong boost for exact title match (named entities)
                if kw in title:
                    keyword_score += 0.5
                # Moderate boost for text occurrences
                if kw in text:
                    keyword_score += 0.1 * text.count(kw)
            
            # Fuse scores: Semantic (usually 0.5 - 1.0) + capped Keyword boost
            keyword_boost = min(keyword_score * 0.15, 0.5) 
            
            # Store as plain dict
            dict_matches.append({
                "score": semantic_score,
                "metadata": meta,
                "fused_score": semantic_score + keyword_boost
            })
            
        # Sort by the new fused score descending
        dict_matches.sort(key=lambda x: x.get("fused_score", 0.0), reverse=True)
        
        return dict_matches[:top_k]

    def query(self, user_query: str, history: list[dict] = None):
        if not self.gemini_client or not self.pinecone_index:
            return {
                "answer": "Error: RAG Engine is missing API keys or Pinecone index.",
                "sources": []
            }
            
        search_query = user_query
        history_text = ""
        if history and len(history) > 0:
            history_text = "\n".join([f"{item['role'].capitalize()}: {item['text']}" for item in history])
            
            rewrite_prompt = f"""Given the following conversation history and the latest user query, rewrite the user query into a clear, standalone search query that includes all necessary context (like names or subjects mentioned previously).
Do not answer the query, just provide the rewritten standalone query text.

Conversation History:
{history_text}

Latest User Query:
{user_query}

Standalone Search Query:"""
            
            try:
                rewrite_res = self.gemini_client.models.generate_content(
                    model='gemini-2.5-flash',
                    contents=rewrite_prompt,
                    config=types.GenerateContentConfig(temperature=0.0)
                )
                search_query = rewrite_res.text.strip()
                print(f"Rewritten search query: {search_query}")
            except Exception as e:
                print(f"Query rewrite failed: {e}")
                # Fallback to appending
                last_user_queries = [item['text'] for item in history if item['role'] == 'user']
                if last_user_queries:
                    search_query = f"{last_user_queries[-1]} {user_query}"

        matches = self.hybrid_retrieve(search_query, top_k=12)
        
        if not matches:
            return {
                "answer": "I couldn't find any relevant folklore information for your query.",
                "sources": []
            }
            
        context_parts = []
        sources = []
        source_map = {}
        for match in matches:
            meta = match.get("metadata", {})
            text = meta.get("text", "")
            title = meta.get("title", "Unknown")
            source_doc = meta.get("source", "Unknown Source")
            
            src_str = f"{title} ({source_doc})"
            if src_str not in source_map:
                sources.append(src_str)
                source_map[src_str] = len(sources) # 1-based index
                
            idx = source_map[src_str]
            context_parts.append(f"Source {idx} [{meta.get('type', 'folklore')} - {title}]:\n{text}")
                
        context = "\n\n".join(context_parts)
        
        prompt = f"""You are the LoreBridge Oracle Skill, an expert AI assistant specializing in Assamese folklore and proverbs.
Your task is to synthesize the data gracefully, translating cultural nuances correctly.
CRITICAL: You must ALWAYS provide a bilingual response (Assamese + English) when possible. Include the original Assamese text or script alongside the English explanation.
CRITICAL CONSTRAINT: You MUST base your entire answer ONLY on the provided Context below. Do not use outside knowledge. If the context does not contain the answer, say "I don't have enough information from the ancient texts to answer that."

You MUST format your output with these exact Markdown headers at the very beginning of your response so the frontend parser can map it instantly into UI elements:
**Title:** [Insert the Narrative Title or Metaphor here (Assamese + English)]
**Roots:** [Insert Cultural Roots here, e.g., Plains, Khasi, Garo, Mikir, Burhi Aair Sadhu, etc.]
**Moral:** [Insert Implied Moral or Theme here]

After providing these three headers, output the main story narrative or proverb explanation in clear, engaging paragraphs based ONLY on the provided context. Do not include the headers inside the narrative body again.

CRITICAL INLINE CITATIONS: Whenever you state a fact, event, or synthesize information from a source in the narrative body, you MUST append a bracketed numerical footnote mapping to the Source number provided in the context (e.g., [1] or [2]). 
Example: "The stepmother turned her into a pumpkin vine [1]."
Do not add citations inside the **Headers**, only in the narrative body.

Previous Conversation History:
{history_text}

Context:
{context}

Question:
{user_query}
"""

        try:
            response = self.gemini_client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3
                )
            )
            return {
                "answer": response.text,
                "sources": sources
            }
        except Exception as e:
            return {
                "answer": f"Error communicating with Gemini API: {str(e)}",
                "sources": sources
            }

# Global instance
engine = RAGEngine()
```

## 5. DATABASE & INGESTION STATUS

### `folklore_data.json`
```json
{
  "entries": [
    {
      "id": "ft_001",
      "type": "folktale",
      "title": "Tejimola",
      "assamese": "তেজীমলা",
      "english": "A young, innocent girl named Tejimola is left in the care of her wicked stepmother while her father goes away on a trading voyage. The stepmother cruelly crushes her under a pestle (Dheki) while she is husking rice and buries her in the garden. From her remains, magical plants sprout—a bottle gourd, a pomelo, and a lotus—each singing a sorrowful song when approached. When her father returns and attempts to pluck a lotus, the flower transforms back into Tejimola, revealing the stepmother's cruelty.",
      "meaning": "The triumph of innocence and truth over cruelty. Nature bears witness to hidden crimes.",
      "moral": "Truth cannot be buried forever; good ultimately prevails over evil.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "reincarnation",
          "stepmother",
          "magic",
          "triumph of good"
        ]
      }
    },
    {
      "id": "ft_002",
      "type": "folktale",
      "title": "Kukuri Kona",
      "assamese": "কুকুৰীকণা",
      "english": "A comical tale about a son-in-law who suffers from night blindness (Kukuri Kona). He tries desperately to hide his affliction from his in-laws when he visits them. His attempts to navigate the house at night lead to a series of hilarious blunders, including wrestling with a goat, breaking pots, and making a fool of himself until the truth is finally revealed.",
      "meaning": "A warning against false pride and the lengths people go to hide their flaws.",
      "moral": "Hiding the truth leads to greater embarrassment.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "humor",
          "deception",
          "family",
          "pride"
        ]
      }
    },
    {
      "id": "ft_003",
      "type": "folktale",
      "title": "Tula aru Teja",
      "assamese": "তুলা আৰু তেজা",
      "english": "Tula and Teja are step-sisters. Teja's mother passes away, and her cruel stepmother makes her do all the hard chores, while treating Tula like a princess. Despite the hardship, Teja receives magical help from animals. Eventually, the King discovers Teja's beauty and marries her. The jealous stepmother tries to replace Teja with Tula through dark magic, but the King discovers the trick, punishes the wicked, and reunites with Teja.",
      "meaning": "A classic Cinderella archetype focusing on divine justice.",
      "moral": "Virtue and kindness are rewarded, while jealousy and wickedness are punished.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "magic",
          "step-sisters",
          "royalty",
          "justice"
        ]
      }
    },
    {
      "id": "ft_004",
      "type": "folktale",
      "title": "Champawati",
      "assamese": "চম্পাৱতী",
      "english": "Champawati is forced by her jealous stepmother to marry a python. To everyone's surprise, the python is actually a handsome divine prince cursed to live in a snake's skin. The prince sheds his skin at night. When the stepmother tries to replicate this success for her own daughter by finding a real python, it ends in tragedy.",
      "meaning": "Greed and blind imitation without understanding lead to disastrous consequences.",
      "moral": "Do not covet what belongs to others through blind imitation.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "curse",
          "transformation",
          "greed",
          "jealousy"
        ]
      }
    },
    {
      "id": "pr_001",
      "type": "proverb",
      "title": "The Crane and the Fishes",
      "assamese": "অধিক মাছত বগলী কণা",
      "english": "A crane goes blind when there are too many fishes.",
      "meaning": "When faced with an overwhelming number of choices or opportunities, one often becomes confused and fails to make any decision at all.",
      "moral": "Focus and decisiveness are essential; too many choices lead to confusion.",
      "metadata": {
        "roots": "P.R. Gurdon Collection / Oral Tradition",
        "themes": [
          "decision-making",
          "greed",
          "nature"
        ]
      }
    },
    {
      "id": "pr_002",
      "type": "proverb",
      "title": "The Sign of a Thief",
      "assamese": "অতি ভক্তি চোৰৰ লক্ষণ",
      "english": "Too much devotion is a sign of a thief.",
      "meaning": "Excessive flattery, subservience, or sudden overly polite behavior often hides malicious intent or an ulterior motive.",
      "moral": "Beware of false flattery and excessive politeness.",
      "metadata": {
        "roots": "P.R. Gurdon Collection / Oral Tradition",
        "themes": [
          "deception",
          "human nature",
          "caution"
        ]
      }
    },
    {
      "id": "pr_003",
      "type": "proverb",
      "title": "Lightning Without Clouds",
      "assamese": "বিনা মেঘে বজ্ৰপাত",
      "english": "Lightning without clouds.",
      "meaning": "A sudden, unexpected disaster or tragic event that occurs without any prior warning or indication.",
      "moral": "Life is unpredictable; be prepared for the unexpected.",
      "metadata": {
        "roots": "P.R. Gurdon Collection / Oral Tradition",
        "themes": [
          "disaster",
          "surprise",
          "fate"
        ]
      }
    },
    {
      "id": "pr_004",
      "type": "proverb",
      "title": "The Power of the Public",
      "assamese": "ৰাইজে নখ জোকাৰিলে নৈ বয়",
      "english": "If the public shakes their nails, a river flows.",
      "meaning": "If the community or a large group of people work together, their combined small efforts can achieve massive results, just like drops of water forming a river.",
      "moral": "Unity is strength; collective effort can achieve the impossible.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "unity",
          "strength",
          "community",
          "hard work"
        ]
      }
    },
    {
      "id": "pr_005",
      "type": "proverb",
      "title": "The Dog and the Stick",
      "assamese": "যেনে কুকুৰ তেনে টাঙোন",
      "english": "As the dog, so the stick.",
      "meaning": "A harsh measure must be applied to deal with a harsh or unruly person. It means getting what one deserves based on their behavior.",
      "moral": "Tit for tat; actions have equal and appropriate consequences.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "justice",
          "karma",
          "retribution"
        ]
      }
    },
    {
      "id": "pr_006",
      "type": "proverb",
      "title": "The Worth of a Seedling",
      "assamese": "যি মূলা বাঢ়ে তাৰ দুপাততে চিন",
      "english": "The radish that will grow is known by its first two leaves.",
      "meaning": "Just as a healthy plant shows signs of its potential early on, a child's future greatness or character can be seen in their early childhood behavior.",
      "moral": "Morning shows the day; early signs indicate future potential.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "potential",
          "growth",
          "observation"
        ]
      }
    },
    {
      "id": "pr_007",
      "type": "proverb",
      "title": "Effort Brings Wealth",
      "assamese": "পুৰুষৰ পৰিশ্ৰম, লক্ষ্মীৰ কৃপা",
      "english": "A man's hard work brings the grace of Lakshmi (Goddess of Wealth).",
      "meaning": "Prosperity and success are not merely handed out; they are earned through diligent effort, hard work, and persistence.",
      "moral": "Hard work is the key to success and prosperity.",
      "metadata": {
        "roots": "P.R. Gurdon Collection / Oral Tradition",
        "themes": [
          "hard work",
          "wealth",
          "diligence"
        ]
      }
    },
    {
      "id": "ft_005",
      "type": "folktale",
      "title": "Bandor Aru Xiyal",
      "assamese": "বান্দৰ আৰু শিয়াল",
      "english": "The Monkey and the Fox. A cunning fox tries to outsmart a monkey to steal his food, but the agile and clever monkey ultimately turns the trick around, leaving the greedy fox empty-handed and humiliated.",
      "meaning": "Intelligence and agility can outmaneuver cunning and greed.",
      "moral": "Do not underestimate others; greed leads to your own downfall.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "animal fable",
          "cunning",
          "greed",
          "wit"
        ]
      }
    },
    {
      "id": "ft_006",
      "type": "folktale",
      "title": "The Kite's Daughter",
      "assamese": "চিলনীৰ জীয়েক",
      "english": "A childless potter and his wife adopt a baby girl dropped by a kite. The girl, Chiloneer Jiyek, grows into a beautiful woman and marries a wealthy merchant. However, her jealous co-wives torment her relentlessly and try to eliminate her. Through the magical intervention and fierce love of her biological kite mother, she is saved, and her wicked co-wives are exposed and punished.",
      "meaning": "A magical tale of a virtuous adopted child overcoming the jealousy of co-wives through the enduring love of her kite mother.",
      "moral": "A mother's love, no matter how unconventional, never fades; jealousy ultimately destroys those who harbor it.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "maternal love",
          "jealousy",
          "magic",
          "justice"
        ]
      }
    },
    {
      "id": "pr_008",
      "type": "proverb",
      "title": "The Elephant's Tusks",
      "assamese": "হাতীৰ দাঁত ওলালে সোমাব নোৱাৰে",
      "english": "An elephant's tusks, once out, cannot go back in.",
      "meaning": "Once words are spoken or an action is committed, it cannot be undone. It symbolizes the permanence of speech and the strictness of a true commitment.",
      "moral": "Think carefully before you speak or act; honor your commitments permanently.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "permanence",
          "commitment",
          "words",
          "wisdom"
        ]
      }
    },
    {
      "id": "pr_009",
      "type": "proverb",
      "title": "The Biting Dog",
      "assamese": "ভৌকা কুকুৰে নাকাঁমোৰে",
      "english": "A barking dog does not bite.",
      "meaning": "People who make the most noise or issue the loudest threats rarely take action. True danger usually comes quietly.",
      "moral": "Do not be intimidated by empty threats or loud boasting.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "threats",
          "boasting",
          "action vs words"
        ]
      }
    },
    {
      "id": "ft_007",
      "type": "folktale",
      "title": "The Clever Fox and the Foolish Tiger",
      "assamese": "শিয়াল আৰু বাঘ",
      "english": "A cunning fox manages to outwit a fierce but foolish tiger who wanted to eat him. The fox convinces the tiger that the reflection in the well is another rival tiger. The tiger jumps in and gets stuck, while the fox escapes. A classic tale of brain over brawn.",
      "meaning": "Intelligence and wit can overcome brute physical strength.",
      "moral": "Brain is better than brawn; think before you act.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "intelligence",
          "wit",
          "survival",
          "animals"
        ]
      }
    },
    {
      "id": "ft_008",
      "type": "folktale",
      "title": "Panesoi",
      "assamese": "পানেচৈ",
      "english": "The tragic story of Panesoi, a beautiful girl who was transformed into a water lily by the curse of a river goddess. Her lover searches for her relentlessly, and ultimately their pure love breaks the curse, reuniting them.",
      "meaning": "A romantic and tragic myth explaining the origin of the water lily and the power of enduring love.",
      "moral": "True love and devotion can overcome even divine curses.",
      "metadata": {
        "roots": "Assamese Mythology",
        "themes": [
          "love",
          "curse",
          "transformation",
          "nature"
        ]
      }
    },
    {
      "id": "pr_010",
      "type": "proverb",
      "title": "The Public is King",
      "assamese": "ৰাইজেই ৰজা",
      "english": "The public is the king.",
      "meaning": "In any society, the collective will and power of the people are supreme, surpassing even the authority of a ruler.",
      "moral": "Respect the collective opinion; unity is the ultimate power.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "society",
          "unity",
          "democracy",
          "power"
        ]
      }
    },
    {
      "id": "pr_011",
      "type": "proverb",
      "title": "Excessive Devotion",
      "assamese": "অতি ভক্তি চোৰৰ লক্ষণ",
      "english": "Too much devotion is the sign of a thief.",
      "meaning": "When someone acts excessively humble or overly devout, it often hides a deceitful or malicious intent. True goodness is natural, not exaggerated.",
      "moral": "Beware of people who try too hard to appear virtuous.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "deceit",
          "suspicion",
          "hypocrisy"
        ]
      }
    },
    {
      "id": "ft_009",
      "type": "folktale",
      "title": "Phulkonwar and Monikonwar",
      "assamese": "ফুলকোঁৱৰ আৰু মণিকোঁৱৰ",
      "english": "An epic Assamese ballad telling the story of two princely friends, Phulkonwar and Monikonwar. Their adventures involve magical wooden horses, rescuing princesses, and fighting demons. Monikonwar is eventually swallowed by a river deity, leading to Phulkonwar's heroic quest to save him.",
      "meaning": "A heroic tale of friendship, bravery, and magical quests.",
      "moral": "True friendship demands sacrifice and unyielding bravery in the face of danger.",
      "metadata": {
        "roots": "Assamese Ballads (Geet)",
        "themes": [
          "friendship",
          "magic",
          "adventure",
          "bravery"
        ]
      }
    },
    {
      "id": "ft_010",
      "type": "folktale",
      "title": "The Elephant-Apple Princess",
      "assamese": "ঔ-কুঁৱৰী",
      "english": "A magical tale about a princess born inside an Ou-Tenga (elephant-apple). A prince discovers the fruit, and at night, the beautiful Ou-Kuwori emerges from it to do household chores. The prince eventually catches her, breaks the shell, and marries her, overcoming various magical obstacles.",
      "meaning": "A whimsical story of hidden beauty and magical transformations.",
      "moral": "True beauty and value are often hidden beneath hard exteriors.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "magic",
          "transformation",
          "romance",
          "hidden beauty"
        ]
      }
    },
    {
      "id": "ft_011",
      "type": "folktale",
      "title": "The Frog Prince",
      "assamese": "ভেকুলী কোঁৱৰ",
      "english": "A childless couple is blessed with a son who is born as a frog. Despite his appearance, the frog prince is incredibly intelligent and magically skilled. He undertakes difficult tasks for the king, eventually winning the princess's hand in marriage and transforming into a handsome prince.",
      "meaning": "A classic transformation tale emphasizing inner worth over outward appearance.",
      "moral": "Do not judge someone by their appearance; true worth lies within.",
      "metadata": {
        "roots": "Burhi Aair Sadhu",
        "themes": [
          "transformation",
          "inner beauty",
          "magic",
          "tasks"
        ]
      }
    },
    {
      "id": "pr_012",
      "type": "proverb",
      "title": "Empty Boasts",
      "assamese": "খোজত খৰ নাই, মুখত গৰগৰণি",
      "english": "No swiftness in steps, but thunder in the mouth.",
      "meaning": "Refers to someone who talks a lot and makes grand claims but takes no action or lacks the ability to back up their words.",
      "moral": "Actions speak louder than empty boasts.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "boasting",
          "action",
          "hypocrisy"
        ]
      }
    },
    {
      "id": "pr_013",
      "type": "proverb",
      "title": "Pride and Poverty",
      "assamese": "কৰি খাব নাজানে, মাগি খাবলৈ লাজ",
      "english": "Does not know how to earn, but is ashamed to beg.",
      "meaning": "Describes a person who lacks the skills or willingness to work for a living, yet has too much false pride to ask for help.",
      "moral": "False pride combined with laziness is a path to ruin.",
      "metadata": {
        "roots": "Oral Tradition",
        "themes": [
          "laziness",
          "pride",
          "poverty"
        ]
      }
    }
  ]
}
```

### `server/ingest_pinecone.py`
```python
import os
import json
from pinecone import Pinecone, ServerlessSpec
from google import genai

DATA_DIR = r"c:\Users\Bhaswati Sikdar\Documents\data"
JSON_PATH = os.path.join(DATA_DIR, "folklore_data.json")

INDEX_NAME = "assamese-folklore"
EMBEDDING_DIM = 3072  # For gemini-embedding-2

def _load_env():
    env_file = os.path.join(DATA_DIR, ".env")
    if os.path.exists(env_file):
        with open(env_file, "r") as f:
            for line in f:
                if "=" in line and not line.startswith("#"):
                    k, v = line.strip().split("=", 1)
                    os.environ[k] = v

_load_env()
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
PINECONE_API_KEY = os.environ.get("PINECONE_API_KEY")

if not GEMINI_API_KEY or not PINECONE_API_KEY:
    raise ValueError("GEMINI_API_KEY and PINECONE_API_KEY must be set in .env")

# Initialize Clients
gemini_client = genai.Client(api_key=GEMINI_API_KEY)
pc = Pinecone(api_key=PINECONE_API_KEY)

# Clear existing index to ingest fresh JSON data
if INDEX_NAME in pc.list_indexes().names():
    print(f"Deleting old Pinecone index '{INDEX_NAME}' to flush old PDF vectors...")
    pc.delete_index(INDEX_NAME)

print(f"Creating Pinecone index '{INDEX_NAME}'...")
pc.create_index(
    name=INDEX_NAME,
    dimension=EMBEDDING_DIM,
    metric="cosine",
    spec=ServerlessSpec(cloud="aws", region="us-east-1")
)
index = pc.Index(INDEX_NAME)

import time

def get_embedding(text):
    time.sleep(1) # Sleep to avoid rate limits
    response = gemini_client.models.embed_content(
        model='gemini-embedding-2',
        contents=text
    )
    return response.embeddings[0].values

def ingest_json():
    print("Ingesting structured JSON data...")
    if not os.path.exists(JSON_PATH):
        print(f"Error: {JSON_PATH} not found.")
        return
        
    with open(JSON_PATH, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    entries = data.get("entries", [])
    chunks_to_upsert = []
    
    for i, item in enumerate(entries):
        item_id = item.get("id", f"item_{i}")
        item_type = item.get("type", "unknown")
        title = item.get("title", "")
        english_text = item.get("english", "")
        moral = item.get("moral", "")
        metadata_obj = item.get("metadata", {})
        roots = metadata_obj.get("roots", "")
        
        # Construct a dense semantic string for the embedding
        semantic_text = f"Title: {title}\nType: {item_type}\nRoots: {roots}\nNarrative: {english_text}\nMoral: {moral}"
        
        print(f"Embedding {item_id}: {title}...")
        embedding = get_embedding(semantic_text)
        
        chunks_to_upsert.append({
            "id": item_id,
            "values": embedding,
            "metadata": {
                "type": item_type,
                "text": semantic_text, # Save the rich text to be passed as context
                "source": roots,
                "title": title
            }
        })
        
        # Batch upsert every 5 items to avoid large payloads
        if len(chunks_to_upsert) >= 5:
            index.upsert(vectors=chunks_to_upsert)
            chunks_to_upsert = []
            
    if chunks_to_upsert:
        index.upsert(vectors=chunks_to_upsert)
        
    print("JSON Ingestion Complete. Total vectors upserted:", len(entries))

def main():
    ingest_json()
    print("All ingestion complete!")

if __name__ == "__main__":
    main()
```

## 6. ACTIVE RUNTIME ENVIRONMENT

```text
Status Check at 2026-06-22T18:16:00+05:30:
No background tasks are currently running in the agent environment.
```

## 7. RECENT FIXES (2026-06-22 Session 2)

- **`mobile_styles.css`**: Fixed UTF-16 binary corruption at line 108. The `@keyframes rune-pulse` and `.rune-loader` CSS was saved as wide-char binary by a previous editor. Fully rewrote file as clean UTF-8.
- **`js/bundle.js`**: Rebuilt (81452 chars, 1719 lines) to include all updated pages: home, folktales, proverbs, graph, chat, about, admin, quality, eval, ingest + app.js logic.
- **`build_bundle.py`**: Created dedicated bundle builder script for future use.

