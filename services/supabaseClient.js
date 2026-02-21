import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'
import AsyncStorage from '@react-native-async-storage/async-storage'

//  URL y la clave pública (ANON KEY) de tu proyecto
const supabaseUrl = 'https://fksertsqjzjukwlxhtdx.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZrc2VydHNxanpqdWt3bHhodGR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzMTI1MzAsImV4cCI6MjA4Njg4ODUzMH0.ZGVl5DQKmycz5howxlNtuIbWlnNJ1Vyxq_pZKW4xf-M'

// Creamos y exportamos el cliente
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // Le decimos a Supabase que use el almacenamiento nativo del móvil
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Esto es para web, en móvil lo apagamos
  },
})