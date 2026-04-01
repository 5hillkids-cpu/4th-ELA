import { lesson1Slides } from './lesson1/slides';
import { lesson2Slides } from './lesson2/slides';
import { lesson3Slides } from './lesson3/slides';
import { lesson4Slides } from './lesson4/slides';
import { lesson5Slides } from './lesson5/slides';
import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Textual Evidence',
    emoji: '🔍',
    color: '#FF4D6D',
    slides: lesson1Slides,
  },
  {
    id: 2,
    title: 'Theme & Summary',
    emoji: '🕵️',
    color: '#9B5DE5',
    slides: lesson2Slides,
  },
  {
    id: 3,
    title: 'Characters & Events',
    emoji: '🦜',
    color: '#06D6A0',
    slides: lesson3Slides,
  },
  {
    id: 4,
    title: 'Main Idea & Details',
    emoji: '🎒',
    color: '#FFD166',
    slides: lesson4Slides,
  },
  {
    id: 5,
    title: 'Text Structure',
    emoji: '🧊',
    color: '#118AB2',
    slides: lesson5Slides,
  },
];
