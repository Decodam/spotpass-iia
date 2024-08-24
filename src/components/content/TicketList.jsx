import { createClient } from "@/supabase/server.supa";
import Ticket from "./Ticket";

export default async function TicketList() {
  const supabase = createClient();

  // Fetch the current user
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) {
    return;
  }

  const userId = userData.user.id;

  // Fetch tickets where the profile_id matches the user's ID
  const { data: tickets, error: ticketsError } = await supabase
    .from('tickets')
    .select('*')
    .eq('profile_id', userId);

  if (ticketsError || tickets.length === 0) {
    // Return null if no tickets are found or an error occurs
    return null;
  }

  return (
    <div id="tickets" className="container max-w-screen-lg my-20 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-8">Your Tickets</h1>

      {tickets.map((ticket) => (
        <Ticket
          key={ticket.id}
          name={ticket.holders_name}
          email={ticket.holders_email}
          batch={ticket.batch}
          ticketId={ticket.id}
          isAdmitted={ticket.admitted}
          isVeg={ticket.food_preferences}
          isFoodDelivered={ticket.food_received}
          verified={ticket.verified}
        />
      ))}
    </div>
  );
}
