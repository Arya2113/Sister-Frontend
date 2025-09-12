import { Outlet, Link, createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/dosen/")({
  component: () => (
    <div className="min-h-screen bg-white font-sans flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Dosen</h1>
          <nav className="space-y-2 flex flex-col">
            <Link to="/dosen/dashboard" activeProps={{ className: "bg-[#F72C5B] text-white" }}>
              Dashboard
            </Link>
            <Link to="/dosen/add-assignment" activeProps={{ className: "bg-[#F72C5B] text-white" }}>
              Tambah Tugas
            </Link>
            <Link to="/dosen/assignment" activeProps={{ className: "bg-[#F72C5B] text-white" }}>
              Daftar Tugas
            </Link>
            <Link to="/dosen/grading" activeProps={{ className: "bg-[#F72C5B] text-white" }}>
              Penilaian
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <Outlet />
      </div>
    </div>
  ),
})
