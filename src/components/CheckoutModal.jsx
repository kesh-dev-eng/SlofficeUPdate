import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Truck, X, ShoppingBag, MessageSquare, ExternalLink, AlertTriangle } from 'lucide-react';

const COD_MAX_LIMIT = 50000;

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, totalPrice, clearCart } = useCart();
  const { session } = useAuth();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: session?.user?.displayName || session?.user?.email?.split('@')[0] || '',
    address: '',
    phone: '',
    paymentMethod: 'whatsapp', // Default payment method for direct small business ordering
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappInvoiceUrl, setWhatsappInvoiceUrl] = useState('');

  const [completedOrderIdSuffix] = useState(() => Math.floor(100000 + Math.random() * 900000));

  const isCodAllowed = totalPrice <= COD_MAX_LIMIT;

  // Reset payment method if COD was selected but total exceeds LKR 50,000
  useEffect(() => {
    if (!isCodAllowed && shippingInfo.paymentMethod === 'cod') {
      setShippingInfo(prev => ({ ...prev, paymentMethod: 'whatsapp' }));
    }
  }, [totalPrice, isCodAllowed, shippingInfo.paymentMethod]);

  // Pre-fill default shipping address and nickname from localStorage
  useEffect(() => {
    if (!isCheckoutOpen) return;

    const storageKey = `profile_address_${session?.user?.id || 'guest'}`;
    const nicknameKey = `profile_nickname_${session?.user?.id || 'guest'}`;

    const savedAddress = localStorage.getItem(storageKey);
    const savedNickname = localStorage.getItem(nicknameKey);

    let defaultName = savedNickname || session?.user?.displayName || session?.user?.email?.split('@')[0] || '';
    let defaultAddress = '';
    let defaultPhone = '';

    if (savedAddress) {
      try {
        const parsed = JSON.parse(savedAddress);
        if (parsed.street && parsed.city) {
          defaultAddress = `${parsed.street}, ${parsed.city}`;
        } else if (parsed.street) {
          defaultAddress = parsed.street;
        } else if (parsed.city) {
          defaultAddress = parsed.city;
        }

        if (parsed.phone) {
          defaultPhone = parsed.phone;
        }
      } catch (_e) {}
    }

    setShippingInfo((prev) => {
      const nextName = prev.fullName || defaultName;
      const nextAddress = prev.address || defaultAddress;
      const nextPhone = prev.phone || defaultPhone;
      if (prev.fullName === nextName && prev.address === nextAddress && prev.phone === nextPhone) {
        return prev;
      }
      return {
        ...prev,
        fullName: nextName,
        address: nextAddress,
        phone: nextPhone,
      };
    });
  }, [isCheckoutOpen, session?.user]);

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderPlaced(false);
  };

  const generateWhatsAppMessage = (orderId, customerName, phone, address, paymentLabel) => {
    const itemsList = cart.map((item, idx) => `${idx + 1}. *${item.name}* (x${item.quantity}) - ${item.price}`).join('\n');
    const orderDate = new Date().toISOString().split('T')[0];

    return `🛒 *SL OFFICE SOLUTIONS - NEW ORDER INVOICE*
----------------------------------------
*Order ID:* #SL-${orderId}
*Date:* ${orderDate}

*Customer Information:*
👤 *Name:* ${customerName}
📞 *Phone:* ${phone}
📍 *Address:* ${address}
💳 *Payment Method:* ${paymentLabel}

*Itemized Order Invoice:*
${itemsList}

----------------------------------------
💰 *Total Amount:* LKR ${totalPrice.toFixed(2)}
----------------------------------------
Hello SL Office Solutions, I have placed this order on your store. Please process and confirm my order. Thank you!`;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (shippingInfo.paymentMethod === 'cod' && !isCodAllowed) {
      alert("Cash on Delivery (COD) is available only for orders up to LKR 50,000. Please select Direct WhatsApp Order.");
      return;
    }

    setIsSubmitting(true);

    // Save Default Shipping Address for future orders
    try {
      const storageKey = `profile_address_${session?.user?.id || 'guest'}`;
      const addressObj = {
        street: shippingInfo.address,
        city: '',
        phone: shippingInfo.phone
      };
      localStorage.setItem(storageKey, JSON.stringify(addressObj));
    } catch (_e) {}

    let paymentMethodLabel = 'Direct WhatsApp Order';
    if (shippingInfo.paymentMethod === 'cod') {
      paymentMethodLabel = 'Cash on Delivery';
    }

    const orderIdCode = completedOrderIdSuffix;

    const newOrder = {
      id: `ORD-${orderIdCode}`,
      customer: shippingInfo.fullName || session?.user?.email?.split('@')[0] || "Customer",
      email: session?.user?.email || "customer@sloffice.com",
      phone: shippingInfo.phone || "+94 77 123 4567",
      address: shippingInfo.address || "Main Street, Colombo",
      product: cart.map(i => `${i.name} (x${i.quantity})`).join(', ') || "Office Automation Tech",
      total: `LKR ${totalPrice.toFixed(2)}`,
      date: new Date().toISOString().split('T')[0],
      status: "Pending",
      payment: paymentMethodLabel,
      bankSlipUrl: null,
      bankSlipName: null,
      bankSlipFileType: null,
      user_id: session?.user?.id || null,
      created_at: new Date().toISOString()
    };

    // Construct WhatsApp message & URL
    const waText = generateWhatsAppMessage(
      orderIdCode,
      newOrder.customer,
      newOrder.phone,
      newOrder.address,
      paymentMethodLabel
    );
    const waUrl = `https://wa.me/94719779933?text=${encodeURIComponent(waText)}`;
    setWhatsappInvoiceUrl(waUrl);

    // Save to MongoDB Atlas database & local cache
    try {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrder)
      });
    } catch (_e) {}

    try {
      const existingOrders = JSON.parse(localStorage.getItem('admin_db_orders') || '[]');
      const updatedOrders = [newOrder, ...existingOrders];
      localStorage.setItem('admin_db_orders', JSON.stringify(updatedOrders));
    } catch (_e) {}

    // Automatically open WhatsApp with prefilled invoice message
    window.open(waUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderPlaced(true);
      clearCart();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {orderPlaced ? (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={40} />
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900">Order Placed Successfully!</h3>
            <p className="text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
              Your order invoice has been generated and dispatched to our WhatsApp team.
            </p>

            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Order ID:</span>
                <span className="font-mono font-bold text-slate-900">#SL-{completedOrderIdSuffix}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Status:</span>
                <span className="font-bold text-emerald-600">Pending WhatsApp Confirmation</span>
              </div>
            </div>

            {whatsappInvoiceUrl && (
              <a
                href={whatsappInvoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer text-sm"
              >
                <MessageSquare size={18} /> Open WhatsApp & Send Invoice <ExternalLink size={14} />
              </a>
            )}

            <button
              onClick={handleClose}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-sm"
            >
              Back to Store
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl">
                <ShoppingBag size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Checkout & Order</h3>
                <p className="text-xs text-slate-500">Complete your shipping & automated WhatsApp invoice details</p>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 font-semibold uppercase tracking-wider">
                <span>Items ({cart.length})</span>
                <span>Subtotal</span>
              </div>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-slate-800">
                  <span className="truncate max-w-[240px]">
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-semibold">{item.price}</span>
                </div>
              ))}
              <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-bold text-slate-900">
                <span>Total Amount:</span>
                <span className="text-blue-600 text-base">LKR {totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Delivery Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                  placeholder="123 Main Street, Suite 400, Colombo"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Phone Number (WhatsApp)
                </label>
                <input
                  type="tel"
                  required
                  value={shippingInfo.phone}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })}
                  placeholder="071 677 8833"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:bg-white focus:border-blue-500 outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setShippingInfo({ ...shippingInfo, paymentMethod: 'whatsapp' })}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      shippingInfo.paymentMethod === 'whatsapp'
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-xs ring-2 ring-emerald-400/20'
                        : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <MessageSquare size={20} className="text-emerald-600" />
                    <span className="text-xs text-center leading-tight">WhatsApp Direct</span>
                  </button>

                  <button
                    type="button"
                    disabled={!isCodAllowed}
                    onClick={() => {
                      if (!isCodAllowed) {
                        alert("Cash on Delivery (COD) is available only for orders up to LKR 50,000.");
                        return;
                      }
                      setShippingInfo({ ...shippingInfo, paymentMethod: 'cod' });
                    }}
                    className={`flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                      !isCodAllowed
                        ? 'opacity-40 bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        : shippingInfo.paymentMethod === 'cod'
                        ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-xs ring-2 ring-blue-400/20'
                        : 'border-slate-300 bg-slate-50 text-slate-700 hover:bg-slate-100'
                    }`}
                    title={!isCodAllowed ? "Cash on Delivery is limited to orders up to LKR 50,000" : "Cash on Delivery"}
                  >
                    <Truck size={20} className={!isCodAllowed ? "text-slate-400" : "text-blue-600"} />
                    <span className="text-xs text-center leading-tight">
                      COD {!isCodAllowed && '(Max 50k)'}
                    </span>
                  </button>
                </div>

                {/* COD Limit Warning if total exceeds LKR 50,000 */}
                {!isCodAllowed && (
                  <div className="mb-3 p-2.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2 text-[11px] text-amber-800 font-medium">
                    <AlertTriangle size={15} className="text-amber-600 shrink-0" />
                    <span>Cash on Delivery is only available for orders up to LKR 50,000 (Current total: LKR {totalPrice.toFixed(2)}).</span>
                  </div>
                )}

                {/* WhatsApp Info Banner */}
                {shippingInfo.paymentMethod === 'whatsapp' && (
                  <div className="bg-emerald-50 p-3.5 rounded-2xl border border-emerald-200 text-xs space-y-1 text-emerald-900">
                    <p className="font-extrabold flex items-center gap-1.5 text-emerald-800">
                      <MessageSquare size={15} className="text-emerald-600 shrink-0" />
                      Direct WhatsApp Order & Auto Invoice
                    </p>
                    <p className="text-[11px] text-emerald-700 leading-relaxed">
                      Clicking submit will instantly compile your itemized invoice and open WhatsApp (+94 71 977 9933) to send your order for quick processing.
                    </p>
                  </div>
                )}

                {/* COD Info Banner */}
                {shippingInfo.paymentMethod === 'cod' && (
                  <div className="bg-blue-50 p-3.5 rounded-2xl border border-blue-200 text-xs space-y-1 text-blue-900">
                    <p className="font-extrabold flex items-center gap-1.5 text-blue-800">
                      <Truck size={15} className="text-blue-600 shrink-0" />
                      Cash on Delivery (Available up to LKR 50,000)
                    </p>
                    <p className="text-[11px] text-blue-700 leading-relaxed">
                      Pay cash when products are delivered to your door. An itemized invoice confirmation will also be dispatched via WhatsApp.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer disabled:opacity-50 mt-4 text-sm"
              >
                <MessageSquare size={18} />
                {isSubmitting ? 'Generating Invoice...' : `Send Order & Invoice via WhatsApp (LKR ${totalPrice.toFixed(2)})`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
