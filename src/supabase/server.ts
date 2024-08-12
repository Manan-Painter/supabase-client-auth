
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";


export async function createSupabaseClient() {
  const cookieStore = cookies();
  const cookieValue = cookieStore.get('your-cookie-name')?.value;

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          // Only reading cookies
          return cookieStore.getAll();
        },
      },
    }
  );
}
