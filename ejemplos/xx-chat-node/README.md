# Proyecto de Node

pnpm add ai @ai-sdk/openai dotenv
pnpm add -D @types/node tsx typescript

```ts
// para leer lo que escribes en la terminal
import * as readline from 'node:readline/promises'
// traemos las dependencias necesarias
import { type CoreMessage, streamText } from 'ai'
// el cliente de OpenAI
import { openai } from '@ai-sdk/openai'
// para leer las variables de entorno
import dotenv from 'dotenv'
dotenv.config()

// creamos la interfaz de terminal para leer y escribir
const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

// array con los mensajes de la conversación
const messages: CoreMessage[] = []

async function main() {
  // loop infinito para leer y escribir continuamente
  while (true) {
    // preguntamos en la terminal al usuario que escriba
    const userInput = await terminal.question('Tú: ')
    // añadimos el mensaje al array
    messages.push({ role: 'user', content: userInput })
    // preguntamos a chatgpt para responder
    // con este mensaje y todos los demás
    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: `Eres un asistente útil, honesto y educado.`,
      messages,
    })

    // vamos a guardar el resultado de la conversación poco a poco
    let fullResponse = ''
    process.stdout.write('\nChatGPT: ')

    // conforme recibimos información de chatgpt, hacemos algo
    for await (const part of result.textStream) {
      fullResponse += part // vamos guardando el resultado en el array
      process.stdout.write(part) // vamos mostrando el resultado en la terminal
    }

    // terminamos la conversación con un salto de línea
    process.stdout.write('\n\n')
    // guardamos el mensaje final de chatgpt en el array
    messages.push({ role: 'assistant', content: fullResponse })
    // volvemos al inicio del bucle para preguntar de nuevo al usuario
  }
}

main().catch(console.error)
```