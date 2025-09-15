// src/utils/authStore.ts

/**
 * Menyimpan data ke localStorage (hanya berjalan di sisi client/browser).
 * @param field - Kunci data, contoh: 'accessToken'.
 * @param value - Nilai data yang akan disimpan.
 */
const store = (field: string, value: string): void => {
  // Cek apakah kode ini berjalan di browser sebelum mengakses localStorage
  if (typeof window !== "undefined") {
    localStorage.setItem(field, value);
  }
};

/**
 * Mengambil data dari localStorage (hanya berjalan di sisi client/browser).
 * @param field - Kunci data yang ingin diambil.
 * @returns Nilai data (string) atau null jika tidak ditemukan.
 */
const take = (field: string): string | null => {
  // Cek apakah kode ini berjalan di browser
  if (typeof window !== "undefined") {
    return localStorage.getItem(field);
  }
  // Jika berjalan di server, kembalikan null
  return null;
};

/**
 * Menghapus token dari localStorage untuk proses logout.
 */
const clear = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }
};

// Ganti nama ekspor menjadi 'authStore' agar konsisten dengan nama file
export const authStore = {
  store,
  take,
  clear, // Tambahkan fungsi clear ke objek yang diekspor
};