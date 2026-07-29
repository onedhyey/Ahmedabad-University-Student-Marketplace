import React, { useState, useEffect } from 'react';
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
  AlertCircle
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
            <span>Terms & Conditions</span>
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

        </div>
      ) : (
        /* TERMS & CONDITIONS CONTENT */
        <div className="space-y-8 animate-in fade-in duration-300">
          
          {/* Terms Hero Banner */}
          <div className="bg-gradient-to-br from-[#1B3A5C] via-[#2A4D73] to-[#800020] text-white rounded-3xl p-6 sm:p-10 border-2 border-[#1B3A5C] shadow-lg mb-10 relative overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-[#FFD93D] text-[#1B3A5C] font-extrabold text-xs px-3 py-1 rounded-full mb-4 shadow-xs">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Campus Guidelines & Safety</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-3">
                Terms & Conditions
              </h1>
              <p className="text-slate-200 text-sm sm:text-base max-w-2xl font-medium leading-relaxed">
                Clear, transparent, and fair rules to protect every student, buyer, and seller across Ahmedabad University.
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

          {/* Positive Highlights Box: Why the 10% Fee matters */}
          <div className="bg-[#FFFDF5] border-2 border-[#FFD93D] rounded-3xl p-6 sm:p-8 mb-8 shadow-xs relative">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD93D] border-2 border-[#1B3A5C] flex items-center justify-center shrink-0 shadow-xs text-[#1B3A5C]">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-black text-[#1B3A5C]">
                    Transparent 10% Platform Fee & Reinvestment
                  </h2>
                  <span className="bg-[#800020] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                    Student Initiative
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium mb-4">
                  AUSM charges a modest <strong>10% platform fee on successful transactions</strong>. 
                  Because AUSM is an independent, student-built initiative, every single rupee generated directly sustains and enhances this vital campus resource for the entire Ahmedabad University community.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                    <Server className="w-4 h-4 text-[#800020] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1B3A5C] font-bold">Cloud & Hosting</strong>
                      <span className="text-slate-600">High-speed Cloud Run servers and domain hosting for zero downtime.</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#1B3A5C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1B3A5C] font-bold">Security & Auth</strong>
                      <span className="text-slate-600">Enforcing strict @ahduni.edu.in verification to keep non-students out.</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                    <Lock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1B3A5C] font-bold">Database & Media Storage</strong>
                      <span className="text-slate-600">Instant real-time syncing and storage for crisp listing photos.</span>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#1B3A5C] font-bold">Continuous Upgrades</strong>
                      <span className="text-slate-600">Adding new features, mobile optimization, and platform maintenance.</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#800020] font-bold mt-4 italic">
                  ✨ When you buy or sell on AUSM, you aren't just completing a deal — you are directly keeping an independent, ad-free campus tool alive and thriving for fellow students!
                </p>
              </div>
            </div>
          </div>

          {/* 10 Standard Terms Sections */}
          <div className="space-y-6 text-[#1B3A5C]">
            
            {/* 1. Eligibility */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">1. Student Eligibility & Verification</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  AUSM is exclusively designed for currently enrolled students, faculty, and staff of <strong>Ahmedabad University</strong>.
                </p>
                <ul className="list-disc pl-5 space-y-1 font-medium text-slate-600">
                  <li>You must authenticate using your official <strong>@ahduni.edu.in</strong> Google workspace account.</li>
                  <li>Accounts authenticated with personal Gmail addresses or external domains will be automatically restricted.</li>
                  <li>You agree to provide true, accurate, and current profile details.</li>
                </ul>
              </div>
            </section>

            {/* 2. Account Responsibility */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">2. Account Responsibility</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  Your account is tied directly to your university credentials. You are responsible for maintaining the security of your account and all actions taken through it.
                </p>
                <p className="text-slate-600 font-medium">
                  If you suspect unauthorized activity on your account, please notify the platform administrators immediately.
                </p>
              </div>
            </section>

            {/* 3. Prohibited Items */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold">
                  <Ban className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">3. Prohibited Items Policy</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  To maintain campus integrity and safety, the following items and services are <strong>strictly prohibited</strong> on AUSM:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-700 pt-2">
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                    <span className="text-[#800020] font-black">✕</span> Weapons or hazardous equipment
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                    <span className="text-[#800020] font-black">✕</span> Alcohol, tobacco, vapes or drugs
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                    <span className="text-[#800020] font-black">✕</span> Leaked exams or academic dishonesty
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                    <span className="text-[#800020] font-black">✕</span> Stolen property or counterfeit goods
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                    <span className="text-[#800020] font-black">✕</span> Prescription meds & medical devices
                  </div>
                  <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200 flex items-center gap-2">
                    <span className="text-[#800020] font-black">✕</span> Spam or non-item marketing
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Accurate Listings */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <PackageCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">4. Accurate Listings & Fair Pricing</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  When listing an item for sale (textbooks, bicycles, scientific calculators, hostel furniture, electronics):
                </p>
                <ul className="list-disc pl-5 space-y-1 font-medium text-slate-600">
                  <li>Upload original, clear photos showing the current condition of the exact item.</li>
                  <li>Provide an honest description specifying any defects, missing parts, or wear.</li>
                  <li>Set a realistic price in Indian Rupees (₹). Misleading prices (e.g. ₹1 placeholder for an expensive device) are prohibited.</li>
                  <li>Promptly mark your item as "Sold" once the transaction is finished.</li>
                </ul>
              </div>
            </section>

            {/* 5. Buyer & Seller Responsibilities */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">5. Buyer & Seller Responsibilities</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3">
                <div className="bg-[#FAFBFC] p-4 rounded-xl border border-slate-200">
                  <h4 className="font-extrabold text-[#1B3A5C] mb-1">Campus Meetups & Safety</h4>
                  <p className="text-slate-600 text-xs">
                    Always conduct transactions in safe, public areas on the Ahmedabad University campus (such as the University Canteen, Central Library Plaza, Student Activity Centre, or School courtyards).
                  </p>
                </div>
                <div className="bg-[#FAFBFC] p-4 rounded-xl border border-slate-200">
                  <h4 className="font-extrabold text-[#1B3A5C] mb-1">In-Person Item Inspection</h4>
                  <p className="text-slate-600 text-xs">
                    Buyers should test electronic devices, verify textbook editions, and inspect physical conditions before completing payment. Sellers agree to give buyers adequate time during the meetup to inspect the item.
                  </p>
                </div>
              </div>
            </section>

            {/* 6. Payments & Refunds */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <RefreshCw className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">6. Payments, Handovers & Refund Policy</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  Payments are arranged directly between students via UPI (Google Pay, PhonePe, Paytm) or cash during handover.
                </p>
                <p className="text-slate-600 font-medium">
                  Because items are inspected in person prior to payment, transactions are considered final once completed. If an item is found defective during inspection, the buyer is under no obligation to finalize the transaction.
                </p>
              </div>
            </section>

            {/* 7. Privacy */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">7. Privacy & Data Protection</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  We respect your privacy as an AU student. Your contact information is used strictly to facilitate buyer-seller communication on campus.
                </p>
                <ul className="list-disc pl-5 space-y-1 font-medium text-slate-600">
                  <li>We will never sell or share your personal data with commercial advertisers.</li>
                  <li>In-app communication is safeguarded to prevent spam and phishing.</li>
                </ul>
              </div>
            </section>

            {/* 8. Liability Disclaimer */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <Scale className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">8. Platform Role & Liability Disclaimer</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  AUSM acts solely as a technological facilitator for peer-to-peer campus exchanges.
                </p>
                <p className="text-slate-600 font-medium">
                  While we verify `@ahduni.edu.in` accounts and moderate listings, AUSM is not a party to the physical transaction and is not liable for warranties, product lifespan, or post-handover damages.
                </p>
              </div>
            </section>

            {/* 9. Dispute Resolution */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#C9E2F5]/40 text-[#1B3A5C] flex items-center justify-center font-bold">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">9. Student Dispute Resolution</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  We encourage open, friendly communication between peers. If an issue arises regarding a listing or transaction, our student moderation team is available to assist in mediating a fair resolution.
                </p>
              </div>
            </section>

            {/* 10. Account Suspension */}
            <section className="bg-white border-2 border-[#C9E2F5] rounded-2xl p-6 shadow-xs hover:border-[#1B3A5C] transition-colors">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-xl bg-[#800020]/10 text-[#800020] flex items-center justify-center font-bold">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-extrabold text-[#1B3A5C]">10. Account Suspension & Enforcement</h3>
              </div>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
                <p>
                  To maintain trust and safety across Ahmedabad University, accounts found engaging in harassment, posting prohibited items, creating fake listings, or attempting domain bypass will be suspended immediately.
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
