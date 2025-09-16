/// <reference types="vite/client" />

import { Outlet, createRootRoute, redirect } from "@tanstack/react-router"
import { TanStackRouterDevtools } from "@tanstack/router-devtools"
import appCss from "../styles.css?url"

function getUserRole(): "mahasiswa" | "dosen" | null {
  return localStorage.getItem("role") as "mahasiswa" | "dosen" | null
}

export const Route = createRootRoute({
  head: () => ({
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),

  beforeLoad: () => {
    const role = getUserRole()
    if (role === "mahasiswa") {
      throw redirect({ to: "/Mahasiswa/dashboard" })
    }
    if (role === "dosen") {
      throw redirect({ to: "/dosen/dashboard" })
    }
    // kalau belum ada role → biarkan tetap di /
  },

  component: () => (
    <div className="min-h-screen bg-white font-sans">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
})