import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';

const FALLBACK_CEO = {
  name: 'Mohammed Mannan',
  designation: 'Founder & Managing Director',
  bio: 'With a commitment to safety, quality and innovation, we lead with purpose to create structures that stand strong for generations.',
  imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop'
};

export const CeoProfile: React.FC = () => {
  const [ceo, setCeo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCeo = async () => {
      try {
        const q = query(
          collection(db, 'team'),
          where('isCeo', '==', true),
          limit(1)
        );
        const snapshot = await getDocs(q);
        
        if (!snapshot.empty) {
          setCeo({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
        } else {
          setCeo(FALLBACK_CEO);
        }
      } catch (error) {
        console.error("Error fetching CEO data:", error);
        setCeo(FALLBACK_CEO);
      } finally {
        setLoading(false);
      }
    };

    fetchCeo();
  }, []);

  if (loading) {
    return <div className="py-24 text-center text-gray-400">Loading Leadership...</div>;
  }

  return (
    // REDUCED BOTTOM PADDING HERE (pb-8 md:pb-10)
    <section className="bg-white pt-16 md:pt-24 pb-8 md:pb-10 w-full flex flex-col items-center text-center px-6">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-8 h-[2px] bg-orange-500"></div>
        <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-800">
          Our Leadership
        </span>
      </div>

      <div className="relative mb-8 inline-block">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1 border border-gray-200 relative z-10 bg-white">
          <img
            src={ceo?.imageUrl}
            alt={ceo?.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full rounded-full border-[3px] border-transparent border-l-orange-500 -rotate-12 scale-105"></div>
      </div>

      <h3 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
        {ceo?.name}
      </h3>
      <p className="text-gray-600 text-lg mb-6">{ceo?.designation}</p>
      
      <div className="w-12 h-[3px] bg-orange-500 mb-6 mx-auto"></div>

      <p className="max-w-2xl text-gray-600 text-base md:text-lg leading-relaxed whitespace-pre-line">
        {ceo?.bio}
      </p>
    </section>
  );
};