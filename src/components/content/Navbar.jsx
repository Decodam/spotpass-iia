import { ThemeToggleIconButton } from "@/components/ui/theme";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Profile from "../auth/profile";
import { createClient } from "@/supabase/server.supa";


export default async function Navbar({}) {
  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser();

  if (error){
    console.log("error: ", error.message)
  }

  return (
    <nav className="container h-14 flex justify-between items-center">
      <Link href={"/"}>
        <div className="flex items-end gap-2">
          <Image height={28} width={28} src="/icon.svg" alt="supabase" /> <span className="text-lg font-bold">Spotpass - IIA</span>
        </div>
      </Link>

      <div className="nav-list flex items-center gap-2">
        {data.user ? (
          <Profile uid={data?.user?.id} />
        ) : (
          <>
            <Button variant={"outline"} asChild>
              <Link href="/login">
                Login
              </Link>
            </Button>
            <Button asChild>
              <Link href="/signup">
                Sign up
              </Link>
            </Button>
          </>
        )}

        <ThemeToggleIconButton />
      </div>
    </nav>
  );
}
