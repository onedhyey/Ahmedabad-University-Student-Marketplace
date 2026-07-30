import React, { useState } from 'react';
import { X, ShieldAlert, HelpCircle, ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { signInWithGoogleAU } from '../lib/firebase';

interface DomainErrorToastProps {
  onClose: () => void;
  onSuccess?: () => void;
}

export const DomainErrorToast: React.FC<DomainErrorToastProps> = ({ onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [showAccountHelp, setShowAccountHelp] = useState(true);

  const handleTryAnotherAccount = async () => {
    setLoading(true);
    try {
      const res = await signInWithGoogleAU();
      if (res.isAllowed && res.user) {
        if (onSuccess) onSuccess();
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
      <div className="bg-[#FAFBFC] border-3 border-[#1B3A5C] text-[#1B3A5C] rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white border-2 border-[#1B3A5C] p-1.5 rounded-full text-[#1B3A5C] hover:bg-slate-100 transition-colors cursor-pointer"
          title="Close notice"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Notice Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-[#800020] text-white flex items-center justify-center font-bold shadow-xs shrink-0">
            <ShieldAlert className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#1B3A5C] leading-tight">
              Access Restricted to AU Students
            </h3>
            <p className="text-xs text-slate-500 font-semibold">
              Official Ahmedabad University Domain Required
            </p>
          </div>
        </div>

        {/* 2. Notice Box */}
        <div className="bg-amber-50 border-2 border-[#800020] rounded-2xl p-4 mb-4 text-[#1B3A5C]">
          <p className="font-extrabold text-sm mb-1 text-[#800020]">
            Use your Ahmedabad University Google account to continue.
          </p>
          <p className="text-xs font-medium leading-relaxed">
            Only <span className="font-black underline decoration-[#800020]">@ahduni.edu.in</span> email addresses are allowed to access AUSM. If you sign in with any other Google account, access will be denied.
          </p>
        </div>

        {/* 1. Account Chooser Action Button */}
        <div className="space-y-2 mb-4">
          <button
            onClick={handleTryAnotherAccount}
            disabled={loading}
            className="w-full bg-[#800020] hover:bg-[#600018] text-white font-extrabold text-xs py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Opening Google Account Chooser...' : 'Select Another Google Account'}</span>
          </button>
        </div>

        {/* 3. Small Help Icon & Muted Text Block */}
        <div className="border-t border-slate-200 pt-3">
          <button
            type="button"
            onClick={() => setShowAccountHelp(!showAccountHelp)}
            className="w-full text-left flex items-center justify-between text-xs font-bold text-slate-600 hover:text-[#1B3A5C] transition-colors cursor-pointer py-1 group"
          >
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#800020] shrink-0" />
            </span>
            {showAccountHelp ? (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {showAccountHelp && (
            <div className="mt-2 p-3 bg-slate-100 border border-slate-300 rounded-2xl text-[11px] font-medium text-slate-600 space-y-1.5 leading-relaxed animate-in fade-in duration-150">
              <p>
                Signed in with the wrong Google account earlier? Your browser may automatically reuse that account.
              </p>
              <p className="font-semibold text-slate-700">
                To choose a different account, clear this website's cookies/site data and then try signing in again.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
