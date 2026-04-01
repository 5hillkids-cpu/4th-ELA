import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import LessonScreen from './components/LessonScreen';
import Layout from './components/Layout';
import { lessons } from './lessons';

type Screen = 'home' | { lessonId: number; slide: number };

function App() {
  const [screen, setScreen] = useState<Screen>('home');

  function goHome() { setScreen('home'); }
  function goLesson(lessonId: number) { setScreen({ lessonId, slide: 0 }); }
  function setSlide(slide: number) {
    if (typeof screen === 'object') setScreen({ ...screen, slide });
  }

  return (
    <Layout>
      {screen === 'home' ? (
        <HomeScreen onSelectLesson={goLesson} />
      ) : (
        <LessonScreen
          lesson={lessons.find(l => l.id === (screen as { lessonId: number; slide: number }).lessonId)!}
          currentSlide={(screen as { lessonId: number; slide: number }).slide}
          onSlideChange={setSlide}
          onHome={goHome}
        />
      )}
    </Layout>
  );
}

export default App;
