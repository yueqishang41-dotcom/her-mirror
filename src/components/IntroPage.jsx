import { useState, useEffect } from 'react';

export default function IntroPage({ onReady }) {
  const [step, setStep] = useState(0);

  const texts = [
    "接下来我会问你几个问题。",
    "没有标准答案。\n不需要说得漂亮。\n想到什么就说什么就好。",
    "这不是测试。不是诊断。不是治疗。\n只是让你有机会，用自己的话说说你自己。",
    "这些问题从记忆 → 感受 → 身份逐步深入，\n帮你说出一直没机会说的话。",
    "如果有一个问题你不想回答，可以跳过。\n这是你的时间。",
    "─────────────────────────────────────",
    "你的隐私",
    "• 你的回答不会被保存到服务器\n• 回答会发送给 AI 服务生成总结，但不会被存储\n• 你可以随时关闭页面，一切都会消失\n• 这是你的时间，只有你能看到"
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
              fontSize: index === 3 || index === 7 ? '15px' : '17px',
              color: index === 2 ? '#C4956A' : index >= 6 ? '#6B7280' : '#3C2415',
              marginBottom: index === 5 ? '24px' : '20px',
              marginTop: index === 6 ? '24px' : '0',
              lineHeight: '1.9',
              whiteSpace: 'pre-line',
              opacity: step > index ? 1 : 0,
              transform: step > index ? 'translateY(0)' : 'translateY(15px)',
              transition: 'all 0.8s ease-out',
              transitionDelay: '0.1s',
              fontWeight: index === 6 ? 500 : 400
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
              marginTop: '32px',
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