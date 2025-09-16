"use client"

import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import {
  getAssignmentsOptions,
  getAssignmentsQueryKey,
} from "../../client/@tanstack/react-query.gen"

export const Route = createFileRoute("/dosen/assignment")({
  component: AssignmentsList,
})

function AssignmentsList() {
  const [filter, setFilter] = useState<"all" | "active" | "closed">("all")
  const [selectedAssignment, setSelectedAssignment] = useState<any | null>(null)

  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJkb3NlbiIsImlhdCI6MTc1Nzk5OTc1MCwiZXhwIjoxNzU4MDAwNjUwfQ.muB5JfFKDSf2TBrA6ih7EWYu0g7axhRxAVhprFpZlho"

  const queryClient = useQueryClient()

  const options = getAssignmentsOptions({
    headers: { Authorization: token },
  })

  const { data, isLoading, isError, error } = useQuery({
    queryKey: getAssignmentsQueryKey(),
    queryFn: ({ signal }) =>
      options.queryFn?.({
        queryKey: getAssignmentsQueryKey(),
        signal,
        client: queryClient,
        meta: undefined,
      }) ?? Promise.reject("queryFn tidak tersedia"),
  })

  // helper: cari field dengan beberapa kemungkinan nama
  const getField = (obj: any, keys: string[]) => {
    if (!obj) return undefined
    for (const k of keys) {
      if (obj[k] !== undefined && obj[k] !== null) return obj[k]
    }
    return undefined
  }

  const formatDate = (val: any) => {
    if (val === undefined || val === null || val === "") return "-"
    try {
      const d = typeof val === "number" ? new Date(val) : new Date(String(val))
      if (isNaN(d.getTime())) return String(val)
      return d.toLocaleString("id-ID")
    } catch {
      return String(val)
    }
  }

  const assignments: any[] =
    (data?.data as any)?.assignments ?? (Array.isArray(data) ? data : [])

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true
    const status = assignment.status ?? (assignment.closed ? "closed" : "active")
    return status === filter
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-[#A7D477] text-gray-800"
      case "closed":
        return "bg-gray-200 text-gray-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const getProgressColor = (submissions: number, total: number) => {
    const percentage = total > 0 ? (submissions / total) * 100 : 0
    if (percentage >= 80) return "bg-[#A7D477]"
    if (percentage >= 50) return "bg-[#FF748B]"
    return "bg-[#F72C5B]"
  }

  if (isLoading) {
    return <div className="text-center py-12 text-gray-500">Sedang memuat data tugas...</div>
  }

  if (isError) {
    return <div className="text-center py-12 text-red-500">
      Gagal memuat data: {error instanceof Error ? error.message : "Unknown error"}
    </div>
  }

  return (
    <div className="space-y-6">
      {/* Filter */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {["all", "active", "closed"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab as "all" | "active" | "closed")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              filter === tab
                ? "bg-white text-[#F72C5B] shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {tab === "all" ? "Semua" : tab === "active" ? "Aktif" : "Selesai"}
          </button>
        ))}
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-6">
        {filteredAssignments.map((assignment) => {
          const name = getField(assignment, ["nama", "name", "title"]) ?? "Tanpa Judul"
          const description = getField(assignment, ["description", "desc", "keterangan", "deskripsi", "detail", "details", "body"]) ?? "-"
          const submissions = Number(getField(assignment, ["submittedCount", "submissions", "submitted"]) ?? 0)
          const totalStudents = Number(getField(assignment, ["totalStudents", "total", "students"]) ?? 1)
          const status = getField(assignment, ["status"]) ?? (assignment.closed ? "closed" : "active")
          const deadlineRaw = getField(assignment, ["deadline", "dueDate", "due_date", "dueAt", "due", "deadlineAt", "due_at"])
          const deadline = formatDate(deadlineRaw)

          const key = assignment.id ?? assignment._id ?? assignment.tempId ?? Math.random()
          const pct = Math.max(0, Math.min(100, totalStudents > 0 ? (submissions / totalStudents) * 100 : 0))

          return (
            <div key={key} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {name}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
                      {status === "active" ? "Aktif" : "Selesai"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">Deadline: {deadline}</p>
                  <p className="text-gray-600 mb-3">{description}</p>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Pengumpulan</span>
                  <span>{submissions}/{totalStudents} mahasiswa</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getProgressColor(submissions, totalStudents)}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedAssignment(assignment)}
                  className="px-4 py-2 bg-[#F72C5B] text-white rounded-lg hover:bg-[#FF748B] transition-colors text-sm font-medium"
                >
                  Lihat Detail
                </button>
                <button className="px-4 py-2 bg-[#A7D477] text-gray-800 rounded-lg hover:bg-[#E4F1AC] transition-colors text-sm font-medium">
                  Unduh Semua
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal Detail Tugas */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">Detail Tugas</h2>
            
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Nama Tugas:</span>{" "}
                {getField(selectedAssignment, ["nama", "name", "title"]) ?? "Tanpa Judul"}
              </p>
              <p>
                <span className="font-semibold">Deskripsi:</span>{" "}
                {getField(selectedAssignment, ["description", "desc", "keterangan", "deskripsi", "detail", "details", "body"]) ?? "-"}
              </p>
              <p>
                <span className="font-semibold">Deadline:</span>{" "}
                {formatDate(getField(selectedAssignment, ["deadline", "dueDate", "due_date", "dueAt", "due", "deadlineAt", "due_at"]))}
              </p>
              <p>
                <span className="font-semibold">Tanggal Pembuatan:</span>{" "}
                {formatDate(getField(selectedAssignment, ["createdAt", "created_at", "created", "updatedAt", "updated_at"]))}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {getField(selectedAssignment, ["status"]) ?? (selectedAssignment.closed ? "closed" : "active")}
              </p>
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setSelectedAssignment(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
