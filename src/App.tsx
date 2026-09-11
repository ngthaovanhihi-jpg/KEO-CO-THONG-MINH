import React, { useState, useEffect, useRef } from 'react';
import { Question, TeamSide, GameMode, GameStatus } from './types';
import {
  DEFAULT_LEFT_QUESTIONS,
  DEFAULT_RIGHT_QUESTIONS,
} from './data/defaultQuestions';
import { sound } from './utils/audio';
import { GameControls } from './components/GameControls';
import { TugOfWarArena } from './components/TugOfWarArena';
import { QuestionCard } from './components/QuestionCard';
import { QuestionManagerModal } from './components/QuestionManagerModal';
import { GameOverModal } from './components/GameOverModal';
import { RulesModal } from './components/RulesModal';

const MAX_STEPS_TO_WIN = 5; // Reaching +/- 5 steps triggers knockout win
const TOTAL_QUESTIONS_DEFAULT = 10;

export default function App() {
  // Questions State with LocalStorage cache
  const [leftQuestions, setLeftQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('tug_war_left_questions');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_LEFT_QUESTIONS;
  });

  const [rightQuestions, setRightQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem('tug_war_right_questions');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_RIGHT_QUESTIONS;
  });

  // Game Logic States
  const [gameMode, setGameMode] = useState<GameMode>('turn_based');
  const [currentTurn, setCurrentTurn] = useState<TeamSide>('left'); // left goes first
  const [leftQuestionIdx, setLeftQuestionIdx] = useState<number>(0);
  const [rightQuestionIdx, setRightQuestionIdx] = useState<number>(0);

  // Current selections
  const [leftSelectedAnswer, setLeftSelectedAnswer] = useState<number | null>(null);
  const [leftAnswerSubmitted, setLeftAnswerSubmitted] = useState<boolean>(false);

  const [rightSelectedAnswer, setRightSelectedAnswer] = useState<number | null>(null);
  const [rightAnswerSubmitted, setRightAnswerSubmitted] = useState<boolean>(false);

  // Scores & Rope Displacement:
  // negative numbers = pulled left towards Team Xanh
  // positive numbers = pulled right towards Team Đỏ
  // 0 = dead center at the middle line
  const [ropePosition, setRopePosition] = useState<number>(0);
  const [leftScore, setLeftScore] = useState<number>(0);
  const [rightScore, setRightScore] = useState<number>(0);

  // Visual effects
  const [lastPullSide, setLastPullSide] = useState<TeamSide | null>(null);
  const [lastActionResult, setLastActionResult] = useState<'correct' | 'wrong' | null>(null);

  // Modals & Settings
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isQuestionManagerOpen, setIsQuestionManagerOpen] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<TeamSide | 'draw' | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const autoAdvanceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Persist custom questions in LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('tug_war_left_questions', JSON.stringify(leftQuestions));
    } catch {
      // ignore
    }
  }, [leftQuestions]);

  useEffect(() => {
    try {
      localStorage.setItem('tug_war_right_questions', JSON.stringify(rightQuestions));
    } catch {
      // ignore
    }
  }, [rightQuestions]);

  // Sync sound settings
  useEffect(() => {
    sound.enabled = soundEnabled;
  }, [soundEnabled]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    };
  }, []);

  const totalQuestions = Math.min(
    TOTAL_QUESTIONS_DEFAULT,
    Math.max(leftQuestions.length, rightQuestions.length)
  );

  // Check Game Over conditions
  const checkGameOver = (currentRope: number, lIdx: number, rIdx: number) => {
    // 1. Knockout win if rope pulled past max threshold
    if (currentRope <= -MAX_STEPS_TO_WIN) {
      setWinner('left');
      setIsGameOver(true);
      return true;
    }
    if (currentRope >= MAX_STEPS_TO_WIN) {
      setWinner('right');
      setIsGameOver(true);
      return true;
    }

    // 2. Completed all questions
    const leftFinished = lIdx >= totalQuestions;
    const rightFinished = rIdx >= totalQuestions;

    if (leftFinished && rightFinished) {
      if (currentRope < 0) {
        setWinner('left');
      } else if (currentRope > 0) {
        setWinner('right');
      } else {
        // Tied rope, check correct score
        if (leftScore > rightScore) setWinner('left');
        else if (rightScore > leftScore) setWinner('right');
        else setWinner('draw');
      }
      setIsGameOver(true);
      return true;
    }

    return false;
  };

  // Handle Left Team submitting an answer
  const handleSelectLeftAnswer = (optionIdx: number) => {
    if (leftAnswerSubmitted || isGameOver) return;
    if (gameMode === 'turn_based' && currentTurn !== 'left') return;

    setLeftSelectedAnswer(optionIdx);
    setLeftAnswerSubmitted(true);

    const currentQ = leftQuestions[leftQuestionIdx];
    const isCorrect = currentQ && optionIdx === currentQ.correctAnswer;

    setLastPullSide('left');

    if (isCorrect) {
      sound.playCorrect();
      sound.playPull();
      const newScore = leftScore + 1;
      const newRope = ropePosition - 1; // Pull left
      setLeftScore(newScore);
      setRopePosition(newRope);
      setLastActionResult('correct');

      // Check win
      if (checkGameOver(newRope, leftQuestionIdx + 1, rightQuestionIdx)) {
        return;
      }
    } else {
      sound.playWrong();
      setLastActionResult('wrong');
      // "trường hợp trả lời sai câu hỏi thì đoạn dây vẫn đứng yên"
    }

    // Auto-advance after feedback pause
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    autoAdvanceTimerRef.current = setTimeout(() => {
      advanceLeftQuestion();
    }, 2000);
  };

  // Handle Right Team submitting an answer
  const handleSelectRightAnswer = (optionIdx: number) => {
    if (rightAnswerSubmitted || isGameOver) return;
    if (gameMode === 'turn_based' && currentTurn !== 'right') return;

    setRightSelectedAnswer(optionIdx);
    setRightAnswerSubmitted(true);

    const currentQ = rightQuestions[rightQuestionIdx];
    const isCorrect = currentQ && optionIdx === currentQ.correctAnswer;

    setLastPullSide('right');

    if (isCorrect) {
      sound.playCorrect();
      sound.playPull();
      const newScore = rightScore + 1;
      const newRope = ropePosition + 1; // Pull right
      setRightScore(newScore);
      setRopePosition(newRope);
      setLastActionResult('correct');

      // Check win
      if (checkGameOver(newRope, leftQuestionIdx, rightQuestionIdx + 1)) {
        return;
      }
    } else {
      sound.playWrong();
      setLastActionResult('wrong');
      // "trường hợp trả lời sai câu hỏi thì đoạn dây vẫn đứng yên"
    }

    // Auto-advance after feedback pause
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    autoAdvanceTimerRef.current = setTimeout(() => {
      advanceRightQuestion();
    }, 2000);
  };

  // Next Question for Left Team
  const advanceLeftQuestion = () => {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    const nextIdx = leftQuestionIdx + 1;
    setLeftQuestionIdx(nextIdx);
    setLeftSelectedAnswer(null);
    setLeftAnswerSubmitted(false);

    if (gameMode === 'turn_based') {
      // Pass turn to Right team unless Right team already finished
      if (rightQuestionIdx < totalQuestions) {
        setCurrentTurn('right');
      }
    }

    checkGameOver(ropePosition, nextIdx, rightQuestionIdx);
  };

  // Next Question for Right Team
  const advanceRightQuestion = () => {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    const nextIdx = rightQuestionIdx + 1;
    setRightQuestionIdx(nextIdx);
    setRightSelectedAnswer(null);
    setRightAnswerSubmitted(false);

    if (gameMode === 'turn_based') {
      // Pass turn to Left team unless Left team already finished
      if (leftQuestionIdx < totalQuestions) {
        setCurrentTurn('left');
      }
    }

    checkGameOver(ropePosition, leftQuestionIdx, nextIdx);
  };

  // Restart Match
  const handleRestart = () => {
    if (autoAdvanceTimerRef.current) clearTimeout(autoAdvanceTimerRef.current);
    setRopePosition(0);
    setLeftScore(0);
    setRightScore(0);
    setLeftQuestionIdx(0);
    setRightQuestionIdx(0);
    setLeftSelectedAnswer(null);
    setLeftAnswerSubmitted(false);
    setRightSelectedAnswer(null);
    setRightAnswerSubmitted(false);
    setCurrentTurn('left');
    setLastPullSide(null);
    setLastActionResult(null);
    setIsGameOver(false);
    setWinner(null);
    sound.playWhistle();
  };

  // Reset to default questions
  const handleResetQuestions = () => {
    setLeftQuestions(DEFAULT_LEFT_QUESTIONS);
    setRightQuestions(DEFAULT_RIGHT_QUESTIONS);
    localStorage.removeItem('tug_war_left_questions');
    localStorage.removeItem('tug_war_right_questions');
    handleRestart();
  };

  // Toggle Fullscreen
  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <div
      id="app-root"
      className="w-full min-h-screen bg-slate-950 flex items-center justify-center p-2 sm:p-4 text-slate-800 antialiased selection:bg-amber-400 selection:text-slate-900"
    >
      {/* 
        Main Fixed-Frame Container (Toàn bộ trong 1 khung cố định)
        Proportioned to fit cleanly without vertical scroll on laptops, tablets, or projector screens
      */}
      <div
        ref={containerRef}
        id="tug-of-war-fixed-container"
        className="relative w-full max-w-[1440px] h-[94vh] max-h-[920px] min-h-[600px] bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-700/80 shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Top Header & Quick Action Bar */}
        <GameControls
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          gameMode={gameMode}
          onToggleGameMode={() => {
            const nextMode = gameMode === 'turn_based' ? 'simultaneous' : 'turn_based';
            setGameMode(nextMode);
          }}
          onRestartGame={handleRestart}
          onOpenQuestionManager={() => setIsQuestionManagerOpen(true)}
          onOpenRules={() => setIsRulesOpen(true)}
          isFullscreen={isFullscreen}
          onToggleFullscreen={handleToggleFullscreen}
          leftCount={leftQuestions.length}
          rightCount={rightQuestions.length}
        />

        {/* 
          Main Horizontal Battle Arena Layout:
          [ Ô Câu Hỏi Đội Xanh (Trái) ] [ Sàn Đấu Kéo Co (Ở Giữa Màn Hình) ] [ Ô Câu Hỏi Đội Đỏ (Phải) ]
          Cả 3 khối nằm ngang hàng nhau trong 1 khung cố định!
        */}
        <div className="flex-1 px-3 sm:px-4 py-2.5 min-h-0 flex flex-row items-stretch gap-2.5 sm:gap-3.5 lg:gap-4 overflow-hidden">
          {/* Ô Câu Hỏi Đội Xanh (Bên Trái) */}
          <div className="w-[270px] sm:w-[300px] md:w-[320px] lg:w-[350px] shrink-0 h-full flex flex-col min-h-0">
            <QuestionCard
              side="left"
              teamName="Đội Xanh"
              question={leftQuestions[leftQuestionIdx]}
              questionIndex={leftQuestionIdx}
              totalQuestions={totalQuestions}
              isActiveTurn={gameMode === 'simultaneous' || currentTurn === 'left'}
              selectedAnswer={leftSelectedAnswer}
              isAnswerSubmitted={leftAnswerSubmitted}
              onSelectAnswer={handleSelectLeftAnswer}
              onNextQuestion={advanceLeftQuestion}
              correctAnswersCount={leftScore}
            />
          </div>

          {/* Sàn Thi Đấu Kéo Co (Chính Giữa Màn Hình - Đoạn dây & Vạch Kẻ Giữa) */}
          <div className="flex-1 min-w-[320px] h-full flex flex-col min-h-0">
            <TugOfWarArena
              ropePosition={ropePosition}
              maxSteps={MAX_STEPS_TO_WIN}
              lastPullSide={lastPullSide}
              lastActionResult={lastActionResult}
              leftScore={leftScore}
              rightScore={rightScore}
              leftQuestionIdx={leftQuestionIdx}
              rightQuestionIdx={rightQuestionIdx}
              totalQuestions={totalQuestions}
            />
          </div>

          {/* Ô Câu Hỏi Đội Đỏ (Bên Phải) */}
          <div className="w-[270px] sm:w-[300px] md:w-[320px] lg:w-[350px] shrink-0 h-full flex flex-col min-h-0">
            <QuestionCard
              side="right"
              teamName="Đội Đỏ"
              question={rightQuestions[rightQuestionIdx]}
              questionIndex={rightQuestionIdx}
              totalQuestions={totalQuestions}
              isActiveTurn={gameMode === 'simultaneous' || currentTurn === 'right'}
              selectedAnswer={rightSelectedAnswer}
              isAnswerSubmitted={rightAnswerSubmitted}
              onSelectAnswer={handleSelectRightAnswer}
              onNextQuestion={advanceRightQuestion}
              correctAnswersCount={rightScore}
            />
          </div>
        </div>

        {/* Question Manager Modal (Tự thêm & quản lý câu hỏi) */}
        <QuestionManagerModal
          isOpen={isQuestionManagerOpen}
          onClose={() => setIsQuestionManagerOpen(false)}
          leftQuestions={leftQuestions}
          rightQuestions={rightQuestions}
          onUpdateLeftQuestions={setLeftQuestions}
          onUpdateRightQuestions={setRightQuestions}
          onResetQuestions={handleResetQuestions}
        />

        {/* Game Over Celebration Modal */}
        <GameOverModal
          isOpen={isGameOver}
          winner={winner}
          ropePosition={ropePosition}
          leftScore={leftScore}
          rightScore={rightScore}
          totalQuestions={totalQuestions}
          onRestart={handleRestart}
          onOpenQuestionManager={() => setIsQuestionManagerOpen(true)}
        />

        {/* Rules Modal */}
        <RulesModal
          isOpen={isRulesOpen}
          onClose={() => setIsRulesOpen(false)}
        />
      </div>
    </div>
  );
}
