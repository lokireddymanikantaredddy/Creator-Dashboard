import React, { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight, FiMenu } from 'react-icons/fi';

export default function Learning() {
  const scrollContainerRef = useRef(null);
  const [showLeftScroll, setShowLeftScroll] = useState(false);
  const [showRightScroll, setShowRightScroll] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const resizeObserverRef = useRef(null);

  const sections = [
    { path: 'html', label: 'HTML' },
    { path: 'css', label: 'CSS' },
    { path: 'javascript', label: 'JavaScript' },
    { path: 'react', label: 'React' },
    { path: 'node', label: 'Node.js' },
    { path: 'mongodb', label: 'MongoDB' },
    { path: 'express', label: 'Express.js' },
    { path: 'nextjs', label: 'Next.js' },
    { path: 'typescript', label: 'TypeScript' },
    { path: 'bootstrap', label: 'Bootstrap' },
    { path: 'git', label: 'Git' }
  ];

  const checkScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftScroll(scrollLeft > 0);
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    try {
      const observer = new ResizeObserver(() => {
        window.requestAnimationFrame(checkScroll);
      });

      observer.observe(scrollContainer);
      checkScroll();

      return () => observer.disconnect();
    } catch (error) {
      console.error('ResizeObserver error:', error);
    }
  }, [checkScroll]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Find current section
  const currentSection = sections.find(section => 
    location.pathname.includes(section.path)
  ) || sections[0];

  return (
    <div className="flex flex-col min-h-full bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Current Section Title */}
          <span className="font-medium text-gray-900">{currentSection.label}</span>
          
          {/* Menu Button - Right Side */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -mr-2 text-gray-600 hover:text-gray-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="absolute top-full right-0 w-64 bg-white border-l border-b border-gray-200 shadow-lg max-h-[70vh] overflow-y-auto">
            {sections.map(({ path, label }) => (
              <NavLink
                key={path}
                to={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 text-sm ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Horizontal Tabs */}
      <div className="hidden md:block sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="relative max-w-6xl mx-auto">
          {showLeftScroll && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-0 bottom-0 z-10 flex items-center justify-center w-12 bg-gradient-to-r from-white via-white to-transparent"
              aria-label="Scroll left"
            >
              <FiChevronLeft className="h-5 w-5 text-gray-500" />
            </button>
          )}
          {showRightScroll && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-0 bottom-0 z-10 flex items-center justify-center w-12 bg-gradient-to-l from-white via-white to-transparent"
              aria-label="Scroll right"
            >
              <FiChevronRight className="h-5 w-5 text-gray-500" />
            </button>
          )}

          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide"
            onScroll={checkScroll}
          >
            <nav className="flex whitespace-nowrap px-4" aria-label="Learning sections">
              {sections.map(({ path, label }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `px-4 py-4 text-sm font-medium transition-all relative
                    ${
                      isActive
                        ? 'text-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }
                    ${
                      isActive
                        ? 'after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                        : ''
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 w-full">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Outlet />
        </div>
      </div>

      {/* Overlay for Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-25 z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
} 