/**
 * ====================================================================
 * TRÒ CHƠI KÉO CO TRI THỨC - TUG OF WAR QUIZ GAME
 * Tệp JavaScript thuần (Vanilla JS), độc lập, sẵn sàng Deploy GitHub Pages
 * ====================================================================
 */

// --- 1. DỮ LIỆU CÂU HỎI MẶC ĐỊNH (10 CÂU ĐỘI XANH & 10 CÂU ĐỘI ĐỎ) ---
const DEFAULT_BLUE_QUESTIONS = [
  {
    id: 'b1',
    text: 'Thủ đô của Việt Nam là thành phố nào?',
    options: ['Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Huế'],
    correctAnswer: 1,
    explanation: 'Hà Nội là thủ đô ngàn năm văn hiến của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.'
  },
  {
    id: 'b2',
    text: 'Trong hệ Mặt Trời, hành tinh nào nằm gần Mặt Trời nhất?',
    options: ['Sao Kim', 'Sao Hỏa', 'Sao Thủy', 'Trái Đất'],
    correctAnswer: 2,
    explanation: 'Sao Thủy (Mercury) là hành tinh có quỹ đạo gần Mặt Trời nhất trong hệ Mặt Trời.'
  },
  {
    id: 'b3',
    text: 'Kết quả của phép tính: 15 × 6 - 20 = ?',
    options: ['70', '65', '80', '75'],
    correctAnswer: 0,
    explanation: '15 × 6 = 90; 90 - 20 = 70.'
  },
  {
    id: 'b4',
    text: 'Đại dương nào có diện tích lớn nhất trên Trái Đất?',
    options: ['Đại Tây Dương', 'Ấn Độ Dương', 'Bắc Băng Dương', 'Thái Bình Dương'],
    correctAnswer: 3,
    explanation: 'Thái Bình Dương là đại dương lớn nhất và sâu nhất trên Trái Đất.'
  },
  {
    id: 'b5',
    text: 'Tác phẩm văn học "Truyện Kiều" là của đại thi hào nào?',
    options: ['Nguyễn Trãi', 'Nguyễn Du', 'Hồ Xuân Hương', 'Đoàn Thị Điểm'],
    correctAnswer: 1,
    explanation: 'Truyện Kiều (Đoạn trường tân thanh) là kiệt tác của Đại thi hào Nguyễn Du.'
  },
  {
    id: 'b6',
    text: 'Khí nào chiếm tỉ lệ thể tích lớn nhất trong không khí?',
    options: ['Khí Oxy (O2)', 'Khí Nitơ (N2)', 'Khí Cacbonic (CO2)', 'Khí Hiđro (H2)'],
    correctAnswer: 1,
    explanation: 'Khí Nitơ chiếm khoảng 78% thể tích bầu khí quyển Trái Đất.'
  },
  {
    id: 'b7',
    text: 'Đỉnh núi Fansipan – nóc nhà Đông Dương nằm ở tỉnh nào?',
    options: ['Hà Giang', 'Lào Cai', 'Lai Châu', 'Yên Bái'],
    correctAnswer: 1,
    explanation: 'Fansipan cao 3.143m nằm trên dãy Hoàng Liên Sơn thuộc tỉnh Lào Cai.'
  },
  {
    id: 'b8',
    text: 'Kim tự tháp Giza nổi tiếng là kỳ quan của quốc gia nào?',
    options: ['Hy Lạp', 'Ai Cập', 'Ý', 'Ấn Độ'],
    correctAnswer: 1,
    explanation: 'Quần thể kim tự tháp Giza nằm ở ngoại ô Cairo, Ai Cập.'
  },
  {
    id: 'b9',
    text: 'Nguyên tố hóa học nào có ký hiệu là "Au"?',
    options: ['Bạc', 'Đồng', 'Vàng', 'Nhôm'],
    correctAnswer: 2,
    explanation: '"Au" bắt nguồn từ tiếng Latin Aurum, có nghĩa là Vàng.'
  },
  {
    id: 'b10',
    text: 'Bác Hồ đọc Tuyên ngôn Độc lập khai sinh nước VNDCCH vào năm nào?',
    options: ['1930', '1945', '1954', '1975'],
    correctAnswer: 1,
    explanation: 'Bác Hồ đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình ngày 2 tháng 9 năm 1945.'
  }
];

const DEFAULT_RED_QUESTIONS = [
  {
    id: 'r1',
    text: 'Dãy núi nào dài nhất và chạy dọc suốt miền Trung Việt Nam?',
    options: ['Hoàng Liên Sơn', 'Trường Sơn', 'Bạch Mã', 'Đông Triều'],
    correctAnswer: 1,
    explanation: 'Dãy Trường Sơn chạy dọc biên giới Việt - Lào và miền Trung Việt Nam.'
  },
  {
    id: 'r2',
    text: 'Nước sôi ở nhiệt độ bao nhiêu độ C (ở điều kiện áp suất tiêu chuẩn)?',
    options: ['80°C', '90°C', '100°C', '120°C'],
    correctAnswer: 2,
    explanation: 'Ở áp suất khí quyển tiêu chuẩn 1 atm, nước sôi tại 100°C.'
  },
  {
    id: 'r3',
    text: 'Hình tam giác có tổng ba góc trong bằng bao nhiêu độ?',
    options: ['90°', '180°', '270°', '360°'],
    correctAnswer: 1,
    explanation: 'Tổng số đo 3 góc trong của một tam giác luôn bằng 180°.'
  },
  {
    id: 'r4',
    text: 'Ai là người lãnh đạo chiến thắng Bạch Đằng năm 938 chấm dứt ngàn năm Bắc thuộc?',
    options: ['Lý Thường Kiệt', 'Ngô Quyền', 'Trần Hưng Đạo', 'Lê Lợi'],
    correctAnswer: 1,
    explanation: 'Ngô Quyền cắm cọc gỗ trên sông Bạch Đằng đánh tan quân Nam Hán năm 938.'
  },
  {
    id: 'r5',
    text: 'Động vật nào là loài thú lớn nhất còn sống trên Trái Đất?',
    options: ['Voi châu Phi', 'Cá mập voi', 'Cá voi xanh', 'Khủng long'],
    correctAnswer: 2,
    explanation: 'Cá voi xanh là loài thú lớn nhất từng được biết đến, nặng tới 150-180 tấn.'
  },
  {
    id: 'r6',
    text: 'Tập hợp các số tự nhiên thường được ký hiệu bằng chữ cái nào?',
    options: ['Z', 'N', 'Q', 'R'],
    correctAnswer: 1,
    explanation: 'N là ký hiệu của tập hợp các số tự nhiên (Natural numbers: 0, 1, 2, 3...).'
  },
  {
    id: 'r7',
    text: 'Vịnh biển nào của Việt Nam hai lần được UNESCO công nhận là Di sản Thiên nhiên Thế giới?',
    options: ['Vịnh Cam Ranh', 'Vịnh Hạ Long', 'Vịnh Nha Trang', 'Vịnh Vân Phong'],
    correctAnswer: 1,
    explanation: 'Vịnh Hạ Long được UNESCO vinh danh vào các năm 1994 và 2000.'
  },
  {
    id: 'r8',
    text: 'Công thức hóa học của muối ăn thông thường là gì?',
    options: ['H2O', 'NaCl', 'CaCO3', 'NaHCO3'],
    correctAnswer: 1,
    explanation: 'Muối ăn là Natri Clorua (NaCl).'
  },
  {
    id: 'r9',
    text: 'Hành tinh nào trong hệ Mặt Trời có biệt danh là "Hành tinh Đỏ"?',
    options: ['Sao Kim', 'Sao Thổ', 'Sao Hỏa', 'Sao Mộc'],
    correctAnswer: 2,
    explanation: 'Sao Hỏa (Mars) có bề mặt chứa nhiều sắt oxit gỉ sét tạo màu đỏ đặc trưng.'
  },
  {
    id: 'r10',
    text: 'Tỉnh nào có diện tích tự nhiên lớn nhất Việt Nam hiện nay?',
    options: ['Sơn La', 'Gia Lai', 'Nghệ An', 'Đắk Lắk'],
    correctAnswer: 2,
    explanation: 'Tỉnh Nghệ An có diện tích lớn nhất Việt Nam với gần 16.490 km².'
  }
];

// --- 2. HỆ THỐNG ÂM THANH WEB AUDIO SYNTHESIZER (KHÔNG CẦN TẢI FILE NGOÀI) ---
class SoundEngine {
  constructor() {
    this.enabled = true;
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq, type = 'sine', duration = 0.2, gainValue = 0.15) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  playCorrect() {
    if (!this.enabled) return;
    this.playTone(523.25, 'triangle', 0.15, 0.2); // C5
    setTimeout(() => this.playTone(659.25, 'triangle', 0.15, 0.2), 100); // E5
    setTimeout(() => this.playTone(783.99, 'triangle', 0.3, 0.25), 200); // G5
  }

  playWrong() {
    if (!this.enabled) return;
    this.playTone(220, 'sawtooth', 0.2, 0.25);
    setTimeout(() => this.playTone(180, 'sawtooth', 0.35, 0.3), 150);
  }

  playWhistle() {
    if (!this.enabled) return;
    this.playTone(1800, 'sine', 0.35, 0.3);
    setTimeout(() => this.playTone(2200, 'sine', 0.45, 0.35), 80);
  }

  playPull() {
    if (!this.enabled) return;
    this.playTone(120, 'square', 0.25, 0.25);
    setTimeout(() => this.playTone(180, 'triangle', 0.2, 0.2), 100);
  }

  playTick() {
    if (!this.enabled) return;
    this.playTone(880, 'sine', 0.05, 0.1);
  }

  playVictory() {
    if (!this.enabled) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((note, idx) => {
      setTimeout(() => this.playTone(note, 'triangle', 0.3, 0.3), idx * 140);
    });
  }
}

const sound = new SoundEngine();

// --- 3. HIỆU ỨNG PHÁO HOA ĂN MỪNG (LIGHTWEIGHT CANVAS CONFETTI) ---
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'];

  for (let i = 0; i < 120; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2 + (Math.random() - 0.5) * 100,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 18,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rSpeed: (Math.random() - 0.5) * 10,
      alpha: 1
    });
  }

  let animationFrame;
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = 0;
    for (let p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.4; // trọng lực
      p.rotation += p.rSpeed;
      p.alpha -= 0.009;
      if (p.alpha > 0) {
        alive++;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    }
    if (alive > 0) {
      animationFrame = requestAnimationFrame(update);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  update();
}

// --- 4. TRẠNG THÁI TOÀN CỤC CỦA TRÒ CHƠI (GAME STATE) ---
class TugOfWarGame {
  constructor() {
    this.maxKnockout = 5; // Kéo lệch 5 bước là thắng trực tiếp
    this.timeLimit = 15;  // 15s đếm ngược mỗi câu

    // Load custom questions or defaults
    this.blueQuestions = this.loadStoredQuestions('keoco_blue_questions', DEFAULT_BLUE_QUESTIONS);
    this.redQuestions = this.loadStoredQuestions('keoco_red_questions', DEFAULT_RED_QUESTIONS);

    // Chế độ chơi
    this.opponentMode = 'pvp'; // 'pvp' (2 người) hoặc 'vs_ai' (chơi với máy)
    this.playerTeam = 'blue';  // Khi chơi với máy: 'blue' hoặc 'red'
    this.aiDifficulty = 'medium'; // 'easy' (50%), 'medium' (75%), 'hard' (92%)
    this.gameMode = 'turn_based'; // 'turn_based' (luân phiên) hoặc 'simultaneous' (đồng thời)

    // Tiến trình thi đấu
    this.ropePosition = 0; // -5 (Đỏ thắng tuyệt đối) đến +5 (Xanh thắng tuyệt đối)
    this.blueScore = 0;
    this.redScore = 0;
    this.blueIndex = 0;
    this.redIndex = 0;
    this.currentTurn = 'blue'; // 'blue' đi trước

    this.blueTimeLeft = this.timeLimit;
    this.redTimeLeft = this.timeLimit;
    this.blueAnswered = false;
    this.redAnswered = false;
    this.isGameOver = false;
    this.activeTab = 'arena'; // 'arena' hoặc 'questions'

    this.isAiThinking = false;
    this.lastAction = 'Trận đấu sẵn sàng! Đội Xanh trả lời câu hỏi đầu tiên.';
    this.lastActionSide = 'neutral';

    // Timer refs
    this.gameTimer = null;
    this.aiTimer = null;

    // Quản lý câu hỏi tạm
    this.editingTeam = 'blue';
    this.editingIndex = null;
  }

  loadStoredQuestions(key, fallback) {
    try {
      const stored = localStorage.getItem(key);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return JSON.parse(JSON.stringify(fallback));
  }

  saveQuestions() {
    try {
      localStorage.setItem('keoco_blue_questions', JSON.stringify(this.blueQuestions));
      localStorage.setItem('keoco_red_questions', JSON.stringify(this.redQuestions));
    } catch (e) {
      console.error(e);
    }
  }

  isBlueAi() {
    return this.opponentMode === 'vs_ai' && this.playerTeam === 'red';
  }

  isRedAi() {
    return this.opponentMode === 'vs_ai' && this.playerTeam === 'blue';
  }

  startTimer() {
    if (this.gameTimer) clearInterval(this.gameTimer);
    this.gameTimer = setInterval(() => {
      if (this.isGameOver || this.activeTab !== 'arena') return;

      // Timer Đội Xanh
      const isBlueActive =
        !this.blueAnswered &&
        this.blueIndex < this.blueQuestions.length &&
        (this.gameMode === 'simultaneous' || this.currentTurn === 'blue');

      if (isBlueActive) {
        if (this.blueTimeLeft > 0) {
          this.blueTimeLeft--;
          if (this.blueTimeLeft <= 5 && this.blueTimeLeft > 0) sound.playTick();
        } else {
          this.handleTimeout('blue');
        }
      }

      // Timer Đội Đỏ
      const isRedActive =
        !this.redAnswered &&
        this.redIndex < this.redQuestions.length &&
        (this.gameMode === 'simultaneous' || this.currentTurn === 'red');

      if (isRedActive) {
        if (this.redTimeLeft > 0) {
          this.redTimeLeft--;
          if (this.redTimeLeft <= 5 && this.redTimeLeft > 0) sound.playTick();
        } else {
          this.handleTimeout('red');
        }
      }

      this.updateTimerUI();
    }, 1000);
  }

  handleTimeout(side) {
    if (side === 'blue' && !this.blueAnswered) {
      this.blueAnswered = true;
      sound.playWrong();
      this.lastAction = 'Đội Xanh hết thời gian suy nghĩ! Không kéo được dây.';
      this.lastActionSide = 'blue';
      this.checkAndShiftRope('blue', false);
      this.triggerNextQuestion('blue');
    } else if (side === 'red' && !this.redAnswered) {
      this.redAnswered = true;
      sound.playWrong();
      this.lastAction = 'Đội Đỏ hết thời gian suy nghĩ! Không kéo được dây.';
      this.lastActionSide = 'red';
      this.checkAndShiftRope('red', false);
      this.triggerNextQuestion('red');
    }
  }

  selectAnswer(side, optIdx) {
    if (this.isGameOver) return;
    sound.init();

    if (side === 'blue') {
      if (this.blueAnswered) return;
      if (this.gameMode === 'turn_based' && this.currentTurn !== 'blue') return;
      if (this.isBlueAi()) return; // Khóa nếu là lượt máy

      this.blueAnswered = true;
      const q = this.blueQuestions[this.blueIndex];
      const isCorrect = q && optIdx === q.correctAnswer;

      if (isCorrect) {
        sound.playCorrect();
        this.blueScore++;
        this.ropePosition++;
        this.lastAction = '⚡ Đội Xanh trả lời CHÍNH XÁC! Kéo dây +1 bước về phía mình!';
        this.lastActionSide = 'blue';
        this.animatePull('blue');
      } else {
        sound.playWrong();
        this.lastAction = '❌ Đội Xanh trả lời chưa chính xác!';
        this.lastActionSide = 'blue';
      }

      this.render();
      this.triggerNextQuestion('blue');
    } else {
      if (this.redAnswered) return;
      if (this.gameMode === 'turn_based' && this.currentTurn !== 'red') return;
      if (this.isRedAi()) return; // Khóa nếu là lượt máy

      this.redAnswered = true;
      const q = this.redQuestions[this.redIndex];
      const isCorrect = q && optIdx === q.correctAnswer;

      if (isCorrect) {
        sound.playCorrect();
        this.redScore++;
        this.ropePosition--;
        this.lastAction = '⚡ Đội Đỏ trả lời CHÍNH XÁC! Kéo dây +1 bước về phía mình!';
        this.lastActionSide = 'red';
        this.animatePull('red');
      } else {
        sound.playWrong();
        this.lastAction = '❌ Đội Đỏ trả lời chưa chính xác!';
        this.lastActionSide = 'red';
      }

      this.render();
      this.triggerNextQuestion('red');
    }

    this.checkVictoryCondition();
  }

  animatePull(side) {
    sound.playPull();
    const stage = document.getElementById('tug-stage');
    if (stage) {
      stage.classList.remove('pulling-left', 'pulling-right');
      void stage.offsetWidth; // trigger reflow
      stage.classList.add(side === 'blue' ? 'pulling-left' : 'pulling-right');
    }
  }

  triggerNextQuestion(side) {
    setTimeout(() => {
      if (this.isGameOver) return;

      if (side === 'blue') {
        this.blueIndex++;
        this.blueAnswered = false;
        this.blueTimeLeft = this.timeLimit;
      } else {
        this.redIndex++;
        this.redAnswered = false;
        this.redTimeLeft = this.timeLimit;
      }

      if (this.gameMode === 'turn_based') {
        this.currentTurn = this.currentTurn === 'blue' ? 'red' : 'blue';
      }

      this.render();
      this.checkVictoryCondition();
      this.scheduleAiTurn();
    }, 2000);
  }

  scheduleAiTurn() {
    if (this.opponentMode !== 'vs_ai' || this.isGameOver) return;
    if (this.aiTimer) clearTimeout(this.aiTimer);

    const isBlueAiTurn =
      this.isBlueAi() &&
      !this.blueAnswered &&
      this.blueIndex < this.blueQuestions.length &&
      (this.gameMode === 'simultaneous' || this.currentTurn === 'blue');

    const isRedAiTurn =
      this.isRedAi() &&
      !this.redAnswered &&
      this.redIndex < this.redQuestions.length &&
      (this.gameMode === 'simultaneous' || this.currentTurn === 'red');

    if (isBlueAiTurn || isRedAiTurn) {
      this.isAiThinking = true;
      this.renderAiThinking();

      // Delay suy nghĩ mô phỏng người thật
      let delay = 3500;
      let accuracy = 0.75;
      if (this.aiDifficulty === 'easy') {
        delay = 4000 + Math.random() * 2500;
        accuracy = 0.5;
      } else if (this.aiDifficulty === 'medium') {
        delay = 2800 + Math.random() * 2000;
        accuracy = 0.75;
      } else {
        delay = 1800 + Math.random() * 1600;
        accuracy = 0.92;
      }

      this.aiTimer = setTimeout(() => {
        this.isAiThinking = false;
        if (this.isGameOver) return;

        if (isBlueAiTurn) {
          const q = this.blueQuestions[this.blueIndex];
          if (!q) return;
          const choice = Math.random() < accuracy ? q.correctAnswer : this.getWrongOption(q.correctAnswer);
          this.executeAiChoice('blue', choice);
        } else if (isRedAiTurn) {
          const q = this.redQuestions[this.redIndex];
          if (!q) return;
          const choice = Math.random() < accuracy ? q.correctAnswer : this.getWrongOption(q.correctAnswer);
          this.executeAiChoice('red', choice);
        }
      }, delay);
    } else {
      this.isAiThinking = false;
      this.renderAiThinking();
    }
  }

  getWrongOption(correct) {
    const wrong = [0, 1, 2, 3].filter(i => i !== correct);
    return wrong[Math.floor(Math.random() * wrong.length)];
  }

  executeAiChoice(side, optIdx) {
    if (side === 'blue') {
      this.blueAnswered = true;
      const q = this.blueQuestions[this.blueIndex];
      const isCorrect = q && optIdx === q.correctAnswer;
      if (isCorrect) {
        sound.playCorrect();
        this.blueScore++;
        this.ropePosition++;
        this.lastAction = '🤖 Máy (Đội Xanh) trả lời ĐÚNG! Kéo dây +1 bước!';
        this.lastActionSide = 'blue';
        this.animatePull('blue');
      } else {
        sound.playWrong();
        this.lastAction = '🤖 Máy (Đội Xanh) trả lời sai!';
        this.lastActionSide = 'blue';
      }
      this.render();
      this.triggerNextQuestion('blue');
    } else {
      this.redAnswered = true;
      const q = this.redQuestions[this.redIndex];
      const isCorrect = q && optIdx === q.correctAnswer;
      if (isCorrect) {
        sound.playCorrect();
        this.redScore++;
        this.ropePosition--;
        this.lastAction = '🤖 Máy (Đội Đỏ) trả lời ĐÚNG! Kéo dây +1 bước!';
        this.lastActionSide = 'red';
        this.animatePull('red');
      } else {
        sound.playWrong();
        this.lastAction = '🤖 Máy (Đội Đỏ) trả lời sai!';
        this.lastActionSide = 'red';
      }
      this.render();
      this.triggerNextQuestion('red');
    }
    this.checkVictoryCondition();
  }

  checkVictoryCondition() {
    if (this.isGameOver) return;

    // Thắng trực tiếp (Knockout)
    if (this.ropePosition >= this.maxKnockout) {
      this.endGame('blue', 'Đội Xanh thắng Knockout do đã kéo dây chạm mốc chiến thắng (+5 bước)!');
      return;
    }
    if (this.ropePosition <= -this.maxKnockout) {
      this.endGame('red', 'Đội Đỏ thắng Knockout do đã kéo dây chạm mốc chiến thắng (-5 bước)!');
      return;
    }

    // Hết câu hỏi
    const blueDone = this.blueIndex >= this.blueQuestions.length;
    const redDone = this.redIndex >= this.redQuestions.length;

    if (blueDone && redDone) {
      if (this.ropePosition > 0) {
        this.endGame('blue', 'Đội Xanh thắng chung cuộc với ưu thế vị trí dây!');
      } else if (this.ropePosition < 0) {
        this.endGame('red', 'Đội Đỏ thắng chung cuộc với ưu thế vị trí dây!');
      } else {
        if (this.blueScore > this.redScore) {
          this.endGame('blue', 'Đội Xanh thắng nhờ ghi được nhiều điểm hơn!');
        } else if (this.redScore > this.blueScore) {
          this.endGame('red', 'Đội Đỏ thắng nhờ ghi được nhiều điểm hơn!');
        } else {
          this.endGame('draw', 'Hai đội hòa nhau bất phân thắng bại!');
        }
      }
    }
  }

  endGame(winner, reason) {
    this.isGameOver = true;
    if (this.gameTimer) clearInterval(this.gameTimer);
    if (this.aiTimer) clearTimeout(this.aiTimer);

    sound.playVictory();
    fireConfetti();

    const modal = document.getElementById('game-over-modal');
    const titleEl = document.getElementById('winner-title');
    const descEl = document.getElementById('winner-desc');
    const bScoreEl = document.getElementById('modal-blue-score');
    const rScoreEl = document.getElementById('modal-red-score');

    let title = '';
    if (this.opponentMode === 'vs_ai') {
      const isPlayerWinner = (winner === 'blue' && this.playerTeam === 'blue') || (winner === 'red' && this.playerTeam === 'red');
      const isBotWinner = (winner === 'blue' && this.playerTeam === 'red') || (winner === 'red' && this.playerTeam === 'blue');
      if (isPlayerWinner) {
        title = '🏆 BẠN ĐÃ CHIẾN THẮNG MÁY TÍNH!';
      } else if (isBotWinner) {
        title = '🤖 MÁY TÍNH (AI) ĐÃ CHIẾN THẮNG!';
      } else {
        title = '🤝 HÒA NHAU VỚI MÁY TÍNH!';
      }
    } else {
      if (winner === 'blue') title = '🏆 ĐỘI XANH CHIẾN THẮNG!';
      else if (winner === 'red') title = '🏆 ĐỘI ĐỎ CHIẾN THẮNG!';
      else title = '🤝 HÒA NHAU BẤT PHÂN THẮNG BẠI!';
    }

    if (titleEl) titleEl.innerText = title;
    if (descEl) descEl.innerText = reason;
    if (bScoreEl) bScoreEl.innerText = `${this.blueScore}/${this.blueQuestions.length}`;
    if (rScoreEl) rScoreEl.innerText = `${this.redScore}/${this.redQuestions.length}`;

    if (modal) modal.classList.add('open');
  }

  restart() {
    if (this.gameTimer) clearInterval(this.gameTimer);
    if (this.aiTimer) clearTimeout(this.aiTimer);

    this.ropePosition = 0;
    this.blueScore = 0;
    this.redScore = 0;
    this.blueIndex = 0;
    this.redIndex = 0;
    this.currentTurn = 'blue';

    this.blueTimeLeft = this.timeLimit;
    this.redTimeLeft = this.timeLimit;
    this.blueAnswered = false;
    this.redAnswered = false;
    this.isGameOver = false;
    this.isAiThinking = false;
    this.lastAction = 'Trận đấu mới đã bắt đầu! Chúc hai đội may mắn.';
    this.lastActionSide = 'neutral';

    // Đóng tất cả modal
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));

    sound.playWhistle();
    this.render();
    this.startTimer();
    this.scheduleAiTurn();
  }

  // --- RENDER GIAO DIỆN ---
  render() {
    this.renderArenaHeader();
    this.renderRopeStage();
    this.renderQuestionCards();
    this.updateTimerUI();
    this.renderAiThinking();
  }

  renderArenaHeader() {
    const bScore = document.getElementById('arena-blue-score');
    const rScore = document.getElementById('arena-red-score');
    const bRole = document.getElementById('arena-blue-role');
    const rRole = document.getElementById('arena-red-role');
    const banner = document.getElementById('action-banner');

    if (bScore) bScore.innerText = `${this.blueScore} lần kéo`;
    if (rScore) rScore.innerText = `${this.redScore} lần kéo`;

    if (bRole) {
      if (this.opponentMode === 'vs_ai') {
        bRole.innerText = this.playerTeam === 'blue' ? 'BẠN' : 'MÁY';
        bRole.className = `team-badge ${this.playerTeam === 'blue' ? 'blue' : 'ai'}`;
      } else {
        bRole.innerText = 'NGƯỜI 1';
        bRole.className = 'team-badge blue';
      }
    }

    if (rRole) {
      if (this.opponentMode === 'vs_ai') {
        rRole.innerText = this.playerTeam === 'red' ? 'BẠN' : 'MÁY';
        rRole.className = `team-badge ${this.playerTeam === 'red' ? 'red' : 'ai'}`;
      } else {
        rRole.innerText = 'NGƯỜI 2';
        rRole.className = 'team-badge red';
      }
    }

    if (banner) {
      banner.innerText = this.lastAction;
      banner.className = `action-banner ${this.lastActionSide}`;
    }
  }

  renderRopeStage() {
    const wrapper = document.getElementById('teams-wrapper');
    if (wrapper) {
      // 1 bước = khoảng 35px di chuyển
      const offsetPx = this.ropePosition * 35;
      wrapper.style.transform = `translateX(${offsetPx}px)`;
    }

    // Cập nhật thước đo gauge steps
    const gaugeContainer = document.getElementById('gauge-steps-container');
    if (gaugeContainer) {
      let html = '';
      for (let i = 5; i >= 1; i--) {
        const isActive = this.ropePosition >= i;
        html += `<div class="gauge-step ${isActive ? 'active-blue' : ''}" title="+${i}"></div>`;
      }
      html += `<div class="gauge-step center" title="0 (Giữa sân)"></div>`;
      for (let i = 1; i <= 5; i++) {
        const isActive = this.ropePosition <= -i;
        html += `<div class="gauge-step ${isActive ? 'active-red' : ''}" title="-${i}"></div>`;
      }
      gaugeContainer.innerHTML = html;
    }

    const posLabel = document.getElementById('rope-position-label');
    if (posLabel) {
      if (this.ropePosition > 0) {
        posLabel.innerText = `Đội Xanh đang dẫn +${this.ropePosition} bước`;
        posLabel.style.color = '#60a5fa';
      } else if (this.ropePosition < 0) {
        posLabel.innerText = `Đội Đỏ đang dẫn +${Math.abs(this.ropePosition)} bước`;
        posLabel.style.color = '#fb7185';
      } else {
        posLabel.innerText = `Dây đang ở vị trí cân bằng (0)`;
        posLabel.style.color = '#cbd5e1';
      }
    }
  }

  renderQuestionCards() {
    this.renderSingleQuestion('blue', this.blueIndex, this.blueQuestions, this.blueAnswered);
    this.renderSingleQuestion('red', this.redIndex, this.redQuestions, this.redAnswered);
  }

  renderSingleQuestion(side, qIndex, questions, isAnswered) {
    const isBlue = side === 'blue';
    const card = document.getElementById(`${side}-card`);
    const qCountEl = document.getElementById(`${side}-q-count`);
    const qProgressEl = document.getElementById(`${side}-progress-fill`);
    const qTextEl = document.getElementById(`${side}-question-text`);
    const optContainer = document.getElementById(`${side}-options-container`);
    const turnBadge = document.getElementById(`${side}-turn-badge`);
    const roleBadge = document.getElementById(`${side}-role-badge`);

    const isAi = isBlue ? this.isBlueAi() : this.isRedAi();
    const isCurrentTurn = this.gameMode === 'simultaneous' || this.currentTurn === side;

    if (card) {
      card.classList.toggle('active-turn', isCurrentTurn && !isAnswered && !this.isGameOver);
    }

    if (turnBadge) {
      if (isCurrentTurn && !isAnswered && !this.isGameOver) {
        turnBadge.innerText = isAi ? 'Lượt Máy' : 'Lượt Của Bạn';
        turnBadge.className = 'q-badge active-turn';
      } else {
        turnBadge.innerText = isAnswered ? 'Đã Trả Lời' : 'Chờ Lượt...';
        turnBadge.className = 'q-badge';
      }
    }

    if (roleBadge) {
      if (this.opponentMode === 'vs_ai') {
        const isUser = (isBlue && this.playerTeam === 'blue') || (!isBlue && this.playerTeam === 'red');
        roleBadge.innerText = isUser ? '👤 BẠN' : '🤖 MÁY';
        roleBadge.className = `q-badge ${isUser ? 'user' : 'ai'}`;
      } else {
        roleBadge.innerText = isBlue ? '👤 Người 1' : '👤 Người 2';
        roleBadge.className = 'q-badge user';
      }
    }

    const currentQ = questions[qIndex];
    const totalQ = questions.length;

    if (qCountEl) qCountEl.innerText = `Câu ${Math.min(qIndex + 1, totalQ)}/${totalQ}`;
    if (qProgressEl) {
      const pct = Math.min(((qIndex + 1) / totalQ) * 100, 100);
      qProgressEl.style.width = `${pct}%`;
    }

    if (!currentQ) {
      if (qTextEl) qTextEl.innerText = 'Đã hoàn thành tất cả câu hỏi của đội!';
      if (optContainer) optContainer.innerHTML = '<div style="padding:1rem;text-align:center;color:#94a3b8;">Đang chờ kết quả chung cuộc...</div>';
      return;
    }

    if (qTextEl) qTextEl.innerText = currentQ.text;

    if (optContainer) {
      const letters = ['A', 'B', 'C', 'D'];
      let html = '';
      currentQ.options.forEach((opt, idx) => {
        let btnClass = 'option-btn';
        if (isAnswered) {
          if (idx === currentQ.correctAnswer) btnClass += ' correct';
        }
        const disabled = isAnswered || !isCurrentTurn || isAi || this.isGameOver ? 'disabled' : '';

        html += `
          <button class="${btnClass}" ${disabled} onclick="window.game.selectAnswer('${side}', ${idx})">
            <span class="opt-letter">${letters[idx]}</span>
            <span>${opt}</span>
          </button>
        `;
      });
      optContainer.innerHTML = html;
    }
  }

  updateTimerUI() {
    const bTimer = document.getElementById('blue-timer');
    const rTimer = document.getElementById('red-timer');
    if (bTimer) {
      bTimer.innerText = `${this.blueTimeLeft}s`;
      bTimer.classList.toggle('urgent', this.blueTimeLeft <= 5);
    }
    if (rTimer) {
      rTimer.innerText = `${this.redTimeLeft}s`;
      rTimer.classList.toggle('urgent', this.redTimeLeft <= 5);
    }
  }

  renderAiThinking() {
    const bAiBox = document.getElementById('blue-ai-thinking');
    const rAiBox = document.getElementById('red-ai-thinking');

    const isBlueActiveAi = this.isBlueAi() && this.isAiThinking && !this.blueAnswered && (this.gameMode === 'simultaneous' || this.currentTurn === 'blue');
    const isRedActiveAi = this.isRedAi() && this.isAiThinking && !this.redAnswered && (this.gameMode === 'simultaneous' || this.currentTurn === 'red');

    if (bAiBox) bAiBox.style.display = isBlueActiveAi ? 'flex' : 'none';
    if (rAiBox) rAiBox.style.display = isRedActiveAi ? 'flex' : 'none';
  }

  // --- QUẢN LÝ CÂU HỎI (QUESTION MANAGER) ---
  renderQuestionBank() {
    const team = this.editingTeam;
    const questions = team === 'blue' ? this.blueQuestions : this.redQuestions;
    const listEl = document.getElementById('q-bank-list');
    const countEl = document.getElementById('q-bank-count');

    if (countEl) countEl.innerText = `${questions.length} câu`;

    if (listEl) {
      if (questions.length === 0) {
        listEl.innerHTML = '<div style="padding:1.5rem;text-align:center;color:#94a3b8;">Chưa có câu hỏi nào. Bấm "+ Thêm câu hỏi" để tạo!</div>';
        return;
      }
      let html = '';
      questions.forEach((q, idx) => {
        const letters = ['A', 'B', 'C', 'D'];
        html += `
          <div class="q-item">
            <div class="q-item-content">
              <div class="q-item-title">${idx + 1}. ${q.text}</div>
              <div class="q-item-options">
                ${q.options.map((opt, i) => `
                  <div class="${i === q.correctAnswer ? 'correct' : ''}">
                    ${letters[i]}. ${opt} ${i === q.correctAnswer ? '✓' : ''}
                  </div>
                `).join('')}
              </div>
            </div>
            <div style="display:flex;gap:0.35rem;">
              <button class="btn btn-secondary" style="padding:0.25rem 0.5rem;" onclick="window.game.openEditQuestion(${idx})">Sửa</button>
              <button class="btn btn-secondary" style="padding:0.25rem 0.5rem;color:#f43f5e;" onclick="window.game.deleteQuestion(${idx})">Xóa</button>
            </div>
          </div>
        `;
      });
      listEl.innerHTML = html;
    }
  }

  openAddQuestion() {
    this.editingIndex = null;
    const modal = document.getElementById('edit-question-modal');
    document.getElementById('edit-q-title').innerText = `Thêm câu hỏi mới cho ${this.editingTeam === 'blue' ? 'Đội Xanh' : 'Đội Đỏ'}`;
    document.getElementById('input-q-text').value = '';
    document.getElementById('input-opt-0').value = '';
    document.getElementById('input-opt-1').value = '';
    document.getElementById('input-opt-2').value = '';
    document.getElementById('input-opt-3').value = '';
    document.getElementById('input-correct').value = '0';
    if (modal) modal.classList.add('open');
  }

  openEditQuestion(idx) {
    this.editingIndex = idx;
    const list = this.editingTeam === 'blue' ? this.blueQuestions : this.redQuestions;
    const q = list[idx];
    if (!q) return;

    const modal = document.getElementById('edit-question-modal');
    document.getElementById('edit-q-title').innerText = `Chỉnh sửa câu hỏi #${idx + 1} (${this.editingTeam === 'blue' ? 'Đội Xanh' : 'Đội Đỏ'})`;
    document.getElementById('input-q-text').value = q.text;
    document.getElementById('input-opt-0').value = q.options[0] || '';
    document.getElementById('input-opt-1').value = q.options[1] || '';
    document.getElementById('input-opt-2').value = q.options[2] || '';
    document.getElementById('input-opt-3').value = q.options[3] || '';
    document.getElementById('input-correct').value = q.correctAnswer;
    if (modal) modal.classList.add('open');
  }

  saveQuestionFromForm() {
    const text = document.getElementById('input-q-text').value.trim();
    const opt0 = document.getElementById('input-opt-0').value.trim();
    const opt1 = document.getElementById('input-opt-1').value.trim();
    const opt2 = document.getElementById('input-opt-2').value.trim();
    const opt3 = document.getElementById('input-opt-3').value.trim();
    const correct = parseInt(document.getElementById('input-correct').value, 10);

    if (!text || !opt0 || !opt1 || !opt2 || !opt3) {
      alert('Vui lòng nhập đầy đủ nội dung câu hỏi và cả 4 đáp án!');
      return;
    }

    const newQ = {
      id: `custom_${Date.now()}`,
      text,
      options: [opt0, opt1, opt2, opt3],
      correctAnswer: correct
    };

    const list = this.editingTeam === 'blue' ? this.blueQuestions : this.redQuestions;
    if (this.editingIndex !== null) {
      list[this.editingIndex] = newQ;
    } else {
      list.push(newQ);
    }

    this.saveQuestions();
    this.renderQuestionBank();
    this.render();
    document.getElementById('edit-question-modal').classList.remove('open');
  }

  deleteQuestion(idx) {
    if (!confirm('Bạn có chắc chắn muốn xóa câu hỏi này không?')) return;
    const list = this.editingTeam === 'blue' ? this.blueQuestions : this.redQuestions;
    list.splice(idx, 1);
    this.saveQuestions();
    this.renderQuestionBank();
    this.render();
  }

  resetDefaultQuestions() {
    if (!confirm('Khôi phục lại toàn bộ bộ câu hỏi mặc định của cả 2 đội?')) return;
    this.blueQuestions = JSON.parse(JSON.stringify(DEFAULT_BLUE_QUESTIONS));
    this.redQuestions = JSON.parse(JSON.stringify(DEFAULT_RED_QUESTIONS));
    this.saveQuestions();
    this.renderQuestionBank();
    this.render();
    alert('Đã khôi phục thành công!');
  }

  exportQuestionsJSON() {
    const data = {
      blueQuestions: this.blueQuestions,
      redQuestions: this.redQuestions
    };
    const jsonStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', jsonStr);
    dlAnchor.setAttribute('download', 'cau_hoi_keo_co.json');
    dlAnchor.click();
  }

  importQuestionsJSON(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (parsed.blueQuestions && Array.isArray(parsed.blueQuestions)) {
          this.blueQuestions = parsed.blueQuestions;
        }
        if (parsed.redQuestions && Array.isArray(parsed.redQuestions)) {
          this.redQuestions = parsed.redQuestions;
        }
        this.saveQuestions();
        this.renderQuestionBank();
        this.render();
        alert('Nhập danh sách câu hỏi thành công!');
      } catch (err) {
        alert('File JSON không hợp lệ. Vui lòng kiểm tra lại cấu trúc file!');
      }
    };
    reader.readAsText(file);
  }
}

// --- 5. KHỞI TẠO VÀ LẮNG NGHE SỰ KIỆN TRÊN TRANG (BOOTSTRAP) ---
window.addEventListener('DOMContentLoaded', () => {
  window.game = new TugOfWarGame();
  window.game.render();
  window.game.startTimer();

  // Tab chuyển đổi: Đấu trường / Ngân hàng câu hỏi
  const tabArena = document.getElementById('tab-arena');
  const tabQuestions = document.getElementById('tab-questions');
  const viewArena = document.getElementById('view-arena');
  const viewQuestions = document.getElementById('view-questions');

  if (tabArena && tabQuestions) {
    tabArena.addEventListener('click', () => {
      tabArena.classList.add('active');
      tabQuestions.classList.remove('active');
      viewArena.style.display = 'block';
      viewQuestions.style.display = 'none';
      window.game.activeTab = 'arena';
    });

    tabQuestions.addEventListener('click', () => {
      tabQuestions.classList.add('active');
      tabArena.classList.remove('active');
      viewArena.style.display = 'none';
      viewQuestions.style.display = 'block';
      window.game.activeTab = 'questions';
      window.game.renderQuestionBank();
    });
  }

  // Âm thanh bật/tắt
  const btnSound = document.getElementById('btn-sound');
  if (btnSound) {
    btnSound.addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      btnSound.innerText = sound.enabled ? '🔊 Âm Thanh: BẬT' : '🔇 Âm Thanh: TẮT';
      btnSound.classList.toggle('active', sound.enabled);
    });
  }

  // Chế độ toàn màn hình
  const btnFullscreen = document.getElementById('btn-fullscreen');
  if (btnFullscreen) {
    btnFullscreen.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen().catch(() => {});
      }
    });
  }

  // Nút luật chơi
  const btnRules = document.getElementById('btn-rules');
  const modalRules = document.getElementById('rules-modal');
  if (btnRules && modalRules) {
    btnRules.addEventListener('click', () => modalRules.classList.add('open'));
  }

  // Nút Cài đặt chế độ đấu
  const btnMatchMode = document.getElementById('btn-match-mode');
  const modalMatchMode = document.getElementById('match-mode-modal');
  if (btnMatchMode && modalMatchMode) {
    btnMatchMode.addEventListener('click', () => {
      // Sync form with current settings
      document.getElementById('select-opponent-mode').value = window.game.opponentMode;
      document.getElementById('select-player-team').value = window.game.playerTeam;
      document.getElementById('select-ai-difficulty').value = window.game.aiDifficulty;
      document.getElementById('select-game-mode').value = window.game.gameMode;
      toggleAiOptionsVisibility();
      modalMatchMode.classList.add('open');
    });
  }

  const selectOpponent = document.getElementById('select-opponent-mode');
  if (selectOpponent) {
    selectOpponent.addEventListener('change', toggleAiOptionsVisibility);
  }

  function toggleAiOptionsVisibility() {
    const isAi = selectOpponent && selectOpponent.value === 'vs_ai';
    const aiFields = document.getElementById('ai-settings-group');
    if (aiFields) aiFields.style.display = isAi ? 'block' : 'none';
  }

  const btnApplyMatchMode = document.getElementById('btn-apply-match-mode');
  if (btnApplyMatchMode) {
    btnApplyMatchMode.addEventListener('click', () => {
      window.game.opponentMode = document.getElementById('select-opponent-mode').value;
      window.game.playerTeam = document.getElementById('select-player-team').value;
      window.game.aiDifficulty = document.getElementById('select-ai-difficulty').value;
      window.game.gameMode = document.getElementById('select-game-mode').value;

      // Update button header label
      if (btnMatchMode) {
        if (window.game.opponentMode === 'vs_ai') {
          btnMatchMode.innerText = `🤖 Đấu Máy (${window.game.playerTeam === 'blue' ? 'Đội Xanh' : 'Đội Đỏ'})`;
          btnMatchMode.className = 'btn btn-ai';
        } else {
          btnMatchMode.innerText = '👥 2 Người Chơi';
          btnMatchMode.className = 'btn btn-pvp';
        }
      }

      modalMatchMode.classList.remove('open');
      window.game.restart();
    });
  }

  // Nút đóng tất cả modal
  document.querySelectorAll('.modal-close, .btn-modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
    });
  });

  // Tab ngân hàng câu hỏi (Đội Xanh / Đội Đỏ)
  const qTabBlue = document.getElementById('q-bank-tab-blue');
  const qTabRed = document.getElementById('q-bank-tab-red');
  if (qTabBlue && qTabRed) {
    qTabBlue.addEventListener('click', () => {
      window.game.editingTeam = 'blue';
      qTabBlue.classList.add('active');
      qTabRed.classList.remove('active');
      window.game.renderQuestionBank();
    });
    qTabRed.addEventListener('click', () => {
      window.game.editingTeam = 'red';
      qTabRed.classList.add('active');
      qTabBlue.classList.remove('active');
      window.game.renderQuestionBank();
    });
  }

  // Import / Export JSON
  const btnExport = document.getElementById('btn-export-json');
  if (btnExport) {
    btnExport.addEventListener('click', () => window.game.exportQuestionsJSON());
  }

  const fileInput = document.getElementById('file-import-json');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files[0]) {
        window.game.importQuestionsJSON(e.target.files[0]);
      }
    });
  }
});
