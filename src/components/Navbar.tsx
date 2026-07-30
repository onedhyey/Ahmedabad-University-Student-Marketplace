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
  onOpenGuide?: () => void;
  onOpenDiscounts?: () => void;
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
  onOpenGuide,
  onOpenDiscounts,
  onOpenTerms,
  onOpenManifesto
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleSignIn = () => {
    onOpenSignIn();
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
                        if (onOpenGuide) onOpenGuide();
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
                        if (onOpenDiscounts) onOpenDiscounts();
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
                  className="flex items-center gap-1.5 sm:gap-2 bg-[#FAFBFC] border-2 border-[#1B3A5C] hover:border-[#800020] px-2.5 sm:px-3 py-1.5 rounded-full shadow-xs transition-all active:scale-95 cursor-pointer"
                  title={`Account: ${user.displayName || 'User'}`}
                >
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || 'User'}
                      className="w-6 h-6 rounded-full border border-[#1B3A5C] object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#595B5A] flex items-center justify-center text-white font-bold text-xs shrink-0">
                      {firstName[0]}
                    </div>
                  )}
                  <span className="text-xs font-bold text-[#1B3A5C] max-w-[100px] truncate hidden sm:inline">
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
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 inline shrink-0" />
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
                title={loading ? 'Signing in...' : 'Sign in'}
                aria-label={loading ? 'Signing in...' : 'Sign in'}
                className="bg-[#800020] hover:bg-[#600018] border-2 border-[#800020] hover:border-[#600018] text-white text-xs sm:text-sm font-extrabold px-3 sm:px-5 py-1.5 rounded-full transition-all active:scale-95 shadow-xs flex items-center gap-2 hover:shadow-md cursor-pointer disabled:opacity-50"
              >
                <LogIn className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">{loading ? 'Signing in...' : 'Sign in'}</span>
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
    </>
  );
};

