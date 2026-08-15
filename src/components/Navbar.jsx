import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductContext";
import CartDrawer from "./CartDrawer";
import AuthPromptModal from "./AuthPromptModal";
import CheckoutModal from "./CheckoutModal";
import { POPULAR_SEARCHES } from "../data/products";
import {
    Search,
    User,
    ShoppingCart,
    Phone,
    Monitor,
    Laptop,
    Wifi,
    Printer,
    ShieldCheck,
    ChevronRight,
    Menu,
    X,
    LogOut,
    LayoutDashboard,
    TrendingUp
} from "lucide-react";

// Data. Each category has an icon, a label, and one or more columns.
const CATEGORIES = [
    {
        id: "computer-accessories",
        label: "Computer and Accessories",
        icon: Monitor,
        columns: [
            { heading: "Keyboards", items: ["Wired", "Wireless", "Mechanical"] },
            { heading: "Mice", items: ["Wired", "Wireless", "Gaming"] },
            { heading: "Storage", items: ["SSD", "HDD", "Flash Drives"] },
        ],
    },
    {
        id: "laptops",
        label: "Laptop and Accessories",
        icon: Laptop,
        columns: [
            { heading: "Laptops", items: ["Ultrabooks", "Gaming Laptops", "Business"] },
            { heading: "Accessories", items: ["Bags", "Chargers", "Stands"] },
        ],
    },
    {
        id: "networking",
        label: "Networking",
        icon: Wifi,
        columns: [{ heading: "Networking", items: ["Routers", "Switches", "Access Points"] }],
    },
    {
        id: "office-automation",
        label: "Office Automation",
        icon: Printer,
        columns: [{ heading: "Printers", items: ["Inkjet", "Laser", "Toner Cartridges"] }],
    },
    {
        id: "security-solutions",
        label: "Security Solutions",
        icon: ShieldCheck,
        columns: [
            {
                heading: "CCTV",
                items: [
                    "CCTV Accessories",
                    "HDCVI Camera",
                    "Network Camera",
                    "CCTV Cables",
                    "XVR/DVR",
                    "NVR",
                    "Camera Kits",
                    "Surveillance Hard Disk",
                    "PTZ Camera",
                    "Video Intercom",
                ],
            },
            {
                heading: "Alarms & Detectors",
                items: [
                    "Alarm Kits",
                    "Alarm Accessories",
                    "Fire & Smoke",
                    "Alarm Hub",
                    "Metal Detector",
                    "Thermometer",
                ],
            },
            { heading: "Access Control", items: [] },
        ],
    },
];

const NAV_LINKS = [
    { id: "categories", label: "Categories", mega: true },
    { id: "about-us", label: "About Us", href: "#about-us" },
    {
        id: "our-service",
        label: "Our Services",
        href: "/services",
        items: [
            { label: "All Services Overview", href: "/services" },
            { label: "Warranty Claim Portal", href: "/warranty-claim" },
            { label: "Hardware Repair Center", href: "/repair-center" },
            { label: "On-Site Installation Service", href: "/installation-service" },
            { label: "Delivery & Returns Policy", href: "/delivery-returns" },
            { label: "CCTV Security Installation", href: "/services#cctv-security" },
            { label: "Annual Maintenance Contracts", href: "/services#corporate-amc" },
        ],
    },
    {
        id: "contact",
        label: "Contact Us",
        href: "/services#request-quote",
        items: [
            { label: " Service Request & Inquiry Form", href: "/services#request-quote" },
            { label: " Call Hotline", href: "tel:+94716778833" },
            { label: " WhatsApp Chat", href: "https://wa.me/94719779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20services." },
        ],
    },
];

function NavLink({ item, isOpen, onEnter, onLeave }) {
    const hasDropdown = Boolean(item.items && item.items.length);
    const isInternal = item.href && item.href.startsWith('/');

    const renderLinkContent = () => (
        <>
            {item.label}
            {hasDropdown && (
                <ChevronRight
                    size={13}
                    className={`mt-[1px] transition-transform ${isOpen ? "rotate-90 text-blue-600" : "rotate-90 text-slate-400"}`}
                />
            )}
        </>
    );

    return (
        <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
            {isInternal ? (
                <Link
                    to={item.href}
                    className="flex items-center gap-1 text-[15px] font-medium text-slate-700 hover:text-blue-600 transition-colors py-1 cursor-pointer"
                >
                    {renderLinkContent()}
                </Link>
            ) : (
                <a
                    href={item.href || '#'}
                    className="flex items-center gap-1 text-[15px] font-medium text-slate-700 hover:text-blue-600 transition-colors py-1 cursor-pointer"
                >
                    {renderLinkContent()}
                </a>
            )}

            {hasDropdown && isOpen && (
                <div className="absolute left-1/2 top-full z-50 mt-3 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-slate-200 bg-white py-2 shadow-2xl">
                    {item.items.map((sub) => {
                        const isSubInternal = sub.href && sub.href.startsWith('/');
                        return isSubInternal ? (
                            <Link
                                key={sub.label}
                                to={sub.href}
                                className="block px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                            >
                                {sub.label}
                            </Link>
                        ) : (
                            <a
                                key={sub.label}
                                href={sub.href}
                                target={sub.href.startsWith('http') ? '_blank' : '_self'}
                                rel={sub.href.startsWith('http') ? 'noopener noreferrer' : ''}
                                className="block px-4 py-2 text-[13px] font-semibold text-slate-600 hover:bg-slate-50 hover:text-blue-600 transition-colors"
                            >
                                {sub.label}
                            </a>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default function Navbar({ onSelectCategory }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);
    const [openLinkId, setOpenLinkId] = useState(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const closeTimer = useRef(null);
    const linkCloseTimer = useRef(null);
    const searchRef = useRef(null);

    const { session, signOut, signOutUser } = useAuth() || {};
    const { totalItems, setIsCartOpen, addToCart } = useCart();
    const { products } = useProducts();
    const navigate = useNavigate();

    const handleCategoryClick = (label) => {
        setMenuOpen(false);
        setMobileMenuOpen(false);
        if (onSelectCategory) {
            onSelectCategory(label);
        }
        const elem = document.getElementById("featured-products");
        if (elem) {
            elem.scrollIntoView({ behavior: "smooth" });
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsSearchFocused(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const matchingProducts = searchQuery.trim() === "" ? [] : (products || []).filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handleSignOut = async () => {
        const fn = signOut || signOutUser;
        if (fn) await fn();
        setUserMenuOpen(false);
        navigate("/signin");
    };

    const openMenu = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
        setMenuOpen(true);
    };

    const scheduleClose = () => {
        closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
    };

    const openLink = (id) => {
        if (linkCloseTimer.current) clearTimeout(linkCloseTimer.current);
        setOpenLinkId(id);
    };

    const scheduleLinkClose = () => {
        linkCloseTimer.current = setTimeout(() => setOpenLinkId(null), 150);
    };

    const active = CATEGORIES.find((c) => c.id === activeCategory) || CATEGORIES[0];

    return (
        <header style={{ fontFamily: "Inter, system-ui, sans-serif" }} className="w-full bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
            {/* Top bar */}
            <div className="w-full border-b border-slate-100">
                <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 sm:px-6 py-3">
                    {/* Left: Mobile Menu button & Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <Link to="/" className="flex items-center shrink-0">
                            <img
                                src="https://i.ibb.co/JwdVFJ7F/8ae29306a7134459aa19ca39ad56cdba.jpg"
                                alt="SL Office Solutions Logo"
                                className="h-10 sm:h-12 w-auto object-contain rounded-md"
                            />
                        </Link>
                    </div>

                    {/* Inline Search Bar with Autocomplete Suggestions */}
                    <div className="flex-1 max-w-md mx-3 sm:mx-6 relative" ref={searchRef}>
                        <div className="relative flex items-center w-full">
                            <input
                                type="text"
                                value={searchQuery}
                                onFocus={() => setIsSearchFocused(true)}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value);
                                    setIsSearchFocused(true);
                                }}
                                placeholder="Search products, laptops, security..."
                                className="w-full bg-slate-100 text-sm text-slate-800 rounded-full pl-10 pr-10 py-2 border border-slate-200 focus:border-blue-500 focus:bg-white focus:outline-none transition-all shadow-xs"
                            />
                            <Search size={18} className="absolute left-3.5 text-slate-400 pointer-events-none" />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Search Suggestions Dropdown */}
                        {isSearchFocused && (
                            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-50 animate-in fade-in duration-150">
                                {searchQuery.trim() === "" ? (
                                    <div className="p-4 space-y-3">
                                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                                            <TrendingUp size={14} className="text-blue-500" />
                                            Popular Searches
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {POPULAR_SEARCHES.map((term) => (
                                                <button
                                                    key={term}
                                                    onClick={() => {
                                                        setSearchQuery(term);
                                                        setIsSearchFocused(true);
                                                    }}
                                                    className="bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-700 text-xs px-3 py-1.5 rounded-full transition-colors cursor-pointer"
                                                >
                                                    {term}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="px-4 py-2 bg-slate-50 border-b border-slate-100 text-xs font-semibold text-slate-500 flex justify-between">
                                            <span>Search Results</span>
                                            <span>{matchingProducts.length} items found</span>
                                        </div>

                                        {matchingProducts.length > 0 ? (
                                            <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                                                {matchingProducts.map((prod) => (
                                                    <div
                                                        key={prod.id}
                                                        className="p-3 hover:bg-slate-50 flex items-center justify-between gap-3 transition-colors cursor-pointer group"
                                                    >
                                                        <div className="flex items-center gap-3 min-w-0">
                                                            <img
                                                                src={prod.image}
                                                                alt={prod.name}
                                                                className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0 bg-white"
                                                            />
                                                            <div className="truncate">
                                                                <p className="text-xs font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">
                                                                    {prod.name}
                                                                </p>
                                                                <span className="text-[11px] text-slate-400 font-medium">
                                                                    {prod.category} • <strong className="text-slate-700">{prod.price}</strong>
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                addToCart(prod);
                                                                setIsSearchFocused(false);
                                                            }}
                                                            className="bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors cursor-pointer shrink-0"
                                                        >
                                                            + Add
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="p-6 text-center text-xs text-slate-500">
                                                No products found for "<strong className="text-slate-700">{searchQuery}</strong>".
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Right side nav & icons */}
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        {/* Desktop nav links */}
                        <nav className="hidden lg:flex items-center gap-6 relative">
                            {NAV_LINKS.map((link) =>
                                link.mega ? (
                                    <div
                                        key={link.id}
                                        onMouseEnter={openMenu}
                                        onMouseLeave={scheduleClose}
                                        className="relative"
                                    >
                                        <button className="flex items-center gap-1 text-[15px] font-medium text-slate-700 hover:text-blue-600 transition-colors cursor-pointer py-1">
                                            {link.label}
                                            <ChevronRight
                                                size={13}
                                                className={`mt-[1px] rotate-90 transition-transform duration-200 ${menuOpen ? "text-blue-600 rotate-270" : "text-slate-400"}`}
                                            />
                                        </button>
                                    </div>
                                ) : (
                                    <NavLink
                                        key={link.id}
                                        item={link}
                                        isOpen={openLinkId === link.id}
                                        onEnter={() => openLink(link.id)}
                                        onLeave={scheduleLinkClose}
                                    />
                                )
                            )}
                        </nav>

                        {/* Quick Contact Buttons (WhatsApp & Phone) */}
                        <div className="hidden md:flex items-center gap-2 border-r border-slate-200 pr-3 mr-1">
                            <a
                                href="https://wa.me/94719779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20products."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all border border-emerald-200"
                                title="WhatsApp Support"
                            >
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                WhatsApp
                            </a>
                            <a
                                href="tel:+94716778833"
                                className="flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full text-xs font-extrabold transition-all border border-blue-200"
                                title="Call Support"
                            >
                                <Phone size={13} className="text-blue-600" />
                                +94 71 677 8833
                            </a>
                        </div>

                        {/* Account dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                aria-label="Account"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 p-1.5 rounded-full hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                                <User size={20} />
                                {session?.user && (
                                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                )}
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-60 bg-white py-2 rounded-xl shadow-xl border border-slate-200 z-50 text-sm">
                                    {session?.user ? (
                                        <>
                                            <div className="px-4 py-2 border-b border-slate-100">
                                                <p className="text-xs text-slate-500 font-medium">Signed in as</p>
                                                <p className="text-xs font-semibold text-slate-800 truncate">
                                                    {localStorage.getItem(`profile_nickname_${session?.user?.id || 'guest'}`) || session.user.displayName || session.user.email}
                                                </p>
                                            </div>
                                            <button
                                                onClick={handleSignOut}
                                                className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 text-left cursor-pointer text-xs font-bold"
                                            >
                                                <LogOut size={16} />
                                                Sign Out
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                to="/signin"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="block px-4 py-2 text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium"
                                            >
                                                Sign In
                                            </Link>
                                            <Link
                                                to="/signup"
                                                onClick={() => setUserMenuOpen(false)}
                                                className="block px-4 py-2 text-blue-600 hover:bg-blue-50 font-medium"
                                            >
                                                Sign Up
                                            </Link>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Shopping Cart Icon (Final Item on Right) */}
                        <button
                            aria-label="Cart"
                            onClick={() => setIsCartOpen(true)}
                            className="relative text-blue-600 hover:text-blue-700 p-2 rounded-full hover:bg-blue-50 transition-colors cursor-pointer"
                        >
                            <ShoppingCart size={20} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu drawer */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-4 shadow-xl max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                    {/* Quick Contact Buttons for Mobile */}
                    <div className="grid grid-cols-2 gap-2 border-b border-slate-100 pb-3">
                        <a
                            href="https://wa.me/94719779933?text=Hello%20SL%20Office%20Solutions,%20I%20would%20like%20to%20inquire%20about%20your%20products."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 py-2.5 px-3 rounded-xl text-xs font-bold border border-emerald-200"
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            WhatsApp
                        </a>
                        <a
                            href="tel:+94716778833"
                            className="flex items-center justify-center gap-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 py-2.5 px-3 rounded-xl text-xs font-bold border border-blue-200"
                        >
                            <Phone size={13} className="text-blue-600" />
                            Call Support
                        </a>
                    </div>

                    <nav className="flex flex-col gap-1 text-sm font-semibold text-slate-800">
                        <Link to="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2.5 rounded-xl hover:bg-slate-50 flex items-center justify-between">
                            <span>Home</span>
                            <ChevronRight size={14} className="text-slate-400" />
                        </Link>
                        
                        <div className="py-1">
                            <span className="px-3 text-[11px] font-extrabold uppercase text-slate-400 tracking-wider">Services & Solutions</span>
                            <div className="mt-1 space-y-0.5 pl-2">
                                <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 block font-medium">
                                    All Services Overview
                                </Link>
                                <Link to="/warranty-claim" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 block font-medium">
                                    Warranty Claim Portal
                                </Link>
                                <Link to="/repair-center" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 block font-medium">
                                    Hardware Repair Center
                                </Link>
                                <Link to="/installation-service" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 block font-medium">
                                    On-Site Installation Service
                                </Link>
                                <Link to="/delivery-returns" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-50 block font-medium">
                                    Delivery & Returns Policy
                                </Link>
                            </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100 space-y-1">
                            {session?.user ? (
                                <>
                                    <button onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="w-full text-left px-3 py-2.5 rounded-xl text-red-600 hover:bg-red-50 font-bold block cursor-pointer">
                                        Sign Out ({session.user.displayName || session.user.email.split('@')[0]})
                                    </button>
                                </>
                            ) : (
                                <div className="grid grid-cols-2 gap-2 pt-1">
                                    <Link to="/signin" onClick={() => setMobileMenuOpen(false)} className="text-center px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-700 hover:bg-slate-50">
                                        Sign In
                                    </Link>
                                    <Link to="/signup" onClick={() => setMobileMenuOpen(false)} className="text-center px-3 py-2.5 rounded-xl bg-blue-600 font-bold text-white hover:bg-blue-700 shadow-xs">
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            )}

            {/* Mega menu flyout (Desktop) */}
            <div className="relative mx-auto max-w-[1400px]">
                {menuOpen && (
                    <div
                        onMouseEnter={openMenu}
                        onMouseLeave={scheduleClose}
                        className="absolute left-6 top-0 z-50 flex overflow-hidden rounded-b-xl border border-slate-200 bg-white shadow-2xl"
                    >
                        {/* Left: category list */}
                        <div className="w-72 max-h-[420px] overflow-y-auto border-r border-slate-100 py-2">
                            {CATEGORIES.map((cat) => {
                                const Icon = cat.icon;
                                const isActive = cat.id === activeCategory;
                                return (
                                    <button
                                        key={cat.id}
                                        onMouseEnter={() => setActiveCategory(cat.id)}
                                        onClick={() => handleCategoryClick(cat.label)}
                                        className={`flex w-[92%] mx-auto items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-[14px] transition-colors cursor-pointer ${isActive
                                            ? "bg-blue-50 text-blue-700 ring-1 ring-blue-200 font-semibold"
                                            : "text-slate-700 hover:bg-slate-50"
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                                            <span className="uppercase tracking-wide text-[12.5px]">
                                                {cat.label}
                                            </span>
                                        </span>
                                        <ChevronRight
                                            size={14}
                                            className={isActive ? "text-blue-500" : "text-slate-300"}
                                        />
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right: subcategory columns */}
                        <div className="w-[720px] max-h-[420px] overflow-y-auto p-6">
                            <div className="grid grid-cols-3 gap-x-8 gap-y-6">
                                {active.columns.map((col, i) => (
                                    <div key={i}>
                                        <button
                                            onClick={() => handleCategoryClick(col.heading)}
                                            className="text-[13px] font-bold uppercase tracking-wide text-blue-700 underline decoration-blue-200 underline-offset-4 hover:text-blue-800 text-left cursor-pointer"
                                        >
                                            {col.heading}
                                        </button>
                                        {col.items.length > 0 && (
                                            <ul className="mt-2 space-y-1.5">
                                                {col.items.map((item) => (
                                                    <li key={item}>
                                                        <button
                                                            onClick={() => handleCategoryClick(item)}
                                                            className="text-[13.5px] text-slate-600 hover:text-blue-600 text-left cursor-pointer"
                                                        >
                                                            {item}
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Cart, Auth Prompt, and Checkout Modals */}
            <CartDrawer />
            <AuthPromptModal />
            <CheckoutModal />
        </header>
    );
}
