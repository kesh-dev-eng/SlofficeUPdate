import { useCart } from '../context/CartContext';
import { ShoppingCart, X, Plus, Minus, Trash2, ArrowRight, MessageSquare } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    setIsCheckoutOpen,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-xl text-white">
                <ShoppingCart size={20} />
              </div>
              <div>
                <h2 className="font-bold text-lg leading-tight">Your Cart</h2>
                <p className="text-xs text-slate-400">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="w-16 h-16 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center">
                  <ShoppingCart size={32} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 text-lg">Your cart is empty</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Explore our products and add tech & office gear to your cart.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl transition-all cursor-pointer text-sm"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-200 items-center justify-between"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-xl border border-slate-200 shrink-0 bg-white"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 text-xs sm:text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-blue-600 font-bold text-sm mt-0.5">{item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-white border border-slate-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded-l-lg cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded-r-lg cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                    aria-label="Remove item"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-200 bg-white space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Subtotal</span>
                <span className="font-extrabold text-slate-900 text-xl">LKR {totalPrice.toFixed(2)}</span>
              </div>
              <p className="text-xs text-slate-400">Direct WhatsApp invoice dispatch & delivery confirmation.</p>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold py-3.5 px-4 rounded-xl shadow-lg hover:shadow-emerald-500/25 transition-all cursor-pointer text-sm"
              >
                <MessageSquare size={18} /> Order via WhatsApp (Auto Invoice)
              </button>

              <button
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-4 rounded-xl transition-all cursor-pointer text-xs"
              >
                Other Checkout Options <ArrowRight size={14} />
              </button>

              <button
                onClick={clearCart}
                className="w-full text-xs text-slate-400 hover:text-red-500 font-medium text-center transition-colors cursor-pointer pt-1"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
