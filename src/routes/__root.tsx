/// <reference types="vite/client" />

import { TanstackDevtools } from '@tanstack/react-devtools'
import { Outlet, Link , createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="min-h-screen bg-white font-sans">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
            <div className="p-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-8">Dashboard Dosen</h1>
              <nav className="space-y-2">
                <Link
                  to="/dosen/dashboard"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  activeProps={{
                    className: "bg-[#F72C5B] text-white hover:bg-[#F72C5B]",
                  }}
                >
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/dosen/add-assignment"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  activeProps={{
                    className: "bg-[#F72C5B] text-white hover:bg-[#F72C5B]",
                  }}
                >
                  <span>Tambah Tugas</span>
                </Link>

                <Link
                  to="/dosen/assignment"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  activeProps={{
                    className: "bg-[#F72C5B] text-white hover:bg-[#F72C5B]",
                  }}
                >
                  <span>Daftar Tugas</span>
                </Link>

                <Link
                  to="/dosen/grading"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  activeProps={{
                    className: "bg-[#F72C5B] text-white hover:bg-[#F72C5B]",
                  }}
                >
                  <span>Penilaian</span>
                </Link>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-8">
            <Outlet />
          </div>
        </div>
      </div>
      <TanStackRouterDevtools />
    </>
  ),
})
