import { useState } from 'react';
import type { SlideProps } from '../../types';
import { useStore } from '../../store';
import { playSound } from '../../audio';
import MultipleChoice from '../../components/interactions/MultipleChoice';
import SliderInteraction from '../../components/interactions/SliderInteraction';
import DialInteraction from '../../components/interactions/DialInteraction';
import DragDropInteraction from '../../components/interactions/DragDropInteraction';
import HotspotInteraction from '../../components/interactions/HotspotInteraction';

const PASSAGE = `Yesterday, our playground looked normal… until the sprinklers turned on during a cold morning. I was the first one to step on the blacktop and my sneaker made a weird crunch. I looked down and saw a shiny sheet of ice. "Whoa!" I yelled, and my friend Tessa grabbed my sleeve before I slid. Later, the principal told our class what happened. He said the sprinklers were set on a timer, but the temperature dropped overnight. The water spread across the blacktop and froze. He also said the custodian put salt down quickly so nobody got hurt. By lunchtime, the ice was mostly gone. But my class still called it "The Great Slip-n-Slide Incident," even though the principal did not like that name at all.`;

function Slide1({ onNext }: SlideProps) {
  const { addXP, soundOn } = useStore();
  const [started, setStarted] = useState(false);
  function handleStart() {
    if (!started) { addXP(10); if (soundOn) playSound('xp'); setStarted(true); }
    onNext();
  }
  return (
    <div className="title-slide">
      <span className="big-emoji" aria-hidden="true">🧊</span>
      <h2>Text Structure Quest!</h2>
      <p className="hook-text">"Would you rather hear it from a kid… or the principal?"</p>
      <p className="vo-text">The same event — told two different ways! Let's learn about text structure and firsthand vs secondhand accounts.</p>
      <button className="big-btn" onClick={handleStart}>Investigate! 🔍 (+10 XP)</button>
    </div>
  );
}

function Slide2({ onNext }: SlideProps) {
  const [lit, setLit] = useState([false, false, false]);
  const objectives = [
    "I can identify text structure (cause/effect, time order) 🏗️",
    "I can tell the difference between firsthand and secondhand accounts 👁️",
    "I can use text clues to explain the structure 🔎",
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
      <h2 className="slide-title">Text Structure Clues 📖</h2>
      <p className="slide-body">
        <strong>Cause and Effect</strong>: Something happens <em>because of</em> something else.<br />
        Look for clue words: <em>because, so, as a result, until, therefore</em>
      </p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[{ id: "h1", text: "until the sprinklers", hint: "Cause clue found! 'Until the sprinklers turned on' introduces the cause of the whole icy situation!" }]}
        required={1}
        onComplete={onNext}
        xpReward={5}
        instruction="Click the phrase that signals the CAUSE of the icy playground!"
      />
    </div>
  );
}

function Slide4({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">What Structure Is This? 🏗️</h2>
      <p className="slide-body">This passage uses BOTH time-order words (Yesterday, Later, By lunchtime) AND cause-and-effect connections. Which is the BEST description?</p>
      <SliderInteraction
        labels={["Time order only", "Both cause/effect and time order", "Cause/effect only"]}
        correctIndex={1}
        xpReward={10}
        onCorrect={onNext}
        instruction="Slide to the BEST description of this passage's structure!"
      />
    </div>
  );
}

function Slide5({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Firsthand vs. Secondhand 👁️</h2>
      <p className="slide-body">
        <strong>Firsthand</strong>: The person <em>experienced</em> it ("I saw…", "I felt…")<br />
        <strong>Secondhand</strong>: Someone <em>reports</em> what happened ("He said…", "She told us…")
      </p>
      <MultipleChoice
        question="Which sentence is from a FIRSTHAND account?"
        options={[
          "I was the first one to step on the blacktop and my sneaker made a weird crunch.",
          "He said the sprinklers were set on a timer.",
          "The principal told our class what happened.",
        ]}
        correctIndex={0}
        rationale="'I was the first one…' uses 'I' — the writer personally experienced this! That's firsthand."
        xpReward={10}
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide6({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Firsthand or Secondhand? 🗂️</h2>
      <p className="slide-body">Sort each sentence into the correct bin!</p>
      <DragDropInteraction
        items={[
          { id: "s1", text: "I looked down and saw a shiny sheet of ice.", correctBin: "Firsthand" },
          { id: "s2", text: "He said the sprinklers were set on a timer.", correctBin: "Secondhand" },
          { id: "s3", text: "My sneaker made a weird crunch.", correctBin: "Firsthand" },
          { id: "s4", text: "The custodian put salt down quickly.", correctBin: "Secondhand" },
        ]}
        bins={["Firsthand", "Secondhand"]}
        badgeName="Text Detective Badge"
        onComplete={onNext}
        instruction="Drag each sentence into the correct account type!"
      />
    </div>
  );
}

function Slide7({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Check for Understanding 🧠</h2>
      <MultipleChoice
        question="Which sentence is from a SECONDHAND account?"
        options={[
          '"My sneaker made a weird crunch."',
          '"He said the sprinklers were set on a timer."',
          '"Tessa grabbed my sleeve before I slid."',
        ]}
        correctIndex={1}
        rationale="'He said…' tells us it's REPORTED by someone who wasn't there — that's secondhand!"
        onCorrect={onNext}
      />
    </div>
  );
}

function Slide8({ onNext }: SlideProps) {
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Sort the Connectors! 🎛️</h2>
      <p className="slide-body">Time order, cause, or effect? Sort each text clue!</p>
      <DialInteraction
        items={[
          { text: "until the sprinklers turned on", category: "Cause" },
          { text: "Yesterday", category: "Time Order" },
          { text: "the water spread and froze", category: "Effect" },
          { text: "By lunchtime", category: "Time Order" },
        ]}
        categories={["Time Order", "Cause", "Effect"]}
        onComplete={onNext}
        instruction="Use ◀ ▶ to sort each phrase into Time Order, Cause, or Effect!"
      />
    </div>
  );
}

function Slide9({ onNext }: SlideProps) {
  const { earnBadge } = useStore();
  function handleComplete() { earnBadge("Text Detective Badge"); onNext(); }
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Hotspot Hunt! 🔎</h2>
      <p className="slide-body">Find ONE firsthand clue and ONE secondhand clue in the passage!</p>
      <HotspotInteraction
        passage={PASSAGE}
        hotspots={[
          { id: "hp1", text: "I looked down", hint: "Firsthand clue found! 'I looked down' shows the writer personally experienced this!" },
          { id: "hp2", text: "He said the sprinklers", hint: "Secondhand clue found! 'He said' tells us the principal reported this — he wasn't the one who experienced it!" },
        ]}
        required={2}
        xpReward={10}
        onComplete={handleComplete}
        instruction="Click ONE firsthand clue and ONE secondhand clue in the passage!"
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
      <p>You're a Text Structure expert!</p>
      <button className="big-btn" onClick={onNext}>Finish Lesson 🎉</button>
    </div>
  );
  return (
    <div className="slide-inner">
      <h2 className="slide-title">Final Assessment 🏆 ({q + 1}/3)</h2>
      {q === 0 && (
        <MultipleChoice
          question="What text structure does this passage MAINLY use?"
          options={["Comparison", "Cause and effect with time order", "Problem and solution"]}
          correctIndex={1}
          rationale="The passage uses time words (Yesterday, Later) AND shows causes and effects (cold + sprinklers = ice)!"
          onCorrect={advance}
        />
      )}
      {q === 1 && (
        <MultipleChoice
          question="Which sentence is a FIRSTHAND account clue?"
          options={[
            '"He said the custodian put salt down."',
            '"I looked down and saw a shiny sheet of ice."',
            '"The principal told our class what happened."',
          ]}
          correctIndex={1}
          rationale="'I looked down' is something the writer personally saw — that's a firsthand account!"
          onCorrect={advance}
        />
      )}
      {q === 2 && (
        <MultipleChoice
          question="Why does text structure matter when reading?"
          options={[
            "It tells you the author's name.",
            "It helps you understand why things happened.",
            "It makes the story longer.",
          ]}
          correctIndex={1}
          rationale="Understanding structure helps you follow the author's thinking and understand cause-and-effect or time order!"
          onCorrect={advance}
        />
      )}
    </div>
  );
}

export const lesson5Slides = [
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
