import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ArrowRight, 
  User, 
  MessageSquare, 
  CheckCircle2,
  Briefcase,
  Send
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    type: '',
    message: ''
  });

  // Trigger entrance animations on load
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const text = `*New Website Enquiry*\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Email:* ${formData.email}\n*Project Type:* ${formData.type}\n*Message:*\n${formData.message}`;
    const whatsappNumber = '917075773119'; 
    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    window.open(whatsappUrl, '_blank');

    setStatus('success');
    setFormData({ name: '', phone: '', email: '', type: '', message: '' });
    
    setTimeout(() => setStatus('idle'), 5000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative bg-[#F8FAFC] py-20 md:py-32 w-full overflow-hidden border-t border-gray-100 z-10">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/4 pointer-events-none z-0"></div>
      
      {/* Grid Pattern Watermark */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.015] mix-blend-overlay pointer-events-none z-0"></div>

      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Contact Information */}
          <div className={`lg:col-span-5 flex flex-col transition-all duration-1000 ease-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            
            <div className="flex items-center gap-4 mb-5">
              <div className="w-10 h-[2px] bg-gradient-to-r from-orange-400 to-orange-600 rounded-full"></div>
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-orange-500">
                Contact
              </span>
            </div>
            
            <h2 className="text-4xl md:text-[56px] font-serif font-bold text-gray-900 leading-[1.1] mb-6">
              Get In Touch
            </h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-12 max-w-md">
              Have a structural engineering requirement or project in mind? Connect with our technical team today.
            </p>

            <div className="space-y-5">
              {/* WhatsApp Card */}
              <a href="https://wa.me/917075773119" target="_blank" rel="noreferrer" className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(34,197,94,0.15)] hover:border-green-100 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center shrink-0 mr-5 group-hover:bg-green-500 transition-colors duration-300">
                  <svg className="w-7 h-7 text-green-500 group-hover:text-white transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">Direct Chat</p>
                  <p className="text-xl font-bold text-gray-900 leading-none mb-1.5">7075 773119</p>
                  <p className="text-sm text-gray-500">Available Mon-Sat, 9AM-6PM</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-green-500 group-hover:bg-green-50 transition-colors border border-gray-100 group-hover:border-green-200">
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Email Card */}
              <a href="mailto:mannandesigngroup@gmail.com" className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(249,115,22,0.15)] hover:border-orange-100 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center shrink-0 mr-5 group-hover:bg-orange-500 transition-colors duration-300">
                  <Mail className="w-6 h-6 text-orange-500 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">Email Us</p>
                  <p className="text-base sm:text-lg font-bold text-gray-900 leading-none mb-1.5 truncate">mannandesigngroup@gmail.com</p>
                  <p className="text-sm text-gray-500">Expect a reply within 24hrs</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-orange-500 group-hover:bg-orange-50 transition-colors border border-gray-100 group-hover:border-orange-200 shrink-0 ml-2">
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center p-6 bg-white border border-gray-100 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center shrink-0 mr-5 group-hover:bg-gray-900 transition-colors duration-300 border border-gray-100">
                  <MapPin className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors" />
                </div>
                <div className="flex-1">
                  <p className="text-[11px] font-bold tracking-widest text-gray-400 uppercase mb-1">Headquarters</p>
                  <p className="text-xl font-bold text-gray-900 leading-none mb-1.5">Business Location</p>
                  <p className="text-sm text-gray-500">G-2, Seetharama Residency, 45-58-18/2, Narasimha Nagar, Akkayyapalem, Visakhapatnam, Andhra Pradesh 530016</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Premium Contact Form */}
          <div className={`lg:col-span-7 transition-all duration-1000 delay-200 ease-out ${isMounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <div className="bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden">
              
              {/* Subtle top gradient line */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-400 via-orange-500 to-red-500"></div>

              <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Send an Enquiry</h3>
              <p className="text-gray-500 text-sm mb-10">Fill out the details below. We'll format it perfectly and open WhatsApp for you to hit send.</p>

              {status === 'success' ? (
                <div className="bg-green-50/50 border border-green-100 rounded-3xl p-12 flex flex-col items-center text-center animate-fade-in min-h-[450px] justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce">
                    <CheckCircle2 className="w-12 h-12 text-green-500" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-3 font-serif">Opening WhatsApp!</h4>
                  <p className="text-green-700 max-w-xs">Your message is ready. Please press send in your WhatsApp app to deliver it securely to our team.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Full Name *</label>
                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input 
                          required type="text" name="name" value={formData.name} onChange={handleInputChange}
                          placeholder="John Doe" 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm font-medium placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Phone Number *</label>
                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input 
                          required type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                          placeholder="+91 98765 43210" 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm font-medium placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Email Address</label>
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                        <input 
                          type="email" name="email" value={formData.email} onChange={handleInputChange}
                          placeholder="john@company.com" 
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm font-medium placeholder:font-normal"
                        />
                      </div>
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 ml-1">Project Type *</label>
                      <div className="relative group">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors z-10 pointer-events-none" />
                        <select 
                          required name="type" value={formData.type} onChange={handleInputChange}
                          className="w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm font-medium appearance-none cursor-pointer"
                        >
                          <option value="" disabled>Select project scope...</option>
                          <option value="Structural Design">Structural Design</option>
                          <option value="Site Planning">Site Planning</option>
                          <option value="Assessment/Testing">Assessment / NDT Testing</option>
                          <option value="Rehabilitation">Repairs & Rehabilitation</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <div className="flex justify-between items-end mb-2 ml-1">
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">Project Details *</label>
                      <span className="text-[10px] font-medium text-gray-400">{formData.message.length}/500</span>
                    </div>
                    <div className="relative group">
                      <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                      <textarea 
                        required name="message" value={formData.message} onChange={handleInputChange}
                        maxLength={500}
                        placeholder="Tell us about your requirements, scale of the project, or any specific challenges..." 
                        rows={4}
                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 outline-none transition-all text-sm font-medium placeholder:font-normal resize-none custom-scrollbar"
                      ></textarea>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="w-full bg-gray-900 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 flex justify-center items-center gap-3 mt-4 group overflow-hidden relative shadow-lg hover:shadow-orange-500/25 hover:-translate-y-1"
                  >
                    <span className="relative z-10 flex items-center gap-2 tracking-wide">
                      SEND ENQUIRY <Send className="w-4 h-4 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300" />
                    </span>
                  </button>
                  <p className="text-center text-xs text-gray-400 font-medium mt-4 flex items-center justify-center gap-1.5">
                     Your privacy is secure. Submitting opens a direct WhatsApp chat.
                  </p>
                </form>
              )}

            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};