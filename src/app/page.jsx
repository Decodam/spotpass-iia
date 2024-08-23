
import HeroSection from "@/components/content/Hero";
import TicketList from "@/components/content/TicketList";


export default function Home() {
  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full bg-background"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(117,248,124,0.5)] dark:bg-[rgba(117,248,124,0.2)] opacity-50 blur-[80px]"></div></div>
      
      
      <HeroSection />


      <TicketList />

    </>
  );
}
