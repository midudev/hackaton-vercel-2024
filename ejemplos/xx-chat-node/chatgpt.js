import * as readline from 'node:readline/promises'
import { streamText } from 'ai'
import { openai } from '@ai-sdk/openai'

process.env.OPENAI_API_KEY = "sk-proj-LZm1eP3..."

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const messages = []

async function main() {
  while (true) {
    const userInput = await terminal.question('Tú: ')
    messages.push({ role: 'user', content: userInput })

    const result = await streamText({
      model: openai('gpt-4-turbo'),
      system: `Eres un asistente útil, honesto y educado.`,
      messages,
    })

    let fullResponse = ''
    process.stdout.write('\nChatGPT: ')

    for await (const part of result.textStream) {
      fullResponse += part
      process.stdout.write(part)
    }

    process.stdout.write('\n\n')
    messages.push({ role: 'assistant', content: fullResponse })
  }
}

main().catch(console.error)