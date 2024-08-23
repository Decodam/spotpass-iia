"use server"
import { createClient } from '@/supabase/server.supa';
import { revalidatePath } from 'next/cache'

export async function handleFoodRecived(formData) {
  
  const supabase = createClient();

  const ticketID = formData.get("id")

  const { error: updateFoodError } = await supabase
    .from('tickets')
    .update({ food_received: true })
    .eq('id', ticketID);

  if (updateFoodError) {
    // Handle update error
    console.error("Error updating food received status:", updateFoodError.message);
    return;
  }

  revalidatePath('/verify/[id]', 'page');
};