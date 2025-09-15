/// <reference types="vite/client" />

import { TanstackDevtools } from '@tanstack/react-devtools'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import appCss from '../styles.css?url'
import { createRootRoute, Link, Outlet } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools"

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-background">
        <nav className="bg-card border-b border-border p-4">
          <div className="max-w-md mx-auto flex justify-center gap-4">
            <Link
              to="/role-selection"
              className="text-foreground hover:text-primary font-medium transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              Role
            </Link>
            <Link
              to="/login"
              className="text-foreground hover:text-primary font-medium transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-foreground hover:text-primary font-medium transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              Register
            </Link>
          </div>
        </nav>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
