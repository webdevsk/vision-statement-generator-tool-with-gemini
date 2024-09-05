"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function getGeminiResponse(prompt) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Your job is to generate vision statement for businesses. If no information is given, you can generate a random one.",
        generationConfig: { maxOutputTokens: 200, temperature: 2.0, },
    })

    try {
        const result = await model.generateContent(prompt)
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