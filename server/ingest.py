import fitz
import os
import re
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer

DATA_DIR = r"c:\Users\Bhaswati Sikdar\Documents\data"
PDFS = [
    "2015.124533.Folk-Tales-Of-Assam-Ed-1st_text.pdf",
    "2015.462370.Folk-Tales_text.pdf",
    "grandma-tales-assam_text.pdf"
]

CHUNK_SIZE = 500
OVERLAP = 50

def clean_text(text):
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def extract_chunks(pdf_path, book_name):
    print(f"Processing {book_name}...")
    doc = fitz.open(pdf_path)
    chunks = []
    
    for page_num in range(len(doc)):
        page = doc.load_page(page_num)
        text = page.get_text()
        text = clean_text(text)
        
        if not text:
            continue
            
        words = text.split()
        for i in range(0, len(words), CHUNK_SIZE - OVERLAP):
            chunk_words = words[i:i + CHUNK_SIZE]
            chunk_text = " ".join(chunk_words)
            chunks.append({
                "book": book_name,
                "page": page_num + 1,
                "text": chunk_text
            })
    return chunks

def main():
    all_chunks = []
    for pdf_file in PDFS:
        path = os.path.join(DATA_DIR, pdf_file)
        if os.path.exists(path):
            all_chunks.extend(extract_chunks(path, pdf_file))
        else:
            print(f"Warning: {path} not found.")
            
    print(f"Extracted {len(all_chunks)} chunks total.")
    
    print("Vectorizing chunks with TF-IDF...")
    corpus = [chunk["text"] for chunk in all_chunks]
    vectorizer = TfidfVectorizer(stop_words='english')
    tfidf_matrix = vectorizer.fit_transform(corpus)
    
    store = {
        "chunks": all_chunks,
        "vectorizer": vectorizer,
        "tfidf_matrix": tfidf_matrix
    }
    
    out_path = os.path.join(DATA_DIR, "server", "vector_store.pkl")
    with open(out_path, 'wb') as f:
        pickle.dump(store, f)
        
    print(f"Vector store saved to {out_path}")

if __name__ == "__main__":
    main()
