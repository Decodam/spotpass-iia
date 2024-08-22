import { IconBrandGithub, IconHeart } from "@tabler/icons-react"

import Link from "next/link"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-xs leading-loose text-muted-foreground md:text-left">
            Built with <IconHeart className="inline-block h-4 w-4 text-red-500" /> by{" "}
            <Link
              href="https://github.com/Decodam"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium underline underline-offset-4"
            >
              @Decodam
            </Link>
          </p>
          <span className="hidden md:inline text-muted-foreground">•</span>
          <Link
            href="https://github.com/Decodam/spotpass"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs font-medium underline underline-offset-4"
          >
            <IconBrandGithub className="h-4 w-4" />
            Project Repository
          </Link>
        </div>
        <p className="text-center text-xs text-muted-foreground md:text-left">
          &copy; {currentYear} Your Project Name. All rights reserved.
        </p>
      </div>
    </footer>
  )
}