import React from 'react';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';

interface DiscountsTeaserProps {
  onExploreDiscounts: () => void;
}

export const DiscountsTeaser: React.FC<DiscountsTeaserProps> = ({ onExploreDiscounts }) => {
  return (
    <section className="px-4 sm:px-6 mb-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onExploreDiscounts}
          className="w-full text-left bg-gradient-to-br from-[#1B3A5C] via-[#2A4D73] to-[#800020] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#1B3A5C] shadow-lg hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden"
        >
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-[#FFD93D]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-[#FFD93D] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Student Perks</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black leading-snug">
                  Curious what perks come with being a student?
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-medium mt-1">
                  Free software, discounts, and hidden deals you probably didn't know you had access to.
                </p>
              </div>
            </div>
            <div className="inline-flex items-center gap-2 bg-white text-[#1B3A5C] font-extrabold text-xs sm:text-sm px-5 py-3 rounded-xl shrink-0 group-hover:bg-[#FFD93D] transition-colors">
              <span>Explore Student Discounts</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </button>
      </div>
    </section>
  );
};