import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Search, 
  ShieldCheck, 
  CheckCircle2, 
  BookOpen, 
  Sparkles, 
  Laptop, 
  Filter, 
  ChevronRight,
  Bookmark,
  GraduationCap
} from 'lucide-react';

interface DiscountsPageProps {
  onBackToMarketplace: () => void;
  onNavigateToGuide?: () => void;
  onNavigateToTerms?: () => void;
}

export type DiscountCategory = 'all' | 'learning' | 'developer' | 'design' | 'productivity' | 'entertainment' | 'hardware';

export interface DiscountPerk {
  id: string;
  number: string;
  name: string;
  category: DiscountCategory;
  categoryLabel: string;
  editorialText: string;
  badge: string;
  logoText: string;
  logoBg: string;
  logoTextColor: string;
  benefits: string[];
  howToClaim: string;
}

export const DiscountsPage: React.FC<DiscountsPageProps> = ({
  onBackToMarketplace,
  onNavigateToGuide,
  onNavigateToTerms
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DiscountCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const perks: DiscountPerk[] = [
    {
      id: 'coursera-linkedin',
      number: '01',
      name: 'Coursera, edX & LinkedIn Learning',
      category: 'learning',
      categoryLabel: 'Learning & Certification',
      editorialText: 'Many colleges already pay for campus-wide access. Courses and professional certificates you would otherwise buy are sitting free in your portal.',
      badge: 'FREE / DISCOUNTED WITH COLLEGE ID',
      logoText: 'CE',
      logoBg: 'bg-teal-800',
      logoTextColor: 'text-white',
      benefits: [
        'Ask your library or Placement cell for institutional login credentials',
        'Graded certificates included for free, not just audit mode access',
        'Add verified professional certificates directly to your LinkedIn profile'
      ],
      howToClaim: 'Your college LMS or university library portal SSO login'
    },
    {
      id: 'github-pack',
      number: '02',
      name: 'GitHub Student Developer Pack',
      category: 'developer',
      categoryLabel: 'Developer Tools',
      editorialText: 'The holy grail for student builders. Over $200,000 worth of premium developer tools, cloud credits, free domains, and AI coding assistants.',
      badge: '100% FREE FOR ENROLLED STUDENTS',
      logoText: 'GH',
      logoBg: 'bg-[#1B3A5C]',
      logoTextColor: 'text-white',
      benefits: [
        'Free GitHub Pro subscription & GitHub Copilot AI pair programmer',
        'Free 1-year custom domain name & SSL security certificate',
        'Free JetBrains IDEs, DigitalOcean cloud credits & Bootstrap Studio'
      ],
      howToClaim: 'Verify student status at education.github.com with student email'
    },
    {
      id: 'notion-edu',
      number: '03',
      name: 'Notion for Education',
      category: 'productivity',
      categoryLabel: 'Productivity & Notes',
      editorialText: 'Ditch scattered sticky notes and fragmented files. Notion Plus gives students unlimited file uploads and workspace history to organize course notes.',
      badge: 'FREE PLUS PLAN UNLOCKED',
      logoText: 'NT',
      logoBg: 'bg-slate-900',
      logoTextColor: 'text-white',
      benefits: [
        'Unlimited file upload size (bypasses standard 5MB free plan limit)',
        'Unlimited page history, custom study templates, and guest sharing',
        'Sync lecture notes, assignment trackers, and reading lists in one hub'
      ],
      howToClaim: 'Sign up or update account email to your official student address'
    },
    {
      id: 'figma-edu',
      number: '04',
      name: 'Figma Education Plan',
      category: 'design',
      categoryLabel: 'Design & Creative',
      editorialText: 'Industry-standard UI/UX design and whiteboarding software used by top product teams worldwide, unlocked completely free for verified students.',
      badge: 'FREE PRO ACCOUNT',
      logoText: 'FG',
      logoBg: 'bg-[#800020]',
      logoTextColor: 'text-white',
      benefits: [
        'Unlimited team files, design projects, and component libraries',
        'Full access to FigJam collaborative whiteboards & Dev Mode',
        'Real-time co-designing with classmates for group assignments'
      ],
      howToClaim: 'Verify student or educator status at figma.com/education'
    },
    {
      id: 'canva-edu',
      number: '05',
      name: 'Canva for Education',
      category: 'design',
      categoryLabel: 'Design & Creative',
      editorialText: 'Create presentation decks, research posters, infographics, and social media assets in seconds with thousands of premium templates and AI design tools.',
      badge: 'FREE PREMIUM ACCESS',
      logoText: 'CN',
      logoBg: 'bg-cyan-800',
      logoTextColor: 'text-white',
      benefits: [
        'Access 100M+ premium stock photos, graphics, videos, and fonts',
        'One-click AI background remover and brand kit customization',
        'Collaborative presentation slide decks with live presenter mode'
      ],
      howToClaim: 'Sign in with student email or link through GitHub Student Pack'
    },
    {
      id: 'perplexity-cursor',
      number: '06',
      name: 'Perplexity Pro & Cursor AI',
      category: 'developer',
      categoryLabel: 'Developer Tools',
      editorialText: 'Next-gen AI research and coding assistants offer high-capacity student tiers so you can synthesize literature and build code faster than ever.',
      badge: 'FREE / DISCOUNTED PRO ACCESSS',
      logoText: 'PX',
      logoBg: 'bg-indigo-900',
      logoTextColor: 'text-white',
      benefits: [
        'Perplexity Pro: Citation-backed academic search and paper summaries',
        'Cursor AI: Generous credits and student plans for AI code generation',
        'Deep web research mode for complex technical and thesis queries'
      ],
      howToClaim: 'Register with student email at perplexity.ai & cursor.com'
    },
    {
      id: 'spotify-youtube',
      number: '07',
      name: 'Spotify & YouTube Premium Student',
      category: 'entertainment',
      categoryLabel: 'Entertainment',
      editorialText: 'Enjoy ad-free music streaming, offline downloads, and background video playback for library study sessions at half the regular price.',
      badge: '50% OFF STUDENT RATE',
      logoText: 'SP',
      logoBg: 'bg-emerald-800',
      logoTextColor: 'text-white',
      benefits: [
        'Spotify Premium Student includes discounted rate + bundled Hulu',
        'YouTube Premium Student includes YouTube Music ad-free streaming',
        'Download focus playlists offline for campus commutes'
      ],
      howToClaim: 'Instant student verification via SheerID on Spotify or YouTube settings'
    },
    {
      id: 'jetbrains-pack',
      number: '08',
      name: 'JetBrains Student License',
      category: 'developer',
      categoryLabel: 'Developer Tools',
      editorialText: 'Get 100% free access to professional developer IDEs like IntelliJ IDEA, PyCharm, WebStorm, and CLion required in computer science courses.',
      badge: '100% FREE ALL IDEs',
      logoText: 'JB',
      logoBg: 'bg-slate-800',
      logoTextColor: 'text-white',
      benefits: [
        'Access all 15+ JetBrains desktop IDEs and developer utilities',
        'Renewable annually for as long as you remain a registered student',
        'Advanced code completion, refactoring, and debugging tools'
      ],
      howToClaim: 'Apply at jetbrains.com/community/education with student email'
    },
    {
      id: 'apple-edu',
      number: '09',
      name: 'Apple Education Pricing',
      category: 'hardware',
      categoryLabel: 'Hardware & Devices',
      editorialText: 'Save on MacBooks, iPads, and accessories all year round, plus receive promotional gift cards or free AirPods during back-to-school season.',
      badge: 'EDUCATION PRICING',
      logoText: 'AP',
      logoBg: 'bg-[#1B3A5C]',
      logoTextColor: 'text-white',
      benefits: [
        'Direct discounts on MacBook Air, MacBook Pro, iPad Pro, and iMacs',
        '20% off AppleCare+ protection plans for hardware peace of mind',
        'Apple Music Student plan includes free Apple TV+ streaming'
      ],
      howToClaim: 'Shop via Apple Education Store online or show student ID in-store'
    },
    {
      id: 'samsung-student',
      number: '10',
      name: 'Samsung Student Advantage',
      category: 'hardware',
      categoryLabel: 'Hardware & Devices',
      editorialText: 'Exclusive student savings on laptops, tablets, smartphones, monitors, and wearables along with enhanced trade-in bonuses.',
      badge: 'UP TO 30% OFF',
      logoText: 'SS',
      logoBg: 'bg-blue-900',
      logoTextColor: 'text-white',
      benefits: [
        'Direct discounts on Galaxy Book laptops, Galaxy Tab S series & phones',
        'No-cost EMI options and enhanced trade-in values for old devices',
        'Free doorstep delivery and exclusive student store colorways'
      ],
      howToClaim: 'Login via Samsung Student Advantage portal using student email'
    },
    {
      id: 'adobe-creative',
      number: '11',
      name: 'Adobe Creative Cloud Student',
      category: 'design',
      categoryLabel: 'Design & Creative',
      editorialText: 'Over 60% discount on the complete Adobe suite including Photoshop, Illustrator, Premiere Pro, After Effects, and Lightroom.',
      badge: '60%+ STUDENT DISCOUNT',
      logoText: 'AD',
      logoBg: 'bg-[#800020]',
      logoTextColor: 'text-white',
      benefits: [
        'Access 20+ desktop and mobile creative apps with 100GB cloud storage',
        'Includes Adobe Fonts, Behance portfolio showcase, and Adobe Express',
        'Generative AI credits powered by Adobe Firefly for design work'
      ],
      howToClaim: 'Verify student status at adobe.com/creativecloud/buy/students'
    },
    {
      id: 'microsoft-azure',
      number: '12',
      name: 'Microsoft Azure & Office 365',
      category: 'productivity',
      categoryLabel: 'Productivity & Cloud',
      editorialText: 'Free cloud computing credits for web hosting plus full desktop installations of Word, Excel, PowerPoint, and OneNote.',
      badge: 'FREE $100 CLOUD CREDIT + OFFICE',
      logoText: 'MS',
      logoBg: 'bg-sky-900',
      logoTextColor: 'text-white',
      benefits: [
        '$100 Azure cloud credits annually without requiring a credit card',
        'Free Office 365 desktop apps on up to 5 PCs/Macs per student',
        'Free Azure DevOps tools and GitHub integration for cloud hosting'
      ],
      howToClaim: 'Activate at azure.microsoft.com/free/students with student email'
    },
    {
      id: 'amazon-prime',
      number: '13',
      name: 'Amazon Prime Student',
      category: 'productivity',
      categoryLabel: 'Productivity & Shopping',
      editorialText: '6 months of free fast delivery, Prime Video streaming, and exclusive student discounts, followed by half-price membership.',
      badge: '6 MONTHS FREE TRIAL',
      logoText: 'AM',
      logoBg: 'bg-slate-900',
      logoTextColor: 'text-white',
      benefits: [
        'Free 2-day delivery on course textbooks, dorm gear, and supplies',
        'Full access to Prime Video movies, TV shows, and Prime Gaming',
        'Exclusive student deals on electronics and daily essentials'
      ],
      howToClaim: 'Sign up at amazon.com/joinstudent using student email address'
    },
    {
      id: 'overleaf-latex',
      number: '14',
      name: 'Overleaf Premium for Academics',
      category: 'learning',
      categoryLabel: 'Learning & Research',
      editorialText: 'Collaborative real-time LaTeX editor used for writing research papers, lab reports, and thesis documents without manual compiler setup.',
      badge: 'FREE / INSTITUTIONAL ACCESS',
      logoText: 'OL',
      logoBg: 'bg-emerald-900',
      logoTextColor: 'text-white',
      benefits: [
        'Real-time collaborative LaTeX editing with classmates and professors',
        'Full document compile history and GitHub repository sync',
        'Thousands of pre-formatted journal, conference, and thesis templates'
      ],
      howToClaim: 'Link student email address on overleaf.com or college portal'
    }
  ];

  const filteredPerks = perks.filter(perk => {
    const matchesCategory = selectedCategory === 'all' || perk.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      perk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perk.editorialText.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perk.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12 animate-in fade-in duration-200">
      
      {/* Top Navigation & Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <button
          onClick={onBackToMarketplace}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#1B3A5C] hover:text-[#800020] bg-white hover:bg-slate-100 border-2 border-[#1B3A5C] px-4 py-2 rounded-xl transition-all shadow-xs cursor-pointer active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Marketplace</span>
        </button>

        <div className="flex items-center gap-2">
          {onNavigateToGuide && (
            <button
              onClick={onNavigateToGuide}
              className="text-xs font-extrabold text-[#1B3A5C] hover:bg-slate-100 border border-[#1B3A5C]/20 px-3.5 py-2 rounded-xl transition-colors cursor-pointer"
            >
              Marketplace Guide &rarr;
            </button>
          )}
        </div>
      </div>

      {/* Main Editorial Header */}
      <div className="bg-white border-2 border-[#1B3A5C] rounded-3xl p-6 sm:p-10 shadow-md mb-10 relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-[#1B3A5C] text-white font-black text-xs px-3.5 py-1.5 rounded-full mb-4 shadow-xs uppercase tracking-wider">
            <GraduationCap className="w-4 h-4 text-slate-200" />
            <span>Curated Student Resource</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#1B3A5C] tracking-tight leading-none mb-4">
            The Hidden Student Perks Guide
          </h1>

          <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed mb-6">
            Many students miss out on thousands of dollars in valuable software subscriptions, professional developer tools, creative suites, and learning platforms simply because they don't know they exist. This page curates the most useful student discounts and free tools in one place — bookmark it and never pay full price while enrolled.
          </p>

          <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-[#1B3A5C]">
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="w-4 h-4 text-[#800020]" />
              <span>100% Verified Student Offers</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-100 border border-slate-300 px-3 py-1.5 rounded-lg">
              <Bookmark className="w-4 h-4 text-[#1B3A5C]" />
              <span>Updated for Current Academic Term</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-[#FAFBFC] border-2 border-[#1B3A5C] rounded-2xl p-4 sm:p-5 mb-10 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search perks (e.g. Spotify, GitHub, Figma, Apple, Notion)..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm font-medium text-[#1B3A5C] placeholder:text-slate-400 focus:outline-none focus:border-[#1B3A5C] focus:ring-1 focus:ring-[#1B3A5C]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="text-xs font-bold text-slate-500 shrink-0">
            Showing <strong className="text-[#1B3A5C]">{filteredPerks.length}</strong> of {perks.length} perks
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200">
          <span className="text-xs font-black text-[#1B3A5C] mr-1 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-[#1B3A5C] border border-slate-300'
            }`}
          >
            All Perks
          </button>

          <button
            onClick={() => setSelectedCategory('learning')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'learning'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-[#1B3A5C] border border-slate-300'
            }`}
          >
            Learning & Research
          </button>

          <button
            onClick={() => setSelectedCategory('developer')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'developer'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-[#1B3A5C] border border-slate-300'
            }`}
          >
            Developer Tools
          </button>

          <button
            onClick={() => setSelectedCategory('design')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'design'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-[#1B3A5C] border border-slate-300'
            }`}
          >
            Design & Creative
          </button>

          <button
            onClick={() => setSelectedCategory('productivity')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'productivity'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-[#1B3A5C] border border-slate-300'
            }`}
          >
            Productivity & Cloud
          </button>

          <button
            onClick={() => setSelectedCategory('hardware')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'hardware'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-[#1B3A5C] border border-slate-300'
            }`}
          >
            Hardware & Devices
          </button>

          <button
            onClick={() => setSelectedCategory('entertainment')}
            className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
              selectedCategory === 'entertainment'
                ? 'bg-[#1B3A5C] text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-[#1B3A5C] border border-slate-300'
            }`}
          >
            Entertainment
          </button>
        </div>
      </div>

      {/* Perks List Grid: 2 Columns on Desktop, 1 Column on Mobile */}
      {filteredPerks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {filteredPerks.map((perk) => (
            <div key={perk.id} className="flex flex-col justify-between group">
              
              {/* Reference Style Title & Editorial Text Above Card */}
              <div className="mb-3">
                <h2 className="text-xl sm:text-2xl font-black text-[#1B3A5C] tracking-tight">
                  {perk.number}/ {perk.name}:
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed mt-1.5">
                  {perk.editorialText}
                </p>
              </div>

              {/* Card Container */}
              <div className="bg-[#FAFBFC] border-2 border-[#1B3A5C]/20 group-hover:border-[#1B3A5C] rounded-3xl p-6 shadow-xs group-hover:shadow-md transition-all flex flex-col justify-between flex-1">
                <div>
                  {/* Card Header: Logo Badge + Title + Badge */}
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-sm shadow-xs shrink-0 ${perk.logoBg} ${perk.logoTextColor}`}>
                      {perk.logoText}
                    </div>
                    <div>
                      <h3 className="font-black text-base sm:text-lg text-[#1B3A5C] leading-snug">
                        {perk.name}
                      </h3>
                      <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#800020] block mt-0.5">
                        {perk.badge}
                      </span>
                    </div>
                  </div>

                  {/* Bullet Benefits List */}
                  <ul className="space-y-2.5 mb-5">
                    {perk.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                        <span className="w-2 h-2 rounded-full bg-[#1B3A5C] shrink-0 mt-1.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Where to Claim Divider & Section */}
                <div>
                  <div className="border-t border-slate-200/90 my-3" />
                  <div className="pt-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5">
                      WHERE TO CLAIM
                    </span>
                    <p className="text-xs font-bold text-[#1B3A5C] flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                      <span>{perk.howToClaim}</span>
                    </p>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-[#1B3A5C] rounded-3xl p-12 text-center my-8">
          <p className="text-base font-extrabold text-[#1B3A5C] mb-2">No student perks matched your search</p>
          <p className="text-xs text-slate-500 font-medium mb-4">Try searching for keywords like "Spotify", "GitHub", "Figma", or "Apple".</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="bg-[#1B3A5C] text-white font-extrabold text-xs px-4 py-2 rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Bottom Bookmark Banner */}
      <div className="bg-[#1B3A5C] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#1B3A5C] shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 bg-white/10 text-slate-200 font-bold text-[11px] px-3 py-1 rounded-full mb-2">
            <Sparkles className="w-3.5 h-3.5 text-slate-200" />
            <span>Always Use Your Institutional @edu Email</span>
          </div>
          <h3 className="text-xl font-black text-white">Never pay full price while studying</h3>
          <p className="text-xs text-slate-300 font-medium max-w-xl">
            Bookmark this page to reference during course registration, hackathons, semester project prep, and major device upgrades.
          </p>
        </div>

        <button
          onClick={onBackToMarketplace}
          className="bg-white text-[#1B3A5C] hover:bg-slate-100 font-extrabold text-xs px-5 py-3 rounded-xl transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
        >
          Return to Marketplace
        </button>
      </div>

    </div>
  );
};
