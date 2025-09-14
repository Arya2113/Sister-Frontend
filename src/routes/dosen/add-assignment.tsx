"use client"

import type React from "react"

import { createFileRoute } from "@tanstack/react-router"
import { useState } from "react"
export const Route = createFileRoute("/dosen/add-assignment")({
  component: AddAssignment,
})

function AddAssignment() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [deadline, setDeadline] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log({ title, description, deadline })
    // Reset form
    setTitle("")
    setDescription("")
    setDeadline("")
    alert("Tugas berhasil ditambahkan!")
  }

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Tugas</h1>
        <p className="text-gray-600 mt-2">Buat tugas baru untuk mahasiswa</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Judul Tugas
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              placeholder="Masukkan judul tugas"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Deskripsi
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              placeholder="Masukkan deskripsi tugas"
              required
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-2">
              Deadline
            </label>
            <input
              type="datetime-local"
              id="deadline"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-[#F72C5B] text-white rounded-lg hover:bg-[#FF748B] transition-colors font-medium"
            >
              Simpan Tugas
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("")
                setDescription("")
                setDeadline("")
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
