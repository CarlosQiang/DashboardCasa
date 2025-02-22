"use client";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <style jsx>{`
        .header {
          background: linear-gradient(135deg, #3498db, #2c3e50);
          color: white;
          padding: 40px;
          border-radius: 20px;
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
          transition: all 0.3s ease;
          max-width: 600px; /* Limitamos el ancho para centrar mejor */
          width: 100%;
          margin: 0 auto; /* Centramos horizontalmente */
          display: flex;
          flex-direction: column;
          align-items: center; /* Centramos todos los elementos internos */
          text-align: center;
        }

        .header:hover {
          transform: scale(1.02); /* Efecto hover sutil */
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.3);
        }

        .logo {
          width: 150px; /* Ampliamos el tamaño del logo */
          height: 150px;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 2.5rem; /* Tamaño de fuente grande */
          font-weight: bold;
          margin-bottom: 20px;
        }

        .login-button {
          font-size: 1.2rem; /* Tamaño de fuente del botón */
          padding: 12px 24px; /* Espaciado interior más grande */
          border: none; /* Quitamos el borde por defecto */
          border-radius: 10px; /* Bordes redondeados suaves */
          background-color: #3498db;
          color: white;
          text-decoration: none;
          cursor: pointer; /* Indicamos que es interactivo */
          transition: all 0.3s ease;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Sombra para dar profundidad */
        }

        .login-button:hover {
          background-color: #2980b9; /* Cambio de color al pasar el mouse */
          transform: translateY(-3px); /* Sube ligeramente al pasar el mouse */
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3); /* Sombra más pronunciada */
        }

        /* Responsive design */
        @media (max-width: 600px) {
          .header {
            padding: 30px; /* Reducimos el padding en pantallas pequeñas */
          }

          h1 {
            font-size: 2rem; /* Tamaño de fuente más pequeño en móviles */
          }

          .logo {
            width: 100px; /* Reducimos el tamaño del logo en móviles */
            height: 100px;
          }
        }
      `}</style>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <Link href="/login" className="login-button">
          <div className="header">
            <img src="/logo.png" alt="Logo" className="logo" />
            <h1>Bienvenido al Servidor</h1>
          </div>
        </Link>
      </main>
    </>
  );
}
