import React from 'react';
import LearningSection from '../common/LearningSection';
import { javascriptLessons } from '../data/javascriptLessons';

export default function JavaScriptSection() {
  return <LearningSection lessons={javascriptLessons} sectionTitle="JavaScript" />;
} 