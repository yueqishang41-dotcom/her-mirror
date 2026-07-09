import { useState, useEffect, useRef } from 'react';
import { questions } from '../data/constants';
import { safetyCheck } from '../utils/safetyCheck';

export default function QuestionPage({
  currentIndex,
  onNext,
  onSkip,
  onCrisis,
  onYellow,
  addAnswer,
  answers,
  onGoToQuestion
}) {
  const [input, setInput] = useState('');
  const [warning, setWarning] = useState(null); // null | 'diagnosis' | 'dependency' | 'emotional'
  const [showHistory, setShowHistory] = useState(false);
  const [showCrisisTransition, setShowCrisisTransition] = useState(false);
  const debounceTimer = useRef(null);

  const question = questions[currentIndex];

  // 切换问题时重置状态，并加载已有回答
  useEffect(() => {
    const existingAnswer = answers?.find(a => a.id === question.id);
    if (existingAnswer && !existingAnswer.skipped) {
      setInput(existingAnswer.answer || '');
    } else {
      setInput('');
    }
    setWarning(null);
    setShowHistory(false);
    setShowCrisisTransition(false);
  }, [currentIndex, answers, question.id]);

  // 处理红灯触发 - 显示温柔过渡
  const handleCrisisTrigger = () => {
    setShowCrisisTransition(true);
    // 3秒后跳转到危机页
    setTimeout(() => {
      onCrisis();
    }, 3000);
  };

  // 输入过程中的实时检测（debounce 500ms）
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // 如果已经在危机过渡中，不再检测
    if (showCrisisTransition) return;

    // 所有问题都进行危机检测
    if (input.trim()) {
      debounceTimer.current = setTimeout(() => {
        const light = safetyCheck(input.trim());

        // 红灯：显示温柔过渡，然后跳转危机页
        if (light === 'red') {
          handleCrisisTrigger();
          return;
        }

        // 黄灯：所有问题都显示警告提示
        if (light === 'yellow_diagnosis') {
          setWarning('diagnosis');
        } else if (light === 'yellow_dependency') {
          setWarning('dependency');
        } else if (light === 'yellow') {
          setWarning('emotional');
        } else {
          setWarning(null);
        }
      }, 500);
    } else {
      setWarning(null);
    }

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [input, showCrisisTransition]);

  const handleSubmit = () => {
    const answer = input.trim();
    const light = safetyCheck(answer);

    if (light === 'red') {
      handleCrisisTrigger();
      return;
    }

    if (light.startsWith('yellow')) {
      onYellow();
    }

    addAnswer(question.id, answer, answer === '');
    onNext();
  };

  const handleSkip = () => {
    addAnswer(question.id, '', true);
    onSkip();
  };

  // 已回答的问题列表
  const answeredQuestions = questions.filter((q, index) =>
    answers?.some(a => a.id === q.id && index < currentIndex)
  );

  // 危机过渡画面
  if (showCrisisTransition) {
    return (
      <div className="page-container" style={{
        background: 'linear-gradient(180deg, #FFFDF7 0%, #FBF6EC 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <p style={{
            fontSize: '24px',
            color: '#3C2415',
            marginBottom: '24px',
            lineHeight: '1.8',
            opacity: 0,
            animation: 'fadeIn 1s ease-out forwards'
          }}>
            我听到了。
          </p>
          <p style={{
            fontSize: '17px',
            color: '#6B7280',
            lineHeight: '2',
            opacity: 0,
            animation: 'fadeIn 1s ease-out forwards',
            animationDelay: '0.8s'
          }}>
            请稍等，我想给你看一些东西...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="content-wrapper">
        {/* 进度指示 - 可点击修改 */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '48px' }}>
          {questions.map((q, index) => {
            const isAnswered = answers?.some(a => a.id === q.id);
            const isCurrent = index === currentIndex;
            const isPast = index < currentIndex;

            return (
              <div
                key={q.id}
                onClick={() => {
                  if (isPast && onGoToQuestion) {
                    onGoToQuestion(index);
                  }
                }}
                className="progress-dot"
                style={{
                  background: isCurrent
                    ? '#C4956A'
                    : isAnswered
                      ? 'rgba(196, 149, 106, 0.5)'
                      : 'rgba(196, 149, 106, 0.2)',
                  cursor: isPast ? 'pointer' : 'default',
                  transition: 'all 0.2s'
                }}
                title={isPast ? '点击修改此问题的回答' : ''}
              />
            );
          })}
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
          style={{ marginBottom: '16px' }}
        />

        {/* 字数 */}
        <p style={{ fontSize: '13px', color: '#999', marginBottom: '16px' }}>
          {input.length} 字
        </p>

        {/* 警告提示（黄灯） */}
        {warning === 'diagnosis' && (
          <div className="warning-card" style={{
            background: '#FFFCF0',
            border: '1px solid #E8A838',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#B0811A',
            lineHeight: '1.7'
          }}>
            ⚠️ 我不能提供诊断或治疗建议。如果你正在经历困扰，建议寻求专业心理咨询师或医生的帮助。
          </div>
        )}

        {warning === 'dependency' && (
          <div className="warning-card" style={{
            background: '#FFFCF0',
            border: '1px solid #E8A838',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#B0811A',
            lineHeight: '1.7'
          }}>
            ⚠️ 我只是一次小小的体验，不能一直陪着你。但我很高兴，这几分钟对你有意义。
          </div>
        )}

        {warning === 'emotional' && (
          <div className="warning-card" style={{
            background: '#FFFCF0',
            border: '1px solid #E8A838',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            fontSize: '14px',
            color: '#B0811A',
            lineHeight: '1.7'
          }}>
            ⚠️ 我听到你正在经历一些困难。如果你需要，可以联系专业心理热线寻求帮助。
          </div>
        )}

        {/* 已回答问题提示 */}
        {answeredQuestions.length > 0 && !showHistory && (
          <button
            onClick={() => setShowHistory(true)}
            style={{
              fontSize: '13px',
              color: '#C4956A',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              marginBottom: '16px',
              padding: 0
            }}
          >
            查看已回答的问题 ({answeredQuestions.length}题)
          </button>
        )}

        {/* 已回答问题列表 */}
        {showHistory && (
          <div style={{
            background: 'rgba(196, 149, 106, 0.06)',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '24px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '12px'
            }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#3C2415' }}>
                已回答的问题
              </span>
              <button
                onClick={() => setShowHistory(false)}
                style={{
                  fontSize: '12px',
                  color: '#999',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                收起
              </button>
            </div>
            {answeredQuestions.map((q, index) => {
              const answer = answers?.find(a => a.id === q.id);
              const realIndex = questions.findIndex(quest => quest.id === q.id);
              return (
                <div
                  key={q.id}
                  onClick={() => onGoToQuestion && onGoToQuestion(realIndex)}
                  style={{
                    padding: '8px 0',
                    borderBottom: index < answeredQuestions.length - 1 ? '1px solid rgba(196, 149, 106, 0.15)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  <p style={{ fontSize: '12px', color: '#999', marginBottom: '4px' }}>
                    Q{q.id} · {q.label}
                  </p>
                  <p style={{
                    fontSize: '13px',
                    color: '#3C2415',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {answer?.skipped ? '(已跳过)' : answer?.answer}
                  </p>
                </div>
              );
            })}
          </div>
        )}

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