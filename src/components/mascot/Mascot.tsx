// Linh vật avatar của app — nhân vật chibi tròn trịa (đầu to, thân bé bụ
// bẫm), có thể thay đồ (mũ/tóc/kính/áo/quần/giày/phụ kiện). Thiết kế gốc,
// không sao chép nhân vật có bản quyền cụ thể nào.

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

const INK = "#2a2f3d";
const SKIN = "#fdf1e6";

// Toạ độ khung: đầu to chiếm gần nửa chiều cao nhân vật (tỉ lệ chibi),
// thân bé tròn xoay, tay chân ngắn — khác hẳn dáng người thẳng trước đây.
const HEAD_CX = 100;
const HEAD_CY = 66;
const HEAD_R = 52;
const BODY_CX = 100;
const BODY_CY = 152;
const BODY_RX = 44;
const BODY_RY = 40;

function renderBack(item?: ClothingItem) {
  if (!item) return null;
  const { shape, primary, secondary } = item;
  if (shape === "backpack") {
    return (
      <g>
        <rect x="62" y="114" width="76" height="66" rx="20" fill={primary} stroke={INK} strokeWidth="2" />
        <rect x="84" y="122" width="32" height="12" rx="5" fill={secondary ?? "#ffffff"} />
      </g>
    );
  }
  if (shape === "cape") {
    return (
      <path
        d="M 66 116 L 20 214 L 100 184 L 180 214 L 134 116 Z"
        fill={primary}
        stroke={INK}
        strokeWidth="2"
        opacity={0.95}
      />
    );
  }
  if (shape === "skateboard") {
    return (
      <g>
        <rect
          x="48"
          y="196"
          width="104"
          height="16"
          rx="8"
          fill={primary}
          stroke={INK}
          strokeWidth="2"
          transform="rotate(-8 100 204)"
        />
        <circle cx="62" cy="216" r="7" fill={secondary ?? "#333"} stroke={INK} strokeWidth="1.5" />
        <circle cx="138" cy="216" r="7" fill={secondary ?? "#333"} stroke={INK} strokeWidth="1.5" />
      </g>
    );
  }
  return null;
}

function renderHair(item?: ClothingItem) {
  if (!item) return null;
  const { shape, primary } = item;
  if (shape === "short") {
    return (
      <path
        d="M 46 48 Q 100 -8 154 48 L 154 30 Q 100 -24 46 30 Z"
        fill={primary}
        stroke={INK}
        strokeWidth="2"
      />
    );
  }
  if (shape === "spiky") {
    return (
      <g fill={primary} stroke={INK} strokeWidth="2">
        <path d="M 62 34 L 54 4 L 76 24 Z" />
        <path d="M 88 22 L 88 -8 L 108 20 Z" />
        <path d="M 114 24 L 126 -2 L 138 34 Z" />
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
        <rect x="66" y="56" width="28" height="19" rx="9" fill={primary} opacity={0.88} stroke={INK} strokeWidth="1.5" />
        <rect x="106" y="56" width="28" height="19" rx="9" fill={primary} opacity={0.88} stroke={INK} strokeWidth="1.5" />
        <rect x="94" y="62" width="12" height="5" fill={primary} opacity={0.88} />
      </g>
    );
  }
  if (shape === "mask") {
    return (
      <path
        d="M 58 50 Q 100 38 142 50 L 142 78 Q 100 92 58 78 Z"
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
        <path d="M 44 44 Q 100 -10 156 44 L 156 54 Q 100 12 44 54 Z" fill={primary} stroke={INK} strokeWidth="2" />
        <ellipse cx="60" cy="54" rx="26" ry="7" fill={secondary ?? primary} stroke={INK} strokeWidth="2" />
      </g>
    );
  }
  if (shape === "beanie") {
    return <path d="M 44 46 Q 100 -14 156 46 L 156 58 L 44 58 Z" fill={primary} stroke={INK} strokeWidth="2" />;
  }
  if (shape === "crown") {
    return (
      <g>
        <path
          d="M 50 48 L 62 14 L 80 36 L 100 6 L 120 36 L 138 14 L 150 48 Z"
          fill={primary}
          stroke={INK}
          strokeWidth="2"
        />
        <circle cx="62" cy="14" r="4" fill={secondary ?? "#e74c3c"} />
        <circle cx="100" cy="6" r="4" fill={secondary ?? "#e74c3c"} />
        <circle cx="138" cy="14" r="4" fill={secondary ?? "#e74c3c"} />
      </g>
    );
  }
  return null;
}

function renderArms(cheering: boolean) {
  // Tay ngắn tròn kiểu chibi — vẽ trước để thân đè lên nửa trong, chỉ còn
  // thấy phần núm tròn nhô ra 2 bên, không cần khớp vai phức tạp.
  if (cheering) {
    return (
      <>
        <ellipse cx="42" cy="108" rx="17" ry="20" fill={SKIN} stroke={INK} strokeWidth="2" transform="rotate(-25 42 108)" />
        <ellipse cx="158" cy="108" rx="17" ry="20" fill={SKIN} stroke={INK} strokeWidth="2" transform="rotate(25 158 108)" />
      </>
    );
  }
  return (
    <>
      <ellipse cx="52" cy="150" rx="17" ry="20" fill={SKIN} stroke={INK} strokeWidth="2" />
      <ellipse cx="148" cy="150" rx="17" ry="20" fill={SKIN} stroke={INK} strokeWidth="2" />
    </>
  );
}

function renderTop(item?: ClothingItem) {
  const primary = item?.primary ?? "#e9ecef";
  const secondary = item?.secondary;
  const shape = item?.shape ?? "tshirt";
  return (
    <g>
      <ellipse cx={BODY_CX} cy={BODY_CY} rx={BODY_RX} ry={BODY_RY} fill={primary} stroke={INK} strokeWidth="2.5" />
      {shape === "jersey" && (
        <>
          <path
            d={`M ${BODY_CX} ${BODY_CY - BODY_RY} L ${BODY_CX} ${BODY_CY + BODY_RY}`}
            stroke={secondary ?? INK}
            strokeWidth="10"
            opacity={0.75}
          />
          <circle cx={BODY_CX} cy={BODY_CY - 6} r="10" fill="#ffffff" stroke={primary} strokeWidth="2" />
        </>
      )}
    </g>
  );
}

function renderBottom(item?: ClothingItem) {
  const primary = item?.primary ?? "#dfe6e9";
  const secondary = item?.secondary;
  const shape = item?.shape ?? "shorts";
  const height = shape === "pants" ? 36 : 22;
  const y = BODY_CY + BODY_RY - 14;
  return (
    <g>
      <rect x={BODY_CX - 34} y={y} width="68" height={height} rx="18" fill={primary} stroke={INK} strokeWidth="2" />
      {secondary && (
        <line
          x1={BODY_CX}
          y1={y}
          x2={BODY_CX}
          y2={y + height}
          stroke={secondary}
          strokeWidth="3"
          opacity={0.6}
        />
      )}
    </g>
  );
}

function renderShoes(item?: ClothingItem) {
  const primary = item?.primary ?? "#dcdde1";
  const secondary = item?.secondary;
  const shape = item?.shape ?? "sneakers";
  const ry = shape === "boots" ? 13 : 9;
  const cy = 206;
  return (
    <g>
      <ellipse cx="82" cy={cy} rx="17" ry={ry} fill={primary} stroke={INK} strokeWidth="2" />
      <ellipse cx="118" cy={cy} rx="17" ry={ry} fill={primary} stroke={INK} strokeWidth="2" />
      {secondary && (
        <>
          <ellipse cx="82" cy={cy - ry + 3} rx="10" ry="3" fill={secondary} />
          <ellipse cx="118" cy={cy - ry + 3} rx="10" ry="3" fill={secondary} />
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
    <svg width={size} height={(size * 230) / 200} viewBox="0 0 200 230" role="img" aria-label="Bạn avatar chibi">
      <defs>
        <radialGradient id="mascot-head-shine" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mascot-body-shine" cx="38%" cy="24%" r="80%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Bóng đổ dưới chân, để nhân vật có cảm giác đứng trên mặt đất. */}
      <ellipse cx="100" cy="222" rx="48" ry="7" fill="#1a2340" opacity={0.14} />

      {cheering && (
        <g fill="#ffb020" opacity={0.9}>
          <circle cx="18" cy="56" r="5" />
          <circle cx="184" cy="50" r="4" />
          <circle cx="14" cy="150" r="4" />
          <circle cx="188" cy="142" r="5" />
          <circle cx="100" cy="6" r="4" />
        </g>
      )}

      {renderBack(outfit?.back)}

      {/* Chân (da), nhô ra dưới thân và quần */}
      <ellipse cx="82" cy="200" rx="15" ry="12" fill={SKIN} stroke={INK} strokeWidth="2" />
      <ellipse cx="118" cy="200" rx="15" ry="12" fill={SKIN} stroke={INK} strokeWidth="2" />

      {renderShoes(outfit?.shoes)}

      {renderArms(cheering)}

      {renderTop(outfit?.top)}
      <ellipse
        cx={BODY_CX}
        cy={BODY_CY}
        rx={BODY_RX}
        ry={BODY_RY}
        fill="url(#mascot-body-shine)"
        pointerEvents="none"
      />

      {renderBottom(outfit?.bottom)}

      {/* Đầu — to, tròn, chiếm gần nửa chiều cao để đúng tỉ lệ chibi */}
      <circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} fill={SKIN} stroke={INK} strokeWidth="2.5" />
      <circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} fill="url(#mascot-head-shine)" pointerEvents="none" />

      {renderHair(outfit?.hair)}

      {/* Má hồng */}
      <ellipse cx="72" cy="82" rx="10" ry="5.5" fill="#ff9d8f" opacity={0.55} />
      <ellipse cx="128" cy="82" rx="10" ry="5.5" fill="#ff9d8f" opacity={0.55} />

      {/* Mắt — to tròn kiểu chibi, có chấm sáng lấp lánh */}
      <circle cx="80" cy="66" r="9" fill={INK} />
      <circle cx="120" cy="66" r="9" fill={INK} />
      <circle cx="77.5" cy="62.5" r="2.6" fill="#ffffff" />
      <circle cx="117.5" cy="62.5" r="2.6" fill="#ffffff" />
      {cheering && (
        <>
          <path d="M 71 66 Q 80 56 89 66" stroke="#ffffff" strokeWidth="2" fill="none" opacity={0.5} />
          <path d="M 111 66 Q 120 56 129 66" stroke="#ffffff" strokeWidth="2" fill="none" opacity={0.5} />
        </>
      )}

      {renderFace(outfit?.face)}

      {cheering ? (
        <path d="M 86 88 Q 100 100 114 88" stroke={INK} strokeWidth="2.6" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M 90 88 Q 100 94 110 88" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" opacity={0.7} />
      )}

      {renderHat(outfit?.hat)}
    </svg>
  );
}
