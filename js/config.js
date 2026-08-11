// LoreBridge Client Configuration
// Configure your live backend and Supabase credentials here.

window.LOREBRIDGE_CONFIG = {
  // Live Supabase Project URL
  SUPABASE_URL: "paste your supabase URL here",
  
  // Live Supabase Anon Key
  SUPABASE_ANON_KEY: "paste your supabase anon key here",
  
  // Render Backend URL (e.g., https://lorebridge-api-zhkv.onrender.com or http://127.0.0.1:8000)
  API_BASE: "https://lorebridge-api-zhkv.onrender.com"
};

// Global API URL resolver helper
window.getApiUrl = function(path) {
  const config = window.LOREBRIDGE_CONFIG || {};
  const base = (config.API_BASE || 'https://lorebridge-api-zhkv.onrender.com').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return base ? `${base}${cleanPath}` : cleanPath;
};
