// Full LessonScreen Component
import React from 'react';
import './LessonScreen.css';

const LessonScreen = ({ currentSlide }) => {
    const backgroundClass = `background-${currentSlide}`;
    return (
        <div className={`lesson-screen ${backgroundClass}`}> 
            <h1>Lesson Screen</h1>
            {/* Other component code here */}
        </div>
    );
};

export default LessonScreen;