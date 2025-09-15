"use client"

import {
  postCreateAssignmentMutation
} from "@/client/@tanstack/react-query.gen";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";

export const Route = createFileRoute("/dosen/add-assignment")({
  component: AddAssignment,
});

function AddAssignment() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...postCreateAssignmentMutation(),
    onSuccess: () => {
      setSuccessMessage("Tugas berhasil dibuat!");
      setTimeout(() => {
        navigate({ to: "/dosen/dashboard" });
      }, 1000);
    },
  });
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   const isoDeadline = deadline ? new Date(deadline).toISOString() : undefined;

  //   const token =
  //     typeof window !== "undefined"
  //       ? localStorage.getItem("accessToken") || localStorage.getItem("token")
  //       : null;

  //   mutation.mutate({
  //     body: {
  //       nama: title,
  //       deskripsi: description,
  //       deadline: isoDeadline,
  //     },
  //     headers: token ? { Authorization: Bearer ${token} } : undefined,
  //   });
  // };

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const isoDeadline = deadline ? new Date(deadline).toISOString() : undefined;

  mutation.mutate({
    body: {
      nama: title,
      deskripsi: description,
      deadline: isoDeadline,
    },
    headers: {
      Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJkb3NlbiIsImlhdCI6MTc1NzkyNzIxOSwiZXhwIjoxNzU3OTI4MTE5fQ.kcRNoIQAiMMenMYUgAv830czzdVOTkzrgZ42ly6UCkA",
    },
  });
};

  return (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Tugas</h1>
        <p className="text-gray-600 mt-2">Buat tugas baru untuk mahasiswa</p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-lg bg-green-100 text-green-700 border border-green-300">
          {successMessage}
        </div>
      )}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Input judul */}
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

          {/* Input deskripsi */}
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

          {/* Input deadline */}
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

          {/* Tombol */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-6 py-3 bg-[#F72C5B] text-white rounded-lg hover:bg-[#FF748B] transition-colors font-medium disabled:opacity-60"
            >
              {mutation.isPending ? "Menyimpan..." : "Simpan Tugas"}
            </button>
            <button
              type="button"
              onClick={() => {
                setTitle("");
                setDescription("");
                setDeadline("");
              }}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Reset
            </button>
          </div>

          {mutation.isError && (
            <div className="text-red-600 mt-2">
              {String((mutation.error as any)?.message ?? "Terjadi kesalahan")}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default AddAssignment; 