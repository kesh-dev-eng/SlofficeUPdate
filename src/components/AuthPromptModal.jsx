import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Lock, LogIn, UserPlus, X } from 'lucide-react';

export default function AuthPromptModal() {
  const { isAuthPromptOpen, setIsAuthPromptOpen, pendingProduct } = useCart();
  const navigate = useNavigate();

  if (!isAuthPromptOpen) return null;

  const handleSignIn = () => {
    setIsAuthPromptOpen(false);
    navigate('/signin');
  };

  const handleSignUp = () => {
    setIsAuthPromptOpen(false);
    navigate('/signup');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 sm:p-8">
        <button
          onClick={() => setIsAuthPromptOpen(false)}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-amber-100 shadow-xs">
          <Lock size={28} />
        </div>

        <div className="text-center space-y-2 mb-6">
          <h3 className="text-xl font-bold text-slate-900">Sign In Required</h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            New visitors cannot add items to cart or make purchases. Please sign in or create an account to add{" "}
            <span className="font-semibold text-slate-900">
              {pendingProduct ? pendingProduct.name : "items"}
            </span>{" "}
            to your cart.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleSignIn}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <LogIn size={18} />
            Sign In to Continue
          </button>

          <button
            onClick={handleSignUp}
            className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-4 rounded-xl transition-all cursor-pointer"
          >
            <UserPlus size={18} />
            Create an Account
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsAuthPromptOpen(false)}
            className="text-xs text-slate-400 hover:text-slate-600 underline font-medium cursor-pointer"
          >
            Continue browsing as guest
          </button>
        </div>
      </div>
    </div>
  );
}
