import React, { useState } from 'react';
import { Menu, X, Home, Users, Briefcase, Settings, Phone } from 'lucide-react';

const NAV_LINKS = [
  { id: 'motto', label: 'Motto', icon: Home },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'projects', label: 'Projects', icon: Briefcase },
  { id: 'services', label: 'Services', icon: Settings },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export const FloatingNav: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <div 
      className="fixed bottom-6 right-6 z-[100] flex flex-col items-end"
      // Desktop Hover Events
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Floating Menu Items */}
      <div 
        className={`flex flex-col items-end gap-3 mb-4 transition-all duration-300 ease-out origin-bottom ${
          isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
        }`}
      >
        {NAV_LINKS.map((link, index) => {
          const Icon = link.icon;
          return (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="flex items-center gap-3 bg-white hover:bg-orange-500 hover:text-white text-gray-800 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.15)] rounded-full px-5 py-3 transition-all duration-300 group"
              // Add a slight stagger effect based on index
              style={{ transitionDelay: isOpen ? `${(NAV_LINKS.length - index) * 50}ms` : '0ms' }}
            >
              <span className="font-semibold text-sm">{link.label}</span>
              <Icon className="w-4 h-4 text-orange-500 group-hover:text-white transition-colors" />
            </button>
          );
        })}
      </div>

      {/* Main Toggle Button */}
      <button
        // Mobile Click Event
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-orange-500 text-white rounded-full shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)] hover:bg-orange-600 flex items-center justify-center transition-all duration-300 transform hover:scale-110 relative"
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
  );
};