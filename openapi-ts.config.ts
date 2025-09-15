import { defineConfig } from '@hey-api/openapi-ts'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '.env.development') })

export default defineConfig({
  input: {
    path: `${process.env.VITE_API_BASE_URL}/swagger`,
    watch: true,
  },
  output: 'src/client',
  plugins: ['@tanstack/react-query'],
})
