import { useState } from 'react';
import { useStore } from '../../store';
import { playSound } from '../../audio';

interface DialItem { text: string; category: string; }

interface Props {
  items: DialItem[];
  categories: string[];
  onComplete: () => void;
  instruction?: string;
}

export default function DialInteraction({ items, categories, onComplete, instruction }: Props) {
  const [selections, setSelections] = useState<number[]>(items.map(() => 0));
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState<boolean[]>([]);
  const { addXP, soundOn } = useStore();

  function cycle(idx: number, dir: 1 | -1) {
    if (submitted) return;
    setSelections(prev => {
      const next = [...prev];
      next[idx] = (next[idx] + dir + categories.length) % categories.length;
      return next;
    });
  }

  function handleSubmit() {
    const results = items.map((item, i) => categories[selections[i]] === item.category);
    setCorrect(results);
    setSubmitted(true);
    if (results.every(Boolean)) {
      if (soundOn) playSound('correct');
      addXP(15);
      setTimeout(onComplete, 1500);
    } else {
      if (soundOn) playSound('wrong');
    }
  }

  function handleRetry() {
    setSubmitted(false);
    setCorrect([]);
    setSelections(items.map(() => 0));
  }

  const allCorrect = submitted && correct.every(Boolean);
  const anyWrong = submitted && !allCorrect;

  return (
    <div className="interaction-box dial-container">
      {instruction && <p className="instruction-text">{instruction}</p>}
      {items.map((item, i) => (
        <div key={i} className={`dial-item${submitted ? (correct[i] ? ' correct-dial' : ' wrong-dial') : ''}`}>
          <span className="dial-item-text">{item.text}</span>
          <div className="dial-controls" role="group" aria-label={`Category for: ${item.text}`}>
            <button className="dial-btn" onClick={() => cycle(i, -1)} aria-label="Previous category" disabled={submitted}>◀</button>
            <span className="dial-value" aria-live="polite">{categories[selections[i]]}</span>
            <button className="dial-btn" onClick={() => cycle(i, 1)} aria-label="Next category" disabled={submitted}>▶</button>
          </div>
          {submitted && <span className="dial-result">{correct[i] ? '✅' : `❌ (${item.category})`}</span>}
        </div>
      ))}
      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit}>Check Answers ✓</button>
      )}
      {allCorrect && <div className="feedback correct" role="alert">🎉 All correct! +15 XP</div>}
      {anyWrong && (
        <div>
          <div className="feedback wrong" role="alert">❌ Some are wrong — check the ❌ items!</div>
          <button className="submit-btn retry" onClick={handleRetry}>Retry 🔄</button>
        </div>
      )}
    </div>
  );
}
