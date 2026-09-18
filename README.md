# 🏆 TRÒ CHƠI KÉO CO TRI THỨC (TUG OF WAR QUIZ GAME)

Trò chơi trắc nghiệm kéo co đối kháng tương tác trực tiếp trên trình duyệt, hỗ trợ:
- 👥 **2 Người chơi (PvP)**: Đối kháng trên cùng 1 thiết bị.
- 🤖 **Chơi với Máy (AI)**: 3 cấp độ thông minh (Dễ, Vừa, Khó), tự động suy nghĩ và chọn đáp án.
- ⏱️ **Đồng hồ đếm ngược 15 giây** sinh động mỗi câu hỏi.
- 🎨 **Hiệu ứng kéo dây**: Nhân vật Chibi kéo co, dải ruy-băng chuyển động mượt mà, thước đo bước kéo và Knockout (+/- 5 bước).
- 🔊 **Âm thanh tích hợp**: Sử dụng Web Audio API (tiếng còi, kéo dây, trả lời đúng/sai, kèn chiến thắng) - không cần tải file MP3 bên ngoài!
- 📝 **Ngân hàng câu hỏi tùy chỉnh**: Thêm, sửa, xóa, nhập / xuất file JSON trực tiếp.

---

## 🚀 HƯỚNG DẪN DEPLOY LÊN GITHUB PAGES (Chỉ mất 1 phút)

Trò chơi được viết bằng mã nguồn chuẩn **HTML, CSS và JavaScript thuần (Vanilla JS)**, không yêu cầu cài đặt Node.js hay lệnh build phức tạp. Bạn có thể mở trực tiếp tệp `index.html` hoặc đưa lên GitHub Pages như sau:

### Cách 1: Đẩy trực tiếp lên GitHub Pages (Đơn giản nhất)
1. Tạo một Repository mới trên GitHub (ví dụ: `tro-choi-keo-co`).
2. Tải toàn bộ các tệp lên Repository:
   - `index.html`
   - `style.css`
   - `app.js`
   - `README.md`
3. Trên GitHub, vào mục **Settings** -> chọn menu **Pages** ở thanh bên trái.
4. Tại mục **Build and deployment**:
   - **Source**: Chọn `Deploy from a branch`
   - **Branch**: Chọn nhánh `main` (hoặc `master`), thư mục chọn `/ (root)` -> Bấm **Save**.
5. Đợi khoảng 30 giây đến 1 phút, GitHub sẽ cung cấp cho bạn một đường link trang web trực tuyến:
   `https://<ten-tai-khoan>.github.io/<ten-repo>/`

---

### Cách 2: Chạy trực tiếp trên máy tính (Offline)
- Chỉ cần nhấp đúp chuột vào tệp `index.html` để mở trên bất kỳ trình duyệt nào (Chrome, Edge, Cốc Cốc, Safari, Firefox).
- Trò chơi hoạt động 100% offline không cần kết nối mạng.
