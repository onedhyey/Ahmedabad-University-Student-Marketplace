import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToGrid = () => {
    const gridEl = document.getElementById('listings-grid-section');
    gridEl?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Small top chip */}
        <div className="inline-flex items-center gap-2 bg-[#FAFBFC] border-2 border-[#1B3A5C] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-[#1B3A5C] mb-6 shadow-xs">
          <Sparkles className="w-4 h-4 text-[#800020]" />
          <span>Ahmedabad University Student Marketplace</span>
        </div>

        {/* Main Huge Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#1B3A5C] tracking-tighter leading-[0.95] mb-6">
          Sell it. Find it.<br className="hidden sm:inline" />{' '}
          <span className="relative inline-block mt-2 sm:mt-0">
            <span className="relative z-10">@ AUSM.</span>
            <svg className="absolute -bottom-2.5 left-0 w-full h-4" preserveAspectRatio="none" viewBox="0 0 100 10">
              <path d="M0 5 Q 50 10 100 5" stroke="#800020" strokeWidth="7" fill="none" strokeLinecap="round"/>
            </svg>
          </span>
        </h1>

        {/* One-line subheading */}
        <p className="text-lg sm:text-xl text-[#1B3A5C]/80 font-medium max-w-2xl mx-auto leading-relaxed mb-8">
          The verified student-to-student marketplace for Ahmedabad University. Buy and sell used textbooks, cycles, and electronics safely on campus.
        </p>

        {/* Hero CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToGrid}
            className="w-full sm:w-auto bg-[#800020] hover:bg-[#600018] text-white font-black text-lg px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-3 group cursor-pointer"
          >
            <span>Browse listings</span>
            <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
