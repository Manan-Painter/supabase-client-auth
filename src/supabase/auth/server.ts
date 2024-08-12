import { createSupabaseClient } from "../server";
import { User } from "@/lib/types";

// Function to get the authentication client
export async function getAuth() {
  const supabase = await createSupabaseClient();
  return supabase.auth; // Now you can safely access the auth client
}

// Function to get the current authenticated user
export const getUser = async () => {
  const auth = await getAuth();
  const { data: { user: authUser } } = await auth.getUser();

  if (!authUser) return null;

  // Simulate fetching a user from the database
  const dbUser = {
    email: "mananpainter056@gmail.com",
    name: "Manan Painter",
    avatarUrl: "https://www.github.com/coleblender.png",
  };
  if (!dbUser) return null;

  const user: User = {
    ...authUser,
    ...dbUser,
  };

  return user;
};
