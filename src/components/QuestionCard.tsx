import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight, Clock, AlertTriangle, Bot, User, Sparkles } from 'lucide-react';
import { Question, TeamSide } from '../types';

interface QuestionCardProps {
  side: TeamSide;
  teamName: string;
  question: Question | undefined;
  questionIndex: number;
  totalQuestions: number;
  isActiveTurn: boolean;
  selectedAnswer: number | null;
  isAnswerSubmitted: boolean;
  onSelectAnswer: (optionIndex: number) => void;
  onNextQuestion: () => void;
  correctAnswersCount: number;
  timeLeft?: number;
  maxTime?: number;
  isTimedOut?: boolean;
  isAIControlled?: boolean;
  aiThinking?: boolean;
  playerLabel?: string;
}

const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export const QuestionCard: React.FC<QuestionCardProps> = ({
  side,
  teamName,
  question,
  questionIndex,
  totalQuestions,
  isActiveTurn,
  selectedAnswer,
  isAnswerSubmitted,
  onSelectAnswer,
  onNextQuestion,
  correctAnswersCount,
  timeLeft = 15,
  maxTime = 15,
  isTimedOut = false,
  isAIControlled = false,
  aiThinking = false,
  playerLabel,
}) => {
  const isLeft = side === 'left';
  const theme = isLeft
    ? {
        border: 'border-blue-500/40',
        activeBorder: 'border-blue-400 ring-2 ring-blue-400/40 shadow-blue-500/20',
        badgeBg: 'bg-blue-600 text-white',
        badgeLight: 'bg-blue-500/10 text-blue-700 border-blue-200',
        btnDefault: 'bg-slate-50 hover:bg-blue-50/70 border-slate-200 text-slate-800 hover:border-blue-300',
        activeHeader: 'from-blue-600 to-indigo-700 text-white',
        turnBadge: 'bg-blue-500 text-white animate-bounce',
      }
    : {
        border: 'border-rose-500/40',
        activeBorder: 'border-rose-400 ring-2 ring-rose-400/40 shadow-rose-500/20',
        badgeBg: 'bg-rose-600 text-white',
        badgeLight: 'bg-rose-500/10 text-rose-700 border-rose-200',
        btnDefault: 'bg-slate-50 hover:bg-rose-50/70 border-slate-200 text-slate-800 hover:border-rose-300',
        activeHeader: 'from-rose-600 to-orange-600 text-white',
        turnBadge: 'bg-rose-500 text-white animate-bounce',
      };

  const isCompleted = questionIndex >= totalQuestions || !question;

  return (
    <div
      id={`question-box-${side}`}
      className={`relative flex flex-col justify-between w-full h-full min-h-[340px] bg-white rounded-2xl border-2 transition-all duration-300 shadow-lg overflow-hidden ${
        isActiveTurn ? theme.activeBorder : theme.border
      } ${!isActiveTurn ? 'opacity-85' : 'opacity-100'}`}
    >
      {/* Header bar */}
      <div
        className={`px-3 py-2 bg-gradient-to-r ${theme.activeHeader} flex items-center justify-between text-xs sm:text-sm font-bold shadow-sm`}
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-white/90" />
          <span className="tracking-wide uppercase">{teamName}</span>
          {playerLabel && (
            <span className={`px-1.5 py-0.5 rounded text-[10px] font-black uppercase tracking-wider flex items-center gap-1 ${
              isAIControlled
                ? 'bg-purple-900/60 text-purple-200 border border-purple-400/40'
                : 'bg-white/20 text-white border border-white/30'
            }`}>
              {isAIControlled ? <Bot className="w-3 h-3" /> : <User className="w-3 h-3" />}
              <span>{playerLabel}</span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* 15s Countdown Timer */}
          {isActiveTurn && !isCompleted && !isAnswerSubmitted && (
            <div
              id={`timer-badge-${side}`}
              className={`px-2 py-0.5 rounded-full text-xs font-black flex items-center gap-1 transition-all ${
                timeLeft <= 3
                  ? 'bg-red-500 text-white animate-pulse ring-2 ring-white shadow-md'
                  : timeLeft <= 6
                  ? 'bg-amber-400 text-slate-950 shadow-sm animate-pulse'
                  : 'bg-black/25 text-white'
              }`}
              title={`Còn ${timeLeft} giây để trả lời`}
            >
              <Clock className={`w-3 h-3 ${timeLeft <= 3 ? 'animate-spin' : ''}`} />
              <span className="font-mono text-[12px]">{timeLeft}s</span>
            </div>
          )}

          {isActiveTurn ? (
            <span
              id={`badge-active-${side}`}
              className="px-2 py-0.5 text-[11px] font-black uppercase rounded-full bg-amber-400 text-slate-900 shadow-sm"
            >
              {isAIControlled ? 'Lượt Máy' : 'Lượt Của Bạn'}
            </span>
          ) : (
            <span className="text-[11px] text-white/70 font-normal">Chờ lượt...</span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-black/20 text-[11px] font-mono">
            {correctAnswersCount}/{totalQuestions} Đúng
          </span>
        </div>
      </div>

      {/* Countdown Progress Bar (15s) */}
      {isActiveTurn && !isCompleted && !isAnswerSubmitted && (
        <div className="w-full bg-slate-200 h-1.5 overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              timeLeft <= 3
                ? 'bg-rose-600'
                : timeLeft <= 6
                ? 'bg-amber-500'
                : isLeft
                ? 'bg-blue-600'
                : 'bg-rose-600'
            }`}
            style={{ width: `${Math.max(0, Math.min(100, (timeLeft / maxTime) * 100))}%` }}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 p-3.5 flex flex-col justify-between">
        {isCompleted ? (
          /* Finished all questions for this team */
          <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-2 shadow-inner">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-base font-bold text-slate-800">Đã Hoàn Thành 10 Câu!</h3>
            <p className="text-xs text-slate-500 mt-1">
              {teamName} trả lời đúng <strong className="text-emerald-600 font-bold">{correctAnswersCount}</strong> câu.
            </p>
            <div className="mt-4 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-600">
              Đang đợi kết quả chung cuộc...
            </div>
          </div>
        ) : (
          /* Active question rendering */
          <>
            {/* Question Progress & Text */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 tracking-wider flex items-center gap-1.5">
                  <span>CÂU HỎI {questionIndex + 1} / {totalQuestions}</span>
                  {isActiveTurn && (
                    <span className={`text-[11px] font-semibold ${timeLeft <= 5 ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                      • {timeLeft}s còn lại
                    </span>
                  )}
                </span>
                {/* Progress bar dots */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalQuestions }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        i === questionIndex
                          ? isLeft
                            ? 'bg-blue-600 w-3'
                            : 'bg-rose-600 w-3'
                          : i < questionIndex
                          ? 'bg-emerald-500'
                          : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-3 min-h-[44px]">
                {question.question}
              </h4>
            </div>

            {/* Timeout Banner Notification */}
            {isTimedOut && (
              <div
                id={`alert-timeout-${side}`}
                className="my-1.5 px-3 py-2 rounded-xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-xs font-bold flex items-center justify-center gap-2 animate-bounce"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>Hết 15 giây! Đang chuyển lượt sang đội tiếp theo...</span>
              </div>
            )}

            {/* AI Thinking Banner */}
            {isAIControlled && aiThinking && isActiveTurn && !isAnswerSubmitted && !isTimedOut && (
              <div
                id={`ai-thinking-${side}`}
                className="my-1.5 px-3 py-2 rounded-xl bg-purple-50 border border-purple-300 text-purple-900 text-xs font-semibold flex items-center gap-2 shadow-xs animate-pulse"
              >
                <Bot className="w-4 h-4 text-purple-600 animate-bounce shrink-0" />
                <span className="flex-1">Máy đang phân tích câu hỏi và suy nghĩ đáp án...</span>
                <span className="w-2 h-2 rounded-full bg-purple-500 animate-ping" />
              </div>
            )}

            {/* 4 Choices in vertical list */}
            <div className="flex-1 flex flex-col justify-center gap-2 my-2 min-h-0">
              {question.options.map((option, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrect = question.correctAnswer === optIdx;

                let btnStyles = theme.btnDefault;
                let badgeStyles = 'bg-slate-200 text-slate-700';

                if (isTimedOut) {
                  if (isCorrect) {
                    btnStyles = 'bg-amber-50 border-amber-400 text-amber-900 ring-1 ring-amber-300';
                    badgeStyles = 'bg-amber-500 text-white';
                  } else {
                    btnStyles = 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-50';
                  }
                } else if (isAnswerSubmitted) {
                  if (isCorrect) {
                    btnStyles = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                    badgeStyles = 'bg-emerald-600 text-white';
                  } else if (isSelected && !isCorrect) {
                    btnStyles = 'bg-rose-50 border-rose-500 text-rose-900 font-bold ring-2 ring-rose-500/20';
                    badgeStyles = 'bg-rose-600 text-white';
                  } else {
                    btnStyles = 'bg-slate-100/60 border-slate-200 text-slate-400 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyles = isLeft
                    ? 'bg-blue-100 border-blue-500 text-blue-900 font-bold'
                    : 'bg-rose-100 border-rose-500 text-rose-900 font-bold';
                  badgeStyles = isLeft ? 'bg-blue-600 text-white' : 'bg-rose-600 text-white';
                }

                return (
                  <button
                    key={optIdx}
                    id={`opt-${side}-${questionIndex}-${optIdx}`}
                    disabled={isAnswerSubmitted || isTimedOut || !isActiveTurn || isAIControlled}
                    onClick={() => onSelectAnswer(optIdx)}
                    className={`group relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-98 cursor-pointer disabled:cursor-not-allowed ${btnStyles} ${
                      isAIControlled && !isAnswerSubmitted ? 'cursor-not-allowed opacity-90' : ''
                    }`}
                  >
                    <span
                      className={`inline-flex items-center justify-center shrink-0 w-6 h-6 rounded-lg text-xs font-black transition-colors ${badgeStyles}`}
                    >
                      {OPTION_LABELS[optIdx]}
                    </span>
                    <span className="flex-1 break-words line-clamp-2 leading-tight self-center">
                      {option}
                    </span>

                    {/* Check / Cross indicator */}
                    {isAnswerSubmitted && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 self-center" />
                    )}
                    {isAnswerSubmitted && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0 self-center" />
                    )}
                    {isTimedOut && isCorrect && (
                      <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold">
                        Đáp án đúng
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Advance Action */}
            <div className="min-h-[44px] flex items-center justify-between pt-1 border-t border-slate-100">
              {isTimedOut ? (
                <div className="flex items-center justify-between w-full text-xs font-bold text-rose-600">
                  <span className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" /> Hết thời gian 15s! Dây đứng yên.
                  </span>
                  <button
                    onClick={onNextQuestion}
                    className="px-2.5 py-1 bg-slate-800 text-white rounded-lg text-[11px] hover:bg-slate-700 cursor-pointer"
                  >
                    Đổi lượt ngay
                  </button>
                </div>
              ) : isAnswerSubmitted ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {selectedAnswer === question.correctAnswer ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Chính xác! Kéo dây!
                      </span>
                    ) : (
                      <span className="text-rose-600 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Sai rồi! Dây đứng yên.
                      </span>
                    )}
                  </div>

                  <motion.button
                    id={`btn-next-${side}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onNextQuestion}
                    className={`px-3 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1 shadow-md cursor-pointer text-white ${
                      isLeft ? 'bg-blue-600 hover:bg-blue-700' : 'bg-rose-600 hover:bg-rose-700'
                    }`}
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </motion.button>
                </div>
              ) : (
                <div className="flex items-center justify-between w-full text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    {isAIControlled ? (
                      <span className="flex items-center gap-1 text-purple-700 font-semibold">
                        <Bot className="w-3.5 h-3.5 text-purple-600" />
                        {isActiveTurn ? 'Máy tự động trả lời lượt này...' : 'Chờ lượt máy...'}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                        {isActiveTurn ? 'Chọn 1 trong 4 đáp án trên' : 'Chờ đến lượt đội bạn...'}
                      </span>
                    )}
                  </span>
                  <span className={`font-bold flex items-center gap-1 ${timeLeft <= 5 ? 'text-rose-600' : 'text-slate-500'}`}>
                    <Clock className="w-3 h-3" />
                    {timeLeft}s / 15s
                  </span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
