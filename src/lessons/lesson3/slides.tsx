import { useState } from 'react';
import type { SlideProps } from '../../types';
import { useStore } from '../../store';
import { playSound } from '../../audio';
import MultipleChoice from '../../components/interactions/MultipleChoice';
import SliderInteraction from '../../components/interactions/SliderInteraction';
import DialInteraction from '../../components/interactions/DialInteraction';
import DragDropInteraction from '../../components/interactions/DragDropInteraction';
import HotspotInteraction from '../../components/interactions/HotspotInteraction';

const PASSAGE = `On Wednesday, a substitute teacher arrived with a bright green parrot named Pickles. "Pickles helps me remember names," Mr. Zane said. Pickles nodded like a tiny principal. During math, Pickles shouted, "Ava! Ava!" even though Ava was quietly counting blocks. Ava's face turned the color of tomato soup. At snack time, the parrot stole a cracker from Ben's hand and flew to the window ledge. Ben stared like his snack had joined a bird gang. Mr. Zane tried to fix things by teaching Pickles a new phrase: "Say sorry." Pickles cleared his throat and announced, "BEN DID IT!" The class exploded in laughter. Ben groaned, "I didn't even touch the bird!" Mr. Zane sighed. "Pickles is… still learning classroom manners."`;

function Slide1({ onNext }: SlideProps) {
  const { addXP, soundOn } = useStore();
  const [started, setStarted] = useState(false);
  function handleStart() {
    if (!started) { addXP(10); if (soundOn) playSound('xp'); setStarted(true); }
    onNext();
  }
  return (
    <div className="title-slide">
      <span className="big-emoji" aria-hidden="true">🦜</span>
      <h2>Characters &amp; Events Quest!</h2>
      <p className="hook-text">"Would YOU trust a parrot with attendance?"</p>
      <p className="vo-text">Meet Pickles the parrot — the world's worst classroom assistant. Let's study the characters and events!</p>
      <button className="big-btn" onClick={handleStart}>Meet Pickles! 🦜 (+10 XP)</button>
    </div>
  );
}

function Slide2({ onNext }: SlideProps) {
  const [lit, setLit] = useState([false, false, false]);
  const objectives = [
    "I can describe characters using details 👤",
    "I can describe the setting 🏫",
    "I can explain key events in order 📅",
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
      <h2 className="slide-title">Characters = How They Act &amp; Feel 📖</h2>
      <p className="slide-body">Authors use descriptions to show us how characters feel — like "face turned the color of tomato soup" tells us Ava was embarrassed!</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[{ id: "h1", text: "face turned", hint: "Character feeling found! 'Face turned the color of tomato soup' tells us Ava was very embarrassed!" }]}
        required={1}
        onComplete={onNext}
        xpReward={5}
        instruction="Click the phrase that shows how Ava FELT!"
      />
    </div>
  );
}

function Slide4({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Describing Characters: Just Right! 🎯</h2>
      <p className="slide-body">A good character description uses text details — not too little, not too much!</p>
      <SliderInteraction
        labels={["Too little detail", "Just right", "Too much detail"]}
        correctIndex={1}
        xpReward={10}
        onCorrect={onNext}
        instruction="Slide to find the BEST level of character description!"
      />
    </div>
  );
}

function Slide5({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Events in Order! 📅</h2>
      <p className="slide-body">Stories have events that happen in a sequence. What happened SECOND in this story?</p>
      <MultipleChoice
        question="What was the SECOND major event in the story?"
        options={[
          "Pickles shouted 'Ava! Ava!' during math.",
          "Pickles stole a cracker from Ben.",
          "Pickles announced 'BEN DID IT!'",
        ]}
        correctIndex={1}
        rationale="First: Pickles called Ava's name in math. Second: Pickles stole Ben's cracker. Third: 'BEN DID IT!'"
        xpReward={10}
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide6({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Character Cards! 🃏</h2>
      <p className="slide-body">Match each trait or action to the correct character!</p>
      <DragDropInteraction
        items={[
          { id: "t1", text: "Gets embarrassed easily", correctBin: "Ava" },
          { id: "t2", text: "Loses a snack to a parrot", correctBin: "Ben" },
          { id: "t3", text: "Tries to fix the classroom chaos", correctBin: "Mr. Zane" },
          { id: "t4", text: "Causes all the trouble", correctBin: "Pickles" },
        ]}
        bins={["Ava", "Ben", "Mr. Zane", "Pickles"]}
        badgeName="Parrot Wrangler Badge"
        onComplete={onNext}
        instruction="Drag each description to the correct character!"
      />
    </div>
  );
}

function Slide7({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Check for Understanding 🧠</h2>
      <MultipleChoice
        question="What event caused Ben to groan 'I didn't even touch the bird!'?"
        options={[
          "Pickles stole his cracker.",
          "Pickles announced 'BEN DID IT!' in front of the class.",
          "Ava laughed at him.",
        ]}
        correctIndex={1}
        rationale="Pickles announced 'BEN DID IT!' even though Ben was innocent — that's why he groaned!"
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide8({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Sort the Story Elements! 🎛️</h2>
      <p className="slide-body">Is it a Character trait, a Setting detail, or an Event?</p>
      <DialInteraction
        items={[
          { text: "Wednesday in a classroom", category: "Setting" },
          { text: "Pickles stole a cracker", category: "Event" },
          { text: "Ben is frustrated", category: "Character" },
          { text: "Mr. Zane tries to teach Pickles manners", category: "Event" },
        ]}
        categories={["Character", "Setting", "Event"]}
        onComplete={onNext}
        instruction="Use ◀ ▶ to sort each into Character, Setting, or Event!"
      />
    </div>
  );
}

function Slide9({ onNext }: SlideProps) {
  const { earnBadge } = useStore();
  function handleComplete() { earnBadge("Parrot Wrangler Badge"); onNext(); }
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Hotspot Hunt! 🔎</h2>
      <p className="slide-body">Find TWO spots that show Pickles causing trouble!</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[
          { id: "hp1", text: "stole a cracker", hint: "Trouble found! Pickles stealing the cracker is a key troublemaking event!" },
          { id: "hp2", text: "BEN DID IT", hint: "There it is! 'BEN DID IT!' is the most chaotic thing Pickles does in the story!" },
        ]}
        required={2}
        xpReward={10}
        onComplete={handleComplete}
        instruction="Click TWO phrases that show Pickles causing chaos!"
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
      <p>You're a Characters &amp; Events expert!</p>
      <button className="big-btn" onClick={onNext}>Finish Lesson 🎉</button>
    </div>
  );
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Final Assessment 🏆 ({q + 1}/3)</h2>
      {q === 0 && (
        <MultipleChoice
          question="What does 'face turned the color of tomato soup' tell us about Ava?"
          options={["Ava was hungry.", "Ava was embarrassed.", "Ava was angry at Pickles."]}
          correctIndex={1}
          rationale="The description of her face turning red/tomato-colored is a way of showing embarrassment!"
          onCorrect={advance}
        />
      )}
      {q === 1 && (
        <MultipleChoice
          question="Where does this story take place?"
          options={["A pet shop", "A classroom on a Wednesday", "A cafeteria"]}
          correctIndex={1}
          rationale="The story is set in a classroom with a substitute teacher on a Wednesday!"
          onCorrect={advance}
        />
      )}
      {q === 2 && (
        <MultipleChoice
          question="What is the correct order of events?"
          options={[
            "Cracker stolen → Ava shout → BEN DID IT",
            "Ava shout → Cracker stolen → BEN DID IT",
            "BEN DID IT → Ava shout → Cracker stolen",
          ]}
          correctIndex={1}
          rationale="First Pickles called Ava's name in math, then stole the cracker at snack, then announced 'BEN DID IT'!"
          onCorrect={advance}
        />
      )}
    </div>
  );
}

export const lesson3Slides = [
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
