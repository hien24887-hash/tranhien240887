import { Link } from "react-router-dom";
import { useRewards } from "../../lib/useRewards";
import { useWallet } from "../../lib/useWallet";
import Mascot from "./Mascot";

export default function RewardBadge() {
  const rewards = useRewards();
  const wallet = useWallet();

  return (
    <Link to="/wardrobe" className="reward-badge" title="Bấm để tới Tủ đồ mua quần áo">
      <Mascot size={30} equippedBySlot={wallet.equippedBySlot} />
      <span>⭐ {rewards.totalStars}</span>
      <span>🏆 {rewards.totalTrophies}</span>
      <span>💰 {wallet.balanceVnd.toLocaleString("vi-VN")}đ</span>
    </Link>
  );
}
