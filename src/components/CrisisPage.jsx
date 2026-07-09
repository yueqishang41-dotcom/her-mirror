import { useState, useEffect } from 'react';
import { crisisResources } from '../data/constants';

export default function CrisisPage({ onExit, fromInput = false }) {
  const [step, setStep] = useState(0);

  const texts = [
    "我听到了。",
    "你说的这些，让我想停下来，认真地看着你。",
    "我只是一个小小的对话体验，没有办法真正帮到你。",
    "但我想让你知道，你值得被真正帮助。"
  ];

  useEffect(() => {
    const timers = [];
    // 逐步显示文字
    texts.forEach((_, index) => {
      timers.push(setTimeout(() => setStep(index + 1), (index + 1) * 1800));
    });
    // 最后显示资源
    timers.push(setTimeout(() => setStep(texts.length + 1), (texts.length + 1) * 1800));

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="page-container" style={{
      background: 'linear-gradient(180deg, #FFFDF7 0%, #FBF6EC 50%, #F5E6D0 100%)',
      minHeight: '100vh'
    }}>
      <div className="content-wrapper" style={{
        maxWidth: '480px',
        paddingTop: '60px'
      }}>
        {/* 温柔的文字 */}
        {texts.map((text, index) => (
          <p
            key={index}
            style={{
              fontSize: index === 0 ? '26px' : '17px',
              color: index === 0 ? '#3C2415' : '#6B7280',
              fontWeight: index === 0 ? 400 : 300,
              marginBottom: '28px',
              lineHeight: index === 0 ? '1.6' : '2',
              whiteSpace: 'pre-line',
              opacity: step > index ? 1 : 0,
              transform: step > index ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 1.2s ease-out',
              letterSpacing: '0.5px'
            }}
          >
            {text}
          </p>
        ))}

        {/* 资源卡片 */}
        {step > texts.length && (
          <div style={{
            opacity: 0,
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '0.3s'
          }}>
            <p style={{
              fontSize: '15px',
              color: '#C4956A',
              marginBottom: '20px',
              fontWeight: 500
            }}>
              以下是一些可以帮助到你的人：
            </p>

            <div style={{ marginBottom: '28px' }}>
              {crisisResources.slice(0, 3).map((resource, index) => (
                <div
                  key={index}
                  className="crisis-card"
                  style={{
                    background: '#FFFCF5',
                    border: '1px solid rgba(196, 149, 106, 0.2)',
                    borderRadius: '12px',
                    padding: '16px 20px',
                    marginBottom: '12px',
                    opacity: 0,
                    animation: 'fadeIn 0.6s ease-out forwards',
                    animationDelay: `${index * 0.15 + 0.5}s`
                  }}
                >
                  <p style={{
                    fontWeight: 500,
                    color: '#3C2415',
                    marginBottom: '4px',
                    fontSize: '14px'
                  }}>
                    {resource.name}
                  </p>
                  <p style={{
                    fontSize: '18px',
                    color: '#C4956A',
                    fontWeight: 500,
                    letterSpacing: '0.5px'
                  }}>
                    {resource.number}
                  </p>
                </div>
              ))}
            </div>

            <p style={{
              fontSize: '15px',
              color: '#6B7280',
              marginBottom: '40px',
              lineHeight: '1.8'
            }}>
              你值得被真正帮助。
            </p>

            <button
              onClick={onExit}
              style={{
                background: 'transparent',
                border: '1px solid rgba(196, 149, 106, 0.4)',
                borderRadius: '24px',
                padding: '12px 32px',
                fontSize: '15px',
                color: '#C4956A',
                cursor: 'pointer',
                transition: 'all 0.3s',
                opacity: 0,
                animation: 'fadeIn 0.8s ease-out forwards',
                animationDelay: '1.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(196, 149, 106, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'transparent';
              }}
            >
              我已知晓，退出体验
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
