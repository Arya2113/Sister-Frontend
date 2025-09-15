// src/utils/apiFetch.ts
import { authStore } from "./authStore"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1"

/**
 * Wrapper fetch dengan otomatis attach accessToken dan refresh jika expired.
 * @param endpoint - path API, contoh: "/users"
 * @param options - konfigurasi fetch (method, headers, body, dll)
 */
export async function apiFetch(endpoint: string, options: RequestInit = {}) {
  let token = authStore.take("accessToken")

  let headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  // 🔹 Request pertama
  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // 🔹 Kalau token expired → coba refresh
  if (res.status === 401) {
    const refreshToken = authStore.take("refreshToken")

    if (refreshToken) {
      const refreshRes = await fetch(`${API_URL}/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })

      if (refreshRes.ok) {
        const data = await refreshRes.json()
        if (data.accessToken) {
          // simpan accessToken baru
          authStore.store("accessToken", data.accessToken)

          // retry request pakai token baru
          headers["Authorization"] = `Bearer ${data.accessToken}`
          res = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
          })
        }
      } else {
        // kalau refresh gagal → logout
        authStore.clear()
        throw new Error("Sesi berakhir, silakan login ulang.")
      }
    }
  }

  // kalau masih gagal
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData.message || "Request gagal")
  }

  return res.json()
}
