import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { authStore } from "../utils/authStore"
import {
  postLoginMutation,
} from "@/client/@tanstack/react-query.gen"
import { useMutation } from "@tanstack/react-query"

export function LoginForm() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  // gunakan mutation dari hey-api / tanstack
  const loginMutation = useMutation({
    ...postLoginMutation(),
    onSuccess: (data) => {
      if (data.tokens?.accessToken && data.tokens?.refreshToken) {
        authStore.store("accessToken", data.tokens.accessToken)
        authStore.store("refreshToken", data.tokens.refreshToken)
        navigate({ to: "/dashboard" })
      }
    },
    onError: (err: any) => {
      setErrors({
        general:
          err?.message || "Login gagal. Periksa email dan password Anda.",
      })
    },
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
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
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    loginMutation.mutate({
      body: {
        email: formData.email,
        password: formData.password,
      },
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold text-pink-600 mb-2">Login</h1>
        <p className="text-gray-500 mb-6">Masuk ke Portal Tugas Akademik</p>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {errors.general && (
            <div className="bg-red-100 border border-red-300 text-red-600 px-4 py-2 rounded-lg">
              {errors.general}
            </div>
          )}

          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full border-2 border-lime-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              className="w-full border-2 border-lime-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 rounded-lg transition"
          >
            {loginMutation.isPending ? "Memproses..." : "Login"}
          </button>
        </form>

        <p className="text-gray-500 mt-4 text-sm">
          Belum punya akun?{" "}
          <Link
            to="/register"
            className="text-pink-500 hover:underline font-medium"
          >
            Daftar disini
          </Link>
        </p>

        <Link
          to="/"
          className="block mt-4 border-2 border-lime-300 text-gray-600 py-2 rounded-lg hover:bg-lime-50 transition"
        >
          Kembali
        </Link>
      </div>
    </div>
  )
}
