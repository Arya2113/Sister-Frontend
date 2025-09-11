"use client"

import { createFileRoute, Link } from "@tanstack/react-router"
import { useState } from "react"
import { RoleSelector } from "../components/role-selector"
import { Button } from "../components/ui/button"

export const Route = createFileRoute("/role-selection")({
  component: RoleSelection,
})

function RoleSelection() {
  const [selectedRole, setSelectedRole] = useState("")
  const [error, setError] = useState("")

  const handleContinue = () => {
    if (!selectedRole) {
      setError("Silakan pilih role terlebih dahulu")
      return
    }

    // Navigate to appropriate registration form based on role
    console.log("Selected role:", selectedRole)
    // You can redirect to different registration forms or pass role as state
  }

  const handleRoleChange = (role: string) => {
    setSelectedRole(role)
    setError("")
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
      <div className="w-full max-w-md">
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-card-foreground mb-2">Selamat Datang</h1>
            <p className="text-muted-foreground">Pilih role Anda untuk melanjutkan</p>
          </div>

          <div className="space-y-6">
            <RoleSelector selectedRole={selectedRole} onRoleChange={handleRoleChange} error={error} />

            <Button onClick={handleContinue} className="w-full" disabled={!selectedRole}>
              Lanjutkan
            </Button>

            <div className="text-center">
              <p className="text-muted-foreground">
                Sudah punya akun?{" "}
                <Link to="/login" className="text-primary hover:text-secondary font-medium transition-colors">
                  Login di sini
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
