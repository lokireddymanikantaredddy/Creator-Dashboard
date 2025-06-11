import React from 'react';
import LearningSection from '../common/LearningSection';
import { typescriptLessons } from '../data/typescriptLessons';

export default function TypeScriptSection() {
  return <LearningSection lessons={typescriptLessons} sectionTitle="TypeScript" />;
} 