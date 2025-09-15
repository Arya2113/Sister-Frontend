"use client"

import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getAssignmentOptions } from "../../client/@tanstack/react-query.gen"

export const Route = createFileRoute("/dosen/assignment")({
  component: AssignmentsList,
})

function AssignmentsList() {
  const [filter, setFilter] = useState("all")

  const fallbackJwt =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJkb3NlbiIsImlhdCI6MTc1Nzg2OTgwOCwiZXhwIjoxNzU3ODcwNzA4fQ.Q_XOTS4W-vaj-vcu9kI6LtAJ_q75xAq1YJK1YEyf0XQ"

  const localToken =
    typeof window !== "undefined" ? localStorage.getItem("accessToken") : null

  const token = localToken || fallbackJwt

  const assignmentsQuery = useQuery(
    getAssignmentOptions({
      headers: token ? { Authorization: Bearer ${token} } : undefined,
    }),
  )

  const assignments: any[] = Array.isArray(assignmentsQuery.data)
    ? assignmentsQuery.data
    : []

  const filteredAssignments = assignments.filter((assignment) => {
    if (filter === "all") return true
    return assignment.status === filter
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
    const percentage = (submissions / total) * 100
    if (percentage >= 80) return "bg-[#A7D477]"
    if (percentage >= 50) return "bg-[#FF748B]"
    return "bg-[#F72C5B]"
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daftar Tugas</h1>
            <p className="text-gray-600 mt-2">
              Kelola dan pantau tugas yang telah dikumpulkan mahasiswa
            </p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "all"
              ? "bg-white text-[#F72C5B] shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "active"
              ? "bg-white text-[#F72C5B] shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Aktif
        </button>
        <button
          onClick={() => setFilter("closed")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "closed"
              ? "bg-white text-[#F72C5B] shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Selesai
        </button>
      </div>

      {/* Assignments Grid */}
      <div className="grid gap-6">
        {filteredAssignments.map((assignment) => (
          <div
            key={assignment.id}
            className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {assignment.nama}
                  </h3>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      assignment.status,
                    )}`}
                  >
                    {assignment.status === "active" ? "Aktif" : "Selesai"}
                  </span>
                </div>
                <p className="text-gray-600 mb-3">{assignment.deskripsi}</p>
                <p className="text-sm text-gray-500">
                  Deadline:{" "}
                  {assignment.deadline
                    ? new Date(assignment.deadline).toLocaleDateString(
                        "id-ID",
                        {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "-"}
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Pengumpulan</span>
                <span>
                  {assignment.submissions ?? 0}/{assignment.totalStudents ?? 0}{" "}
                  mahasiswa
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all ${getProgressColor(
                    assignment.submissions ?? 0,
                    assignment.totalStudents ?? 0,
                  )}`}
                  style={{
                    width: `${
                      ((assignment.submissions ?? 0) /
                        (assignment.totalStudents || 1)) *
                      100
                    }%`,
                  }}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-[#F72C5B] text-white rounded-lg hover:bg-[#FF748B] transition-colors text-sm font-medium">
                Lihat Detail
              </button>
              <button className="px-4 py-2 bg-[#A7D477] text-gray-800 rounded-lg hover:bg-[#E4F1AC] transition-colors text-sm font-medium">
                Unduh Semua
              </button>
              {assignment.status === "active" && (
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                  Edit Tugas
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredAssignments.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="mx-auto h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Tidak ada tugas
          </h3>
          <p className="text-gray-600">
            Belum ada tugas yang sesuai dengan filter yang dipilih.
          </p>
        </div>
      )}
    </div>
  )
}

export default AssignmentsList