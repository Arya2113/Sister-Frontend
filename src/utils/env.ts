import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
})

const env = (() => {
  try {
    const parsedEnv = envSchema.parse(import.meta.env)
    return parsedEnv
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        '❌ Error: Variabel lingkungan sisi klien tidak valid:',
        error.errors
      )
    }
    throw new Error('Variabel lingkungan sisi klien tidak valid')
  }
})()

export { env }
