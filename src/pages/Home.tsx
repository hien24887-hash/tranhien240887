import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import PageShell from "../components/layout/PageShell";
import { getProgressSummary, type ProgressSummary } from "../lib/progress";
import { useRewards } from "../lib/useRewards";
import { useWallet } from "../lib/useWallet";
import Mascot from "../components/mascot/Mascot";
import SpeechBubble from "../components/mascot/SpeechBubble";

export default function Home() {
  const [summary, setSummary] = useState<ProgressSummary | null>(null);
  const rewards = useRewards();
  const wallet = useWallet();

  useEffect(() => {
    setSummary(getProgressSummary());
  }, []);

  const starsToNextTrophy = 10 - (rewards.totalStars % 10 || 10);
  const trophiesToNextReward = 50 - (rewards.totalTrophies % 50 || 50);
  const greeting =
    rewards.totalStars === 0
      ? "Chào con! Làm đúng 1 bài là được 1 ngôi sao ⭐ — thử ngay nhé!"
      : `Con đã có ${rewards.totalStars} ⭐ và ${rewards.totalTrophies} 🏆 rồi! Làm thêm ${starsToNextTrophy} sao nữa là được 1 cúp mới, và thêm ${trophiesToNextReward} cúp nữa là được 50.000đ tiền thưởng đó!`;

  return (
    <PageShell
      title="Luyện Phiên Âm IPA"
      subtitle="Học quy tắc đọc — viết phiên âm — đọc truyện và tự sửa lỗi phát âm"
    >
      <div className="mascot-row">
        <Mascot
          pose={rewards.totalStars > 0 ? "cheer" : "idle"}
          size={100}
          equippedBySlot={wallet.equippedBySlot}
        />
        <SpeechBubble>{greeting}</SpeechBubble>
      </div>

      <div className="home-hero">
        <p>
          Chào con! Ở đây con sẽ học <strong>quy tắc đọc âm</strong> kiểu Oxford, luyện{" "}
          <strong>viết phiên âm IPA</strong> và <strong>đọc truyện</strong> có sửa lỗi đọc ngay tại chỗ.
        </p>
        <div className="progress-bar">
          <span className="progress-pill">⭐ {rewards.totalStars} sao</span>
          <span className="progress-pill">🏆 {rewards.totalTrophies} cúp</span>
          <Link
            to="/wardrobe"
            className="progress-pill"
            style={{ textDecoration: "none", color: "var(--maroon-dark)" }}
          >
            💰 {wallet.balanceVnd.toLocaleString("vi-VN")}đ — mua đồ ở Tủ đồ →
          </Link>
        </div>
        {summary && (
          <div className="progress-bar">
            <span className="progress-pill">✍️ {summary.wordsTried} từ đã luyện viết</span>
            <span className="progress-pill">✅ {summary.wordsMastered} từ đã đọc đúng</span>
            <span className="progress-pill">📖 {summary.storiesRead} truyện đã đọc</span>
          </div>
        )}
        <p style={{ fontSize: "0.9rem", color: "#777", textAlign: "center", marginTop: "0.5rem" }}>
          Quy đổi thưởng: hoàn thành đúng 1 bài = 1 ⭐ — đủ 10 ⭐ = 1 🏆 — đủ 50 🏆 = 50.000đ từ bố mẹ.
        </p>
      </div>

      <div className="home-cards">
        <Link to="/rules" className="home-card">
          <span className="home-card__icon">📖</span>
          <span className="home-card__title">Quy tắc đọc</span>
          <p>Cây quy tắc nguyên âm, phụ âm — giải thích đơn giản kiểu Feynman, có ví dụ nghe được.</p>
        </Link>
        <Link to="/transcribe" className="home-card">
          <span className="home-card__icon">✍️</span>
          <span className="home-card__title">Viết phiên âm</span>
          <p>Nhìn từ, gõ đúng phiên âm IPA bằng bàn phím ký hiệu riêng, được sửa và giải thích ngay.</p>
        </Link>
        <Link to="/read" className="home-card">
          <span className="home-card__icon">🗣️</span>
          <span className="home-card__title">Đọc truyện</span>
          <p>Đọc truyện ngắn kèm phiên âm, app nghe và tô màu từ đọc đúng/sai, gợi ý sửa lỗi.</p>
        </Link>
      </div>
    </PageShell>
  );
}
