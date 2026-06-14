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
