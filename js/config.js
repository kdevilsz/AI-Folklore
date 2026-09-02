// LoreBridge Client Configuration
// Configure your live backend and Supabase credentials here.

window.LOREBRIDGE_CONFIG = {
  // Live Supabase Project URL
  SUPABASE_URL: "https://wqggvsegvwraawovqpap.supabase.co",

  // Live Supabase Anon Key
  SUPABASE_ANON_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZ2d2c2VndndyYWF3b3ZxcGFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyNzM5NzQsImV4cCI6MjEwMTg0OTk3NH0.V5hXNqGnhCPnpRB4Utm0psCILeO9GDlV8L2a_TPdVs4",

  // Render Backend URL (e.g., https://lorebridge-api-zhkv.onrender.com or http://127.0.0.1:8000)
  API_BASE: "https://lorebridge-api-zhkv.onrender.com"
};

// Global API URL resolver helper
window.getApiUrl = function (path) {
  const config = window.LOREBRIDGE_CONFIG || {};
  const base = (config.API_BASE || 'https://lorebridge-api-zhkv.onrender.com').replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : '/' + path;
  return base ? `${base}${cleanPath}` : cleanPath;
};
