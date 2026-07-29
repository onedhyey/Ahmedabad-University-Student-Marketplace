import React from 'react';
import { ShieldCheck, FileText, Sparkles, Heart } from 'lucide-react';

interface FooterProps {
  onOpenGuide?: () => void;
  onOpenDiscounts?: () => void;
  onOpenTerms?: () => void;
  onOpenManifesto?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGuide, onOpenDiscounts, onOpenTerms, onOpenManifesto }) => {
  return (
    <footer className="mt-20 border-t-2 border-[#C9E2F5] bg-[#FAFBFC] py-8 px-4 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-3">
        <div className="flex flex-wrap items-center justify-center gap-2 font-bold text-sm text-[#1B3A5C]">
          <span>Built live at</span>
          <span className="bg-[#595B5A] text-white px-2.5 py-0.5 rounded-lg border border-[#1B3A5C] font-extrabold -rotate-1">
            Ahmedabad University
          </span>
        </div>

        <p className="text-xs text-slate-500 font-medium max-w-md">
          Verified student marketplace for campus books, cycles, and electronics
        </p>

        {/* Links & Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold text-[#1B3A5C] pt-2 border-t border-slate-200/80 w-full max-w-xl">
          <button
            onClick={onOpenGuide}
            className="inline-flex items-center gap-1.5 text-[#1B3A5C] hover:underline hover:text-[#800020] transition-colors cursor-pointer"
          >
            <span>Marketplace Guide</span>
          </button>

          <span className="text-slate-300">•</span>

          <button
            onClick={onOpenDiscounts}
            className="inline-flex items-center gap-1.5 text-[#1B3A5C] hover:underline hover:text-[#800020] transition-colors cursor-pointer"
          >
            <span>Student Discounts</span>
          </button>

          <span className="text-slate-300">•</span>

          <button
            onClick={onOpenManifesto}
            className="inline-flex items-center gap-1.5 text-[#1B3A5C] hover:underline hover:text-[#800020] transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
            <span>Our Manifesto</span>
          </button>

          <span className="text-slate-300">•</span>

          <button
            onClick={onOpenTerms}
            className="inline-flex items-center gap-1.5 text-[#800020] hover:underline hover:text-[#600018] transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Guidelines</span>
          </button>
        </div>

        {/* Verified Badge Row */}
        <div className="pt-1 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1B3A5C]">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>@ahduni.edu.in Verified</span>
          </span>
        </div>

        <p className="text-[11px] text-slate-400 pt-1">
          © {new Date().getFullYear()} AUSM. Independent Student Initiative for Ahmedabad University.
        </p>
      </div>
    </footer>
  );
};

