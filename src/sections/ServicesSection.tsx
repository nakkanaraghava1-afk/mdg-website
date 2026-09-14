import React from 'react';
import { 
  Map, 
  FileText, 
  Building2, 
  Activity, 
  Calculator, 
  Pickaxe, 
  Hammer,
  ArrowRight,
} from 'lucide-react';

const SERVICES = [
  {
    id: 1,
    num: '01',
    title: 'Site Planning',
    desc: 'Comprehensive site analysis and planning to ensure optimal design, functionality and compliance.',
    icon: Map,
    colSpan: 'lg:col-span-3'
  },
  {
    id: 2,
    num: '02',
    title: 'Schematic Plans',
    desc: 'Development of clear and efficient schematic plans tailored to project needs and regulatory requirements.',
    icon: FileText,
    colSpan: 'lg:col-span-3'
  },
  {
    id: 3,
    num: '03',
    title: 'Structural Design',
    desc: 'Innovative and code-compliant structural design solutions for safe, durable and cost-effective structures.',
    icon: Building2,
    colSpan: 'lg:col-span-3'
  },
  {
    id: 4,
    num: '04',
    title: 'Non-Destructive Testing',
    desc: 'Advanced non-destructive testing methods to evaluate structural integrity without causing damage.',
    icon: Activity,
    colSpan: 'lg:col-span-3'
  },
  {
    id: 5,
    num: '05',
    title: 'Estimations',
    desc: 'Accurate and detailed cost estimations to support informed decision-making and project budgeting.',
    icon: Calculator,
    colSpan: 'lg:col-span-4'
  },
  {
    id: 6,
    num: '06',
    title: 'Geotechnical Investigations',
    desc: 'In-depth soil and site investigations to understand ground conditions and ensure a strong foundation.',
    icon: Pickaxe,
    colSpan: 'lg:col-span-4'
  },
  {
    id: 7,
    num: '07',
    title: 'Repairs & Rehabilitation',
    desc: 'Thorough assessment and practical solutions for the repair and rehabilitation of existing structures.',
    icon: Hammer,
    colSpan: 'lg:col-span-4'
  }
];

export const ServicesSection: React.FC = () => {
  return (
    // REDUCED TOP PADDING HERE (pt-8 md:pt-12) to close the gap with the section above
    <section className="relative w-full bg-gradient-to-b from-white to-gray-50 pt-8 md:pt-12 pb-24 md:pb-36 overflow-hidden">
      
      {/* Decorative Background Text (Hidden on mobile) */}
      <div className="absolute top-12 left-12 hidden xl:block z-0">
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase leading-relaxed block">
          People<br />Ideas<br />Structures<br />Stronger<br />Together
        </span>
        <div className="w-8 h-[2px] bg-orange-500 mt-3 opacity-50"></div>
      </div>
      
      <div className="absolute top-12 right-12 hidden xl:block text-right z-0">
        <span className="text-[10px] font-bold tracking-[0.2em] text-gray-300 uppercase leading-relaxed block">
          Engineering<br />Better<br />Tomorrows
        </span>
        <div className="w-8 h-[2px] bg-orange-500 mt-3 ml-auto opacity-50"></div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 md:px-8 lg:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">
              What We Do
            </span>
            <div className="hidden md:block w-8 h-[2px] bg-gradient-to-l from-orange-400 to-orange-600 rounded-full"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            SERVICES OFFERED
          </h2>
          
          <p className="text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed px-4">
            Provide safe, practical and reliable structural engineering solutions across planning, design, assessment and rehabilitation.
          </p>
        </div>

        {/* 12-Column Grid (Desktop) / Flex Col (Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 md:gap-6 mb-10">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <div 
                key={service.id} 
                className={`group relative bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-6 md:p-8 flex flex-col items-start gap-4 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-10px_rgba(249,115,22,0.15)] cursor-pointer ${service.colSpan}`}
              >
                {/* Top Animated Gradient Border Reveal */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-20"></div>

                {/* Large Background Watermark Number */}
                <span className="absolute -right-4 -bottom-6 text-[120px] font-black text-gray-50 group-hover:text-orange-50/60 transition-colors duration-500 z-0 select-none pointer-events-none tracking-tighter leading-none">
                  {service.num}
                </span>
                
                {/* Icon Container with glowing hover effect */}
                <div className="relative z-10 w-14 h-14 rounded-xl bg-orange-50/80 flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-red-500 group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-orange-500/30">
                  <Icon className="w-7 h-7" strokeWidth={1.5} />
                </div>

                {/* Content Area */}
                <div className="relative z-10 flex-1 mt-2">
                  <h3 className="font-serif font-bold text-gray-900 text-xl leading-tight mb-3 group-hover:text-orange-600 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-sm text-gray-500 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300 relative z-10">
                    {service.desc}
                  </p>
                </div>
                
                {/* Arrow at the bottom - slides right on hover */}
                <div className="relative z-10 mt-auto w-full flex justify-start items-center text-sm font-bold text-gray-400 group-hover:text-orange-500 transition-colors duration-300">
                  <span className="mr-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">Explore</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* Skyline Graphic Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 md:h-48 opacity-[0.15] pointer-events-none flex items-end justify-center overflow-hidden grayscale">
        <img 
          src="/skyline.png" 
          alt="City Skyline" 
          className="w-full h-full object-cover object-bottom mix-blend-multiply"
          style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop';
          }}
        />
      </div>

    </section>
  );
};