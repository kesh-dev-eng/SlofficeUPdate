import { useState } from 'react';
import { Phone, X, Headphones } from 'lucide-react';

export default function QuickContactWidget({
  phone = "+94 71 677 8833",
  whatsappNumber = "94719779933",
  whatsappMessage = "Hello SL Office Solutions, I would like to inquire about your products and services."
}) {
  const [isOpen, setIsOpen] = useState(true);

  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
  const telUrl = `tel:${phone.replace(/\s+/g, '')}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-3 font-sans print:hidden">
      {/* Expanded Quick Contact Buttons */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-2.5 animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          {/* WHATSAPP QUICK CONTACT BUTTON */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white px-4 py-3 rounded-2xl shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-105 transition-all duration-200 cursor-pointer border border-emerald-400/30"
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-100 opacity-90">Instant Chat</span>
              <span className="text-xs font-black tracking-wide">WhatsApp Support</span>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.205 1.624zm12.545-21.284c-5.187 0-9.407 4.22-9.409 9.408 0 2.084.685 4.021 1.944 5.584l-1.026 3.748 3.842-1.007c1.503 1.157 3.342 1.767 5.234 1.767 5.187 0 9.407-4.22 9.409-9.408 0-2.513-.978-4.876-2.756-6.654-1.777-1.778-4.14-2.756-6.654-2.756zm5.176 12.355c-.284-.143-1.682-.83-1.942-.924-.26-.096-.45-.143-.639.143-.19.284-.735.924-.901 1.113-.166.19-.332.213-.616.071-.284-.143-1.202-.443-2.289-1.412-.846-.755-1.417-1.688-1.583-1.973-.166-.285-.018-.439.124-.581.128-.127.284-.332.427-.498.143-.166.19-.285.285-.475.095-.19.047-.356-.024-.498-.071-.143-.639-1.541-.876-2.11-.23-.553-.464-.478-.639-.487-.165-.008-.355-.01-.545-.01-.19 0-.498.071-.759.356-.26.285-.995.973-.995 2.374 0 1.401 1.019 2.755 1.162 2.946.143.19 2.006 3.064 4.86 4.296.679.293 1.209.468 1.622.599.683.217 1.306.186 1.796.113.547-.081 1.682-.688 1.919-1.353.237-.665.237-1.235.166-1.353-.07-.118-.26-.19-.544-.332z" />
              </svg>
            </div>
          </a>

          {/* PHONE CALL QUICK CONTACT BUTTON */}
          <a
            href={telUrl}
            className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 py-3 rounded-2xl shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 hover:scale-105 transition-all duration-200 cursor-pointer border border-blue-400/30"
          >
            <div className="flex flex-col text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-200">Call Support</span>
              <span className="text-xs font-black tracking-wide">{phone}</span>
            </div>
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white shrink-0 group-hover:rotate-12 transition-transform">
              <Phone size={18} />
            </div>
          </a>

        </div>
      )}

      {/* FLOATING ACTION TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center justify-center p-3.5 rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer text-white ${
          isOpen
            ? 'bg-slate-900 hover:bg-slate-800 border border-slate-700 ring-2 ring-slate-800'
            : 'bg-gradient-to-r from-emerald-500 to-blue-600 hover:scale-110 shadow-emerald-500/25 ring-4 ring-emerald-400/20'
        }`}
        title={isOpen ? "Minimize Contact Options" : "Quick Contact Support"}
      >
        {/* Pulsing Badge */}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
          </span>
        )}

        {isOpen ? (
          <X size={20} className="transition-transform group-hover:rotate-90" />
        ) : (
          <div className="flex items-center gap-2 px-1">
            <Headphones size={20} className="animate-bounce" />
            <span className="text-xs font-extrabold tracking-wide hidden sm:inline">Quick Contact</span>
          </div>
        )}
      </button>
    </div>
  );
}
