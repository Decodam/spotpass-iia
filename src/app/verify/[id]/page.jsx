import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { IconMoodCheck, IconPizza, IconCheck } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { createClient } from "@/supabase/server.supa";
import { Button } from "@/components/ui/button";
import { handleFoodRecived } from "@/server/app.action";

export default async function Component({ params }) {
  const ticketID = params.id;

  const supabase = createClient();

  // Fetch ticket data from Supabase
  const { data: ticket, error: ticketError } = await supabase
    .from('tickets')
    .select('*')
    .eq('id', ticketID)
    .single();

  if (ticketError || !ticket || !ticket.verified) {
    return redirect("/");
  }

  if (!ticket.admitted) {
    const { error: updateError } = await supabase
      .from('tickets')
      .update({ admitted: true })
      .eq('id', ticketID);

    if (updateError) {
      return <div>Error updating ticket status</div>;
    }
  }

  const foodReceived = ticket.food_received;
  const ticketHolderName = ticket.holders_name || "N/A";
  const foodItem = ticket.food_preferences || "N/A";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-secondary p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Ticket & Food Verification</CardTitle>
        </CardHeader>
        <div className="w-full h-px bg-border" />
        <CardContent className="flex flex-col items-center mt-6 space-y-6">
          <div className="w-full space-y-4">
            <div className="flex flex-col items-center">
              <div className="text-primary animate-bounce">
                <IconMoodCheck size={48} />
              </div>
              <h2 className="text-xl font-semibold mt-2 text-secondary-foreground">Ticket Holder:</h2>
              <p className="text-2xl font-bold text-primary">{ticketHolderName}</p>
              <Badge variant="secondary" className="mt-2 text-lg animate-pulse">
                Ticket Verified
              </Badge>
            </div>
          </div>
          
          <div className="w-full h-px bg-border" />
          
          <div className="w-full space-y-4">
            {foodReceived ? (
              <div className="flex flex-col items-center">
                <div className="text-orange-500 animate-shake">
                  <IconPizza size={48} />
                </div>
                <h2 className="text-xl font-semibold mt-2">Food Delivered:</h2>
                <p className="text-2xl font-bold text-orange-500">{foodItem}</p>
                <Badge variant="outline" className="mt-2 text-lg">
                  Food Verified
                </Badge>
              </div>
            ) : (
              <form action={handleFoodRecived} className="flex flex-col items-center">
                <input type="text" name="id" value={ticketID} hidden />
                <Button
                  className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
                >
                  Mark Food as Received
                </Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
