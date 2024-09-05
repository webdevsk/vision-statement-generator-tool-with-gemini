export function generatedPrompt(promptData = [], config = {}) {
    return `
    Create a vision statement for a business based on the following user-provided information. If there are no information or requirements given, generate a random one by yourself.

    **Business Questions:**
    ${promptData.map(([q, a]) => a && ["Q: " + q, "A: " + a].join("\n")).filter(a => !!a).join("\n")}

    **Formatting Requirements:**
    ${Object.entries(config)
            .map(([k, v]) => ["* " + k, v].join(": "))
            .join("\n")}
    `
}