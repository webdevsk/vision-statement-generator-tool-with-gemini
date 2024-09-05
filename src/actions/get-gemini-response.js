"use server"

import { GoogleGenerativeAI } from "@google/generative-ai"

export async function getGeminiResponse(prompt) {
    console.log("Prompt given: " + prompt)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Your job is to generate vision statement for businesses. If no information is given, you can generate a random one. You must provide your response in plain HTML contained in a 'div' tag and starting with the business name in 'H3' tag following by 'Vision Statement' in a 'H4' tag. Don't give any explanation. Use proper semantic tags. For H1-H6, small and p tags, add the className 'variant-{tag}'. For example: variant-h6, variant-small. For text decoration cases like bold, italic and underline, just add classNames with the same term. For example: italic, bold. For ul and ol, add these classNames respectively: list-disc, list-decimal. You should generate content as much as possible without hitting any given limit. Semantic tags and classNames are excluded from character limits and they must be closed properly to be parsed.",
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