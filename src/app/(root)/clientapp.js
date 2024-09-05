"use client"

import { cn } from "@/lib/utils"
import { getGeminiResponse } from "@/actions/get-gemini-response"
import { EmblaCarousel } from "./carousel"
import { SidebarContainer } from "./sidebar-container"
import { MainContainer } from "./main-container"

export function ClientApp() {
    async function getResponse() {
        const res = await getGeminiResponse({ prompt: prompt })
        setResponse(res.data)
    }

    return (
        <div
            className={cn(
                "lg:rounded-2xl flex flex-col lg:flex-row bg-gray-100 dark:bg-neutral-800 w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700 h-dvh overflow-hidden lg:h-[min(80dvh,_56rem)] lg:mt-[10dvh] [--sidebar-color:theme(colors.neutral.200)] dark:[--sidebar-color:theme(colors.neutral.800)]"
            )}>
            <SidebarContainer />
            <MainContainer>
                <EmblaCarousel />
            </MainContainer>
        </div>
    )
}
