export function renderAbout(container) {
    const lang = window.currentLanguage || 'en';

    const pageTitle = lang === 'as' ? "প্ৰকল্পৰ বিষয়ে" : "About the Project";
    const pageSubtitle = lang === 'as' ? "লৰীব্ৰীজ — ব্ৰহ্মপুত্ৰ উপত্যকাৰ মৌখিক পৰম্পৰাৰ সংৰক্ষণ" : "LoreBridge — Preserving the Oral Traditions of the Brahmaputra Valley";
    
    const header1 = lang === 'as' ? "🎋 অসমীয়া লোক-সংস্কৃতিৰ গুৰুত্ব কিয়" : "🎋 Why Assamese Folklore Matters";
    const text1 = lang === 'as' ? 
        "মহাবাহু ব্ৰহ্মপুত্ৰৰ পাৰত গঢ়ি উঠা অসমীয়া লোক-সংস্কৃতি পৃথিৱীৰ ভিতৰতে অন্যতম চহকী আৰু বৈচিত্ৰ্যপূৰ্ণ মৌখিক পৰম্পৰা। প্ৰজন্মৰ পিছত প্ৰজন্ম ধৰি সাধুকথা, ফকৰা-যোজনা আৰু পৰম্পৰাগত জ্ঞান মুখে মুখে চলি আহিছে। এই সাধুবোৰ কেৱল মনোঞ্জনৰ সমল নহয়; এইবোৰ হৈছে অসমীয়া জাতিৰ সাংস্কৃতিক পৰিচয় আৰু সামূহিক প্ৰজ্ঞাৰ প্ৰতিফলন।" : 
        "Assam, nestled along the banks of the mighty Brahmaputra River, has one of the world's most rich and diverse oral traditions. For generations, traditional stories, ethical codes, and ecological wisdom have been passed down by mouth. These tales are not merely children's entertainment; they represent the cultural DNA, identity, and collective wisdom of the Assamese people, passing vital ancestral insights to the new generations.";

    const header2 = lang === 'as' ? "⚠️ বিলুপ্তিৰ সংকট: পৰম্পৰা হেৰাই যোৱাৰ ভয়" : "⚠️ The Looming Risk: The Loss";
    const text2 = lang === 'as' ? 
        "ইউনেস্কোৰ মতে, সমগ্ৰ বিশ্বতে প্ৰতি দুমাহত এটা ভাষাৰ মৃত্যু ঘটে। ভাষাৰ মৃত্যুৰ সৈতে তাৰ মৌখিক ইতিহাস আৰু লোক-কথাও বিলুপ্ত হৈ যায়। অসমৰ বহু সাধুকথা কেৱল আমাৰ বয়োজ্যেষ্ঠসকলৰ স্মৃতিত বা কোনো দুৰ্লভ পুথিতহে সংৰক্ষিত হৈ আছে। আধুনিকীকৰণৰ ফলত আমাৰ ঐতিহ্য হেৰাই যোৱাৰ তীব্ৰ শংকা দেখা দিছে।" : 
        "UNESCO estimates that globally, one language dies every two weeks. When a language is lost, its oral history and folklore fade with it. In Assam, many stories exist only in the memories of elders or in rare, out-of-print books. With rapid modernization and changing lifestyle patterns, these tales are at risk of being lost forever as the old keepers of our oral traditions pass away.";

    const header3 = lang === 'as' ? "🔮 আমাৰ সমাধান: এআই-চালিত ডিজিটেল সংৰক্ষণাগাৰ" : "🔮 Our Solution: The AI-Powered Digital Sanctuary";
    const text3 = lang === 'as' ? 
        "লৰীব্ৰীজে এক সৰ্বাংগীন আৰু সক্ৰিয় ডিজিটেল সংৰক্ষণাগাৰ গঢ়ি তুলি এই সংকট সমাধান কৰাৰ প্ৰয়াস কৰিছে। সাধুবোৰ কেৱল স্থিৰ ফাইলত আৱদ্ধ কৰি ৰখাৰ সলনি আমি তলত দিয়া ধৰণে সজীৱ কৰি তুলিছোঁ:" : 
        "LoreBridge addresses this urgent crisis by building a comprehensive, interactive digital archive. Rather than keeping these stories locked away in static, dry PDF archives, we bring them to life through:";

    const li3_1 = lang === 'as' ? 
        "<strong>অৰাকল এআই চ্যাটবট:</strong> অসমীয়া লোক-সংস্কৃতিৰ ওপৰত প্ৰশিক্ষণ প্ৰাপ্ত এক চ্যাটবট যাৰ সৈতে ব্যৱহাৰকাৰীয়ে সাধুৰ নৈতিক শিক্ষা, পৰম্পৰা বা বিভিন্ন ব্যাখ্যাৰ বিষয়ে কথা পাতিব পাৰে।" : 
        "<strong>The Oracle AI Chatbot:</strong> A context-aware guide trained on Assamese folklore that users can converse with to analyze morals, customs, or request multiple explanation modes.";
    const li3_2 = lang === 'as' ? 
        "<strong>লোৰ ৱেব:</strong> চৰিত্ৰ, বিষয় আৰু ফকৰা-যোজনাৰ এক সংলগ্ন নেটৱৰ্ক যিয়ে সাংস্কৃতিক প্ৰণালীসমূহ প্ৰকাশ কৰে।" : 
        "<strong>Lore Web:</strong> An interactive, graphical web mapping the interconnected network of characters, themes, and proverbs to reveal cultural patterns.";
    const li3_3 = lang === 'as' ? 
        "<strong>উদ্যোগী স্বীকৃতি আৰু অংশীদাৰিত্ব:</strong> অসমৰ ব্যৱহাৰকাৰীসকলক নিজৰ সাধুসমূহ দাখিল কৰাৰ সুবিধা প্ৰদান কৰা হৈছে।" : 
        "<strong>Community Recognition & Sharing:</strong> A system allowing users across Assam to submit their own stories, highlighting local village and district contributions.";

    const header4 = lang === 'as' ? "✨ সৃষ্টিকৰ্তাৰ ব্যক্তিগত লক্ষ্য" : "✨ Creator's Personal Mission";
    const text4 = lang === 'as' ? 
        "গুৱাহাটীত ডাঙৰ-দীঘল হোৱা হেতুকে মই সৰুৰে পৰা আইতাৰ মুখত লক্ষ্মীনাথ বেজবৰুৱাৰ 'বুঢ়ী আইৰ সাধু' শুনিছিলোঁ। আমাৰ প্ৰজন্মই ক্ৰমান্বয়ে এই যাদুকৰী সাধুবোৰৰ পৰা আঁতৰি যোৱা দেখি মই এক দায়িত্ব অনুভৱ কৰিলোঁ। লৰীব্ৰীজৰ জৰিয়তে পৰম্পৰাগত অসমীয়া সংস্কৃতি আৰু আধুনিক কম্পিউটাৰ বিজ্ঞানৰ মাজত এক সেতু গঢ়ি তোলাটোৱেই মোৰ লক্ষ্য।" : 
        "As a student growing up in Guwahati, I spent my childhood listening to my grandmother's retellings of the classic stories from <em>Burhi Aair Sadhu</em>. Seeing that my peers were gradually losing touch with these magical narratives, I felt a deep responsibility to act. My personal mission with LoreBridge is to build a bridge between traditional Assamese heritage and modern computer science, using AI to present the stories of our ancestors in a medium that resonates with the digital generation.";

    const header5 = lang === 'as' ? "⚙️ কাৰিকৰী গাঁথনি" : "⚙️ Technical Architecture";
    const text5 = lang === 'as' ? 
        "লৰীব্ৰীজ এক আধুনিক আৰু শক্তিশালী প্ৰযুক্তি সজ্জাৰে নিৰ্মিত যাৰ দ্বাৰা চেমেণ্টিক কুৱেৰী বিশ্লেষণ কৰা হয়:" : 
        "LoreBridge is built using a modern, scalable technology stack configured for semantic query understanding and retrieval:";

    const tech1 = lang === 'as' ? "FastAPI চাৰ্ভাৰ" : "Backend Server";
    const tech1_desc = lang === 'as' ? 
        "পাইথন FastAPI চাৰ্ভাৰ যিয়ে অনুসন্ধান প্ৰণালী আৰু এপিআইসমূহ চলায়।" : 
        "Python FastAPI powering search pipelines, similarity scoring, and API endpoints.";
    const tech2 = lang === 'as' ? "RAG আৰু ভেক্টৰ অনুসন্ধান" : "RAG & Vector Search";
    const tech2_desc = lang === 'as' ? 
        "Pinecone ভেক্টৰ ডাটাবেচ আৰু চেমেণ্টিক এম্বেডিং ব্যৱহাৰ কৰি RAG প্ৰণালী।" : 
        "Retrieval-Augmented Generation (RAG) using Pinecone vector database and semantic embeddings.";
    const tech3 = lang === 'as' ? "জেনারেটিভ এলএলএম" : "Generative LLM";
    const tech3_desc = lang === 'as' ? 
        "জেমিনি এলএলএম যিয়ে প্ৰসংগ-সংবেদনশীল লোক-সংস্কৃতিৰ বিশ্লেষণ প্ৰদান কৰে।" : 
        "Gemini LLM integrating story payloads to generate context-aware, structured folklore analyses.";

    const creator_role = lang === 'as' ? "প্ৰকল্প সৃষ্টিকৰ্তা আৰু ডেভেলপাৰ" : "Project Creator & Developer";
    const creator_school = lang === 'as' ? "দ্বাদশ শ্ৰেণী • দিল্লী পাব্লিক স্কুল, গুৱাহাটী, অসম" : "Class 12 Student • Delhi Public School, Guwahati, Assam";
    const creator_initiative = lang === 'as' ? "সাংস্কৃতিক প্ৰযুক্তি সংৰক্ষণ পদক্ষেপ" : "Cultural Technology Preservation Initiative";

    container.innerHTML = `
        <h1 class="page-title">${pageTitle}</h1>
        <p class="page-subtitle">${pageSubtitle}</p>
        
        <!-- Decorative Assamese Motif Border -->
        <svg viewBox="0 0 200 20" width="200" height="20" style="margin: 0 auto 3rem auto; display: block; stroke: var(--primary); fill: none; stroke-width: 1.5; stroke-linecap: round; opacity: 0.8;">
            <path d="M 10 10 L 30 10 M 170 10 L 190 10 M 30 10 L 40 0 L 50 10 L 40 20 Z M 50 10 L 60 0 L 70 10 L 60 20 Z M 70 10 L 90 10 M 110 10 L 130 10 M 130 10 L 140 0 L 150 10 L 140 20 Z M 150 10 L 160 0 L 170 10 L 160 20 Z M 90 10 L 100 0 L 110 10 L 100 20 Z" />
        </svg>

        <div style="max-width: 850px; margin: 0 auto; display: flex; flex-direction: column; gap: 2.5rem; text-align: left; padding: 0 1rem;">
            
            <!-- Row 1: Why It Matters & The Problem -->
            <div class="about-grid-2col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 2rem;">
                <div class="card about-section-card" style="border-top: 3px solid var(--primary); padding-top: 1.5rem;">
                    <h3 style="color: var(--primary); font-size: 1.4rem; margin-bottom: 0.75rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 0.5rem;">
                        ${header1}
                    </h3>
                    <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted);">
                        ${text1}
                    </p>
                </div>

                <div class="card about-section-card" style="border-top: 3px solid var(--primary); padding-top: 1.5rem;">
                    <h3 style="color: var(--primary); font-size: 1.4rem; margin-bottom: 0.75rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 0.5rem;">
                        ${header2}
                    </h3>
                    <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted);">
                        ${text2}
                    </p>
                </div>
            </div>

            <!-- Row 2: Our Solution -->
            <div class="card about-section-card" style="border-left: 3px solid var(--primary); padding-left: 2rem; background: rgba(230, 200, 106, 0.02);">
                <h3 style="color: var(--primary); font-size: 1.5rem; margin-bottom: 0.75rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 0.5rem;">
                    ${header3}
                </h3>
                <p style="font-size: 1rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1rem;">
                    ${text3}
                </p>
                <ul style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; padding-left: 1.5rem; margin-bottom: 0;">
                    <li style="margin-bottom: 0.5rem;">${li3_1}</li>
                    <li style="margin-bottom: 0.5rem;">${li3_2}</li>
                    <li>${li3_3}</li>
                </ul>
            </div>

            <!-- Row 3: Personal Mission -->
            <div class="card about-section-card" style="border-left: 3px solid var(--primary); padding-left: 2rem;">
                <h3 style="color: var(--primary); font-size: 1.5rem; margin-bottom: 0.75rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 0.5rem;">
                    ${header4}
                </h3>
                <p style="font-size: 1rem; line-height: 1.7; color: var(--text-muted);">
                    ${text4}
                </p>
            </div>

            <!-- Row 4: Technical Approach -->
            <div class="card about-section-card" style="border-top: 3px solid var(--primary); padding-top: 1.5rem; background: rgba(0, 0, 0, 0.2);">
                <h3 style="color: var(--primary); font-size: 1.4rem; margin-bottom: 0.75rem; font-family: 'Playfair Display', serif; display: flex; align-items: center; gap: 0.5rem;">
                    ${header5}
                </h3>
                <p style="font-size: 0.95rem; line-height: 1.7; color: var(--text-muted); margin-bottom: 1rem;">
                    ${text5}
                </p>
                <div class="about-grid-3col" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.2rem; font-size: 0.85rem; color: var(--text-muted);">
                    <div style="padding: 0.8rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 8px;">
                        <strong style="color: var(--primary); display: block; margin-bottom: 0.3rem;">${tech1}</strong>
                        ${tech1_desc}
                    </div>
                    <div style="padding: 0.8rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 8px;">
                        <strong style="color: var(--primary); display: block; margin-bottom: 0.3rem;">${tech2}</strong>
                        ${tech2_desc}
                    </div>
                    <div style="padding: 0.8rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 8px;">
                        <strong style="color: var(--primary); display: block; margin-bottom: 0.3rem;">${tech3}</strong>
                        ${tech3_desc}
                    </div>
                </div>
            </div>

            <!-- Decorative Assamese Motif Divider -->
            <svg viewBox="0 0 200 20" width="200" height="20" style="margin: 1.5rem auto; display: block; stroke: var(--primary); fill: none; stroke-width: 1.5; stroke-linecap: round; opacity: 0.5;">
                <path d="M 10 10 L 30 10 M 170 10 L 190 10 M 30 10 L 40 0 L 50 10 L 40 20 Z M 50 10 L 60 0 L 70 10 L 60 20 Z M 70 10 L 90 10 M 110 10 L 130 10 M 130 10 L 140 0 L 150 10 L 140 20 Z M 150 10 L 160 0 L 170 10 L 160 20 Z M 90 10 L 100 0 L 110 10 L 100 20 Z" />
            </svg>

            <!-- Creator Card -->
            <div class="institution-card" style="max-width: 500px; margin: 0 auto; background: var(--surface); border: 1px solid var(--primary); border-radius: 16px; padding: 2.5rem 2rem; text-align: center; position: relative; box-shadow: 0 10px 40px rgba(0,0,0,0.5);">
                <div style="font-size: 2.5rem; color: var(--primary); margin-bottom: 0.5rem;">🏯</div>
                <h4 style="margin: 0.5rem 0; color: var(--primary); font-family: 'Playfair Display', serif; font-size: 1.5rem; letter-spacing: 1px;">Devansh Deka</h4>
                <p style="color: var(--text); font-size: 1rem; margin-bottom: 0.75rem; font-weight: 500; text-transform: uppercase; letter-spacing: 1.5px;">${creator_role}</p>
                <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 2rem; line-height: 1.6;">
                    ${creator_school}
                </p>
                <div style="border-top: 1px solid var(--border); padding-top: 1.2rem; font-size: 0.8rem; color: var(--primary); letter-spacing: 2px; text-transform: uppercase;">
                    ${creator_initiative}
                </div>
            </div>
        </div>
    `;
}
