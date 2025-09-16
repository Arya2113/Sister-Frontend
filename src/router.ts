// No import or route for role-selection found, no changes made.
// src/router.ts
import { createRouter } from "@tanstack/react-router"
import { routeTree } from "./routeTree.gen"

export const router = createRouter({
  routeTree,
})
