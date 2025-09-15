"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Select } from "./ui/select"

export function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "mahasiswa",
    studentId: "",
    lecturerId: "",
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

    if (!formData.fullName) {
      newErrors.fullName = "Nama lengkap harus diisi"
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password harus diisi"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Password tidak cocok"
    }

    if (!formData.role) {
      newErrors.role = "Role harus dipilih"
    }

    // Role-specific validation
    if (formData.role === "mahasiswa" && !formData.studentId) {
      newErrors.studentId = "NIM harus diisi"
    }

    if (formData.role === "dosen" && !formData.lecturerId) {
      newErrors.lecturerId = "NIP harus diisi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/v1/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          role: formData.role,
          studentId: formData.studentId,
          lecturerId: formData.lecturerId,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        // Registrasi berhasil, redirect ke login
  navigate({ to: "/login" });
      } else {
        setErrors({ general: data.message || "Registrasi gagal. Silakan coba lagi." });
      }
    } catch (error) {
      setErrors({ general: "Registrasi gagal. Silakan coba lagi." });
    } finally {
      setIsLoading(false);
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
        label="Nama Lengkap"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleInputChange}
        placeholder="Masukkan nama lengkap Anda"
        error={errors.fullName}
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

      {/* Role-specific fields */}
      {formData.role === "mahasiswa" && (
        <Input
          label="NIM (Nomor Induk Mahasiswa)"
          type="text"
          name="studentId"
          value={formData.studentId}
          onChange={handleInputChange}
          placeholder="Masukkan NIM Anda"
          error={errors.studentId}
          required
        />
      )}

      {formData.role === "dosen" && (
        <Input
          label="NIP (Nomor Induk Pegawai)"
          type="text"
          name="lecturerId"
          value={formData.lecturerId}
          onChange={handleInputChange}
          placeholder="Masukkan NIP Anda"
          error={errors.lecturerId}
          required
        />
      )}

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

      <Input
        label="Konfirmasi Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleInputChange}
        placeholder="Konfirmasi password Anda"
        error={errors.confirmPassword}
        required
      />

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Memproses..." : "Daftar"}
      </Button>

      <div className="text-center">
        <p className="text-muted-foreground">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary hover:text-secondary font-medium transition-colors">
            Login di sini
          </Link>
        </p>
      </div>
    </form>
  )
}
