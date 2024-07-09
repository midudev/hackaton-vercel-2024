import OpenAI from "openai";
import { GameId, Review } from "./types";
import { OpenAIStream, StreamingTextResponse } from 'ai' // Vercel AI SDK ***

if (!process.env.PERPLEXITY_API_KEY) {
  throw new Error(
    "PERPLEXITY_API_KEY environment variable is required. You can get this via https://vercel.com/docs/integrations/ai"
  );
}

const perplexity = new OpenAI({
  apiKey: process.env.PERPLEXITY_API_KEY || "",
  baseURL: "https://api.perplexity.ai",
});

function buildPrompt(prompt: string): [{ role: "user"; content: string }] {
  return [
    {
      role: "user",
      content: prompt,
    },
  ];
}



export async function summarizeReviews(gameId: GameId) {
  const metaCriticURL = `https://internal-prod.apigee.fandom.net/v1/xapi/composer/metacritic/pages/games-user-reviews/${gameId}/platform/playstation-5/web?filter=all&sort=date&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`

  const res = await fetch(metaCriticURL);
  const data = await res.json();

  const { components } = data
  const [rawInfo, _, rawReviews] = components

  const { data: { item: { criticScoreSummary, title } } } = rawInfo
  const { score } = criticScoreSummary

  const { data: { items } } = rawReviews

  const prompt = `Escribe un resumen de las valoraciones de usuarios del videojuego ${title} en español. La puntuación es ${score} de 100.

  Usa este tono según la puntuación del videojuego:
  - De 0 a 40: negativo
  - De 41 a 60: neutral
  - De 61 a 80: positivo
  - De 81 a 100: muy positivo

  Recibirás una lista de valoraciones de usuarios en diferentes idiomas pero tu resumen debe estar en español.
  Tu objetivo es resaltar los temas más comunes y las emociones expresaddas por los usuarios.
  Si hay varios temas, intenta capturar los más importantes.
  Divídela en 4 párrafos cortos. Máximo 30 palabras en total.
  No vuelvas a repetir la puntuación.
  No hagas referencias a puntuaciones concretas ni a la fecha de la valoración.

  Estas son las valoraciones de los usuarios:
  ${items.map((item: Review) => item.quote).join('\n')}
  `
  const query = {
    model: 'llama-3-sonar-large-32k-chat',
    stream: true,
    messages: buildPrompt(prompt),
    max_tokens: 1000,
    temperature: 0.75,
    frequency_penalty: 1,
  } as const

  const response = await perplexity.chat.completions.create(query)

  const stream = OpenAIStream(response)

  const streamingResponse = new StreamingTextResponse(stream)
  return await streamingResponse.text()
}
