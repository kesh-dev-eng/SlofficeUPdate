import { useState } from 'react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import QuickContactWidget from '../components/QuickContactWidget';
import {
  Wrench,
  Laptop,
  Printer,
  Camera,
  Cpu,
  CheckCircle,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
  Send
} from 'lucide-react';

const REPAIR_SERVICES = [
  {
    title: 'Chip-Level Motherboard Repair',
    icon: Cpu,
    desc: 'Advanced micro-soldering, power IC replacement, and logic board short-circuit diagnostics for laptops & PCs.'
  },
  {
    title: 'Laptop Screen & Battery Replacement',
    icon: Laptop,
    desc: 'Original IPS LED screen replacement, genuine high-capacity battery installation, and keyboard repairs.'
  },
  {
    title: 'Laser Printer & Copier Servicing',
    icon: Printer,
    desc: 'Fuser unit, roller, drum replacement, toner cartridge refills, paper jam fix, and network print server setup.'
  },
  {
    title: 'CCTV XVR/DVR & Camera Repairs',
    icon: Camera,
    desc: 'Camera sensor replacement, DVR motherboard fix, hard disk recovery, and BNC/power cabling repair.'
  }
];

export default function RepairCenterPage() {
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    deviceType: 'Laptop / PC',
    faultDesc: '',
    pickupRequired: 'Yes'
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setBookingSubmitted(true);

    try {
      await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Date.now(),
          name: formData.name,
          phone: formData.phone,
          company: `Device: ${formData.deviceType} | Pickup: ${formData.pickupRequired}`,
          service: `Repair Center Job - ${formData.deviceType}`,
          message: formData.faultDesc,
          status: 'New',
          date: new Date().toISOString().split('T')[0]
        })
      });
    } catch (_e) {}
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <SEOHead
        title="Hardware Repair Center & Tech Servicing | SL Office Solutions"
        description="Certified repair center in Colombo Sri Lanka for laptops, PCs, laser printers, copiers, and CCTV camera systems."
      />

      <Navbar />

      {/* HERO BANNER */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
            <Wrench size={14} /> Authorized Technical Service Center
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Hardware Repair Center & Diagnostics
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Certified technical servicing for laptops, desktop computers, multi-function laser printers, copiers, and CCTV security systems in Sri Lanka.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 space-y-12 w-full flex-1">
        {/* REPAIR SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REPAIR_SERVICES.map((srv, idx) => {
            const Icon = srv.icon;
            return (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-extrabold">
                  <Icon size={24} />
                </div>
                <h3 className="font-extrabold text-slate-900 text-base">{srv.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{srv.desc}</p>
              </div>
            );
          })}
        </div>

        {/* BOOK REPAIR FORM & LOCATION INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Booking Form (7/12) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Wrench size={20} className="text-blue-600" /> Book a Repair / Courier Pickup
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Schedule an in-store diagnostic or request courier pickup for your faulty equipment.
              </p>
            </div>

            {bookingSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                <CheckCircle size={40} className="text-emerald-600 mx-auto" />
                <h4 className="text-lg font-extrabold text-emerald-900">Repair Job Requested!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you <strong>{formData.name}</strong>. Our service desk has logged your repair request. We will contact you at <strong>{formData.phone}</strong> for diagnostic pickup details.
                </p>
                <button
                  onClick={() => setBookingSubmitted(false)}
                  className="bg-white border border-slate-300 text-slate-700 text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-slate-50"
                >
                  Book Another Repair
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nimal Fernando"
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
                    <label className="font-bold text-slate-700 block mb-1">Equipment Category *</label>
                    <select
                      value={formData.deviceType}
                      onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium bg-white"
                    >
                      <option value="Laptop / PC">Laptop / Desktop PC</option>
                      <option value="Laser Printer / Copier">Laser Printer / Copier</option>
                      <option value="CCTV DVR / Camera">CCTV DVR / Security Camera</option>
                      <option value="Network Router / Switch">Network Router / Switch</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Courier Pickup Required?</label>
                    <select
                      value={formData.pickupRequired}
                      onChange={(e) => setFormData({ ...formData, pickupRequired: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium bg-white"
                    >
                      <option value="Yes">Yes (Islandwide Courier Pickup)</option>
                      <option value="No">No (I will drop off at Repair Center)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Fault Description *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the issue (e.g. laptop not charging, printer lines, CCTV no signal)..."
                    value={formData.faultDesc}
                    onChange={(e) => setFormData({ ...formData, faultDesc: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={18} /> Submit Repair Request
                </button>
              </form>
            )}
          </div>

          {/* Repair Center Location & Info (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-md">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <MapPin size={20} className="text-blue-400" /> Main Repair Center Location
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <p className="font-bold text-white">SL Office Solutions Repair Center</p>
                <p>451 Commerce Ave, Suite 200, Colombo 03, Sri Lanka</p>
                <div className="flex items-center gap-2 pt-2 text-blue-300 font-semibold">
                  <Clock size={14} /> Open Mon - Sat: 8:30 AM - 6:00 PM
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm">Direct Technician Hotline</h4>
              <div className="space-y-2 text-xs font-bold">
                <a href="tel:+94716778833" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Phone size={14} /> Call Technician: +94 71 677 8833
                </a>
                <a href="https://wa.me/94719779933" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 hover:underline">
                  <MessageCircle size={14} /> WhatsApp Support: 0719779933
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <QuickContactWidget />
    </div>
  );
}
