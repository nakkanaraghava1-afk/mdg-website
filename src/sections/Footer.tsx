import React from 'react';
import { 
  ChevronRight, 
  Phone, 
  Smartphone, 
  Mail, 
  MapPin 
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#111111] text-gray-400 pt-16 md:pt-20 border-t-4 border-orange-500 overflow-hidden font-sans">
      
      {/* Background Architectural Graphic (Auto-styled to look like a dark blueprint) */}
      <div className="absolute bottom-0 left-0 w-full md:w-1/2 h-64 md:h-96 pointer-events-none opacity-20 mix-blend-overlay z-0 flex items-end">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
          alt="Architectural Blueprint" 
          className="w-full h-full object-cover object-bottom grayscale"
          style={{ maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)', WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)' }}
        />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-10 md:gap-8 xl:gap-12 pb-16 border-b border-gray-800">
          
          {/* Column 1: Branding & Info */}
          <div className="xl:col-span-3 flex flex-col">
            <div className="bg-white inline-block p-2 rounded w-fit mb-6">
              <img src="/logo.png" alt="MDG Logo" className="h-10" />
            </div>
            
            <div className="space-y-1 mb-6 text-sm">
              <p>Ofc No . 7075 773119</p>
              <p>Cell No . 9848 773119</p>
              <p>Email: <a href="mailto:mannandesigngroup@gmail.com" className="hover:text-white transition-colors">mannandesigngroup@gmail.com</a></p>
            </div>
            
            <div className="w-12 h-[2px] bg-orange-500 mb-6"></div>
            
            <p className="text-sm leading-relaxed max-w-xs mb-8">
              Providing safe, practical and reliable structural engineering solutions for a better tomorrow.
            </p>

            {/* Mobile-only social icons using pure SVGs to avoid import errors */}
            <div className="flex xl:hidden gap-3 mb-8">
              {/* LinkedIn */}
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-gray-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-gray-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-gray-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* Facebook */}
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all text-gray-400">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>

            {/* Desktop-only decorative text */}
            <div className="hidden xl:block mt-auto border-l-2 border-orange-500 pl-4">
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase leading-relaxed block">
                People<br />Ideas<br />Structures<br />Better Tomorrows
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="xl:col-span-2 flex flex-col">
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-3">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-4">
              {['Motto', 'Team', 'Projects', 'Services', 'Contact'].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="flex items-center gap-3 hover:text-orange-500 transition-colors group text-sm border-b border-gray-800 pb-3 xl:border-none xl:pb-0">
                  <ChevronRight className="w-4 h-4 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                  {link}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact Us */}
          <div className="xl:col-span-3 flex flex-col">
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-3">
              Contact Us
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group cursor-pointer border-b border-gray-800 pb-4 xl:border-none xl:pb-0">
                <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center shrink-0 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-colors">
                  <Phone className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Office Number</p>
                  <p className="text-white text-sm">7075 773119</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer border-b border-gray-800 pb-4 xl:border-none xl:pb-0">
                <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center shrink-0 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-colors">
                  <Smartphone className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Mobile Number / WhatsApp</p>
                  <p className="text-white text-sm">9848 773119</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer border-b border-gray-800 pb-4 xl:border-none xl:pb-0">
                <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center shrink-0 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-colors">
                  <Mail className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                  <p className="text-white text-sm truncate pr-4">mannandesigngroup@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group cursor-pointer border-b border-gray-800 pb-4 xl:border-none xl:pb-0">
                <div className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center shrink-0 group-hover:border-orange-500 group-hover:bg-orange-500/10 transition-colors">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Location</p>
                  <p className="text-white text-sm">G-2, Seetharama Residency, 45-58-18/2, Narasimha Nagar, Akkayyapalem, Visakhapatnam, Andhra Pradesh 530016</p>
                </div>
              </div>
            </div>

            <div className="hidden xl:block mt-8 pt-8 border-t border-gray-800">
              <p className="text-gray-400 font-serif italic">"Stronger Structures<br/>for a Better Tomorrow"</p>
            </div>
          </div>

          {/* Column 4: Location Map */}
          <div className="xl:col-span-4 flex flex-col h-[300px] xl:h-auto">
            <h4 className="text-white font-bold tracking-widest text-sm uppercase mb-6 flex items-center gap-3">
              Our Location
            </h4>
            <div className="w-full flex-1 bg-gray-800 rounded-lg overflow-hidden border border-gray-700 p-1 relative z-10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.0478872981143!2d83.2992972!3d17.7412323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3943aa798bcbab%3A0x80d79465363bf20c!2sMannan%20Design%20Group!5e1!3m2!1sen!2sin!4v1789413792523!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, borderRadius: '6px' }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="MDG Location Map"
              ></iframe>
            </div>
          </div>

        </div>

        {/* Mobile-only Decorative Text (appears above copyright on mobile) */}
        <div className="xl:hidden flex items-end gap-4 py-8 relative z-10 border-b border-gray-800">
          <div className="w-1 h-12 bg-orange-500"></div>
          <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase leading-relaxed block">
            People<br />Ideas<br />Structures<br />Better Tomorrows
          </span>
        </div>

        {/* Bottom Bar: Copyright & Tagline */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-wider relative z-10">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Mannan Design Group. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <div className="w-8 h-[2px] bg-orange-500"></div>
            <span className="text-gray-400 font-bold uppercase tracking-[0.2em]">Engineering A Stronger Tomorrow</span>
          </div>
        </div>

      </div>
    </footer>
  );
};