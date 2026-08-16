import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import SEOHead from '../components/SEOHead';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';
import { BEST_DEALS } from '../data/products';
import {
  ShieldCheck,
  Truck,
  Headphones,
  Award,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Star,
  ShoppingCart,
  CheckCircle,
  Monitor,
  Printer,
  Laptop,
  Building2,
  Wrench,
  Activity,
  Shield,
  CheckCircle2,
  Wifi,
  Phone,
  Mail
} from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: "High-Performance Workstations & Laptops",
    category: "Corporate Laptops & PCs",
    image: "/assets/29.png",
    badge: "✦ Official Warranty"
  },
  {
    id: 2,
    title: "4K CCTV Security & Surveillance Systems",
    category: "Smart Security",
    image: "/assets/64.png",
    badge: "✦ 24/7 Remote Monitoring"
  },
  {
    id: 3,
    title: "Heavy-Duty Laser Printers & Copier Systems",
    category: "Office Automation",
    image: "/assets/50.png",
    badge: "✦ Low Cost Per Print"
  },
  {
    id: 4,
    title: "Enterprise Wi-Fi 6 Networking & Server Cabinets",
    category: "IT Infrastructure",
    image: "/assets/23.png",
    badge: "✦ Licensed Engineers"
  }
];

const ABOUT_HIGHLIGHTS = [
  {
    id: 1,
    title: "10+ Years of Industry Trust",
    desc: "Empowering Sri Lankan businesses and corporate offices with certified laptops, printers, and office automation since 2014.",
    tag: "Established 2014",
    icon: Building2,
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "Official Tech Partner",
    desc: "Authorized dealer for leading technology brands, guaranteeing 100% genuine products with official manufacturer warranties.",
    tag: "100% Genuine",
    icon: Award,
    color: "bg-emerald-600",
  },
  {
    id: 3,
    title: "Security & Surveillance Solutions",
    desc: "Complete 4K CCTV camera systems, access control, and network infrastructure tailored for modern enterprises.",
    tag: "Full Solutions",
    icon: ShieldCheck,
    color: "bg-purple-600",
  },
  {
    id: 4,
    title: "Islandwide Delivery & 24/7 Support",
    desc: "Fast delivery to your doorstep, on-site installation services, and round-the-clock technical customer support.",
    tag: "24/7 Support",
    icon: Headphones,
    color: "bg-amber-600",
  },
];



const CATEGORY_CARDS = [
  { title: "Laptop & Accessories", icon: Laptop, count: "120+ Items", color: "bg-blue-50 text-blue-600 border-blue-100", desc: "Ultrabooks & Business Laptops" },
  { title: "Computer Accessories", icon: Monitor, count: "180+ Items", color: "bg-indigo-50 text-indigo-600 border-indigo-100", desc: "4K Monitors, Keyboards & SSDs" },
  { title: "Security Solutions", icon: ShieldCheck, count: "85+ Items", color: "bg-emerald-50 text-emerald-600 border-emerald-100", desc: "CCTV Systems & Access Control" },
  { title: "Office Automation", icon: Printer, count: "45+ Items", color: "bg-amber-50 text-amber-600 border-amber-100", desc: "Laser Jet Printers & Scanners" },
  { title: "Networking", icon: Wifi, count: "65+ Items", color: "bg-purple-50 text-purple-600 border-purple-100", desc: "Wi-Fi 6 Routers & Switches" },
];

export default function Home() {
  const { addToCart, setIsCheckoutOpen } = useCart();
  const { products, bestDeals } = useProducts();

  const [activeCategoryFilter, setActiveCategoryFilter] = useState('All');

  const handleSelectCategory = (catName) => {
    setActiveCategoryFilter(catName);
    const elem = document.getElementById("featured-products");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const CATEGORY_FILTERS = [
    "All",
    "Laptop & Accessories",
    "Computer Accessories",
    "Security Solutions",
    "Office Automation",
    "Networking"
  ];

  const filteredProducts = (products || []).filter((p) => {
    if (activeCategoryFilter === 'All') return true;
    const f = activeCategoryFilter.toLowerCase();
    const cat = (p.category || '').toLowerCase();
    if (f.includes('laptop') && (cat.includes('laptop') || cat.includes('laptops'))) return true;
    if (f.includes('computer') && cat.includes('computer')) return true;
    if (f.includes('security') && cat.includes('security')) return true;
    if (f.includes('automation') && cat.includes('office')) return true;
    if (f.includes('office') && cat.includes('office')) return true;
    if (f.includes('networking') && cat.includes('networking')) return true;
    return cat === f || f.includes(cat);
  });

  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);

  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3500);
    return () => clearInterval(heroTimer);
  }, []);

  const dealsContainerRef = useRef(null);
  const [isDealsPaused, setIsDealsPaused] = useState(false);
  const [activeDealIndex, setActiveDealIndex] = useState(0);

  const aboutContainerRef = useRef(null);
  const [isAboutPaused, setIsAboutPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAboutPaused && aboutContainerRef.current) {
        const container = aboutContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScroll - 20) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 340, behavior: 'smooth' });
        }
      }
    }, 2800);

    return () => clearInterval(interval);
  }, [isAboutPaused]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDealsPaused && dealsContainerRef.current) {
        const container = dealsContainerRef.current;
        const cardStep = 344;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;

        if (container.scrollLeft >= maxScrollLeft - 20) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
          setActiveDealIndex(0);
        } else {
          container.scrollBy({ left: cardStep, behavior: 'smooth' });
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isDealsPaused]);

  const handleDealsScroll = () => {
    if (dealsContainerRef.current) {
      const scrollLeft = dealsContainerRef.current.scrollLeft;
      const cardStep = 344;
      const index = Math.round(scrollLeft / cardStep);
      setActiveDealIndex(Math.min(Math.max(0, index), BEST_DEALS.length - 1));
    }
  };

  const scrollToDealIndex = (idx) => {
    if (dealsContainerRef.current) {
      const cardStep = 344;
      dealsContainerRef.current.scrollTo({ left: idx * cardStep, behavior: 'smooth' });
      setActiveDealIndex(idx);
    }
  };

  const scrollDeals = (direction) => {
    if (dealsContainerRef.current) {
      const cardStep = 344;
      const scrollAmount = direction === 'left' ? -cardStep : cardStep;
      dealsContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const scrollAbout = (direction) => {
    if (aboutContainerRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      aboutContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBuyNow = (prod) => {
    const success = addToCart(prod, { openDrawer: false });
    if (success) {
      setIsCheckoutOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      <SEOHead
        title="SL Office Solutions | Laptops, Printers, CCTV & Tech Store Sri Lanka"
        description="Buy genuine laptops, CCTV security systems, laser printers, and office automation tech in Sri Lanka. Fast islandwide delivery with warranty."
        keywords="laptops sri lanka, office automation colombo, cctv security camera sri lanka, wireless laser printer, tech store sri lanka"
      />
      <Navbar onSelectCategory={handleSelectCategory} />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white py-16 px-6 sm:px-12 lg:px-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-10"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Upgrade Your Office & <span className="text-blue-400">Workspace</span> Experience
            </h1>
            <p className="text-slate-300 text-lg leading-relaxed max-w-xl">
              Discover top-tier laptops, CCTV security solutions, high-performance printers, and office automation tools all in one place.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all cursor-pointer"
              >
                Get Started <ArrowRight size={18} />
              </Link>
              <a
                href="#categories"
                className="inline-flex items-center gap-2 bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold px-6 py-3.5 rounded-xl transition-all cursor-pointer"
              >
                Browse Catalog
              </a>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-tr from-blue-600/30 to-slate-800/50 p-6 rounded-3xl backdrop-blur-md border border-slate-700/50 shadow-2xl overflow-hidden group">
              {/* Slides Container - Clean Pictures (Original Resolution) */}
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden bg-slate-950">
                {HERO_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentHeroSlide ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover rounded-2xl transform scale-100 group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                ))}

                {/* Navigation Arrows */}
                <button
                  onClick={() => setCurrentHeroSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
                  title="Previous Image"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  onClick={() => setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-blue-600 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 transition-all opacity-80 hover:opacity-100 cursor-pointer shadow-md"
                  title="Next Image"
                >
                  <ChevronRight size={18} />
                </button>

                {/* Slide Dots Progress Indicators Overlay */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center justify-center gap-1.5 z-20 bg-slate-950/50 backdrop-blur-xs px-2.5 py-1 rounded-full border border-white/10">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentHeroSlide(idx)}
                      className={`h-1.5 rounded-full transition-all cursor-pointer ${idx === currentHeroSlide ? 'w-5 bg-blue-500 shadow-sm' : 'w-1.5 bg-white/50 hover:bg-white'
                        }`}
                      title={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <Truck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Fast Delivery</h4>
              <p className="text-xs text-slate-500">Island-wide shipping</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Official Warranty</h4>
              <p className="text-xs text-slate-500">100% Protection</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Headphones size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">24/7 Tech Support</h4>
              <p className="text-xs text-slate-500">Dedicated assistance</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
              <Award size={24} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Certified Quality</h4>
              <p className="text-xs text-slate-500">Top industry brands</p>
            </div>
          </div>
        </div>
      </section>

      {/* Continuous Moving Marquee Banner */}
      <div className="bg-slate-900 text-white overflow-hidden py-3.5 border-y border-slate-800 relative shadow-inner">
        <div className="animate-marquee whitespace-nowrap flex gap-10 items-center text-xs font-bold uppercase tracking-wider text-slate-200">
          <span className="flex items-center gap-2.5 text-blue-400">
            <Headphones size={18} className="text-blue-400" /> Local Support Team
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-2.5 text-emerald-400">
            <Wrench size={18} className="text-emerald-400" /> Licensed Installers
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-2.5 text-rose-400">
            <Activity size={18} className="text-rose-400" /> 24/7 Monitoring
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-2.5 text-amber-400">
            <Shield size={18} className="text-amber-400 fill-amber-400/20" /> Official Warranty
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-2.5 text-purple-400">
            <CheckCircle2 size={18} className="text-purple-400" /> Certified Compatibility
          </span>
          <span className="text-slate-700">•</span>

          {/* Duplicate set for seamless infinite loop */}
          <span className="flex items-center gap-2.5 text-blue-400">
            <Headphones size={18} className="text-blue-400" /> Local Support Team
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-2.5 text-emerald-400">
            <Wrench size={18} className="text-emerald-400" /> Licensed Installers
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-2.5 text-rose-400">
            <Activity size={18} className="text-rose-400" /> 24/7 Monitoring
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-2.5 text-amber-400">
            <Shield size={18} className="text-amber-400 fill-amber-400/20" /> Official Warranty
          </span>
          <span className="text-slate-700">•</span>
          <span className="flex items-center gap-2.5 text-purple-400">
            <CheckCircle2 size={18} className="text-purple-400" /> Certified Compatibility
          </span>
        </div>
      </div>

      {/* Moving About Us Section */}
      <section id="about-us" className="py-20 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 border-b border-slate-200 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Company Profile
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              SL Office Solutions
            </h2>
            <p className="text-blue-600 font-bold text-sm tracking-wide">
              "Empowering Businesses Through Smart Technology Solutions."
            </p>
          </div>

          {/* About Us Paragraphs */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900 border-l-4 border-blue-600 pl-4">About Us</h3>
            <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
              <p>
                <strong>SL Office Solutions</strong> is a trusted provider of <strong>office automation, information technology, security solutions, and business support services</strong> in Sri Lanka. We specialize in delivering innovative, reliable, and cost-effective technology solutions that help organizations enhance productivity, improve operational efficiency, and achieve sustainable business growth.
              </p>
              <p>
                With a strong customer-focused approach and a team of experienced professionals, we provide end-to-end solutions covering consultation, system design, supply, installation, implementation, maintenance, and after-sales support.
              </p>
              <p className="bg-blue-50/60 p-4 rounded-2xl border border-blue-100/80 font-medium text-slate-800">
                Our commitment to quality, innovation, and service excellence has enabled us to build strong partnerships with government institutions, banking and financial organizations, corporate enterprises, educational institutions, and small and medium-sized businesses across Sri Lanka.
              </p>
            </div>
          </div>

          {/* Vision & Mission Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-8 space-y-4 shadow-xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-black text-white">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To become Sri Lanka's most trusted technology solutions provider by delivering innovative office automation and digital transformation solutions that empower businesses through excellence, reliability, and sustainable growth.
              </p>
            </div>

            {/* Mission */}
            <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-emerald-950 text-white rounded-3xl p-8 space-y-4 shadow-xl border border-slate-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-black text-white">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                To provide high-quality office automation, IT infrastructure, security, and managed technology solutions that improve customer productivity and operational efficiency while creating long-term partnerships through exceptional service, innovation, and integrity.
              </p>
            </div>
          </div>

          {/* Core Services Pillars */}
          <div className="space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900 text-center">Our Core Services & Solutions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                  <Printer size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Office Automation</h4>
                <p className="text-[11px] text-slate-500">MFPs, Laser/Inkjet Printers, Copiers, Scanners & Document Solutions.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-bold">
                  <ShieldCheck size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">CCTV & Security</h4>
                <p className="text-[11px] text-slate-500">IP Surveillance, AI CCTV, NVR/DVR, Access Control & Time Attendance.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center font-bold">
                  <Wifi size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">IT Infrastructure</h4>
                <p className="text-[11px] text-slate-500">Structured Cabling, LAN/WAN Solutions, Network Installation & Support.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center font-bold">
                  <Laptop size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Computer Equipment</h4>
                <p className="text-[11px] text-slate-500">Desktop PCs, Laptops, Monitors, UPS Systems & Office Accessories.</p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                <div className="w-10 h-10 bg-rose-50 text-rose-600 rounded-xl flex items-center justify-center font-bold">
                  <Wrench size={20} />
                </div>
                <h4 className="font-extrabold text-slate-900 text-sm">Technical Support</h4>
                <p className="text-[11px] text-slate-500">Preventive Maintenance, Breakdown Repairs, Spare Parts & On-Site Support.</p>
              </div>
            </div>
          </div>

          {/* Industries We Serve */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-2xl font-extrabold text-slate-900">Industries We Serve</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 text-xs">
              {[
                "Government Institutions",
                "Banking & Financial Services",
                "Corporate Organizations",
                "Educational Institutions",
                "Healthcare Sector",
                "Manufacturing Industries",
                "Hospitality Sector",
                "Retail Businesses",
                "Small & Medium Enterprises (SMEs)"
              ].map((ind, i) => (
                <div key={i} className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100 font-bold text-slate-700">
                  <CheckCircle size={14} className="text-blue-600 shrink-0" />
                  <span>{ind}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Why Choose Us & Core Values */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Why Choose Us */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-xl font-extrabold text-slate-900">Why Choose SL Office Solutions</h3>
              <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Experienced and qualified technical professionals</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Reliable products from globally recognized brands</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Customized solutions based on customer requirements</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Competitive and transparent pricing</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Strong after-sales service commitment</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Long-term customer relationships</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-blue-600 shrink-0 mt-0.5" />
                  <span>Focus on quality, reliability, and continuous improvement</span>
                </li>
              </ul>
            </div>

            {/* Core Values */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-5">
              <h3 className="text-xl font-extrabold text-slate-900">Our Core Values</h3>
              <div className="space-y-3 text-xs">
                <div>
                  <span className="font-extrabold text-blue-700 text-sm block">Integrity</span>
                  <span className="text-slate-600">We conduct our business with honesty, transparency, and strong ethical principles.</span>
                </div>
                <div>
                  <span className="font-extrabold text-emerald-700 text-sm block">Customer Focus</span>
                  <span className="text-slate-600">Customer satisfaction is at the heart of everything we do.</span>
                </div>
                <div>
                  <span className="font-extrabold text-purple-700 text-sm block">Innovation & Quality</span>
                  <span className="text-slate-600">We continuously adopt new technologies and maintain high standards in all products and interactions.</span>
                </div>
                <div>
                  <span className="font-extrabold text-amber-700 text-sm block">Teamwork & Accountability</span>
                  <span className="text-slate-600">We believe in collaboration and take ownership of our commitments to deliver on our promises.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Our Commitment */}
          <div className="bg-gradient-to-r from-blue-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 space-y-4 shadow-xl">
            <h3 className="text-2xl font-extrabold text-white">Our Commitment</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              At <strong>SL Office Solutions</strong>, we are committed to becoming a reliable technology partner for businesses by providing innovative solutions supported by professional service and technical expertise. We focus on understanding customer requirements, delivering value-driven solutions, and maintaining long-term relationships through quality, reliability, and continuous support. Our goal is to help organizations improve productivity, reduce operational costs, and successfully adapt to the rapidly changing digital business environment.
            </p>
          </div>

        </div>
      </section>

      {/* Best Deals Auto-Scrolling Carousel Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                Best Deals
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                We think you will love these! Shop your favorite products now and add them to your collection.
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => scrollDeals('left')}
                className="p-2.5 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-slate-700 hover:text-blue-600 shadow-xs hover:shadow-md transition-all cursor-pointer"
                aria-label="Previous Deals"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scrollDeals('right')}
                className="p-2.5 bg-white border border-slate-200 hover:border-blue-500 rounded-xl text-slate-700 hover:text-blue-600 shadow-xs hover:shadow-md transition-all cursor-pointer"
                aria-label="Next Deals"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Auto-Scrolling Container */}
          <div
            ref={dealsContainerRef}
            onScroll={handleDealsScroll}
            onMouseEnter={() => setIsDealsPaused(true)}
            onMouseLeave={() => setIsDealsPaused(false)}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-4 pt-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {(bestDeals || []).map((prod) => (
              <div
                key={prod.id}
                className="w-[290px] sm:w-[320px] shrink-0 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative"
              >
                <div className="relative overflow-hidden bg-slate-100 h-52 rounded-t-2xl flex items-center justify-center p-4">
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md z-10 animate-pulse">
                    {prod.badge}
                  </span>
                  {prod.discount && (
                    <span className="absolute top-3 right-3 bg-blue-50 text-blue-700 border border-blue-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full z-10">
                      {prod.discount}
                    </span>
                  )}
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">{prod.category}</span>
                    <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {prod.name}
                    </h3>
                    <div className="flex items-center gap-1.5 mt-2 text-amber-400 text-xs font-medium">
                      <Star size={14} className="fill-amber-400" />
                      <span className="text-slate-700 font-bold">{prod.rating}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-slate-900 text-xl">{prod.price}</span>
                      {prod.oldPrice && (
                        <span className="text-slate-400 text-xs line-through block">{prod.oldPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleBuyNow(prod)}
                        className="bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs px-3.5 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => addToCart(prod)}
                        aria-label="Add to cart"
                        className="bg-slate-100 hover:bg-blue-600 text-slate-700 hover:text-white p-2 rounded-xl transition-colors cursor-pointer"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Carousel Progress Indicators */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {BEST_DEALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollToDealIndex(idx)}
                className={`h-2 rounded-full transition-all cursor-pointer ${activeDealIndex === idx ? 'w-6 bg-blue-600' : 'w-2 bg-slate-200 hover:bg-slate-400'
                  }`}
                aria-label={`Scroll to deal ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories */}
      <section id="categories" className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Explore Categories</h2>
            <p className="text-slate-500 text-sm mt-1">Find the equipment and technology suited for your needs</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CATEGORY_CARDS.map((cat, idx) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={idx}
                onClick={() => handleSelectCategory(cat.title)}
                className="bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-blue-300 p-6 rounded-3xl text-left transition-all duration-300 cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <div className={`w-12 h-12 rounded-2xl ${cat.color} flex items-center justify-center border shadow-xs group-hover:scale-110 transition-transform`}>
                      <IconComponent size={24} />
                    </div>
                    <span className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                      {cat.count}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-slate-900 group-hover:text-blue-600 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 gap-1 group-hover:translate-x-1 transition-transform">
                  Explore products <ArrowRight size={14} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured-products" className="py-12 px-6 max-w-7xl mx-auto w-full scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
            <p className="text-slate-500 text-sm mt-1">Handpicked quality hardware for your workspace</p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
            {CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategoryFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 ${activeCategoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div className="relative overflow-hidden bg-slate-100 h-48 flex items-center justify-center p-4">
                  {prod.badge && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
                      {prod.badge}
                    </span>
                  )}
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{prod.category}</span>
                    <h3 className="font-bold text-slate-800 text-sm mt-1 line-clamp-2 hover:text-blue-600 transition-colors">
                      {prod.name}
                    </h3>
                    <div className="flex items-center gap-1 mt-2 text-amber-400 text-xs font-medium">
                      <Star size={14} className="fill-amber-400" />
                      <span className="text-slate-700 ml-1">{prod.rating}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div>
                      <span className="font-extrabold text-slate-900 text-lg">{prod.price}</span>
                      {prod.oldPrice && (
                        <span className="text-slate-400 text-xs line-through block">{prod.oldPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleBuyNow(prod)}
                        className="bg-slate-900 hover:bg-blue-600 text-white font-semibold text-xs px-3 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
                      >
                        Buy Now
                      </button>
                      <button
                        onClick={() => addToCart(prod)}
                        aria-label="Add to cart"
                        className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white p-2 rounded-xl transition-colors cursor-pointer"
                      >
                        <ShoppingCart size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center my-6">
            <h3 className="text-lg font-bold text-slate-800">No products found in "{activeCategoryFilter}"</h3>
            <p className="text-xs text-slate-500 mt-1">Try selecting another category or view all products.</p>
            <button
              onClick={() => setActiveCategoryFilter('All')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md"
            >
              Show All Products
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-slate-400 py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-sm">
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5 font-bold text-xl text-white group">
              <span className="bg-red-600 text-white w-9 h-9 rounded-xl flex items-center justify-center font-extrabold text-base shadow-md group-hover:scale-105 transition-transform">
                SL
              </span>
              <span className="flex flex-col leading-none">
                <span className="font-extrabold text-xl tracking-tight text-white">office</span>
                <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">solutions</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your trusted partner for modern office equipment, IT infrastructure, security, and smart workspace solutions.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-white">Home</Link></li>
              <li><a href="#about-us" className="hover:text-white font-medium text-blue-400">About Us</a></li>
              <li><Link to="/terms-conditions" className="hover:text-white text-emerald-400 font-semibold">Terms & Conditions</Link></li>
              <li><Link to="/signin" className="hover:text-white">Sign In</Link></li>
              <li><Link to="/signup" className="hover:text-white">Sign Up</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Services</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services" className="hover:text-white transition-colors">Our Services</Link></li>
              <li><Link to="/warranty-claim" className="hover:text-white transition-colors">Warranty Claim</Link></li>
              <li><Link to="/repair-center" className="hover:text-white transition-colors">Repair Center</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact Us</h4>
            <ul className="text-xs text-slate-400 space-y-2 leading-relaxed font-medium">
              <li className="flex items-start gap-2 text-slate-300">
                <Building2 size={14} className="text-blue-400 shrink-0 mt-0.5" />
                <span><strong className="text-white font-bold">Address:</strong> No: 608/11 Makola North, Makola.</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone size={14} className="text-blue-400 shrink-0" />
                <span><strong className="text-white font-bold">Hotline:</strong> 070 777 99 33</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone size={14} className="text-emerald-400 shrink-0" />
                <span><strong className="text-white font-bold">Retail Operation:</strong> 071 677 88 33</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Phone size={14} className="text-purple-400 shrink-0" />
                <span><strong className="text-white font-bold">Direct Mobile:</strong> 078 417 7404</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Mail size={14} className="text-amber-400 shrink-0" />
                <span><strong className="text-white font-bold">Email:</strong> <a href="mailto:slofficesolutions@gmail.com" className="hover:underline text-blue-300">slofficesolutions@gmail.com</a></span>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-2">
          <span>© {new Date().getFullYear()} SL Office Solutions. All rights reserved.</span>
          <span className="text-slate-400 font-medium">"Empowering Businesses Through Smart Technology Solutions."</span>
        </div>
      </footer>
    </div>
  );
}
