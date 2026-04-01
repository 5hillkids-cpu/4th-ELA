import { useState } from 'react';
import {
  DndContext,
  useDraggable,
  useDroppable,
  type DragEndEvent,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useStore } from '../../store';
import { playSound } from '../../audio';

interface Item { id: string; text: string; correctBin: string; }

interface Props {
  items: Item[];
  bins: string[];
  onComplete: () => void;
  instruction?: string;
  badgeName?: string;
}

function DragItem({ id, text, placed }: { id: string; text: string; placed: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id, disabled: placed });
  const style = transform ? { transform: `translate3d(${transform.x}px,${transform.y}px,0)` } : undefined;
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`drag-item${isDragging ? ' dragging' : ''}${placed ? ' placed' : ''}`}
      {...listeners}
      {...attributes}
      aria-label={`Drag: ${text}`}
    >
      {text}
    </div>
  );
}

function DropBin({ id, children, correct }: { id: string; children: React.ReactNode; correct?: boolean | null }) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const cls = `drop-bin${isOver ? ' over' : ''}${correct === true ? ' bin-correct' : correct === false ? ' bin-wrong' : ''}`;
  return (
    <div ref={setNodeRef} className={cls} aria-label={`Drop zone: ${id}`}>
      <div className="bin-label">{id}</div>
      <div className="bin-contents">{children}</div>
    </div>
  );
}

export default function DragDropInteraction({ items, bins, onComplete, instruction, badgeName }: Props) {
  const [placements, setPlacements] = useState<Record<string, string>>({});
  const [validated, setValidated] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const { addXP, earnBadge, soundOn } = useStore();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor),
  );

  // For keyboard fallback: select an item, then click a bin
  const [selected, setSelected] = useState<string | null>(null);

  function handleDragEnd(e: DragEndEvent) {
    const { active, over } = e;
    if (over) {
      setPlacements(prev => ({ ...prev, [active.id as string]: over.id as string }));
    }
  }

  function handleBinClick(binId: string) {
    if (selected) {
      setPlacements(prev => ({ ...prev, [selected]: binId }));
      setSelected(null);
    }
  }

  function handleItemClick(itemId: string) {
    setSelected(prev => prev === itemId ? null : itemId);
  }

  function handleSubmit() {
    const res: Record<string, boolean> = {};
    items.forEach(item => { res[item.id] = placements[item.id] === item.correctBin; });
    setResults(res);
    setValidated(true);
    if (items.every(item => res[item.id])) {
      if (soundOn) playSound(badgeName ? 'badge' : 'correct');
      addXP(15);
      if (badgeName) earnBadge(badgeName);
      setTimeout(onComplete, 1600);
    } else {
      if (soundOn) playSound('wrong');
    }
  }

  function handleRetry() {
    setPlacements({});
    setValidated(false);
    setResults({});
    setSelected(null);
  }

  const allPlaced = items.every(item => placements[item.id]);
  const allCorrect = validated && items.every(item => results[item.id]);
  const anyWrong = validated && !allCorrect;

  // Items not yet placed
  const unplaced = items.filter(item => !placements[item.id]);

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div className="interaction-box drag-drop-container">
        {instruction && <p className="instruction-text">{instruction}</p>}
        <p className="kbd-hint">💡 Tip: Click an item to select it (highlighted in yellow), then click a bin to place it — or drag and drop!</p>

        <div className="drag-items-pool">
          {unplaced.map(item => (
            <div key={item.id} onClick={() => handleItemClick(item.id)}>
              <DragItem id={item.id} text={item.text} placed={false} />
              {selected === item.id && <span className="selected-indicator" aria-live="polite"> ← selected</span>}
            </div>
          ))}
        </div>

        <div className="drop-bins-row">
          {bins.map(bin => {
            const binItems = items.filter(item => placements[item.id] === bin);
            const binCorrect = validated
              ? (binItems.length > 0 ? binItems.every(item => results[item.id]) : null)
              : null;
            return (
              <DropBin key={bin} id={bin} correct={binCorrect}>
                {binItems.map(item => (
                  <div
                    key={item.id}
                    className={`placed-item${validated ? (results[item.id] ? ' correct-item' : ' wrong-item') : ''}`}
                    onClick={() => handleBinClick(bin)}
                  >
                    {item.text}
                    {validated && <span>{results[item.id] ? ' ✅' : ` ❌`}</span>}
                  </div>
                ))}
                {selected && <div className="click-to-drop" onClick={() => handleBinClick(bin)} role="button" aria-label={`Place in ${bin}`}>+ Drop here</div>}
              </DropBin>
            );
          })}
        </div>

        {!validated && (
          <button className="submit-btn" onClick={handleSubmit} disabled={!allPlaced}>
            {allPlaced ? 'Check Answers ✓' : `Place all items first (${Object.keys(placements).length}/${items.length})`}
          </button>
        )}
        {allCorrect && <div className="feedback correct" role="alert">🎉 {badgeName ? `${badgeName} earned!` : 'All correct!'} +15 XP</div>}
        {anyWrong && (
          <div>
            <div className="feedback wrong" role="alert">❌ Some items are in the wrong bin — try again!</div>
            <button className="submit-btn retry" onClick={handleRetry}>Retry 🔄</button>
          </div>
        )}
      </div>
    </DndContext>
  );
}
