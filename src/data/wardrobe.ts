// Kho quần áo cho linh vật — dùng tiền thưởng (quy đổi từ cúp) để mua.
// Mỗi vị trí (slot) có 2-3 "kiểu dáng" (shape) được vẽ sẵn trong Mascot.tsx;
// sự đa dạng của từng món đồ đến từ kiểu dáng + màu sắc + độ hiếm, giống
// cách các shop đồ hoá thân thật (VD ảnh tham khảo) hiển thị hàng chục món
// nhưng chỉ có vài khuôn dáng lặp lại với màu khác nhau.

export type ClothingSlot = "hat" | "hair" | "face" | "top" | "bottom" | "shoes" | "back";
export type Rarity = "common" | "rare" | "legendary";

export interface ClothingItem {
  id: string;
  name: string;
  slot: ClothingSlot;
  shape: string;
  rarity: Rarity;
  price: number;
  primary: string;
  secondary?: string;
}

export const slotLabels: Record<ClothingSlot, string> = {
  hat: "Mũ",
  hair: "Tóc",
  face: "Kính / Mặt nạ",
  top: "Áo",
  bottom: "Quần",
  shoes: "Giày",
  back: "Phụ kiện sau lưng",
};

export const slotIcons: Record<ClothingSlot, string> = {
  hat: "🧢",
  hair: "💇",
  face: "🕶️",
  top: "👕",
  bottom: "🩳",
  shoes: "👟",
  back: "🎒",
};

export const rarityLabels: Record<Rarity, string> = {
  common: "Chung",
  rare: "Hiếm",
  legendary: "Huyền thoại",
};

export const rarityColors: Record<Rarity, string> = {
  common: "#2e86de",
  rare: "#9b59b6",
  legendary: "#e67e22",
};

type Row = readonly [id: string, name: string, shape: string, rarity: Rarity, price: number, primary: string, secondary?: string];

function items(slot: ClothingSlot, rows: readonly Row[]): ClothingItem[] {
  return rows.map(([id, name, shape, rarity, price, primary, secondary]) => ({
    id,
    name,
    slot,
    shape,
    rarity,
    price,
    primary,
    secondary,
  }));
}

const hats = items("hat", [
  ["hat-cap-red", "Mũ lưỡi trai đỏ", "cap", "common", 8000, "#e74c3c", "#2e86de"],
  ["hat-cap-navy", "Mũ lưỡi trai xanh navy", "cap", "common", 8000, "#2c3e50", "#ecf0f1"],
  ["hat-cap-green", "Mũ lưỡi trai xanh lá", "cap", "common", 9000, "#27ae60", "#ffffff"],
  ["hat-beanie-grey", "Mũ len xám", "beanie", "common", 10000, "#95a5a6"],
  ["hat-beanie-purple", "Mũ len tím", "beanie", "rare", 22000, "#8e44ad"],
  ["hat-beanie-pink", "Mũ len hồng", "beanie", "rare", 20000, "#ff7fa8"],
  ["hat-cap-flame", "Mũ lưỡi trai lửa", "cap", "rare", 26000, "#e67e22", "#f1c40f"],
  ["hat-cap-camo", "Mũ lưỡi trai rằn ri", "cap", "rare", 24000, "#556b2f", "#8f9779"],
  ["hat-crown-gold", "Vương miện vàng", "crown", "legendary", 60000, "#f4c53d", "#e74c3c"],
  ["hat-crown-diamond", "Vương miện kim cương", "crown", "legendary", 90000, "#aee9f7", "#2e86de"],
]);

const hair = items("hair", [
  ["hair-short-black", "Tóc ngắn đen", "short", "common", 5000, "#1b1b1b"],
  ["hair-short-brown", "Tóc ngắn nâu", "short", "common", 5000, "#6b4423"],
  ["hair-short-blonde", "Tóc ngắn vàng", "short", "common", 6000, "#f1c76b"],
  ["hair-short-white", "Tóc ngắn bạc", "short", "rare", 16000, "#ecf0f1"],
  ["hair-spiky-red", "Tóc bờm đỏ", "spiky", "rare", 18000, "#e74c3c"],
  ["hair-spiky-blue", "Tóc bờm xanh", "spiky", "rare", 18000, "#2e86de"],
  ["hair-spiky-green", "Tóc bờm xanh lá", "spiky", "rare", 19000, "#27ae60"],
  ["hair-spiky-purple", "Tóc bờm tím huyền thoại", "spiky", "legendary", 55000, "#9b59b6", "#f4c53d"],
]);

const face = items("face", [
  ["face-sunglasses-black", "Kính râm đen", "glasses", "common", 9000, "#1b1b1b"],
  ["face-sunglasses-blue", "Kính râm xanh", "glasses", "common", 9000, "#2e86de"],
  ["face-glasses-round", "Kính tròn thư sinh", "glasses", "common", 7000, "#7f8c8d"],
  ["face-mask-hero", "Mặt nạ siêu anh hùng đỏ", "mask", "rare", 25000, "#e74c3c", "#1b1b1b"],
  ["face-mask-ninja", "Mặt nạ ninja đen", "mask", "rare", 23000, "#1b1b1b", "#7f8c8d"],
  ["face-sunglasses-gold", "Kính râm vàng huyền thoại", "glasses", "legendary", 65000, "#f4c53d"],
]);

const top = items("top", [
  ["top-tshirt-white", "Áo thun trắng trơn", "tshirt", "common", 6000, "#ffffff", "#dddddd"],
  ["top-tshirt-red", "Áo thun đỏ", "tshirt", "common", 8000, "#e74c3c"],
  ["top-tshirt-blue", "Áo thun xanh dương", "tshirt", "common", 8000, "#2e86de"],
  ["top-tshirt-yellow", "Áo thun vàng", "tshirt", "common", 8000, "#f4c53d"],
  ["top-tshirt-green", "Áo thun xanh lá", "tshirt", "common", 8000, "#27ae60"],
  ["top-jersey-red", "Áo đấu đỏ đen", "jersey", "rare", 22000, "#c0392b", "#1b1b1b"],
  ["top-jersey-blue", "Áo đấu xanh vàng", "jersey", "rare", 22000, "#2e86de", "#f4c53d"],
  ["top-jersey-camo", "Áo đấu rằn ri", "jersey", "rare", 24000, "#556b2f", "#8f9779"],
  ["top-jersey-galaxy", "Áo đấu thiên hà huyền thoại", "jersey", "legendary", 70000, "#34495e", "#9b59b6"],
  ["top-jersey-flame", "Áo đấu lửa huyền thoại", "jersey", "legendary", 75000, "#e67e22", "#1b1b1b"],
]);

const bottom = items("bottom", [
  ["bottom-shorts-black", "Quần short đen", "shorts", "common", 7000, "#1b1b1b"],
  ["bottom-shorts-blue", "Quần short xanh", "shorts", "common", 7000, "#2e86de"],
  ["bottom-shorts-green", "Quần short xanh lá", "shorts", "common", 7500, "#27ae60"],
  ["bottom-pants-denim", "Quần jean xanh", "pants", "common", 9000, "#346b8f"],
  ["bottom-pants-khaki", "Quần kaki be", "pants", "common", 8500, "#c9b48c"],
  ["bottom-shorts-camo", "Quần short rằn ri", "shorts", "rare", 20000, "#556b2f", "#8f9779"],
  ["bottom-shorts-flame", "Quần short lửa", "shorts", "rare", 21000, "#e67e22", "#1b1b1b"],
  ["bottom-pants-check", "Quần caro", "pants", "rare", 19000, "#7f8c8d", "#ecf0f1"],
  ["bottom-shorts-star", "Quần short sao huyền thoại", "shorts", "legendary", 55000, "#34495e", "#f4c53d"],
  ["bottom-pants-gold", "Quần vàng huyền thoại", "pants", "legendary", 60000, "#f4c53d", "#1b1b1b"],
]);

const shoes = items("shoes", [
  ["shoes-sneakers-white", "Giày sneaker trắng", "sneakers", "common", 8000, "#ffffff", "#cccccc"],
  ["shoes-sneakers-red", "Giày sneaker đỏ", "sneakers", "common", 9000, "#e74c3c"],
  ["shoes-sneakers-blue", "Giày sneaker xanh", "sneakers", "common", 9000, "#2e86de"],
  ["shoes-boots-brown", "Giày boot nâu", "boots", "common", 10000, "#6b4423"],
  ["shoes-sneakers-black", "Giày sneaker đen", "sneakers", "rare", 20000, "#1b1b1b", "#e74c3c"],
  ["shoes-boots-camo", "Giày boot rằn ri", "boots", "rare", 22000, "#556b2f"],
  ["shoes-sneakers-gold", "Giày sneaker vàng huyền thoại", "sneakers", "legendary", 58000, "#f4c53d", "#1b1b1b"],
]);

const back = items("back", [
  ["back-backpack-red", "Balo đỏ", "backpack", "common", 9000, "#e74c3c"],
  ["back-backpack-blue", "Balo xanh", "backpack", "common", 9000, "#2e86de"],
  ["back-cape-red", "Áo choàng đỏ", "cape", "rare", 20000, "#e74c3c"],
  ["back-cape-black", "Áo choàng đen huyền bí", "cape", "rare", 21000, "#1b1b1b", "#9b59b6"],
  ["back-skateboard-blue", "Ván trượt lửa xanh", "skateboard", "legendary", 65000, "#2e86de", "#e67e22"],
  ["back-skateboard-red", "Ván trượt lửa đỏ", "skateboard", "legendary", 68000, "#e74c3c", "#f4c53d"],
]);

export const wardrobeItems: ClothingItem[] = [...hats, ...hair, ...face, ...top, ...bottom, ...shoes, ...back];

export function findItem(id: string): ClothingItem | undefined {
  return wardrobeItems.find((item) => item.id === id);
}
