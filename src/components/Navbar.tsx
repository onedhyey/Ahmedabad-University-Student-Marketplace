import React, { useState, useRef, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  ShoppingBag, 
  LogIn, 
  LogOut, 
  Tag, 
  User as UserIcon, 
  ChevronDown, 
  CheckCircle2, 
  FileText, 
  Sparkles,
  BookOpen,
  Percent,
  Search,
  Shirt,
  HelpCircle,
  X,
  Building2,
  ShieldCheck,
  Compass,
  Gift
} from 'lucide-react';
import { signInWithGoogleAU, signOutUser } from '../lib/firebase';
import { Logo } from './Logo';

interface NavbarProps {
  user: User | null;
  activeTab: 'all' | 'favourites' | 'my-listings';
  setActiveTab: (tab: 'all' | 'favourites' | 'my-listings') => void;
  myListingsCount: number;
  onOpenSignIn: () => void;
  onShowDomainWarning: () => void;
  onNavigateHome?: () => void;
  onOpenTerms?: () => void;
  onOpenManifesto?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeTab,
  setActiveTab,
  myListingsCount,
  onOpenSignIn,
  onShowDomainWarning,
  onNavigateHome,
  onOpenTerms,
  onOpenManifesto
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Modals for resources
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [discountsModalOpen, setDiscountsModalOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
        setResourcesOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const res = await signInWithGoogleAU();
      if (!res.isAllowed) {
        onShowDomainWarning();
      }
    } catch (err) {
      console.error("Auth error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setDropdownOpen(false);
    setResourcesOpen(false);
    if (activeTab === 'my-listings') {
      setActiveTab('all');
    }
    await signOutUser();
  };

  const firstName = user?.displayName ? user.displayName.split(' ')[0] : 'AU Student';

  const handleLogoClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    setActiveTab('all');
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAFBFC]/95 backdrop-blur-md border-b-2 border-[#C9E2F5] shadow-xs" ref={navRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          
          {/* Left: Logo & Campus Tag */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-[#1B3A5C] p-1.5 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
              <Logo className="w-full h-full" color="#800020" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-2xl tracking-tight text-[#800020]">
                  AUSM
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden md:block">
                Ahmedabad University Student Marketplace
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Resources Dropdown Menu Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setResourcesOpen(!resourcesOpen);
                  setDropdownOpen(false);
                }}
                className={`flex items-center gap-1.5 text-xs sm:text-sm font-extrabold px-3.5 sm:px-4 py-1.5 rounded-full border-2 transition-all cursor-pointer active:scale-95 shadow-xs ${
                  resourcesOpen
                    ? 'bg-[#1B3A5C] text-white border-[#1B3A5C]'
                    : 'text-[#1B3A5C] bg-white hover:bg-[#C9E2F5]/30 border-[#1B3A5C] hover:border-[#800020]'
                }`}
                title="Explore AU Student Resources & Platform Info"
              >
                <Compass className="w-4 h-4 text-[#800020] transition-transform" />
                <span>Resources</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Resources Dropdown Container */}
              {resourcesOpen && (
                <div 
                  className="absolute right-0 mt-2.5 w-72 bg-white border-2 border-[#1B3A5C] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 overflow-hidden"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* SECTION 1: Student Resources */}
                  <div className="px-3 py-1.5 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#800020]">
                      Student Resources
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {/* Marketplace Guide */}
                    <button
                      onClick={() => {
                        setResourcesOpen(false);
                        setGuideModalOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1B3A5C] hover:bg-[#C9E2F5]/40 flex items-center gap-2.5 transition-colors cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-[#C9E2F5]/50 text-[#1B3A5C] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <span className="block leading-snug">Marketplace Guide</span>
                        <span className="block text-[10px] font-normal text-slate-500">Tips for buying & selling on campus</span>
                      </div>
                    </button>

                    {/* Student Discounts */}
                    <button
                      onClick={() => {
                        setResourcesOpen(false);
                        setDiscountsModalOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1B3A5C] hover:bg-[#C9E2F5]/40 flex items-center gap-2.5 transition-colors cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Percent className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <span className="block leading-snug">Student Discounts</span>
                        <span className="block text-[10px] font-normal text-slate-500">AU campus canteen & bookstore perks</span>
                      </div>
                    </button>

                    {/* Lost & Found (Coming Soon) */}
                    <div className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 flex items-center justify-between gap-2 bg-slate-50/60 border border-transparent">
                      <span className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                          <Search className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-500">Lost & Found</span>
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-500 shrink-0">
                        Coming Soon
                      </span>
                    </div>

                    {/* Student Merchandise (Coming Soon) */}
                    <div className="px-3 py-2 rounded-xl text-xs font-medium text-slate-400 flex items-center justify-between gap-2 bg-slate-50/60 border border-transparent">
                      <span className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-400 flex items-center justify-center shrink-0">
                          <Shirt className="w-3.5 h-3.5" />
                        </div>
                        <span className="font-bold text-slate-500">Student Merchandise</span>
                      </span>
                      <span className="text-[9px] font-extrabold uppercase tracking-wide px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-500 shrink-0">
                        Coming Soon
                      </span>
                    </div>
                  </div>

                  {/* SUBTLE DIVIDER */}
                  <div className="my-2 border-t border-slate-200" />

                  {/* SECTION 2: About AUSM */}
                  <div className="px-3 py-1.5 mb-1">
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#1B3A5C]">
                      About AUSM
                    </span>
                  </div>

                  <div className="space-y-0.5">
                    {/* Terms & Guidelines */}
                    <button
                      onClick={() => {
                        setResourcesOpen(false);
                        if (onOpenTerms) onOpenTerms();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1B3A5C] hover:bg-[#C9E2F5]/40 flex items-center gap-2.5 transition-colors cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-red-50 text-[#800020] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <FileText className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1">
                        <span className="block leading-snug">Terms & Guidelines</span>
                        <span className="block text-[10px] font-normal text-slate-500">Campus safety & item policies</span>
                      </div>
                    </button>

                    {/* Our Manifesto */}
                    <button
                      onClick={() => {
                        setResourcesOpen(false);
                        if (onOpenManifesto) onOpenManifesto();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold text-[#1B3A5C] hover:bg-[#C9E2F5]/40 flex items-center gap-2.5 transition-colors cursor-pointer group"
                    >
                      <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                        <Sparkles className="w-3.5 h-3.5 text-[#FFD93D] fill-[#FFD93D]" />
                      </div>
                      <div className="flex-1">
                        <span className="block leading-snug">Our Manifesto</span>
                        <span className="block text-[10px] font-normal text-slate-500">The sustainability movement</span>
                      </div>
                    </button>
                  </div>

                </div>
              )}
            </div>

            {/* Auth State */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => {
                    setDropdownOpen(!dropdownOpen);
                    setResourcesOpen(false);
                  }}
                  className="flex items-center gap-2 bg-[#FAFBFC] border-2 border-[#1B3A5C] hover:border-[#800020] px-3 py-1.5 rounded-full shadow-xs transition-all active:scale-95"
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-6 h-6 rounded-full border border-[#1B3A5C] object-cover"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#595B5A] flex items-center justify-center text-white font-bold text-xs">
                      {firstName[0]}
                    </div>
                  )}
                  <span className="text-xs font-bold text-[#1B3A5C] max-w-[100px] truncate">
                    {firstName}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#1B3A5C] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div 
                    className="absolute right-0 mt-2.5 w-56 bg-[#FAFBFC] border-2 border-[#1B3A5C] rounded-2xl shadow-lg p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="px-3 py-2 border-b border-slate-200 mb-1">
                      <p className="text-xs font-bold text-[#1B3A5C] truncate">{user.displayName}</p>
                      <p className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 inline" />
                        {user.email}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setActiveTab('my-listings');
                        setDropdownOpen(false);
                        document.getElementById('listings-grid-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        activeTab === 'my-listings'
                          ? 'bg-[#800020] text-white'
                          : 'text-[#1B3A5C] hover:bg-[#C9E2F5]/40'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Tag className="w-4 h-4" /> My Listings
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                        activeTab === 'my-listings' ? 'bg-white text-[#800020]' : 'bg-[#595B5A] text-white'
                      }`}>
                        {myListingsCount}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenManifesto) onOpenManifesto();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 mt-1 rounded-xl text-xs font-bold text-[#1B3A5C] hover:bg-[#C9E2F5]/40 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4 text-[#FFD93D] fill-[#FFD93D]" /> Our Manifesto
                    </button>

                    <button
                      onClick={() => {
                        if (onOpenTerms) onOpenTerms();
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 mt-1 rounded-xl text-xs font-bold text-[#1B3A5C] hover:bg-[#C9E2F5]/40 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-[#800020]" /> Terms & Conditions
                    </button>

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-3 py-2 mt-1 rounded-xl text-xs font-bold text-[#800020] hover:bg-amber-950/10 flex items-center gap-2 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={handleSignIn}
                disabled={loading}
                className="bg-[#800020] hover:bg-[#600018] border-2 border-[#800020] hover:border-[#600018] text-white text-xs sm:text-sm font-extrabold px-4 sm:px-5 py-1.5 rounded-full transition-all active:scale-95 shadow-xs flex items-center gap-2 hover:shadow-md cursor-pointer disabled:opacity-50"
              >
                <LogIn className="w-4 h-4" />
                <span>{loading ? 'Signing in...' : 'Sign in'}</span>
              </button>
            )}

            {/* Quick Cart / Browse Shortcut */}
            <button
              onClick={() => {
                if (onNavigateHome) onNavigateHome();
                const el = document.getElementById('listings-grid-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="p-2 text-[#1B3A5C] hover:bg-[#C9E2F5]/30 rounded-xl transition-colors relative cursor-pointer"
              title="Jump to Listings"
            >
              <ShoppingBag className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MODAL 1: Marketplace Guide */}
      {guideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-[#1B3A5C] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setGuideModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#1B3A5C] bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#C9E2F5]/60 text-[#1B3A5C] border border-[#1B3A5C]/20 flex items-center justify-center shrink-0">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#1B3A5C]">
                  AU Marketplace Guide
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  How to buy, sell, and meet safely on campus
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700">
              <div className="p-4 bg-[#FAFBFC] border border-slate-200 rounded-2xl">
                <h4 className="font-black text-[#800020] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> 1. Strictly Verified AU Accounts
                </h4>
                <p className="text-slate-600 font-medium">
                  Only users logged in via official <strong className="text-[#1B3A5C]">@ahduni.edu.in</strong> Google Workspace accounts can message sellers or post items. Non-student accounts are restricted automatically.
                </p>
              </div>

              <div className="p-4 bg-[#FAFBFC] border border-slate-200 rounded-2xl">
                <h4 className="font-black text-[#1B3A5C] mb-1 flex items-center gap-1.5">
                  <Building2 className="w-4 h-4" /> 2. Safe Campus Meetup Spots
                </h4>
                <p className="text-slate-600 font-medium">
                  Always arrange item inspection at popular, public university locations: Central Library Plaza, University Canteen, Student Activity Centre, or School courtyards.
                </p>
              </div>

              <div className="p-4 bg-[#FAFBFC] border border-slate-200 rounded-2xl">
                <h4 className="font-black text-[#1B3A5C] mb-1 flex items-center gap-1.5">
                  <Compass className="w-4 h-4 text-amber-600" /> 3. In-Person Inspection & Fair Pricing
                </h4>
                <p className="text-slate-600 font-medium">
                  Test electronics, inspect textbooks, or try bicycles before transferring payment. Sellers should provide accurate photos and descriptions.
                </p>
              </div>

              <div className="p-4 bg-[#FAFBFC] border border-slate-200 rounded-2xl">
                <h4 className="font-black text-[#1B3A5C] mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-emerald-600" /> 4. Direct UPI or Cash Payments
                </h4>
                <p className="text-slate-600 font-medium">
                  Sellers set prices in Rupees (₹). Buyers pay directly via UPI (Google Pay, PhonePe, Paytm) or cash at the time of handover.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setGuideModalOpen(false)}
                className="bg-[#1B3A5C] hover:bg-[#800020] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Got It, Thanks!
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Student Discounts */}
      {discountsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white border-2 border-[#1B3A5C] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setDiscountsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-[#1B3A5C] bg-slate-100 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 border border-amber-300 flex items-center justify-center shrink-0">
                <Gift className="w-6 h-6 text-[#800020]" />
              </div>
              <div>
                <h3 className="text-xl font-black text-[#1B3A5C]">
                  AU Student Perks & Discounts
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Exclusive savings available with your Ahmedabad University ID
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <div className="p-4 bg-[#FAFBFC] border border-amber-200 rounded-2xl">
                <div className="flex items-center gap-2 text-[#800020] font-black mb-1">
                  <Percent className="w-4 h-4" /> AU Canteen Combos
                </div>
                <p className="text-slate-600 text-xs font-medium">
                  Get 10% off selected lunch thalis and beverage combos with valid @ahduni student ID.
                </p>
              </div>

              <div className="p-4 bg-[#FAFBFC] border border-amber-200 rounded-2xl">
                <div className="flex items-center gap-2 text-[#1B3A5C] font-black mb-1">
                  <BookOpen className="w-4 h-4" /> Campus Stationery Hub
                </div>
                <p className="text-slate-600 text-xs font-medium">
                  Discounted spiral binding for course materials and bulk notebook prints.
                </p>
              </div>

              <div className="p-4 bg-[#FAFBFC] border border-amber-200 rounded-2xl">
                <div className="flex items-center gap-2 text-[#1B3A5C] font-black mb-1">
                  <Building2 className="w-4 h-4" /> Central Library Prints
                </div>
                <p className="text-slate-600 text-xs font-medium">
                  Free quota of 25 research paper printouts per semester at the AU Library desk.
                </p>
              </div>

              <div className="p-4 bg-[#FAFBFC] border border-amber-200 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-700 font-black mb-1">
                  <Gift className="w-4 h-4" /> Local Cafe Partner Perks
                </div>
                <p className="text-slate-600 text-xs font-medium">
                  Flash your AU ID at participating coffee spots in Navrangpura for 15% off espresso orders.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200 flex justify-between items-center">
              <span className="text-[11px] text-slate-500 font-medium">
                Show your physical or digital AU ID at checkout.
              </span>
              <button
                onClick={() => setDiscountsModalOpen(false)}
                className="bg-[#1B3A5C] hover:bg-[#800020] text-white font-extrabold text-xs px-5 py-2.5 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

