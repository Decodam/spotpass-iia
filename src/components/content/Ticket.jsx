import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import QRCode from "react-qr-code"
import { IconMoodCheck, IconSalad } from '@tabler/icons-react'


const eventDetails = {
  name: "IIA - Teachers Day 2024",
  location: "Mohit Mitra Mancha",
  timings: "10am-1pm",
  date: "September 5, 2024",
  duration: "10:00 AM - 1:00 PM"
}

const Ticket = ({ ticketId, name, email, batch, isAdmitted, isVeg, isFoodDelivered }) => {
  const currentPath = 'https://glitch-a-gala.vercel.app/';
  
  

  return(
    <div className="flex flex-col md:flex-row w-full max-w-2xl mx-auto bg-card rounded-xl shadow-lg border overflow-hidden mb-6">
      {/* Left Section */}
      <div className="w-full md:w-8 bg-primary rounded-t-xl md:rounded-t-none md:rounded-l-xl" />
      
      {/* Middle Section */}
      <div className="flex flex-col items-center justify-center bg-muted p-4 md:p-6">
        <div className="bg-white p-2 rounded-lg">
          <QRCode
            value={`${currentPath}verify/${ticketId}`}
            className="rounded-md mb-2"
            style={{ aspectRatio: "1", width: "150px", height: "150px", objectFit: "cover" }}
          />
        </div>
        <div className="text-foreground font-semibold mt-4 text-center">#{ticketId}</div>
      </div>
      
      {/* Right Section */}
      <div className="flex flex-col justify-between p-4 md:p-6 flex-1">
        <div>
          <div className="text-sm font-medium">{eventDetails.name}</div>
          <div className="text-xl md:text-2xl font-semibold">{name}</div>
          <div className="text-muted-foreground text-sm md:text-base">{email} | {batch}</div>

          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{eventDetails.location}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Date</p>
              <p className="text-sm text-muted-foreground">{eventDetails.date}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Time</p>
              <p className="text-sm text-muted-foreground">{eventDetails.duration}</p>
            </div>
            <div>
              <p className="text-sm font-medium">Food Preference</p>
              <p className="text-sm text-muted-foreground">{isVeg ? "Vegetarian" : "Non-Vegetarian"}</p>
            </div>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-wrap gap-2">
          {isAdmitted && (
            <Badge className="flex items-center gap-1 mb-4">
              <IconMoodCheck size={16} />
              Admitted
            </Badge>
          )}
          {isFoodDelivered && (
            <Badge variant="outline" className="flex items-center gap-1 mb-4">
              <IconSalad size={16} /> Food Received
            </Badge>
          )}
        </div>

        {/* Disclaimer and Contact Information */}
        <p className="text-xs text-muted-foreground">
          <strong>Disclaimer:</strong> This ticket is non-transferable and non-refundable. For further assistance, please contact the event organizers.
        </p>
      </div>
    </div>
  )
};

export default Ticket