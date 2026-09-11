import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  PlusCircle,
  RotateCcw,
  Trash2,
  ListOrdered,
  Shuffle,
  HelpCircle,
  Upload,
  Download,
} from 'lucide-react';
import { Question } from '../types';
import {
  DEFAULT_LEFT_QUESTIONS,
  DEFAULT_RIGHT_QUESTIONS,
  EXTRA_QUESTION_POOL,
} from '../data/defaultQuestions';

interface QuestionManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  leftQuestions: Question[];
  rightQuestions: Question[];
  onUpdateLeftQuestions: (questions: Question[]) => void;
  onUpdateRightQuestions: (questions: Question[]) => void;
  onResetQuestions: () => void;
}

export const QuestionManagerModal: React.FC<QuestionManagerModalProps> = ({
  isOpen,
  onClose,
  leftQuestions,
  rightQuestions,
  onUpdateLeftQuestions,
  onUpdateRightQuestions,
  onResetQuestions,
}) => {
  const [activeTab, setActiveTab] = useState<'left' | 'right' | 'add'>('add');

  // Form state for adding a new question
  const [targetTeam, setTargetTeam] = useState<'left' | 'right' | 'both'>('both');
  const [questionText, setQuestionText] = useState('');
  const [options, setOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState<number>(0);
  const [explanation, setExplanation] = useState('');
  const [notification, setNotification] = useState<string | null>(null);

  const showNotify = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!questionText.trim()) {
      showNotify('Vui lòng nhập nội dung câu hỏi!');
      return;
    }
    if (options.some((opt) => !opt.trim())) {
      showNotify('Vui lòng nhập đủ 4 lựa chọn A, B, C, D!');
      return;
    }

    const newQuestion: Question = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      question: questionText.trim(),
      options: [options[0].trim(), options[1].trim(), options[2].trim(), options[3].trim()],
      correctAnswer,
      explanation: explanation.trim() || undefined,
    };

    if (targetTeam === 'left' || targetTeam === 'both') {
      onUpdateLeftQuestions([...leftQuestions, newQuestion]);
    }
    if (targetTeam === 'right' || targetTeam === 'both') {
      onUpdateRightQuestions([...rightQuestions, newQuestion]);
    }

    // Reset form
    setQuestionText('');
    setOptions(['', '', '', '']);
    setCorrectAnswer(0);
    setExplanation('');
    showNotify('Đã thêm câu hỏi thành công!');
  };

  const handleDeleteQuestion = (team: 'left' | 'right', id: string) => {
    if (team === 'left') {
      if (leftQuestions.length <= 1) {
        showNotify('Mỗi đội cần có ít nhất 1 câu hỏi!');
        return;
      }
      onUpdateLeftQuestions(leftQuestions.filter((q) => q.id !== id));
    } else {
      if (rightQuestions.length <= 1) {
        showNotify('Mỗi đội cần có ít nhất 1 câu hỏi!');
        return;
      }
      onUpdateRightQuestions(rightQuestions.filter((q) => q.id !== id));
    }
    showNotify('Đã xóa câu hỏi.');
  };

  const handleShuffle = (team: 'left' | 'right') => {
    const shuffleArray = (arr: Question[]) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    if (team === 'left') {
      onUpdateLeftQuestions(shuffleArray(leftQuestions));
    } else {
      onUpdateRightQuestions(shuffleArray(rightQuestions));
    }
    showNotify('Đã xáo trộn danh sách câu hỏi ngẫu nhiên!');
  };

  const handleLoadExtraPool = () => {
    onUpdateLeftQuestions([...DEFAULT_LEFT_QUESTIONS, ...EXTRA_QUESTION_POOL].slice(0, 10));
    onUpdateRightQuestions([...DEFAULT_RIGHT_QUESTIONS, ...EXTRA_QUESTION_POOL].slice(0, 10));
    showNotify('Đã làm mới ngân hàng câu hỏi ngẫu nhiên!');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden text-slate-800"
      >
        {/* Header */}
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Quản Lý & Tự Thêm Câu Hỏi</h3>
              <p className="text-xs text-slate-400">
                Tự tạo câu hỏi trắc nghiệm hoặc xem danh sách câu hỏi hiện tại của 2 đội
              </p>
            </div>
          </div>

          <button
            id="btn-close-question-manager"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-2">
          <div className="flex gap-1.5">
            <button
              onClick={() => setActiveTab('add')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'add'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Tự Thêm Câu Hỏi Mới</span>
            </button>

            <button
              onClick={() => setActiveTab('left')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'left'
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Đội Xanh ({leftQuestions.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('right')}
              className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'right'
                  ? 'bg-rose-600 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>Đội Đỏ ({rightQuestions.length})</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              title="Khôi phục lại bộ câu hỏi mặc định ban đầu"
              onClick={() => {
                if (window.confirm('Khôi phục lại toàn bộ câu hỏi mặc định của 2 bên?')) {
                  onResetQuestions();
                  showNotify('Đã khôi phục câu hỏi mặc định!');
                }
              }}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-200 flex items-center gap-1 cursor-pointer font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Khôi phục mặc định</span>
            </button>
          </div>
        </div>

        {/* Notification pill */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-amber-500 text-slate-950 font-bold text-xs py-1 px-4 text-center shadow-sm"
            >
              {notification}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'add' && (
            <form onSubmit={handleAddQuestion} className="space-y-4 max-w-2xl mx-auto">
              {/* Target Team Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  1. Thêm câu hỏi cho đội nào?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setTargetTeam('both')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      targetTeam === 'both'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-800 ring-2 ring-emerald-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    🤝 Cả hai đội
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetTeam('left')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      targetTeam === 'left'
                        ? 'bg-blue-50 border-blue-500 text-blue-800 ring-2 ring-blue-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    🔵 Chỉ Đội Xanh
                  </button>
                  <button
                    type="button"
                    onClick={() => setTargetTeam('right')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      targetTeam === 'right'
                        ? 'bg-rose-50 border-rose-500 text-rose-800 ring-2 ring-rose-500/20'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    🔴 Chỉ Đội Đỏ
                  </button>
                </div>
              </div>

              {/* Question Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  2. Nội dung câu hỏi trắc nghiệm
                </label>
                <textarea
                  id="input-question-text"
                  rows={2}
                  required
                  placeholder="Ví dụ: Ai là người phát minh ra bóng đèn dây tóc thực tế đầu tiên?"
                  value={questionText}
                  onChange={(e) => setQuestionText(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                />
              </div>

              {/* 4 Options with Correct Answer Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  3. Bốn phương án lựa chọn (Click chọn đáp án ĐÚNG màu xanh)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {['A', 'B', 'C', 'D'].map((label, idx) => {
                    const isCorrect = correctAnswer === idx;
                    return (
                      <div
                        key={idx}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          isCorrect
                            ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500/20'
                            : 'bg-white border-slate-300'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setCorrectAnswer(idx)}
                          title="Click để chọn đây là đáp án đúng"
                          className={`w-7 h-7 rounded-lg text-xs font-black shrink-0 transition-colors cursor-pointer flex items-center justify-center ${
                            isCorrect
                              ? 'bg-emerald-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {label}
                        </button>
                        <input
                          type="text"
                          required
                          placeholder={`Nội dung lựa chọn ${label}...`}
                          value={options[idx]}
                          onChange={(e) => {
                            const newOpts = [...options] as [string, string, string, string];
                            newOpts[idx] = e.target.value;
                            setOptions(newOpts);
                          }}
                          className="w-full text-xs sm:text-sm bg-transparent outline-none text-slate-800"
                        />
                        {isCorrect && (
                          <span className="text-[10px] font-bold text-emerald-600 shrink-0 uppercase">
                            Đáp án ĐÚNG
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Explanation (optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  4. Giải thích / Ghi chú sau khi trả lời (Tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Thomas Edison đã cải tiến bóng đèn có thể thắp sáng hàng ngàn giờ."
                  value={explanation}
                  onChange={(e) => setExplanation(e.target.value)}
                  className="w-full p-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  id="btn-submit-add-question"
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md cursor-pointer transition-all flex items-center gap-2 active:scale-98"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Lưu & Thêm Vào Bộ Câu Hỏi</span>
                </button>
              </div>
            </form>
          )}

          {/* Left Team Questions Tab */}
          {activeTab === 'left' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded-xl border border-blue-200">
                <div className="text-xs text-blue-900 font-medium">
                  Hiện có <strong>{leftQuestions.length}</strong> câu hỏi cho <strong>Đội Xanh</strong>
                </div>
                <button
                  onClick={() => handleShuffle('left')}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1 cursor-pointer"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Xáo trộn thứ tự ngẫu nhiên</span>
                </button>
              </div>

              <div className="space-y-2">
                {leftQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 transition-all shadow-xs flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 font-black text-[11px]">
                          Câu {idx + 1}
                        </span>
                        <h4 className="font-bold text-slate-800">{q.question}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 mt-2">
                        {q.options.map((opt, optI) => (
                          <div
                            key={optI}
                            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 ${
                              optI === q.correctAnswer
                                ? 'bg-emerald-100/70 text-emerald-900 font-bold border border-emerald-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span className="font-bold text-[11px]">
                              {['A', 'B', 'C', 'D'][optI]}.
                            </span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteQuestion('left', q.id)}
                      title="Xóa câu hỏi này"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Right Team Questions Tab */}
          {activeTab === 'right' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-rose-50 p-3 rounded-xl border border-rose-200">
                <div className="text-xs text-rose-900 font-medium">
                  Hiện có <strong>{rightQuestions.length}</strong> câu hỏi cho <strong>Đội Đỏ</strong>
                </div>
                <button
                  onClick={() => handleShuffle('right')}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-rose-600 text-white hover:bg-rose-700 flex items-center gap-1 cursor-pointer"
                >
                  <Shuffle className="w-3 h-3" />
                  <span>Xáo trộn thứ tự ngẫu nhiên</span>
                </button>
              </div>

              <div className="space-y-2">
                {rightQuestions.map((q, idx) => (
                  <div
                    key={q.id}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-rose-300 transition-all shadow-xs flex items-start justify-between gap-3"
                  >
                    <div className="flex-1 text-xs sm:text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 font-black text-[11px]">
                          Câu {idx + 1}
                        </span>
                        <h4 className="font-bold text-slate-800">{q.question}</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 mt-2">
                        {q.options.map((opt, optI) => (
                          <div
                            key={optI}
                            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 ${
                              optI === q.correctAnswer
                                ? 'bg-emerald-100/70 text-emerald-900 font-bold border border-emerald-300'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            <span className="font-bold text-[11px]">
                              {['A', 'B', 'C', 'D'][optI]}.
                            </span>
                            <span>{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteQuestion('right', q.id)}
                      title="Xóa câu hỏi này"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Hệ thống tự động lưu vào bộ nhớ trình duyệt</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-lg cursor-pointer transition-colors"
          >
            Đóng & Quay Lại Trận Đấu
          </button>
        </div>
      </motion.div>
    </div>
  );
};
