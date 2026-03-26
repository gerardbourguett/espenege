/**
 * AI Summarizer for news articles
 * Uses OpenAI-compatible API to generate 2-3 paragraph summaries
 */

interface SummarizeResult {
  summary: string;
  success: boolean;
  error?: string;
}

const SYSTEM_PROMPT = `Eres un redactor de noticias profesional en español chileno. Tu tarea es resumir noticias de manera clara, objetiva y concisa.

REGLAS:
- Resume en 2-3 párrafos máximo
- Mantén los datos clave: nombres, lugares, fechas, cifras
- Usa lenguaje de noticias (tercera persona, formal)
- NO inventes información - solo resume lo que está en el texto
- Si el texto está en inglés, traduce al español chileno
- Destaca la información más relevante
- Sé neutral y objetivo`;

export async function summarize(text: string): Promise<SummarizeResult> {
  const apiKey = process.env.OPEN_AI_COMPATIBLE_API_KEY;

  if (!apiKey) {
    console.warn("[summarizer] OPEN_AI_COMPATIBLE_API_KEY not set, using raw text truncation");
    return {
      summary: text.substring(0, 500) + (text.length > 500 ? "..." : ""),
      success: false,
      error: "API key not configured"
    };
  }

  // OpenRouter uses a specific base URL and model format
  const baseUrl = process.env.OPEN_AI_COMPATIBLE_BASE_URL || "https://openrouter.ai/api/v1";
  const model = process.env.OPEN_AI_COMPATIBLE_MODEL || "anthropic/claude-3-haiku-20250207";

  // Truncate text if too long (model context limits)
  const truncatedText = text.length > 4000 ? text.substring(0, 4000) + "..." : text;

  try {
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "HTTP-Referer": "https://spng.media",
        "X-Title": "SPNG Media"
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `Resume la siguiente noticia:\n\n${truncatedText}` }
        ],
        max_tokens: 500,
        temperature: 0.3 // Low temperature for factual summarization
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content?.trim();

    if (!summary) {
      throw new Error("No summary returned from API");
    }

    return { summary, success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`[summarizer] Error: ${errorMessage}`);

    // Fallback to truncation
    return {
      summary: text.substring(0, 500) + (text.length > 500 ? "..." : ""),
      success: false,
      error: errorMessage
    };
  }
}
