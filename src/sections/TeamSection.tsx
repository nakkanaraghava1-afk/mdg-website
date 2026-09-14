import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { X, Mail } from 'lucide-react';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  imageUrl: string;
  isCeo?: boolean;
  displayOrder?: number;
}

const FALLBACK_DATA: TeamMember[] = [
  { id: 'ceo', name: 'Mohammed Mannan', designation: 'Founder & Managing Director', bio: 'With a commitment to safety, quality and innovation, we lead with purpose to create structures that stand strong for generations.', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop', isCeo: true },
  { id: '1', name: 'Arun Kumar', designation: 'Senior Structural Engineer', bio: 'Structural Analysis & Design', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', isCeo: false },
  { id: '2', name: 'Priya Sharma', designation: 'Project Engineer', bio: 'Structural Planning & Coordination', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop', isCeo: false },
  { id: '3', name: 'Rahul Nair', designation: 'Geotechnical Engineer', bio: 'Soil Investigation & Foundation Design', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', isCeo: false },
];

export const TeamSection: React.FC = () => {
  const [ceo, setCeo] = useState<TeamMember | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  
  // State to handle the modal
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'team'));
        let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
        data.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
        
        const foundCeo = data.find(member => member.isCeo) || FALLBACK_DATA[0];
        const foundTeam = data.filter(member => !member.isCeo);
        
        setCeo(foundCeo);
        setTeam(foundTeam.length > 0 ? foundTeam : FALLBACK_DATA.slice(1));
      } catch (error) {
        setCeo(FALLBACK_DATA[0]);
        setTeam(FALLBACK_DATA.slice(1));
      } finally {
        setLoading(false);
      }
    };
    fetchTeamData();
  }, []);

  return (
    <section className="relative w-full bg-[#FAFAFA] py-16 md:py-24 overflow-hidden border-t border-gray-100">
      
      {/* Abstract Background Wireframes */}
      <div className="absolute top-0 left-0 w-64 h-full opacity-[0.03] pointer-events-none hidden lg:block bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800')] bg-cover bg-left"></div>
      <div className="absolute top-0 right-0 w-64 h-full opacity-[0.03] pointer-events-none hidden lg:block bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800')] bg-cover bg-right"></div>

      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-orange-500"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Our People</span>
            <div className="hidden md:block w-8 h-[2px] bg-orange-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">LEADERSHIP & TEAM</h2>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base leading-relaxed px-4">
            A multidisciplinary team of structural engineers, planners and technical experts working together to deliver safer, stronger and smarter built environments.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20 text-gray-400 animate-pulse">Loading team...</div>
        ) : (
          <div className="max-w-6xl mx-auto">
            
            {/* FEATURED CEO CARD */}
            {ceo && (
              <div 
                onClick={() => setSelectedMember(ceo)}
                className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24 bg-white p-8 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] border border-gray-100 group transition-all duration-300 hover:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.12)] hover:-translate-y-2 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-orange-50/50 to-transparent"></div>
                <div className="relative mb-6 md:mb-8 inline-block z-10 mt-2">
                  <div className="w-36 h-36 md:w-48 md:h-48 rounded-full p-1 border border-gray-200 relative z-10 bg-white overflow-hidden group-hover:border-orange-300 transition-colors duration-500">
                    <img src={ceo.imageUrl} alt={ceo.name} className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-transparent border-t-orange-500 border-r-orange-500 -rotate-45 scale-110 transition-transform duration-700 ease-in-out group-hover:rotate-[135deg]"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{ceo.name}</h3>
                  <p className="text-orange-500 font-bold tracking-[0.15em] uppercase text-xs md:text-sm mb-6">{ceo.designation}</p>
                  <div className="w-12 h-[3px] bg-gray-200 mb-6 mx-auto group-hover:bg-orange-500 transition-colors duration-500"></div>
                  <p className="text-gray-600 text-sm md:text-lg leading-relaxed whitespace-pre-line max-w-2xl mx-auto px-2 line-clamp-3 md:line-clamp-none">
                    {ceo.bio}
                  </p>
                  <p className="text-xs font-bold text-orange-500 uppercase tracking-widest mt-6 opacity-0 group-hover:opacity-100 transition-opacity">Read Full Profile &rarr;</p>
                </div>
              </div>
            )}

            {/* TEAM GRID */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 lg:gap-8 px-2 md:px-0">
              {team.map((member) => (
                <div 
                  key={member.id} 
                  onClick={() => setSelectedMember(member)}
                  className="bg-white rounded-2xl shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-4 md:p-6 flex flex-col items-center text-center gap-3 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_12px_25px_-5px_rgba(0,0,0,0.1)] group cursor-pointer"
                >
                  <div className="w-20 h-20 md:w-28 md:h-28 rounded-full overflow-hidden shrink-0 bg-gray-100 relative mb-1 md:mb-2 border-2 border-gray-50 group-hover:border-orange-100 transition-colors duration-300">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  
                  <div className="flex flex-col items-center flex-1 w-full">
                    <h4 className="font-serif font-bold text-sm md:text-lg text-gray-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors line-clamp-1 w-full">{member.name}</h4>
                    <p className="text-[9px] md:text-xs text-orange-500 font-bold uppercase tracking-wider mb-2 md:mb-3 line-clamp-2">{member.designation}</p>
                    <div className="h-[2px] w-8 bg-gray-200 mx-auto mb-2 md:mb-3 group-hover:bg-orange-400 transition-colors duration-300"></div>
                    <p className="text-[10px] md:text-xs text-gray-500 leading-snug line-clamp-3 w-full px-1">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}
      </div>

      {/* --- TEAM MEMBER MODAL POPUP --- */}
      {selectedMember && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedMember(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-3xl w-full max-w-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row animate-[popIn_0.3s_ease-out]">
            
            <button 
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-4 z-20 p-2 bg-white/80 md:bg-gray-50 hover:bg-gray-200 text-gray-600 rounded-full transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Image Side (Top on mobile) */}
            <div className="w-full md:w-2/5 h-64 md:h-auto bg-gray-100 relative shrink-0">
              <img 
                src={selectedMember.imageUrl} 
                alt={selectedMember.name} 
                className="w-full h-full object-cover object-top" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent md:hidden"></div>
            </div>

            {/* Right Text Side (Bottom on mobile) */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col relative z-10 -mt-6 md:mt-0 bg-white rounded-t-3xl md:rounded-none">
              
              {selectedMember.isCeo && (
                <div className="mb-4 inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-md text-[10px] uppercase font-bold tracking-widest border border-orange-200">
                  Leadership
                </div>
              )}

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 mb-1">{selectedMember.name}</h3>
              <p className="text-orange-500 font-bold uppercase tracking-wider text-xs md:text-sm mb-5">{selectedMember.designation}</p>
              
              <div className="w-12 h-[2px] bg-gray-200 mb-6"></div>
              
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                <p className="text-gray-600 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {selectedMember.bio || "Detailed biography currently unavailable."}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <a 
                  href="mailto:mannandesigngroup@gmail.com" 
                  className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <Mail className="w-4 h-4" /> Contact Team
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Reusing the popIn animation for Team Section as well */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.95) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}} />
    </section>
  );
};