import { useState, useEffect } from 'react';

export default function IntroPage({ onReady }) {
  const [step, setStep] = useState(0);

  const texts = [
    "接下来我会问你几个问题。",
    "没有标准答案。\n不需要说得漂亮。\n想到什么就说什么就好。",
    "这不是测试。不是诊断。不是治疗。\n只是让你有机会，用自己的话说说你自己。",
    "如果有一个问题你不想回答，可以跳过。\n这是你的时间。"
  ];

  useEffect(() => {
    const timers = [];
    texts.forEach((_, index) => {
      timers.push(setTimeout(() => setStep(index + 1), (index + 1) * 1400));
    });
    timers.push(setTimeout(() => setStep(texts.length + 1), (texts.length + 1) * 1400 + 300));
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {texts.map((text, index) => (
          <p
            key={index}
            style={{
              fontSize: '17px',
              color: index === 2 ? '#C4956A' : '#3C2415',
              marginBottom: '28px',
              lineHeight: '1.9',
              whiteSpace: 'pre-line',
              opacity: step > index ? 1 : 0,
              transform: step > index ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.1s'
            }}
          >
            {text}
          </p>
        ))}

        {step > texts.length && (
          <button
            className="btn-primary"
            onClick={onReady}
            style={{
              marginTop: '20px',
              opacity: 0,
              animation: 'fadeIn 0.8s ease-out forwards'
            }}
          >
            准备好了
          </button>
        )}
      </div>
    </div>
  );
}