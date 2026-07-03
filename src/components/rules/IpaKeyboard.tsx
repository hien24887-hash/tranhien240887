const KEYS = [
  "/",
  "æ",
  "ɪ",
  "ɒ",
  "ʌ",
  "ə",
  "ɜ",
  "ɔ",
  "ɑ",
  "ʊ",
  "ː",
  "ŋ",
  "ʃ",
  "ʒ",
  "θ",
  "ð",
  "dʒ",
  "tʃ",
  "ˈ",
  "ˌ",
];

interface IpaKeyboardProps {
  onInsert: (symbol: string) => void;
}

export default function IpaKeyboard({ onInsert }: IpaKeyboardProps) {
  return (
    <div className="ipa-keyboard" role="group" aria-label="Bàn phím ký hiệu IPA">
      {KEYS.map((key) => (
        <button
          key={key}
          type="button"
          className="ipa-key"
          onClick={() => onInsert(key)}
          tabIndex={-1}
        >
          {key}
        </button>
      ))}
    </div>
  );
}
