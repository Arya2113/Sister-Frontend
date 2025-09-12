import { createFileRoute } from '@tanstack/react-router'
import { LoginForm } from '@/components/login-form'

export const Route = createFileRoute('/Mahasiswa/login')({
  component: LoginForm,
})
