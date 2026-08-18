import { useState } from 'react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import QuickContactWidget from '../components/QuickContactWidget';
import {
  Camera,
  Wifi,
  Printer,
  Headphones,
  CheckCircle,
  Send,
  Sparkles,
  Building
} from 'lucide-react';

const INSTALLATION_OPTIONS = [
  {
    title: 'CCTV Camera System Installation',
    icon: Camera,
    desc: 'Full installation of 4K IP cameras, HDCVI surveillance, XVR/DVR setup, concealed cabling, and mobile live-view setup.'
  },
  {
    title: 'Enterprise Wi-Fi 6 & Ethernet Cabling',
    icon: Wifi,
    desc: 'Structured Cat6 network cabling, Wi-Fi 6 access point mounting, server rack cabinets, and high-speed router setup.'
  },
  {
    title: 'Multi-Function Office Printer Network Setup',
    icon: Printer,
    desc: 'Heavy-duty network printer setup, IP print server configuration, multi-user scanning, and wireless driver installation.'
  },
  {
    title: 'Conference Room AV & Smart Display Setup',
    icon: Headphones,
    desc: 'Interactive touch panel mounting, short-throw projector alignment, Bluetooth conference speakerphones, and acoustic setup.'
  }
];

export default function InstallationServicePage() {
  const [installSubmitted, setInstallSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    installType: 'CCTV Camera System Installation',
    location: '',
    notes: ''
  });

  const handleInstallSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setInstallSubmitted(true);

    try {
      await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Date.now(),
          name: formData.name,
          phone: formData.phone,
          company: `Location: ${formData.location}`,
          service: `On-Site Installation - ${formData.installType}`,
          message: formData.notes,
          status: 'New',
          date: new Date().toISOString().split('T')[0]
        })
      });
    } catch (_e) {}
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <SEOHead
        title="On-Site Installation Services | SL Office Solutions (PVT) LTD"
        description="Professional on-site installation for CCTV cameras, Wi-Fi 6 networking cabling, printers, and conference room AV systems in Sri Lanka."
      />

      <Navbar />

      {/* HERO BANNER */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
            <Sparkles size={14} /> Certified On-Site Engineering Team
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            On-Site Hardware Installation Services
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Professional turn-key installation for CCTV security, Wi-Fi networking, server racks, printers, and conference displays across Sri Lanka.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 space-y-12 w-full flex-1">
        {/* INSTALLATION OPTIONS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTALLATION_OPTIONS.map((opt, idx) => {
            const Icon = opt.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-extrabold">
                  <Icon size={24} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{opt.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{opt.desc}</p>
              </div>
            );
          })}
        </div>

        {/* DIRECT INSTALLATION CONTACT CARDS */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Building size={22} className="text-blue-600" /> Direct On-Site Installation Booking Desk
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Contact our certified engineering team directly to schedule a site visit or request a custom installation quotation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
            {/* Hotline 1 */}
            <a
              href="tel:0707779933"
              className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all group"
            >
              <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <Building size={18} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Installation Desk Hotline</span>
                <span className="text-sm font-black text-slate-900 group-hover:text-blue-600">070 777 99 33</span>
              </div>
            </a>

            {/* Hotline 2 */}
            <a
              href="tel:0716778833"
              className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all group"
            >
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <Building size={18} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Retail Operations</span>
                <span className="text-sm font-black text-slate-900 group-hover:text-emerald-600">071 677 88 33</span>
              </div>
            </a>

            {/* Sajith Jayawardena Direct */}
            <a
              href="tel:0784177404"
              className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all group"
            >
              <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <Building size={18} />
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Sajith Jayawardena (Direct Mobile)</span>
                <span className="text-sm font-black text-slate-900 group-hover:text-purple-600">078 417 7404</span>
              </div>
            </a>

            {/* WhatsApp Direct */}
            <a
              href="https://wa.me/94707779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20book%20an%20on-site%20installation."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-2xl transition-all group"
            >
              <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0">
                <Building size={18} />
              </div>
              <div>
                <span className="text-[10px] text-emerald-700 block uppercase font-extrabold">Instant WhatsApp Installation Booking</span>
                <span className="text-sm font-black text-emerald-900">070 777 99 33</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <QuickContactWidget />
    </div>
  );
}
