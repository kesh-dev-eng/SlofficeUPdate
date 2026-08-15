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
  FileText
} from 'lucide-react';

const SERVICES = [
  {
    id: 'cctv-security',
    title: 'CCTV & Security Solutions Installation',
    category: 'Security Systems',
    icon: Camera,
    color: 'from-amber-500 to-red-600',
    lightBg: 'bg-amber-50',
    borderColor: 'border-amber-200',
    tagColor: 'bg-amber-100 text-amber-800',
    badge: 'Popular',
    desc: 'Complete turn-key security installations including 4K IP cameras, XVR/DVR setup, motion sensors, access control, and mobile remote monitoring.',
    features: [
      '4K UHD IP & HDCVI Cameras Installation',
      'Remote Mobile & Desktop Live Stream Setup',
      'Surveillance Hard Disk & Cloud Backup',
      'Perimeter Alarm & Motion Detectors',
      'Access Control & Biometric Time Attendance'
    ]
  },
  {
    id: 'laptop-pc-repair',
    title: 'Laptop & Desktop Hardware Repairs',
    category: 'Computer Repairs',
    icon: Laptop,
    color: 'from-blue-600 to-cyan-500',
    lightBg: 'bg-blue-50',
    borderColor: 'border-blue-200',
    tagColor: 'bg-blue-100 text-blue-800',
    badge: 'Express Service',
    desc: 'Expert chip-level hardware repairs, screen replacements, SSD/RAM speed upgrades, logic board diagnostics, and liquid damage recovery.',
    features: [
      'High-Speed NVMe SSD & RAM Performance Upgrades',
      'Screen, Keyboard & Battery Replacement',
      'Motherboard & Power IC Chip Repair',
      'Thermal Paste Cleaning & Fan Servicing',
      'OS Installation, Virus & Malware Removal'
    ]
  },
  {
    id: 'printer-automation',
    title: 'Office Printer & Automation Maintenance',
    category: 'Office Tech',
    icon: Printer,
    color: 'from-emerald-500 to-teal-600',
    lightBg: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    tagColor: 'bg-emerald-100 text-emerald-800',
    badge: 'Certified Support',
    desc: 'On-site maintenance and repairs for multi-function laser printers, heavy-duty network copiers, toner refills, and drum replacements.',
    features: [
      'Multi-Function Network Printer Configuration',
      'LaserJet & InkJet Hardware Servicing',
      'High-Yield Genuine Toner Cartridge Refills',
      'Fuser Unit, Roller & Paper Jam Repairs',
      'Scheduled Preventive Cleaning Contracts'
    ]
  },
  {
    id: 'networking-wifi',
    title: 'Enterprise Wi-Fi & Structured Cabling',
    category: 'Networking',
    icon: Wifi,
    color: 'from-indigo-600 to-purple-600',
    lightBg: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    tagColor: 'bg-indigo-100 text-indigo-800',
    badge: 'High Performance',
    desc: 'Seamless dual-band Wi-Fi 6 mesh setup, structured Cat6 Ethernet cabling, server rack organization, and secure firewall configuration.',
    features: [
      'High-Speed Wi-Fi 6 Access Points Installation',
      'Structured Cat6 Ethernet Network Cabling',
      'Managed Switch & Gigabit Router Setup',
      'Server Rack Cabinet Clean-Up & Patching',
      'Hardware Firewall & Secure Guest Wi-Fi'
    ]
  },
  {
    id: 'audio-visual',
    title: 'Conference Room Audio & Visual Systems',
    category: 'AV Solutions',
    icon: Headphones,
    color: 'from-purple-600 to-pink-600',
    lightBg: 'bg-purple-50',
    borderColor: 'border-purple-200',
    tagColor: 'bg-purple-100 text-purple-800',
    badge: 'Smart Office',
    desc: 'Transform boardrooms with 4K interactive touch displays, wireless screen sharing, Bluetooth conference speakerphones, and projectors.',
    features: [
      'Smart Interactive Touch Panel Installation',
      'Bluetooth & USB Conference Speakerphones',
      'Ultra Short-Throw Office Projectors & Screens',
      'Wireless Presentation & Screen Mirroring',
      'Acoustic Mic & Sound System Tuning'
    ]
  },
  {
    id: 'corporate-amc',
    title: 'Annual Maintenance Contracts (AMC)',
    category: 'Enterprise SLA',
    icon: ShieldCheck,
    color: 'from-slate-800 to-slate-900',
    lightBg: 'bg-slate-50',
    borderColor: 'border-slate-200',
    tagColor: 'bg-slate-200 text-slate-800',
    badge: 'Corporate',
    desc: 'Comprehensive annual IT maintenance for corporate offices with guaranteed emergency response times, regular visits, and standby equipment.',
    features: [
      'Guaranteed 2-Hour Emergency On-Site Response',
      'Monthly Scheduled Preventive Maintenance Visits',
      'Standby Hardware & Replacement Units',
      'Dedicated IT Asset Management & Tracking',
      'Priority Phone & Remote Support Helpline'
    ]
  }
];

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Free Site Assessment',
    desc: 'Our certified technicians visit your premises to evaluate layout, electrical wiring, and system requirements.'
  },
  {
    step: '02',
    title: 'Custom Proposal',
    desc: 'Receive an itemized technical proposal and transparent quotation tailored to your exact budget.'
  },
  {
    step: '03',
    title: 'Expert Installation',
    desc: 'Our engineers carry out clean, professional installation with minimal disruption to your daily operations.'
  },
  {
    step: '04',
    title: 'Testing & Warranty',
    desc: 'Comprehensive system testing, end-user operational training, and full warranty coverage.'
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
  const whatsappUrl = `https://wa.me/94719779933?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <SEOHead
        title="Our Services - SL Office Solutions"
        description="Professional CCTV installation, laptop repairs, printer servicing, enterprise networking, and IT annual maintenance contracts in Sri Lanka."
      />

      <Navbar />

      {/* HERO BANNER SECTION */}
      <section className="relative bg-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b border-slate-800">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
              <Sparkles size={14} /> Certified Technical Engineering Services
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Enterprise IT & Office Automation Services
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl font-normal">
              Empowering corporate offices, retail stores, and commercial spaces across Sri Lanka with certified CCTV security, hardware repairs, Wi-Fi networking, and Annual Maintenance Contracts.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#request-quote"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-2xl shadow-xl shadow-blue-600/30 hover:scale-105 transition-all flex items-center gap-2"
              >
                <FileText size={18} /> Request Free Quotation
              </a>
              <a
                href="https://wa.me/94719779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20services."
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
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> 20+ Years Experience
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={16} className="text-blue-400 shrink-0" /> On-Site Installation
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={16} className="text-purple-400 shrink-0" /> Certified Engineers
              </div>
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 size={16} className="text-amber-400 shrink-0" /> Official Warranty
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES GRID SECTION */}
      <section className="py-16 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 w-full space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            What We Do
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Comprehensive Solutions for Modern Offices
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Select a service below to learn more or request on-site installation and support.
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
                    href={`tel:+94716778833`}
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
              Simple 4-Step Technical Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              How we deliver reliable, high-performance office tech services with maximum transparency.
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

      {/* REQUEST QUOTE & INQUIRY FORM SECTION */}
      <section id="request-quote" className="py-16 sm:py-24 max-w-[1400px] mx-auto px-4 sm:px-6 w-full">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left info column (5/12) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white p-8 sm:p-12 space-y-8 flex flex-col justify-between relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-400 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/20">
                Direct Contact
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Request Service or On-Site Visit
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Fill out the form with your details or call our technical helpline directly. We provide rapid responses across Sri Lanka.
              </p>

              <div className="space-y-4 pt-4 text-xs font-semibold">
                <a
                  href="tel:+94716778833"
                  className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-4 rounded-2xl border border-white/10 transition-colors"
                >
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shrink-0">
                    <Phone size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Phone Hotline</span>
                    <span className="text-sm font-black text-white">+94 71 677 8833</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/94719779933"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-[#25D366]/20 hover:bg-[#25D366]/30 p-4 rounded-2xl border border-[#25D366]/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#25D366] rounded-xl flex items-center justify-center text-white shrink-0">
                    <MessageCircle size={18} />
                  </div>
                  <div>
                    <span className="text-[10px] text-emerald-300 block uppercase">WhatsApp Direct</span>
                    <span className="text-sm font-black text-white">+94 71 977 9933</span>
                  </div>
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 text-[11px] text-slate-400 space-y-1 relative z-10">
              <p className="font-bold text-white">SL Office Solutions Support Center</p>
              <p>Colombo & Islandwide On-Site Service Available</p>
            </div>
          </div>

          {/* Right Form Column (7/12) */}
          <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Service Request Form</h3>
              <p className="text-xs text-slate-500 mt-1">Get an exact quotation or schedule a technician visit</p>
            </div>

            {formSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4 animate-in fade-in duration-300">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <h4 className="text-lg font-extrabold text-emerald-900">Inquiry Received Successfully!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our engineering team has received your request for <strong>{formData.service}</strong> and will contact you shortly.
                </p>
                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="bg-white border border-slate-300 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Submit Another Request
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] text-white text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-[#20ba5a] transition-colors flex items-center gap-2"
                  >
                    <MessageCircle size={16} /> Instant WhatsApp Follow-up
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ruwan Perera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +94 77 123 4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. info@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. ABC Holdings (Optional)"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Select Required Service *</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium bg-white"
                  >
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message / Requirements</label>
                  <textarea
                    rows={4}
                    placeholder="Describe your location, number of cameras, printer model, or specific technical requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl transition-all cursor-pointer shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={18} /> Submit Quotation Request
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER & QUICK CONTACT */}
      <QuickContactWidget />
    </div>
  );
}
