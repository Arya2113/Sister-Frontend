"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
  getAssignmentQueryKey,
  getAssignmentOptions,
} from "@/client/@tanstack/react-query.gen";

export const Route = createFileRoute("/dosen/dashboard")({
  component: DosenDashboard,
});

type Assignment = {
  id: string;
  nama: string;
  submittedCount?: number;
  updatedAt: string;
};

function DosenDashboard() {
  const token =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbGUiOiJkb3NlbiIsImlhdCI6MTc1Nzg2MzkzMCwiZXhwIjoxNzU3ODY0ODMwfQ.r3KCHd7-QW3MI12R7xahtEQpM5Rrmn03r3AQ_tE28s0";

  const queryClient = useQueryClient();

  const options = getAssignmentOptions({
    headers: { Authorization: token },
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: getAssignmentQueryKey(),
    queryFn: ({ signal }) =>
      options.queryFn?.({
        queryKey: getAssignmentQueryKey(),
        signal,
        client: queryClient,
        meta: undefined,
      }) ?? Promise.reject("queryFn tidak tersedia"),
  });

  const assignments: Assignment[] = (data?.data as any)?.assignments ?? [];

  const totalTugas = assignments.length;
  const tugasDikumpulkan = assignments.filter(
    (t) => (t.submittedCount ?? 0) > 0
  ).length;

  const aktivitasTerbaru = assignments
    .slice()
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, 5);

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p className="text-red-600">Gagal memuat dashboard.</p>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Selamat datang di dashboard dosen
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-r from-[#F72C5B] to-[#FF748B] rounded-lg p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Tugas</h3>
          <p className="text-3xl font-bold">{totalTugas}</p>
        </div>

        <div className="bg-gradient-to-r from-[#A7D477] to-[#E4F1AC] rounded-lg p-6 text-gray-800">
          <h3 className="text-lg font-semibold mb-2">Tugas Dikumpulkan</h3>
          <p className="text-3xl font-bold">{tugasDikumpulkan}</p>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Aktivitas Terbaru
        </h2>
        <div className="space-y-3">
          {aktivitasTerbaru.length > 0 ? (
            aktivitasTerbaru.map((tugas) => (
              <div
                key={tugas.id}
                className="flex items-center justify-between py-3 border-b border-gray-100"
              >
                <div>
                  <p className="font-medium text-gray-900">{tugas.nama}</p>
                  <p className="text-sm text-gray-600">
                    {(tugas.submittedCount ?? 0)} mahasiswa baru mengumpulkan
                  </p>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(tugas.updatedAt).toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Belum ada aktivitas terbaru</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DosenDashboard;
