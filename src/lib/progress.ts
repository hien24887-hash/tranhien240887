// Lưu tiến trình luyện tập nhẹ vào localStorage (không cần backend).

const STORAGE_KEY = "ipa-app-progress-v1";

// Quy đổi thưởng: 10 ngôi sao -> 1 cúp, 50 cúp -> 50.000đ tiền thưởng.
const STARS_PER_TROPHY = 10;
const TROPHIES_PER_REWARD = 50;
const MONEY_PER_REWARD_VND = 50000;

interface WalletData {
  spentVnd: number;
  ownedItemIds: string[];
  equippedBySlot: Record<string, string>;
}

const EMPTY_WALLET: WalletData = { spentVnd: 0, ownedItemIds: [], equippedBySlot: {} };

interface ProgressState {
  wordStats: Record<string, { correct: number; attempts: number }>;
  storyScores: Record<string, { correct: number; total: number; playedAt: string }>;
  totalStars: number;
  wallet: WalletData;
}

const EMPTY_STATE: ProgressState = { wordStats: {}, storyScores: {}, totalStars: 0, wallet: EMPTY_WALLET };

function loadState(): ProgressState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return { wordStats: {}, storyScores: {}, totalStars: 0, wallet: { ...EMPTY_WALLET } };
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      wordStats: parsed.wordStats ?? {},
      storyScores: parsed.storyScores ?? {},
      totalStars: parsed.totalStars ?? 0,
      wallet: {
        spentVnd: parsed.wallet?.spentVnd ?? 0,
        ownedItemIds: parsed.wallet?.ownedItemIds ?? [],
        equippedBySlot: parsed.wallet?.equippedBySlot ?? {},
      },
    };
  } catch {
    return { wordStats: {}, storyScores: {}, totalStars: 0, wallet: { ...EMPTY_WALLET } };
  }
}

function saveState(state: ProgressState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

// Các component (VD: huy hiệu thưởng ở NavBar) đăng ký nghe ở đây để tự cập
// nhật ngay khi có nơi khác (VD: trang Viết phiên âm) vừa cộng thêm sao.
type Listener = () => void;
const listeners = new Set<Listener>();
function notify(): void {
  listeners.forEach((cb) => cb());
}
export function subscribeRewards(cb: Listener): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function recordWordAttempt(word: string, correct: boolean): void {
  const state = loadState();
  const stat = state.wordStats[word] ?? { correct: 0, attempts: 0 };
  stat.attempts += 1;
  if (correct) stat.correct += 1;
  state.wordStats[word] = stat;
  saveState(state);
}

export function recordStoryScore(storyId: string, correct: number, total: number): void {
  const state = loadState();
  state.storyScores[storyId] = { correct, total, playedAt: new Date().toISOString() };
  saveState(state);
}

export interface ProgressSummary {
  wordsTried: number;
  wordsMastered: number;
  storiesRead: number;
}

export function getProgressSummary(): ProgressSummary {
  const state = loadState();
  const wordsTried = Object.keys(state.wordStats).length;
  const wordsMastered = Object.values(state.wordStats).filter((s) => s.correct > 0).length;
  const storiesRead = Object.keys(state.storyScores).length;
  return { wordsTried, wordsMastered, storiesRead };
}

export function getStoryScores(): ProgressState["storyScores"] {
  return loadState().storyScores;
}

export interface RewardTotals {
  totalStars: number;
  totalTrophies: number;
  totalMoneyVnd: number;
}

export interface AwardResult extends RewardTotals {
  /** Số cúp MỚI vừa đạt được ở lần cộng sao này (0 nếu chưa đủ mốc). */
  newTrophies: number;
  /** Số tiền MỚI vừa đạt được ở lần cộng sao này (0 nếu chưa đủ mốc). */
  newMoneyVnd: number;
}

function trophiesFor(stars: number): number {
  return Math.floor(stars / STARS_PER_TROPHY);
}
function moneyFor(trophies: number): number {
  return Math.floor(trophies / TROPHIES_PER_REWARD) * MONEY_PER_REWARD_VND;
}

export function getRewards(): RewardTotals {
  const stars = loadState().totalStars;
  const trophies = trophiesFor(stars);
  return { totalStars: stars, totalTrophies: trophies, totalMoneyVnd: moneyFor(trophies) };
}

/** Cộng thêm sao khi bé hoàn thành 1 bài (đúng 1 từ, hoặc đọc xong 1 truyện). */
export function awardStars(amount: number): AwardResult {
  const state = loadState();
  const before = state.totalStars;
  const beforeTrophies = trophiesFor(before);
  const beforeMoney = moneyFor(beforeTrophies);

  const after = before + amount;
  state.totalStars = after;
  saveState(state);

  const afterTrophies = trophiesFor(after);
  const afterMoney = moneyFor(afterTrophies);
  notify();

  return {
    totalStars: after,
    totalTrophies: afterTrophies,
    totalMoneyVnd: afterMoney,
    newTrophies: afterTrophies - beforeTrophies,
    newMoneyVnd: afterMoney - beforeMoney,
  };
}

// ---------------------------------------------------------------------------
// Tủ đồ / cửa hàng — tiêu tiền thưởng (quy đổi từ cúp) để mua quần áo cho
// linh vật. Số dư tiêu được = tổng tiền đã quy đổi từ cúp trừ đi số đã tiêu.
// ---------------------------------------------------------------------------
export interface WalletInfo {
  earnedVnd: number;
  spentVnd: number;
  balanceVnd: number;
  ownedItemIds: string[];
  equippedBySlot: Record<string, string>;
}

export function getWallet(): WalletInfo {
  const state = loadState();
  const earnedVnd = moneyFor(trophiesFor(state.totalStars));
  return {
    earnedVnd,
    spentVnd: state.wallet.spentVnd,
    balanceVnd: earnedVnd - state.wallet.spentVnd,
    ownedItemIds: state.wallet.ownedItemIds,
    equippedBySlot: state.wallet.equippedBySlot,
  };
}

/** Mua 1 món đồ nếu chưa sở hữu và đủ số dư. Trả về false nếu không mua được. */
export function purchaseItem(itemId: string, priceVnd: number): boolean {
  const state = loadState();
  if (state.wallet.ownedItemIds.includes(itemId)) return false;
  const earnedVnd = moneyFor(trophiesFor(state.totalStars));
  const balance = earnedVnd - state.wallet.spentVnd;
  if (balance < priceVnd) return false;

  state.wallet.spentVnd += priceVnd;
  state.wallet.ownedItemIds = [...state.wallet.ownedItemIds, itemId];
  saveState(state);
  notify();
  return true;
}

/** Mặc/cởi 1 món đồ đã sở hữu ở vị trí (slot) của nó — bấm lại để cởi ra. */
export function toggleEquip(slot: string, itemId: string): void {
  const state = loadState();
  if (!state.wallet.ownedItemIds.includes(itemId)) return;
  const next = { ...state.wallet.equippedBySlot };
  if (next[slot] === itemId) {
    delete next[slot];
  } else {
    next[slot] = itemId;
  }
  state.wallet.equippedBySlot = next;
  saveState(state);
  notify();
}
