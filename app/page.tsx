"use client"
import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "../src/routeTree.gen.ts"

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router
  }
}

export default function Page() {
  return (
    <div className="min-h-screen">
      <RouterProvider router={router} />
    </div>
  )
}
