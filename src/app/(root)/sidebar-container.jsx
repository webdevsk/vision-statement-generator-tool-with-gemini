"use client"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import { motion } from "framer-motion"
import { useState } from "react"

export function SidebarContainer() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Sidebar
        open={open}
        setOpen={setOpen}
      >
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Logo open={open} />
            <div className="mt-8 flex flex-col gap-2">
              {/* {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))} */}
            </div>
          </div>
          <div>{/* Theme toggler */}</div>
        </SidebarBody>
      </Sidebar>
    </>
  )
}

export const Logo = open => {
  return (
    <div className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      {open && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="variant-h6 font-bold whitespace-pre"
        >
          Purpose Foundry
        </motion.span>
      )}
    </div>
  )
}

// const links = [
//     {
//         label: "Dashboard",
//         href: "#",
//         icon: (
//             <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
//         ),
//     },
// ]
