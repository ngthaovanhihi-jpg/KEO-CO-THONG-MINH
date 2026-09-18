import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  PlusCircle,
  Pencil,
  Trash2,
  RotateCcw,
  Shuffle,
  Search,
  CheckCircle2,
  X,
  Save,
  ArrowLeft,
  Copy,
  Download,
  Upload,
  AlertCircle,
  HelpCircle,
  Layers,
  Sparkles,
  FileQuestion,
} from 'lucide-react';
import { Question } from '../types';
import {
  DEFAULT_LEFT_QUESTIONS,
  DEFAULT_RIGHT_QUESTIONS,
  EXTRA_QUESTION_POOL,
} from '../data/defaultQuestions';

interface QuestionManagerTabProps {
  leftQuestions: Question[];
  rightQuestions: Question[];
  onUpdateLeftQuestions: (questions: Question[]) => void;
  onUpdateRightQuestions: (questions: Question[]) => void;
  onResetQuestions: () => void;
  onBackToArena: () => void;
}

export const QuestionManagerTab: React.FC<QuestionManagerTabProps> = ({
  leftQuestions,
  rightQuestions,
  onUpdateLeftQuestions,
  onUpdateRightQuestions,
  onResetQuestions,
  onBackToArena,
}) => {
  // Navigation inside the manager
  const [managerView, setManagerView] = useState<'list' | 'add' | 'import_export'>('list');
  const [selectedTeamFilter, setSelectedTeamFilter] = useState<'all' | 'left' | 'right'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Editing state
  const [editingQuestion, setEditingQuestion] = useState<{
    originalTeam: 'left' | 'right';
    targetTeam: 'left' | 'right' | 'both';
    id: string;
    question: string;
    options: [string, string, string, string];
    correctAnswer: number;
    explanation?: string;
  } | null>(null);

  // Adding form state
  const [newTargetTeam, setNewTargetTeam] = useState<'left' | 'right' | 'both'>('both');
  const [newQuestionText, setNewQuestionText] = useState('');
  const [newOptions, setNewOptions] = useState<[string, string, string, string]>(['', '', '', '']);
  const [newCorrectAnswer, setNewCorrectAnswer] = useState<number>(0);
  const [newExplanation, setNewExplanation] = useState('');

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<{
    text: string;
    type: 'success' | 'error' | 'info';
  } | null>(null);

  // Import/Export JSON textarea state
  const [jsonText, setJsonText] = useState('');

  const notify = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3200);
  };

  // Combine questions for search & display
  const combinedList = useMemo(() => {
    const list: Array<{ team: 'left' | 'right'; q: Question; index: number }> = [];

    if (selectedTeamFilter === 'all' || selectedTeamFilter === 'left') {
      leftQuestions.forEach((q, idx) => {
        list.push({ team: 'left', q, index: idx });
      });
    }

    if (selectedTeamFilter === 'all' || selectedTeamFilter === 'right') {
      rightQuestions.forEach((q, idx) => {
        list.push({ team: 'right', q, index: idx });
      });
    }

    if (!searchQuery.trim()) return list;

    const query = searchQuery.toLowerCase().trim();
    return list.filter(
      (item) =>
        item.q.question.toLowerCase().includes(query) ||
        item.q.options.some((opt) => opt.toLowerCase().includes(query)) ||
        (item.q.explanation && item.q.explanation.toLowerCase().includes(query))
    );
  }, [leftQuestions, rightQuestions, selectedTeamFilter, searchQuery]);

  // Handle Add Question
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) {
      notify('Vui lòng nhập nội dung câu hỏi!', 'error');
      return;
    }
    if (newOptions.some((opt) => !opt.trim())) {
      notify('Vui lòng nhập đầy đủ 4 phương án A, B, C, D!', 'error');
      return;
    }

    const created: Question = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      question: newQuestionText.trim(),
      options: [
        newOptions[0].trim(),
        newOptions[1].trim(),
        newOptions[2].trim(),
        newOptions[3].trim(),
      ],
      correctAnswer: newCorrectAnswer,
      explanation: newExplanation.trim() || undefined,
    };

    if (newTargetTeam === 'left' || newTargetTeam === 'both') {
      onUpdateLeftQuestions([...leftQuestions, created]);
    }
    if (newTargetTeam === 'right' || newTargetTeam === 'both') {
      onUpdateRightQuestions([...rightQuestions, created]);
    }

    // Reset fields
    setNewQuestionText('');
    setNewOptions(['', '', '', '']);
    setNewCorrectAnswer(0);
    setNewExplanation('');
    notify('Đã thêm câu hỏi mới thành công!');
    setManagerView('list');
  };

  // Start Editing a Question
  const handleStartEdit = (team: 'left' | 'right', q: Question) => {
    setEditingQuestion({
      originalTeam: team,
      targetTeam: team,
      id: q.id,
      question: q.question,
      options: [...q.options] as [string, string, string, string],
      correctAnswer: q.correctAnswer,
      explanation: q.explanation || '',
    });
  };

  // Save Edits
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    if (!editingQuestion.question.trim()) {
      notify('Nội dung câu hỏi không được để trống!', 'error');
      return;
    }
    if (editingQuestion.options.some((opt) => !opt.trim())) {
      notify('Phải điền đủ 4 phương án A, B, C, D!', 'error');
      return;
    }

    const updatedQuestion: Question = {
      id: editingQuestion.id,
      question: editingQuestion.question.trim(),
      options: [
        editingQuestion.options[0].trim(),
        editingQuestion.options[1].trim(),
        editingQuestion.options[2].trim(),
        editingQuestion.options[3].trim(),
      ],
      correctAnswer: editingQuestion.correctAnswer,
      explanation: editingQuestion.explanation?.trim() || undefined,
    };

    const origTeam = editingQuestion.originalTeam;
    const destTeam = editingQuestion.targetTeam;

    if (origTeam === destTeam) {
      // Just update in the same team
      if (origTeam === 'left') {
        onUpdateLeftQuestions(
          leftQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
      } else {
        onUpdateRightQuestions(
          rightQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
      }
    } else if (destTeam === 'both') {
      // Keep/update in current team and also push copy to the other team if not exists
      if (origTeam === 'left') {
        onUpdateLeftQuestions(
          leftQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
        onUpdateRightQuestions([...rightQuestions, { ...updatedQuestion, id: `copy-${Date.now()}` }]);
      } else {
        onUpdateRightQuestions(
          rightQuestions.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
        );
        onUpdateLeftQuestions([...leftQuestions, { ...updatedQuestion, id: `copy-${Date.now()}` }]);
      }
    } else {
      // Moved from one team to another
      if (origTeam === 'left' && destTeam === 'right') {
        if (leftQuestions.length <= 1) {
          notify('Không thể chuyển: Đội Xanh cần giữ ít nhất 1 câu hỏi!', 'error');
          return;
        }
        onUpdateLeftQuestions(leftQuestions.filter((q) => q.id !== updatedQuestion.id));
        onUpdateRightQuestions([...rightQuestions, updatedQuestion]);
      } else if (origTeam === 'right' && destTeam === 'left') {
        if (rightQuestions.length <= 1) {
          notify('Không thể chuyển: Đội Đỏ cần giữ ít nhất 1 câu hỏi!', 'error');
          return;
        }
        onUpdateRightQuestions(rightQuestions.filter((q) => q.id !== updatedQuestion.id));
        onUpdateLeftQuestions([...leftQuestions, updatedQuestion]);
      }
    }

    setEditingQuestion(null);
    notify('Đã cập nhật câu hỏi thành công!');
  };

  // Delete Question
  const handleDeleteQuestion = (team: 'left' | 'right', id: string) => {
    if (team === 'left') {
      if (leftQuestions.length <= 1) {
        notify('Đội Xanh cần ít nhất 1 câu hỏi trong bộ đề!', 'error');
        return;
      }
      onUpdateLeftQuestions(leftQuestions.filter((q) => q.id !== id));
    } else {
      if (rightQuestions.length <= 1) {
        notify('Đội Đỏ cần ít nhất 1 câu hỏi trong bộ đề!', 'error');
        return;
      }
      onUpdateRightQuestions(rightQuestions.filter((q) => q.id !== id));
    }
    notify('Đã xóa câu hỏi thành công.');
  };

  // Duplicate Question
  const handleDuplicate = (team: 'left' | 'right', q: Question) => {
    const clone: Question = {
      ...q,
      id: `copy-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      question: `${q.question} (Bản sao)`,
    };
    if (team === 'left') {
      onUpdateLeftQuestions([...leftQuestions, clone]);
    } else {
      onUpdateRightQuestions([...rightQuestions, clone]);
    }
    notify('Đã nhân bản câu hỏi thành công!');
  };

  // Shuffle questions
  const handleShuffleQuestions = (team: 'left' | 'right' | 'all') => {
    const shuffleArray = (arr: Question[]) => {
      const copy = [...arr];
      for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
      }
      return copy;
    };

    if (team === 'left' || team === 'all') {
      onUpdateLeftQuestions(shuffleArray(leftQuestions));
    }
    if (team === 'right' || team === 'all') {
      onUpdateRightQuestions(shuffleArray(rightQuestions));
    }
    notify('Đã xáo trộn thứ tự các câu hỏi ngẫu nhiên!');
  };

  // Export JSON
  const handleExportJSON = () => {
    const data = {
      leftQuestions,
      rightQuestions,
      exportedAt: new Date().toISOString(),
    };
    setJsonText(JSON.stringify(data, null, 2));
    setManagerView('import_export');
    notify('Dữ liệu đã được xuất ra định dạng JSON!', 'info');
  };

  // Import JSON
  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonText);
      if (Array.isArray(parsed.leftQuestions) && Array.isArray(parsed.rightQuestions)) {
        onUpdateLeftQuestions(parsed.leftQuestions);
        onUpdateRightQuestions(parsed.rightQuestions);
        notify('Đã nhập thành công bộ câu hỏi mới!');
        setManagerView('list');
      } else {
        notify('Định dạng JSON không hợp lệ. Cần có leftQuestions và rightQuestions!', 'error');
      }
    } catch {
      notify('Lỗi cú pháp JSON! Vui lòng kiểm tra lại.', 'error');
    }
  };

  return (
    <div
      id="question-manager-tab"
      className="w-full h-full flex flex-col bg-slate-900 text-slate-100 min-h-0 overflow-hidden"
    >
      {/* Top Action Bar within Tab */}
      <div className="shrink-0 px-4 sm:px-6 py-3 bg-slate-850 border-b border-slate-750 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Tab Title & Back Button */}
        <div className="flex items-center gap-3">
          <button
            id="btn-back-to-arena"
            onClick={onBackToArena}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 hover:text-amber-200 border border-slate-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Trở lại Sàn Đấu</span>
          </button>

          <div className="hidden sm:block h-5 w-px bg-slate-700" />

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm sm:text-base font-black text-white uppercase tracking-wide">
                Quản Lý Câu Hỏi Trắc Nghiệm
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                {leftQuestions.length + rightQuestions.length} câu
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden md:block">
              Thêm mới, chỉnh sửa nội dung, đáp án đúng hoặc xóa câu hỏi cho 2 đội
            </p>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2">
          {/* Add Question Button */}
          <button
            id="btn-tab-add-new-question"
            onClick={() => {
              setEditingQuestion(null);
              setManagerView('add');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              managerView === 'add'
                ? 'bg-emerald-500 text-slate-950 font-black ring-2 ring-emerald-400'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white'
            }`}
          >
            <PlusCircle className="w-4 h-4" />
            <span>Thêm Câu Hỏi Mới</span>
          </button>

          {/* View List Button */}
          <button
            onClick={() => setManagerView('list')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border ${
              managerView === 'list'
                ? 'bg-blue-600 border-blue-500 text-white'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Danh Sách</span>
          </button>

          {/* Shuffle button */}
          <button
            onClick={() => handleShuffleQuestions('all')}
            title="Xáo trộn ngẫu nhiên thứ tự câu hỏi của 2 đội"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Xáo Trộn</span>
          </button>

          {/* Reset to defaults */}
          <button
            onClick={() => {
              if (window.confirm('Khôi phục lại toàn bộ câu hỏi mặc định của hệ thống?')) {
                onResetQuestions();
                notify('Đã khôi phục bộ câu hỏi ban đầu!');
              }
            }}
            title="Khôi phục lại bộ câu hỏi mẫu mặc định"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Mặc định</span>
          </button>

          {/* Export/Import JSON */}
          <button
            onClick={handleExportJSON}
            title="Xuất hoặc nhập câu hỏi dạng JSON"
            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">JSON</span>
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className={`shrink-0 px-4 py-1.5 text-xs font-bold text-center flex items-center justify-center gap-2 ${
              toastMessage.type === 'error'
                ? 'bg-rose-500/90 text-white'
                : toastMessage.type === 'info'
                ? 'bg-amber-500/90 text-slate-950'
                : 'bg-emerald-500/90 text-slate-950'
            }`}
          >
            {toastMessage.type === 'error' ? (
              <AlertCircle className="w-3.5 h-3.5" />
            ) : (
              <CheckCircle2 className="w-3.5 h-3.5" />
            )}
            <span>{toastMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Tab Content */}
      <div className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-5">
        {/* VIEW 1: ADD QUESTION FORM */}
        {managerView === 'add' && (
          <div className="max-w-3xl mx-auto bg-slate-850 rounded-2xl border border-slate-700/80 p-4 sm:p-6 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-750">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-white">
                    Thêm Câu Hỏi Trắc Nghiệm Mới
                  </h3>
                  <p className="text-xs text-slate-400">
                    Điền nội dung câu hỏi, 4 phương án và chọn đáp án chính xác
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setManagerView('list')}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              {/* 1. Target Team */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  1. Áp dụng câu hỏi cho đội nào?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewTargetTeam('both')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      newTargetTeam === 'both'
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    🤝 Cả Hai Đội
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTargetTeam('left')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      newTargetTeam === 'left'
                        ? 'bg-blue-500/20 border-blue-400 text-blue-300 ring-2 ring-blue-500/30'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    🔵 Chỉ Đội Xanh
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewTargetTeam('right')}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      newTargetTeam === 'right'
                        ? 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-500/30'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-750'
                    }`}
                  >
                    🔴 Chỉ Đội Đỏ
                  </button>
                </div>
              </div>

              {/* 2. Question Text */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  2. Nội dung câu hỏi trắc nghiệm *
                </label>
                <textarea
                  id="tab-input-question-text"
                  rows={2}
                  required
                  placeholder="Ví dụ: Đâu là hành tinh lớn nhất trong Hệ Mặt Trời?"
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              </div>

              {/* 3. 4 Options */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  3. Bốn phương án lựa chọn (Click vào chữ A, B, C, D để chọn đáp án ĐÚNG) *
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {(['A', 'B', 'C', 'D'] as const).map((letter, idx) => {
                    const isCorrect = newCorrectAnswer === idx;
                    return (
                      <div
                        key={letter}
                        className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                          isCorrect
                            ? 'bg-emerald-950/60 border-emerald-500/80 ring-2 ring-emerald-500/30'
                            : 'bg-slate-900 border-slate-700/80'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setNewCorrectAnswer(idx)}
                          title="Bấm để chọn đáp án này là ĐÚNG"
                          className={`w-7 h-7 rounded-lg text-xs font-black shrink-0 transition-colors cursor-pointer flex items-center justify-center ${
                            isCorrect
                              ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          {letter}
                        </button>
                        <input
                          type="text"
                          required
                          placeholder={`Lựa chọn ${letter}...`}
                          value={newOptions[idx]}
                          onChange={(e) => {
                            const updated = [...newOptions] as [string, string, string, string];
                            updated[idx] = e.target.value;
                            setNewOptions(updated);
                          }}
                          className="w-full text-xs sm:text-sm bg-transparent outline-none text-white placeholder-slate-500"
                        />
                        {isCorrect && (
                          <span className="text-[10px] font-black text-emerald-400 shrink-0 uppercase tracking-wider bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            ĐÚNG
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 4. Explanation (optional) */}
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  4. Lời giải thích / Ghi chú sau khi trả lời (Tùy chọn)
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Sao Mộc (Jupiter) có khối lượng gấp 2.5 lần tất cả các hành tinh khác cộng lại."
                  value={newExplanation}
                  onChange={(e) => setNewExplanation(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>

              {/* Submit / Cancel Buttons */}
              <div className="pt-2 flex items-center justify-end gap-2.5 border-t border-slate-750">
                <button
                  type="button"
                  onClick={() => setManagerView('list')}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  id="btn-save-new-question-tab"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-2 active:scale-98"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu & Thêm Câu Hỏi</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW 2: EDIT QUESTION MODAL / INLINE DRAWER */}
        {editingQuestion && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-2xl bg-slate-900 rounded-2xl border-2 border-amber-500/60 shadow-2xl p-4 sm:p-6 text-slate-100 flex flex-col max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                    <Pencil className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm sm:text-base text-white">
                      Chỉnh Sửa Câu Hỏi
                    </h3>
                    <p className="text-xs text-slate-400">
                      Sửa nội dung câu hỏi, đổi phương án hoặc cập nhật đáp án đúng
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setEditingQuestion(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4">
                {/* Team Placement */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Áp dụng cho đội
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingQuestion({ ...editingQuestion, targetTeam: 'left' })
                      }
                      className={`py-1.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        editingQuestion.targetTeam === 'left'
                          ? 'bg-blue-500/20 border-blue-400 text-blue-300 ring-2 ring-blue-500/30'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                      }`}
                    >
                      🔵 Đội Xanh
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingQuestion({ ...editingQuestion, targetTeam: 'right' })
                      }
                      className={`py-1.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        editingQuestion.targetTeam === 'right'
                          ? 'bg-rose-500/20 border-rose-400 text-rose-300 ring-2 ring-rose-500/30'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                      }`}
                    >
                      🔴 Đội Đỏ
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingQuestion({ ...editingQuestion, targetTeam: 'both' })
                      }
                      className={`py-1.5 px-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        editingQuestion.targetTeam === 'both'
                          ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/30'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-750'
                      }`}
                    >
                      🤝 Cả Hai Đội
                    </button>
                  </div>
                </div>

                {/* Question Text */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Nội dung câu hỏi *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={editingQuestion.question}
                    onChange={(e) =>
                      setEditingQuestion({ ...editingQuestion, question: e.target.value })
                    }
                    className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none"
                  />
                </div>

                {/* 4 Choices */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    4 Phương án (Click ký tự A, B, C, D để chọn đáp án ĐÚNG) *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {(['A', 'B', 'C', 'D'] as const).map((letter, idx) => {
                      const isCorrect = editingQuestion.correctAnswer === idx;
                      return (
                        <div
                          key={letter}
                          className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${
                            isCorrect
                              ? 'bg-emerald-950/70 border-emerald-500 ring-2 ring-emerald-500/30'
                              : 'bg-slate-950 border-slate-700'
                          }`}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setEditingQuestion({
                                ...editingQuestion,
                                correctAnswer: idx,
                              })
                            }
                            className={`w-7 h-7 rounded-lg text-xs font-black shrink-0 transition-colors cursor-pointer flex items-center justify-center ${
                              isCorrect
                                ? 'bg-emerald-500 text-slate-950 shadow-md font-black'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                            }`}
                          >
                            {letter}
                          </button>
                          <input
                            type="text"
                            required
                            value={editingQuestion.options[idx]}
                            onChange={(e) => {
                              const updatedOpts = [...editingQuestion.options] as [
                                string,
                                string,
                                string,
                                string
                              ];
                              updatedOpts[idx] = e.target.value;
                              setEditingQuestion({
                                ...editingQuestion,
                                options: updatedOpts,
                              });
                            }}
                            className="w-full text-xs sm:text-sm bg-transparent outline-none text-white"
                          />
                          {isCorrect && (
                            <span className="text-[10px] font-black text-emerald-400 shrink-0 uppercase">
                              ĐÚNG
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    Ghi chú / Lời giải thích
                  </label>
                  <input
                    type="text"
                    value={editingQuestion.explanation || ''}
                    onChange={(e) =>
                      setEditingQuestion({ ...editingQuestion, explanation: e.target.value })
                    }
                    className="w-full p-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                </div>

                {/* Actions */}
                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setEditingQuestion(null)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition-all cursor-pointer"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Save className="w-4 h-4" />
                    <span>Lưu Thay Đổi</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}

        {/* VIEW 3: IMPORT / EXPORT JSON */}
        {managerView === 'import_export' && (
          <div className="max-w-3xl mx-auto bg-slate-850 rounded-2xl border border-slate-700 p-5 shadow-xl animate-in fade-in">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-750">
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <FileQuestion className="w-4 h-4 text-amber-400" />
                <span>Nhập / Xuất Dữ Liệu Câu Hỏi (JSON)</span>
              </h3>
              <button
                onClick={() => setManagerView('list')}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-slate-400 mb-3">
              Bạn có thể sao chép đoạn mã JSON bên dưới để lưu trữ hoặc dán đoạn mã JSON câu hỏi mới vào
              đây để nhập vào trò chơi.
            </p>
            <textarea
              rows={12}
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="w-full font-mono text-xs p-3 rounded-xl bg-slate-950 border border-slate-750 text-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <div className="flex items-center justify-between mt-3">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonText);
                  notify('Đã sao chép dữ liệu JSON vào bộ nhớ đệm!');
                }}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Sao chép JSON</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setManagerView('list')}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
                >
                  Quay lại
                </button>
                <button
                  onClick={handleImportJSON}
                  className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Áp Dụng Dữ Liệu JSON</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 4: QUESTION LIST WITH EDIT, DELETE & SEARCH */}
        {managerView === 'list' && (
          <div className="space-y-4 max-w-5xl mx-auto">
            {/* Filter and Search Bar */}
            <div className="bg-slate-850 p-3 rounded-2xl border border-slate-750 flex flex-wrap items-center justify-between gap-3 shadow-sm">
              {/* Filter Pills */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSelectedTeamFilter('all')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedTeamFilter === 'all'
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  <span>Tất cả</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-900/40 text-[10px] font-mono">
                    {leftQuestions.length + rightQuestions.length}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedTeamFilter('left')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedTeamFilter === 'left'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Đội Xanh</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-900/40 text-[10px] font-mono">
                    {leftQuestions.length}
                  </span>
                </button>

                <button
                  onClick={() => setSelectedTeamFilter('right')}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                    selectedTeamFilter === 'right'
                      ? 'bg-rose-600 text-white shadow-xs'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-750'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Đội Đỏ</span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-900/40 text-[10px] font-mono">
                    {rightQuestions.length}
                  </span>
                </button>
              </div>

              {/* Search Box */}
              <div className="relative flex-1 min-w-[200px] max-w-xs">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm kiếm nội dung câu hỏi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Questions List */}
            {combinedList.length === 0 ? (
              <div className="py-12 px-4 text-center bg-slate-850 rounded-2xl border border-slate-750/80">
                <FileQuestion className="w-12 h-12 mx-auto text-slate-600 mb-2" />
                <h4 className="text-sm font-bold text-slate-300">Không tìm thấy câu hỏi nào</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Hãy thử thay đổi từ khóa tìm kiếm hoặc bấm nút "Thêm Câu Hỏi Mới".
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5">
                {combinedList.map(({ team, q, index }) => (
                  <div
                    key={`${team}-${q.id}`}
                    className={`p-3.5 rounded-2xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-xs ${
                      team === 'left'
                        ? 'bg-slate-850/90 border-blue-900/40 hover:border-blue-700/60'
                        : 'bg-slate-850/90 border-rose-900/40 hover:border-rose-700/60'
                    }`}
                  >
                    {/* Question Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        {team === 'left' ? (
                          <span className="px-2 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-black uppercase">
                            Đội Xanh #{index + 1}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-md bg-rose-500/20 text-rose-400 border border-rose-500/30 text-[10px] font-black uppercase">
                            Đội Đỏ #{index + 1}
                          </span>
                        )}

                        <h4 className="text-xs sm:text-sm font-bold text-slate-100 line-clamp-2">
                          {q.question}
                        </h4>
                      </div>

                      {/* 4 Choices Badges */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mt-2">
                        {q.options.map((opt, optIdx) => {
                          const isCorrect = q.correctAnswer === optIdx;
                          return (
                            <div
                              key={optIdx}
                              className={`px-2 py-1 rounded-lg text-[11px] flex items-center gap-1.5 truncate ${
                                isCorrect
                                  ? 'bg-emerald-950 text-emerald-300 font-bold border border-emerald-500/40'
                                  : 'bg-slate-900/90 text-slate-400 border border-slate-800'
                              }`}
                            >
                              <span
                                className={`font-black text-[10px] ${
                                  isCorrect ? 'text-emerald-400' : 'text-slate-500'
                                }`}
                              >
                                {['A', 'B', 'C', 'D'][optIdx]}.
                              </span>
                              <span className="truncate" title={opt}>
                                {opt}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {q.explanation && (
                        <p className="text-[11px] text-slate-400 italic mt-1.5 flex items-center gap-1">
                          <HelpCircle className="w-3 h-3 text-amber-400 shrink-0" />
                          <span className="truncate">{q.explanation}</span>
                        </p>
                      )}
                    </div>

                    {/* Action Buttons: SỬA, NHÂN BẢN, XÓA */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end md:self-center border-t md:border-t-0 pt-2 md:pt-0 border-slate-800 w-full md:w-auto justify-end">
                      {/* SỬA (EDIT) BUTTON */}
                      <button
                        id={`btn-edit-q-${team}-${q.id}`}
                        onClick={() => handleStartEdit(team, q)}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                        title="Chỉnh sửa nội dung câu hỏi"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                        <span>Sửa</span>
                      </button>

                      {/* DUPLICATE BUTTON */}
                      <button
                        onClick={() => handleDuplicate(team, q)}
                        className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 border border-slate-700 text-xs cursor-pointer transition-all"
                        title="Nhân bản câu hỏi này"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      {/* XÓA (DELETE) BUTTON */}
                      <button
                        id={`btn-delete-q-${team}-${q.id}`}
                        onClick={() => {
                          if (window.confirm(`Bạn có chắc muốn xóa câu hỏi: "${q.question}"?`)) {
                            handleDeleteQuestion(team, q.id);
                          }
                        }}
                        className="p-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/30 text-xs cursor-pointer transition-all active:scale-95"
                        title="Xóa câu hỏi này"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
