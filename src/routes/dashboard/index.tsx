import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dashboard/")({
  component: Dashboard,
})

function Dashboard() {
  return (
    <div className="space-y-8 bg-white font-poppins">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-8 border border-gray-200 shadow-lg">
        <h2 className="text-3xl font-bold mb-2 font-poppins text-gray-900">Selamat Datang di SISTER</h2>
        <p className="text-lg font-poppins font-light text-gray-800">Sistem Informasi Akademik untuk Mahasiswa</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl border border-red-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 font-poppins">Tugas Aktif</p>
              <p className="text-3xl font-bold text-primary-pink font-poppins">5</p>
            </div>
            <div className="w-12 h-12 bg-primary-pink/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-primary-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 font-poppins">Tugas Selesai</p>
              <p className="text-3xl font-bold text-accent-green font-poppins">12</p>
            </div>
            <div className="w-12 h-12 bg-accent-green/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-accent-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100 p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 font-poppins">Rata-rata Nilai</p>
              <p className="text-3xl font-bold text-secondary-pink font-poppins">85.5</p>
            </div>
            <div className="w-12 h-12 bg-secondary-pink/10 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-secondary-pink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6 shadow-sm">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 font-poppins">Aktivitas Terbaru</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4 p-4 bg-green-100/50 rounded-lg hover:bg-green-100/70 transition-colors">
            <div className="w-2 h-2 bg-accent-green rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 font-poppins">Tugas Algoritma dan Struktur Data</p>
              <p className="text-sm text-gray-600 font-poppins font-light">Dikumpulkan 2 hari yang lalu</p>
            </div>
            <span className="text-sm font-medium text-accent-green font-poppins">Selesai</span>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-pink-100/50 rounded-lg hover:bg-pink-100/70 transition-colors">
            <div className="w-2 h-2 bg-primary-pink rounded-full"></div>
            <div className="flex-1">
              <p className="font-medium text-gray-900 font-poppins">Tugas Basis Data</p>
              <p className="text-sm text-gray-600 font-poppins font-light">Deadline: 3 hari lagi</p>
            </div>
            <span className="text-sm font-medium text-primary-pink font-poppins">Pending</span>
          </div>
        </div>
      </div>
    </div>
  )
}
