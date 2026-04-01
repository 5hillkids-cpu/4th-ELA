# 4th Grade ELA Adventure! 🎓

An interactive web game for 4th-grade English Language Arts (ELA) covering all 5 key standards. Students earn XP and badges as they progress through 5 lessons with 10 interactive screens each.

## Lessons

| # | Standard | Title | Passage |
|---|---|---|---|
| 1 | RL – Textual Evidence | 🔍 Prove It! | "The Great Desk-Pet Mystery" |
| 2 | RL – Theme & Summary | 🕵️ Big Message | "The Not-So-Sneaky Kindness" |
| 3 | RL – Characters & Events | 🦜 Who Did What | "The Substitute Teacher's Pet Parrot" |
| 4 | RI – Main Idea & Details | 🎒 What's the Point? | "How to Train Your Backpack" |
| 5 | RI – Text Structure | 🧊 How It's Built | "The Day the Playground Froze" |

Each lesson contains: **Slider** + **Dial** + **Drag-and-Drop** + **2+ Hotspots** + **3-question MCQ Assessment**

## Features

- ⭐ XP counter and 🏅 badge system
- 🔊 Sound toggle (Web Audio API, no external files)
- CC Captions toggle
- ◑ High-contrast mode
- ⏸ Reduced-motion mode (also respects OS setting)
- ♿ Keyboard-accessible interactions with ARIA labels
- 📱 Responsive design

## Local Development

```bash
npm install
npm run dev
# → http://localhost:5173/4th-ELA/
```

## Build

```bash
npm run build
# Output in ./dist
```

## GitHub Pages Deployment

Push to `main` branch — GitHub Actions automatically builds and deploys to GitHub Pages.

The app will be available at: `https://5hillkids-cpu.github.io/4th-ELA/`

To enable GitHub Pages, go to **Settings → Pages** and set Source to the `gh-pages` branch.
