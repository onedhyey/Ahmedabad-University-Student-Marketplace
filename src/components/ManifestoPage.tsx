import React, { useState, useEffect } from 'react';
import { ArchitectNote } from './ArchitectNote';
import { 
  Sparkles, 
  ArrowLeft, 
  Leaf, 
  Coins, 
  Users, 
  RefreshCw, 
  ShieldCheck, 
  HeartHandshake, 
  ArrowRight,
  Server,
  Lock,
  Building2,
  FileText,
  UserCheck,
  PackageCheck,
  Ban,
  Scale,
  HelpCircle,
  AlertCircle,
  EyeOff,
  MessageSquare,
  Gavel,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';

interface ManifestoPageProps {
  initialTab?: 'manifesto' | 'terms';
  onBackToMarketplace: () => void;
  onNavigateToTab?: (tab: 'manifesto' | 'terms') => void;
}

export const ManifestoPage: React.FC<ManifestoPageProps> = ({ 
  initialTab = 'manifesto', 
  onBackToMarketplace,
  onNavigateToTab
}) => {
  const [activeTab, setActiveTab] = useState<'manifesto' | 'terms'>(initialTab);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const handleTabChange = (tab: 'manifesto' | 'terms') => {
    setActiveTab(tab);
    if (onNavigateToTab) {
      onNavigateToTab(tab);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-in fade-in duration-200">
      
      {/* Top Header & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          onClick={onBackToMarketplace}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1B3A5C] hover:text-[#800020] bg-white hover:bg-[#C9E2F5]/30 border-2 border-[#1B3A5C] px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        {/* Tab Toggle Buttons */}
        <div className="flex items-center p-1 bg-slate-200/80 rounded-2xl border border-slate-300">
          <button
            onClick={() => handleTabChange('manifesto')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'manifesto'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#1B3A5C]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FFD93D]" />
            <span>Our Manifesto</span>
          </button>
          
          <button
            onClick={() => handleTabChange('terms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-extrabold text-xs transition-all cursor-pointer ${
              activeTab === 'terms'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#1B3A5C]'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-amber-300" />
            <span>Terms & Guidelines</span>
          </button>
        </div>
      </div>

      {activeTab === 'manifesto' ? (
        /* MANIFESTO CONTENT */
        <div className="space-y-10 animate-in fade-in duration-300">
          
          {/* Main Hero Header */}
          <div className="bg-gradient-to-br from-[#1B3A5C] via-[#2A4D73] to-[#800020] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#1B3A5C] shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#FFD93D]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFD93D] text-[#1B3A5C] font-black text-xs px-3.5 py-1 rounded-full mb-6 shadow-xs">
                <Sparkles className="w-4 h-4" />
                <span>The AUSM Movement</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight mb-4 leading-tight">
                Don't Let Good Gear Sit Idle.
              </h1>

              <p className="text-slate-100 text-base sm:text-lg max-w-2xl font-medium leading-relaxed">
                We built <strong className="text-[#FFD93D]">AUSM</strong> because campus life should be sustainable, affordable, and connected. Every textbook, bicycle, and calculator deserves a second life.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 border-t border-white/10 pt-5">
                <span className="flex items-center gap-1.5 text-amber-300">
                  <Building2 className="w-4 h-4" /> Ahmedabad University Exclusive
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 text-emerald-300">
                  <Leaf className="w-4 h-4" /> Zero Waste Campus Initiative
                </span>
              </div>
            </div>
          </div>

          {/* Core Philosophy Banner / Quote */}
          <div className="bg-[#FFFDF5] border-2 border-[#FFD93D] rounded-3xl p-6 sm:p-8 text-center shadow-xs">
            <blockquote className="text-lg sm:text-xl font-black text-[#1B3A5C] italic leading-snug max-w-2xl mx-auto">
              "Why should one student pay full price for a textbook that another student just finished reading four months ago?"
            </blockquote>
            <p className="text-xs font-bold text-[#800020] mt-3 uppercase tracking-wider">
              — The Core Principle Behind AUSM
            </p>
          </div>

          {/* Impactful Manifesto Paragraphs with Bold Headings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Section 1 */}
            <div className="bg-white border-2 border-[#C9E2F5] rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#1B3A5C] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-[#800020] border border-amber-200 flex items-center justify-center font-black mb-4">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#1B3A5C] mb-3">
                  The Campus Cycle We're Breaking
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Every single semester, thousands of textbooks, scientific calculators, lab coats, bicycles, and hostel appliances are bought brand new at full price. Four months later, exams finish, dorm rooms clear out, and these perfectly good items collect dust in cupboards or get thrown away — while incoming students turn around and pay full price all over again.
                </p>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white border-2 border-[#C9E2F5] rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#1B3A5C] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center justify-center font-black mb-4">
                  <Leaf className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#1B3A5C] mb-3">
                  Giving Every Product a Second Life
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  We believe an item shouldn't retire after 16 weeks of coursework. A microeconomics textbook has ten semesters of wisdom left to give. A sturdy bicycle can carry five generations of Ahmedabad University students across campus. Every listing on AUSM keeps valuable items in circulation, slashes student expenses, and prevents unnecessary waste.
                </p>
              </div>
            </div>

            {/* Section 3 */}
            <div className="bg-white border-2 border-[#C9E2F5] rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#1B3A5C] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#C9E2F5]/60 text-[#1B3A5C] border border-[#1B3A5C]/20 flex items-center justify-center font-black mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#1B3A5C] mb-3">
                  Built By Students, For Students
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  AUSM is not a distant, profit-driven corporate app or an anonymous classifieds board. It is an independent, student-built initiative created specifically for the AU community. Verified strictly through <strong className="text-[#1B3A5C]">@ahduni.edu.in</strong> Google workspace accounts, it provides a safe, trusted ecosystem where buyers and sellers are project partners, hostel mates, and campus peers.
                </p>
              </div>
            </div>

            {/* Section 4 */}
            <div className="bg-white border-2 border-[#C9E2F5] rounded-3xl p-6 sm:p-8 shadow-xs hover:border-[#1B3A5C] transition-colors flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#1B3A5C] border border-amber-300 flex items-center justify-center font-black mb-4">
                  <Coins className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-black text-[#1B3A5C] mb-3">
                  Transparent 10% Reinvestment Model
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  We believe in total transparency. AUSM charges a modest <strong>10% platform fee on successful transactions</strong>. As an independent student initiative, every single rupee generated goes directly toward funding secure Cloud Run servers, real-time database hosting, media storage, domain services, and continuous feature development to keep the platform fast, safe, and ad-free for everyone.
                </p>
              </div>
            </div>

          </div>

          {/* 3 Core Values Cards */}
          <div className="bg-[#1B3A5C] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#1B3A5C] shadow-md">
            <h2 className="text-2xl font-black mb-6 text-center text-[#FFD93D]">
              Our Core Campus Commitments
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-xs border border-white/10">
                <div className="w-10 h-10 bg-[#FFD93D] text-[#1B3A5C] font-black rounded-xl mx-auto flex items-center justify-center mb-3">
                  1
                </div>
                <strong className="block text-base font-bold mb-1">Affordable Essentials</strong>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Keeping course materials and campus gear within reach for every student budget.
                </p>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-xs border border-white/10">
                <div className="w-10 h-10 bg-[#FFD93D] text-[#1B3A5C] font-black rounded-xl mx-auto flex items-center justify-center mb-3">
                  2
                </div>
                <strong className="block text-base font-bold mb-1">Zero Waste Mindset</strong>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Extending the lifecycle of goods and reducing environmental footprint across AU campuses.
                </p>
              </div>

              <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-xs border border-white/10">
                <div className="w-10 h-10 bg-[#FFD93D] text-[#1B3A5C] font-black rounded-xl mx-auto flex items-center justify-center mb-3">
                  3
                </div>
                <strong className="block text-base font-bold mb-1">Peer Empowerment</strong>
                <p className="text-xs text-slate-200 leading-relaxed">
                  Enabling students to earn back cash from unused gear while helping fellow peers succeed.
                </p>
              </div>
            </div>
          </div>

          {/* Powerful Call to Action */}
          <div className="bg-gradient-to-r from-[#800020] to-[#500014] text-white rounded-3xl p-8 sm:p-10 text-center shadow-lg relative overflow-hidden">
            <div className="relative z-10 max-w-xl mx-auto">
              <span className="inline-block bg-white/20 text-white font-extrabold text-xs px-3.5 py-1 rounded-full mb-3 uppercase tracking-wider">
                Be Part of the Movement
              </span>
              <h2 className="text-2xl sm:text-3xl font-black mb-3">
                Ready to Pass On the Torch?
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm leading-relaxed mb-6 font-medium">
                When you buy or sell on AUSM, you aren't just completing a deal — you are contributing to a smarter, more sustainable, and more connected campus resource for the entire Ahmedabad University community.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={onBackToMarketplace}
                  className="inline-flex items-center gap-2 bg-[#FFD93D] hover:bg-amber-300 text-[#1B3A5C] font-black text-sm px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Explore AU Marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleTabChange('terms')}
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all border border-white/20 cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>Read Terms & Guidelines</span>
                </button>
              </div>
            </div>
          </div>

          {/* A Note From the Architect */}
          <ArchitectNote variant="full" />

        </div>
      ) : (
        /* TERMS & CONDITIONS CONTENT */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Terms Hero Banner */}
          <div className="bg-gradient-to-br from-[#1B3A5C] via-[#2A4D73] to-[#800020] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#1B3A5C] shadow-lg mb-8 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFD93D] text-[#1B3A5C] font-extrabold text-xs px-3.5 py-1 rounded-full mb-4 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Campus Guidelines & Safety</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Terms & Platform Philosophy
              </h1>
              <p className="text-slate-100 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                Clear, transparent, and fair rules to protect every student, buyer, and seller across Ahmedabad University. Written by the students, for the students.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-bold text-slate-300 border-t border-white/10 pt-4">
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-4 h-4 text-[#FFD93D]" /> Ahmedabad University Exclusive
                </span>
                <span>•</span>
                <span>Updated: July 2026</span>
              </div>
            </div>
          </div>

          {/* 4 Core Philosophy Quick Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Card 1: Privacy First */}
            <div className="bg-white border-2 border-[#1B3A5C] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B3A5C] border border-[#1B3A5C]/20 flex items-center justify-center shrink-0">
                  <EyeOff className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1B3A5C] text-base">Privacy First</h3>
                  <span className="text-[11px] font-bold text-slate-500">No personal contact details shared</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Buying and selling shouldn't require sharing personal contact information with strangers. All listings and transactions stay private.
              </p>
            </div>

            {/* Card 2: Anonymous Marketplace */}
            <div className="bg-white border-2 border-[#1B3A5C] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-800 border border-purple-200 flex items-center justify-center shrink-0">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1B3A5C] text-base">Anonymous Marketplace</h3>
                  <span className="text-[11px] font-bold text-slate-500">Independent campus pickups</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                No phone numbers needed. AUSM acts as the point of communication, and items are collected independently on campus.
              </p>
            </div>

            {/* Card 3: Final Sales */}
            <div className="bg-white border-2 border-[#1B3A5C] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1B3A5C] text-base">Payments & Returns</h3>
                  <span className="text-[11px] font-bold text-slate-500">All purchases are final</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                No standard returns or replacements. This keeps transactions simple and avoids unnecessary disputes between students.
              </p>
            </div>

            {/* Card 4: Founder Intervention */}
            <div className="bg-white border-2 border-[#1B3A5C] rounded-2xl p-5 shadow-xs hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-red-50 text-[#800020] border border-[#800020]/20 flex items-center justify-center shrink-0">
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-[#1B3A5C] text-base">Founder Review</h3>
                  <span className="text-[11px] font-bold text-slate-500">Exceptional circumstances only</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Review available only if an item is materially different during supervised pickup. Discretionary rare exception.
              </p>
            </div>

          </div>

          {/* Detailed Policy Sections */}
          <div className="space-y-6 text-[#1B3A5C] pt-2">
            
            {/* 1. Privacy First */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#1B3A5C] border border-blue-200 flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">1. Privacy First</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  AUSM is built with student privacy in mind. We believe buying and selling shouldn't require sharing personal contact information with strangers.
                </p>
                <div className="bg-[#FAFBFC] p-4 rounded-xl border border-slate-200">
                  <p className="text-slate-700 text-xs font-semibold leading-relaxed">
                    🔒 All listings and transactions are designed to remain private, with no personal details revealed unnecessarily. You can buy and sell on campus without ever broadcasting your personal phone number or private contact details.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Anonymous Marketplace */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-900 border border-purple-200 flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">2. Anonymous Marketplace & Independent Campus Pickup</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  Buyers and sellers do not need to exchange phone numbers or personal contact details.
                </p>
                <ul className="list-disc pl-5 space-y-2 font-medium text-slate-600">
                  <li>Since AUSM is exclusively for Ahmedabad University students, AUSM acts as the point of communication throughout the transaction.</li>
                  <li>Products are collected and picked up independently on campus without requiring buyers and sellers to directly contact one another.</li>
                  <li>This keeps transactions clean, safe, and hassle-free for everyone involved.</li>
                </ul>
              </div>
            </section>

            {/* 3. Payments & Returns */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center font-bold">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">3. Payments & Returns Policy</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  <strong>All purchases made through AUSM are considered final.</strong>
                </p>
                <p className="text-slate-600 font-medium">
                  The platform does not offer returns or replacements as a standard policy, helping keep transactions simple and avoiding unnecessary disputes between students.
                </p>
                <div className="bg-[#FAFBFC] p-3.5 rounded-xl border border-slate-200 text-xs text-slate-600 font-medium">
                  💡 Before completing any transaction, buyers have full opportunity to inspect the item during the pickup process to ensure they are satisfied.
                </div>
              </div>
            </section>

            {/* 4. Founder Intervention (Exceptional Circumstances Only) */}
            <section className="bg-white border-2 border-[#800020]/30 rounded-2xl p-6 shadow-xs hover:border-[#800020] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#800020]/10 text-[#800020] border border-[#800020]/20 flex items-center justify-center font-bold">
                  <Gavel className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-[#1B3A5C]">4. Founder Intervention (Exceptional Circumstances Only)</h3>
                  <span className="text-xs font-bold text-[#800020]">Fairness & Trust Safeguard</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <p>
                  To maintain absolute trust and fairness across the marketplace, the founder maintains a clear policy regarding when review or intervention is possible:
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1">
                  <strong className="block text-[#800020] font-bold text-xs">✕ Routine Disagreements & Mind Changes:</strong>
                  <p className="text-slate-600 text-xs font-medium">
                    The founder will <strong>not</strong> mediate routine disagreements, buyer's remorse, or changes of mind.
                  </p>
                </div>

                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-1">
                  <strong className="block text-emerald-900 font-bold text-xs">✓ Material Difference Review During Supervised Pickup:</strong>
                  <p className="text-slate-700 text-xs font-medium">
                    The founder will only consider stepping in if, during the supervised pickup process, it becomes evident that the item being handed over is <strong>materially different</strong> from what was originally listed or previously shown by the seller.
                  </p>
                </div>

                <div className="bg-[#FAFBFC] p-4 rounded-xl border border-slate-200 space-y-2">
                  <strong className="block text-xs font-bold text-[#1B3A5C]">Examples of Material Differences:</strong>
                  <ul className="list-disc pl-5 text-xs text-slate-600 font-medium space-y-1">
                    <li>Undisclosed damage (e.g., hidden cracks, malfunctioning electronic components, or major structural wear).</li>
                    <li>Missing components (e.g., vital power cables, missing textbook pages, key accessories).</li>
                    <li>Significant differences that were not communicated beforehand.</li>
                  </ul>
                </div>

                <div className="p-4 bg-amber-50 rounded-xl border border-amber-300 text-xs text-amber-950 font-medium leading-relaxed">
                  <strong>Discretionary & Exceptional Nature:</strong> This review exists solely to maintain fairness and trust within the marketplace. Any decision to intervene is entirely at the founder's discretion and should be presented as a rare exception rather than a standard service. This shall be the <strong>only case</strong> where a return or replacement might be initiated based on the buyer's request.
                </div>
              </div>
            </section>

            {/* 5. Student Eligibility & Verification */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">5. Student Verification & Eligibility</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  AUSM is exclusively for currently enrolled students, faculty, and staff of <strong>Ahmedabad University</strong> authenticated via official <strong>@ahduni.edu.in</strong> Google Workspace accounts.
                </p>
              </div>
            </section>

            {/* 6. Transparent Reinvestment */}
            <section className="bg-[#FFFDF5] border-2 border-[#FFD93D] rounded-2xl p-6 shadow-xs">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#FFD93D] text-[#1B3A5C] flex items-center justify-center font-bold">
                  <Coins className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">6. Transparent 10% Platform Reinvestment</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  AUSM charges a modest 10% platform fee on successful transactions. As an independent student initiative, every rupee generated goes directly toward funding cloud run servers, database hosting, domain maintenance, and continuous platform improvements for the student community.
                </p>
              </div>
            </section>

            {/* 7. Prohibited Items */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold">
                  <Ban className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">7. Prohibited Campus Items</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  Weapons, hazardous equipment, alcohol, tobacco, vapes, drugs, leaked exams, stolen property, and counterfeit goods are strictly prohibited on AUSM.
                </p>
              </div>
            </section>

            {/* 8. Community Expectations */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">8. Built By Students, For Students</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  AUSM is a community-driven tool built to make campus life easier, more sustainable, and affordable. We expect all students to interact with honesty, kindness, and mutual respect.
                </p>
              </div>
            </section>

          </div>

        </div>
      )}

      {/* Bottom Navigation CTA */}
      <div className="mt-12 pt-8 border-t-2 border-[#C9E2F5] text-center flex flex-col items-center gap-4">
        <p className="text-xs font-semibold text-slate-500">
          Thank you for making AUSM a trusted, thriving marketplace for Ahmedabad University!
        </p>
        <button
          onClick={onBackToMarketplace}
          className="inline-flex items-center gap-2 text-sm font-extrabold text-white bg-[#800020] hover:bg-[#600018] px-6 py-3 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to AU Marketplace</span>
        </button>
      </div>

    </div>
  );
};
