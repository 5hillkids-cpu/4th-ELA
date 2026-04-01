import { useState } from 'react';
import { useStore } from '../../store';
import { playSound } from '../../audio';

interface Props {
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  onCorrect: () => void;
  xpReward?: number;
}

export default function MultipleChoice({ question, options, correctIndex, rationale, onCorrect, xpReward = 10 }: Props) {
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const { addXP, soundOn } = useStore();

  function handleSubmit() {
    if (selected === null) return;
    setSubmitted(true);
    if (selected === correctIndex) {
      if (soundOn) playSound('correct');
      addXP(xpReward);
      setTimeout(onCorrect, 1800);
    } else {
      if (soundOn) playSound('wrong');
    }
  }

  function handleRetry() {
    setSelected(null);
    setSubmitted(false);
  }

  const isCorrect = submitted && selected === correctIndex;
  const isWrong = submitted && selected !== correctIndex;

  return (
    <div className="interaction-box mc-container">
      <p className="mc-question">{question}</p>
      <div className="mc-options" role="radiogroup" aria-label={question}>
        {options.map((opt, i) => (
          <button
            key={i}
            className={`mc-option${selected === i ? ' selected' : ''}${submitted && i === correctIndex ? ' correct-opt' : ''}${submitted && selected === i && i !== correctIndex ? ' wrong-opt' : ''}`}
            onClick={() => { if (!submitted) setSelected(i); }}
            aria-pressed={selected === i}
            disabled={submitted}
          >
            <span className="mc-letter">{String.fromCharCode(65 + i)})</span> {opt}
          </button>
        ))}
      </div>
      {!submitted && (
        <button className="submit-btn" onClick={handleSubmit} disabled={selected === null}>
          {selected === null ? 'Choose an answer' : 'Submit Answer ✓'}
        </button>
      )}
      {isCorrect && (
        <div className="feedback correct" role="alert">
          ✅ Correct! +{xpReward} XP<br />
          <span className="rationale">{rationale}</span>
        </div>
      )}
      {isWrong && (
        <div>
          <div className="feedback wrong" role="alert">❌ Not quite! Think carefully…</div>
          <button className="submit-btn retry" onClick={handleRetry}>Try Again 🔄</button>
        </div>
      )}
    </div>
  );
}
