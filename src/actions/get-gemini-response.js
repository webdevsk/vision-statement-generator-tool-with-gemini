"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function getGeminiResponse(promptData) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: { maxOutputTokens: 200 },
    })

    try {
        const result = await model.generateContent(promptData.prompt)
        const response = await result.response
        const text = response.text()
        return {
            code: 200,
            data: text,
        }
    } catch (error) {
        console.error("Gemini error: " + error)
        return {
            code: 400,
            message: "Unable to process the prompt. Please try again.",
        }
    }
}