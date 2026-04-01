import { useState } from 'react';
import type { SlideProps } from '../../types';
import { useStore } from '../../store';
import { playSound } from '../../audio';
import MultipleChoice from '../../components/interactions/MultipleChoice';
import SliderInteraction from '../../components/interactions/SliderInteraction';
import DialInteraction from '../../components/interactions/DialInteraction';
import DragDropInteraction from '../../components/interactions/DragDropInteraction';
import HotspotInteraction from '../../components/interactions/HotspotInteraction';

const PASSAGE = `Kira tried to be invisible about being nice. It was her "secret agent" plan. When she saw Leo's lunch spill in the cafeteria, she slid extra napkins over like she was passing spy papers. Later, she noticed Sam looking sad during kickball because nobody picked him yet. Kira "accidentally" stood next to Sam and said, "Oh no, my foot is glued here." Sam laughed and joined her team. At the library, Kira returned a book that someone left on the floor. The librarian whispered, "Thank you," like it was a mission code. At the end of the day, Leo said, "Who keeps helping everyone?" Kira shrugged. "Probably… a very handsome superhero." Everyone stared. "Kira," they said together.`;

function Slide1({ onNext }: SlideProps) {
  const { addXP, soundOn } = useStore();
  const [started, setStarted] = useState(false);
  function handleStart() {
    if (!started) { addXP(10); if (soundOn) playSound('xp'); setStarted(true); }
    onNext();
  }
  return (
    <div className="title-slide">
      <span className="big-emoji" aria-hidden="true">🕵️</span>
      <h2>Theme & Summary Quest!</h2>
      <p className="hook-text">"What's the <em>big message</em> hiding in the story?"</p>
      <p className="vo-text">Theme is like the story's secret message — no spy glasses required. Let's decode it!</p>
      <button className="big-btn" onClick={handleStart}>Decode Theme! 🔓 (+10 XP)</button>
    </div>
  );
}

function Slide2({ onNext }: SlideProps) {
  const [lit, setLit] = useState([false, false, false]);
  const objectives = [
    "I can find the theme of a story 💡",
    "I can write a good summary 📝",
    "I can use details to support the theme 🔍",
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
      <h2 className="slide-title">Theme vs. Topic 📖</h2>
      <p className="slide-body">
        <strong>Topic</strong> = what the story is <em>about</em> (e.g., kindness)<br />
        <strong>Theme</strong> = the <em>lesson</em> the story teaches about that topic
      </p>
      <p className="slide-body">Click the phrase in the passage that shows a moment of kindness!</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[{ id: "h1", text: "extra napkins", hint: "Detail collected! Sliding napkins to Leo is a small, sneaky act of kindness — a clue to the theme!" }]}
        required={1}
        onComplete={onNext}
        xpReward={5}
        instruction="Click a phrase that shows Kira being kind!"
      />
    </div>
  );
}

function Slide4({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Build a Theme Statement 🏗️</h2>
      <p className="slide-body">A theme statement should be <strong>just right</strong> — not too vague, not too preachy!</p>
      <SliderInteraction
        labels={["Too vague", "Just right", "Too bossy"]}
        correctIndex={1}
        xpReward={10}
        onCorrect={onNext}
        instruction="Slide to find the BEST kind of theme statement!"
      />
    </div>
  );
}

function Slide5({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Summaries Don't Spill Extra Sauce! 🍅</h2>
      <p className="slide-body">A summary = <strong>Somebody… Wanted… But… So…</strong></p>
      <p className="slide-body">Short, not a novel. Include the important parts only!</p>
      <MultipleChoice
        question="Which is the BEST summary of 'The Not-So-Sneaky Kindness'?"
        options={[
          "Kira is a secret spy who helps people in her school.",
          "Kira quietly helps Leo, Sam, and the librarian all day, and everyone realizes she was the helper.",
          "Kira helps Leo with his lunch, then goes to kickball, then goes to the library, and then everyone asks who helped.",
        ]}
        correctIndex={1}
        rationale="Choice B captures the key events and the resolution without being too detailed or too vague!"
        xpReward={10}
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide6({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Theme Builder Machine ⚙️</h2>
      <p className="slide-body">Drag the three key events into the machine to build the theme!</p>
      <DragDropInteraction
        items={[
          { id: "e1", text: "Kira slides napkins to Leo", correctBin: "Key Event" },
          { id: "e2", text: "Kira stands next to Sam at kickball", correctBin: "Key Event" },
          { id: "e3", text: "Kira returns the library book", correctBin: "Key Event" },
          { id: "e4", text: "The sky is blue today", correctBin: "Not in Story" },
        ]}
        bins={["Key Event", "Not in Story"]}
        badgeName="Kindness Agent Badge"
        onComplete={onNext}
        instruction="Drag each item into the correct bin — Key Events only!"
      />
    </div>
  );
}

function Slide7({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Check for Understanding 🧠</h2>
      <MultipleChoice
        question="Which statement BEST describes the theme of 'The Not-So-Sneaky Kindness'?"
        options={[
          "Always be loud about helping others.",
          "Small acts of kindness can help others feel included.",
          "Spies make the best friends.",
        ]}
        correctIndex={1}
        rationale="B matches ALL of Kira's actions — each small kind act makes someone's day better!"
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide8({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Sort the Statements! 🎛️</h2>
      <p className="slide-body">Theme, Summary, or Detail? Sort each one!</p>
      <DialInteraction
        items={[
          { text: "Small kindness matters", category: "Theme" },
          { text: "Kira helps three people throughout the day", category: "Summary" },
          { text: "Kira slides napkins to Leo", category: "Detail" },
          { text: "Being kind changes someone's day", category: "Theme" },
        ]}
        categories={["Theme", "Summary", "Detail"]}
        onComplete={onNext}
        instruction="Use ◀ ▶ arrows to sort each statement into Theme, Summary, or Detail!"
      />
    </div>
  );
}

function Slide9({ onNext }: SlideProps) {
  const { earnBadge } = useStore();
  function handleComplete() { earnBadge("Kindness Agent Badge"); onNext(); }
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Hotspot Hunt! 🔎</h2>
      <p className="slide-body">Find TWO moments in the passage that directly support the theme of kindness!</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[
          { id: "hp1", text: "stood next to Sam", hint: "Yes! Standing next to Sam helped him feel included — theme in action!" },
          { id: "hp2", text: "returned a book", hint: "Found it! Returning the book is a quiet act of kindness — another theme clue!" },
        ]}
        required={2}
        xpReward={10}
        onComplete={handleComplete}
        instruction="Click TWO phrases that show Kira being kind in a sneaky way!"
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
      <p>You are a Theme and Summary expert!</p>
      <button className="big-btn" onClick={onNext}>Finish Lesson 🎉</button>
    </div>
  );
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Final Assessment 🏆 ({q + 1}/3)</h2>
      {q === 0 && (
        <MultipleChoice
          question="What is the BEST theme of this story?"
          options={["Leo is always hungry.", "Small acts of kindness help others feel included.", "Libraries are very important."]}
          correctIndex={1}
          rationale="B is the theme because it describes the lesson taught by ALL of Kira's actions!"
          onCorrect={advance}
        />
      )}
      {q === 1 && (
        <MultipleChoice
          question="Which is the BEST summary?"
          options={["Kira is a spy.", "Kira quietly helps others all day and her classmates realize she was the helper.", "Leo spills his lunch."]}
          correctIndex={1}
          rationale="B covers the key events and the resolution without too many details!"
          onCorrect={advance}
        />
      )}
      {q === 2 && (
        <MultipleChoice
          question="Which is a supporting DETAIL from the passage?"
          options={["Kira shrugged.", '"extra napkins"', "The librarian smiled."]}
          correctIndex={1}
          rationale="'Extra napkins' is a specific detail from the text that supports the theme of sneaky kindness!"
          onCorrect={advance}
        />
      )}
    </div>
  );
}

export const lesson2Slides = [
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
