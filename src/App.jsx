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
import HelpPage from './components/HelpPage';
import AIAssistant from './components/AIAssistant';
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

  // 处理跳转到特定问题（修改已回答问题）
  const handleGoToQuestion = (index) => {
    setCurrentQuestionIndex(index);
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

  // 处理打开帮助页
  const handleOpenHelp = () => {
    setCurrentPage('help');
  };

  // 处理关闭帮助页
  const handleCloseHelp = () => {
    setCurrentPage('landing');
  };

  // 帮助按钮组件（显示在多个页面右上角）
  const HelpButton = () => (
    <button
      onClick={handleOpenHelp}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: 'rgba(196, 149, 106, 0.1)',
        border: '1px solid rgba(196, 149, 106, 0.3)',
        borderRadius: '20px',
        padding: '8px 16px',
        fontSize: '13px',
        color: '#C4956A',
        cursor: 'pointer',
        transition: 'all 0.2s',
        zIndex: 100
      }}
      onMouseOver={(e) => {
        e.target.style.background = 'rgba(196, 149, 106, 0.2)';
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'rgba(196, 149, 106, 0.1)';
      }}
    >
      需要帮助？
    </button>
  );

  return (
    <div className="min-h-screen">
      {/* 帮助按钮 - 在非帮助页面显示 */}
      {currentPage !== 'help' && currentPage !== 'crisis' && <HelpButton />}

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
          answers={answers}
          onGoToQuestion={handleGoToQuestion}
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

      {/* 帮助页 */}
      {currentPage === 'help' && (
        <HelpPage onClose={handleCloseHelp} />
      )}

      {/* AI 助手 - 在危机页以外显示 */}
      {currentPage !== 'crisis' && <AIAssistant />}
    </div>
  );
}

export default App;