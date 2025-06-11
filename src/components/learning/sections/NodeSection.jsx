import React from 'react';
import LearningSection from '../common/LearningSection';
import { nodeLessons } from '../data/nodeLessons';

export default function NodeSection() {
  return <LearningSection lessons={nodeLessons} sectionTitle="Node.js" />;
} 