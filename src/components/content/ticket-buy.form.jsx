'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

// Define batches with their respective prices
const batches = [
  { name: "1st Year", price: "$10" },
  { name: "2nd Year", price: "$15" },
  { name: "3rd Year", price: "$20" },
  { name: "Pass Out", price: "$25" },
];

export default function TicketBuyForm({fullName, emailAddress, uid}) {
  const [name, setName] = useState(fullName ? fullName : "")
  const [email, setEmail] = useState(emailAddress ? emailAddress : "")
  const [paymentProof, setPaymentProof] = useState(null)
  const [batch, setBatch] = useState(batches[0].name)
  const [foodPreference, setFoodPreference] = useState("non-veg")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('');
  

  const getQRurl = (selectedBatch) => {
    const batchCodes = {
      "1st Year": "upi-1",
      "2nd Year": "upi-2",
      "3rd Year": "upi-3",
      "Pass Out": "upi-passout",
    };
    return `/${batchCodes[selectedBatch]}.png`; // Ensure this path matches your image storage location
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call or processing time
    setTimeout(() => {
      setLoading(false)
      alert("Ticket booked successfully!")
      console.log({ name, email, batch, foodPreference, paymentProof })
    }, 2000)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setPaymentProof(URL.createObjectURL(file))
    }
  }

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
                    <Select value={batch} onValueChange={setBatch}>
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
                  {loading ? "Processing..." : `Book Ticket (${selectedBatch.price})`}
                </Button>
                <p className="text-xs text-muted-foreground"><strong>Disclaimer:</strong> Tickets are non-refundable and non-transferable. Please ensure all details are correct before purchasing. By buying a ticket, you agree to comply with the event&apos;s terms and conditions. For any issues or inquiries, contact the event organizers.</p>
              </form>
            </div>
            <Separator orientation="vertical" className="mx-6 h-full" />
            <div className="flex flex-col flex-[1] items-center justify-center">
              <Label className="mb-2">Scan QR Code to buy ticket</Label>
              <Image 
                src={getQRurl(batch)} 
                alt={`batch-${batch}`} 
                height={0} 
                width={300} 
                className="h-auto" 
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
