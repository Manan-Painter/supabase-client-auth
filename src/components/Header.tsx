import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { getUser } from "@/supabase/auth/server";

async function Header() {
  const user = await getUser();

  return (
    <div className="bg-slate-300 w-full h-20 flex items-center gap-4 px-4 justify-between">
      <p>{user?.name || "Not logged in"}</p>

      {user ? (
        <SignOutButton />
      ) : (
        <Link
          href="/login"
          className="bg-slate-400 w-36 py-2 rounded-lg text-center"
        >
          Login
        </Link>
      )}
      <Link href="/signup" className="bg-slate-400 w-36 py-2 rounded-lg text-center">Sign Up</Link>
    </div>
  );
}

export default Header;
