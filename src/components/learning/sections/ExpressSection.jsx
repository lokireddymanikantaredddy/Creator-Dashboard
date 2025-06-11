import React from 'react';
import LearningSection from '../common/LearningSection';
import { expressLessons } from '../data/expressLessons';

export default function ExpressSection() {
  return <LearningSection lessons={expressLessons} sectionTitle="Express.js" />;
} 