import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, orderBy, query } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { Edit2, Trash2, Plus, X, Users } from 'lucide-react';

export const TeamManager: React.FC = () => {
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '', designation: '', imageUrl: '', bio: '', isCeo: false, displayOrder: 1
  });

  const fetchMembers = async () => {
    const q = query(collection(db, 'team'), orderBy('displayOrder'));
    const snapshot = await getDocs(q);
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMembers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoc(doc(db, 'team', editingId), formData);
      } else {
        await addDoc(collection(db, 'team'), formData);
      }
      setIsModalOpen(false);
      fetchMembers();
    } catch (error) {
      console.error("Error saving document: ", error);
      alert("Error saving. Check console.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to remove this team member?")) {
      await deleteDoc(doc(db, 'team', id));
      fetchMembers();
    }
  };

  const openForm = (member: any = null) => {
    if (member) {
      setEditingId(member.id);
      setFormData({ name: member.name, designation: member.designation, imageUrl: member.imageUrl, bio: member.bio, isCeo: member.isCeo, displayOrder: member.displayOrder });
    } else {
      setEditingId(null);
      setFormData({ name: '', designation: '', imageUrl: '', bio: '', isCeo: false, displayOrder: members.length + 1 });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="animate-fade-in-up">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-serif">Team Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage leadership roles, bios, and team hierarchy.</p>
        </div>
        <button 
          onClick={() => openForm()} 
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 font-bold shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" /> Add Member
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
                  <th className="py-4 px-6 font-bold w-20">Profile</th>
                  <th className="py-4 px-6 font-bold">Personnel Details</th>
                  <th className="py-4 px-6 font-bold">Hierarchy Level</th>
                  <th className="py-4 px-6 font-bold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {members.map((m) => (
                  <tr key={m.id} className="border-b border-gray-50 hover:bg-orange-50/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 border-white shadow-md group-hover:border-orange-200 transition-colors">
                        <img src={m.imageUrl || 'https://via.placeholder.com/50'} alt={m.name} className="w-full h-full object-cover object-top" onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/50')} />
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-bold text-gray-900 text-base mb-0.5">{m.name}</p>
                      <p className="text-gray-500 text-xs">{m.designation}</p>
                    </td>
                    <td className="py-4 px-6">
                      {m.isCeo ? (
                        <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span> Leadership
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 bg-gray-50 text-gray-600 px-3 py-1 rounded-full text-xs font-medium border border-gray-200">
                          Team Member
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openForm(m)} className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors" title="Edit Profile">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(m.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Remove Member">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {members.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Users className="w-12 h-12 mb-4 text-gray-300" />
                        <p className="text-lg font-medium text-gray-900 mb-1">Team is empty</p>
                        <p className="text-sm">Add leadership and engineering staff to display.</p>
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
          
          <div className="bg-white w-full max-w-xl h-full shadow-2xl flex flex-col relative z-10 animate-slide-in-right">
            
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/80 shrink-0">
              <div>
                <h3 className="font-bold text-gray-900 text-xl font-serif">{editingId ? 'Edit Profile' : 'Add Team Member'}</h3>
                <p className="text-xs text-gray-500 mt-1">Manage personnel details and hierarchy positioning.</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form id="team-form" onSubmit={handleSave} className="p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Full Name *</label>
                  <input required type="text" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Professional Title *</label>
                  <input required type="text" placeholder="e.g. Senior Engineer" className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" value={formData.designation} onChange={e => setFormData({...formData, designation: e.target.value})} />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Profile Image URL *</label>
                <input required type="url" placeholder="https://..." className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                  Biography summary <span className="text-gray-400 font-medium normal-case">(Optional)</span>
                </label>
                <textarea rows={4} className="w-full border border-gray-200 rounded-xl p-3 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 outline-none transition-all resize-none" placeholder="Brief professional background..." value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} />
              </div>
              
              <div className="flex gap-4 items-center bg-gray-50 p-5 rounded-xl border border-gray-100">
                <label className="flex items-center gap-4 cursor-pointer flex-1 group">
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" checked={formData.isCeo} onChange={e => setFormData({...formData, isCeo: e.target.checked})} />
                    <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-gray-900 group-hover:text-orange-600 transition-colors">Assign Leadership Role</span>
                    <span className="block text-[11px] text-gray-500">Feature this person prominently as CEO/Founder</span>
                  </div>
                </label>
                
                <div className="w-24 border-l border-gray-200 pl-4">
                  <label className="block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-gray-700">Display Order</label>
                  <input required type="number" min="1" className="w-full border border-gray-200 rounded-lg p-2 bg-white focus:border-orange-500 outline-none text-center font-bold" value={formData.displayOrder} onChange={e => setFormData({...formData, displayOrder: parseInt(e.target.value)})} />
                </div>
              </div>

            </form>

            <div className="p-6 border-t border-gray-100 flex gap-4 shrink-0 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
              <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-100 text-gray-700 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-colors">Cancel</button>
              <button type="submit" form="team-form" className="flex-1 bg-orange-500 text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 shadow-lg shadow-orange-500/20 transition-all hover:-translate-y-0.5">
                {editingId ? 'Save Profile' : 'Add to Team'}
              </button>
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};