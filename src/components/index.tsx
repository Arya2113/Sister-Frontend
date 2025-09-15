import { Link } from "@tanstack/react-router"

function Index() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "3rem 2rem",
          borderRadius: "1rem",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          textAlign: "center",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        {/* Icon bulat */}
        <div
          style={{
            backgroundColor: "#f43f5e",
            borderRadius: "50%",
            width: "80px",
            height: "80px",
            margin: "0 auto 1.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "2rem",
            fontWeight: "bold",
          }}
        >
          📚
        </div>

        {/* Judul */}
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "0.5rem",
            color: "#ef4444",
          }}
        >
          Universitas
        </h1>
        <h1
          style={{
            fontSize: "1.8rem",
            fontWeight: "700",
            marginBottom: "1rem",
            color: "#ef4444",
          }}
        >
          Sebelas Dua Belas
        </h1>

        {/* Subjudul */}
        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            marginBottom: "2rem",
          }}
        >
          Selamat Datang di Portal Tugas Akademik!
        </p>

        {/* Tombol */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "1rem",
          }}
        >
          <Link
            to="/login"
            style={{
              padding: "0.6rem 1.5rem",
              border: "2px solid #ef4444",
              borderRadius: "8px",
              color: "#ef4444",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Login
          </Link>
          <Link
            to="/register"
            style={{
              padding: "0.6rem 1.5rem",
              border: "2px solid #22c55e",
              borderRadius: "8px",
              color: "#22c55e",
              fontWeight: "600",
              textDecoration: "none",
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
