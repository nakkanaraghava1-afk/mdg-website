import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      // Apply Remember Me preference before signing in
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin/team');
    } catch (err: any) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 font-sans">
      {/* Left Side Branding (Hidden on Mobile) */}
      <div className="hidden md:flex md:w-1/2 bg-gray-900 relative items-center justify-center overflow-hidden p-12">
        <div className={`relative z-10 max-w-md transition-all duration-1000 delay-300 ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-4xl lg:text-5xl font-serif text-white font-bold leading-tight mb-6 drop-shadow-lg">
            Engineering<br />A Safer<br />Tomorrow
          </h1>
          <p className="text-gray-400 text-lg font-light">
            Reliable structural solutions for a stronger and sustainable future.
          </p>
        </div>
        {/* Abstract structural graphic with slow scale animation */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070')] bg-cover bg-center transition-transform duration-[20s] hover:scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900/50"></div>
      </div>

      {/* Right Side Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white relative">
        <div className={`w-full max-w-md transition-all duration-700 ease-out ${isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          <div className="text-center mb-10">
            <div className="inline-block p-3 bg-gray-50 rounded-2xl mb-6 shadow-sm border border-gray-100">
              <img src="/logo.png" alt="MDG Logo" className="h-12 mx-auto object-contain" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-gray-900">Admin Portal</h2>
            <p className="text-gray-500 mt-2 text-sm">Sign in to manage your website content.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-3 text-sm animate-pulse">
              <AlertCircle className="w-5 h-5 shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wider">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                  placeholder="admin@mannandesign.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input 
                    type="checkbox" 
                    className="peer appearance-none w-5 h-5 border-2 border-gray-300 rounded md:rounded-md checked:bg-orange-500 checked:border-orange-500 transition-all cursor-pointer"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-sm text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors">Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-orange-500/30 flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Secure Login →'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};