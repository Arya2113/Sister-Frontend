import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: () => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Selamat Datang</h1>
        <p className="text-gray-600 mt-2">Silakan pilih menu di sidebar untuk memulai</p>
      </div>
    </div>
  ),
})
