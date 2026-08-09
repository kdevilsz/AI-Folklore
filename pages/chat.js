export async function renderChat(container) {
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
    const pageTitle = lang === 'as' ? "অৰাকল" : "The Oracle";
    const pageSubtitle = lang === 'as' ? 
        "পূৰ্বপুৰুষৰ জ্ঞান অন্বেষণ কৰক। অৰাকলে পুৰণি পুথিসমূহ অধ্যয়ন কৰিছে আৰু কাহিনীসমূহ জানে।" : 
        "Seek the wisdom of the ancients. The Oracle has read the old texts and knows the tales.";
    const bannerLabel = lang === 'as' ? "বিষয়বস্তু" : "Conversing about";
    const clearBtnLabel = lang === 'as' ? "প্ৰসংগ মচিব" : "Clear Context";
    const botTitle = lang === 'as' ? "অৰাকল" : "The Oracle";
    
    let greetingText = "";
    if (storyTitle) {
        greetingText = lang === 'as' ? 
            `মই মোৰ মনটো <strong>"${storyTitle}"</strong> ৰ ওপৰত কেন্দ্ৰীভূত কৰিছোঁ। তলৰ এটা ব্যাখ্যাৰ ধৰণ বাছনি কৰক বা এই সম্পৰ্কে মোক যিকোনো কথা সোধক।` : 
            `I have focused my thoughts on <strong>"${storyTitle}"</strong>. Select an explanation mode below or ask me anything about it.`;
    } else {
        greetingText = lang === 'as' ? 
            "নমস্কাৰ, হে যাত্ৰী। আজি আপুনি অসমৰ কোনটো সাধুকথাৰ ৰহস্য উন্মোচন কৰিব বিচাৰে?" : 
            "Greetings, traveler. What tale of Assam do you wish to uncover today?";
    }

    const placeholderText = storyTitle ? 
        (lang === 'as' ? `"${storyTitle}" ৰ বিষয়ে সোধক...` : `Ask about "${storyTitle}"...`) : 
        (lang === 'as' ? 'উদাহৰণস্বৰূপ: তেজীমলাৰ বিষয়ে কওক...' : 'E.g., Tell me about Tejimola...');
    const sendButtonText = lang === 'as' ? "অন্বেষণ" : "Seek";

    const chip1 = lang === 'as' ? "✨ সহজভাৱে কওক" : "✨ Explain Simply";
    const chip2 = lang === 'as' ? "🧒 শিশুৰ উপযোগী ব্যাখ্যা" : "🧒 Explain for Children";
    const chip3 = lang === 'as' ? "🎋 সাংস্কৃতিক প্ৰসংগ" : "🎋 Explain Culturally";
    const chip4 = lang === 'as' ? "🕰️ ঐতিহাসিক পটভূমি" : "🕰️ Explain Historically";
    const chip5 = lang === 'as' ? "🔄 আন কাহিনীৰে তুলনা" : "🔄 Compare with Another Story";

    const suggest1 = lang === 'as' ? "তেজীমলাৰ কাহিনী কওক" : "Tell me the story of Tejimola";
    const suggest2 = lang === 'as' ? "পৰিশ্ৰমৰ বিষয়ে ফকৰা-যোজনা কওক" : "Give me a proverb about hard work";
    const suggest3 = lang === 'as' ? "বুঢ়ী আইৰ সাধুৰ নৈতিক শিক্ষা কি?" : "What is the moral of Burhi Aair Sadhu?";

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
