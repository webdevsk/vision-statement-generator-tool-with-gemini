"use client"

import { getGeminiResponse } from "@/actions/get-gemini-response"
import { useState } from "react"

export function ClientApp() {
    async function getResponse() {
        const res = await getGeminiResponse({ prompt: prompt })
        setResponse(res.data)
    }

    return <>

    </>
}