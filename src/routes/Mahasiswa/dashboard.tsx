import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/Mahasiswa/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/Mahasiswa/dashboard"!</div>
}
