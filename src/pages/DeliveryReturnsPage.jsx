import { useState } from 'react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import QuickContactWidget from '../components/QuickContactWidget';
import {
  Truck,
  RotateCcw,
  ShieldCheck,
  CheckCircle,
  Package,
  MapPin,
  Send
} from 'lucide-react';

export default function DeliveryReturnsPage() {
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    orderNo: '',
    type: 'Delivery Status Inquiry',
    details: ''
  });

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setInquirySubmitted(true);

    try {
      await fetch('/api/service-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: Date.now(),
          name: formData.name,
          phone: formData.phone,
          company: `Order No: ${formData.orderNo}`,
          service: `Delivery & Returns - ${formData.type}`,
          message: formData.details,
          status: 'New',
          date: new Date().toISOString().split('T')[0]
        })
      });
    } catch (_e) {}
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <SEOHead
        title="Delivery Times & Returns Policy | SL Office Solutions"
        description="Learn about Islandwide courier delivery, free Colombo metro shipping, package tracking, and 7-day hassle-free return policies in Sri Lanka."
      />

      <Navbar />

      {/* HERO BANNER */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
            <Truck size={14} /> Islandwide Express Logistics
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Delivery & Returns Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Fast, insured courier delivery across all 25 districts of Sri Lanka and transparent 7-day money-back / replacement return policies.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 space-y-12 w-full flex-1">
        {/* DELIVERY HIGHLIGHTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-extrabold">
              <Truck size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Colombo Express Delivery</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Same-day or next-business-day delivery for corporate orders within Colombo 01-15 and Greater Colombo areas.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-extrabold">
              <MapPin size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Islandwide Courier Coverage</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Insured courier delivery to all provinces (Kandy, Galle, Jaffna, Kurunegala, Matara, Gampaha) within 1 to 3 business days.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center font-extrabold">
              <RotateCcw size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">7-Day Replacement Return</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hassle-free 7-day exchange or refund for items received with manufacturing defects or shipping damage.
            </p>
          </div>
        </div>

        {/* POLICY DETAILS & INQUIRY FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Policy Text (7/12) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck size={22} className="text-blue-600" /> Return & Exchange Criteria
              </h3>
            </div>

            <div className="space-y-4 text-xs text-slate-700 leading-relaxed font-normal">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm">1. Eligible Returns</h4>
                <p>Items received with manufacturing faults, damaged during transit, or incorrect items dispatched can be returned for full replacement or refund within 7 days of delivery.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm">2. Packaging & Serial Verification</h4>
                <p>The product must be returned with original product packaging, manuals, accessories, and un-tampered serial number stickers.</p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2">
                <h4 className="font-extrabold text-slate-900 text-sm">3. Refund Processing</h4>
                <p>Approved refunds are processed back to your original payment method (Bank Transfer / Card) within 3 business days of item inspection.</p>
              </div>
            </div>
          </div>

          {/* Track / Inquiry Form (5/12) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Package size={20} className="text-blue-600" /> Track Order or Request Return
              </h3>
              <p className="text-xs text-slate-500 mt-1">Submit your order details for dispatch updates or return processing.</p>
            </div>

            {inquirySubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-4">
                <CheckCircle size={40} className="text-emerald-600 mx-auto" />
                <h4 className="text-lg font-extrabold text-emerald-900">Inquiry Logged!</h4>
                <p className="text-xs text-emerald-800 max-w-xs mx-auto">
                  Our logistics officer will contact you at <strong>{formData.phone}</strong> regarding Order #{formData.orderNo}.
                </p>
                <button
                  onClick={() => setInquirySubmitted(false)}
                  className="bg-white border border-slate-300 text-slate-700 text-xs font-extrabold px-4 py-2.5 rounded-xl hover:bg-slate-50"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priyantha Jayasinghe"
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

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Order Number / Invoice No</label>
                  <input
                    type="text"
                    placeholder="e.g. ORD-10492"
                    value={formData.orderNo}
                    onChange={(e) => setFormData({ ...formData, orderNo: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Inquiry Type *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium bg-white"
                  >
                    <option value="Delivery Status Inquiry">Delivery Tracking Inquiry</option>
                    <option value="Return / Exchange Request">7-Day Return / Exchange Request</option>
                    <option value="Damaged Shipment Report">Damaged Item Report</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Message / Details</label>
                  <textarea
                    rows={3}
                    placeholder="Enter details..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full border border-slate-300 rounded-xl p-3 focus:outline-hidden focus:border-blue-600 font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-xl transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <Send size={18} /> Send Logistics Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <QuickContactWidget />
    </div>
  );
}
