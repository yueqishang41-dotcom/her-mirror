import { useState, useEffect } from 'react';
import StarField from './StarField';

export default function PoemPage({ poem, onContinue }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = poem.split('\n').filter(line => line.trim());

  useEffect(() => {
    const timers = [];
    lines.forEach((_, index) => {
      timers.push(setTimeout(() => setVisibleLines(index + 1), index * 2200));
    });
    return () => timers.forEach(t => clearTimeout(t));
  }, [poem]);

  return (
    <div className="page-container" style={{
      background: '#000',
      overflow: 'hidden'
    }}>
      {/* 惊艳星空背景 - 手势可交互 */}
      <StarField intensity="intense" />

      {/* 诗内容 */}
      <div
        className="content-wrapper"
        style={{
          position: 'relative',
          zIndex: 1,
          paddingTop: '20px',
          pointerEvents: 'none'
        }}
      >
        {/* 顶部装饰 */}
        <div style={{
          fontSize: '28px',
          color: 'rgba(212, 165, 116, 0.4)',
          marginBottom: '40px',
          letterSpacing: '12px',
          textShadow: '0 0 20px rgba(212, 165, 116, 0.3)'
        }}>
          ✦ · · ✦
        </div>

        {/* 诗句 */}
        <div style={{ marginBottom: '48px' }}>
          {lines.map((line, index) => {
            const isLastLine = line.includes("这首诗的作者");
            const isQuoteLine = line.startsWith('"') && line.endsWith('"');

            return (
              <p
                key={index}
                className="poem-line"
                style={{
                  color: isQuoteLine ? '#D4A574' : 'rgba(255, 255, 255, 0.9)',
                  fontSize: isQuoteLine ? '24px' : '21px',
                  fontWeight: isQuoteLine ? 500 : 400,
                  lineHeight: '2.5',
                  textAlign: isLastLine ? 'right' : 'center',
                  marginBottom: '24px',
                  opacity: visibleLines > index ? 1 : 0,
                  transform: visibleLines > index ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 1.2s ease-out',
                  textShadow: `
                    0 0 10px rgba(255, 255, 255, 0.3),
                    ${isQuoteLine ? '0 0 30px rgba(212, 165, 116, 0.5)' : 'none'}
                  `,
                  letterSpacing: '1px'
                }}
              >
                {line}
              </p>
            );
          })}
        </div>

        {/* 底部装饰 */}
        {visibleLines >= lines.length && (
          <div style={{
            fontSize: '24px',
            color: 'rgba(212, 165, 116, 0.3)',
            marginBottom: '40px',
            letterSpacing: '6px',
            animation: 'fadeIn 1s ease-out'
          }}>
            · ✦ ·
          </div>
        )}
      </div>

      {/* 继续按钮 */}
      {visibleLines >= lines.length && (
        <button
          className="btn-primary"
          onClick={onContinue}
          style={{
            position: 'relative',
            zIndex: 2,
            borderColor: 'rgba(212, 165, 116, 0.5)',
            color: 'rgba(255, 255, 255, 0.8)',
            background: 'rgba(212, 165, 116, 0.1)',
            animation: 'fadeIn 1s ease-out',
            pointerEvents: 'auto'
          }}
        >
          继续 ↓
        </button>
      )}
    </div>
  );
}