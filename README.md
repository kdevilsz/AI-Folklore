# LoreBridge

LoreBridge is an interactive platform dedicated to preserving and exploring the rich folklore and traditional wisdom of Assam. It features a bilingual dataset (Assamese & English) of folktales and proverbs, and an AI-powered "Oracle" that uses RAG (Retrieval-Augmented Generation) to answer questions about the lore.

## Core Features
- **Bilingual Oracle Chat (RAG)**: Ask questions about Assamese lore and get synthesized, context-aware answers in both English and Assamese script.
- **Voice Input Integration**: Speak directly to the Oracle using the Web Speech API (Chrome/Edge supported).
- **Theme Explorer**: Beautiful, dynamic tag cloud representing major cultural motifs (Magic, Justice, Family) for rapid filtering.
- **Dark/Light Mode**: Toggle between the mystical dark theme and a warm, readable parchment light theme.
- **Local Storage Analytics**: View counters for stories and locally saved favorite lists.
- **Native Sharing**: Instantly share lore summaries directly to your mobile sharing sheet or clipboard.

## Tech Stack
- **Frontend**: Vanilla JavaScript (ES6+), HTML5, CSS3 (No framework required)
- **Backend**: Python 3.10+, FastAPI, Uvicorn, SlowAPI (Rate Limiting)
- **AI & DB**: Google Gemini 2.5 Flash (LLM & Embeddings), Pinecone (Vector Database)

## Setup Instructions

### 1. Prerequisites
- Python 3.10 or higher
- A free [Google Gemini API Key](https://aistudio.google.com/)
- A free [Pinecone API Key](https://www.pinecone.io/)

### 2. Clone and Configure
Clone this repository and create a `.env` file in the root directory:
```env
GEMINI_API_KEY=your_gemini_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
```

### 3. Backend Setup
Navigate to the `server/` directory and install the requirements:
```bash
cd server
pip install -r requirements.txt
```

### 4. Running Locally

**Start the Backend:**
```bash
cd server
python server.py
```
The FastAPI backend will start on `http://127.0.0.1:8000`.

**Start the Frontend:**
Since the frontend uses ES6 modules, it must be served over HTTP (not file://). You can use Python's built-in HTTP server from the root directory:
```bash
python -m http.server 3000
```
Open your browser and navigate to `http://localhost:3000`.

## Deployment Recommendations

The architecture is cleanly separated into static frontend files and a FastAPI backend. This makes it perfect for modern free-tier hosting:

### Frontend (Static Site)
We recommend **Vercel**, **Netlify**, or **GitHub Pages**.
- Simply connect your GitHub repository to Vercel/Netlify.
- Set the root directory to the project root (where `index.html` lives).
- No build command is required, though you can run `python build.py` to generate a bundled `dist/` folder if you prefer.

### Backend (API Engine)
We recommend **Render.com** or **Railway.app** for free-tier Python hosting.
- Connect your repository to Render as a "Web Service".
- Set the Root Directory to `server`.
- Build Command: `pip install -r requirements.txt`
- Start Command: `uvicorn server:app --host 0.0.0.0 --port $PORT`
- **Important:** Add your `GEMINI_API_KEY` and `PINECONE_API_KEY` to the Environment Variables settings in the Render/Railway dashboard.

## Future Roadmap
- **Audio Synthesis**: Auto-generate text-to-speech for Assamese pronunciation of proverbs.
- **Illustration Engine**: Hook the new `image_prompt` metadata into Midjourney or DALL-E to auto-illustrate stories.
- **Community Contributions**: Implement an admin portal for users to submit regional folklore directly.
