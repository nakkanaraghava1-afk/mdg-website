import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';

export interface TeamMember {
  id: string;
  name: string;
  designation: string;
  bio: string;
  imageUrl: string;
  isCeo?: boolean;
  displayOrder?: number;
}

// Unified Fallback Data including CEO
const FALLBACK_DATA: TeamMember[] = [
  { id: 'ceo', name: 'Mohammed Mannan', designation: 'Founder & Managing Director', bio: 'With a commitment to safety, quality and innovation, we lead with purpose to create structures that stand strong for generations.', imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop', isCeo: true },
  { id: '1', name: 'Arun Kumar', designation: 'Senior Structural Engineer', bio: 'Structural Analysis & Design', imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop', isCeo: false },
  { id: '2', name: 'Priya Sharma', designation: 'Project Engineer', bio: 'Structural Planning & Coordination', imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop', isCeo: false },
  { id: '3', name: 'Rahul Nair', designation: 'Geotechnical Engineer', bio: 'Soil Investigation & Foundation Design', imageUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop', isCeo: false },
  { id: '4', name: 'Sneha Ramesh', designation: 'Design Engineer', bio: 'Structural Detailing & BIM', imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop', isCeo: false },
  { id: '5', name: 'Vikram Das', designation: 'Site Engineer', bio: 'Construction Supervision & Quality Control', imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop', isCeo: false },
  { id: '6', name: 'Kiran Patel', designation: 'NDT Specialist', bio: 'Non-Destructive Testing & Structural Assessment', imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop', isCeo: false },
];

export const TeamSection: React.FC = () => {
  const [ceo, setCeo] = useState<TeamMember | null>(null);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        // Fetch all members in one single database call
        const q = query(collection(db, 'team'), orderBy('displayOrder'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as TeamMember));
        
        // Separate CEO from the rest of the team in JavaScript
        const foundCeo = data.find(member => member.isCeo) || FALLBACK_DATA[0];
        const foundTeam = data.filter(member => !member.isCeo);
        
        setCeo(foundCeo);
        setTeam(foundTeam.length > 0 ? foundTeam : FALLBACK_DATA.slice(1));
      } catch (error) {
        console.error("Error fetching team data:", error);
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
          <div className="flex justify-center py-20 text-gray-400">Loading team...</div>
        ) : (
          <div className="max-w-6xl mx-auto">
            
            {/* FEATURED CEO CARD - CENTERED */}
            {ceo && (
              <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06)] border border-gray-100 group transition-all duration-300 hover:shadow-[0_12px_40px_-4px_rgba(0,0,0,0.12)] relative overflow-hidden">
                
                {/* Decorative background top glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-gradient-to-b from-orange-50/50 to-transparent"></div>

                {/* Profile Image with dynamic rotating ring */}
                <div className="relative mb-6 inline-block z-10 mt-2">
                  <div className="w-40 h-40 md:w-48 md:h-48 rounded-full p-1 border border-gray-200 relative z-10 bg-white overflow-hidden group-hover:border-orange-200 transition-colors duration-500">
                    <img
                      src={ceo.imageUrl}
                      alt={ceo.name}
                      className="w-full h-full object-cover rounded-full transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  {/* Subtle orange accent arc that rotates on hover */}
                  <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-transparent border-t-orange-500 border-r-orange-500 -rotate-45 scale-110 transition-transform duration-700 ease-in-out group-hover:rotate-[135deg]"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">{ceo.name}</h3>
                  <p className="text-orange-500 font-bold tracking-wider uppercase text-sm mb-6">{ceo.designation}</p>
                  
                  {/* Divider */}
                  <div className="w-12 h-[3px] bg-gray-200 mb-6 mx-auto group-hover:bg-orange-500 transition-colors duration-500"></div>
                  
                  <p className="text-gray-600 md:text-lg leading-relaxed whitespace-pre-line max-w-2xl mx-auto">
                    {ceo.bio}
                  </p>
                </div>
              </div>
            )}

            {/* TEAM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {team.map((member) => (
                <div key={member.id} className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 p-4 flex flex-col lg:flex-row gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group">
                  <div className="w-full lg:w-28 h-48 lg:h-32 rounded-xl overflow-hidden shrink-0 bg-gray-100 relative">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 border-2 border-orange-500/0 group-hover:border-orange-500/10 rounded-xl transition-colors"></div>
                  </div>
                  
                  <div className="flex flex-col justify-center flex-1 text-center lg:text-left">
                    <h4 className="font-serif font-bold text-lg text-gray-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors">{member.name}</h4>
                    <p className="text-xs md:text-sm text-gray-600 font-medium mb-3">{member.designation}</p>
                    <div className="h-[2px] w-12 bg-gray-200 mx-auto lg:mx-0 mb-3 group-hover:bg-orange-400 transition-colors duration-300"></div>
                    <p className="text-[11px] md:text-xs text-gray-500 leading-snug">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </section>
  );
};