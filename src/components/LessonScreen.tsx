import type { Lesson } from '../types';

interface Props {
  lesson: Lesson;
  currentSlide: number;
  onSlideChange: (n: number) => void;
  onHome: () => void;
}

export default function LessonScreen({ lesson, currentSlide, onSlideChange, onHome }: Props) {
  const total = lesson.slides.length;
  const slide = lesson.slides[currentSlide];
  const SlideComponent = slide.component;

  return (
    <div className="lesson-screen">
      <div className="lesson-nav-top">
        <button className="nav-btn back-home" onClick={onHome} aria-label="Back to home">🏠 Home</button>
        <span className="slide-progress" aria-label={`Slide ${currentSlide + 1} of ${total}`}>
          {lesson.emoji} {lesson.title} — Slide {currentSlide + 1}/{total}
        </span>
        <div className="slide-dots" aria-hidden="true">
          {lesson.slides.map((_, i) => (
            <span key={i} className={`slide-dot${i === currentSlide ? ' active' : i < currentSlide ? ' done' : ''}`} />
          ))}
        </div>
      </div>
      <div className="slide-content">
        <SlideComponent onNext={() => {
          if (currentSlide < total - 1) onSlideChange(currentSlide + 1);
          else onHome();
        }} />
      </div>
      <div className="lesson-nav-bottom">
        {currentSlide > 0 && (
          <button className="nav-btn" onClick={() => onSlideChange(currentSlide - 1)} aria-label="Previous slide">
            ← Back
          </button>
        )}
        <div style={{ flex: 1 }} />
      </div>
    </div>
  );
}
