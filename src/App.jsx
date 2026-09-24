import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { PortfolioProvider } from './features/state/PortfolioContext';
import { useLenisSmoothScroll } from './features/hooks/useLenisSmoothScroll';
import { Navbar } from './features/ui/components/Navbar';
import { Footer } from './features/ui/components/Footer';
import { CustomCursor } from './features/ui/components/CustomCursor';
import { ScrollProgress } from './features/ui/components/ScrollProgress';
import { PageTransitionWrapper } from './features/ui/components/PageTransitionWrapper';

// Lazy-loaded routes for optimal initial page loads
const Home = lazy(() => import('./features/ui/pages/Home').then(m => ({ default: m.Home })));
const About = lazy(() => import('./features/ui/pages/About').then(m => ({ default: m.About })));
const Skills = lazy(() => import('./features/ui/pages/Skills').then(m => ({ default: m.Skills })));
const Projects = lazy(() => import('./features/ui/pages/Projects').then(m => ({ default: m.Projects })));
const ProjectDetail = lazy(() => import('./features/ui/pages/ProjectDetail').then(m => ({ default: m.ProjectDetail })));
const Contact = lazy(() => import('./features/ui/pages/Contact').then(m => ({ default: m.Contact })));
const NotFound = lazy(() => import('./features/ui/pages/NotFound').then(m => ({ default: m.NotFound })));

const PageLoader = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center gap-3">
    <div className="w-8 h-8 rounded-full border-2 border-[#E8E5DC] border-t-[#1E1E1C] animate-spin" />
    <span className="font-mono text-xs uppercase tracking-widest text-[#8C8A82]">
      INITIALIZING...
    </span>
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransitionWrapper>
                <Home />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/projects"
            element={
              <PageTransitionWrapper>
                <Projects />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/projects/:slug"
            element={
              <PageTransitionWrapper>
                <ProjectDetail />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/skills"
            element={
              <PageTransitionWrapper>
                <Skills />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/about"
            element={
              <PageTransitionWrapper>
                <About />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="/contact"
            element={
              <PageTransitionWrapper>
                <Contact />
              </PageTransitionWrapper>
            }
          />
          <Route
            path="*"
            element={
              <PageTransitionWrapper>
                <NotFound />
              </PageTransitionWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const PortfolioApp = () => {
  useLenisSmoothScroll(true);

  return (
    <div className="relative min-h-screen bg-[#F5F2EA] text-[#1E1E1C] overflow-x-hidden flex flex-col justify-between selection:bg-[#1E1E1C] selection:text-[#F5F2EA] font-sans">
      {/* Delicate Architectural Background Grid */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-0" />

      {/* Reading Progress Indicator */}
      <ScrollProgress />

      {/* Precision Kinetic Cursor */}
      <CustomCursor />

      {/* Frosted Editorial Header */}
      <Navbar />

      {/* Main Content Area */}
      <main className="relative z-10 flex-grow">
        <AnimatedRoutes />
      </main>

      {/* Editorial Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <PortfolioProvider>
      <BrowserRouter>
        <PortfolioApp />
      </BrowserRouter>
    </PortfolioProvider>
  );
}
