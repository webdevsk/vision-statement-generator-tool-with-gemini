"use client"

import { getGeminiResponse } from "@/actions/get-gemini-response"
import { useState } from "react"

export function ClientApp() {
    const [response, setResponse] = useState("")
    const [prompt, setPrompt] = useState("")
    console.log(prompt)
    async function getResponse() {
        const res = await getGeminiResponse({ prompt: prompt })
        setResponse(res.data)
    }

    return <>
        <input type="text" value={prompt} onChange={(e) => setPrompt(e.currentTarget.value)} />
        <button disabled={!prompt} onClick={getResponse}>Submit</button>
        <p>{response}</p>
    </>
}