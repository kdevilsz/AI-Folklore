export function renderAbout(container) {
    const pageTitle = "About the Project";
    const pageSubtitle = "LoreBridge — Preserving the Oral Traditions of the Brahmaputra Valley";
    
    const header1 = "🎋 Why Assamese Folklore Matters";
    const text1 = "Assam, nestled along the banks of the mighty Brahmaputra River, has one of the world's most rich and diverse oral traditions. For generations, traditional stories, ethical codes, and ecological wisdom have been passed down by mouth. These tales are not merely children's entertainment; they represent the cultural DNA, identity, and collective wisdom of the Assamese people, passing vital ancestral insights to new generations.";

    const header2 = "⚠️ The Looming Risk: Endangered Oral Traditions";
    const text2 = "UNESCO estimates that globally, one language dies every two weeks. When a language is lost, its oral history and folklore fade with it. In Assam, many stories exist only in the memories of elders or in rare, out-of-print books. With rapid modernization and changing lifestyle patterns, these tales are at risk of being lost forever as the old keepers of our oral traditions pass away.";

    const header3 = "🔮 Our Solution: The AI-Powered Digital Sanctuary";
    const text3 = "LoreBridge addresses this urgent crisis by building a comprehensive, interactive digital archive. Rather than keeping these stories locked away in static, dry PDF archives, we bring them to life through:";

    const li3_1 = "<strong>The Oracle AI Chatbot:</strong> A context-aware guide trained on Assamese folklore that users can converse with to analyze morals, customs, or request multiple explanation modes.";
    const li3_2 = "<strong>Lore Web:</strong> An interactive, graphical web mapping the interconnected network of characters, themes, and proverbs to reveal cultural patterns.";
    const li3_3 = "<strong>Community Recognition & Sharing:</strong> A system allowing users across Assam to submit their own stories, highlighting local village and district contributions.";

    const header4 = "✨ Creator's Personal Mission";
    const text4 = "As a student growing up in Guwahati, I spent my childhood listening to my grandmother's retellings of the classic stories from <em>Burhi Aair Sadhu</em>. Seeing that my peers were gradually losing touch with these magical narratives, I felt a deep responsibility to act. My personal mission with LoreBridge is to build a bridge between traditional Assamese heritage and modern computer science, using AI to present the stories of our ancestors in a medium that resonates with the digital generation.";

    const header5 = "⚙️ Technical Architecture";
    const text5 = "LoreBridge is built using a modern, scalable technology stack configured for semantic query understanding and retrieval:";

    const tech1 = "Backend Server";
    const tech1_desc = "Python FastAPI powering search pipelines, similarity scoring, and API endpoints.";
    const tech2 = "RAG & Vector Search";
    const tech2_desc = "Retrieval-Augmented Generation (RAG) using Pinecone vector database and semantic embeddings.";
    const tech3 = "Generative LLM";
    const tech3_desc = "Gemini LLM integrating story payloads to generate context-aware, structured folklore analyses.";

    const creator_role = "Project Creator & Developer";
    const creator_school = "Class 12 Student • Delhi Public School, Guwahati, Assam";
    const creator_initiative = "Cultural Technology Preservation Initiative";

    container.innerHTML = `
        <h1 class="page-title">${pageTitle}</h1>
        <p class="page-subtitle">${pageSubtitle}</p>
        
        <!-- Decorative Assamese Motif Border -->
        <svg viewBox="0 0 200 20" width="200" height="20" style="margin: 0 auto 3rem auto; display: block; stroke: var(--primary); fill: none; stroke-width: 1.5; stroke-linecap: round; opacity: 0.8;">
            <path d="M 10 10 L 30 10 M 170 10 L 190 10 M 30 10 L 40 0 L 50 10 L 40 20 Z M 50 10 L 60 0 L 70 10 L 60 20 Z M 70 10 L 90 10 M 110 10 L 130 10 M 130 10 L 140 0 L 150 10 L 140 20 Z M 150 10 L 160 0 L 170 10 L 160 20 Z M 90 10 L 100 0 L 110 10 L 100 20 Z" />
        </svg>

        <div style="max-width: 850px; margin: 0 auto; display: flex; flex-direction: column; gap: 2.5rem; text-align: left; padding: 0 1rem;">
            
            <!-- Row 1: Why It Matters & The Problem -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem;" class="about-grid-2col">
                <div class="card">
                    <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                        ${header1}
                    </h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin: 0;">
                        ${text1}
                    </p>
                </div>
                <div class="card">
                    <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                        ${header2}
                    </h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin: 0;">
                        ${text2}
                    </p>
                </div>
            </div>

            <!-- Row 2: Our Solution -->
            <div class="card">
                <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                    ${header3}
                </h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
                    ${text3}
                </p>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div style="background: rgba(0,0,0,0.2); border-left: 3px solid var(--primary); padding: 0.8rem 1.2rem; border-radius: 0 8px 8px 0;">
                        <p style="color: var(--text); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                            ${li3_1}
                        </p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border-left: 3px solid var(--primary); padding: 0.8rem 1.2rem; border-radius: 0 8px 8px 0;">
                        <p style="color: var(--text); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                            ${li3_2}
                        </p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border-left: 3px solid var(--primary); padding: 0.8rem 1.2rem; border-radius: 0 8px 8px 0;">
                        <p style="color: var(--text); font-size: 0.95rem; margin: 0; line-height: 1.6;">
                            ${li3_3}
                        </p>
                    </div>
                </div>
            </div>

            <!-- Row 3: Creator Mission Statement -->
            <div class="card" style="border: 1px solid var(--primary); background: radial-gradient(circle at top right, rgba(230, 200, 106, 0.05) 0%, var(--surface) 100%);">
                <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                    ${header4}
                </h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.8; margin-bottom: 1.5rem; font-style: italic;">
                    "${text4}"
                </p>
                <div style="display: flex; align-items: center; gap: 1rem; border-top: 1px dashed rgba(255,255,255,0.1); padding-top: 1.2rem;">
                    <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--primary); color: #000; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; flex-shrink: 0; box-shadow: 0 0 10px var(--primary-glow);">
                        DD
                    </div>
                    <div>
                        <h4 style="margin: 0; font-family: 'Playfair Display', serif; font-size: 1.1rem; color: var(--text);">Devansh Deka</h4>
                        <p style="margin: 0.2rem 0 0 0; font-size: 0.85rem; color: var(--primary);">${creator_role}</p>
                        <p style="margin: 0.1rem 0 0 0; font-size: 0.8rem; color: var(--text-muted);">${creator_school}</p>
                    </div>
                </div>
            </div>

            <!-- Row 4: Technical Architecture -->
            <div class="card">
                <h3 style="font-family: 'Playfair Display', serif; color: var(--primary); margin-top: 0; margin-bottom: 1rem; font-size: 1.4rem;">
                    ${header5}
                </h3>
                <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.5rem;">
                    ${text5}
                </p>
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem;" class="about-grid-3col">
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); padding: 1rem; border-radius: 8px; text-align: center;">
                        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">⚡</span>
                        <h4 style="margin: 0 0 0.4rem 0; font-size: 0.95rem; color: var(--primary); font-family: 'Outfit', sans-serif;">${tech1}</h4>
                        <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${tech1_desc}</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); padding: 1rem; border-radius: 8px; text-align: center;">
                        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🌲</span>
                        <h4 style="margin: 0 0 0.4rem 0; font-size: 0.95rem; color: var(--primary); font-family: 'Outfit', sans-serif;">${tech2}</h4>
                        <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${tech2_desc}</p>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--border); padding: 1rem; border-radius: 8px; text-align: center;">
                        <span style="font-size: 1.5rem; display: block; margin-bottom: 0.5rem;">🔮</span>
                        <h4 style="margin: 0 0 0.4rem 0; font-size: 0.95rem; color: var(--primary); font-family: 'Outfit', sans-serif;">${tech3}</h4>
                        <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted); line-height: 1.4;">${tech3_desc}</p>
                    </div>
                </div>
            </div>

            <!-- Footer Quote / Disclaimer -->
            <div style="text-align: center; margin-top: 1rem; padding: 1rem; border-top: 1px dashed rgba(255,255,255,0.1);">
                <p style="color: var(--text-muted); font-size: 0.85rem; margin: 0; font-style: italic;">
                    "Dedicated to the preservation of Assam's rich oral legacy — where ancient tales find digital permanence."
                </p>
            </div>
            
        </div>
    `;
}
