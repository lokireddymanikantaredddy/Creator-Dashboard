import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import Content from './pages/Content';
import Learning from './pages/Learning';
import Settings from './pages/Settings';
import HTMLSection from './components/learning/sections/HTMLSection';
import CSSSection from './components/learning/sections/CSSSection';
import JavaScriptSection from './components/learning/sections/JavaScriptSection';
import ReactSection from './components/learning/sections/ReactSection';
import NodeSection from './components/learning/sections/NodeSection';
import MongoDBSection from './components/learning/sections/MongoDBSection';
import ExpressSection from './components/learning/sections/ExpressSection';
import NextjsSection from './components/learning/sections/NextjsSection';
import TypeScriptSection from './components/learning/sections/TypeScriptSection';
import BootstrapSection from './components/learning/sections/BootstrapSection';
import GitSection from './components/learning/sections/GitSection';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="content" element={<Content />} />
        <Route path="settings" element={<Settings />} />
        
        <Route path="learning" element={<Learning />}>
          <Route index element={<Navigate to="html" replace />} />
          <Route path="html" element={<HTMLSection />} />
          <Route path="css" element={<CSSSection />} />
          <Route path="javascript" element={<JavaScriptSection />} />
          <Route path="react" element={<ReactSection />} />
          <Route path="node" element={<NodeSection />} />
          <Route path="mongodb" element={<MongoDBSection />} />
          <Route path="express" element={<ExpressSection />} />
          <Route path="nextjs" element={<NextjsSection />} />
          <Route path="typescript" element={<TypeScriptSection />} />
          <Route path="bootstrap" element={<BootstrapSection />} />
          <Route path="git" element={<GitSection />} />
        </Route>
      </Route>
    </Routes>
  );
} 