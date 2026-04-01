import { useState } from 'react';
import { useStore } from '../../store';
import { playSound } from '../../audio';

interface Hotspot {
  id: string;
  text: string; // exact substring in passage to make clickable
  hint: string;
}

interface Props {
  passage: string;
  hotspots: Hotspot[];
  required: number;
  onComplete: () => void;
  xpReward?: number;
  instruction?: string;
}

export default function HotspotInteraction({ passage, hotspots, required, onComplete, xpReward = 10, instruction }: Props) {
  const [found, setFound] = useState<Set<string>>(new Set());
  const [lastHint, setLastHint] = useState<string | null>(null);
  const { addXP, soundOn } = useStore();

  function handleClick(hotspot: Hotspot) {
    if (found.has(hotspot.id)) return;
    const newFound = new Set(found);
    newFound.add(hotspot.id);
    setFound(newFound);
    setLastHint(hotspot.hint);
    if (soundOn) playSound('correct');
    addXP(xpReward);
    if (newFound.size >= required) {
      setTimeout(onComplete, 1500);
    }
  }

  // Build passage with clickable hotspot spans
  function renderPassage() {
    let remaining = passage;
    const parts: React.ReactNode[] = [];
    let key = 0;

    hotspots.forEach(hs => {
      const idx = remaining.indexOf(hs.text);
      if (idx === -1) return;
      if (idx > 0) parts.push(<span key={key++}>{remaining.slice(0, idx)}</span>);
      parts.push(
        <button
          key={key++}
          className={`hotspot-word${found.has(hs.id) ? ' found' : ''}`}
          onClick={() => handleClick(hs)}
          aria-label={found.has(hs.id) ? `Found: ${hs.text}` : `Click to investigate: ${hs.text}`}
          disabled={found.has(hs.id)}
        >
          {hs.text}
        </button>
      );
      remaining = remaining.slice(idx + hs.text.length);
    });

    if (remaining) parts.push(<span key={key++}>{remaining}</span>);
    return parts;
  }

  return (
    <div className="interaction-box hotspot-container">
      {instruction && <p className="instruction-text">{instruction}</p>}
      <p className="hotspot-progress">Found: {found.size} / {required}</p>
      <div className="passage-box" role="region" aria-label="Reading passage">
        {renderPassage()}
      </div>
      {lastHint && (
        <div className="feedback correct hint-box" role="alert">💡 {lastHint}</div>
      )}
      {found.size >= required && (
        <div className="feedback correct" role="alert">🎉 All hotspots found! +{xpReward * required} XP</div>
      )}
    </div>
  );
}
