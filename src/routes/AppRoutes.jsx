import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Content from '../pages/Content';
import Learning from '../pages/Learning';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import Settings from '../pages/Settings';
import HTMLSection from '../components/learning/sections/HTMLSection';
import CSSSection from '../components/learning/sections/CSSSection';
import JavaScriptSection from '../components/learning/sections/JavaScriptSection';
import ReactSection from '../components/learning/sections/ReactSection';
import NodeSection from '../components/learning/sections/NodeSection';
import MongoDBSection from '../components/learning/sections/MongoDBSection';
import ExpressSection from '../components/learning/sections/ExpressSection';
import NextjsSection from '../components/learning/sections/NextjsSection';
import TypeScriptSection from '../components/learning/sections/TypeScriptSection';
import BootstrapSection from '../components/learning/sections/BootstrapSection';
import GitSection from '../components/learning/sections/GitSection';
import LearningSection from '../components/learning/common/LearningSection';
import { useAuth } from '../context/AuthContext';

export default function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

      {/* Protected routes */}
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/content" element={user ? <Content /> : <Navigate to="/login" />} />
        <Route path="/learning" element={user ? <Learning /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="html" />} />
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
        <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
        <Route path="/settings" element={user ? <Settings /> : <Navigate to="/login" />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}