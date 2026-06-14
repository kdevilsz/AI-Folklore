export function renderChat(container) {
    container.innerHTML = `
        <h1 class="page-title">The Oracle</h1>
        <p class="page-subtitle">Seek the wisdom of the ancients. The Oracle has read the old texts and knows the tales.</p>
        <div class="card" style="max-width: 800px; margin: 0 auto; display: flex; flex-direction: column; height: 60vh;">
            <div id="chat-history" style="flex: 1; overflow-y: auto; padding-right: 1rem; margin-bottom: 1.5rem;">
                <div class="chat-message bot">
                    <b>Oracle:</b> Greetings, traveler. What tale of Assam do you wish to uncover today?
                </div>
            </div>
            <div style="display: flex; gap: 1rem; border-top: 1px solid var(--border); padding-top: 1.5rem;">
                <input type="text" id="chat-input" style="flex:1; border-radius: 20px; padding-left: 1.5rem;" placeholder="E.g., Tell me about Tejimola...">
                <button id="chat-send" style="border-radius: 20px; padding: 1rem 2rem;">Seek</button>
            </div>
        </div>
    `;
    const btn = document.getElementById('chat-send');
    const input = document.getElementById('chat-input');
    const history = document.getElementById('chat-history');
    
    btn.onclick = async () => {
        const text = input.value;
        if(!text) return;
        history.innerHTML += `<div class="chat-message user"><b>You:</b> ${text}</div>`;
        input.value = '';
        history.scrollTop = history.scrollHeight;
        
        try {
            const res = await fetch('http://127.0.0.1:8000/api/chat', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({query: text})
            });
            const data = await res.json();
            
            // Render markdown-like text properly (replace newlines with br)
            const formattedAnswer = data.answer.replace(/\\n/g, '<br>');
            history.innerHTML += `<div class="chat-message bot"><b>Oracle:</b><br><br>${formattedAnswer}</div>`;
        } catch(e) {
            history.innerHTML += `<div class="chat-message bot" style="border-left-color: var(--accent-red); color: var(--accent-red);"><b>Oracle:</b> The connection to the spirit realm has faded. Try again later.</div>`;
        }
        history.scrollTop = history.scrollHeight;
    };
    
    // Add enter key support
    input.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
        event.preventDefault();
        btn.click();
      }
    });
}
