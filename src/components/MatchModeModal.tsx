import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Bot, Check, X, Shield, Sparkles, BrainCircuit } from 'lucide-react';
import { OpponentMode, TeamSide, AIDifficulty, GameMode } from '../types';

interface MatchModeModalProps {
  isOpen: boolean;
  onClose: () => void;
  opponentMode: OpponentMode;
  onSelectOpponentMode: (mode: OpponentMode) => void;
  playerTeam: TeamSide;
  onSelectPlayerTeam: (team: TeamSide) => void;
  aiDifficulty: AIDifficulty;
  onSelectAIDifficulty: (diff: AIDifficulty) => void;
  gameMode: GameMode;
  onSelectGameMode: (mode: GameMode) => void;
  onApplyAndRestart: () => void;
}

export const MatchModeModal: React.FC<MatchModeModalProps> = ({
  isOpen,
  onClose,
  opponentMode,
  onSelectOpponentMode,
  playerTeam,
  onSelectPlayerTeam,
  aiDifficulty,
  onSelectAIDifficulty,
  gameMode,
  onSelectGameMode,
  onApplyAndRestart,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in select-none">
        <motion.div
          initial={{ scale: 0.92, opacity: 0, y: 15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 15 }}
          className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Thiết Lập Chế Độ Chơi
                </h3>
                <p className="text-[11px] text-slate-400">
                  Chọn chơi 2 người hoặc đấu với máy (AI)
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-850 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            {/* 1. Chọn Đối Kháng: 2 Người vs Chơi Với Máy */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                1. Chọn Đối Thủ Thi Đấu
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                {/* 2 Người */}
                <button
                  id="btn-select-pvp"
                  type="button"
                  onClick={() => onSelectOpponentMode('pvp')}
                  className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col gap-1 cursor-pointer ${
                    opponentMode === 'pvp'
                      ? 'border-emerald-500 bg-emerald-50/70 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                      <div className={`p-1.5 rounded-lg ${opponentMode === 'pvp' ? 'bg-emerald-500 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        <Users className="w-4 h-4" />
                      </div>
                      <span>2 Người Chơi</span>
                    </div>
                    {opponentMode === 'pvp' && <Check className="w-4 h-4 text-emerald-600 font-bold" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Hai người đối kháng trực tiếp trên cùng một màn hình thiết bị.
                  </p>
                </button>

                {/* Chơi với máy */}
                <button
                  id="btn-select-vs-ai"
                  type="button"
                  onClick={() => onSelectOpponentMode('vs_ai')}
                  className={`p-3 rounded-xl border-2 text-left transition-all flex flex-col gap-1 cursor-pointer ${
                    opponentMode === 'vs_ai'
                      ? 'border-purple-500 bg-purple-50/70 ring-2 ring-purple-500/20'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 font-bold text-slate-900 text-xs sm:text-sm">
                      <div className={`p-1.5 rounded-lg ${opponentMode === 'vs_ai' ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-700'}`}>
                        <Bot className="w-4 h-4" />
                      </div>
                      <span>Chơi Với Máy</span>
                    </div>
                    {opponentMode === 'vs_ai' && <Check className="w-4 h-4 text-purple-600 font-bold" />}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Bạn đấu trí với máy tính (AI tự động suy nghĩ và chọn đáp án).
                  </p>
                </button>
              </div>
            </div>

            {/* 2. Nếu là Chơi Với Máy: Cho chọn Đội của Bạn */}
            {opponentMode === 'vs_ai' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="space-y-4 pt-1"
              >
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-purple-600" />
                    <span>2. Chọn Đội Của Bạn (Máy Sẽ Lấy Đội Còn Lại)</span>
                  </label>

                  <div className="grid grid-cols-2 gap-2.5">
                    {/* Chọn Đội Xanh */}
                    <button
                      id="btn-pick-blue-team"
                      type="button"
                      onClick={() => onSelectPlayerTeam('left')}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        playerTeam === 'left'
                          ? 'border-blue-600 bg-blue-50/90 ring-2 ring-blue-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-blue-800 text-xs sm:text-sm">
                          <span className="w-3 h-3 rounded-full bg-blue-600 shadow-xs" />
                          <span>Bạn: Đội Xanh 🟦</span>
                        </div>
                        {playerTeam === 'left' && <Check className="w-4 h-4 text-blue-600 font-bold" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Bạn ở cánh Trái • Máy tính là <strong>Đội Đỏ</strong> 🤖
                      </p>
                    </button>

                    {/* Chọn Đội Đỏ */}
                    <button
                      id="btn-pick-red-team"
                      type="button"
                      onClick={() => onSelectPlayerTeam('right')}
                      className={`p-3 rounded-xl border-2 text-left transition-all cursor-pointer ${
                        playerTeam === 'right'
                          ? 'border-rose-600 bg-rose-50/90 ring-2 ring-rose-500/20'
                          : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 font-bold text-rose-800 text-xs sm:text-sm">
                          <span className="w-3 h-3 rounded-full bg-rose-600 shadow-xs" />
                          <span>Bạn: Đội Đỏ 🟥</span>
                        </div>
                        {playerTeam === 'right' && <Check className="w-4 h-4 text-rose-600 font-bold" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        Bạn ở cánh Phải • Máy tính là <strong>Đội Xanh</strong> 🤖
                      </p>
                    </button>
                  </div>
                </div>

                {/* Độ khó của máy */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>3. Chọn Mức Độ Thông Minh Của Máy</span>
                  </label>

                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { key: 'easy' as AIDifficulty, label: 'Dễ', rate: '~50% Đúng', time: '4-7s', color: 'emerald' },
                      { key: 'medium' as AIDifficulty, label: 'Vừa', rate: '~75% Đúng', time: '3-6s', color: 'amber' },
                      { key: 'hard' as AIDifficulty, label: 'Khó', rate: '~90% Đúng', time: '2-4s', color: 'rose' },
                    ].map((item) => {
                      const isSel = aiDifficulty === item.key;
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => onSelectAIDifficulty(item.key)}
                          className={`p-2.5 rounded-xl border-2 text-center transition-all cursor-pointer ${
                            isSel
                              ? 'border-purple-600 bg-purple-50 text-purple-950 font-black ring-2 ring-purple-500/20'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="text-xs font-bold">{item.label}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{item.rate}</div>
                          <div className="text-[9px] text-slate-400">{item.time}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}

            {/* 3. Kiểu Thi Đấu */}
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                {opponentMode === 'vs_ai' ? '4. Hình Thức Thi Đấu' : '2. Hình Thức Thi Đấu'}
              </label>

              <div className="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => onSelectGameMode('turn_based')}
                  className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    gameMode === 'turn_based'
                      ? 'border-amber-500 bg-amber-50/80 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">Lần lượt từng bên (15s)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Mỗi bên thay phiên trả lời trong 15s.
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectGameMode('simultaneous')}
                  className={`p-2.5 rounded-xl border-2 text-left transition-all cursor-pointer ${
                    gameMode === 'simultaneous'
                      ? 'border-amber-500 bg-amber-50/80 font-bold'
                      : 'border-slate-200 bg-slate-50 text-slate-600'
                  }`}
                >
                  <div className="font-bold text-xs text-slate-900">Tự do đồng thời</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Cả 2 bên trả lời độc lập cùng lúc.
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/80 transition-colors cursor-pointer"
            >
              Đóng
            </button>

            <button
              id="btn-apply-match-mode"
              onClick={() => {
                onApplyAndRestart();
                onClose();
              }}
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 text-xs font-black shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98 flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Áp Dụng & Bắt Đầu Trận Mới</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
