import { useState } from 'react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import QuickContactWidget from '../components/QuickContactWidget';
import {
  ShieldCheck,
  Wifi,
  Printer,
  Camera,
  Laptop,
  Phone,
  MessageCircle,
  CheckCircle2,
  ArrowRight,
  Send,
  Headphones,
  Sparkles,
  CheckCircle,
  FileText,
  Wrench,
  MapPin,
  Mail
} from 'lucide-react';

const SERVICES = [
  {
    id: 'office-automation',
    title: 'Office Automation Solutions',
    category: 'Printing & Document Systems',
    icon: Printer,
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    tagColor: 'bg-emerald-100 text-emerald-800',
    badge: 'Core Service',
    desc: 'End-to-end office automation covering high-performance multifunction printers, photocopiers, scanners, and digital document workflows.',
    features: [
      'Multifunction Printers (MFPs) & Laser Printers',
      'High-Speed Inkjet Printers & Photocopiers',
      'High-Volume Document Scanners',
      'Document Management & Workflow Solutions',
      'Genuine Spare Parts & Cartridge Supply'
    ]
  },
  {
    id: 'cctv-security',
    title: 'CCTV & Security Solutions',
    category: 'Smart Security & Surveillance',
    icon: Camera,
    color: 'from-amber-500 to-red-600',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    tagColor: 'bg-amber-100 text-amber-800',
    badge: 'High Security',
    desc: 'State-of-the-art surveillance and biometric access systems designed for corporate offices, financial institutions, and retail facilities.',
    features: [
      'IP Surveillance Systems & AI-Based CCTV',
      'Network Video Recorders (NVR) & DVR Setup',
      'Biometric Access Control Systems',
      'Time Attendance Systems Integration',
      '24/7 Remote Mobile & Desktop Live Monitoring'
    ]
  },
  {
    id: 'it-infrastructure',
    title: 'IT Infrastructure Solutions',
    category: 'Enterprise Networking',
    icon: Wifi,
    color: 'from-indigo-600 to-purple-600',
    lightBg: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    tagColor: 'bg-indigo-100 text-indigo-800',
    badge: 'Enterprise Grade',
    desc: 'Complete network architecture design, Cat6 structured cabling, router & switch setup, and ongoing IT support.',
    features: [
      'Structured Network Cabling (Cat6 / Fiber)',
      'LAN & WAN System Architecture & Deployment',
      'Network Installation & Switch Configuration',
      'Server Rack Cabinets & Firewall Setup',
      'Ongoing Technical IT Infrastructure Support'
    ]
  },
  {
    id: 'computer-equipment',
    title: 'Computer & Office Equipment',
    category: 'Hardware & Accessories',
    icon: Laptop,
    color: 'from-blue-600 to-cyan-500',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-200',
    tagColor: 'bg-blue-100 text-blue-800',
    badge: 'Official Warranty',
    desc: 'Supply and installation of corporate desktop PCs, ultrabook laptops, high-resolution monitors, UPS backup systems, and projectors.',
    features: [
      'Corporate Desktop Computers & Workstations',
      'Business Laptops & Ultrabooks',
      'Full HD & 4K Professional Monitors',
      'Uninterruptible Power Supply (UPS) Systems',
      'HD Office Projectors & Accessories'
    ]
  },
  {
    id: 'technical-support',
    title: 'Technical Support & Maintenance Services',
    category: 'AMC & Servicing',
    icon: Wrench,
    color: 'from-slate-800 to-slate-900',
    lightBg: 'bg-slate-50',
    borderColor: 'border-slate-200',
    tagColor: 'bg-slate-200 text-slate-800',
    badge: '24/7 SLA',
    desc: 'Preventive maintenance, rapid breakdown repairs, warranty support, and dedicated Annual Maintenance Contracts (AMC).',
    features: [
      'Scheduled Preventive Maintenance Services',
      'Emergency Breakdown Repair Services',
      'Genuine Spare Parts & Component Supply',
      'Official Manufacturer Warranty Support',
      'On-Site & Remote Technical Assistance'
    ]
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Requirement Consultation',
    desc: 'We analyze your business layout, workflow requirements, and technology needs.'
  },
  {
    step: '02',
    title: 'System Design & Quote',
    desc: 'Receive an itemized technical proposal and transparent quotation tailored to your budget.'
  },
  {
    step: '03',
    title: 'Supply & Installation',
    desc: 'Our experienced professionals deliver and install genuine equipment on-site.'
  },
  {
    step: '04',
    title: 'After-Sales & Maintenance',
    desc: 'Continuous support, warranty coverage, preventive maintenance, and remote assistance.'
  }
];

export default function ServicesPage() {
  const [selectedService, setSelectedService] = useState(SERVICES[0].title);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: SERVICES[0].title,
    message: ''
  });

  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    const requestPayload = {
      id: Date.now(),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      company: formData.company,
      service: formData.service || selectedService,
      message: formData.message,
      status: 'New',
      date: new Date().toISOString().split('T')[0]
    };

    setFormSubmitted(true);

    try {
      await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
      });
    } catch (err) {
      console.warn("Failed to sync service request to backend API:", err);
    }
  };

  const whatsappMessage = `Hello SL Office Solutions, I would like to request a quotation for: ${formData.service || selectedService}. My name is ${formData.name || 'Customer'}.`;
  const whatsappUrl = `https://wa.me/94707779933?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <SEOHead
        title="Our Services | SL Office Solutions Sri Lanka"
        description="Office Automation, CCTV Security, IT Infrastructure, Computer & Office Equipment supply, and Technical Support & Maintenance Services in Sri Lanka."
      />

      <Navbar />

      {/* HERO BANNER SECTION */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
              <Sparkles size={14} /> SL Office Solutions Services
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Technology & Business Support Services
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Providing office automation, IT infrastructure, CCTV security solutions, computers, and end-to-end technical support services across Sri Lanka.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#request-quote"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-blue-600/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <FileText size={18} /> Request Free Quotation
              </a>
              <a
                href="https://wa.me/94707779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/20 hover:scale-105 transition-all flex items-center gap-2 border border-emerald-400/30"
              >
                <MessageCircle size={18} /> WhatsApp Technical Support
              </a>
            </div>

            {/* Feature highlights bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80 text-slate-300 text-xs">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> End-to-End Solutions
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={16} className="text-blue-400 shrink-0" /> On-Site Installation
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" /> Experienced Team
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" /> 1-Year Warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="py-16 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Our Services
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Core Technology Solutions
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Empowering government institutions, banks, corporate enterprises, and SMEs across Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((srv) => {
            const Icon = srv.icon;
            return (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-14 h-14 bg-gradient-to-br ${srv.color} rounded-2xl flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                      <Icon size={26} />
                    </div>
                    <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full ${srv.tagColor}`}>
                      {srv.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      {srv.category}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {srv.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {srv.desc}
                  </p>

                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {srv.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700">
                        <CheckCircle size={14} className="text-blue-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="#request-quote"
                    onClick={() => {
                      setSelectedService(srv.title);
                      setFormData(prev => ({ ...prev, service: srv.title }));
                    }}
                    className="text-xs font-extrabold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 group-hover:gap-2 transition-all"
                  >
                    Request Quote <ArrowRight size={14} />
                  </a>

                  <a
                    href="tel:0707779933"
                    className="p-2.5 bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 rounded-xl transition-colors"
                    title="Call Support"
                  >
                    <Phone size={16} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS PROCESS TIMELINE */}
      <section className="bg-slate-900 text-white py-16 sm:py-24 border-y border-slate-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
              Our Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              4-Step Service Implementation
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How we deliver end-to-end technology solutions covering consultation, supply, and support.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step) => (
              <div
                key={step.step}
                className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-4 backdrop-blur-xs relative overflow-hidden"
              >
                <div className="text-4xl font-black text-blue-500/30 absolute right-6 top-6">
                  {step.step}
                </div>
                <div className="w-10 h-10 bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl flex items-center justify-center font-extrabold text-sm">
                  {step.step}
                </div>
                <h3 className="text-lg font-extrabold text-white">{step.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT CONTACT NUMBERS & CONSULTATION SECTION */}
      <section id="request-quote" className="py-16 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-blue-950 text-white p-8 sm:p-12 space-y-8">
            <div className="max-w-3xl space-y-4">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/20">
                Direct Contact & Consultation
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Contact SL Office Solutions Directly
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Call our hotlines or message us directly on WhatsApp for immediate technical support, on-site service booking, or itemized quotation requests.
              </p>
            </div>

            {/* Grid of Direct Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              
              {/* Hotline 1 */}
              <a
                href="tel:0707779933"
                className="bg-white/10 hover:bg-white/20 p-5 rounded-2xl border border-white/10 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-blue-300 block uppercase font-bold">General Hotline</span>
                  <span className="text-base font-black text-white">070 777 99 33</span>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold group-hover:text-white transition-colors">Tap to call hotline →</span>
              </a>

              {/* Hotline 2 */}
              <a
                href="tel:0716778833"
                className="bg-white/10 hover:bg-white/20 p-5 rounded-2xl border border-white/10 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300 block uppercase font-bold">Retail Operation</span>
                  <span className="text-base font-black text-white">071 677 88 33</span>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold group-hover:text-white transition-colors">Tap to call retail desk →</span>
              </a>

              {/* Sajith Jayawardena Direct */}
              <a
                href="tel:0784177404"
                className="bg-white/10 hover:bg-white/20 p-5 rounded-2xl border border-white/10 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-purple-300 block uppercase font-bold">Sajith Jayawardena</span>
                  <span className="text-base font-black text-white">078 417 7404</span>
                </div>
                <span className="text-[11px] text-slate-400 font-semibold group-hover:text-white transition-colors">Tap for direct mobile →</span>
              </a>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/94707779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366]/20 hover:bg-[#25D366]/30 p-5 rounded-2xl border border-[#25D366]/30 transition-all flex flex-col justify-between space-y-3 group"
              >
                <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300 block uppercase font-bold">WhatsApp Instant</span>
                  <span className="text-base font-black text-white">070 777 99 33</span>
                </div>
                <span className="text-[11px] text-emerald-300 font-semibold group-hover:text-white transition-colors">Open WhatsApp chat →</span>
              </a>

            </div>

            {/* Address & Email Bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs text-slate-300 gap-4">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-400 shrink-0" />
                <span><strong className="text-white">Head Office:</strong> No: 608/11 Makola North, Makola.</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-amber-400 shrink-0" />
                <span><strong className="text-white">Email:</strong> <a href="mailto:slofficesolutions@gmail.com" className="text-blue-300 hover:underline">slofficesolutions@gmail.com</a></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickContactWidget />
    </div>
  );
}
