import { useState } from 'react';

/**
 * 状态管理 Hook
 */
export function useAppState() {
  // 当前页面
  const [currentPage, setCurrentPage] = useState('landing');
  // 'landing' | 'intro' | 'question' | 'transition' | 'poem' | 'garden' | 'letter' | 'ending' | 'crisis'

  // 当前问题索引 (0-7)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // 用户回答
  const [answers, setAnswers] = useState([]);

  // AI 生成的结果
  const [generated, setGenerated] = useState({
    poem: null,
    letter: null,
    loading: false,
    error: null
  });

  // 危机状态
  const [crisisDetected, setCrisisDetected] = useState(false);

  // 黄灯状态（情绪走低）
  const [yellowLightDetected, setYellowLightDetected] = useState(false);

  // 添加回答
  const addAnswer = (questionId, answer, skipped = false) => {
    setAnswers(prev => [...prev, {
      id: questionId,
      answer: answer || '(跳过)',
      skipped: skipped || answer === ''
    }]);
  };

  // 下一题
  const nextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
  };

  // 重置
  const reset = () => {
    setCurrentPage('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setGenerated({ poem: null, letter: null, loading: false, error: null });
    setCrisisDetected(false);
    setYellowLightDetected(false);
  };

  return {
    currentPage,
    setCurrentPage,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    addAnswer,
    nextQuestion,
    generated,
    setGenerated,
    crisisDetected,
    setCrisisDetected,
    yellowLightDetected,
    setYellowLightDetected,
    reset
  };
}