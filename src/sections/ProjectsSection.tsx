import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MapPin, Building, ArrowRight, Star } from 'lucide-react';
import type { ProjectData } from '../pages/admin/ProjectManager';
import { ProjectModal } from '../components/ProjectModal';

const FILTERS = ['All', 'Structural Design', 'Planning', 'Assessment', 'Rehabilitation'];

// Dummy data fallback
const FALLBACK_PROJECTS: ProjectData[] = [
  {
    id: '1', projectName: 'Riverside Business Park', category: 'Structural Design', location: 'Hyderabad, Telangana',
    year: '2023', shortDescription: '', isFeatured: true, displayOrder: 1,
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop',
    detailedDescription: 'Riverside Business Park is a modern commercial development designed to provide flexible workspaces with a strong focus on safety, sustainability and long-term performance.',
    scopeOfWork: 'Structural analysis and design, Foundation design, Seismic load assessment, Construction support',
    engineeringServices: 'Structural Design, Value Engineering, Construction Drawings, Technical Consultation'
  },
  {
    id: '2', projectName: 'Lakeview Residences', category: 'Planning', location: 'Bengaluru, Karnataka',
    year: '2022', shortDescription: '', isFeatured: false, displayOrder: 2,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop',
    detailedDescription: 'A premium residential complex focusing on sustainable materials and advanced load-bearing methodologies.',
    scopeOfWork: 'Site Planning, Load distribution, Material testing',
    engineeringServices: 'Planning, Structural Assessment, Consultation'
  },
  {
    id: '3', projectName: 'Eastport Logistics Hub', category: 'Structural Design', location: 'Chennai, Tamil Nadu',
    year: '2024', shortDescription: '', isFeatured: false, displayOrder: 3,
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop',
    detailedDescription: 'Large-scale industrial warehouse requiring expansive clear-span roofing systems.',
    scopeOfWork: 'Roof truss design, Heavy equipment foundation, Dynamic load testing',
    engineeringServices: 'Structural Design, NDT Testing'
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
        const q = query(collection(db, 'projects'), orderBy('displayOrder'));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectData));
        setProjects(data.length > 0 ? data : FALLBACK_PROJECTS);
      } catch (error) {
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
    <section className="bg-gray-50 py-16 md:py-24 w-full">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-[2px] bg-orange-500"></div>
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-gray-500">Our Work</span>
            <div className="hidden md:block w-8 h-[2px] bg-orange-500"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">OUR PROJECTS</h2>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base mb-8">
            A selection of our completed structural engineering, planning and assessment projects that create safer, stronger and more sustainable built environments.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-4 border-b border-gray-200 pb-2">
            {FILTERS.map(filter => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 text-sm font-semibold transition-colors relative ${
                  activeFilter === filter ? 'text-white bg-orange-500 rounded-lg shadow-sm' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">Loading projects...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                onClick={() => setSelectedProject(project)}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div className="w-full h-56 md:h-64 relative overflow-hidden bg-gray-200">
                  <img src={project.imageUrl} alt={project.projectName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  {project.isFeatured && (
                    <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 z-10">
                      <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" /> Featured
                    </div>
                  )}
                  {/* Subtle overlay gradient on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors">{project.projectName}</h3>
                  
                  <div className="mt-auto space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Building className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="truncate">{project.category}</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-sm font-semibold">
                    <span className="text-gray-900 group-hover:text-orange-500 transition-colors">View Project</span>
                    <ArrowRight className="w-4 h-4 text-orange-500 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Conditionally Render Modal */}
      {selectedProject && (
        <ProjectModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}
    </section>
  );
};