'use client'

import imageCompression from 'browser-image-compression';
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { createClient } from "@/supabase/client.supa"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from 'next/navigation';


// Define batches with their respective prices
const batches = [
  { name: "1st year", price: "₹ 100", cost: 100 },
  { name: "2nd year", price: "₹ 100", cost: 100 },
  { name: "3rd year", price: "₹ 200", cost: 200 },
  { name: "Passout", price: "₹ 150", cost: 150 },
];


export default function TicketBuyForm({fullName, emailAddress, uid}) {
  const [name, setName] = useState(fullName ? fullName : "")
  const [email, setEmail] = useState(emailAddress ? emailAddress : "")
  const [paymentProof, setPaymentProof] = useState(null)
  const [batch, setBatch] = useState()
  const [foodPreference, setFoodPreference] = useState("non-veg")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  const { toast } = useToast()

  const router = useRouter()


  const getQRurl = (selectedBatch) => {
    const batchCodes = {
      "1st year": "100",
      "2nd year": "100",
      "3rd year": "200",
      "Passout": "150",
    };
    return `/${batchCodes[selectedBatch]}.jpeg`; // Ensure this path matches your image storage location
  };

  function generateTicketId() {
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let fileUrl = null;
  
    const supabase = createClient();
  
    try {
      // Handle file upload if there's a payment proof
      if (paymentProof) {
        try {
          // Upload the file
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('payment-screenshot') // Ensure this bucket exists
            .upload(`${Date.now()}_${paymentProof.name}`, paymentProof);
  
          if (uploadError) {
            throw new Error(uploadError.message);
          }
  
  
          fileUrl = `https://pkwpcvmgdabgbwwfawsg.supabase.co/storage/v1/object/public/payment-screenshot/${uploadData.path}`;
  
        } catch (error) {
          // Handle file upload or URL retrieval errors
          throw new Error(`File upload or URL retrieval failed: ${error.message}`);
        }
      }
  
      if (!fileUrl && paymentProof) {
        throw new Error("Failed to obtain file URL");
      }
  
      // Generate ticket ID
      const ticketId = generateTicketId();
  
      // Insert data into tickets table
      const { error: insertError } = await supabase
        .from('tickets')
        .insert([
          {
            id: ticketId,
            profile_id: uid,
            batch: batch,
            screenshot: fileUrl, // Ensure fileUrl is included
            holders_name: name,
            holders_email: email,
            price: batches.find(b => b.name === batch).cost,
            verified: false,
            admitted: false,
            food_preferences: foodPreference,
            food_received: false,
          }
        ]);
  
      if (insertError) {
        throw new Error(insertError.message);
      }
  
      toast({
        title: "Ticket Booked!",
        description: "Successfully Booked your ticket! See you on 14th 😉",
      });
  
      // Redirect after successful booking
      router.push("/");
  
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    
    if (file) {
      try {
        // Options for image compression
        const options = {
          maxSizeMB: 1,           // Max size in MB
          maxWidthOrHeight: 800,  // Max width or height
          useWebWorker: true,     // Use web workers for faster compression
        };
  
        // Compress the image file
        const compressedFile = await imageCompression(file, options);
  
        setPaymentProof(compressedFile); // Store the compressed file object for upload
      } catch (error) {
        console.error("Image compression error:", error);
      }
    }
  };

  const selectedBatch = batches.find(b => b.name === batch)

  return (
    <div className="p-4">
      <Card className="w-full max-w-4xl my-5 mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Book Your Ticket</CardTitle>
        </CardHeader>
        <Separator className="mb-6" />
        <CardContent>
          <div className="md:flex space-y-6">
            <div className="flex-[2] pr-6">
              <form onSubmit={handleSubmit} className="space-y-4">

                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                </div>
                
                <div className="flex space-x-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="batch">Batch</Label>
                    <Select required value={batch} onValueChange={setBatch}>
                      <SelectTrigger id="batch">
                        <SelectValue placeholder="Select your batch" />
                      </SelectTrigger>
                      <SelectContent>
                        {batches.map(({ name, price }) => (
                          <SelectItem key={name} value={name}>
                            {name} ({price})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="foodPreference">Food Preference</Label>
                    <Select value={foodPreference} onValueChange={setFoodPreference}>
                      <SelectTrigger id="foodPreference">
                        <SelectValue placeholder="Select food preference" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                        <SelectItem value="veg">Vegetarian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {(name && email) && (
                  <div className="space-y-2">
                    <Label htmlFor="paymentProof">Upload Payment Proof</Label>
                    <Input
                      id="paymentProof"
                      type="file"
                      accept="image/*"
                      className="justify-center items-center"
                      onChange={handleImageChange}
                      required
                    />
                  </div>
                )}

                {error && <p className="text-xs text-destructive">{error}</p>}

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : selectedBatch ? `Buy Ticket (${selectedBatch.price})` : "Buy Ticket"}
                </Button>
                <p className="text-xs text-muted-foreground"><strong>Disclaimer:</strong> Tickets are non-refundable and non-transferable. Please ensure all details are correct before purchasing. By buying a ticket, you agree to comply with the event&apos;s terms and conditions. For any issues or inquiries, contact the event organizers.</p>
              </form>
            </div>
            <Separator orientation="vertical" className="mx-6 h-full" />
            <div className="flex flex-col flex-[1] items-center justify-center">
              {batch ? (
                <>
                  <Label className="mb-2">Scan QR Code to buy ticket</Label>
                  <Image 
                    src={getQRurl(batch)} 
                    alt={`batch-${batch}`} 
                    height={0} 
                    width={300} 
                    className="h-auto" 
                  />
                </>
              ) : (
                <>
                  <Label className="mb-4">Select Batch to generate QR Code</Label>
                  <div className='size-72 bg-muted rounded-lg' />
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
