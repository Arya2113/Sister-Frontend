import { Link } from "@tanstack/react-router"

function Index() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '2.8rem 2rem',
          borderRadius: '1.5rem',
          boxShadow: '0 10px 32px rgba(247,44,91,0.08)',
          textAlign: 'center',
          maxWidth: 420,
          width: '100%',
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {/* Icon bulat */}
        <div
          style={{
            background: '#F72C5B',
            borderRadius: '50%',
            width: 80,
            height: 80,
            margin: '0 auto 1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontSize: '2.2rem',
            fontWeight: 700,
            boxShadow: '0 2px 12px #FF748B33',
          }}
        >
          📚
        </div>
        {/* Judul */}
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: 0,
            color: '#F72C5B',
            letterSpacing: 0.5,
          }}
        >
          Universitas
        </h1>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            marginBottom: 12,
            color: '#F72C5B',
            letterSpacing: 0.5,
          }}
        >
          Sebelas Dua Belas
        </h1>
        {/* Subjudul */}
        <p
          style={{
            fontSize: 16,
            color: '#A7D477',
            marginBottom: 28,
            fontWeight: 500,
          }}
        >
          Selamat Datang di Portal Tugas Akademik!
        </p>
        {/* Tombol */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 18,
          }}
        >
          <Link
            to="/login"
            style={{
              padding: '0.6rem 1.5rem',
              border: '2px solid #F72C5B',
              borderRadius: 10,
              color: '#F72C5B',
              fontWeight: 600,
              textDecoration: 'none',
              background: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 16,
              transition: 'background 0.2s',
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              padding: '0.6rem 1.5rem',
              border: '2px solid #A7D477',
              borderRadius: 10,
              color: '#A7D477',
              fontWeight: 600,
              textDecoration: 'none',
              background: '#fff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 16,
              transition: 'background 0.2s',
            }}
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Index
