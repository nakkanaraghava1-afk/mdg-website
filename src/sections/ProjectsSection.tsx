import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MapPin, Building, ArrowRight, Star } from 'lucide-react';
import type { ProjectData } from '../pages/admin/ProjectManager';
import { ProjectModal } from '../components/ProjectModal';

const FILTERS = ['All', 'Structural Design', 'Planning', 'Assessment', 'Rehabilitation'];

const FALLBACK_PROJECTS: ProjectData[] = [
  {
    id: '1', projectName: 'Riverside Business Park', category: 'Structural Design', location: 'Hyderabad, Telangana',
    year: '2023', shortDescription: '', isFeatured: true, displayOrder: 1,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    detailedDescription: 'Riverside Business Park is a modern commercial development...',
    scopeOfWork: 'Structural analysis, Foundation design',
    engineeringServices: 'Structural Design, Value Engineering'
  }
];

export const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'projects'));
        let data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectData));
        data.sort((a, b) => (a.displayOrder || 99) - (b.displayOrder || 99));
        setProjects(data.length > 0 ? data : FALLBACK_PROJECTS);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setProjects(FALLBACK_PROJECTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section className="bg-gray-50 py-16 md:py-24 w-full border-t border-gray-200">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">Our Work</span>
            <div className="hidden md:block w-8 h-[2px] bg-gradient-to-l from-orange-400 to-orange-600 rounded-full"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">FEATURED PROJECTS</h2>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base mb-10 leading-relaxed px-4">
            A selection of our completed structural engineering, planning and assessment projects that create safer, stronger and more sustainable built environments.
          </p>

          {/* Premium Animated Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 bg-white p-2 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all duration-300 relative overflow-hidden ${
                  activeFilter === filter 
                    ? 'text-white shadow-md shadow-orange-500/20' 
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {activeFilter === filter && (
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl"></div>
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid - Upgraded to 2 columns on mobile, 3 on tablet, 4 on desktop */}
        {loading ? (
          <div className="text-center py-20 text-gray-400 flex flex-col items-center gap-4 animate-pulse">
            <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
            <p className="font-medium tracking-widest uppercase text-sm">Loading Database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-12">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-2xl shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-[0_15px_35px_-10px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 transition-all duration-500 flex flex-col relative"
              >
                {/* Image Container - Height reduced for smaller cards */}
                <div className="w-full h-36 md:h-48 relative overflow-hidden bg-gray-100">
                  <img src={project.imageUrl} alt={project.projectName} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  
                  {project.isFeatured && (
                    <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-gray-900/90 backdrop-blur-sm text-white px-2 py-1 md:px-3 md:py-1.5 rounded-full text-[8px] md:text-[10px] uppercase tracking-wider font-bold flex items-center gap-1 z-10 shadow-lg border border-gray-700/50">
                      <Star className="w-2.5 h-2.5 md:w-3 md:h-3 fill-orange-500 text-orange-500 animate-pulse" /> <span className="hidden sm:inline">Featured</span>
                    </div>
                  )}
                  
                  {/* Subtle dark gradient rises on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent opacity-30 group-hover:opacity-70 transition-opacity duration-500"></div>
                  
                  {/* Floating Action Button inside image */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 md:w-10 md:h-10 bg-orange-500 text-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg shadow-orange-500/40">
                    <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                  </div>
                </div>

                {/* Content - Paddings and text sizes reduced for mobile 2-col layout */}
                <div className="p-3 md:p-5 flex-1 flex flex-col relative z-10 bg-white">
                  <h3 className="text-sm md:text-lg font-serif font-bold text-gray-900 mb-3 md:mb-4 group-hover:text-orange-600 transition-colors duration-300 line-clamp-2 leading-snug">{project.projectName}</h3>
                  
                  <div className="mt-auto space-y-1.5 md:space-y-2 mb-2">
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50/50 p-1.5 md:p-2 rounded-md md:rounded-lg border border-gray-100">
                      <MapPin className="w-3 h-3 md:w-4 md:h-4 text-orange-500 shrink-0" />
                      <span className="truncate font-medium text-[10px] md:text-sm">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 bg-gray-50/50 p-1.5 md:p-2 rounded-md md:rounded-lg border border-gray-100">
                      <Building className="w-3 h-3 md:w-4 md:h-4 text-orange-500 shrink-0" />
                      <span className="truncate font-medium text-[10px] md:text-sm">{project.category} <span className="text-gray-300 mx-0.5 md:mx-1">|</span> {project.year}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {filteredProjects.length === 0 && (
               <div className="col-span-full text-center py-20 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-200">
                 No projects match the selected category.
               </div>
            )}
          </div>
        )}

      </div>

      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};