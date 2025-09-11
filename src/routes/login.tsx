import { createFileRoute } from "@tanstack/react-router"
import { LoginForm } from "../components/login-form"

export const Route = createFileRoute("/login")({
  component: Login,
})

function Login() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-card-foreground mb-2">Login</h1>
            <p className="text-muted-foreground">Masuk ke Portal Tugas Akademik</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
