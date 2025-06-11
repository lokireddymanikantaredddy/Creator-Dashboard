import React from 'react';
import LearningSection from '../common/LearningSection';
import { mongodbLessons } from '../data/mongodbLessons';

export default function MongoDBSection() {
  return <LearningSection lessons={mongodbLessons} sectionTitle="MongoDB" />;
} 