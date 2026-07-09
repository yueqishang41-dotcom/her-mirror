import { useAppState } from './hooks/useAppState';
import LandingPage from './components/LandingPage';
import IntroPage from './components/IntroPage';
import QuestionPage from './components/QuestionPage';
import CrisisPage from './components/CrisisPage';
import TransitionPage from './components/TransitionPage';
import PoemPage from './components/PoemPage';
import GardenPage from './components/GardenPage';
import LetterPage from './components/LetterPage';
import EndingPage from './components/EndingPage';
import { questions } from './data/constants';
import './index.css';

function App() {
  const {
    currentPage,
    setCurrentPage,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswers,
    addAnswer,
    generated,
    setGenerated,
    crisisDetected,
    setCrisisDetected,
    reset
  } = useAppState();

  // 处理开始
  const handleStart = () => {
    setCurrentPage('intro');
  };

  // 处理准备好了
  const handleReady = () => {
    setCurrentPage('question');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  // 处理下一题
  const handleNextQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      // 所有问题完成，进入过渡页
      setCurrentPage('transition');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 处理跳过
  const handleSkipQuestion = () => {
    if (currentQuestionIndex >= questions.length - 1) {
      setCurrentPage('transition');
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // 处理危机
  const handleCrisis = () => {
    setCrisisDetected(true);
    setCurrentPage('crisis');
  };

  // 处理黄灯（情绪走低）
  const handleYellow = () => {
    // 继续流程，但记录状态
  };

  // 处理退出
  const handleExit = () => {
    reset();
  };

  // 处理过渡页继续
  const handleTransitionContinue = () => {
    setCurrentPage('poem');
  };

  // 处理诗页继续
  const handlePoemContinue = () => {
    setCurrentPage('garden');
  };

  // 处理花园页继续
  const handleGardenContinue = () => {
    setCurrentPage('letter');
  };

  // 处理信页继续
  const handleLetterContinue = () => {
    setCurrentPage('ending');
  };

  // 处理重新开始
  const handleRestart = () => {
    reset();
  };

  return (
    <div className="min-h-screen">
      {/* 着陆页 */}
      {currentPage === 'landing' && (
        <LandingPage onStart={handleStart} />
      )}

      {/* 预期设定页 */}
      {currentPage === 'intro' && (
        <IntroPage onReady={handleReady} />
      )}

      {/* 问题页 */}
      {currentPage === 'question' && (
        <QuestionPage
          currentIndex={currentQuestionIndex}
          onNext={handleNextQuestion}
          onSkip={handleSkipQuestion}
          onCrisis={handleCrisis}
          onYellow={handleYellow}
          addAnswer={addAnswer}
        />
      )}

      {/* 危机页 */}
      {currentPage === 'crisis' && (
        <CrisisPage onExit={handleExit} />
      )}

      {/* 过渡页 */}
      {currentPage === 'transition' && (
        <TransitionPage
          onContinue={handleTransitionContinue}
          setGenerated={setGenerated}
          answers={answers}
        />
      )}

      {/* 诗页 */}
      {currentPage === 'poem' && (
        <PoemPage
          poem={generated.poem || ''}
          onContinue={handlePoemContinue}
        />
      )}

      {/* 花园页 */}
      {currentPage === 'garden' && (
        <GardenPage
          answers={answers}
          onContinue={handleGardenContinue}
        />
      )}

      {/* 信页 */}
      {currentPage === 'letter' && (
        <LetterPage
          letter={generated.letter || ''}
          onContinue={handleLetterContinue}
        />
      )}

      {/* 结尾页 */}
      {currentPage === 'ending' && (
        <EndingPage
          poem={generated.poem || ''}
          letter={generated.letter || ''}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;