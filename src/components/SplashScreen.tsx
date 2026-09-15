import React, { useState, useEffect } from 'react';

export const SplashScreen: React.FC = () => {
  const [stage, setStage] = useState<'enter' | 'loading' | 'exit' | 'hidden'>('enter');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Prevent scrolling while splash screen is active
    document.body.style.overflow = 'hidden';

    // Sequence the animations
    const t1 = setTimeout(() => setStage('loading'), 100); 
    const t2 = setTimeout(() => setStage('exit'), 2800); // Trigger split screen
    const t3 = setTimeout(() => {
      setStage('hidden');
      document.body.style.overflow = 'unset'; 
    }, 4000); // Remove from DOM completely after split finishes

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Number Counter Logic (0 to 100%)
  useEffect(() => {
    if (stage === 'loading') {
      let start = 0;
      const duration = 2000; // 2 seconds to count to 100
      const interval = 20; // 50 frames per second
      const step = 100 / (duration / interval);
      
      const timer = setInterval(() => {
        start += step;
        if (start >= 100) {
          setProgress(100);
          clearInterval(timer);
        } else {
          setProgress(Math.floor(start));
        }
      }, interval);
      
      return () => clearInterval(timer);
    }
  }, [stage]);

  if (stage === 'hidden') return null;

  return (
    <div className="fixed inset-0 z-[99999] pointer-events-none flex items-center justify-center">
      
      {/* --- TOP HALF (Crisp White) --- */}
      <div 
        className={`absolute top-0 left-0 w-full h-1/2 bg-white transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.05)] ${
          stage === 'exit' ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Moving Engineering Grid (Light Mode) */}
        <div className="absolute inset-0 w-full h-[200vh] bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pan-grid"></div>
      </div>

      {/* --- BOTTOM HALF (Crisp White) --- */}
      <div 
        className={`absolute bottom-0 left-0 w-full h-1/2 bg-white transition-transform duration-[1200ms] ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.05)] ${
          stage === 'exit' ? 'translate-y-full' : 'translate-y-0'
        }`}
      >
        {/* Moving Engineering Grid (Aligned with top) */}
        <div className="absolute bottom-0 left-0 w-full h-[200vh] bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:40px_40px] animate-pan-grid"></div>
      </div>

      {/* --- CENTER EQUATOR LINE --- */}
      <div 
        className={`absolute top-1/2 left-0 w-full h-[1px] bg-gray-200 transition-opacity duration-500 -translate-y-1/2 ${
          stage === 'exit' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        {/* Crisp Orange Progress Line */}
        <div 
          className="h-full bg-gradient-to-r from-orange-400 to-orange-600 transition-all ease-out shadow-[0_0_15px_rgba(249,115,22,0.4)]"
          style={{ 
            width: `${progress}%`,
            transitionDuration: progress === 100 ? '200ms' : '75ms'
          }}
        ></div>
      </div>

      {/* --- MAIN CONTENT (Logo & Text) --- */}
      <div 
        className={`relative z-10 flex flex-col items-center justify-center w-full px-6 transition-all duration-[800ms] ease-[cubic-bezier(0.85,0,0.15,1)] ${
          stage === 'exit' ? 'opacity-0 scale-125 blur-sm' : 'opacity-100 scale-100 blur-0'
        }`}
      >
        {/* Soft Ambient Shadow behind Logo container */}
        <div className="absolute w-[200px] md:w-[350px] h-[200px] md:h-[350px] bg-orange-500/5 blur-[60px] md:blur-[100px] rounded-full animate-pulse-slow"></div>

        {/* Crisp Logo Container Reveal */}
        <div className="relative mb-8 md:mb-12 overflow-hidden bg-white/60 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-white">
          
          <img 
            src="/logo.png" 
            alt="MDG Logo" 
            className="w-56 md:w-80 lg:w-[350px] object-contain relative z-10 animate-logo-shine"
          />
          
          {/* Sweeping Light Reflection Effect (Perfect Continuous Loop) */}
          <div className="absolute top-0 left-0 w-full h-full z-20 animate-shimmer bg-gradient-to-r from-transparent via-white/90 to-transparent pointer-events-none"></div>
        </div>

        {/* Data / Loading Info */}
        <div className="flex flex-col items-center bg-white/80 backdrop-blur-md px-6 py-2 rounded-full border border-gray-100 shadow-sm">
          <div className="flex items-center gap-4 text-[10px] md:text-xs tracking-[0.3em] font-bold uppercase">
            <span className="text-gray-400 animate-pulse">Loading Assets</span>
            <span className="w-8 h-[1px] bg-gray-300"></span>
            <span className="w-10 text-right text-orange-500">{progress}%</span>
          </div>
        </div>
      </div>

      {/* --- CUSTOM CSS ANIMATIONS --- */}
      <style dangerouslySetInnerHTML={{__html: `
        /* Continuous sweeping light effect over the glass card */
        @keyframes shimmer {
          0% { transform: translateX(-150%) skewX(-15deg); }
          100% { transform: translateX(150%) skewX(-15deg); }
        }
        .animate-shimmer {
          /* linear ensures it doesn't slow down or pause, giving a perfect loop */
          animation: shimmer 1.8s infinite linear;
        }

        /* Subtle glowing pulse directly on the transparent logo */
        @keyframes logoShine {
          0%, 100% { filter: drop-shadow(0 8px 12px rgba(0,0,0,0.06)) drop-shadow(0 0 0px rgba(249,115,22,0)); }
          50% { filter: drop-shadow(0 8px 12px rgba(0,0,0,0.06)) drop-shadow(0 0 15px rgba(249,115,22,0.4)); }
        }
        .animate-logo-shine {
          animation: logoShine 2.5s infinite ease-in-out;
        }

        /* Subtle moving blueprint grid */
        @keyframes panGrid {
          0% { transform: translateY(0); }
          100% { transform: translateY(-40px); }
        }
        .animate-pan-grid {
          animation: panGrid 3s linear infinite;
        }

        /* Ambient soft pulsing for the background orb */
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
      `}} />
    </div>
  );
};