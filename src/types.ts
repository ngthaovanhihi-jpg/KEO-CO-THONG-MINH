export interface Question {
  id: string;
  question: string;
  options: [string, string, string, string];
  correctAnswer: number; // 0, 1, 2, 3 corresponding to A, B, C, D
  explanation?: string;
}

export type TeamSide = 'left' | 'right';

export interface TeamConfig {
  name: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  accentColor: string;
  characterColor: string;
}

export type GameMode = 'turn_based' | 'simultaneous';

export type OpponentMode = 'pvp' | 'vs_ai'; // Chơi 2 người vs Chơi với máy
export type AIDifficulty = 'easy' | 'medium' | 'hard';

export type GameStatus = 'idle' | 'playing' | 'ended';

export interface GameStats {
  leftCorrect: number;
  leftAnswered: number;
  rightCorrect: number;
  rightAnswered: number;
  winner: TeamSide | 'draw' | null;
  totalPulls: number;
}
