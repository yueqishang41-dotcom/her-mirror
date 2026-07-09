import { useEffect, useRef, useState } from 'react';

export default function StarField({ intensity = 'normal' }) {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isMoving, setIsMoving] = useState(false);
  const moveTimeout = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const starCount = intensity === 'intense' ? 200 : 100;
    const stars = [];

    for (let i = 0; i < starCount; i++) {
      const star = document.createElement('div');
      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.8 + 0.2;
      const duration = Math.random() * 3 + 2;
      const delay = Math.random() * 5;

      star.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: white;
        border-radius: 50%;
        left: ${x}%;
        top: ${y}%;
        opacity: ${opacity};
        box-shadow: 0 0 ${size * 2}px rgba(255, 255, 255, 0.5);
        animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
        transition: transform 0.1s ease-out;
      `;

      container.appendChild(star);
      stars.push({ element: star, originalX: x, originalY: y });
    }

    const createMeteor = () => {
      const meteor = document.createElement('div');
      const startX = Math.random() * 100;
      const duration = Math.random() * 2 + 1;

      meteor.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: linear-gradient(45deg, rgba(255,255,255,0.8), transparent);
        left: ${startX}%;
        top: 0;
        opacity: 0;
        animation: meteor ${duration}s ease-out forwards;
        box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      `;

      container.appendChild(meteor);
      setTimeout(() => meteor.remove(), duration * 1000);
    };

    const meteorInterval = setInterval(() => {
      if (Math.random() > 0.7) createMeteor();
    }, 500);

    const handleMove = (clientX, clientY) => {
      const rect = container.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;

      setMousePos({ x, y });
      setIsMoving(true);

      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => setIsMoving(false), 100);

      stars.forEach((star, i) => {
        const offsetX = (x - 0.5) * (10 + i * 0.1);
        const offsetY = (y - 0.5) * (10 + i * 0.1);
        star.element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      });
    };

    const handleMouseMove = (e) => handleMove(e.clientX, e.clientY);
    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        handleMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove);

    return () => {
      stars.forEach(star => star.element.remove());
      clearInterval(meteorInterval);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [intensity]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0
      }}
    >
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at center, #1a1a2e 0%, #0a0a15 50%, #000 100%)'
      }} />

      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        background: `
          radial-gradient(ellipse at 20% 30%, rgba(138, 43, 226, 0.1) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 70%, rgba(72, 61, 139, 0.08) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 50%, rgba(25, 25, 112, 0.1) 0%, transparent 70%)
        `,
        opacity: isMoving ? 0.8 : 0.5,
        transition: 'opacity 0.3s'
      }} />

      <div style={{
        position: 'absolute',
        width: '200%',
        height: '200%',
        left: '-50%',
        top: '-50%',
        background: `radial-gradient(ellipse at 50% 50%, rgba(255, 255, 255, 0.03) 0%, transparent 50%)`,
        transform: `translate(${(mousePos.x - 0.5) * 20}px, ${(mousePos.y - 0.5) * 20}px)`,
        transition: 'transform 0.3s ease-out'
      }} />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes meteor {
          0% { transform: translate(0, 0) rotate(45deg); opacity: 1; }
          100% { transform: translate(-200px, 200px) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}