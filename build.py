import os
import textwrap

base = r"c:\Users\Bhaswati Sikdar\Documents\data"

files = {
    "index.css": """\
:root {
  --bg-dark: #121212;
  --surface: #1e1e1e;
  --primary: #ffb74d; /* Saffron/Amber */
  --text: #f0f0f0;
  --text-muted: #aaaaaa;
}
body {
  background-color: var(--bg-dark);
  color: var(--text);
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}
nav {
  padding: 1rem 2rem;
  background: var(--surface);
  display: flex;
  gap: 1rem;
  align-items: center;
}
nav a {
  color: var(--text);
  text-decoration: none;
  font-weight: 500;
}
nav a:hover, nav a.active {
  color: var(--primary);
}
#app {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}
.card {
  background: var(--surface);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #333;
}
.card h3 { margin-top: 0; color: var(--primary); }
input, button {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: 1px solid #333;
  background: var(--bg-dark);
  color: var(--text);
}
button {
  background: var(--primary);
  color: #000;
  cursor: pointer;
  font-weight: bold;
}
""",
    "index.html": """\
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LoreBridge</title>
    <link rel="stylesheet" href="index.css">
</head>
<body>
    <nav>
        <span style="font-weight:bold; color:var(--primary); font-size:1.2rem;">LoreBridge</span>
        <a href="#home">Home</a>
        <a href="#folktales">Folktales</a>
        <a href="#proverbs">Proverbs</a>
        <a href="#chat">Chat</a>
        <a href="#about">About</a>
    </nav>
    <div id="app"></div>
    <script type="module" src="js/app.js"></script>
</body>
</html>
""",
    "js/data.js": """\
export const proverbs = [
    { id: "p1", assamese: "যি মূলা বাঢ়ে তাৰ দুপাততে চিন", meaning: "Morning shows the day", transliteration: "Ji mula bare tar dupatote chin" },
    { id: "p2", assamese: "বোকাৰ পদুম", meaning: "Lotus in the mud (Excellence in adversity)", transliteration: "Bokar podum" }
];
export const folktales = [
    { id: "f1", title: "Tejimola", summary: "A tragic tale of a stepdaughter who turns into various plants." },
    { id: "f2", title: "Burhi Aair Xadhu", summary: "Grandma's tales compilation." }
];
""",
    "js/app.js": """\
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
""",
    "pages/home.js": """\
export function renderHome(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 4rem 0;">
            <h1 style="font-size: 3rem; color: var(--primary);">Discover Assamese Folklore</h1>
            <p style="font-size: 1.2rem; max-width: 600px; margin: 0 auto; color: var(--text-muted);">
                LoreBridge preserves and makes Assamese folktales, proverbs, and traditional knowledge accessible.
            </p>
        </div>
    `;
}
""",
    "pages/folktales.js": """\
import { folktales } from '../js/data.js';
export function renderFolktales(container) {
    let html = `<h2>Folktales</h2>`;
    folktales.forEach(f => {
        html += `<div class="card">
            <h3>${f.title}</h3>
            <p>${f.summary}</p>
        </div>`;
    });
    container.innerHTML = html;
}
""",
    "pages/proverbs.js": """\
import { proverbs } from '../js/data.js';
export function renderProverbs(container) {
    let html = `<h2>Proverbs</h2>`;
    proverbs.forEach(p => {
        html += `<div class="card">
            <h3 style="font-size: 1.5rem;">${p.assamese}</h3>
            <p><i>${p.transliteration}</i></p>
            <p>${p.meaning}</p>
        </div>`;
    });
    container.innerHTML = html;
}
""",
    "pages/chat.js": """\
export function renderChat(container) {
    container.innerHTML = `
        <h2>AI Assistant</h2>
        <div id="chat-history" style="height: 300px; overflow-y: auto; background: var(--surface); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;"></div>
        <div style="display: flex; gap: 0.5rem;">
            <input type="text" id="chat-input" style="flex:1;" placeholder="Ask about Assamese folklore...">
            <button id="chat-send">Send</button>
        </div>
    `;
    const btn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    const history = document.getElementById('chat-history');
    
    btn.onclick = async () => {
        const text = input.value;
        if(!text) return;
        history.innerHTML += `<div style="margin-bottom:1rem;"><b>You:</b> ${text}</div>`;
        input.value = '';
        
        try {
            const res = await fetch('http://localhost:8000/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: text})
            });
            const data = await res.json();
            history.innerHTML += `<div style="margin-bottom:1rem; color: var(--primary);"><b>LoreBridge:</b> ${data.answer}</div>`;
        } catch(e) {
            history.innerHTML += `<div style="margin-bottom:1rem; color: red;"><b>Error:</b> Could not connect to backend.</div>`;
        }
        history.scrollTop = history.scrollHeight;
    };
}
""",
    "pages/about.js": """\
export function renderAbout(container) {
    container.innerHTML = `
        <h2>About LoreBridge</h2>
        <p>This project aims to digitize and make accessible the rich folklore and traditional tales of Assam.</p>
    `;
}
""",
    "server/server.py": """\
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    query: str

@app.post("/api/chat")
def chat(request: ChatRequest):
    # Mock response for now to ensure MVP works
    return {
        "answer": f"This is a placeholder response for your query: '{request.query}'. The full RAG index is being built.",
        "sources": []
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
"""
}

for path, content in files.items():
    full_path = os.path.join(base, path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content)

print("All files built.")
