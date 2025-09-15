import { postSubmissionMutation } from '@/client/@tanstack/react-query.gen'
import { useMutation } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { useRef } from 'react'

export const Route = createFileRoute('/upload')({
  component: RouteComponent,
})

function RouteComponent() {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const submissionMutation = useMutation({
    ...postSubmissionMutation(),
    onSuccess: (data) => {
      console.log('Upload successful:', data)
    },
    onError: (error) => {
      console.error('Upload failed:', error)
    },
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const file = fileInputRef.current?.files?.[0]
    if (!file) return

    submissionMutation.mutate({
      headers: {
        Authorization:
          // Access token hardcode, jangan lupa diganti pake dari local storage atau context
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsInJvbGUiOiJtYWhhc2lzd2EiLCJpYXQiOjE3NTc5MDA3NTQsImV4cCI6MTc1NzkwMTY1NH0.6pUaHLjs4sp5wkd3wc2U_wRNZysHX1DBXR_zBtGeS4M',
      },
      body: {
        file,
        tugasId: 1, // Hardcode jangan lupa diganti pake logika
      },
    })
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-xl shadow-lg flex flex-col gap-6 min-w-[320px] w-full max-w-sm'
      >
        <h2 className='text-2xl font-semibold text-center text-gray-800 m-0'>
          Upload File
        </h2>
        <input
          type='file'
          ref={fileInputRef}
          name='file'
          required
          className='p-2 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <button
          type='submit'
          className='py-3 rounded-md bg-blue-600 text-white font-semibold text-base hover:bg-blue-700 transition-colors'
        >
          Upload
        </button>
      </form>
    </div>
  )
}
