"use client"
import React, { useState } from "react"
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar"
import Link from "next/link"
import { motion } from "framer-motion"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { getGeminiResponse } from "@/actions/get-gemini-response"
import { EmblaCarousel } from "./carousel"

export function ClientApp() {
    const [open, setOpen] = useState(false)
    async function getResponse() {
        const res = await getGeminiResponse({ prompt: prompt })
        setResponse(res.data)
    }

    return (
        <div
            className={cn(
                "md:rounded-2xl flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 h-dvh overflow-hidden lg:h-[80dvh] lg:mt-[10dvh] [--sidebar-color:theme(colors.neutral.200)] dark:[--sidebar-color:theme(colors.neutral.800)]"
            )}>
            <Sidebar open={open} setOpen={setOpen}>
                <SidebarBody className="justify-between gap-10">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {/* {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))} */}
                        </div>
                    </div>
                    <div>
                        {/* Theme toggler */}
                    </div>
                </SidebarBody>
            </Sidebar>
            {/* Main portion */}
            <div className="flex max-md:h-1 grow">
                <div
                    className="dark:border-neutral-800 bg-[--sidebar-color] flex flex-col gap-2 flex-1 w-full h-full">
                    {/* Main content here */}
                    <EmblaCarousel />
                </div>
            </div>
        </div>
    )
}

export const Logo = () => {
    return (
        (<Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
            <div
                className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre">
                Acet Labs
            </motion.span>
        </Link>)
    )
}
export const LogoIcon = () => {
    return (
        (<Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20">
            <div
                className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>)
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