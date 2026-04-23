const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Warning: Supabase URL or Key is missing in your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;