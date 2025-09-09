import { getUsersOptions } from '@/client/@tanstack/react-query.gen'
import { createClient } from '@/client/client'
import { useQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import logo from '../logo.svg'
import { env } from '@/utils/env'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const localClient = createClient({
    baseUrl: `${env.VITE_API_BASE_URL}/api/v1`,
  })
  const { data, isLoading, error } = useQuery({
    ...getUsersOptions({
      client: localClient,
    }),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {(error as Error).message}</div>

  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <ul>
          {data?.data?.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <a
          className='App-link'
          href='https://tanstack.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn TanStack
        </a>
      </header>
    </div>
  )
}
