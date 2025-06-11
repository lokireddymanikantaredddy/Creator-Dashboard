import React from 'react';
import LearningSection from '../common/LearningSection';
import { gitLessons } from '../data/gitLessons';

export default function GitSection() {
  return <LearningSection lessons={gitLessons} sectionTitle="Git" />;
} 