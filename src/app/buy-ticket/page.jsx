import { getUserProfile } from "@/components/auth/profile";
import TicketBuyForm from "@/components/content/ticket-buy.form";
import { createClient } from "@/supabase/server.supa";
import { redirect } from 'next/navigation'

export default async function BuyticketPage() {

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  
  const user = await getUserProfile(data?.user?.id);



  return(
    <div>
      <TicketBuyForm fullName={user?.displayName} uid={user?.uid} emailAddress={user?.email} />
    </div>
  );
}