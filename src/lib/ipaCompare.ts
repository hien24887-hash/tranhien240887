// Chuẩn hoá & so sánh chuỗi IPA người dùng gõ với đáp án đúng.
// Bỏ dấu /, khoảng trắng, dấu trọng âm (ˈ ˌ) để việc chấm điểm khoan dung hơn
// với học sinh — các em chỉ cần gõ đúng các ký hiệu âm, không bắt buộc trọng âm.

export function normalizeIpa(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[/[\]]/g, "")
    .replace(/[ˈˌ]/g, "")
    .replace(/\s+/g, "");
}

export function compareIpa(userInput: string, correctIpa: string): boolean {
  const candidates = correctIpa
    .split(/hoặc|,/)
    .map((s) => s.trim())
    .filter(Boolean);
  const normalizedCandidates = (candidates.length ? candidates : [correctIpa]).map(normalizeIpa);
  const userNorm = normalizeIpa(userInput);
  return normalizedCandidates.includes(userNorm);
}
