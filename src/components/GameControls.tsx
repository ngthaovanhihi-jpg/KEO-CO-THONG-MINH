import React from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  PlusCircle,
  HelpCircle,
  Maximize2,
  Minimize2,
  Swords,
  ListOrdered,
  Users,
  Bot,
} from 'lucide-react';
import { GameMode, OpponentMode, TeamSide } from '../types';

interface GameControlsProps {
  activeTab: 'arena' | 'questions';
  onSelectTab: (tab: 'arena' | 'questions') => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  gameMode: GameMode;
  onToggleGameMode: () => void;
  opponentMode: OpponentMode;
  playerTeam: TeamSide;
  onOpenMatchMode: () => void;
  onRestartGame: () => void;
  onOpenRules: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  leftCount: number;
  rightCount: number;
}

export const GameControls: React.FC<GameControlsProps> = ({
  activeTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
  gameMode,
  onToggleGameMode,
  opponentMode,
  playerTeam,
  onOpenMatchMode,
  onRestartGame,
  onOpenRules,
  isFullscreen,
  onToggleFullscreen,
  leftCount,
  rightCount,
}) => {
  return (
    <header
      id="game-header-controls"
      className="w-full bg-slate-900/95 text-white border-b border-slate-800 px-3 sm:px-5 py-2.5 flex flex-wrap items-center justify-between gap-2 shadow-md rounded-t-2xl select-none"
    >
      {/* Title & Brand */}
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
          <Swords className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <h1 className="text-sm sm:text-base font-black tracking-tight uppercase bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
              ĐẤU TRƯỜNG KÉO CO
            </h1>
            <span className="hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
              TRẮC NGHIỆM
            </span>
          </div>
          <p className="text-[10px] sm:text-[11px] text-slate-400">
            Trả lời đúng để kéo dây về đội mình • Trả lời sai dây đứng yên
          </p>
        </div>
      </div>

      {/* Main Navigation Tabs: Sàn Đấu vs Quản Lý Câu Hỏi */}
      <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-750 shadow-inner">
        <button
          id="tab-nav-arena"
          onClick={() => onSelectTab('arena')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'arena'
              ? 'bg-amber-400 text-slate-950 shadow-sm font-black'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <Swords className="w-3.5 h-3.5" />
          <span>Sàn Đấu Kéo Co</span>
        </button>

        <button
          id="tab-nav-questions"
          onClick={() => onSelectTab('questions')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'questions'
              ? 'bg-emerald-500 text-slate-950 shadow-sm font-black'
              : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
          }`}
        >
          <ListOrdered className="w-3.5 h-3.5" />
          <span>Quản Lý Câu Hỏi</span>
          <span
            className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono font-bold ${
              activeTab === 'questions'
                ? 'bg-slate-950/30 text-slate-950'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}
          >
            {leftCount + rightCount}
          </span>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Opponent Mode (2 Người vs Chơi với máy) */}
        {activeTab === 'arena' && (
          <button
            id="btn-match-mode-selector"
            onClick={onOpenMatchMode}
            title="Đổi đối thủ: 2 Người hoặc Chơi Với Máy (AI)"
            className={`px-2.5 py-1.5 text-xs font-bold rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
              opponentMode === 'vs_ai'
                ? 'bg-purple-950/80 hover:bg-purple-900 border-purple-500/50 text-purple-200'
                : 'bg-emerald-950/80 hover:bg-emerald-900 border-emerald-500/50 text-emerald-200'
            }`}
          >
            {opponentMode === 'vs_ai' ? (
              <>
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[11px] hidden sm:inline">
                  Đấu Máy ({playerTeam === 'left' ? 'Đội Xanh' : 'Đội Đỏ'})
                </span>
                <span className="text-[11px] sm:hidden">Vs Máy</span>
              </>
            ) : (
              <>
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] hidden sm:inline">2 Người Chơi</span>
                <span className="text-[11px] sm:hidden">2 Người</span>
              </>
            )}
          </button>
        )}

        {/* Game mode toggle */}
        {activeTab === 'arena' && (
          <button
            onClick={onToggleGameMode}
            title="Chuyển chế độ thi đấu"
            className="px-2.5 py-1.5 text-xs font-bold rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer text-slate-200"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] hidden sm:inline">
              Chế độ:{' '}
              <strong className="text-amber-400">
                {gameMode === 'turn_based' ? 'Lần lượt' : 'Đồng thời'}
              </strong>
            </span>
          </button>
        )}

        {/* Restart Match button */}
        <button
          id="btn-restart-match"
          onClick={() => {
            if (window.confirm('Khởi động lại trận đấu kéo co từ đầu?')) {
              onRestartGame();
            }
          }}
          className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700 flex items-center gap-1 cursor-pointer"
          title="Chơi lại từ đầu"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Làm mới</span>
        </button>

        {/* Sound toggle */}
        <button
          onClick={onToggleSound}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all border border-slate-700 cursor-pointer"
          title={soundEnabled ? 'Tắt âm thanh' : 'Bật âm thanh'}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
        </button>

        {/* Rules button */}
        <button
          onClick={onOpenRules}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all border border-slate-700 cursor-pointer"
          title="Luật chơi kéo co"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Fullscreen toggle */}
        <button
          onClick={onToggleFullscreen}
          className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-all border border-slate-700 cursor-pointer hidden md:flex items-center justify-center"
          title={isFullscreen ? 'Thu nhỏ' : 'Toàn màn hình'}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
