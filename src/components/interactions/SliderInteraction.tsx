import { useState } from 'react';
import { useStore } from '../../store';
import { playSound } from '../../audio';

interface Props {
  labels: string[];
  correctIndex: number;
  onCorrect: () => void;
  xpReward?: number;
  instruction?: string;
}

export default function SliderInteraction({ labels, correctIndex, onCorrect, xpReward = 10, instruction }: Props) {
  const [value, setValue] = useState(0);
  const [feedback, setFeedback] = useState<'none' | 'correct' | 'wrong'>('none');
  const { addXP, soundOn } = useStore();

  function handleSubmit() {
    if (value === correctIndex) {
      setFeedback('correct');
      if (soundOn) playSound('correct');
      addXP(xpReward);
      setTimeout(onCorrect, 1400);
    } else {
      setFeedback('wrong');
      if (soundOn) playSound('wrong');
    }
  }

  return (
    <div className="interaction-box slider-container">
      {instruction && <p className="instruction-text">{instruction}</p>}
      <div className="slider-current" aria-live="polite">{labels[value]}</div>
      <div className="slider-labels" aria-hidden="true">
        {labels.map((l, i) => <span key={i} className={i === value ? 'slider-label active' : 'slider-label'}>{l}</span>)}
      </div>
      <input
        type="range"
        className="range-input"
        min={0} max={labels.length - 1} step={1}
        value={value}
        onChange={e => { setValue(Number(e.target.value)); setFeedback('none'); }}
        aria-label="Slider"
        aria-valuetext={labels[value]}
        aria-valuemin={0}
        aria-valuemax={labels.length - 1}
        aria-valuenow={value}
      />
      {feedback === 'none' && (
        <button className="submit-btn" onClick={handleSubmit}>Check Answer ✓</button>
      )}
      {feedback === 'correct' && (
        <div className="feedback correct" role="alert">🎉 Just right! +{xpReward} XP</div>
      )}
      {feedback === 'wrong' && (
        <div>
          <div className="feedback wrong" role="alert">❌ Not quite — try moving the slider!</div>
          <button className="submit-btn retry" onClick={() => setFeedback('none')}>Retry 🔄</button>
        </div>
      )}
    </div>
  );
}
