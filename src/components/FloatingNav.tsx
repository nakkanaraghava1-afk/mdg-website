import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Home, Users, Briefcase, Settings, Phone, Info } from 'lucide-react';

const NAV_LINKS = [
  { id: 'motto', label: 'Home', icon: Home },
  { id: 'about', label: 'About Us', icon: Info }, // Added About Us
  { id: 'team', label: 'Team', icon: Users },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Settings },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Close the menu if a user clicks or taps anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  // Smooth scroll function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Offset by 100px to account for the sticky header
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
    setIsOpen(false); // Close menu after clicking
  };

  // Only trigger hover state on devices with a real mouse (Desktop)
  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(true);
    }
  };

  // Only trigger hover leave state on devices with a real mouse (Desktop)
  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      setIsOpen(false);
    }
  };

  return (
    <div 
      ref={navRef}
      className="fixed bottom-6 right-6 z-[100]"
    >
      <div 
        className="relative flex flex-col items-end"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Floating Menu Items (Absolutely positioned so they don't block clicks when closed) */}
        <div 
          className={`absolute bottom-full right-0 pb-4 flex flex-col items-end gap-3 transition-all duration-300 ease-out origin-bottom ${
            isOpen 
              ? 'opacity-100 translate-y-0 scale-100 visible pointer-events-auto' 
              : 'opacity-0 translate-y-8 scale-90 invisible pointer-events-none'
          }`}
        >
          {NAV_LINKS.map((link, index) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="flex items-center gap-3 bg-white hover:bg-orange-500 hover:text-white text-gray-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] rounded-full px-5 py-3 transition-all duration-300 group whitespace-nowrap"
                // Add a slight stagger effect based on index
                style={{ transitionDelay: isOpen ? `${(NAV_LINKS.length - index) * 40}ms` : '0ms' }}
              >
                <span className="font-semibold text-sm">{link.label}</span>
                <Icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors" />
              </button>
            );
          })}
        </div>

        {/* Main Toggle Button */}
        <button
          // Mobile & Fallback Click Event
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-orange-500 text-white rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:bg-orange-600 flex items-center justify-center transition-all duration-300 transform hover:scale-105 relative pointer-events-auto"
        >
          {/* Animated icon transition between Menu and X */}
          <Menu 
            className={`w-6 h-6 absolute transition-all duration-300 ${
              isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
            }`} 
          />
          <X 
            className={`w-6 h-6 absolute transition-all duration-300 ${
              isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
            }`} 
          />
          
          {/* Subtle glowing ring behind the button */}
          <div className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping opacity-20"></div>
        </button>
      </div>
    </div>
  );
};