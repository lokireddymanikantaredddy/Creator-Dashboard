import React from 'react';
import LearningSection from '../common/LearningSection';
import { cssLessons } from '../data/cssLessons';

export default function CSSSection() {
  return <LearningSection lessons={cssLessons} sectionTitle="CSS" />;
} 