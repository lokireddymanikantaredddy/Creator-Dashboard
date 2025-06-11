import React from 'react';
import LearningSection from '../common/LearningSection';
import { nextjsLessons } from '../data/nextjsLessons';

export default function NextjsSection() {
  return <LearningSection lessons={nextjsLessons} sectionTitle="Next.js" />;
} 