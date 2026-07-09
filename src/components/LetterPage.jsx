import { useState, useEffect } from 'react';

export default function LetterPage({ letter, onContinue }) {
  const [phase, setPhase] = useState('envelope'); // 'envelope' -> 'content'
  const [visible, setVisible] = useState(false);
  const [envelopeHover, setEnvelopeHover] = useState(false);

  useEffect(() => {
    if (phase === 'content') {
      setTimeout(() => setVisible(true), 500);
    }
  }, [phase]);

  const handleEnvelopeClick = () => {
    setPhase('content');
  };

  const paragraphs = letter.split('\n').filter(p => p.trim());

  return (
    <div className="page-container" style={{
      background: 'linear-gradient(160deg, #F5E6D0 0%, #FBF6EC 30%, #F5E6D0 100%)'
    }}>
      <div className="content-wrapper" style={{
        minHeight: '300px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* 信封阶段 */}
        {phase === 'envelope' && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'envelopeIn 1s ease-out'
          }}>
            {/* 信封 SVG */}
            <div
              onClick={handleEnvelopeClick}
              onMouseEnter={() => setEnvelopeHover(true)}
              onMouseLeave={() => setEnvelopeHover(false)}
              style={{
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                transform: envelopeHover ? 'scale(1.05)' : 'scale(1)',
                filter: envelopeHover ? 'drop-shadow(0 12px 32px rgba(196, 149, 106, 0.3))' : 'drop-shadow(0 8px 24px rgba(60, 36, 21, 0.2))'
              }}
            >
              <svg
                width="180"
                height="130"
                viewBox="0 0 180 130"
              >
                {/* 信封主体 */}
                <rect x="5" y="35" width="170" height="95" rx="6" fill="#F5E6D0" stroke="#C4956A" strokeWidth="1.5"/>

                {/* 信封盖子 */}
                <path
                  d="M 5 35 L 90 90 L 175 35"
                  fill="none"
                  stroke="#C4956A"
                  strokeWidth="2"
                />

                {/* 封口贴纸 */}
                <circle cx="90" cy="50" r="20" fill="#C4956A" opacity="0.15"/>
                <circle cx="90" cy="50" r="18" fill="none" stroke="#C4956A" strokeWidth="1" opacity="0.3"/>

                {/* 装饰爱心 */}
                <text x="90" y="55" textAnchor="middle" fontSize="18" fill="#C4956A">
                  ♥
                </text>

                {/* 星星装饰 */}
                <text x="40" y="60" fontSize="10" fill="#C4956A" opacity="0.4">✦</text>
                <text x="145" y="65" fontSize="8" fill="#C4956A" opacity="0.3">✦</text>
              </svg>
            </div>

            {/* 提示文字 */}
            <p style={{
              marginTop: '32px',
              fontSize: '16px',
              color: '#6B7280',
              animation: 'fadeIn 1s ease-out',
              transition: 'all 0.3s ease',
              opacity: envelopeHover ? 1 : 0.7
            }}>
              点击信封，打开属于你的信
            </p>

            {/* 小提示 */}
            <p style={{
              marginTop: '12px',
              fontSize: '13px',
              color: '#999',
              animation: 'fadeIn 1s ease-out 0.3s'
            }}>
              ✉️
            </p>
          </div>
        )}

        {/* 信纸内容 */}
        {phase === 'content' && (
          <>
            <div className="letter-paper" style={{
              animation: visible ? 'paperReveal 1s ease-out' : 'none',
              width: '100%',
              maxWidth: '400px',
              opacity: visible ? 1 : 0
            }}>
              {/* 顶部装饰 */}
              <div style={{
                textAlign: 'center',
                marginBottom: '20px',
                fontSize: '20px',
                color: 'rgba(196, 149, 106, 0.4)',
                letterSpacing: '4px'
              }}>
                ✦ · · ✦
              </div>

              {paragraphs.map((paragraph, index) => {
                const isSignature = paragraph.includes('你自己') && !paragraph.includes('说');
                const isQuote = paragraph.startsWith('"') || paragraph.startsWith('你说');

                return (
                  <p
                    key={index}
                    style={{
                      color: isSignature ? '#C4956A' : '#3C2415',
                      fontSize: '16px',
                      lineHeight: '2.1',
                      marginBottom: '18px',
                      textAlign: isSignature ? 'right' : 'left',
                      fontWeight: isQuote ? 500 : 400,
                      fontStyle: isQuote ? 'italic' : 'normal'
                    }}
                  >
                    {paragraph}
                  </p>
                );
              })}

              {/* 底部装饰 */}
              <div style={{
                textAlign: 'center',
                marginTop: '28px',
                fontSize: '18px',
                color: 'rgba(196, 149, 106, 0.35)',
                letterSpacing: '3px'
              }}>
                · ✦ ·
              </div>
            </div>

            {/* 继续按钮 */}
            {visible && (
              <button
                className="btn-primary"
                onClick={onContinue}
                style={{
                  marginTop: '40px',
                  opacity: 0,
                  animation: 'fadeIn 0.8s ease-out forwards'
                }}
              >
                继续 ↓
              </button>
            )}
          </>
        )}
      </div>

      {/* CSS 动画 */}
      <style>{`
        @keyframes envelopeIn {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.85);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes paperReveal {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}