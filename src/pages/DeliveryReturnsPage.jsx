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
  Send,
  Clock,
  AlertTriangle,
  FileText,
  Phone,
  HelpCircle
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
        title="Delivery Policy & Order Tracking | SL Office Solutions"
        description="Official Delivery Policy, delivery charges, 5-day delivery time, order status definitions, and damaged item notifications for SL Office Solutions."
      />

      <Navbar />

      {/* HERO BANNER */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/3 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
            <Truck size={14} /> Official SL Office Logistics Policy
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Transparent shipping rules, delivery timelines, order status definitions, and damaged item support.
          </p>
        </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-12 space-y-12 w-full flex-1">
        
        {/* DELIVERY HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center font-extrabold">
              <Truck size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">Delivery Charges</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Calculated based on product weight, dimensions, and delivery location. Displayed on product page and in Shopping Cart before confirming your order.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center font-extrabold">
              <Clock size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">5 Business Days Delivery</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Orders are typically delivered within <strong>5 business days</strong>, subject to product availability and delivery location. Unexpected delays will be notified promptly.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center font-extrabold">
              <AlertTriangle size={24} />
            </div>
            <h3 className="font-extrabold text-slate-900 text-lg">48-Hour Damage Report</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Please inspect your order upon delivery. Notify us within <strong>48 hours</strong> if an item is damaged, defective, or incorrect.
            </p>
          </div>
        </div>

        {/* DETAILED POLICY & INQUIRY FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Policy Content (7/12) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Delivery Details */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <Truck size={20} className="text-blue-600" /> Delivery Time & Address Changes
              </h3>
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>Delivery Time:</strong> Orders are typically delivered within 5 business days. Delivery times may be affected by circumstances beyond our control, including public holidays, curfews, lockdowns, adverse weather conditions, or other emergencies.
                </p>
                <p>
                  <strong>Delivery Address Changes:</strong> Address changes can be requested before the order status changes to "Shipped." To request an address change, please contact our Customer Service team at <strong className="text-blue-600">070 777 9933</strong>. Additional delivery charges may apply if the new delivery address falls within a different delivery zone.
                </p>
                <p>
                  <strong>Order Tracking:</strong> Once your order has been dispatched, you will receive an email containing your tracking number, courier details, and delivery tracking information.
                </p>
              </div>
            </div>

            {/* Order Status Definitions */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <FileText size={20} className="text-blue-600" /> Order Status Definitions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-amber-600 block">On Hold</span>
                  <span className="text-slate-600">Order received, but payment is pending confirmation.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-blue-600 block">Processing</span>
                  <span className="text-slate-600">Your order is being prepared for dispatch.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-indigo-600 block">Shipped</span>
                  <span className="text-slate-600">Handed over to the courier and on its way.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-emerald-600 block">Completed</span>
                  <span className="text-slate-600">Your order has been successfully delivered.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-purple-600 block">Pending Payment</span>
                  <span className="text-slate-600">Payment has been initiated but not yet completed.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-red-600 block">Cancelled</span>
                  <span className="text-slate-600">Order cancelled; no payment processed or retained.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-rose-600 block">Failed</span>
                  <span className="text-slate-600">Payment failed due to card decline or incorrect details.</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 space-y-1">
                  <span className="font-bold text-teal-600 block">Refunded</span>
                  <span className="text-slate-600">Full or partial refund processed for approved request.</span>
                </div>
              </div>
            </div>

            {/* Damaged / Missing & Liability */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                <ShieldCheck size={20} className="text-blue-600" /> Damaged Items & Liability
              </h3>
              <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                <p>
                  <strong>Damaged or Missing Items:</strong> Please inspect your order upon delivery. If you receive a damaged, defective, or incorrect item, notify us within <strong>48 hours</strong> of delivery by contacting our Customer Service team. Claims made after this period may not be eligible for replacement or compensation. Damage caused after delivery or through improper handling by the customer is not covered.
                </p>
                <p>
                  <strong>Liability:</strong> SL Office Solutions takes every reasonable precaution to ensure your order is delivered safely. However, our liability for loss or damage is limited to the extent permitted by applicable law and the terms of the courier service. Any visible transit damage should be reported immediately upon receipt.
                </p>
              </div>
            </div>

          </div>

          {/* Direct Logistics Contact Cards (5/12) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6 h-fit">
            <div>
              <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Package size={20} className="text-blue-600" /> Logistics & Order Support Desk
              </h3>
              <p className="text-xs text-slate-500 mt-1">Contact our customer service team directly for dispatch updates, address changes, or damage claims.</p>
            </div>

            <div className="space-y-3 text-xs font-bold">
              {/* Hotline 1 */}
              <a
                href="tel:0707779933"
                className="flex items-center gap-3 p-4 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Customer Service & Address Change Hotline</span>
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
                  <span className="text-[10px] text-slate-400 block uppercase">Retail Logistics Operation</span>
                  <span className="text-sm font-black text-slate-900 group-hover:text-emerald-600">071 677 88 33</span>
                </div>
              </a>

              {/* Direct Sajith Jayawardena */}
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

              {/* WhatsApp Chat */}
              <a
                href="https://wa.me/94707779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20check%20my%20delivery%20status."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 rounded-2xl transition-all group"
              >
                <div className="w-10 h-10 bg-[#25D366] text-white rounded-xl flex items-center justify-center shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div>
                  <span className="text-[10px] text-emerald-700 block uppercase font-extrabold">Instant WhatsApp Logistics Support</span>
                  <span className="text-sm font-black text-emerald-900">070 777 99 33</span>
                </div>
              </a>
            </div>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-800">SL Office Solutions Dispatch Desk</p>
              <p>Address: No: 608/11 Makola North, Makola.</p>
              <p>Email: slofficesolutions@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <QuickContactWidget />
    </div>
  );
}
