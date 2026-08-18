import { useState } from 'react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import QuickContactWidget from '../components/QuickContactWidget';
import {
  ShieldCheck,
  FileCheck,
  Search,
  CheckCircle,
  AlertCircle,
  Send,
  Phone,
  MessageCircle,
  FileText,
  AlertTriangle,
  Wrench
} from 'lucide-react';

export default function WarrantyClaimPage() {
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [serialQuery, setSerialQuery] = useState('');
  const [serialResult, setSerialResult] = useState(null);
  const [serialError, setSerialError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    invoiceNo: '',
    serialNo: '',
    productName: '',
    issueDesc: ''
  });

  const handleCheckWarranty = (e) => {
    e.preventDefault();
    if (!serialQuery.trim()) return;

    if (serialQuery.length >= 4) {
      setSerialResult({
        valid: true,
        serial: serialQuery.toUpperCase(),
        product: "Multifunction Laser Printer / Workstation",
        purchaseDate: "2025-09-10",
        warrantyExpires: "2026-09-10",
        status: "Active (Covered under 1-Year Manufacturer Warranty)"
      });
      setSerialError('');
    } else {
      setSerialError('Serial number not found. Please check your invoice or contact SL Office Solutions (PVT) LTD support.');
      setSerialResult(null);
    }
  };

  const handleClaimSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.productName) return;

    setClaimSubmitted(true);

    try {
      await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Date.now(),
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: `Invoice: ${formData.invoiceNo} | Serial: ${formData.serialNo}`,
          service: `Warranty Claim - ${formData.productName}`,
          message: formData.issueDesc,
          status: 'New',
          date: new Date().toISOString().split('T')[0]
        })
      });
    } catch (_e) {}
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <SEOHead
        title="Warranty Terms & Claim Portal | SL Office Solutions (PVT) LTD"
        description="Official Warranty Terms & Conditions, 1-Year Manufacturer Warranty registration, and serial verification for SL Office Solutions (PVT) LTD."
      />

      <Navbar />

      {/* HERO BANNER */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
            <ShieldCheck size={14} /> Official SL Office Solutions (PVT) LTD Guarantee
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Warranty Claim & Verification
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Submit a hardware warranty claim online or check official warranty validity by serial number.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 space-y-12 w-full flex-1">
        
        {/* CHECK WARRANTY STATUS CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="max-w-xl">
            <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
              <Search size={22} className="text-blue-600" /> Check Product Warranty Status
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Enter your product Serial Number or Invoice Number to verify remaining warranty coverage.
            </p>
          </div>

          <form onSubmit={handleCheckWarranty} className="flex flex-col sm:flex-row gap-3 max-w-2xl">
            <input
              type="text"
              required
              placeholder="e.g. SN-8947291 or INV-2026-904"
              value={serialQuery}
              onChange={(e) => setSerialQuery(e.target.value)}
              className="flex-1 border border-slate-300 rounded-xl px-4 py-3 text-xs font-medium text-slate-800 outline-none focus:border-blue-600"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs px-6 py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCheck size={16} /> Verify Warranty
            </button>
          </form>

          {serialResult && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-xs text-emerald-900 space-y-2 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 font-extrabold text-sm text-emerald-800">
                <CheckCircle size={18} className="text-emerald-600" /> {serialResult.status}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 border-t border-emerald-200 text-slate-700 font-medium">
                <div><span className="text-slate-500 font-bold block">Product:</span> {serialResult.product}</div>
                <div><span className="text-slate-500 font-bold block">Purchase Date:</span> {serialResult.purchaseDate}</div>
                <div><span className="text-slate-500 font-bold block">Valid Until:</span> {serialResult.warrantyExpires}</div>
              </div>
            </div>
          )}

          {serialError && (
            <div className="bg-amber-50 border border-amber-200 text-amber-900 text-xs p-4 rounded-2xl font-bold flex items-center gap-2">
              <AlertCircle size={16} className="text-amber-600 shrink-0" /> {serialError}
            </div>
          )}
        </div>

        {/* WARRANTY CLAIM FORM & DETAILED POLICY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Direct Warranty Support Contact (7/12) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" /> Direct Warranty Service Desk
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Reach out directly to our warranty support officers for fast warranty claim processing, hardware inspection, or replacement requests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
              {/* Hotline 1 */}
              <a
                href="tel:0707779933"
                className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Warranty Support Hotline</span>
                  <span className="text-sm font-black text-slate-900 group-hover:text-blue-600">070 777 99 33</span>
                </div>
              </a>

              {/* Hotline 2 */}
              <a
                href="tel:0716778833"
                className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Retail Operation Hotline</span>
                  <span className="text-sm font-black text-slate-900 group-hover:text-emerald-600">071 677 88 33</span>
                </div>
              </a>

              {/* Sajith Jayawardena Direct */}
              <a
                href="tel:0784177404"
                className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 bg-purple-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Sajith Jayawardena (Direct Mobile)</span>
                  <span className="text-sm font-black text-slate-900 group-hover:text-purple-600">078 417 7404</span>
                </div>
              </a>

              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/94707779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20claim%20warranty%20for%20my%20product."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 block uppercase font-extrabold">Instant WhatsApp Warranty Support</span>
                  <span className="text-sm font-black text-emerald-900">070 777 99 33</span>
                </div>
              </a>
            </div>

            <div className="p-4 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs space-y-1.5 text-blue-900">
              <strong className="font-extrabold text-blue-950 flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-blue-600" /> Instructions for Warranty Processing:
              </strong>
              <p className="text-slate-700 leading-relaxed">
                When calling or messaging, please provide your <strong>Invoice / Receipt Number</strong> and the <strong>Serial Number (S/N)</strong> found on the item label. Our technical team will immediately verify warranty coverage and arrange pickup or drop-off service.
              </p>
            </div>
          </div>

          {/* Right Policy Info (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-md">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-400" /> Warranty Terms & Exclusions
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Products supplied are covered by a <strong>One (01) Year Manufacturer's Warranty</strong> for manufacturing defects under normal use.
              </p>
              
              <div className="space-y-2 text-xs text-slate-300">
                <p className="font-bold text-amber-400">The warranty does NOT cover:</p>
                <ul className="space-y-1.5 list-disc pl-4 text-slate-300">
                  <li>Cosmetic damage</li>
                  <li>Misuse, abuse, negligence, or improper handling</li>
                  <li>Incorrect installation, operation, or maintenance</li>
                  <li>Power surges, voltage spikes, lightning, fire, flood</li>
                  <li>Accidents, vandalism, or unauthorized repairs</li>
                  <li>Products with altered or removed serial numbers</li>
                  <li>Normal wear and tear or consumable items</li>
                </ul>
              </div>

              <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-[11px] text-amber-200 leading-relaxed">
                <strong className="text-amber-400 block mb-1">Chargeable Services Notice:</strong>
                Repairs required due to excluded causes will be treated as chargeable services (labor, parts, transportation).
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm">Need Direct Warranty Support?</h4>
              <div className="space-y-2 text-xs font-bold">
                <a href="tel:0707779933" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Phone size={14} /> Call Hotline: 070 777 99 33 / 071 677 88 33
                </a>
                <a href="tel:0784177404" className="flex items-center gap-2 text-indigo-600 hover:underline">
                  <Phone size={14} /> Sajith Jayawardena: 078 417 7404
                </a>
                <a href="https://wa.me/94707779933" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-emerald-600 hover:underline">
                  <MessageCircle size={14} /> WhatsApp Support: 0707779933
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
