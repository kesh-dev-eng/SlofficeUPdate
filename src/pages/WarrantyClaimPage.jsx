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
  FileText
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

    // Simulated warranty database check
    if (serialQuery.length >= 4) {
      setSerialResult({
        valid: true,
        serial: serialQuery.toUpperCase(),
        product: "UltraBook Pro 15 - Intel i7 16GB",
        purchaseDate: "2025-06-15",
        warrantyExpires: "2028-06-15",
        status: "Active (Covered under 3-Year Official Warranty)"
      });
      setSerialError('');
    } else {
      setSerialError('Serial number not found. Please check your invoice or contact support.');
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
        title="Warranty Claim & Status Portal | SL Office Solutions"
        description="Register a hardware warranty claim or check official warranty validity for laptops, printers, CCTV, and office automation in Sri Lanka."
      />

      <Navbar />

      {/* HERO BANNER */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
            <ShieldCheck size={14} /> Official SL Office Guarantee
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Warranty Claim & Verification Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Submit a hardware warranty claim online, track warranty status by serial number, or connect with our authorized service center technicians.
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

        {/* WARRANTY CLAIM FORM & POLICY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Form (7/12) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" /> Submit Warranty Claim Request
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Fill out the claim form below. Our support team will issue a Service Ticket within 24 hours.
              </p>
            </div>

            {claimSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                <CheckCircle size={40} className="text-emerald-600 mx-auto" />
                <h4 className="text-lg font-extrabold text-emerald-900">Warranty Claim Registered!</h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you <strong>{formData.name}</strong>. Your claim for <strong>{formData.productName}</strong> has been submitted. Our technical officer will call you at <strong>{formData.phone}</strong> to arrange service pickup or on-site repair.
                </p>
                <button
                  onClick={() => setClaimSubmitted(false)}
                  className="bg-white border border-slate-300 text-slate-700 text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-slate-50"
                >
                  Submit Another Claim
                </button>
              </div>
            ) : (
              <form onSubmit={handleClaimSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kasun Perera"
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
                    <label className="font-bold text-slate-700 block mb-1">Invoice / Receipt Number</label>
                    <input
                      type="text"
                      placeholder="e.g. INV-2026-892"
                      value={formData.invoiceNo}
                      onChange={(e) => setFormData({ ...formData, invoiceNo: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Serial Number (S/N)</label>
                    <input
                      type="text"
                      placeholder="Found on item label or box"
                      value={formData.serialNo}
                      onChange={(e) => setFormData({ ...formData, serialNo: e.target.value })}
                      className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Product Name / Model *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smart Security CCTV Camera 4K / UltraBook Pro"
                    value={formData.productName}
                    onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Describe Fault or Issue *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what is not working (e.g. device won't power on, display lines, printer paper jam)..."
                    value={formData.issueDesc}
                    onChange={(e) => setFormData({ ...formData, issueDesc: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={18} /> Register Warranty Claim
                </button>
              </form>
            )}
          </div>

          {/* Right Warranty Policy Info (5/12) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 space-y-5 border border-slate-800 shadow-md">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-400" /> Warranty Policy Terms
              </h3>
              <ul className="space-y-3 text-xs text-slate-300 leading-relaxed font-normal">
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>100% Genuine Tech:</strong> All products sold carry official local manufacturer/distributor warranties.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Fast Turnaround:</strong> Standard hardware warranty repairs completed within 3 to 7 business days.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Free Replacement Unit:</strong> Available for corporate AMC accounts during extended repairs.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Exclusions:</strong> Physical damage, liquid spills, power surge/lightning, and unauthorized opening void warranty.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="font-extrabold text-slate-900 text-sm">Need Urgent Assistance?</h4>
              <p className="text-xs text-slate-500">Contact our Warranty Service Desk directly:</p>
              <div className="space-y-2 text-xs font-bold">
                <a href="tel:+94716778833" className="flex items-center gap-2 text-blue-600 hover:underline">
                  <Phone size={14} /> Call Hotline: +94 71 677 8833
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
