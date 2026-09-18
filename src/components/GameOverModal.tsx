import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Trophy, RotateCcw, Edit3, Award, Bot, User } from 'lucide-react';
import { TeamSide, OpponentMode } from '../types';
import { sound } from '../utils/audio';

interface GameOverModalProps {
  isOpen: boolean;
  winner: TeamSide | 'draw' | null;
  ropePosition: number;
  leftScore: number;
  rightScore: number;
  totalQuestions: number;
  opponentMode?: OpponentMode;
  playerTeam?: TeamSide;
  onRestart: () => void;
  onOpenQuestionManager: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  winner,
  ropePosition,
  leftScore,
  rightScore,
  totalQuestions,
  opponentMode = 'pvp',
  playerTeam = 'left',
  onRestart,
  onOpenQuestionManager,
}) => {
  useEffect(() => {
    if (isOpen) {
      sound.playWin();
      // Confetti burst
      const end = Date.now() + 2.5 * 1000;
      const colors = winner === 'left' ? ['#2563eb', '#60a5fa', '#f59e0b'] : winner === 'right' ? ['#e11d48', '#fb7185', '#f59e0b'] : ['#10b981', '#f59e0b', '#8b5cf6'];

      const frame = () => {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [isOpen, winner]);

  if (!isOpen) return null;

  const isLeftWinner = winner === 'left';
  const isRightWinner = winner === 'right';
  const isDraw = winner === 'draw';

  const isVsAI = opponentMode === 'vs_ai';
  const isPlayerWinner = isVsAI && ((isLeftWinner && playerTeam === 'left') || (isRightWinner && playerTeam === 'right'));
  const isBotWinner = isVsAI && ((isLeftWinner && playerTeam === 'right') || (isRightWinner && playerTeam === 'left'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 text-center shadow-2xl border-4 border-amber-400 overflow-hidden"
      >
        {/* Decorative rays */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none" />

        {/* Trophy icon */}
        <div className="relative mx-auto w-20 h-20 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-900 flex items-center justify-center shadow-lg mb-4 animate-bounce">
          {isVsAI && isBotWinner ? <Bot className="w-10 h-10 text-amber-950" /> : <Trophy className="w-10 h-10 text-amber-950" />}
        </div>

        {/* Title */}
        <span className="text-xs font-black uppercase tracking-widest text-amber-600 mb-1 block">
          KẾT THÚC TRẬN ĐẤU KÉO CO
        </span>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          {isVsAI ? (
            isPlayerWinner ? (
              <span className="text-emerald-600">BẠN ĐÃ CHIẾN THẮNG MÁY! 🏆</span>
            ) : isBotWinner ? (
              <span className="text-purple-600">MÁY (AI) ĐÃ CHIẾN THẮNG! 🤖</span>
            ) : (
              <span className="text-amber-600">HÒA NHAU VỚI MÁY! 🤝</span>
            )
          ) : (
            <>
              {isLeftWinner && <span className="text-blue-600">ĐỘI XANH CHIẾN THẮNG! 🏆</span>}
              {isRightWinner && <span className="text-rose-600">ĐỘI ĐỎ CHIẾN THẮNG! 🏆</span>}
              {isDraw && <span className="text-amber-600">HÒA NHAU BẤT PHÂN THẮNG BẠI! 🤝</span>}
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-sm mx-auto">
          {isVsAI ? (
            isPlayerWinner ? (
              `Chúc mừng bạn! Bạn đã thi đấu xuất sắc, trả lời đúng ${playerTeam === 'left' ? leftScore : rightScore}/${totalQuestions} câu và kéo dây hạ gục máy tính!`
            ) : isBotWinner ? (
              `Máy tính đã trả lời chính xác và giành chiến thắng chung cuộc. Hãy bấm Chơi lại để phục thù!`
            ) : (
              `Bạn và máy tính có kết quả thi đấu ngang tài ngang sức!`
            )
          ) : (
            <>
              {isLeftWinner &&
                `Đội Xanh đã xuất sắc trả lời đúng ${leftScore}/${totalQuestions} câu hỏi và kéo dây về sân nhà!`}
              {isRightWinner &&
                `Đội Đỏ đã xuất sắc trả lời đúng ${rightScore}/${totalQuestions} câu hỏi và kéo dây về sân nhà!`}
              {isDraw &&
                `Cả hai đội đều thi đấu kiên cường với điểm số ngang bằng và giữ dây ở vị trí cân bằng!`}
            </>
          )}
        </p>

        {/* Score Breakdown Cards */}
        <div className="grid grid-cols-2 gap-3 my-6">
          <div
            className={`p-3.5 rounded-2xl border-2 transition-all ${
              isLeftWinner
                ? 'bg-blue-50 border-blue-500 shadow-md scale-102'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-blue-600 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>Đội Xanh</span>
              {isVsAI && (
                <span className="text-[10px] text-blue-800 bg-blue-100 px-1 rounded font-bold">
                  {playerTeam === 'left' ? 'Bạn' : 'Máy'}
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {leftScore} <span className="text-xs font-normal text-slate-500">/{totalQuestions}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">câu trả lời đúng</span>
          </div>

          <div
            className={`p-3.5 rounded-2xl border-2 transition-all ${
              isRightWinner
                ? 'bg-rose-50 border-rose-500 shadow-md scale-102'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <div className="flex items-center justify-center gap-1.5 text-xs font-black text-rose-600 uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-rose-600" />
              <span>Đội Đỏ</span>
              {isVsAI && (
                <span className="text-[10px] text-rose-800 bg-rose-100 px-1 rounded font-bold">
                  {playerTeam === 'right' ? 'Bạn' : 'Máy'}
                </span>
              )}
            </div>
            <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
              {rightScore} <span className="text-xs font-normal text-slate-500">/{totalQuestions}</span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">câu trả lời đúng</span>
          </div>
        </div>

        {/* Final Rope Status */}
        <div className="p-2.5 bg-slate-100 rounded-xl text-xs text-slate-600 font-medium mb-6">
          Độ lệch dây chung cuộc:{' '}
          <strong className="text-slate-900">
            {ropePosition === 0
              ? 'Ở chính giữa vạch chuẩn (0 bước)'
              : ropePosition < 0
              ? `Lệch về bên Đội Xanh ${Math.abs(ropePosition)} bước`
              : `Lệch về bên Đội Đỏ ${ropePosition} bước`}
          </strong>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <button
            id="btn-play-again"
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Chơi Lại Trận Mới</span>
          </button>

          <button
            onClick={() => {
              onRestart();
              onOpenQuestionManager();
            }}
            className="w-full sm:w-auto px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm border border-slate-300 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <Edit3 className="w-4 h-4" />
            <span>Đổi / Thêm Câu Hỏi</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
};
