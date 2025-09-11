import React from 'react'

import { useState } from 'react'

function App() {
  console.log("App component rendering...")
  
  const [currentPage, setCurrentPage] = useState<'home' | 'login' | 'register'>('home')
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  
  const handleLoginClick = () => {
    setCurrentPage('login')
  }
  
  const handleRegisterClick = () => {
    setCurrentPage('register')
  }
  
  const handleBackToHome = () => {
    setCurrentPage('home')
  }
  
  if (currentPage === 'login') {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        padding: '20px',
        fontFamily: '"Poppins", system-ui, sans-serif',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            color: '#F72C5B',
            fontFamily: '"Poppins", system-ui, sans-serif'
          }}>
            Login
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            marginBottom: '2rem',
            color: '#6b7280',
            fontWeight: '400'
          }}>
            Masuk ke Portal Tugas Akademik
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="email" 
              placeholder="Email"
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A7D477'}
              onBlur={(e) => e.target.style.borderColor = '#E4F1AC'}
            />
            <input 
              type="password" 
              placeholder="Password"
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A7D477'}
              onBlur={(e) => e.target.style.borderColor = '#E4F1AC'}
            />
            <button 
              onMouseEnter={() => setHoveredButton('login-submit-btn')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                backgroundColor: hoveredButton === 'login-submit-btn' ? '#e0245e' : '#F72C5B',
                color: 'white',
                padding: '14px 24px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                transition: 'all 0.2s',
                transform: hoveredButton === 'login-submit-btn' ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredButton === 'login-submit-btn' 
                  ? '0 6px 20px rgba(247, 44, 91, 0.4)' 
                  : '0 2px 10px rgba(247, 44, 91, 0.2)'
              }}
            >
              Login
            </button>
            <p style={{ fontSize: '14px', color: '#6b7280', margin: '16px 0', fontWeight: '400' }}>
              Belum punya akun?{' '}
              <button 
                onClick={handleRegisterClick}
                onMouseEnter={() => setHoveredButton('login-link-register')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: hoveredButton === 'login-link-register' ? '#e0245e' : '#F72C5B',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '14px',
                  fontFamily: '"Poppins", system-ui, sans-serif',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
              >
                Daftar disini
              </button>
            </p>
            <button 
              onClick={handleBackToHome} 
              onMouseEnter={() => setHoveredButton('login-back-btn')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                backgroundColor: hoveredButton === 'login-back-btn' ? '#f3f4f6' : '#ffffff',
                color: '#6b7280',
                padding: '10px 20px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                transition: 'all 0.2s',
                transform: hoveredButton === 'login-back-btn' ? 'translateY(-1px)' : 'translateY(0)'
              }}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  if (currentPage === 'register') {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        minHeight: '100vh',
        padding: '20px',
        fontFamily: '"Poppins", system-ui, sans-serif',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
      }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '400px',
          textAlign: 'center'
        }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            marginBottom: '0.5rem',
            color: '#FF748B',
            fontFamily: '"Poppins", system-ui, sans-serif'
          }}>
            Daftar Akun
          </h1>
          <p style={{ 
            fontSize: '1rem', 
            marginBottom: '2rem',
            color: '#6b7280',
            fontWeight: '400'
          }}>
            Buat akun baru untuk Portal Tugas Akademik
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Nama Lengkap"
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A7D477'}
              onBlur={(e) => e.target.style.borderColor = '#E4F1AC'}
            />
            <input 
              type="email" 
              placeholder="Email"
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A7D477'}
              onBlur={(e) => e.target.style.borderColor = '#E4F1AC'}
            />
            <input 
              type="password" 
              placeholder="Password"
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A7D477'}
              onBlur={(e) => e.target.style.borderColor = '#E4F1AC'}
            />
            <input 
              type="password" 
              placeholder="Konfirmasi Password"
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                outline: 'none',
                transition: 'border-color 0.2s',
                backgroundColor: '#ffffff'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A7D477'}
              onBlur={(e) => e.target.style.borderColor = '#E4F1AC'}
            />
            <select
              style={{
                padding: '14px 16px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: '#374151'
              }}
              onFocus={(e) => e.target.style.borderColor = '#A7D477'}
              onBlur={(e) => e.target.style.borderColor = '#E4F1AC'}
            >
              <option value="">Pilih Role</option>
              <option value="dosen">Dosen</option>
              <option value="mahasiswa">Mahasiswa</option>
            </select>
                        <button 
              type="submit"
              onMouseEnter={() => setHoveredButton('register-submit-btn')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                backgroundColor: hoveredButton === 'register-submit-btn' ? '#e0245e' : '#F72C5B',
                color: '#ffffff',
                padding: '12px 0',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '16px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                width: '100%',
                transition: 'all 0.3s ease',
                transform: hoveredButton === 'register-submit-btn' ? 'translateY(-2px)' : 'translateY(0)',
                boxShadow: hoveredButton === 'register-submit-btn' 
                  ? '0 8px 25px rgba(247, 44, 91, 0.3)' 
                  : '0 4px 15px rgba(247, 44, 91, 0.2)'
              }}
            >
              Daftar Sekarang
            </button>
                        <p style={{ fontSize: '14px', color: '#6b7280', margin: '16px 0', fontWeight: '400' }}>
              Sudah punya akun?{' '}
              <button 
                onClick={handleLoginClick}
                onMouseEnter={() => setHoveredButton('register-link-login')}
                onMouseLeave={() => setHoveredButton(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: hoveredButton === 'register-link-login' ? '#e0245e' : '#F72C5B',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                  fontSize: '14px',
                  fontFamily: '"Poppins", system-ui, sans-serif',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
              >
                Masuk disini
              </button>
            </p>
            <button 
              onClick={handleBackToHome} 
              onMouseEnter={() => setHoveredButton('register-back-btn')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                backgroundColor: hoveredButton === 'register-back-btn' ? '#f3f4f6' : '#ffffff',
                color: '#6b7280',
                padding: '10px 20px',
                borderRadius: '12px',
                border: '2px solid #E4F1AC',
                fontWeight: '500',
                cursor: 'pointer',
                fontSize: '14px',
                fontFamily: '"Poppins", system-ui, sans-serif',
                transition: 'all 0.2s',
                transform: hoveredButton === 'register-back-btn' ? 'translateY(-1px)' : 'translateY(0)'
              }}
            >
              Kembali
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  // Home page
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px',
      fontFamily: '"Poppins", system-ui, sans-serif',
      background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '20px',
        padding: '50px 40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #F72C5B 0%, #FF748B 100%)',
          margin: '0 auto 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '36px'
        }}>
          📚
        </div>
        <h1 style={{ 
          fontSize: '2.8rem', 
          fontWeight: '700', 
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #F72C5B 0%, #FF748B 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: '"Poppins", system-ui, sans-serif'
        }}>
          Universitas Sebelas Dua Belas
        </h1>
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '2.5rem',
          color: '#6b7280',
          fontWeight: '400',
          lineHeight: '1.6'
        }}>
          Selamat Datang di Portal Tugas Akademik!
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={handleLoginClick}
            onMouseEnter={() => setHoveredButton('home-login')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              background: hoveredButton === 'home-login' 
                ? 'linear-gradient(135deg, #F72C5B 0%, #FF748B 100%)' 
                : '#ffffff',
              color: hoveredButton === 'home-login' ? 'white' : '#F72C5B',
              padding: '14px 28px',
              borderRadius: '12px',
              border: hoveredButton === 'home-login' ? 'none' : '2px solid #F72C5B',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '16px',
              fontFamily: '"Poppins", system-ui, sans-serif',
              transition: 'all 0.3s ease',
              boxShadow: hoveredButton === 'home-login' 
                ? '0 8px 25px rgba(247, 44, 91, 0.4)' 
                : '0 4px 15px rgba(247, 44, 91, 0.2)',
              transform: hoveredButton === 'home-login' ? 'translateY(-3px)' : 'translateY(0)',
              minWidth: '120px'
            }}
          >
            Login
          </button>
          <button
            onClick={handleRegisterClick}
            onMouseEnter={() => setHoveredButton('home-register')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              background: hoveredButton === 'home-register' 
                ? 'linear-gradient(135deg, #96c765 0%, #A7D477 100%)' 
                : '#ffffff',
              color: hoveredButton === 'home-register' ? 'white' : '#A7D477',
              padding: '14px 28px',
              borderRadius: '12px',
              border: hoveredButton === 'home-register' ? 'none' : '2px solid #A7D477',
              fontWeight: '600',
              cursor: 'pointer',
              fontSize: '16px',
              fontFamily: '"Poppins", system-ui, sans-serif',
              transition: 'all 0.3s ease',
              boxShadow: hoveredButton === 'home-register' 
                ? '0 8px 25px rgba(167, 212, 119, 0.4)' 
                : '0 4px 15px rgba(167, 212, 119, 0.2)',
              transform: hoveredButton === 'home-register' ? 'translateY(-3px)' : 'translateY(0)',
              minWidth: '120px'
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
