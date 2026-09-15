import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Edit2, Trash2, Plus, X, Star, FileText } from 'lucide-react';

export interface ProjectData {
  id?: string;
  projectName: string;
  category: string;
  location: string;
  year: string;
  shortDescription: string;
  detailedDescription: string;
  scopeOfWork: string;
  engineeringServices: string;
  imageUrl: string;
  isFeatured: boolean;
  displayOrder: number;
}

export const ProjectManager: React.FC = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const initialFormState: ProjectData = {
    projectName: '', category: 'Structural Design', location: '', year: new Date().getFullYear().toString(),
    shortDescription: '', detailedDescription: '', scopeOfWork: '', engineeringServices: '',
    imageUrl: '', isFeatured: false, displayOrder: 1
  };
  const [formData, setFormData] = useState<ProjectData>(initialFormState);

  const fetchProjects = async () => {
    const q = query(collection(db, 'projects'), orderBy('displayOrder'));
    const snapshot = await getDocs(q);
    setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ProjectData)));
    setLoading(false);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) await updateDoc(doc(db, 'projects', editingId), { ...formData });
      else await addDoc(collection(db, 'projects'), formData);
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("Error saving project. Check console.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      await deleteDoc(doc(db, 'projects', id));
      fetchProjects();
    }
  };

  const openForm = (project: ProjectData | null = null) => {
    if (project) {
      setEditingId(project.id || null);
      setFormData(project);
    } else {
      setEditingId(null);
      setFormData({ ...initialFormState, displayOrder: projects.length + 1 });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Project Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage, reorder, and showcase your engineering portfolio.</p>
        </div>
        <button 
          onClick={() => openForm()} 
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" /> New Project
        </button>
      </div>

      {/* Main Table */}
      {loading ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse"></div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 text-gray-500 text-xs uppercase tracking-wider border-b border-gray-100">
                  <th className="py-4 px-6 font-bold">Preview</th>
                  <th className="py-4 px-6 font-bold">Project Details</th>
                  <th className="py-4 px-6 font-bold">Category</th>
                  <th className="py-4 px-6 font-bold">Status</th>
                  <th className="py-4 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {projects.map((p) => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="w-20 h-14 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 relative shadow-sm group-hover:shadow transition-shadow">
                        <img src={p.imageUrl} alt={p.projectName} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/80')} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-900 text-base mb-0.5">{p.projectName}</p>
                      <p className="text-gray-500 text-xs flex items-center gap-1">
                        {p.year} • {p.location}
                      </p>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold border border-gray-200">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {p.isFeatured ? (
                        <span className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                          <Star className="w-3.5 h-3.5 fill-current" /> Featured
                        </span>
                      ) : (
                        <span className="text-gray-400 text-xs font-medium px-2">Standard</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openForm(p)} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Edit Project">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(p.id!)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Delete Project">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {projects.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <FileText className="w-12 h-12 mb-4 text-gray-300" />
                        <p className="text-lg font-medium text-gray-900 mb-1">No projects found</p>
                        <p className="text-sm">Click "New Project" to add your first portfolio item.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Premium Side-Drawer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white w-full max-w-2xl h-full shadow-2xl flex flex-col relative z-10 animate-slide-in-right">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 shrink-0">
              <div>
                <h3 className="font-bold text-gray-900 text-xl font-serif">{editingId ? 'Edit Project Details' : 'Create New Project'}</h3>
                <p className="text-xs text-gray-500 mt-1">Fill in the technical specifics of your structural work.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form id="project-form" onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Project Name *</label>
                <input required type="text" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" value={formData.projectName} onChange={e => setFormData({...formData, projectName: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Category *</label>
                  <select required className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all appearance-none" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="Structural Design">Structural Design</option>
                    <option value="Planning">Planning</option>
                    <option value="Assessment">Assessment</option>
                    <option value="Rehabilitation">Rehabilitation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Completion Year *</label>
                  <input required type="text" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Location *</label>
                <input required type="text" placeholder="e.g. Hyderabad, Telangana" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Detailed Description *</label>
                <textarea required rows={4} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none" value={formData.detailedDescription} onChange={e => setFormData({...formData, detailedDescription: e.target.value})} />
              </div>

              {/* REMOVED REQUIRED ATTRIBUTE FOR SCOPE OF WORK */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Scope of Work <span className="text-gray-400 font-medium normal-case">(Optional, comma separated)</span></label>
                <textarea rows={2} placeholder="e.g. Structural analysis, Foundation design..." className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none" value={formData.scopeOfWork} onChange={e => setFormData({...formData, scopeOfWork: e.target.value})} />
              </div>

              {/* REMOVED REQUIRED ATTRIBUTE FOR ENGINEERING SERVICES */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Engineering Services <span className="text-gray-400 font-medium normal-case">(Optional, comma separated)</span></label>
                <textarea rows={2} placeholder="e.g. Value Engineering, Technical Consultation..." className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none" value={formData.engineeringServices} onChange={e => setFormData({...formData, engineeringServices: e.target.value})} />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Main Image URL *</label>
                <input required type="url" placeholder="https://..." className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>

              <div className="flex gap-4 items-center bg-orange-50/50 p-5 rounded-xl border border-orange-100">
                <label className="flex items-center gap-4 cursor-pointer flex-1 group">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={formData.isFeatured} onChange={e => setFormData({...formData, isFeatured: e.target.checked})} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Highlight as Featured</span>
                    <span className="block text-xs text-gray-500">Show a featured star badge on the public website</span>
                  </div>
                </label>
                
                <div className="w-24">
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-gray-700">Display Order</label>
                  <input required type="number" min="1" className="w-full border border-gray-200 rounded-lg p-2 bg-white focus:border-orange-500 outline-none text-center font-bold" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value)})} />
                </div>
              </div>
            </form>

            <div className="p-6 border-t border-gray-100 flex gap-4 shrink-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button type="submit" form="project-form" className="flex-1 bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5">
                {editingId ? 'Save Changes' : 'Create Project'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};