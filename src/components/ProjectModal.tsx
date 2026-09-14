import React, { useEffect } from 'react';
import { X, MapPin, Calendar, Building, CheckCircle2 , Star} from 'lucide-react';
import type { ProjectData } from '../pages/admin/ProjectManager';

interface ProjectModalProps {
  project: ProjectData;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Helper to safely split comma-separated strings into lists
  const renderList = (text: string) => {
    if (!text) return null;
    const items = text.split(',').map(i => i.trim()).filter(i => i.length > 0);
    return (
      <ul className="space-y-3">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-3 text-gray-600 text-sm">
            <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" strokeWidth={2} />
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="relative bg-white w-full max-w-5xl max-h-[95vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in z-10">
        
        {/* Close Button - Floats over image on mobile, top right on desktop */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur md:bg-gray-100 text-gray-900 p-2 rounded-full hover:bg-orange-500 hover:text-white transition-colors shadow-sm">
          <X className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Left Side: Single Main Image */}
        <div className="w-full md:w-1/2 h-[300px] md:h-auto bg-gray-100 relative shrink-0">
          <img src={project.imageUrl} alt={project.projectName} className="w-full h-full object-cover" />
          {project.isFeatured && (
            <div className="absolute top-4 left-4 bg-gray-900/80 backdrop-blur text-white px-3 py-1.5 rounded text-xs font-semibold tracking-wide uppercase flex items-center gap-1.5">
              < Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" /> Featured
            </div>
          )}
        </div>

        {/* Right Side: Scrollable Content */}
        <div className="w-full md:w-1/2 overflow-y-auto bg-white p-6 md:p-10 flex flex-col">
          
          <div className="mb-2">
            <span className="text-xs font-bold tracking-widest uppercase text-orange-500">{project.category}</span>
          </div>
          
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {project.projectName}
          </h2>

          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 pb-6 border-b border-gray-100 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <MapPin className="w-4 h-4 text-orange-500" /> {project.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <Calendar className="w-4 h-4 text-orange-500" /> {project.year}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-medium">
              <Building className="w-4 h-4 text-orange-500" /> {project.category}
            </div>
          </div>

          {/* Overview */}
          <div className="mb-8">
            <h3 className="text-lg font-serif font-bold text-gray-900 mb-3">Project Overview</h3>
            <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
              {project.detailedDescription}
            </p>
          </div>

          {/* Two-Column Lists (Scope & Services) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-4">
            <div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Scope of Work</h3>
              {renderList(project.scopeOfWork)}
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-gray-900 mb-4">Engineering Services</h3>
              {renderList(project.engineeringServices)}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};