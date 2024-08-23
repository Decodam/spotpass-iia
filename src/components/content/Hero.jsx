
import { IconChevronRight } from "@tabler/icons-react"
import Image from "next/image"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="w-full py-12 pb-12 md:pt-20 md:pb-24 lg:pb-32">
      <div className="container max-w-screen-lg grid gap-8 px-4 md:grid-cols-2 md:items-center md:gap-12 lg:gap-20">
        <div className="space-y-4 my-8 mx-6">
          <div>
            <Link
              className="inline-flex items-center gap-x-2 transition border hover:bg-muted/40 text-sm p-1 ps-3 rounded-full"
              target="_blank"
              href="/buy-ticket"
            >
              Join IIA Family for Teacher&apos;s Day 2024
              <span className="py-1.5 px-2.5 inline-flex justify-center items-center gap-x-2 rounded-full bg-muted-foreground/15 font-semibold text-sm">
                <IconChevronRight className="flex-shrink-0 w-4 h-4" />
              </span>
            </Link>
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            What&apos;s your plan for 5th Sep?
          </h1>
          <p className="max-w-[600px] text-muted-foreground md:text-xl lg:text-lg">
            Join us in celebrating Teachers&apos; Day on 5th September 2024 from 10 AM to 1 PM. It&apos;s going to be a day filled
            with fun, laughter, and appreciation for our beloved teachers.
          </p>
          <Link
            href="/buy-ticket"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Book Your Tickets
          </Link>
        </div>
        <Image
          src="/poster.png"
          width="350"
          height="0"
          alt="Glitch a Gala"
          className="mx-auto w-full max-w-[350px] h-auto overflow-hidden rounded-xl object-cover"
        />
      </div>
    </section>
  )
}