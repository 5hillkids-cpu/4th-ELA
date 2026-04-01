import React from 'react';
import { useStore } from '../store';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { xp, badges, soundOn, captionsOn, highContrast, reducedMotion,
          toggleSound, toggleCaptions, toggleHighContrast, toggleReducedMotion } = useStore();
  return (
    <div className="app-layout">
      <header className="app-header">
        <h1 className="app-title">🎓 4th Grade ELA</h1>
        <div className="header-right">
          <span className="xp-counter" aria-label={`${xp} XP`}>⭐ {xp} XP</span>
          {badges.map(b => (
            <span key={b} className="badge-chip" title={b}>🏅 {b}</span>
          ))}
          <button className={`toggle-btn${soundOn ? ' active' : ''}`} onClick={toggleSound} aria-label={soundOn ? 'Mute sound' : 'Unmute sound'}>
            {soundOn ? '🔊' : '🔇'}
          </button>
          <button className={`toggle-btn${captionsOn ? ' active' : ''}`} onClick={toggleCaptions} aria-label="Toggle captions">
            CC
          </button>
          <button className={`toggle-btn${highContrast ? ' active' : ''}`} onClick={toggleHighContrast} aria-label="Toggle high contrast">
            ◑
          </button>
          <button className={`toggle-btn${reducedMotion ? ' active' : ''}`} onClick={toggleReducedMotion} aria-label="Toggle reduced motion">
            ⏸
          </button>
        </div>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}
