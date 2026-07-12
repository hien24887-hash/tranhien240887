const TRIAL_DAYS = 4;

/** Còn hạn dùng (đã kích hoạt vĩnh viễn, hoặc vẫn trong 4 ngày dùng thử). */
export function isWithinAccess(user: { isActivated: boolean; createdAt: Date }): boolean {
  if (user.isActivated) return true;
  const trialEndsAt = new Date(user.createdAt.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
  return new Date() < trialEndsAt;
}

/** Số ngày dùng thử còn lại (làm tròn lên), 0 nếu đã hết hạn hoặc đã kích hoạt. */
export function trialDaysLeft(createdAt: Date): number {
  const trialEndsAt = new Date(createdAt.getTime() + TRIAL_DAYS * 24 * 60 * 60 * 1000);
  const msLeft = trialEndsAt.getTime() - Date.now();
  return Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
}
