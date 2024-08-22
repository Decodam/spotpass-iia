import Todo from "@/components/content/Todo";
import { Button } from "@/components/ui/button";
import { IconChevronRight } from "@tabler/icons-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full bg-background"><div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(117,248,124,0.5)] dark:bg-[rgba(117,248,124,0.2)] opacity-50 blur-[80px]"></div></div>
      
      
      <div className="container pt-16 pb-24 lg:pb-32">
        <div className="flex justify-center">
          <Link
            className="inline-flex items-center gap-x-2 transition border hover:bg-muted/40 text-sm p-1 ps-3 rounded-full"
            target="_blank"
            href="/buy-ticket"
          >
            Buy Tickets - Book your spot now
            <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/15 font-semibold text-sm">
              <IconChevronRight className="flex-shrink-0 w-4 h-4" />
            </span>
          </Link>
        </div>
        

        <div className="mt-5 max-w-2xl text-center mx-auto">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Supabase - Next Js Auth Starter Template
          </h1>
        </div>
        <div className="mt-5 max-w-3xl text-center mx-auto">
          <p className="text-xl text-muted-foreground">
            Get started with your next project within seconds with prebuilt authentication templates with supabase and shadcn-ui already setup!
          </p>
        </div>
        

        <div className="mt-8 gap-3 flex justify-center">
          <Button size={"lg"} asChild>
            <Link href="/buy-ticket">
              Buy Tickets
            </Link>
          </Button>
          <Button size={"lg"} variant={"outline"} asChild>
            <Link href="#tickets">
              Your Tickets
            </Link>
          </Button>
        </div>
      </div>



    </>
  );
}
