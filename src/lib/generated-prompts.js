export function generatedPrompt(promptData = [], config = {}) {
    return `
    Create a vision statement for a business based on the following user-provided information:

    **Business Questions:**
    ${promptData.map(([q, a]) => a && ["Q: " + q, "A: " + a].join("\n")).filter(a => !!a).join("\n")}

    **Formatting Requirements:**
    ${Object.entries(config)
            .map(([k, v]) => ["* " + k, v].join(": "))
            .join("\n")}
    `
}