import React from 'react';
import LearningSection from '../common/LearningSection';
import { reactLessons } from '../data/reactLessons';

export default function ReactSection() {
  return <LearningSection lessons={reactLessons} sectionTitle="React" />;
} 