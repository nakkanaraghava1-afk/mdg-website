import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Users, ClipboardList, LogOut, Menu} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  // Initial load animation trigger
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/admin/login');
  };

  // Trimmed down nav items as requested
  const navItems = [
    { name: 'Team Management', path: '/admin/team', icon: Users },
    { name: 'Projects', path: '/admin/projects', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* Mobile Sidebar Overlay with smooth fade & blur animation */}
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-20 lg:hidden transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`} 
        onClick={() => setSidebarOpen(false)} 
      />

      {/* Sidebar Component (Fixed layout overlaps by using flex-col instead of absolute positioning) */}
      <aside 
        className={`fixed lg:static top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-gray-950 text-white z-30 transform transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] flex flex-col shadow-2xl lg:shadow-none ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-8 border-b border-gray-800/60 shrink-0">
          <div className="bg-white p-1.5 rounded-lg shadow-sm">
            <img src="/logo.png" alt="MDG Logo" className="h-8 object-contain" />
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="p-5 space-y-2 flex-1 overflow-y-auto">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 mt-2 px-3">
            Dashboard
          </div>
          
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                  isActive 
                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/25 translate-x-1' 
                    : 'text-gray-400 hover:bg-gray-800/80 hover:text-white hover:translate-x-1'
                }`
              }
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout Button Container (Pushed to bottom naturally via flex-1 on nav) */}
        <div className="p-5 border-t border-gray-800/60 mt-auto shrink-0 bg-gray-950/50">
          <button 
            onClick={handleLogout} 
            className="flex items-center justify-center gap-3 px-4 py-3.5 text-gray-400 hover:text-white hover:bg-red-500/10 hover:text-red-400 w-full rounded-xl transition-all duration-300 group"
          >
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Logout Securely</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* Premium Admin Header */}
        <header className="bg-white/80 backdrop-blur-xl h-20 border-b border-gray-200/60 flex items-center px-6 lg:px-10 justify-between shrink-0 z-10 sticky top-0">
          
          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors" 
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="hidden sm:block text-lg font-bold text-gray-800 font-serif">MDG Workspace</h2>
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 py-1.5 px-2 pr-4 rounded-full shadow-sm hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shadow-inner">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold text-gray-700 leading-none">Admin User</span>
              <span className="text-[10px] text-gray-400 font-medium">System Manager</span>
            </div>
          </div>
        </header>

        {/* Scrollable Page Content with Slide-Up Entrance Animation */}
        <div className="flex-1 overflow-auto bg-[#F8FAFC]">
          <div 
            className={`p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto transition-all duration-700 ease-out ${
              isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};