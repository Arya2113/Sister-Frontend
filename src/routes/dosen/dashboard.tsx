import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dosen/dashboard")({
  component: DosenDashboard,
})

function DosenDashboard() {
  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Selamat datang di dashboard dosen</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stats Cards */}
        <div className="bg-gradient-to-r from-[#F72C5B] to-[#FF748B] rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Tugas</h3>
          <p className="text-3xl font-bold">12</p>
        </div>

        <div className="bg-gradient-to-r from-[#A7D477] to-[#E4F1AC] rounded-lg p-6 text-gray-800">
          <h3 className="text-lg font-semibold mb-2">Tugas Dikumpulkan</h3>
          <p className="text-3xl font-bold">45</p>
        </div>

        <div className="bg-gray-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Belum Dinilai</h3>
          <p className="text-3xl font-bold text-[#F72C5B]">8</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Aktivitas Terbaru</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Tugas Algoritma Pemrograman</p>
              <p className="text-sm text-gray-600">3 mahasiswa baru mengumpulkan</p>
            </div>
            <span className="text-sm text-gray-500">2 jam lalu</span>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Tugas Struktur Data</p>
              <p className="text-sm text-gray-600">Deadline dalam 2 hari</p>
            </div>
            <span className="text-sm text-gray-500">1 hari lalu</span>
          </div>
        </div>
      </div>
    </div>
  )
}
