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
        title="On-Site Installation Services | SL Office Solutions"
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

        {/* REQUEST INSTALLATION FORM */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm max-w-3xl mx-auto space-y-6">
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Building size={22} className="text-blue-600" /> Request On-Site Installation Team Visit
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Schedule a technician visit to install and configure your equipment on-site.
            </p>
          </div>

          {installSubmitted ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
              <CheckCircle size={40} className="text-emerald-600 mx-auto" />
              <h4 className="text-lg font-extrabold text-emerald-900">Installation Visit Requested!</h4>
              <p className="text-xs text-emerald-800 max-w-md mx-auto">
                Thank you <strong>{formData.name}</strong>. Our installation team will contact you at <strong>{formData.phone}</strong> to confirm your site visit for <strong>{formData.installType}</strong>.
              </p>
              <button
                onClick={() => setInstallSubmitted(false)}
                className="bg-white border border-slate-300 text-slate-700 text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-slate-50"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleInstallSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Name / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sahan De Silva / ABC Firm"
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
                    placeholder="e.g. +94 71 677 8833"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Installation Service *</label>
                  <select
                    value={formData.installType}
                    onChange={(e) => setFormData({ ...formData, installType: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium bg-white"
                  >
                    {INSTALLATION_OPTIONS.map((opt, i) => (
                      <option key={i} value={opt.title}>{opt.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">City / Installation Location *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Colombo 03, Kandy, Galle..."
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Specific Requirements / Notes</label>
                <textarea
                  rows={4}
                  placeholder="Number of cameras, building floors, cabling requirements, or preferred date..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 text-sm"
              >
                <Send size={18} /> Schedule Installation Visit
              </button>
            </form>
          )}
        </div>
      </div>

      <QuickContactWidget />
    </div>
  );
}
