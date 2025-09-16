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
      navigate({ to: "/login", replace: true })
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
    <div style={{ minHeight: '100vh', background: '#fff', fontFamily: 'Poppins, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div style={{ background: '#fff', borderRadius: '1.5rem', boxShadow: '0 10px 32px rgba(247,44,91,0.08)', padding: '2.5rem 2rem', width: '100%', maxWidth: 420, fontFamily: 'Poppins, sans-serif' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, color: '#F72C5B', marginBottom: 18 }}>Register</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {errors.general && (
            <div style={{ background: '#FF748B22', border: '1.5px solid #F72C5B', color: '#F72C5B', padding: '10px 16px', borderRadius: 10, fontSize: 14, marginBottom: 4 }}>{errors.general}</div>
          )}
          <input
            type="text"
            name="fullName"
            placeholder="Nama Lengkap"
            value={formData.fullName}
            onChange={handleChange}
            style={{ width: '100%', border: '2px solid #E4F1AC', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', marginBottom: 2, transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = '#A7D477')}
            onBlur={e => (e.target.style.borderColor = '#E4F1AC')}
          />
          {errors.fullName && <p style={{ color: '#F72C5B', fontSize: 13, marginTop: 2 }}>{errors.fullName}</p>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={{ width: '100%', border: '2px solid #E4F1AC', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', marginBottom: 2, transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = '#A7D477')}
            onBlur={e => (e.target.style.borderColor = '#E4F1AC')}
          />
          {errors.email && <p style={{ color: '#F72C5B', fontSize: 13, marginTop: 2 }}>{errors.email}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: '100%', border: '2px solid #E4F1AC', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', marginBottom: 2, transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = '#A7D477')}
            onBlur={e => (e.target.style.borderColor = '#E4F1AC')}
          />
          {errors.password && <p style={{ color: '#F72C5B', fontSize: 13, marginTop: 2 }}>{errors.password}</p>}
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: '100%', border: '2px solid #E4F1AC', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', marginBottom: 2, transition: 'border-color 0.2s' }}
            onFocus={e => (e.target.style.borderColor = '#A7D477')}
            onBlur={e => (e.target.style.borderColor = '#E4F1AC')}
          >
            <option value="mahasiswa">Mahasiswa</option>
            <option value="dosen">Dosen</option>
          </select>
          {errors.role && <p style={{ color: '#F72C5B', fontSize: 13, marginTop: 2 }}>{errors.role}</p>}
          {formData.role === 'mahasiswa' && (
            <input
              type="text"
              name="studentId"
              placeholder="NIM"
              value={formData.studentId}
              onChange={handleChange}
              style={{ width: '100%', border: '2px solid #E4F1AC', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', marginBottom: 2, transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = '#A7D477')}
              onBlur={e => (e.target.style.borderColor = '#E4F1AC')}
            />
          )}
          {formData.role === 'dosen' && (
            <input
              type="text"
              name="lecturerId"
              placeholder="NIP"
              value={formData.lecturerId}
              onChange={handleChange}
              style={{ width: '100%', border: '2px solid #E4F1AC', borderRadius: 10, padding: '12px 14px', fontSize: 15, outline: 'none', fontFamily: 'Poppins, sans-serif', background: '#fff', color: '#222', marginBottom: 2, transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = '#A7D477')}
              onBlur={e => (e.target.style.borderColor = '#E4F1AC')}
            />
          )}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            style={{ width: '100%', background: registerMutation.isPending ? '#FF748B' : '#F72C5B', color: '#fff', fontWeight: 600, padding: '12px 0', borderRadius: 10, border: 'none', fontSize: 16, marginTop: 4, cursor: registerMutation.isPending ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}
          >
            {registerMutation.isPending ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
          <p style={{ color: '#A7D477', marginTop: 10, fontSize: 14, textAlign: 'center' }}>
            Sudah punya akun?{' '}
            <Link to="/login" style={{ color: '#F72C5B', fontWeight: 500, textDecoration: 'underline', textUnderlineOffset: 2 }}>Masuk disini</Link>
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: '/' })}
            style={{ width: '100%', border: '2px solid #E4F1AC', color: '#A7D477', padding: '10px 0', borderRadius: 10, fontWeight: 500, background: '#fff', marginTop: 8, cursor: 'pointer', transition: 'background 0.2s' }}
          >
            Kembali
          </button>
        </form>
      </div>
    </div>
  )
}