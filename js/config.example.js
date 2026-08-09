// LoreBridge Client Configuration Template
// Copy this file to js/config.js and add your live deployed credentials.

window.LOREBRIDGE_CONFIG = {
  // Your Supabase Project URL (e.g. https://yourprojectid.supabase.co)
  SUPABASE_URL: "https://your-project.supabase.co",
  
  // Your Supabase Public Anon Key
  SUPABASE_ANON_KEY: "your-anon-key-here",
  
  // Your deployed Render Backend URL (or http://127.0.0.1:8000 for local development)
  API_BASE: "https://lorebridge-api.onrender.com"
};

// Global API URL resolver helper
window.getApiUrl = function(path) {
  const config = window.LOREBRIDGE_CONFIG || {};
  const base = (config.API_BASE || '').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return base ? `${base}${cleanPath}` : cleanPath;
};
