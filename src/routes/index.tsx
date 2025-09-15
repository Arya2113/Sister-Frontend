import '../App.css'
import logo from '../logo.svg'
import { createFileRoute, Link } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  console.log("Index component rendering...")
  
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
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: 'calc(100vh - 80px)',
      padding: '20px',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontWeight: 'bold', 
          marginBottom: '1rem',
          color: '#374151'
        }}>
          Portal Tugas Akademik
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '2rem',
          color: '#6b7280',
          maxWidth: '400px'
        }}>
          Sistem manajemen tugas untuk dosen dan mahasiswa
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <Link
            to="/role-selection"
            style={{
              backgroundColor: '#a7d477',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Mulai
          </Link>
          <Link
            to="/login"
            style={{
              backgroundColor: '#b3c8a7',
              color: '#374151',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
