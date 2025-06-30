import React, { useEffect } from "react";

const Confetti = () => (
  <div className="absolute inset-0 pointer-events-none z-50">
    <style>{`
      .confetti {
        position: absolute;
        width: 8px;
        height: 16px;
        background: linear-gradient(135deg, #fbbf24, #f472b6, #60a5fa, #34d399);
        border-radius: 3px;
        opacity: 0.8;
        animation: confetti-fall 1.5s linear infinite;
      }
      @keyframes confetti-fall {
        0% { transform: translateY(-40px) rotate(0deg); }
        100% { transform: translateY(60px) rotate(360deg); }
      }
    `}</style>
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="confetti"
        style={{
          left: `${5 + Math.random() * 90}%`,
          animationDelay: `${Math.random()}s`,
          background: `hsl(${Math.random() * 360}, 80%, 70%)`,
        }}
      />
    ))}
  </div>
);

const Toast = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 2200);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;
  const isCongrats = message.includes("Congratulations");
  const emoji =
    message.match(
      /([\uD800-\uDBFF][\uDC00-\uDFFF]|[\u2600-\u27BF]|[\uE000-\uF8FF]|[\uD83C-\uDBFF\uDC00-\uDFFF])/g
    )?.[0] || "🎉";
  const text = message.replace(emoji, "").trim();

  return (
    <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative flex items-center gap-3 px-8 py-5 rounded-2xl shadow-2xl bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white text-xl font-semibold animate-toastIn min-w-[220px]">
        <span className="text-3xl md:text-4xl">{emoji}</span>
        <span>{text}</span>
        {isCongrats && <Confetti />}
      </div>
      <style>{`
        @keyframes toastIn {
          0% { opacity: 0; transform: translateY(30px) scale(0.95); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-toastIn {
          animation: toastIn 0.4s cubic-bezier(0.4,0,0.2,1) forwards;
        }
      `}</style>
    </div>
  );
};

export default Toast;
