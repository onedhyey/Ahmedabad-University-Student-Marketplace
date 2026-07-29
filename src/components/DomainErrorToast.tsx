import React from 'react';
import { X, AlertTriangle, ShieldAlert } from 'lucide-react';

interface DomainErrorToastProps {
  onClose: () => void;
}

export const DomainErrorToast: React.FC<DomainErrorToastProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#1B3A5C]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#595B5A] border-3 border-[#1B3A5C] text-white rounded-3xl max-w-sm w-full p-6 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/80 border-2 border-[#1B3A5C] p-1.5 rounded-full text-[#1B3A5C] hover:bg-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#800020] text-white flex items-center justify-center font-bold shadow-xs">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <span className="font-doodle text-2xl font-black text-[#1B3A5C]">
            Notice
          </span>
        </div>

        <h3 className="font-extrabold text-xl text-[#1B3A5C] mb-2 leading-tight">
          This marketplace is for AU students only
        </h3>

        <p className="text-xs font-semibold text-[#1B3A5C]/90 leading-relaxed mb-6">
          Please sign in using your official <span className="underline decoration-[#800020] font-extrabold">@ahduni.edu.in</span> email address. External accounts are restricted to ensure campus trust and safety.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-[#1B3A5C] hover:bg-[#122840] text-white font-extrabold text-xs py-3 rounded-full transition-colors cursor-pointer shadow-xs"
        >
          Got it
        </button>

      </div>
    </div>
  );
};
