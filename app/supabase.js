import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://wpdjmpxgycmgysvvtago.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_egS5XRkzXC_9cjaU5w2lKA_0b4z409N";

export const supabase = createClient(url, key);
