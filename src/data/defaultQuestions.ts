import { Question } from '../types';

export const DEFAULT_LEFT_QUESTIONS: Question[] = [
  {
    id: 'l-1',
    question: 'Thủ đô của Việt Nam là thành phố nào?',
    options: ['Đà Nẵng', 'Hà Nội', 'TP. Hồ Chí Minh', 'Hải Phòng'],
    correctAnswer: 1,
    explanation: 'Hà Nội là thủ đô ngàn năm văn hiến của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.'
  },
  {
    id: 'l-2',
    question: 'Hành tinh nào gần Mặt Trời nhất trong Hệ Mặt Trời?',
    options: ['Sao Kim', 'Sao Hỏa', 'Sao Thủy', 'Trái Đất'],
    correctAnswer: 2,
    explanation: 'Sao Thủy (Mercury) là hành tinh có quỹ đạo gần Mặt Trời nhất.'
  },
  {
    id: 'l-3',
    question: 'Đỉnh núi nào cao nhất Việt Nam và được mệnh danh là nóc nhà Đông Dương?',
    options: ['Bạch Mộc Lương Tử', 'Phan Xi Păng', 'Pu Si Lung', 'Tây Côn Lĩnh'],
    correctAnswer: 1,
    explanation: 'Phan Xi Păng có độ cao 3.143m thuộc dãy Hoàng Liên Sơn, tỉnh Lào Cai.'
  },
  {
    id: 'l-4',
    question: 'Cơ quan nào trong cơ thể con người thực hiện chức năng lọc máu chính?',
    options: ['Tim', 'Dạ dày', 'Thận', 'Phổi'],
    correctAnswer: 2,
    explanation: 'Thận lọc khoảng 120-150 lít máu mỗi ngày để loại bỏ chất thải qua nước tiểu.'
  },
  {
    id: 'l-5',
    question: 'Kim loại nào có tính dẫn điện tốt nhất ở nhiệt độ phòng?',
    options: ['Vàng', 'Đồng', 'Bạc', 'Nhôm'],
    correctAnswer: 2,
    explanation: 'Bạc là kim loại dẫn điện và dẫn nhiệt tốt nhất, kế tiếp là đồng và vàng.'
  },
  {
    id: 'l-6',
    question: 'Bao nhiêu giây có trong một giờ?',
    options: ['1.800 giây', '3.600 giây', '2.400 giây', '6.000 giây'],
    correctAnswer: 1,
    explanation: '1 giờ = 60 phút = 60 × 60 = 3.600 giây.'
  },
  {
    id: 'l-7',
    question: 'Ai là tác giả của tác phẩm "Truyện Kiều"?',
    options: ['Nguyễn Trãi', 'Hồ Xuân Hương', 'Nguyễn Du', 'Đoàn Thị Điểm'],
    correctAnswer: 2,
    explanation: 'Đại thi hào Nguyễn Du (1765–1820) là tác giả của kiệt tác Đoạn Trường Tân Thanh (Truyện Kiều).'
  },
  {
    id: 'l-8',
    question: 'Đại dương nào có diện tích lớn nhất trên Trái Đất?',
    options: ['Đại Tây Dương', 'Ấn Độ Dương', 'Bắc Băng Dương', 'Thái Bình Dương'],
    correctAnswer: 3,
    explanation: 'Thái Bình Dương chiếm hơn 30% diện tích bề mặt Trái Đất.'
  },
  {
    id: 'l-9',
    question: 'Chất khí nào chiếm tỉ lệ phần trăm thể tích lớn nhất trong không khí quyển Trái Đất?',
    options: ['Oxy (O2)', 'Khí Nitơ (N2)', 'Cacbonic (CO2)', 'Khí Hiđrô (H2)'],
    correctAnswer: 1,
    explanation: 'Khí Nitơ chiếm khoảng 78% thể tích bầu khí quyển Trái Đất, Oxy chiếm khoảng 21%.'
  },
  {
    id: 'l-10',
    question: 'Loài động vật nào sau đây là thú có túi đặc trưng của châu Úc?',
    options: ['Gấu trúc lớn', 'Chuột túi Kangaroo', 'Hổ Siberia', 'Chim cánh cụt'],
    correctAnswer: 1,
    explanation: 'Kangaroo là loài thú có túi nổi tiếng nhất của nước Úc.'
  }
];

export const DEFAULT_RIGHT_QUESTIONS: Question[] = [
  {
    id: 'r-1',
    question: 'Con sông nào dài nhất thế giới theo ghi nhận phổ biến?',
    options: ['Sông Amazon', 'Sông Nile', 'Sông Mê Kông', 'Sông Trường Giang'],
    correctAnswer: 1,
    explanation: 'Sông Nile ở châu Phi dài khoảng 6.650 km, theo truyền thống được coi là con sông dài nhất thế giới.'
  },
  {
    id: 'r-2',
    question: 'Việt Nam có đường bờ biển dài khoảng bao nhiêu km?',
    options: ['1.650 km', '2.360 km', '3.260 km', '4.120 km'],
    correctAnswer: 2,
    explanation: 'Việt Nam sở hữu đường bờ biển dài hơn 3.260 km trải dài từ Móng Cái đến Hà Tiên.'
  },
  {
    id: 'r-3',
    question: 'Chất nào tạo nên màu xanh lục của lá cây giúp cây quang hợp?',
    options: ['Caroten', 'Diệp lục (Clorophyl)', 'Hemoglobin', 'Melanin'],
    correctAnswer: 1,
    explanation: 'Chất diệp lục hấp thụ ánh sáng mặt trời để tổng hợp chất dinh dưỡng trong quá trình quang hợp.'
  },
  {
    id: 'r-4',
    question: 'Bác Hồ đọc Tuyên ngôn Độc lập khai sinh nước VNDCCH vào năm nào?',
    options: ['1930', '1945', '1954', '1975'],
    correctAnswer: 1,
    explanation: 'Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập tại Quảng trường Ba Đình vào ngày 2/9/1945.'
  },
  {
    id: 'r-5',
    question: 'Trong toán học, số nguyên tố chẵn duy nhất là số nào?',
    options: ['0', '2', '4', '6'],
    correctAnswer: 1,
    explanation: 'Số 2 là số nguyên tố chẵn duy nhất, tất cả các số chẵn khác đều chia hết cho 2.'
  },
  {
    id: 'r-6',
    question: 'Nước đá bắt đầu nóng chảy thành nước ở nhiệt độ bao nhiêu độ C (áp suất chuẩn)?',
    options: ['-5°C', '0°C', '4°C', '100°C'],
    correctAnswer: 1,
    explanation: 'Nước đá tinh khiết nóng chảy ở 0°C và nước sôi ở 100°C dưới áp suất khí quyển chuẩn.'
  },
  {
    id: 'r-7',
    question: 'Loài chim nào có khả năng bay lùi duy nhất trên thế giới?',
    options: ['Chim sẻ', 'Chim ruồi', 'Chim ưng', 'Chim bồ câu'],
    correctAnswer: 1,
    explanation: 'Chim ruồi có cấu trúc khớp cánh linh hoạt đặc biệt giúp chúng có thể bay lùi và lơ lửng tại chỗ.'
  },
  {
    id: 'r-8',
    question: 'Quốc gia nào có diện tích lãnh thổ lớn nhất thế giới?',
    options: ['Canada', 'Hoa Kỳ', 'Trung Quốc', 'Nga'],
    correctAnswer: 3,
    explanation: 'Liên bang Nga là quốc gia có diện tích lớn nhất thế giới với hơn 17 triệu km².'
  },
  {
    id: 'r-9',
    question: 'Đơn vị đo cường độ dòng điện trong hệ SI là gì?',
    options: ['Vôn (V)', 'Oát (W)', 'Ampe (A)', 'Ôm (Ω)'],
    correctAnswer: 2,
    explanation: 'Ampe (ký hiệu là A) là đơn vị đo cường độ dòng điện trong hệ đo lường quốc tế SI.'
  },
  {
    id: 'r-10',
    question: 'Vịnh biển nào của Việt Nam được UNESCO hai lần công nhận là Di sản Thiên nhiên Thế giới?',
    options: ['Vịnh Cam Ranh', 'Vịnh Hạ Long', 'Vịnh Nha Trang', 'Vịnh Lăng Cô'],
    correctAnswer: 1,
    explanation: 'Vịnh Hạ Long được UNESCO công nhận Di sản Thiên nhiên Thế giới vào năm 1994 và năm 2000.'
  }
];

export const EXTRA_QUESTION_POOL: Question[] = [
  {
    id: 'p-1',
    question: 'Âm thanh không thể truyền được trong môi trường nào?',
    options: ['Chất rắn', 'Chất lỏng', 'Chất khí', 'Chân không'],
    correctAnswer: 3,
    explanation: 'Sóng âm cần môi trường vật chất mang hạt để lan truyền dao động, do đó không truyền được trong chân không.'
  },
  {
    id: 'p-2',
    question: 'Ngôi sao nào ở gần Trái Đất nhất?',
    options: ['Sao Bắc Đẩu', 'Mặt Trời', 'Sao Kim', 'Alpha Centauri'],
    correctAnswer: 1,
    explanation: 'Mặt Trời chính là ngôi sao trung tâm của Hệ Mặt Trời và ở khoảng cách gần Trái Đất nhất (~150 triệu km).'
  },
  {
    id: 'p-3',
    question: 'Tam giác đều có mỗi góc trong bằng bao nhiêu độ?',
    options: ['45°', '60°', '90°', '120°'],
    correctAnswer: 1,
    explanation: 'Tổng ba góc của một tam giác là 180°, nên trong tam giác đều mỗi góc bằng 180° / 3 = 60°.'
  },
  {
    id: 'p-4',
    question: 'Loài cây nào được coi là biểu tượng của tinh thần quật cường người Việt Nam?',
    options: ['Cây tre', 'Cây đa', 'Cây thông', 'Cây dừa'],
    correctAnswer: 0,
    explanation: 'Cây tre là biểu tượng truyền thống về sự dẻo dai, kiên cường và đoàn kết của con người Việt Nam.'
  },
  {
    id: 'p-5',
    question: 'Động vật có vú lớn nhất từng sống trên Trái Đất là loài nào?',
    options: ['Voi châu Phi', 'Khủng long bạo chúa', 'Cá voi xanh', 'Hà mã khổng lồ'],
    correctAnswer: 2,
    explanation: 'Cá voi xanh có thể dài tới 30m và nặng gần 200 tấn, là động vật lớn nhất từng được biết đến.'
  }
];
