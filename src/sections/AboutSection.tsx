import React, { useEffect, useState } from 'react';
import { Award, BriefcaseBusiness, CheckCircle2, ArrowRight } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="relative w-full bg-white py-20 md:py-32 overflow-hidden border-t border-gray-100">
      
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none z-0"></div>
      
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT COLUMN: Text Content */}
          <div className={`flex flex-col transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            
            {/* Section Label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-orange-500"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">
                Who We Are
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-[56px] leading-[1.1] font-serif text-gray-900 font-bold mb-8">
              A legacy of building <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">stronger tomorrows.</span>
            </h2>

            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-6 font-light">
              <strong className="font-semibold text-gray-900">Mannan Design Group</strong> is a trusted Structural & Civil Engineering Consultancy with expertise spanning residential, commercial, and industrial structures.
            </p>

            <p className="text-gray-600 text-base leading-relaxed mb-10">
              We are committed to delivering practical, safe, and economical engineering solutions—ranging from complex structural analysis and design to advanced technical consultancy and dedicated project support.
            </p>

            {/* Core Offerings List */}
            <div className="space-y-4 mb-12">
              {[
                'Practical, safe, and economical structural solutions',
                'Expertise in residential, commercial & industrial sectors',
                'End-to-end structural analysis, design, and consultancy',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-orange-50 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-500" />
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a href="#contact" className="inline-flex items-center gap-3 w-fit pb-2 border-b-2 border-orange-500 text-gray-900 font-bold tracking-wide uppercase text-sm hover:text-orange-500 transition-colors group">
              Consult With Our Experts
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* RIGHT COLUMN: Imagery & Stats */}
          <div className={`relative transition-all duration-1000 delay-300 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Main Image */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-[3/4] lg:aspect-auto lg:h-[650px] w-full lg:w-[90%] ml-auto">
              <img 
                src="https://ik.imagekit.io/indra12/ChatGPT%20Image%20Sep%2015,%202026,%2012_09_44%20AM.png" 
                alt="Structural Engineering" 
                className="w-full h-full object-cover transition-transform duration-[20s] hover:scale-110"
              />
              {/* Image Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
            </div>

            {/* Floating Stat Card 1: Years Experience */}
            <div className="absolute top-12 -left-4 md:-left-12 bg-white p-6 rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-5 animate-[bounce_6s_infinite_ease-in-out]">
              <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center shrink-0">
                <Award className="w-7 h-7 text-orange-500" />
              </div>
              <div>
                <p className="text-4xl font-serif font-black text-gray-900 leading-none mb-1">20<span className="text-orange-500">+</span></p>
                <p className="text-xs font-bold tracking-wider text-gray-500 uppercase">Years Expertise</p>
              </div>
            </div>

            {/* Floating Stat Card 2: Consultations */}
            <div className="absolute bottom-16 -left-4 md:-left-8 bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-gray-700/50 flex items-center gap-5 animate-[bounce_7s_infinite_ease-in-out_reverse]">
              <div className="w-14 h-14 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0 border border-orange-500/30">
                <BriefcaseBusiness className="w-7 h-7 text-orange-400" />
              </div>
              <div>
                <p className="text-4xl font-serif font-black text-white leading-none mb-1">400<span className="text-orange-500">+</span></p>
                <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">Structural Consultations</p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};