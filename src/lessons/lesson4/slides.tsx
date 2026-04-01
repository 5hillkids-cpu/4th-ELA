import { useState } from 'react';
import type { SlideProps } from '../../types';
import { useStore } from '../../store';
import { playSound } from '../../audio';
import MultipleChoice from '../../components/interactions/MultipleChoice';
import SliderInteraction from '../../components/interactions/SliderInteraction';
import DialInteraction from '../../components/interactions/DialInteraction';
import DragDropInteraction from '../../components/interactions/DragDropInteraction';
import HotspotInteraction from '../../components/interactions/HotspotInteraction';

const PASSAGE = `A backpack can look harmless, but it has sneaky habits. First, it loves to collect crumpled papers like they are rare treasures. To fix this, empty your backpack every Friday and recycle what you don't need. Second, backpacks enjoy hiding pencils in the deepest corner, where they form a tiny pencil city. Put pencils in a zip pouch so you can find them fast. Third, backpacks sometimes "forget" lunchboxes. If you pack lunch, place a sticky note on the door that says, "LUNCH!" Finally, a backpack gets heavy when you carry every book you own, including the one you finished last month. Check your schedule and pack only what you need. If you train your backpack weekly, it won't surprise you with a paper avalanche.`;

function Slide1({ onNext }: SlideProps) {
  const { addXP, soundOn } = useStore();
  const [started, setStarted] = useState(false);
  function handleStart() {
    if (!started) { addXP(10); if (soundOn) playSound('xp'); setStarted(true); }
    onNext();
  }
  return (
    <div className="title-slide">
      <span className="big-emoji" aria-hidden="true">🎒</span>
      <h2>Main Idea &amp; Details Quest!</h2>
      <p className="hook-text">"Has your backpack ever attacked you?"</p>
      <p className="vo-text">Your backpack has SNEAKY habits. Let's find the main idea and the details that prove it!</p>
      <button className="big-btn" onClick={handleStart}>Tame the Backpack! 🎒 (+10 XP)</button>
    </div>
  );
}

function Slide2({ onNext }: SlideProps) {
  const [lit, setLit] = useState([false, false, false]);
  const objectives = [
    "I can identify the main idea of a passage 💡",
    "I can find supporting details 🔎",
    "I can tell the difference between main idea and detail 📊",
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
      <h2 className="slide-title">Finding the Main Idea 📖</h2>
      <p className="slide-body">The <strong>main idea</strong> is what the <em>whole passage</em> is mostly about. It's not just one detail — it covers everything!</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[{ id: "h1", text: "train your backpack", hint: "Main idea spotted! The whole passage is about training your backpack to behave — that's the main idea!" }]}
        required={1}
        onComplete={onNext}
        xpReward={5}
        instruction="Click the phrase that best states the MAIN IDEA of the passage!"
      />
    </div>
  );
}

function Slide4({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Main Idea: Just Right! 🎯</h2>
      <p className="slide-body">A main idea statement should be <strong>just right</strong> — not too narrow (one detail) and not too broad (everything ever)!</p>
      <SliderInteraction
        labels={["Too narrow", "Just right", "Too broad"]}
        correctIndex={1}
        xpReward={10}
        onCorrect={onNext}
        instruction="Slide to find the BEST type of main idea statement!"
      />
    </div>
  );
}

function Slide5({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Supporting Details! 🔎</h2>
      <p className="slide-body"><strong>Supporting details</strong> are specific facts or tips that explain or prove the main idea.</p>
      <MultipleChoice
        question="Which sentence is a SUPPORTING DETAIL (not the main idea)?"
        options={[
          "Backpacks have sneaky habits you can fix.",
          "Put pencils in a zip pouch so you can find them fast.",
          "You should organize your school supplies regularly.",
        ]}
        correctIndex={1}
        rationale="B is a specific tip (detail) that supports the main idea about training your backpack!"
        xpReward={10}
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide6({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Main Idea Umbrella ☂️</h2>
      <p className="slide-body">The main idea is like an umbrella — supporting details all fall under it!</p>
      <DragDropInteraction
        items={[
          { id: "d1", text: "Empty backpack every Friday", correctBin: "Supporting Details" },
          { id: "d2", text: "Put pencils in a zip pouch", correctBin: "Supporting Details" },
          { id: "d3", text: "Place a sticky note for lunch", correctBin: "Supporting Details" },
          { id: "d4", text: "Backpacks have sneaky habits", correctBin: "Main Idea" },
        ]}
        bins={["Main Idea", "Supporting Details"]}
        badgeName="Backpack Master Badge"
        onComplete={onNext}
        instruction="Drag each sentence under the correct part of the umbrella!"
      />
    </div>
  );
}

function Slide7({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Check for Understanding 🧠</h2>
      <MultipleChoice
        question="Which sentence states the MAIN IDEA of 'How to Train Your Backpack'?"
        options={[
          "Put pencils in a zip pouch.",
          "A backpack has sneaky habits that you can fix with simple steps.",
          "Carry every book you own.",
        ]}
        correctIndex={1}
        rationale="B covers what the WHOLE passage is about — the sneaky habits AND how to fix them!"
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide8({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Sort the Sentences! 🎛️</h2>
      <p className="slide-body">Is it the Main Idea, a Supporting Detail, or just an Example?</p>
      <DialInteraction
        items={[
          { text: "Train your backpack to behave", category: "Main Idea" },
          { text: "Use a zip pouch for pencils", category: "Detail" },
          { text: "Pencils form a tiny city", category: "Example" },
          { text: "Check your schedule before packing", category: "Detail" },
        ]}
        categories={["Main Idea", "Detail", "Example"]}
        onComplete={onNext}
        instruction="Use ◀ ▶ to sort each into Main Idea, Detail, or Example!"
      />
    </div>
  );
}

function Slide9({ onNext }: SlideProps) {
  const { earnBadge } = useStore();
  function handleComplete() { earnBadge("Backpack Master Badge"); onNext(); }
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Hotspot Hunt! 🔎</h2>
      <p className="slide-body">Find TWO supporting details in the passage!</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[
          { id: "hp1", text: "empty your backpack every Friday", hint: "Supporting detail found! Emptying weekly is a specific tip that supports the main idea!" },
          { id: "hp2", text: "zip pouch", hint: "Detail found! Using a zip pouch is another specific supporting detail!" },
        ]}
        required={2}
        xpReward={10}
        onComplete={handleComplete}
        instruction="Click TWO specific tips from the passage (supporting details)!"
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
      <p>You're a Main Idea &amp; Details master!</p>
      <button className="big-btn" onClick={onNext}>Finish Lesson 🎉</button>
    </div>
  );
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Final Assessment 🏆 ({q + 1}/3)</h2>
      {q === 0 && (
        <MultipleChoice
          question="What is the MAIN IDEA of the passage?"
          options={[
            "Pencils hide in corners of backpacks.",
            "You can train your backpack to be less chaotic.",
            "Sticky notes are very useful tools.",
          ]}
          correctIndex={1}
          rationale="B covers the whole passage — it's about training and fixing your backpack's sneaky habits!"
          onCorrect={advance}
        />
      )}
      {q === 1 && (
        <MultipleChoice
          question="Which is a SUPPORTING DETAIL?"
          options={["Backpacks look harmless.", "Empty your backpack every Friday.", "The passage is about school."]}
          correctIndex={1}
          rationale="'Empty your backpack every Friday' is a specific tip — a detail that supports the main idea!"
          onCorrect={advance}
        />
      )}
      {q === 2 && (
        <MultipleChoice
          question="What does the passage mostly tell you to do?"
          options={["Buy a new backpack.", "Organize and maintain your backpack.", "Ask your teacher for help."]}
          correctIndex={1}
          rationale="The whole passage gives tips for organizing and maintaining your backpack — that's the main message!"
          onCorrect={advance}
        />
      )}
    </div>
  );
}

export const lesson4Slides = [
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
