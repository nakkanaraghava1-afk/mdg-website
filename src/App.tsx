
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Public Components
import { Header } from './sections/Header';
import { MottoSection } from './sections/MottoSection';
import { AboutSection } from './sections/AboutSection';
import { TeamSection } from './sections/TeamSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ServicesSection } from './sections/ServicesSection';
import { ContactSection } from './sections/ContactSection';
import { Footer } from './sections/Footer';
import { FloatingNav } from './components/FloatingNav';
import { SplashScreen } from './components/SplashScreen'; // <--- IMPORT THIS

// Admin Components
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { TeamManager } from './pages/admin/TeamManager';
import { ProjectManager } from './pages/admin/ProjectManager';
import { ProtectedRoute } from './components/ProtectedRoute';

// Complete Public Layout Flow
const PublicLayout = () => (
  <div className="min-h-screen relative pt-[80px] md:pt-[120px] bg-white">
    
    {/* --- GLOBAL SPLASH SCREEN --- */}
    <SplashScreen />
    
    <Header />
    <FloatingNav />
    
    <main>
      <div id="motto"><MottoSection /></div>
      <div id="about"><AboutSection /></div>
      <div id="team"><TeamSection /></div>
      <div id="projects"><ProjectsSection /></div>
      <div id="services"><ServicesSection /></div>
      <div id="contact"><ContactSection /></div>
    </main>
    
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Website */}
        <Route path="/" element={<PublicLayout />} />

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Secure Admin Dashboard */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/team" replace />} />
          <Route path="team" element={<TeamManager />} />
          <Route path="projects" element={<ProjectManager />} />
          
          <Route path="enquiries" element={<div className="p-8 font-bold">Enquiries Managed via WhatsApp</div>} />
          <Route path="settings" element={<div className="p-8 font-bold">Settings Coming Soon</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;