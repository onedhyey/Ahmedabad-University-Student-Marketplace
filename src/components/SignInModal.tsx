import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { X, HelpCircle, ShieldCheck, LogIn, AlertCircle, Info, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { signInWithGoogleAU } from '../lib/firebase';

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (user: User) => void;
  onShowDomainWarning: () => void;
}

export const SignInModal: React.FC<SignInModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  onShowDomainWarning
}) => {
  const [loading, setLoading] = useState(false);
  const [showAccountHelp, setShowAccountHelp] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithGoogleAU();
      if (!res.isAllowed || !res.user) {
        onClose();
        onShowDomainWarning();
      } else {
        if (onSuccess) onSuccess(res.user);
        onClose();
      }
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        console.error("Sign in error:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B3A5C]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAFBFC] border-3 border-[#1B3A5C] rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white border-2 border-[#1B3A5C] p-1.5 rounded-full text-[#1B3A5C] hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close sign in modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-11 h-11 rounded-2xl bg-[#800020] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-[#1B3A5C] tracking-tight">
                AUSM Sign In
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">
              Ahmedabad University Student Marketplace
            </p>
          </div>
        </div>

        {/* 2. Notice Box Before Sign in Button */}
        <div className="bg-[#C9E2F5]/30 border-2 border-[#1B3A5C] rounded-2xl p-4 mb-5 shadow-xs relative">
          <div className="flex items-start gap-2.5 mb-1.5">
            <div className="w-5 h-5 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
              !
            </div>
            <h4 className="font-extrabold text-sm text-[#1B3A5C] leading-snug">
              Use your Ahmedabad University Google account to continue.
            </h4>
          </div>
          <p className="text-xs font-medium text-[#1B3A5C]/90 leading-relaxed pl-7">
            Only <span className="font-black underline decoration-[#800020] text-[#800020]">@ahduni.edu.in</span> email addresses are allowed to access AUSM. If you sign in with any other Google account, access will be denied.
          </p>
        </div>

        {/* 1 & 2. Prominent Sign In With Google Button */}
        <div className="space-y-3 mb-4">
          <button
            onClick={handleSignIn}
            disabled={loading}
            className="w-full bg-[#800020] hover:bg-[#600018] text-white font-extrabold text-sm py-3.5 px-5 rounded-full border-2 border-[#800020] hover:border-[#600018] transition-all active:scale-[0.99] shadow-md hover:shadow-lg flex items-center justify-center gap-3 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Opening Google Account Chooser...</span>
              </>
            ) : (
              <>
                {/* Google Icon SVG */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.1 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.3-.8-.4-1.8-.4-2.8s.1-2 .4-2.8L1.9 6.3C.7 8.7 0 10.3 0 12s.7 3.3 1.9 5.7l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.1-6.4-5.2L1.9 16C3.7 19.7 7.5 23 12 23z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </>
            )}
          </button>
        </div>

        {/* 3. Small Help Icon & Muted Text Block */}
        <div className="border-t border-slate-200 pt-3.5">
          <button
            type="button"
            onClick={() => setShowAccountHelp(!showAccountHelp)}
            className="w-full text-left flex items-center justify-between text-xs font-bold text-slate-600 hover:text-[#1B3A5C] transition-colors cursor-pointer py-1 group"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#800020] group-hover:scale-110 transition-transform shrink-0" />
            </span>
            {showAccountHelp ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {/* Muted Text Block */}
          {showAccountHelp ? (
            <div className="mt-2 p-3 bg-slate-100/80 border border-slate-300 rounded-2xl text-[11px] font-medium text-slate-600 space-y-1.5 leading-relaxed animate-in fade-in duration-150">
              <p>
                Signed in with the wrong Google account earlier? Your browser may automatically reuse that account.
              </p>
              <p className="font-semibold text-slate-700">
                To choose a different account, clear this website's cookies/site data and then try signing in again.
              </p>
            </div>
          ) : (
            <p className="mt-1 text-[11px] font-normal text-slate-500 pl-5.5 leading-tight">
              Click the help icon if your browser reuses an old account.
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
