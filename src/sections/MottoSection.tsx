import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronDown } from 'lucide-react';

export const MottoSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  // Trigger entrance animations on load
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#050505] font-sans">
      
      {/* --- BACKGROUND LAYER --- */}
      {/* Desktop Background */}
      <div 
        className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat transition-transform duration-[40s] hover:scale-110 ease-out"
        style={{ backgroundImage: "url('/hero-desktop.png'), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')" }}
      ></div>

      {/* Mobile Background */}
      <div 
        className="absolute inset-0 md:hidden bg-cover bg-center bg-no-repeat transition-transform duration-[40s] hover:scale-110 ease-out"
        style={{ backgroundImage: "url('/hero-mobile.png'), url('https://images.unsplash.com/photo-1574950293339-e4839baafec7?q=80&w=1000&auto=format&fit=crop')" }}
      ></div>

      {/* Premium Dark Gradient Overlays for Text Contrast */}
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent hidden md:block w-3/4"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent md:hidden"></div>

      {/* Architectural Drafting Watermarks (Subtle Details) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay pointer-events-none"></div>
      
      {/* Corner Crosshairs */}
      <div className="absolute top-24 left-6 md:left-12 w-4 h-4 border-t border-l border-white/20 pointer-events-none"></div>
      <div className="absolute top-24 right-6 md:right-12 w-4 h-4 border-t border-r border-white/20 pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-12 right-6 md:right-12 w-4 h-4 border-b border-r border-white/20 pointer-events-none hidden md:block"></div>

      {/* --- HERO CONTENT --- */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 w-full flex flex-col justify-center pt-20 md:pt-0">
        
        <div className="max-w-4xl">
          
          {/* Top Tagline & Technical Line */}
          <div 
            className={`flex items-center gap-4 mb-8 transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
          >
            <div className="w-16 h-[1px] bg-orange-500"></div>
            <span className="text-[10px] md:text-xs font-bold tracking-[0.4em] uppercase text-orange-400 drop-shadow-md">
              Mannan Design Group
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            className={`text-5xl md:text-7xl lg:text-[88px] leading-[1.05] font-serif text-white font-bold mb-8 drop-shadow-2xl transition-all duration-1000 delay-200 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Engineering <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 italic font-light">safety</span> into <br className="hidden md:block"/>
            every structure.
          </h1>

          {/* Supporting Paragraph */}
          <p 
            className={`text-gray-300 text-lg md:text-xl leading-relaxed mb-12 max-w-2xl font-light tracking-wide transition-all duration-1000 delay-400 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            Great structural engineering is invisible. It is the quiet confidence of knowing a building will stand strong for generations. We build trust into every relationship.
          </p>

          {/* Action Buttons */}
          <div 
            className={`flex flex-col sm:flex-row gap-5 transition-all duration-1000 delay-500 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <a 
              href="#projects" 
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-none transition-all duration-300 flex items-center justify-center gap-3 group shadow-[0_0_30px_-5px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_-5px_rgba(249,115,22,0.5)]"
            >
              <span className="tracking-widest uppercase text-xs">Explore Portfolio</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a 
              href="#contact" 
              className="bg-transparent hover:bg-white text-white hover:text-black border border-white/30 hover:border-white font-bold py-4 px-8 rounded-none transition-all duration-300 flex items-center justify-center group"
            >
              <span className="tracking-widest uppercase text-xs">Consult With Us</span>
            </a>
          </div>

        </div>

      </div>

      {/* --- SCROLL INDICATOR --- */}
      <div 
        className={`absolute bottom-12 left-6 md:left-12 flex items-center gap-4 transition-all duration-1000 delay-[800ms] ease-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold -rotate-90 origin-left translate-y-6 translate-x-1.5">Scroll</span>
          <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden mt-6">
            <div className="w-full h-1/2 bg-orange-500 animate-[scrollDown_2s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </div>

      {/* Global Animation Keyframes */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scrollDown {
          0% { transform: translateY(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(200%); opacity: 0; }
        }
      `}} />

    </section>
  );
};