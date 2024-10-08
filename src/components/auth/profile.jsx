import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { createClient } from "@/supabase/server.supa";
import { getInitials } from "@/utils/auth.utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logoutCurrentUser } from "@/server/auth.actions";
import Link from "next/link";

export default async function Profile({uid}) {

  const user = await getUserProfile(uid);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage src={user?.avatarUrl} />
            <AvatarFallback>{user?.fallbackName}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {user?.role === "admin" && <Link href={"/admin"}><DropdownMenuItem>Admin</DropdownMenuItem></Link>}
          <form action={logoutCurrentUser}>
            <button className="w-full">
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </button>
          </form>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}


export async function getUserProfile(userId) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('full_name, avatar_url, email, role')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }


    return {
      uid: userId,
      displayName: data.full_name,
      email: data.email,
      avatarUrl: data.avatar_url,
      fallbackName: getInitials(data.full_name),
      role: data.role
    };
  } catch (err) {
    console.error('Unexpected error fetching user profile:', err);
    return null;
  }
}