import React from 'react';
import { motion } from 'motion/react';
import { X, CheckCircle, XCircle, Trophy, HelpCircle } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800"
      >
        <div className="px-5 py-3.5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-base">Luật Chơi Kéo Co Trắc Nghiệm</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs sm:text-sm text-slate-700">
          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 font-bold shrink-0 flex items-center justify-center text-xs">
              1
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-0.5">Hai Đội Thi Đấu:</strong>
              Mỗi bên (Đội Xanh bên trái & Đội Đỏ bên phải) có sẵn 10 câu hỏi trắc nghiệm với 4 lựa chọn (A, B, C, D).
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-600 font-bold shrink-0 flex items-center justify-center text-xs">
              2
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-0.5">Thời Gian Trả Lời (15 Giây / Câu):</strong>
              Mỗi đội có tối đa <strong className="text-amber-700">15 giây</strong> cho lượt trả lời của mình. Nếu sau 15 giây không trả lời được, lượt chơi sẽ tự động chuyển sang cho đội tiếp theo và dây đứng yên!
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 font-bold shrink-0 flex items-center justify-center text-xs">
              3
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-0.5">Trả Lời Đúng (Dây kéo về):</strong>
              <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                <CheckCircle className="w-4 h-4 shrink-0" />
                Nếu đội nào trả lời đúng, đoạn dây sẽ được kéo về phía đội đó 1 bước!
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-rose-100 text-rose-600 font-bold shrink-0 flex items-center justify-center text-xs">
              4
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-0.5">Trả Lời Sai (Dây đứng yên):</strong>
              <div className="flex items-center gap-1.5 text-rose-600 font-bold">
                <XCircle className="w-4 h-4 shrink-0" />
                Nếu trả lời sai, đoạn dây vẫn đứng yên ở vị trí hiện tại.
              </div>
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 font-bold shrink-0 flex items-center justify-center text-xs">
              5
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-0.5">Xác Định Thắng Thua:</strong>
              Sau khi cả 2 đội hoàn thành 10 câu hỏi, đội nào kéo ruy-băng đỏ qua vạch giữa về phía mình nhiều hơn sẽ giành chiến thắng chung cuộc! (Hoặc thắng ngay nếu kéo qua vạch knockout).
            </div>
          </div>

          <div className="flex gap-3 items-start">
            <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 font-bold shrink-0 flex items-center justify-center text-xs">
              6
            </div>
            <div>
              <strong className="text-slate-900 block font-semibold mb-0.5">Tự Thêm Câu Hỏi:</strong>
              Mở tab <strong className="text-emerald-700">"Quản Lý Câu Hỏi"</strong> ở trên cùng để tự thêm, sửa, xóa, xáo trộn câu hỏi theo ý muốn!
            </div>
          </div>
        </div>

        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
          >
            Đã Hiểu & Bắt Đầu
          </button>
        </div>
      </motion.div>
    </div>
  );
};
