import React from 'react';
import LearningSection from '../common/LearningSection';
import { bootstrapLessons } from '../data/bootstrapLessons';

export default function BootstrapSection() {
  return <LearningSection lessons={bootstrapLessons} sectionTitle="Bootstrap" />;
} 