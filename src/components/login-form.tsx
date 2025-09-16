import { useState } from "react"
import { Link, useNavigate } from "@tanstack/react-router"
import { authStore } from "../utils/authStore"
import {
  postLoginMutation,
} from "@/client/@tanstack/react-query.gen"
import { useMutation } from "@tanstack/react-query"
import { jwtDecode } from "jwt-decode"


type JwtPayload = {
  role?: "mahasiswa" | "dosen"
}

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

      const decoded = jwtDecode<JwtPayload>(data.tokens.accessToken)
      if (decoded.role) {
        const role = decoded.role === "mahasiswa" ? "dosen" : "mahasiswa"
        localStorage.setItem("role", role)
      }

        navigate({ to: "/" })
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
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 10px 32px rgba(247,44,91,0.08)', padding: '2.5rem 2rem', width: '100%', maxWidth: 400, textAlign: 'center', fontFamily: 'Poppins, sans-serif' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#F72C5B', marginBottom: 8 }}>Login</h1>
        <p style={{ color: '#FF748B', marginBottom: 24 }}>Masuk ke Portal Tugas Akademik</p>
        <form onSubmit={handleSubmit} style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {errors.general && (
            <div style={{ background: '#FF748B22', border: '1.5px solid #F72C5B', color: '#F72C5B', padding: '10px 16px', borderRadius: 10, fontSize: 14, marginBottom: 4 }}>{errors.general}</div>
          )}
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              style={{ width: '100%', border: '2px solid #E4F1AC', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', marginBottom: 2, transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = '#A7D477')}
              onBlur={e => (e.target.style.borderColor = '#E4F1AC')}
            />
            {errors.email && <p style={{ color: '#F72C5B', fontSize: 13, marginTop: 2 }}>{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              style={{ width: '100%', border: '2px solid #E4F1AC', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', marginBottom: 2, transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = '#A7D477')}
              onBlur={e => (e.target.style.borderColor = '#E4F1AC')}
            />
            {errors.password && <p style={{ color: '#F72C5B', fontSize: 13, marginTop: 2 }}>{errors.password}</p>}
          </div>
          <button
            type="submit"
            disabled={loginMutation.isPending}
            style={{ width: '100%', background: loginMutation.isPending ? '#FF748B' : '#F72C5B', color: '#fff', fontWeight: 600, padding: '12px 0', borderRadius: 10, border: 'none', fontSize: 16, marginTop: 4, cursor: loginMutation.isPending ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
          >
            {loginMutation.isPending ? 'Memproses...' : 'Login'}
          </button>
        </form>
        <p style={{ color: '#A7D477', marginTop: 18, fontSize: 14 }}>
          Belum punya akun?{' '}
          <Link to="/register" style={{ color: '#F72C5B', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 2 }}>Daftar disini</Link>
        </p>
        <Link
          to="/"
          style={{ display: 'block', marginTop: 18, border: '2px solid #E4F1AC', color: '#A7D477', padding: '10px 0', borderRadius: 10, fontWeight: 500, background: '#fff', textDecoration: 'none', transition: 'background 0.2s' }}
        >
          Kembali
        </Link>
      </div>
    </div>
  )
}
