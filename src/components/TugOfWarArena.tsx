import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TeamSide } from '../types';

interface TugOfWarArenaProps {
  ropePosition: number; // e.g. -6 (max left) to +6 (max right), 0 = center
  maxSteps: number; // e.g. 5 or 6 to win by knockout
  lastPullSide: TeamSide | null;
  lastActionResult: 'correct' | 'wrong' | null;
  leftScore: number;
  rightScore: number;
  leftQuestionIdx: number;
  rightQuestionIdx: number;
  totalQuestions: number;
}

export const TugOfWarArena: React.FC<TugOfWarArenaProps> = ({
  ropePosition,
  maxSteps,
  lastPullSide,
  lastActionResult,
  leftScore,
  rightScore,
}) => {
  // Convert ropePosition to percentage offset:
  // ropePosition 0 = 0% offset.
  // Each step moves by ~5% or ~28px
  const stepPercent = 6.5;
  const displacementPercent = ropePosition * stepPercent;

  return (
    <div
      id="tug-of-war-arena"
      className="relative w-full h-full min-h-[360px] bg-gradient-to-b from-slate-900/95 via-slate-800/95 to-slate-950/95 rounded-2xl border-2 border-slate-700/80 shadow-2xl overflow-hidden flex flex-col justify-between p-3 select-none backdrop-blur-md"
    >
      {/* Background stadium lights and ground texture */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-12 left-1/4 w-48 h-48 bg-blue-500 rounded-full blur-3xl" />
        <div className="absolute -top-12 right-1/4 w-48 h-48 bg-rose-500 rounded-full blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-amber-950/40 to-transparent" />
      </div>

      {/* Top Status & Score Indicators */}
      <div className="relative z-10 flex items-center justify-between px-3 pt-1">
        {/* Left Team Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shadow-[0_0_10px_#3b82f6] animate-pulse" />
          <div>
            <span className="font-extrabold text-blue-400 tracking-wide text-sm sm:text-base uppercase drop-shadow">
              Đội Xanh
            </span>
            <span className="ml-2 px-2 py-0.5 text-xs font-bold bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
              {leftScore} lần kéo
            </span>
          </div>
        </div>

        {/* Center Tension & State Badge */}
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-600/60 shadow-inner">
            <span className="text-xs font-medium text-slate-400">Vị trí dây:</span>
            <span
              className={`text-xs font-black tracking-wider uppercase ${
                ropePosition < 0
                  ? 'text-blue-400'
                  : ropePosition > 0
                  ? 'text-rose-400'
                  : 'text-amber-400'
              }`}
            >
              {ropePosition === 0
                ? '⚖️ Chính Giữa'
                : ropePosition < 0
                ? `⬅️ Xanh dẫn ${Math.abs(ropePosition)} bậc`
                : `Đỏ dẫn ${ropePosition} bậc ➡️`}
            </span>
          </div>

          {/* Stepper Dots */}
          <div className="flex items-center gap-1 mt-1.5">
            {Array.from({ length: maxSteps * 2 + 1 }).map((_, idx) => {
              const val = idx - maxSteps;
              const isCurrent = val === ropePosition;
              const isCenter = val === 0;
              return (
                <div
                  key={idx}
                  className={`transition-all duration-300 rounded-full ${
                    isCurrent
                      ? 'w-3 h-3 bg-amber-400 shadow-[0_0_8px_#f59e0b] scale-125'
                      : isCenter
                      ? 'w-2 h-2 bg-slate-300 opacity-80'
                      : val < 0
                      ? 'w-1.5 h-1.5 bg-blue-500/50'
                      : 'w-1.5 h-1.5 bg-rose-500/50'
                  }`}
                  title={`Bước ${val}`}
                />
              );
            })}
          </div>
        </div>

        {/* Right Team Indicator */}
        <div className="flex items-center gap-2">
          <div className="text-right">
            <span className="px-2 py-0.5 mr-2 text-xs font-bold bg-rose-500/20 text-rose-300 rounded-full border border-rose-500/30">
              {rightScore} lần kéo
            </span>
            <span className="font-extrabold text-rose-400 tracking-wide text-sm sm:text-base uppercase drop-shadow">
              Đội Đỏ
            </span>
          </div>
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shadow-[0_0_10px_#f43f5e] animate-pulse" />
        </div>
      </div>

      {/* Arena Stage */}
      <div className="relative flex-1 flex items-center justify-center overflow-hidden my-1">
        {/* Exact Center Line (Vạch kẻ chính giữa màn hình) */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 sm:w-1 bg-gradient-to-b from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.8)] z-10 pointer-events-none flex flex-col justify-between items-center">
          <div className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b] -translate-y-1/2 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
          </div>
          <div className="px-1.5 py-0.5 bg-slate-900/90 text-amber-300 border border-amber-400/50 text-[10px] font-black rounded tracking-tighter uppercase whitespace-nowrap shadow">
            VẠCH GIỮA
          </div>
          <div className="w-4 h-4 bg-amber-400 rounded-full shadow-[0_0_8px_#f59e0b] translate-y-1/2 flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-slate-900 rounded-full" />
          </div>
        </div>

        {/* Win Zones Markers on Left and Right */}
        <div className="absolute inset-y-2 left-6 border-l-2 border-dashed border-blue-500/50 flex flex-col justify-end pb-1 pl-1 pointer-events-none z-10">
          <span className="text-[10px] font-bold text-blue-400/80 uppercase tracking-widest rotate-180 [writing-mode:vertical-rl]">
            Vạch Thắng Xanh
          </span>
        </div>
        <div className="absolute inset-y-2 right-6 border-r-2 border-dashed border-rose-500/50 flex flex-col justify-end pb-1 pr-1 pointer-events-none z-10">
          <span className="text-[10px] font-bold text-rose-400/80 uppercase tracking-widest [writing-mode:vertical-rl]">
            Vạch Thắng Đỏ
          </span>
        </div>

        {/* Floating feedback alert (Kéo mạnh! or Sai rồi đứng yên!) */}
        <AnimatePresence>
          {lastActionResult && (
            <motion.div
              key={`${lastPullSide}-${lastActionResult}-${Date.now()}`}
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.8 }}
              transition={{ duration: 0.25 }}
              className={`absolute top-2 z-30 px-3 py-1 rounded-full text-xs font-black tracking-wide shadow-lg border backdrop-blur-md ${
                lastActionResult === 'correct'
                  ? lastPullSide === 'left'
                    ? 'bg-blue-600/90 text-white border-blue-300 shadow-blue-500/30'
                    : 'bg-rose-600/90 text-white border-rose-300 shadow-rose-500/30'
                  : 'bg-slate-800/95 text-amber-300 border-amber-500/50 shadow-black/40'
              }`}
            >
              {lastActionResult === 'correct' ? (
                <span>
                  ⚡ {lastPullSide === 'left' ? 'Đội Xanh' : 'Đội Đỏ'} trả lời ĐÚNG! Dây kéo về! (+1)
                </span>
              ) : (
                <span>❌ Trả lời SAI! Đoạn dây vẫn đứng yên!</span>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Rope Assembly that moves based on ropePosition */}
        <motion.div
          animate={{ x: `${displacementPercent}%` }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
          className="relative w-full flex items-center justify-center z-20 py-4"
        >
          {/* Left Team Tuggers (Đội Xanh) */}
          <div className="flex items-center -mr-3 sm:-mr-5">
            <TuggerCharacter
              side="left"
              color="blue"
              isPulling={lastPullSide === 'left' && lastActionResult === 'correct'}
              delay={0}
            />
            <TuggerCharacter
              side="left"
              color="blue"
              isPulling={lastPullSide === 'left' && lastActionResult === 'correct'}
              delay={0.06}
            />
            <TuggerCharacter
              side="left"
              color="blue"
              isPulling={lastPullSide === 'left' && lastActionResult === 'correct'}
              delay={0.12}
            />
          </div>

          {/* Rope Body */}
          <div className="relative flex-1 max-w-xl h-4 sm:h-5 flex items-center">
            {/* The braided rope element */}
            <div
              className="w-full h-3.5 sm:h-4 rounded-full shadow-inner border border-amber-800 relative overflow-hidden"
              style={{
                backgroundColor: '#b47e43',
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  #8b572a,
                  #8b572a 7px,
                  #c69255 7px,
                  #c69255 14px,
                  #d9a76d 14px,
                  #d9a76d 17px
                )`,
              }}
            >
              {/* Rope fiber shine highlight */}
              <div className="absolute inset-x-0 top-0 h-1 bg-white/30" />
            </div>

            {/* Red Bandana / Ribbon Center Marker on the Rope */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
              {/* Knot */}
              <div className="w-5 h-5 bg-red-600 rounded-full border-2 border-red-200 shadow-[0_0_12px_#ef4444] flex items-center justify-center">
                <div className="w-2 h-2 bg-yellow-300 rounded-full" />
              </div>
              {/* Hanging Red Ribbon tails */}
              <div className="flex -mt-1 gap-0.5">
                <motion.div
                  animate={{
                    rotate: ropePosition < 0 ? [-8, -18, -10] : ropePosition > 0 ? [8, 18, 10] : [-5, 5, -5],
                  }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
                  className="w-2.5 h-6 sm:h-7 bg-red-600 rounded-b-sm border-r border-red-700 shadow-md origin-top"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
                  }}
                />
                <motion.div
                  animate={{
                    rotate: ropePosition < 0 ? [-15, -5, -12] : ropePosition > 0 ? [15, 5, 12] : [5, -5, 5],
                  }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                  className="w-2 h-5 sm:h-6 bg-red-500 rounded-b-sm shadow-md origin-top"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Right Team Tuggers (Đội Đỏ) */}
          <div className="flex items-center -ml-3 sm:-ml-5">
            <TuggerCharacter
              side="right"
              color="rose"
              isPulling={lastPullSide === 'right' && lastActionResult === 'correct'}
              delay={0}
            />
            <TuggerCharacter
              side="right"
              color="rose"
              isPulling={lastPullSide === 'right' && lastActionResult === 'correct'}
              delay={0.06}
            />
            <TuggerCharacter
              side="right"
              color="rose"
              isPulling={lastPullSide === 'right' && lastActionResult === 'correct'}
              delay={0.12}
            />
          </div>
        </motion.div>
      </div>

      {/* Bottom Turf Ground with Markings */}
      <div className="relative z-10 flex items-center justify-between border-t border-slate-700/60 pt-1.5 px-3 text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
          <span>Vùng kéo Đội Xanh</span>
        </div>
        <div className="flex items-center gap-2 font-mono font-medium">
          <span>← Sang trái</span>
          <span className="text-amber-400 font-bold">| MẶT SÂN KÉO CO |</span>
          <span>Sang phải →</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Vùng kéo Đội Đỏ</span>
          <span className="inline-block w-2 h-2 rounded-full bg-rose-500" />
        </div>
      </div>
    </div>
  );
};

// Animated Tug of War Character
interface TuggerCharacterProps {
  side: 'left' | 'right';
  color: 'blue' | 'rose';
  isPulling: boolean;
  delay: number;
}

const TuggerCharacter: React.FC<TuggerCharacterProps> = ({ side, color, isPulling, delay }) => {
  const isLeft = side === 'left';
  const shirtColor = isLeft ? '#2563eb' : '#e11d48';
  const headbandColor = isLeft ? '#93c5fd' : '#fca5a5';

  return (
    <motion.div
      animate={{
        x: isPulling ? (isLeft ? [-4, -14, -8] : [4, 14, 8]) : isLeft ? [-2, 0, -2] : [2, 0, 2],
        rotate: isPulling ? (isLeft ? -18 : 18) : isLeft ? -10 : 10,
      }}
      transition={{
        duration: isPulling ? 0.35 : 1.8,
        repeat: isPulling ? 2 : Infinity,
        repeatType: 'mirror',
        delay,
        ease: 'easeInOut',
      }}
      className="relative flex flex-col items-center select-none"
      style={{
        transformOrigin: isLeft ? 'bottom right' : 'bottom left',
      }}
    >
      {/* Strain / Sweat Drop when pulling */}
      {isPulling && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: -10 }}
          className={`absolute -top-3 ${isLeft ? 'left-0' : 'right-0'} text-xs`}
        >
          💦
        </motion.div>
      )}

      {/* SVG Character */}
      <svg
        width="48"
        height="56"
        viewBox="0 0 48 56"
        className="overflow-visible drop-shadow-md"
      >
        {/* Head */}
        <circle cx="24" cy="14" r="10" fill="#fed7aa" stroke="#9a3412" strokeWidth="1" />
        {/* Headband */}
        <rect x="14" y="9" width="20" height="4" rx="2" fill={headbandColor} />
        {/* Eyes */}
        {isLeft ? (
          <>
            <circle cx="27" cy="14" r="1.5" fill="#1e293b" />
            <path d="M 25 11 Q 28 10 30 13" stroke="#0f172a" strokeWidth="1" fill="none" />
            {/* Mouth */}
            <path d="M 26 18 Q 28 20 29 17" stroke="#dc2626" strokeWidth="1.5" fill="none" />
          </>
        ) : (
          <>
            <circle cx="21" cy="14" r="1.5" fill="#1e293b" />
            <path d="M 23 11 Q 20 10 18 13" stroke="#0f172a" strokeWidth="1" fill="none" />
            {/* Mouth */}
            <path d="M 22 18 Q 20 20 19 17" stroke="#dc2626" strokeWidth="1.5" fill="none" />
          </>
        )}

        {/* Body (Shirt) */}
        <path
          d={
            isLeft
              ? 'M 18 24 L 30 24 L 27 40 L 17 40 Z'
              : 'M 18 24 L 30 24 L 31 40 L 21 40 Z'
          }
          fill={shirtColor}
          stroke="#0f172a"
          strokeWidth="1"
        />

        {/* Pulling Arms gripping rope */}
        {isLeft ? (
          <path
            d="M 22 28 Q 32 32 38 31"
            stroke="#fed7aa"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        ) : (
          <path
            d="M 26 28 Q 16 32 10 31"
            stroke="#fed7aa"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
        )}

        {/* Legs leaning back */}
        {isLeft ? (
          <>
            <line x1="19" y1="40" x2="13" y2="52" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            <line x1="25" y1="40" x2="22" y2="52" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            {/* Shoes */}
            <ellipse cx="11" cy="53" rx="4" ry="2" fill="#475569" />
            <ellipse cx="21" cy="53" rx="4" ry="2" fill="#475569" />
          </>
        ) : (
          <>
            <line x1="29" y1="40" x2="35" y2="52" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            <line x1="23" y1="40" x2="26" y2="52" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
            {/* Shoes */}
            <ellipse cx="37" cy="53" rx="4" ry="2" fill="#475569" />
            <ellipse cx="27" cy="53" rx="4" ry="2" fill="#475569" />
          </>
        )}
      </svg>
    </motion.div>
  );
};
