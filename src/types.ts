export interface SlideProps {
  onNext: () => void;
}

export interface Lesson {
  id: number;
  title: string;
  emoji: string;
  color: string;
  slides: Array<{ id: number; component: React.FC<SlideProps> }>;
}
