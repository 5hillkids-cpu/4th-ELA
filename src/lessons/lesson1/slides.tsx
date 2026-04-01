import { useState } from 'react';
import type { SlideProps } from '../../types';
import { useStore } from '../../store';
import { playSound } from '../../audio';
import MultipleChoice from '../../components/interactions/MultipleChoice';
import SliderInteraction from '../../components/interactions/SliderInteraction';
import DialInteraction from '../../components/interactions/DialInteraction';
import DragDropInteraction from '../../components/interactions/DragDropInteraction';
import HotspotInteraction from '../../components/interactions/HotspotInteraction';

const PASSAGE = `On Monday, Jordan brought a "desk pet" to school: a tiny rubber lizard named Sir Slinky. At recess, Jordan left Sir Slinky on the desk to "guard" a granola bar. When the class returned, Sir Slinky was gone. Jordan gasped so loudly that Ms. Patel's marker squeaked. "Who took my brave lizard?" Jordan asked. Mia pointed to the fish tank. "Maybe he joined the swim team." Dante shook his head. "Nope. I saw something green near the pencil sharpener." Everyone started searching. Even the class hamster, Biscuit, stared from his cage like he knew a secret. Finally, Jordan noticed a lumpy shape inside the backpack pocket. Sir Slinky popped out… stuck to a roll of tape. Ms. Patel said, "Mystery solved. The tape is the real villain."`;

function Slide1({ onNext }: SlideProps) {
  const { addXP, soundOn } = useStore();
  const [started, setStarted] = useState(false);
  function handleStart() {
    if (!started) { addXP(10); if (soundOn) playSound('xp'); setStarted(true); }
    onNext();
  }
  return (
    <div className="title-slide">
      <span className="big-emoji" aria-hidden="true">🔍</span>
      <h2>Textual Evidence Quest!</h2>
      <p className="hook-text">"If Biscuit could talk… would he snitch?"</p>
      <p className="vo-text">Welcome, Evidence Detectives! Today we'll solve a mystery using <em>proof from the text</em>. Biscuit the hamster is suspiciously calm.</p>
      <button className="big-btn" onClick={handleStart}>Start Adventure! 🚀 (+10 XP)</button>
    </div>
  );
}

function Slide2({ onNext }: SlideProps) {
  const [lit, setLit] = useState([false, false, false]);
  const objectives = [
    "I can find proof in the story 🔍",
    "I can explain my thinking with evidence 💬",
    "I can make a smart inference 🧠",
  ];
  function toggle(i: number) { setLit(prev => { const n = [...prev]; n[i] = true; return n; }); }
  const allLit = lit.every(Boolean);
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Learning Goals 🎯</h2>
      <p>Tap each goal to light it up!</p>
      <div className="objective-list">
        {objectives.map((obj, i) => (
          <button key={i} className={`objective-item${lit[i] ? ' lit' : ''}`} onClick={() => toggle(i)} aria-pressed={lit[i]}>
            {lit[i] ? '✅ ' : '⬜ '}{obj}
          </button>
        ))}
      </div>
      {allLit && <button className="big-btn" onClick={onNext}>Ready! Let's go! →</button>}
    </div>
  );
}

function Slide3({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">What Counts as Evidence? 📖</h2>
      <p className="slide-body">Evidence = <strong>words directly from the text</strong>. Not a guess — a quote!</p>
      <p className="slide-body">Read the passage below and click on the phrase that shows <em>where Sir Slinky was found</em>.</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[{ id: "h1", text: "stuck to a roll", hint: "Great! 'stuck to a roll of tape' is key evidence — Sir Slinky wasn't stolen, he was stuck!" }]}
        required={1}
        onComplete={onNext}
        xpReward={5}
        instruction="Click the phrase that shows WHERE Sir Slinky was found!"
      />
    </div>
  );
}

function Slide4({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Inference = Evidence + Brain 🧠</h2>
      <p className="slide-body">Inference formula: <strong>Evidence + What I Know = Inference</strong></p>
      <p className="slide-body">The BEST inference is neither too vague nor too specific. It uses clues from the text!</p>
      <SliderInteraction
        labels={["Too vague", "Just right", "Too detailed"]}
        correctIndex={1}
        xpReward={10}
        onCorrect={onNext}
        instruction="Slide to find the BEST type of inference about Sir Slinky!"
      />
    </div>
  );
}

function Slide5({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Cite It Like a Pro! 📝</h2>
      <p className="slide-body">When you cite evidence, you quote the text AND explain your thinking:<br />
        <em>"The text says '___' which shows that ___."</em></p>
      <MultipleChoice
        question="Which answer BEST cites evidence about Sir Slinky's location?"
        options={[
          "I think he was somewhere in the classroom.",
          "The text shows Jordan found him, and that's cool.",
          "I think Sir Slinky was in the backpack because the text says 'inside the backpack pocket'.",
        ]}
        correctIndex={2}
        rationale="The third answer quotes the text directly AND explains the reasoning — that's perfect citing!"
        xpReward={10}
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide6({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Evidence Detective Toolkit 🕵️</h2>
      <p className="slide-body">A good detective follows 3 steps: <strong>Find → Quote → Explain</strong></p>
      <DragDropInteraction
        items={[
          { id: "c0", text: "Look for the clue in the text", correctBin: "Find" },
          { id: "c1", text: "Quote 3–8 exact words", correctBin: "Quote" },
          { id: "c2", text: "Explain how it proves your idea", correctBin: "Explain" },
        ]}
        bins={["Find", "Quote", "Explain"]}
        badgeName="Evidence Badge"
        onComplete={onNext}
        instruction="Drag each step into the correct toolkit slot!"
      />
    </div>
  );
}

function Slide7({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Check for Understanding 🧠</h2>
      <p className="slide-body">Your friend says: <em>"Jordan's lizard was stolen!"</em></p>
      <MultipleChoice
        question="Which piece of evidence from the text DISAGREES with your friend?"
        options={[
          '"Ms. Patel\'s marker squeaked"',
          '"inside the backpack pocket"',
          '"joined the swim team"',
        ]}
        correctIndex={1}
        rationale="'Inside the backpack pocket' shows Sir Slinky was in Jordan's OWN backpack — not stolen!"
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide8({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Sort It Out! 🎛️</h2>
      <p className="slide-body">Evidence, Opinion, or Inference? Use the arrows to sort each statement!</p>
      <DialInteraction
        items={[
          { text: "Sir Slinky was in the backpack pocket", category: "Evidence" },
          { text: "The tape is probably evil", category: "Opinion" },
          { text: "Biscuit likely knows the truth", category: "Inference" },
          { text: "Sir Slinky popped out", category: "Evidence" },
        ]}
        categories={["Evidence", "Opinion", "Inference"]}
        onComplete={onNext}
        instruction="Use ◀ ▶ arrows to assign the correct category to each statement!"
      />
    </div>
  );
}

function Slide9({ onNext }: SlideProps) {
  const { earnBadge } = useStore();
  function handleComplete() { earnBadge("Evidence Badge"); onNext(); }
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Hotspot Hunt! 🔎</h2>
      <p className="slide-body">Find BOTH proof spots that show Sir Slinky was NOT stolen!</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[
          { id: "hp1", text: "backpack pocket", hint: "Found it! 'backpack pocket' is direct evidence of where Sir Slinky was!" },
          { id: "hp2", text: "stuck to a roll", hint: "Yes! 'stuck to a roll of tape' explains exactly what happened!" },
        ]}
        required={2}
        xpReward={10}
        onComplete={handleComplete}
        instruction="Click TWO phrases in the passage that prove Sir Slinky wasn't stolen!"
      />
    </div>
  );
}

function Slide10({ onNext }: SlideProps) {
  const [q, setQ] = useState(0);
  const [allDone, setAllDone] = useState(false);
  function advance() { if (q < 2) setQ(q + 1); else setAllDone(true); }
  if (allDone) return (
    <div className="title-slide">
      <span className="big-emoji" aria-hidden="true">🏆</span>
      <h2>Lesson Complete!</h2>
      <p>You are a Textual Evidence master!</p>
      <button className="big-btn" onClick={onNext}>Finish Lesson 🎉</button>
    </div>
  );
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Final Assessment 🏆 ({q + 1}/3)</h2>
      {q === 0 && (
        <MultipleChoice
          question="Which evidence BEST shows Sir Slinky wasn't stolen?"
          options={['"Ms. Patel\'s marker squeaked"', '"inside the backpack pocket"', '"joined the swim team"']}
          correctIndex={1}
          rationale="'Inside the backpack pocket' directly shows where Sir Slinky really was!"
          onCorrect={advance}
        />
      )}
      {q === 1 && (
        <MultipleChoice
          question="Which is the BEST inference from the story?"
          options={["Tape was pulled by magic.", "Sir Slinky got stuck to the tape.", "Biscuit planned the whole thing."]}
          correctIndex={1}
          rationale="The text says 'stuck to a roll of tape' — that's our evidence for this inference!"
          onCorrect={advance}
        />
      )}
      {q === 2 && (
        <MultipleChoice
          question="Which is the BEST evidence-based sentence?"
          options={[
            "I think Mia is right because fish are cool.",
            "I think it was stolen because I feel sad.",
            "I think it was in the bag because the text says 'backpack pocket'.",
          ]}
          correctIndex={2}
          rationale="This answer cites the text directly AND explains the reasoning — perfect!"
          onCorrect={advance}
        />
      )}
    </div>
  );
}

export const lesson1Slides = [
  { id: 1, component: Slide1 },
  { id: 2, component: Slide2 },
  { id: 3, component: Slide3 },
  { id: 4, component: Slide4 },
  { id: 5, component: Slide5 },
  { id: 6, component: Slide6 },
  { id: 7, component: Slide7 },
  { id: 8, component: Slide8 },
  { id: 9, component: Slide9 },
  { id: 10, component: Slide10 },
];
