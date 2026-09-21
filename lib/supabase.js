import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// `null` en vez de lanzar un error: así el resto de la app cae a datos
// mock cuando Supabase no está configurado, en vez de romper el árbol
// completo con un throw en tiempo de import.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
