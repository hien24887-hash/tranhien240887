// Linh vật avatar của app — nhân vật robot đơn giản, dễ thương, có thể thay
// đồ (mũ/tóc/kính/áo/quần/giày/phụ kiện), lấy cảm hứng chung từ các avatar
// hoá thân phổ biến (không sao chép nhân vật có bản quyền cụ thể nào).

import { findItem, type ClothingItem } from "../../data/wardrobe";

export type MascotPose = "idle" | "cheer";

interface MascotProps {
  pose?: MascotPose;
  size?: number;
  /** VD: { hat: "hat-crown-gold", top: "top-jersey-red" } */
  equippedBySlot?: Record<string, string>;
  /** Optional: truyền thẳng danh sách item đang mặc thay vì chỉ id (dùng ở trang Tủ đồ để xem trước). */
  equippedItems?: Partial<Record<ClothingItem["slot"], ClothingItem>>;
}

const INK = "#1b1b1b";
const SKIN = "#f5f6fa";

function renderBack(item?: ClothingItem) {
  if (!item) return null;
  const { shape, primary, secondary } = item;
  if (shape === "backpack") {
    return (
      <g>
        <rect x="72" y="100" width="56" height="58" rx="14" fill={primary} stroke={INK} strokeWidth="2" />
        <rect x="88" y="106" width="24" height="10" rx="4" fill={secondary ?? "#ffffff"} />
      </g>
    );
  }
  if (shape === "cape") {
    return <path d="M 70 100 L 26 215 L 100 178 L 174 215 L 130 100 Z" fill={primary} stroke={INK} strokeWidth="2" opacity={0.95} />;
  }
  if (shape === "skateboard") {
    return (
      <g>
        <rect
          x="55"
          y="128"
          width="90"
          height="16"
          rx="8"
          fill={primary}
          stroke={INK}
          strokeWidth="2"
          transform="rotate(-12 100 136)"
        />
        <circle cx="64" cy="152" r="6" fill={secondary ?? "#333"} stroke={INK} strokeWidth="1.5" />
        <circle cx="136" cy="152" r="6" fill={secondary ?? "#333"} stroke={INK} strokeWidth="1.5" />
      </g>
    );
  }
  return null;
}

function renderHair(item?: ClothingItem) {
  if (!item) return null;
  const { shape, primary } = item;
  if (shape === "short") {
    return <path d="M 58 38 Q 100 6 142 38 L 142 26 Q 100 -2 58 26 Z" fill={primary} stroke={INK} strokeWidth="2" />;
  }
  if (shape === "spiky") {
    return (
      <g fill={primary} stroke={INK} strokeWidth="2">
        <path d="M 68 30 L 62 4 L 80 22 Z" />
        <path d="M 90 22 L 90 -4 L 106 20 Z" />
        <path d="M 112 22 L 122 0 L 132 26 Z" />
      </g>
    );
  }
  return null;
}

function renderFace(item?: ClothingItem) {
  if (!item) return null;
  const { shape, primary, secondary } = item;
  if (shape === "glasses") {
    return (
      <g>
        <rect x="70" y="44" width="26" height="17" rx="8.5" fill={primary} opacity={0.88} stroke={INK} strokeWidth="1.5" />
        <rect x="104" y="44" width="26" height="17" rx="8.5" fill={primary} opacity={0.88} stroke={INK} strokeWidth="1.5" />
        <rect x="96" y="49" width="8" height="5" fill={primary} opacity={0.88} />
      </g>
    );
  }
  if (shape === "mask") {
    return (
      <path
        d="M 64 38 Q 100 27 136 38 L 136 62 Q 100 74 64 62 Z"
        fill={primary}
        stroke={secondary ?? INK}
        strokeWidth="2"
        opacity={0.92}
      />
    );
  }
  return null;
}

function renderHat(item?: ClothingItem) {
  if (!item) return null;
  const { shape, primary, secondary } = item;
  if (shape === "cap") {
    return (
      <g>
        <path d="M 56 34 Q 100 2 144 34 L 144 42 Q 100 16 56 42 Z" fill={primary} stroke={INK} strokeWidth="2" />
        <ellipse cx="70" cy="42" rx="22" ry="6" fill={secondary ?? primary} stroke={INK} strokeWidth="2" />
      </g>
    );
  }
  if (shape === "beanie") {
    return <path d="M 56 36 Q 100 0 144 36 L 144 46 L 56 46 Z" fill={primary} stroke={INK} strokeWidth="2" />;
  }
  if (shape === "crown") {
    return (
      <g>
        <path
          d="M 60 38 L 70 12 L 85 30 L 100 6 L 115 30 L 130 12 L 140 38 Z"
          fill={primary}
          stroke={INK}
          strokeWidth="2"
        />
        <circle cx="70" cy="12" r="3.5" fill={secondary ?? "#e74c3c"} />
        <circle cx="100" cy="6" r="3.5" fill={secondary ?? "#e74c3c"} />
        <circle cx="130" cy="12" r="3.5" fill={secondary ?? "#e74c3c"} />
      </g>
    );
  }
  return null;
}

function renderTop(item?: ClothingItem) {
  const primary = item?.primary ?? "#e9ecef";
  const secondary = item?.secondary;
  const shape = item?.shape ?? "tshirt";
  if (shape === "jersey") {
    return (
      <g>
        <rect x="64" y="98" width="72" height="64" rx="20" fill={primary} stroke={INK} strokeWidth="2" />
        <rect x="64" y="98" width="18" height="64" rx="9" fill={secondary ?? INK} opacity={0.85} />
        <circle cx="100" cy="126" r="9" fill="#ffffff" stroke={primary} strokeWidth="2" />
      </g>
    );
  }
  return <rect x="64" y="98" width="72" height="64" rx="20" fill={primary} stroke={INK} strokeWidth="2" />;
}

function renderBottom(item?: ClothingItem) {
  const primary = item?.primary ?? "#dfe6e9";
  const secondary = item?.secondary;
  const shape = item?.shape ?? "shorts";
  const height = shape === "pants" ? 58 : 32;
  return (
    <g>
      <rect x="66" y="162" width="68" height={height} rx="14" fill={primary} stroke={INK} strokeWidth="2" />
      {secondary && <line x1="100" y1="162" x2="100" y2={162 + height} stroke={secondary} strokeWidth="3" opacity={0.6} />}
    </g>
  );
}

function renderShoes(item?: ClothingItem) {
  const primary = item?.primary ?? "#dcdde1";
  const secondary = item?.secondary;
  const shape = item?.shape ?? "sneakers";
  const h = shape === "boots" ? 22 : 16;
  return (
    <g>
      <rect x="70" y={244 - h} width="26" height={h} rx="8" fill={primary} stroke={INK} strokeWidth="2" />
      <rect x="104" y={244 - h} width="26" height={h} rx="8" fill={primary} stroke={INK} strokeWidth="2" />
      {secondary && (
        <>
          <rect x="70" y={244 - h} width="26" height="5" rx="2.5" fill={secondary} />
          <rect x="104" y={244 - h} width="26" height="5" rx="2.5" fill={secondary} />
        </>
      )}
    </g>
  );
}

export default function Mascot({ pose = "idle", size = 96, equippedBySlot, equippedItems }: MascotProps) {
  const cheering = pose === "cheer";

  // Trang Tủ đồ truyền thẳng `equippedItems` (xem trước khi chưa lưu); các
  // nơi khác trong app chỉ có id đã lưu nên tra cứu qua wardrobeItems.
  let outfit = equippedItems;
  if (!outfit && equippedBySlot) {
    outfit = {};
    for (const [slot, itemId] of Object.entries(equippedBySlot)) {
      const found = findItem(itemId);
      if (found) (outfit as Record<string, ClothingItem>)[slot] = found;
    }
  }

  return (
    <svg width={size} height={(size * 250) / 200} viewBox="0 0 200 250" role="img" aria-label="Bạn avatar mèo máy">
      {cheering && (
        <g fill="#f4c53d" opacity={0.9}>
          <circle cx="20" cy="50" r="5" />
          <circle cx="180" cy="46" r="4" />
          <circle cx="16" cy="150" r="4" />
          <circle cx="186" cy="140" r="5" />
          <circle cx="100" cy="10" r="4" />
        </g>
      )}

      {renderBack(outfit?.back)}

      {/* Chân (da) */}
      <rect x="74" y="196" width="16" height="42" rx="6" fill={SKIN} stroke={INK} strokeWidth="2" />
      <rect x="110" y="196" width="16" height="42" rx="6" fill={SKIN} stroke={INK} strokeWidth="2" />

      {renderShoes(outfit?.shoes)}
      {renderBottom(outfit?.bottom)}

      {/* Tay */}
      {cheering ? (
        <>
          <rect x="18" y="98" width="20" height="52" rx="10" fill={SKIN} stroke={INK} strokeWidth="2" transform="rotate(-35 28 104)" />
          <rect x="162" y="98" width="20" height="52" rx="10" fill={SKIN} stroke={INK} strokeWidth="2" transform="rotate(35 172 104)" />
        </>
      ) : (
        <>
          <rect x="38" y="104" width="20" height="54" rx="10" fill={SKIN} stroke={INK} strokeWidth="2" />
          <rect x="142" y="104" width="20" height="54" rx="10" fill={SKIN} stroke={INK} strokeWidth="2" />
        </>
      )}

      {renderTop(outfit?.top)}

      {/* Cổ */}
      <rect x="90" y="88" width="20" height="14" fill={SKIN} stroke={INK} strokeWidth="2" />

      {/* Đầu */}
      <circle cx="100" cy="52" r="42" fill={SKIN} stroke={INK} strokeWidth="2.5" />

      {renderHair(outfit?.hair)}

      {/* Mắt */}
      <ellipse cx="84" cy="50" rx="7" ry="10" fill={INK} />
      <ellipse cx="116" cy="50" rx="7" ry="10" fill={INK} />
      {cheering && (
        <>
          <path d="M 76 50 Q 84 42 92 50" stroke="#ffffff" strokeWidth="2" fill="none" opacity={0.5} />
          <path d="M 108 50 Q 116 42 124 50" stroke="#ffffff" strokeWidth="2" fill="none" opacity={0.5} />
        </>
      )}

      {renderFace(outfit?.face)}

      {cheering && <path d="M 88 68 Q 100 78 112 68" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />}

      {renderHat(outfit?.hat)}
    </svg>
  );
}
