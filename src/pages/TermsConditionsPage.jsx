import { useState } from 'react';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import QuickContactWidget from '../components/QuickContactWidget';
import {
  FileText,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
  Truck,
  CreditCard,
  Calendar,
  Phone,
  Mail,
  User,
  Building
} from 'lucide-react';

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <SEOHead
        title="Terms & Conditions | SL Office Solutions (PVT) LTD"
        description="Official Terms and Conditions, quotation validity, delivery schedule, payment terms, warranty coverage, force majeure, and contact details for SL Office Solutions (PVT) LTD."
      />

      <Navbar />

      {/* HERO BANNER */}
      <section className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative z-10 space-y-4 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-extrabold uppercase px-3.5 py-1.5 rounded-full">
            <FileText size={14} /> Official Policy & Terms
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Terms & Conditions
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            SL Office Solutions (PVT) LTD — Empowering Businesses Through Smart Technology Solutions.
          </p>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 space-y-8 w-full flex-1">
        
        {/* Intro Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold">
              <Building size={24} />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">SL Office Solutions (PVT) LTD</h2>
              <p className="text-xs text-slate-500 font-medium">
                No: 608/11 Makola North, Makola. Tel: 070 777 99 33, 071 677 88 33 | Email: slofficesolutions@gmail.com | Web: www.sloffice.lk
              </p>
            </div>
          </div>
        </div>

        {/* 1. Validity of Offer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-blue-600">
            <Calendar size={22} />
            <h3 className="text-lg font-extrabold text-slate-900">1. Validity of Offer</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
            This quotation is valid for <strong>14 days</strong> from the date of issue. Any changes in taxes, duties, or levies imposed by the Government after the date of this quotation shall be borne by the customer, and the quoted prices will be revised accordingly.
          </p>
        </div>

        {/* 2. Acceptance of Offer */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-blue-600">
            <CheckCircle size={22} />
            <h3 className="text-lg font-extrabold text-slate-900">2. Acceptance of Offer</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
            The order will be processed upon receipt of the customer's official <strong>Purchase Order (PO)</strong> or written confirmation. Delivery, installation, and implementation (where applicable) will be carried out in accordance with the mutually agreed terms and the approved project implementation plan.
          </p>
        </div>

        {/* 3. Delivery Schedule */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-blue-600">
            <Truck size={22} />
            <h3 className="text-lg font-extrabold text-slate-900">3. Delivery Schedule</h3>
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">❖</span>
              <span>Hardware and/or software will be delivered within <strong>1–2 weeks</strong> from the date of receipt of the official Purchase Order, subject to stock availability.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">❖</span>
              <span>Integration, installation, and implementation (where applicable) will be completed according to the approved project plan.</span>
            </li>
          </ul>
        </div>

        {/* 4. Payment Terms */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center gap-3 text-blue-600">
            <CreditCard size={22} />
            <h3 className="text-lg font-extrabold text-slate-900">4. Payment Terms</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
            <strong>100% Cash on Delivery (COD).</strong> Payment shall be made upon delivery of the goods and/or upon successful completion of the installation (where applicable), against submission of the final invoice.
          </p>
        </div>

        {/* 5. Warranty */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-blue-600">
            <ShieldCheck size={22} />
            <h3 className="text-lg font-extrabold text-slate-900">5. Warranty</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
            The products supplied under this quotation are covered by a <strong>One (01) Year Manufacturer's Warranty</strong>.
          </p>
          <div className="pl-8 space-y-3">
            <p className="text-xs font-bold text-slate-900">The warranty covers manufacturing defects only and does NOT cover:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-red-500 font-bold">❖</span> Cosmetic damage.
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-red-500 font-bold">❖</span> Damage resulting from misuse, negligence, abuse, improper handling, or operation contrary to manufacturer instructions.
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-red-500 font-bold">❖</span> Repairs, modifications, or alterations carried out by unauthorized personnel.
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-red-500 font-bold">❖</span> Damage caused by accidents, natural disasters (Acts of God), or other external factors.
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-red-500 font-bold">❖</span> Products with altered, defaced, or removed serial numbers.
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-red-500 font-bold">❖</span> Malfunctions caused by unstable or unregulated power supplies, including power surges, voltage spikes, fluctuations, or short circuits.
              </li>
              <li className="flex items-start gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 md:col-span-2">
                <span className="text-red-500 font-bold">❖</span> Consequential or incidental losses or damages arising from product failure.
              </li>
            </ul>
            <p className="text-xs text-slate-500 italic pt-1">
              The determination of whether a product is defective and eligible for warranty service shall be at the sole discretion of the manufacturer or supplier.
            </p>
          </div>
        </div>

        {/* 6. Force Majeure */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-3 text-blue-600">
            <AlertTriangle size={22} />
            <h3 className="text-lg font-extrabold text-slate-900">6. Force Majeure</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed pl-8">
            <strong>SL Office Solutions (PVT) LTD</strong> reserves the right to suspend or discontinue installation, maintenance, or other services if circumstances arise within a <strong>25 km radius</strong> of the project site that may endanger the safety of its employees, representatives, or contractors. Such circumstances include, but are not limited to:
          </p>
          <ul className="space-y-2 text-xs text-slate-700 pl-8">
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">❖</span>
              <span>War, invasion, acts of foreign enemies, hostilities (whether war is declared or not), or civil war.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">❖</span>
              <span>Natural disasters such as floods, hurricanes, cyclones, typhoons, windstorms, landslides, earthquakes, volcanic eruptions, or fire.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500 font-bold">❖</span>
              <span>Civil unrest, riots, terrorism, government restrictions, or any other event that poses a significant risk to life, safety, or property.</span>
            </li>
          </ul>
        </div>

        {/* 7. Contact Information */}
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <Phone size={22} className="text-blue-400" />
            <h3 className="text-lg font-extrabold text-white">7. Contact Information</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 pl-8">
            Should you require any further clarification regarding this quotation or terms, please contact:
          </p>
          
          <div className="pl-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <p className="font-bold text-white text-sm">Sajith Jayawardena</p>
              <p className="text-blue-300 font-semibold">SL Office Solutions (PVT) LTD</p>
              <p className="text-slate-300 flex items-center gap-2 pt-1">
                <Phone size={14} className="text-emerald-400" /> Mobile: 078 417 7404 / 070 777 99 33
              </p>
              <p className="text-slate-300 flex items-center gap-2">
                <Mail size={14} className="text-amber-400" /> Email: slofficesolutions@gmail.com
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/10 space-y-1">
              <p className="font-bold text-white text-sm">Head Office Location</p>
              <p className="text-slate-300">No: 608/11 Makola North, Makola.</p>
              <p className="text-slate-300">Hotline: 070 777 99 33 / 071 677 88 33</p>
              <p className="text-blue-300 font-semibold">Web: www.sloffice.lk</p>
            </div>
          </div>

          <p className="text-xs text-center text-slate-400 pt-4 border-t border-slate-800">
            "Empowering Businesses Through Smart Technology Solutions."
          </p>
        </div>

      </div>

      <QuickContactWidget />
    </div>
  );
}
