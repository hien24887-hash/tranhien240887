import PageShell from "../components/layout/PageShell";
import TranscribePractice from "../components/practice/TranscribePractice";

export default function Transcribe() {
  return (
    <PageShell
      title="Viết phiên âm"
      subtitle="Nhìn từ tiếng Anh, gõ đúng phiên âm IPA bằng bàn phím ký hiệu bên dưới"
    >
      <TranscribePractice />
    </PageShell>
  );
}
