import { createFileRoute } from '@tanstack/react-router'
import '../App.css'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
    component: () => (
    <div className="space-y-6">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-3xl font-bold text-gray-900">Selamat Datang</h1>
        <p className="text-gray-600 mt-2">Silakan pilih menu di sidebar untuk memulai</p>
      </div>
    </div>
  ),
})

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
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
