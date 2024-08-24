'use client'

import { useEffect, useState } from 'react';
import { createClient } from "@/supabase/client.supa";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';



export default function Admin() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast()

  const router = useRouter()

  const supabase = createClient();

  async function fetchUnverifiedTickets() {
    const { data: tickets, error } = await supabase
      .from('tickets')
      .select('*')
      .eq('verified', false); // Fetch only unverified tickets

    if (error) {
      console.error('Error fetching tickets:', error);
      return [];
    }

    return tickets.map(ticket => ({
      ...ticket,
      screenshot: encodeURI(ticket.screenshot) // Encode the URL
    }));
  }

  async function updateAllTicketsToVerified() {
    const { error } = await supabase
      .from('tickets')
      .update({ verified: true })
      .eq('verified', false); // Update all unverified tickets

    if (error) {
      console.error('Error updating tickets:', error);
    } else {
      toast({
        title: "Successfully verified",
        description: "All tickets are now verified",
      })

      router.push("/");
    }
  }


  useEffect(() => {
    async function loadTickets() {
      const fetchedTickets = await fetchUnverifiedTickets();
      setTickets(fetchedTickets);
    }
    loadTickets();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredTickets = tickets.filter(ticket => 
    ticket.id.toLowerCase().includes(searchTerm) ||
    (ticket.holders_name || "N/A").toLowerCase().includes(searchTerm) ||
    (ticket.batch || "N/A").toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container">
      <div className="mt-5 border-b border-border pb-5">
        <h1 className="text-xl font-bold">Unverified Tickets</h1>
        <div className='flex max-md:flex-col items-center gap-2 mt-4'>
        <Input
          type="text"
          placeholder="Search by ID, Holder Name, or Batch"
          value={searchTerm}
          onChange={handleSearch}
        />
        <Button
          onClick={updateAllTicketsToVerified}
        >
          Mark All as Verified
        </Button>
        </div>
      </div>

      <Table>
        <TableCaption>{filteredTickets.length === 0 ? "No unverfied ticket found..." : "Unverified tickets"}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ticket ID</TableHead>
            <TableHead>Holder Name</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Screenshot</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTickets.map(ticket => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.id}</TableCell>
              <TableCell>{ticket.holders_name || "N/A"}</TableCell>
              <TableCell>{ticket.batch || "N/A"}</TableCell>
              <TableCell>{ticket.price || "N/A"}</TableCell>
              <TableCell>
                <Link href={ticket.screenshot} target="_blank" rel="noopener noreferrer">
                  View Screenshot
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
