"use client"

import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createFileRoute("/dosen/grading")({
  component: GradingInterface,
})

// Mock data for student submissions
const mockSubmissions = [
  {
    id: 1,
    studentName: "Ahmad Rizki",
    studentId: "2021001",
    assignmentTitle: "Algoritma Pemrograman - Sorting",
    submittedAt: "2024-01-14T10:30:00",
    fileUrl: "#",
    grade: null,
    feedback: "",
    status: "pending",
  },
  {
    id: 2,
    studentName: "Siti Nurhaliza",
    studentId: "2021002",
    assignmentTitle: "Algoritma Pemrograman - Sorting",
    submittedAt: "2024-01-13T15:45:00",
    fileUrl: "#",
    grade: 85,
    feedback: "Implementasi sudah baik, namun perlu optimasi pada kompleksitas waktu.",
    status: "graded",
  },
  {
    id: 3,
    studentName: "Budi Santoso",
    studentId: "2021003",
    assignmentTitle: "Struktur Data - Linked List",
    submittedAt: "2024-01-15T09:20:00",
    fileUrl: "#",
    grade: null,
    feedback: "",
    status: "pending",
  },
  {
    id: 4,
    studentName: "Maya Sari",
    studentId: "2021004",
    assignmentTitle: "Database - ERD Design",
    submittedAt: "2024-01-10T14:15:00",
    fileUrl: "#",
    grade: 92,
    feedback: "Excellent work! ERD design sangat detail dan sesuai dengan requirements.",
    status: "graded",
  },
]

function GradingInterface() {
  const [submissions, setSubmissions] = useState(mockSubmissions)
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null)
  const [grade, setGrade] = useState("")
  const [feedback, setFeedback] = useState("")
  const [filter, setFilter] = useState("all")

  const filteredSubmissions = submissions.filter((submission) => {
    if (filter === "all") return true
    return submission.status === filter
  })

  const handleGradeSubmit = (submissionId: number) => {
    setSubmissions((prev) =>
      prev.map((sub) =>
        sub.id === submissionId ? { ...sub, grade: Number.parseInt(grade), feedback, status: "graded" } : sub,
      ),
    )
    setSelectedSubmission(null)
    setGrade("")
    setFeedback("")
    alert("Nilai berhasil disimpan!")
  }

  const openGradingModal = (submission: any) => {
    setSelectedSubmission(submission)
    setGrade(submission.grade?.toString() || "")
    setFeedback(submission.feedback || "")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-[#FF748B] text-white"
      case "graded":
        return "bg-[#A7D477] text-gray-800"
      default:
        return "bg-gray-200 text-gray-600"
    }
  }

  const getGradeColor = (grade: number) => {
    if (grade >= 80) return "text-[#A7D477]"
    if (grade >= 70) return "text-[#FF748B]"
    return "text-[#F72C5B]"
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Penilaian</h1>
        <p className="text-gray-600 mt-2">Berikan nilai dan feedback untuk tugas mahasiswa</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "all" ? "bg-white text-[#F72C5B] shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Semua
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "pending" ? "bg-white text-[#F72C5B] shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Belum Dinilai
        </button>
        <button
          onClick={() => setFilter("graded")}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            filter === "graded" ? "bg-white text-[#F72C5B] shadow-sm" : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Sudah Dinilai
        </button>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mahasiswa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tugas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dikumpulkan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nilai
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubmissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{submission.studentName}</div>
                      <div className="text-sm text-gray-500">{submission.studentId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">{submission.assignmentTitle}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(submission.status)}`}>
                      {submission.status === "pending" ? "Belum Dinilai" : "Sudah Dinilai"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.grade ? (
                      <span className={`text-lg font-bold ${getGradeColor(submission.grade)}`}>{submission.grade}</span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      onClick={() => openGradingModal(submission)}
                      className="text-[#F72C5B] hover:text-[#FF748B] font-medium"
                    >
                      {submission.status === "pending" ? "Beri Nilai" : "Edit Nilai"}
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 font-medium">Unduh</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredSubmissions.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Tidak ada pengumpulan</h3>
          <p className="text-gray-600">Belum ada pengumpulan tugas yang sesuai dengan filter yang dipilih.</p>
        </div>
      )}

      {/* Grading Modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Penilaian Tugas</h2>
                  <p className="text-gray-600 mt-1">
                    {selectedSubmission.studentName} - {selectedSubmission.studentId}
                  </p>
                </div>
                <button onClick={() => setSelectedSubmission(null)} className="text-gray-400 hover:text-gray-600">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Detail Tugas</h3>
                  <p className="text-gray-700">{selectedSubmission.assignmentTitle}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Dikumpulkan:{" "}
                    {new Date(selectedSubmission.submittedAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                <div>
                  <label htmlFor="grade" className="block text-sm font-medium text-gray-700 mb-2">
                    Nilai (0-100)
                  </label>
                  <input
                    type="number"
                    id="grade"
                    min="0"
                    max="100"
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Masukkan nilai"
                  />
                </div>

                <div>
                  <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
                    placeholder="Berikan feedback untuk mahasiswa"
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => handleGradeSubmit(selectedSubmission.id)}
                    disabled={!grade}
                    className="px-6 py-3 bg-[#F72C5B] text-white rounded-lg hover:bg-[#FF748B] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Simpan Nilai
                  </button>
                  <button
                    onClick={() => setSelectedSubmission(null)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
