"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import QRCode from "react-qr-code";

export default function Page() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef(null);
  const startXRef = useRef(0);
  const router = useRouter();

  // Umbral en píxeles para considerar el gesto como un swipe
  const SWIPE_THRESHOLD = 100;

  const handleStart = useCallback((clientX) => {
    startXRef.current = clientX;
    setDragDistance(0);
    setIsDragging(true);
  }, []);

  const handleMove = useCallback((clientX) => {
    if (!isDragging) return;
    const deltaX = clientX - startXRef.current;
    setDragDistance(deltaX);
  }, [isDragging]);

  const handleEnd = useCallback(() => {
    // Si el arrastre supera el umbral en cualquiera de las direcciones, se invierte el estado
    if (Math.abs(dragDistance) > SWIPE_THRESHOLD) {
      setIsFlipped((prev) => !prev);
    }
    // Reiniciamos valores y activamos transición de nuevo
    setDragDistance(0);
    setIsDragging(false);
  }, [dragDistance]);

  const handleClick = useCallback(
    (e) => {
      // Si el movimiento es mínimo y la tarjeta no está volteada, se navega a /login
      if (Math.abs(dragDistance) < 5 && !isFlipped) {
        router.push("/login");
      }
    },
    [router, isFlipped, dragDistance]
  );

  useEffect(() => {
    const card = cardRef.current;
    if (card) {
      const touchStart = (e) => handleStart(e.touches[0].clientX);
      const touchMove = (e) => handleMove(e.touches[0].clientX);
      const mouseDown = (e) => handleStart(e.clientX);
      const mouseMove = (e) => {
        if (e.buttons === 1) {
          handleMove(e.clientX);
        }
      };

      card.addEventListener("touchstart", touchStart);
      card.addEventListener("touchmove", touchMove);
      card.addEventListener("touchend", handleEnd);
      card.addEventListener("mousedown", mouseDown);
      card.addEventListener("mousemove", mouseMove);
      card.addEventListener("mouseup", handleEnd);

      return () => {
        card.removeEventListener("touchstart", touchStart);
        card.removeEventListener("touchmove", touchMove);
        card.removeEventListener("touchend", handleEnd);
        card.removeEventListener("mousedown", mouseDown);
        card.removeEventListener("mousemove", mouseMove);
        card.removeEventListener("mouseup", handleEnd);
      };
    }
  }, [handleStart, handleMove, handleEnd]);

  // Rotación base según el estado de la tarjeta
  const baseRotation = isFlipped ? 180 : 0;
  // Durante el arrastre, se suma el efecto para que el giro siga el movimiento
  const totalRotation = baseRotation + dragDistance * 0.2;

  return (
    <>
      <style jsx>{`
        .card-container {
          perspective: 1000px;
          width: 100%;
          max-width: 600px;
          height: 400px;
          margin: 0 auto;
        }

        .card {
          position: relative;
          width: 100%;
          height: 100%;
          /* Se activa la transición solo si no se está arrastrando */
          transition: ${isDragging ? "none" : "transform 0.6s"};
          transform-style: preserve-3d;
          cursor: pointer;
          transform: rotateY(${totalRotation}deg);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
        }

        .card-front {
          background: linear-gradient(135deg, #3498db, #2c3e50);
          color: white;
        }

        .card-back {
          background: white;
          color: #2c3e50;
          transform: rotateY(180deg);
        }

        .logo {
          width: 150px;
          height: 150px;
          margin-bottom: 20px;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 20px;
          text-align: center;
        }

        p {
          text-align: center;
          margin-top: 20px;
        }

        @media (max-width: 600px) {
          .card-container {
            height: 300px;
          }

          h1 {
            font-size: 2rem;
          }

          .logo {
            width: 100px;
            height: 100px;
          }
        }
      `}</style>

      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <div className="card-container">
          <div ref={cardRef} className="card" onClick={handleClick}>
            <div className="card-face card-front">
              <img src="/logo.png" alt="Logo" className="logo" />
              <h1>Bienvenido al Servidor</h1>
              <p>
                Desliza hacia la derecha o izquierda para ver el código QR o haz
                clic para iniciar sesión
              </p>
            </div>
            <div className="card-face card-back">
              <h2 className="text-2xl mb-4">Escanea para acceder</h2>
              <QRCode value="http://192.168.1.100" size={200} />
              <p>Desliza en cualquier dirección para volver</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
