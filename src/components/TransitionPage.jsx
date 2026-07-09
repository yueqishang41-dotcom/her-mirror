import { useState, useEffect } from 'react';
import StarField from './StarField';

export default function TransitionPage({ onContinue, setGenerated, answers }) {
  const [step, setStep] = useState(0);
  const [bgDark, setBgDark] = useState(false);
  const [error, setError] = useState(null);

  const texts = [
    "谢谢你。",
    "我把你说的每一句话都好好收起来了。",
    "现在，我想把它们还给你。\n用一种你可能从没见过的方式。"
  ];

  useEffect(() => {
    const timers = [];
    texts.forEach((_, index) => {
      timers.push(setTimeout(() => setStep(index + 1), (index + 1) * 1400));
    });
    timers.push(setTimeout(() => setBgDark(true), 1800));

    // 调用真实 API
    timers.push(setTimeout(async () => {
      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ answers })
        });

        if (response.ok) {
          const data = await response.json();
          setGenerated({
            poem: data.poem,
            letter: data.letter,
            loading: false,
            error: null
          });
        } else {
          // API 失败，使用本地生成
          setError('api_failed');
          setGenerated({
            poem: generateLocalPoem(answers),
            letter: generateLocalLetter(answers),
            loading: false,
            error: 'api_failed'
          });
        }
      } catch (err) {
        // 网络错误，使用本地生成
        if (err.message.includes('network') || err.message.includes('fetch')) {
          setError('network_off');
        } else {
          setError('api_failed');
        }
        setGenerated({
          poem: generateLocalPoem(answers),
          letter: generateLocalLetter(answers),
          loading: false,
          error: err.message
        });
      }
    }, 1200));

    timers.push(setTimeout(() => setStep(texts.length + 1), (texts.length + 1) * 1400 + 400));
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // 本地生成函数（备用）
  const generateLocalPoem = (answers) => {
    const validAnswers = answers.filter(a => !a.skipped && a.answer);

    if (validAnswers.length === 0) {
      return "你选择不说话，这也是一种回答。\n有时候，沉默本身就是一种力量。\n\n——这首诗的作者，是你自己。";
    }

    const lines = [];
    const q1 = answers.find(a => a.id === 1);
    if (q1 && !q1.skipped) lines.push(`她说她小时候最爱 ${q1.answer}`);
    const q2 = answers.find(a => a.id === 2);
    if (q2 && !q2.skipped) lines.push(`她说她做过最勇敢的事是 ${q2.answer}`);
    const q6 = answers.find(a => a.id === 6);
    if (q6 && !q6.skipped) lines.push(`她说真正的她 ${q6.answer}`);
    const q8 = answers.find(a => a.id === 8);
    if (q8 && !q8.skipped) lines.push(`"${q8.answer}"`);
    lines.push("——这首诗的作者，是你自己。");
    return lines.join('\n');
  };

  const generateLocalLetter = (answers) => {
    const date = new Date();
    const dateStr = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;

    const validAnswers = answers.filter(a => !a.skipped && a.answer);

    if (validAnswers.length === 0) {
      return `嗨，是我。\n\n你选择不说话。\n那我就安静地陪着你。\n\n有时候，不需要说什么。\n你的沉默，我也听见了。\n\n你自己\n${dateStr}`;
    }

    let letter = `嗨，是我。\n\n你刚才说了很多话。也许你觉得都是些小事。\n但我想告诉你，我都听见了。\n\n`;
    validAnswers.slice(0, 3).forEach(a => {
      letter += `你说 "${a.answer}"。\n`;
    });
    const q8 = answers.find(a => a.id === 8);
    if (q8 && !q8.skipped) letter += `\n你说你是 "${q8.answer}"。我记住这句话了。\n\n`;
    letter += `今天，你自己说出来了这些。\n不是我说的，不是任何人替你说的。\n是你。\n\n你自己\n${dateStr}`;
    return letter;
  };

  return (
    <div className="page-container" style={{
      background: bgDark ? '#000' : '#FFFDF7',
      transition: 'background 3s ease',
      overflow: 'hidden'
    }}>
      {bgDark && <StarField intensity="intense" />}

      <div className="content-wrapper" style={{ position: 'relative', zIndex: 1 }}>
        {texts.map((text, index) => (
          <p
            key={index}
            style={{
              fontSize: '20px',
              color: bgDark ? 'rgba(255, 255, 255, 0.9)' : '#3C2415',
              marginBottom: '32px',
              lineHeight: '2',
              whiteSpace: 'pre-line',
              opacity: step > index ? 1 : 0,
              transform: step > index ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 1s ease-out',
              textShadow: bgDark ? '0 0 20px rgba(255, 255, 255, 0.2)' : 'none',
              letterSpacing: '1px'
            }}
          >
            {text}
          </p>
        ))}

        {/* 优雅失败提示 */}
        {error && step > texts.length && (
          <p
            style={{
              fontSize: '15px',
              color: bgDark ? 'rgba(212, 165, 116, 0.7)' : '#6B7280',
              marginBottom: '24px',
              lineHeight: '1.8',
              opacity: 0,
              animation: 'fadeIn 0.8s ease-out forwards',
              textShadow: bgDark ? '0 0 10px rgba(212, 165, 116, 0.3)' : 'none'
            }}
          >
            {error === 'network_off'
              ? "网络好像断了。你的话已经被你看见。你可以继续往下走，截图保存你的回答。"
              : "我暂时没法帮你整理了。但你的话已经被你看见。你可以继续往下走，截图保存这一页。"}
          </p>
        )}

        {step > texts.length && (
          <button
            className="btn-primary"
            onClick={onContinue}
            style={{
              marginTop: '32px',
              opacity: 0,
              animation: 'fadeIn 0.8s ease-out forwards',
              borderColor: 'rgba(212, 165, 116, 0.5)',
              color: 'rgba(255, 255, 255, 0.85)',
              background: 'rgba(212, 165, 116, 0.1)'
            }}
          >
            继续 ↓
          </button>
        )}
      </div>
    </div>
  );
}