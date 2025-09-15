"use client"

import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { useMutation } from "@tanstack/react-query"
import {
  postRegisterMutation,
} from "@/client/@tanstack/react-query.gen"

export function RegisterForm() {
  const navigate = useNavigate()
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

  const registerMutation = useMutation({
    ...postRegisterMutation(),
    onSuccess: (data) => {
      console.log("✅ Registrasi berhasil:", data)
      alert("Registrasi berhasil! Silakan login.")
      navigate({ to: "/login" })
    },
    onError: (error: any) => {
      console.error("❌ Registrasi gagal:", error)
      setErrors({
        general: error?.message || "Registrasi gagal. Silakan coba lagi.",
      })
    },
  })


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName) newErrors.fullName = "Nama lengkap harus diisi"
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
    if (!formData.role) newErrors.role = "Role harus dipilih"
    if (formData.role === "mahasiswa" && !formData.studentId) {
      newErrors.studentId = "NIM harus diisi"
    }
    if (formData.role === "dosen" && !formData.lecturerId) {
      newErrors.lecturerId = "NIP harus diisi"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    console.log("📤 Data registrasi dikirim:", formData)

registerMutation.mutate({
  body: {
    name: formData.fullName,
    email: formData.email,
    password: formData.password,
    roleId: formData.role === "mahasiswa" ? 2 : 1, // contoh: 1=dosen, 2=mahasiswa
    nim: formData.role === "mahasiswa" ? formData.studentId : undefined,
    nip: formData.role === "dosen" ? formData.lecturerId : undefined,
  } as any, // 🚨 bypass TypeScript
})



  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Daftar Akun
        </h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          {errors.general && (
            <div className="mx-auto max-w-xs bg-red-100 border border-red-300 text-red-600 px-3 py-2 rounded-lg text-sm">
              {errors.general}
            </div>
          )}

          {/* Nama Lengkap */}
          <input
            type="text"
            name="fullName"
            placeholder="Nama Lengkap"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border border-lime-300 px-3 py-2 text-sm focus:ring focus:ring-lime-100 focus:border-lime-400 outline-none"
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-lime-300 px-3 py-2 text-sm focus:ring focus:ring-lime-100 focus:border-lime-400 outline-none"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-lime-300 px-3 py-2 text-sm focus:ring focus:ring-lime-100 focus:border-lime-400 outline-none"
          />
          {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

          {/* Konfirmasi Password */}
          <input
            type="password"
            name="confirmPassword"
            placeholder="Konfirmasi Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded-xl border border-lime-300 px-3 py-2 text-sm focus:ring focus:ring-lime-100 focus:border-lime-400 outline-none"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}

          {/* Role */}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full rounded-xl border border-lime-300 px-3 py-2 text-sm bg-white focus:ring focus:ring-lime-100 focus:border-lime-400 outline-none"
          >
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs">{errors.role}</p>}

          {/* Field Khusus */}
          {formData.role === "mahasiswa" && (
            <input
              type="text"
              name="studentId"
              placeholder="NIM"
              value={formData.studentId}
              onChange={handleChange}
              className="w-full rounded-xl border border-lime-300 px-3 py-2 text-sm focus:ring focus:ring-lime-100 focus:border-lime-400 outline-none"
            />
          )}
          {formData.role === "dosen" && (
            <input
              type="text"
              name="lecturerId"
              placeholder="NIP"
              value={formData.lecturerId}
              onChange={handleChange}
              className="w-full rounded-xl border border-lime-300 px-3 py-2 text-sm focus:ring focus:ring-lime-100 focus:border-lime-400 outline-none"
            />
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-xl bg-rose-500 px-3 py-2 text-sm font-semibold text-white hover:bg-rose-600 transition disabled:opacity-70"
          >
            {registerMutation.isPending ? "Memproses..." : "Daftar Sekarang"}
          </button>

          {/* Link Login */}
          <p className="text-sm text-gray-600 text-center">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-rose-500 font-medium hover:underline">
              Masuk disini
            </Link>
          </p>

          {/* Tombol Kembali */}
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            className="w-full rounded-xl border border-lime-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"
          >
            Kembali
          </button>
        </form>
      </div>
    </div>
  )
}
