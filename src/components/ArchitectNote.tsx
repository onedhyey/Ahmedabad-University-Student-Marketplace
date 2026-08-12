import React from 'react';
import { Linkedin, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import founderPhoto from '../assets/founder.jpeg';

interface ArchitectNoteProps {
  // 'full' matches the original Manifesto page layout (labeled social links).
  // 'compact' is for the home page: icon-only social buttons, plus a button
  // linking back to the full Manifesto page.
  variant?: 'full' | 'compact';
  onViewManifesto?: () => void;
}

export const ArchitectNote: React.FC<ArchitectNoteProps> = ({ variant = 'full', onViewManifesto }) => {
  const isCompact = variant === 'compact';

  return (
    <div className="bg-white border-2 border-[#1B3A5C] rounded-3xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-6 pb-5 border-b border-slate-200">
        <div className="relative shrink-0">
          <div
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-[#1B3A5C] shadow-md select-none bg-slate-100"
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={founderPhoto}
              alt="Dhyey Mody - Architect of AUSM"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
              className="w-full h-full object-cover scale-[1.375] hover:scale-[1.50] transform transition-transform duration-300 pointer-events-auto select-none"
            />
          </div>
          <div className="absolute -bottom-1.5 -right-1.5 bg-[#1B3A5C] text-[#FFD93D] p-1.5 rounded-xl border-2 border-white shadow-xs" title="Architect">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-[#800020] text-[11px] font-black uppercase tracking-wider mb-1">
            The Architect
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#1B3A5C]">
            A note from the architect
          </h2>
          <p className="text-xs font-bold text-slate-500 mt-0.5">
            Dhyey Mody • BTech CSE Student at Ahmedabad University
          </p>
        </div>
      </div>

      <div className="space-y-4 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
        <p>
          Hi, I'm Dhyey, a Computer Science student at Ahmedabad University.
        </p>
        <p>
          I built AUSM because I noticed students buying things for a semester, using them once, and then letting them collect dust while someone else bought the exact same item brand new. It felt wasteful and unnecessary.
        </p>
        <p>
          My hope is that AUSM becomes something students continue to build on long after I've graduated.
        </p>
        <p>
          If you have ideas, feedback, or just want to chat, I'd love to hear from you.
        </p>
      </div>

      <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
        {/* Left side: social links (icon-only) */}
        <div className="flex items-center gap-3 text-xs sm:text-sm font-bold">
          <a
            href="https://www.linkedin.com/in/dhyeymody/"
            target="_blank"
            rel="noopener noreferrer"
            title="Connect with me on LinkedIn"
            aria-label="Connect with me on LinkedIn"
            className="inline-flex items-center justify-center w-10 h-10 shrink-0 text-[#1B3A5C] hover:text-[#0077B5] bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-[#0077B5] rounded-xl transition-all"
          >
            <Linkedin className="w-4 h-4 text-[#0077B5]" />
          </a>
          <a
            href="mailto:dhyey.m@ahduni.edu.in"
            title="Email me"
            aria-label="Email me"
            className="inline-flex items-center justify-center w-10 h-10 shrink-0 text-[#1B3A5C] hover:text-[#800020] bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-[#800020] rounded-xl transition-all"
          >
            <Mail className="w-4 h-4 text-[#800020]" />
          </a>
        </div>

        {/* Right side: link to the full Manifesto page (compact/home variant only) */}
        {isCompact && onViewManifesto && (
          <button
            onClick={onViewManifesto}
            className="inline-flex items-center gap-2 bg-[#1B3A5C] hover:bg-[#122840] text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            <span>View this on our Manifesto</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
