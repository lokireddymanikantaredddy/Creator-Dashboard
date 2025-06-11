import React from 'react';
import LearningSection from '../common/LearningSection';
import { htmlLessons } from '../data/htmlLessons';

export default function HTMLSection() {
  return <LearningSection lessons={htmlLessons} sectionTitle="HTML" />;
} 