import React from 'react';
import { 
  BookOpen, 
  ArrowLeft, 
  ShieldCheck, 
  Building2, 
  Sparkles, 
  CheckCircle2, 
  MessageCircle, 
  Tag, 
  Search, 
  HelpCircle,
  QrCode,
  Lock,
  Compass,
  Zap,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface GuidePageProps {
  onBackToMarketplace: () => void;
  onNavigateToDiscounts?: () => void;
  onNavigateToTerms?: () => void;
}

export const GuidePage: React.FC<GuidePageProps> = ({
  onBackToMarketplace,
  onNavigateToDiscounts,
  onNavigateToTerms
}) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-in fade-in duration-200">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToMarketplace}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1B3A5C] hover:text-[#800020] bg-white hover:bg-[#C9E2F5]/30 border-2 border-[#1B3A5C] px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          {onNavigateToDiscounts && (
            <button
              onClick={onNavigateToDiscounts}
              className="text-xs font-extrabold text-[#1B3A5C] hover:bg-[#C9E2F5]/40 border border-[#1B3A5C]/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              Student Discounts &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Main Hero Header */}
      <div className="bg-gradient-to-br from-[#1B3A5C] via-[#244870] to-[#800020] text-white rounded-3xl p-8 sm:p-12 border-2 border-[#1B3A5C] shadow-xl relative overflow-hidden mb-10">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#C9E2F5]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-[#C9E2F5] text-[#1B3A5C] font-black text-xs px-3.5 py-1 rounded-full mb-4 shadow-xs">
            <BookOpen className="w-4 h-4" />
            <span>Campus Marketplace Handbook</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4">
            How to Buy & Sell on Campus
          </h1>
          <p className="text-sm sm:text-base text-[#C9E2F5] font-medium max-w-2xl leading-relaxed">
            Everything you need to know about navigating the Ahmedabad University Student Marketplace securely, from account verification to safe meetup locations and payment etiquette.
          </p>
        </div>
      </div>

      {/* Key Features Quick Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        <div className="bg-white border-2 border-[#1B3A5C] p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#800020] border border-[#800020]/20 flex items-center justify-center mb-3">
            <UserCheck className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-[#1B3A5C] text-base mb-1">100% AU Verified</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Strictly gated by official <strong className="text-[#1B3A5C]">@ahduni.edu.in</strong> Google Workspace credentials. No outside traders or unverified profiles.
          </p>
        </div>

        <div className="bg-white border-2 border-[#1B3A5C] p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1B3A5C] border border-[#1B3A5C]/20 flex items-center justify-center mb-3">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-[#1B3A5C] text-base mb-1">On-Campus Handover</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Meet safely at university plazas, libraries, or canteens during class breaks without shipping costs or courier delays.
          </p>
        </div>

        <div className="bg-white border-2 border-[#1B3A5C] p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center justify-center mb-3">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="font-extrabold text-[#1B3A5C] text-base mb-1">Direct & Fee-Free</h3>
          <p className="text-xs text-slate-600 leading-relaxed font-medium">
            Zero commission or platform middleman fees. Buyers pay sellers directly via UPI (GPay/PhonePe) or cash upon item inspection.
          </p>
        </div>
      </div>

      {/* SECTION 1: Buyer's Walkthrough */}
      <div className="bg-white border-2 border-[#1B3A5C] rounded-3xl p-6 sm:p-8 shadow-xs mb-10">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#C9E2F5]/60 text-[#1B3A5C] flex items-center justify-center font-black">
            01
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1B3A5C]">
              Buyer's Guide: Step-by-Step
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Finding textbooks, lab gear, bicycles, and electronics on campus
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center text-xs font-black shrink-0">
              1
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#1B3A5C] mb-1">Browse & Filter Listings</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Search by keyword or filter by categories (Books, Cycles, Tech, Electronics). Check item condition (New, Like New, Good, Fair) and photos carefully.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center text-xs font-black shrink-0">
              2
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#1B3A5C] mb-1">Verify AU Sign-In</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Sign in with your official <strong className="text-[#800020]">@ahduni.edu.in</strong> Google account to unlock direct messaging to sellers.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center text-xs font-black shrink-0">
              3
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#1B3A5C] mb-1">Message Us on WhatsApp</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Click "Message Us" on any available listing card. It opens WhatsApp with a pre-filled message to AUSM — we'll relay it to the seller and help coordinate a convenient campus meetup time.
              </p>
            </div>
          </div>

          <div className="flex gap-4 items-start">
            <div className="w-8 h-8 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center text-xs font-black shrink-0">
              4
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-[#1B3A5C] mb-1">Inspect & Pay at Handover</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                Meet at a public campus spot. Test electronics or inspect books before making payment via UPI QR code or cash directly to the seller.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 2: Seller's Walkthrough */}
      <div className="bg-white border-2 border-[#1B3A5C] rounded-3xl p-6 sm:p-8 shadow-xs mb-10">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-red-50 text-[#800020] border border-[#800020]/20 flex items-center justify-center font-black">
            02
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1B3A5C]">
              Seller's Guide: Listing & Selling Fast
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Turn unused course material and dorm gear into cash
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-[#FAFBFC] border border-slate-200 rounded-2xl flex items-start gap-3">
            <Tag className="w-5 h-5 text-[#800020] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#1B3A5C]">1. Set Fair Student Pricing</h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Price items competitively relative to new retail cost. AU students appreciate honest deals for semester essentials.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FAFBFC] border border-slate-200 rounded-2xl flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-[#1B3A5C] shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#1B3A5C]">2. Clear Photos & Honest Descriptions</h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Upload clear images in good lighting. Highlight key details like textbook edition year, cycle tire condition, or battery health.
              </p>
            </div>
          </div>

          <div className="p-4 bg-[#FAFBFC] border border-slate-200 rounded-2xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-xs sm:text-sm text-[#1B3A5C]">3. Mark Items as 'Sold Out' When Handed Over</h4>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                Once a transaction is finalized, click the checkmark button on your listing card to mark it as "Sold Out". This keeps the marketplace clean and updated for fellow students.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 3: Safe Campus Meetup Zones */}
      <div className="bg-[#1B3A5C] text-white border-2 border-[#1B3A5C] rounded-3xl p-6 sm:p-8 shadow-xl mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-white/10 text-[#FFD93D] flex items-center justify-center">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Recommended Campus Meetup Zones
            </h2>
            <p className="text-xs text-[#C9E2F5] font-medium">
              Always schedule item handovers in bright, central public spaces on campus
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 bg-white/10 border border-white/10 rounded-2xl">
            <span className="font-black text-[#FFD93D] block mb-1">📍 Central Library Plaza</span>
            <span className="text-slate-200 font-medium">
              Ideal for textbook exchanges, research notes, and quiet study material handovers during daytime library hours.
            </span>
          </div>

          <div className="p-4 bg-white/10 border border-white/10 rounded-2xl">
            <span className="font-black text-[#FFD93D] block mb-1">📍 Student Activity Centre (SAC)</span>
            <span className="text-slate-200 font-medium">
              Great for sports gear, bicycles, campus merchandise, and casual meetups between lectures.
            </span>
          </div>

          <div className="p-4 bg-white/10 border border-white/10 rounded-2xl">
            <span className="font-black text-[#FFD93D] block mb-1">📍 University Canteen & Food Courts</span>
            <span className="text-slate-200 font-medium">
              High footfall, comfortable seating for testing electronics or powered gadgets while grabbing lunch.
            </span>
          </div>

          <div className="p-4 bg-white/10 border border-white/10 rounded-2xl">
            <span className="font-black text-[#FFD93D] block mb-1">📍 School Quadrangles (AMSOM / SEAS / SAS)</span>
            <span className="text-slate-200 font-medium">
              Convenient for quick between-class exchanges directly outside lecture halls.
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 4: FAQs */}
      <div className="bg-white border-2 border-[#1B3A5C] rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1B3A5C]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Common queries about marketplace safety and policies
            </p>
          </div>
        </div>

        <div className="space-y-4 text-xs sm:text-sm">
          <div className="border border-slate-200 rounded-2xl p-4 bg-[#FAFBFC]">
            <h4 className="font-extrabold text-[#1B3A5C] mb-1">Who can post and respond to listings?</h4>
            <p className="text-slate-600 font-medium">
              Only verified Ahmedabad University students, faculty, and staff logged in via their official <strong className="text-[#800020]">@ahduni.edu.in</strong> Google account can post items or contact sellers.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 bg-[#FAFBFC]">
            <h4 className="font-extrabold text-[#1B3A5C] mb-1">Does AUSM handle payments or shipping?</h4>
            <p className="text-slate-600 font-medium">
              No. AUSM is a direct peer-to-peer campus connection platform. Handovers occur in person on campus, and payments are settled directly between buyer and seller via UPI or cash.
            </p>
          </div>

          <div className="border border-slate-200 rounded-2xl p-4 bg-[#FAFBFC]">
            <h4 className="font-extrabold text-[#1B3A5C] mb-1">What should I do if an item is sold?</h4>
            <p className="text-slate-600 font-medium">
              Sellers can click the checkmark icon on their listing card at any time to mark the item as "Sold Out". Sold items display a subtle grayscale overlay and 'Sold Out' badge on the marketplace.
            </p>
          </div>
        </div>

        {onNavigateToTerms && (
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              Need more details on campus rules?
            </span>
            <button
              onClick={onNavigateToTerms}
              className="text-xs font-black text-[#800020] hover:underline inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Read Terms & Guidelines</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
};