import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "@/app/globals.css"


export const metadata = {
  title: "Purpose Foundry",
  description: "Generate vision statement for your business",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} dark ${GeistMono.variable}`}>
      <body className="bg-neutral-400 dark:bg-neutral-950">{children}</body>
    </html>
  )
}
