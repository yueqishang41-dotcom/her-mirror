import { useState, useEffect } from 'react';
import { questions } from '../data/constants';
import { safetyCheck } from '../utils/safetyCheck';

export default function QuestionPage({
  currentIndex,
  onNext,
  onSkip,
  onCrisis,
  onYellow,
  addAnswer
}) {
  const [input, setInput] = useState('');

  const question = questions[currentIndex];

  useEffect(() => {
    setInput('');
  }, [currentIndex]);

  const handleSubmit = () => {
    const answer = input.trim();
    const light = safetyCheck(answer);

    if (light === 'red') {
      onCrisis();
      return;
    }

    if (light === 'yellow') {
      onYellow();
    }

    addAnswer(question.id, answer, answer === '');
    onNext();
  };

  const handleSkip = () => {
    addAnswer(question.id, '', true);
    onSkip();
  };

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* 进度指示 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '48px' }}>
          {questions.map((q, index) => (
            <div
              key={q.id}
              className="progress-dot"
              style={{
                background: index === currentIndex
                  ? '#C4956A'
                  : index < currentIndex
                    ? 'rgba(196, 149, 106, 0.5)'
                    : 'rgba(196, 149, 106, 0.2)'
              }}
            />
          ))}
        </div>

        {/* 问题文字 */}
        <p style={{
          fontSize: '22px',
          color: '#3C2415',
          marginBottom: '32px',
          lineHeight: '1.8',
          fontWeight: 400
        }}>
          {question.text}
        </p>

        {/* 提示 */}
        <p style={{
          fontSize: '14px',
          color: '#999',
          marginBottom: '24px',
          lineHeight: '1.6'
        }}>
          {question.hint}
        </p>

        {/* 输入框 */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="text-input"
          placeholder="想到什么就写什么..."
          style={{ marginBottom: '24px' }}
        />

        {/* 字数 */}
        <p style={{ fontSize: '13px', color: '#999', marginBottom: '32px' }}>
          {input.length} 字
        </p>

        {/* 按钮区域 */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <button className="btn-text" onClick={handleSkip}>
            跳过这个问题
          </button>

          <button
            className={currentIndex === 7 ? 'btn-secondary' : 'btn-primary'}
            onClick={handleSubmit}
          >
            {currentIndex === 7 ? '完成 →' : '下一步 →'}
          </button>
        </div>
      </div>
    </div>
  );
}