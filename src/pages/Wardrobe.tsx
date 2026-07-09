import { useState } from "react";
import PageShell from "../components/layout/PageShell";
import Mascot from "../components/mascot/Mascot";
import {
  wardrobeItems,
  findItem,
  slotLabels,
  slotIcons,
  shapeIcons,
  rarityLabels,
  rarityColors,
  type ClothingItem,
  type ClothingSlot,
} from "../data/wardrobe";
import { purchaseItem, toggleEquip } from "../lib/progress";
import { useWallet } from "../lib/useWallet";

const SLOT_ORDER: ClothingSlot[] = ["hat", "hair", "face", "top", "bottom", "shoes", "back"];

export default function Wardrobe() {
  const wallet = useWallet();
  const [activeSlot, setActiveSlot] = useState<ClothingSlot>("hat");
  // Đồ đang "mặc thử" — chỉ hiển thị tạm trên avatar, KHÔNG lưu lại, để bé
  // xem trước khi quyết định có mua hay không.
  const [previewBySlot, setPreviewBySlot] = useState<Partial<Record<ClothingSlot, ClothingItem>>>({});

  function handleBuy(item: ClothingItem) {
    const ok = purchaseItem(item.id, item.price);
    if (!ok) return;
    // Mặc luôn món vừa mua cho tiện, bé thấy hiệu quả ngay.
    toggleEquip(item.slot, item.id);
    setPreviewBySlot((prev) => {
      const next = { ...prev };
      delete next[item.slot];
      return next;
    });
  }

  function handleTryOn(item: ClothingItem) {
    setPreviewBySlot((prev) => {
      const next = { ...prev };
      if (next[item.slot]?.id === item.id) {
        delete next[item.slot]; // bấm lại món đang xem thử để bỏ, quay về đồ đang mặc thật
      } else {
        next[item.slot] = item;
      }
      return next;
    });
  }

  function handleClearPreview() {
    setPreviewBySlot({});
  }

  const hasPreview = Object.keys(previewBySlot).length > 0;

  // Ghép đồ đang mặc thật (đã sở hữu) với đồ đang mặc thử (ưu tiên hơn) để
  // hiển thị lên avatar xem trước ở đầu trang.
  const displayOutfit: Partial<Record<ClothingSlot, ClothingItem>> = {};
  for (const slot of SLOT_ORDER) {
    const equippedId = wallet.equippedBySlot[slot];
    const equippedItem = equippedId ? findItem(equippedId) : undefined;
    const preview = previewBySlot[slot];
    if (preview) displayOutfit[slot] = preview;
    else if (equippedItem) displayOutfit[slot] = equippedItem;
  }

  const itemsInSlot = wardrobeItems.filter((i) => i.slot === activeSlot);

  return (
    <PageShell
      title="Tủ đồ của bạn avatar"
      subtitle="Dùng tiền thưởng tích luỹ được (từ cúp) để mua quần áo cho linh vật — hoặc mặc thử trước khi mua"
    >
      <div className="mascot-row" style={{ flexDirection: "column", gap: "0.5rem" }}>
        <Mascot pose="cheer" size={140} equippedItems={displayOutfit} />
        <p className="score-line" style={{ marginTop: 0 }}>
          💰 Số dư: {wallet.balanceVnd.toLocaleString("vi-VN")}đ
          <span style={{ color: "#777", fontWeight: 400, fontSize: "0.9rem" }}>
            {" "}
            (đã kiếm {wallet.earnedVnd.toLocaleString("vi-VN")}đ — đã tiêu {wallet.spentVnd.toLocaleString("vi-VN")}đ)
          </span>
        </p>
        {hasPreview && (
          <div className="btn-row" style={{ justifyContent: "center" }}>
            <span className="unsupported-note" style={{ margin: 0 }}>
              👀 Đang mặc thử — chưa lưu lại. Bấm "Mua" để giữ, hoặc bỏ xem thử.
            </span>
            <button type="button" className="btn btn-ghost" onClick={handleClearPreview}>
              Bỏ xem thử
            </button>
          </div>
        )}
      </div>

      <div className="wardrobe-tabs">
        {SLOT_ORDER.map((slot) => (
          <button
            key={slot}
            type="button"
            className={"wardrobe-tab" + (activeSlot === slot ? " active" : "")}
            onClick={() => setActiveSlot(slot)}
            title={slotLabels[slot]}
          >
            <span className="wardrobe-tab__icon">{slotIcons[slot]}</span>
            <span className="wardrobe-tab__label">{slotLabels[slot]}</span>
          </button>
        ))}
      </div>

      <div className="wardrobe-grid">
        {itemsInSlot.map((item) => {
          const owned = wallet.ownedItemIds.includes(item.id);
          const equipped = wallet.equippedBySlot[activeSlot] === item.id;
          const previewing = previewBySlot[activeSlot]?.id === item.id;
          const canAfford = wallet.balanceVnd >= item.price;
          return (
            <div
              key={item.id}
              className={"wardrobe-card" + (equipped ? " equipped" : "") + (previewing ? " previewing" : "")}
            >
              <span className="wardrobe-card__rarity" style={{ background: rarityColors[item.rarity] }}>
                {rarityLabels[item.rarity]}
              </span>
              <div
                className="wardrobe-card__swatch"
                style={{
                  background: item.secondary
                    ? `linear-gradient(135deg, ${item.primary} 55%, ${item.secondary} 55%)`
                    : item.primary,
                }}
              >
                {shapeIcons[item.shape] ?? slotIcons[activeSlot]}
              </div>
              <div className="wardrobe-card__name">{item.name}</div>
              {owned ? (
                <button
                  type="button"
                  className={"btn" + (equipped ? " btn-primary" : "")}
                  onClick={() => toggleEquip(activeSlot, item.id)}
                >
                  {equipped ? "Đang mặc ✅" : "Mặc vào"}
                </button>
              ) : (
                <div className="btn-row" style={{ justifyContent: "center", flexWrap: "wrap" }}>
                  <button
                    type="button"
                    className={"btn btn-ghost" + (previewing ? " btn-primary" : "")}
                    onClick={() => handleTryOn(item)}
                  >
                    {previewing ? "👀 Đang xem thử" : "👀 Mặc thử"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary wardrobe-card__buy"
                    disabled={!canAfford}
                    onClick={() => handleBuy(item)}
                  >
                    {canAfford
                      ? `🔓 Mua — ${item.price.toLocaleString("vi-VN")}đ`
                      : `🔒 ${item.price.toLocaleString("vi-VN")}đ`}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </PageShell>
  );
}
