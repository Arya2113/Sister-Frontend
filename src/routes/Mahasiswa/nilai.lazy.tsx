"use client"

import { createLazyFileRoute } from "@tanstack/react-router"
import { useState } from "react"

export const Route = createLazyFileRoute("/Mahasiswa/nilai")({
  component: NilaiPage,
})

interface Grade {
  id: string
  assignmentTitle: string
  course: string
  lecturer: string
  submittedAt: string
  gradedAt: string
  score: number
  maxScore: number
  grade: string
  feedback?: string
  status: "graded" | "pending"
}

interface CourseStats {
  course: string
  totalAssignments: number
  gradedAssignments: number
  averageScore: number
  grades: Grade[]
}

function NilaiPage() {
  const [selectedCourse, setSelectedCourse] = useState<string>("all")
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null)

  // Mock data for grades
  const grades: Grade[] = [
    {
      id: "1",
      assignmentTitle: "Implementasi Algoritma Sorting",
      course: "Algoritma dan Struktur Data",
      lecturer: "Dr. Ahmad Wijaya",
      submittedAt: "2024-01-08",
      gradedAt: "2024-01-12",
      score: 85,
      maxScore: 100,
      grade: "A-",
      feedback:
        "Implementasi algoritma sudah benar dan efisien. Analisis kompleksitas waktu juga akurat. Namun, dokumentasi kode bisa diperbaiki untuk lebih jelas.",
      status: "graded",
    },
    {
      id: "2",
      assignmentTitle: "Desain Database E-Commerce",
      course: "Basis Data",
      lecturer: "Prof. Siti Nurhaliza",
      submittedAt: "2024-01-18",
      gradedAt: "2024-01-22",
      score: 92,
      maxScore: 100,
      grade: "A",
      feedback: "ERD sangat baik dan normalisasi sudah tepat. Implementasi SQL juga efisien. Excellent work!",
      status: "graded",
    },
    {
      id: "3",
      assignmentTitle: "Analisis Sistem Informasi",
      course: "Rekayasa Perangkat Lunak",
      lecturer: "Dr. Budi Santoso",
      submittedAt: "2024-01-08",
      gradedAt: "2024-01-15",
      score: 78,
      maxScore: 100,
      grade: "B+",
      feedback: "Analisis kebutuhan cukup baik, namun perlu lebih detail dalam dokumentasi use case.",
      status: "graded",
    },
    {
      id: "4",
      assignmentTitle: "Project Management Plan",
      course: "Manajemen Proyek TI",
      lecturer: "Dr. Lisa Permata",
      submittedAt: "2024-01-20",
      gradedAt: "",
      score: 0,
      maxScore: 100,
      grade: "",
      status: "pending",
    },
  ]

  // Calculate course statistics
  const courseStats: CourseStats[] = grades
    .reduce((acc: CourseStats[], grade) => {
      const existingCourse = acc.find((c) => c.course === grade.course)

      if (existingCourse) {
        existingCourse.grades.push(grade)
        existingCourse.totalAssignments++
        if (grade.status === "graded") {
          existingCourse.gradedAssignments++
        }
      } else {
        acc.push({
          course: grade.course,
          totalAssignments: 1,
          gradedAssignments: grade.status === "graded" ? 1 : 0,
          averageScore: 0,
          grades: [grade],
        })
      }

      return acc
    }, [])
    .map((courseData) => ({
      ...courseData,
      averageScore:
        courseData.gradedAssignments > 0
          ? courseData.grades.filter((g) => g.status === "graded").reduce((sum, g) => sum + g.score, 0) /
            courseData.gradedAssignments
          : 0,
    }))

  const filteredGrades = selectedCourse === "all" ? grades : grades.filter((g) => g.course === selectedCourse)

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "text-accent-green bg-accent-green/10"
    if (grade.startsWith("B")) return "text-secondary-pink bg-secondary-pink/10"
    if (grade.startsWith("C")) return "text-yellow-600 bg-yellow-50"
    if (grade.startsWith("D")) return "text-orange-600 bg-orange-50"
    return "text-red-600 bg-red-50"
  }

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 85) return "text-accent-green"
    if (percentage >= 70) return "text-secondary-pink"
    if (percentage >= 60) return "text-yellow-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6 bg-white font-poppins">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 font-poppins">Nilai Tugas</h1>
          <p className="text-gray-600 mt-1 font-poppins font-light">Lihat nilai dan feedback dari tugas yang telah dikumpulkan</p>
        </div>
      </div>

      {/* Course Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {courseStats.map((stat) => (
          <div key={stat.course} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <h3 className="font-semibold text-gray-900 text-sm mb-2 line-clamp-2">{stat.course}</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Tugas Dinilai</span>
                <span className="font-medium">
                  {stat.gradedAssignments}/{stat.totalAssignments}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Rata-rata</span>
                <span className={`font-bold ${getScoreColor(stat.averageScore, 100)}`}>
                  {stat.averageScore > 0 ? stat.averageScore.toFixed(1) : "-"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Grades List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Daftar Nilai</h2>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-pink focus:border-transparent font-poppins"
            >
              <option value="all">Semua Mata Kuliah</option>
              {courseStats.map((stat) => (
                <option key={stat.course} value={stat.course}>
                  {stat.course}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            {filteredGrades.map((grade) => (
              <div
                key={grade.id}
                className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${
                  selectedGrade?.id === grade.id
                    ? "border-primary-pink shadow-lg"
                    : "border-gray-200 hover:border-secondary-pink shadow-sm"
                }`}
                onClick={() => setSelectedGrade(grade)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 mb-1 font-poppins">{grade.assignmentTitle}</h3>
                    <p className="text-sm text-gray-600 mb-1 font-poppins">{grade.course}</p>
                    <p className="text-xs text-gray-500 font-poppins font-light">Dosen: {grade.lecturer}</p>
                  </div>
                  <div className="text-right">
                    {grade.status === "graded" ? (
                      <>
                        <div className="flex items-center space-x-2 mb-1">
                          <span className={`text-lg font-bold ${getScoreColor(grade.score, grade.maxScore)}`}>
                            {grade.score}
                          </span>
                          <span className="text-gray-400">/{grade.maxScore}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.grade)}`}>
                          {grade.grade}
                        </span>
                      </>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-medium text-gray-600 bg-gray-100">
                        Belum Dinilai
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Dikumpulkan: {new Date(grade.submittedAt).toLocaleDateString("id-ID")}</span>
                  {grade.gradedAt && <span>Dinilai: {new Date(grade.gradedAt).toLocaleDateString("id-ID")}</span>}
                </div>
              </div>
            ))}

            {filteredGrades.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p>Tidak ada nilai untuk mata kuliah yang dipilih</p>
              </div>
            )}
          </div>
        </div>

        {/* Grade Details */}
        <div className="space-y-6">
          {selectedGrade ? (
            <>
              {/* Grade Summary */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Detail Nilai</h3>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tugas</label>
                    <p className="text-gray-900 font-medium">{selectedGrade.assignmentTitle}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-600">Mata Kuliah</label>
                    <p className="text-gray-900">{selectedGrade.course}</p>
                  </div>

                  {selectedGrade.status === "graded" ? (
                    <>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-600">Nilai</span>
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeColor(selectedGrade.grade)}`}
                          >
                            {selectedGrade.grade}
                          </span>
                        </div>
                        <div className="flex items-center justify-center">
                          <span
                            className={`text-3xl font-bold ${getScoreColor(selectedGrade.score, selectedGrade.maxScore)}`}
                          >
                            {selectedGrade.score}
                          </span>
                          <span className="text-xl text-gray-400 ml-1">/{selectedGrade.maxScore}</span>
                        </div>
                        <div className="text-center mt-2">
                          <span className="text-sm text-gray-600">
                            Persentase: {((selectedGrade.score / selectedGrade.maxScore) * 100).toFixed(1)}%
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-600">Tanggal Dinilai</label>
                        <p className="text-gray-900">{new Date(selectedGrade.gradedAt).toLocaleDateString("id-ID")}</p>
                      </div>
                    </>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                      <svg
                        className="w-8 h-8 text-yellow-600 mx-auto mb-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-yellow-800 font-medium">Menunggu Penilaian</p>
                      <p className="text-yellow-600 text-sm">Tugas sedang dalam proses penilaian oleh dosen</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Feedback */}
              {selectedGrade.status === "graded" && selectedGrade.feedback && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Feedback Dosen</h3>
                  <div className="bg-[#E4F1AC]/30 rounded-lg p-4">
                    <p className="text-gray-700 leading-relaxed">{selectedGrade.feedback}</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 p-8 text-center">
              <svg
                className="w-12 h-12 text-gray-400 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Pilih Nilai</h3>
              <p className="text-gray-600">
                Pilih tugas dari daftar di sebelah kiri untuk melihat detail nilai dan feedback
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
