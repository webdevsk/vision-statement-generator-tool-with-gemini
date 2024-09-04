import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import "@/app/globals.css"


export const metadata = {
  title: "Purpose Foundry",
  description: "Generate vision statement for your business",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="bg-neutral-400 dark:bg-neutral-950 text-neutral-950 dark:text-neutral-50 selection:bg-neutral-950 selection:text-neutral-100 dark:selection:bg-neutral-100 dark:selection:text-neutral-950">{children}</body>
    </html>
  )
}
