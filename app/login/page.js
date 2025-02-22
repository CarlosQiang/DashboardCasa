'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0);
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validar credenciales
    if (username === 'root' && password === 'Gandalf-2') {
      localStorage.setItem('userRole', 'admin');
      router.push('/dashboard');
    } else {
      const attempts = failedAttempts + 1;
      setFailedAttempts(attempts);

      // Si se superan 3 intentos, se redirige como invitado
      if (attempts >= 3) {
        alert('Demasiados intentos fallidos. Entrando como invitado...');
        return handleGuest();
      }

      alert(`Credenciales incorrectas. Intentos restantes: ${3 - attempts}`);
    }
  };

  const handleGuest = () => {
    // Reiniciar contador y establecer rol invitado
    setFailedAttempts(0);
    localStorage.setItem('userRole', 'guest');
    router.push('/dashboard');
  };

  return (
    <>
      <style jsx global>{`
        @keyframes backgroundAnimation {
          0% {
            background-color: #f0f2f5;
          }
          50% {
            background-color: #e0e0e0;
          }
          100% {
            background-color: #f0f2f5;
          }
        }
        body {
          animation: backgroundAnimation 10s ease infinite;
        }

        .fondologin {
          background: linear-gradient(135deg, #3498db, #2c3e50);
          padding: 30px;
          border-radius: 15px;
          margin-bottom: 30px;
          text-align: center;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }
      `}</style>
      <div className="min-h-screen flex items-center justify-center fondologin">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-bold mb-6 text-center">Inicio de Sesión</h2>

          {failedAttempts > 0 && (
            <div className="mb-4 text-red-500 text-sm">
              Intentos fallidos: {failedAttempts}/3
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Usuario</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaUser className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full outline-none"
                  placeholder=""
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Contraseña</label>
              <div className="flex items-center border rounded-lg p-2">
                <FaLock className="text-gray-400 mr-2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full outline-none"
                  placeholder=""
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Iniciar como Root
            </button>
          </form>

          <button
            onClick={handleGuest}
            className="w-full mt-4 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            Entrar como Invitado
          </button>
        </div>
      </div>
    </>
  );
}
