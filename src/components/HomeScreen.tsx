import { lessons } from '../lessons';

interface Props { onSelectLesson: (id: number) => void; }

export default function HomeScreen({ onSelectLesson }: Props) {
  return (
    <div className="home-screen">
      <h2 className="home-title">4th Grade ELA Adventure!</h2>
      <p className="home-subtitle">Choose a lesson to begin your quest 🚀</p>
      <div className="lessons-grid">
        {lessons.map(lesson => (
          <button
            key={lesson.id}
            className="lesson-card"
            style={{ background: lesson.color }}
            onClick={() => onSelectLesson(lesson.id)}
            aria-label={`Lesson ${lesson.id}: ${lesson.title}`}
          >
            <span className="lesson-emoji" aria-hidden="true">{lesson.emoji}</span>
            <span className="lesson-num">Lesson {lesson.id}</span>
            <span className="lesson-title-text">{lesson.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
