const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && publishableKey);

export async function fetchItems({limit=1000,offset=0}={}) {
  if (!supabaseConfigured) return [];
  const response = await fetch(
    `${url}/rest/v1/items?select=*&order=id&limit=${limit}&offset=${offset}`,
    {headers:{apikey:publishableKey,Authorization:`Bearer ${publishableKey}`}}
  );
  if (!response.ok) throw new Error(`Supabase items: HTTP ${response.status}`);
  return response.json();
}
