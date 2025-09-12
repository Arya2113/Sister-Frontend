import { Outlet, Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/mahasiswa")({
  component: () => (
    <div className="min-h-screen bg-background">
      <nav className="bg-card border-b border-border p-4">
        <div className="max-w-md mx-auto flex justify-center gap-4">
          <Link to="/Mahasiswa/login" activeProps={{ className: "text-primary" }}>
            Login
          </Link>
          <Link to="/Mahasiswa/register" activeProps={{ className: "text-primary" }}>
            Register
          </Link>
        </div>
      </nav>
      <Outlet />
    </div>
  ),
})
