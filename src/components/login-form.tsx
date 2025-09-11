"use client"

import type React from "react"
import { useState } from "react"
import { Link } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select } from "./ui/select"

export function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "mahasiswa",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)

  const roleOptions = [
    { value: "mahasiswa", label: "Mahasiswa" },
    { value: "dosen", label: "Dosen" },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.email) {
      newErrors.email = "Email harus diisi"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid"
    }

    if (!formData.password) {
      newErrors.password = "Password harus diisi"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter"
    }

    if (!formData.role) {
      newErrors.role = "Role harus dipilih"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Here you would typically make an API call to authenticate
      console.log("Login attempt:", formData)

      // Redirect based on role
      if (formData.role === "dosen") {
        // Navigate to dosen dashboard
        console.log("Redirecting to dosen dashboard")
      } else {
        // Navigate to mahasiswa dashboard
        console.log("Redirecting to mahasiswa dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      setErrors({ general: "Login gagal. Silakan coba lagi." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors.general && (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-lg">
          {errors.general}
        </div>
      )}

      <Select
        label="Role"
        name="role"
        value={formData.role}
        onChange={handleInputChange}
        options={roleOptions}
        error={errors.role}
        required
      />

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        placeholder="Masukkan email Anda"
        error={errors.email}
        required
      />

      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleInputChange}
        placeholder="Masukkan password Anda"
        error={errors.password}
        required
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Memproses..." : "Login"}
      </Button>

      <div className="text-center">
        <p className="text-muted-foreground">
          Belum punya akun?{" "}
          <Link to="/register" className="text-primary hover:text-secondary font-medium transition-colors">
            Daftar di sini
          </Link>
        </p>
      </div>
    </form>
  )
}
