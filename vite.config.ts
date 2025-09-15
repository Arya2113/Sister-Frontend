import tailwindcss from '@tailwindcss/vite'
import tanstackRouter, {
  tanstackRouterGenerator,
  TanStackRouterVite,
} from '@tanstack/router-plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouter({
    //   routesDirectory: './src/routes',
    //   generatedRouteTree: './src/routeTree.gen.ts',
    //   routeFileIgnorePrefix: '-',
    //   quoteStyle: 'single',
    //   autoCodeSplitting: true,
    // }),
    viteReact(),
    tanstackRouterGenerator({
      addExtensions: true,
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    }),
    tailwindcss(),
  ],
  // test: {
  //   globals: true,
  //   environment: 'jsdom',
  // },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
