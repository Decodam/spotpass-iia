import "@/styles/globals.css"
import { Inter as FontSans } from "next/font/google"
import { cn } from "@/utils/cn.utils"; 
import { ThemeProvider } from "@/context/themeProvider"; 
import Navbar from "@/components/content/Navbar";
import Footer from "@/components/content/Footer";
import { Toaster } from "@/components/ui/toaster"


export const metadata = {
  title: "Glitch a Gala",
  description: "Join us on 5th September for Teacher's day celebration with IIA family",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background text-foreground font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        > 
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
