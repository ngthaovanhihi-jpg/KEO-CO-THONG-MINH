import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, HelpCircle, ArrowRight } from 'lucide-react';
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
        </div>

        <div className="flex items-center gap-2">
          {isActiveTurn ? (
            <span
              id={`badge-active-${side}`}
              className="px-2 py-0.5 text-[11px] font-black uppercase rounded-full bg-amber-400 text-slate-900 shadow-sm"
            >
              Lượt Đội Này
            </span>
          ) : (
            <span className="text-[11px] text-white/70 font-normal">Chờ lượt...</span>
          )}
          <span className="px-2 py-0.5 rounded-full bg-black/20 text-[11px] font-mono">
            {correctAnswersCount}/{totalQuestions} Đúng
          </span>
        </div>
      </div>

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
                <span className="text-xs font-bold text-slate-500 tracking-wider">
                  CÂU HỎI {questionIndex + 1} / {totalQuestions}
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

            {/* 4 Choices in vertical list */}
            <div className="flex-1 flex flex-col justify-center gap-2 my-2 min-h-0">
              {question.options.map((option, optIdx) => {
                const isSelected = selectedAnswer === optIdx;
                const isCorrect = question.correctAnswer === optIdx;

                let btnStyles = theme.btnDefault;
                let badgeStyles = 'bg-slate-200 text-slate-700';

                if (isAnswerSubmitted) {
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
                    disabled={isAnswerSubmitted || !isActiveTurn}
                    onClick={() => onSelectAnswer(optIdx)}
                    className={`group relative flex items-center gap-2.5 p-2 sm:p-2.5 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all shadow-xs active:scale-98 cursor-pointer disabled:cursor-not-allowed ${btnStyles}`}
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
                  </button>
                );
              })}
            </div>

            {/* Answer Feedback & Advance Action */}
            <div className="min-h-[44px] flex items-center justify-between pt-1 border-t border-slate-100">
              {isAnswerSubmitted ? (
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
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    {isActiveTurn ? 'Chọn 1 trong 4 đáp án trên' : 'Chờ đến lượt đội bạn...'}
                  </span>
                  <span className="font-medium text-slate-400">10 giây/câu</span>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
