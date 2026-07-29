import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { Listing, ListingCategory } from '../types';
import { deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db, deleteListingImage, handleFirestoreError, OperationType } from '../lib/firebase';
import { Search, Heart, Share2, MessageCircle, Trash2, Tag, BookOpen, Bike, Zap, Package, Check, Sparkles, Ban, CheckCircle2, RotateCcw } from 'lucide-react';

interface ListingsSectionProps {
  listings: Listing[];
  user: User | null;
  activeTab: 'all' | 'favourites' | 'my-listings';
  setActiveTab: (tab: 'all' | 'favourites' | 'my-listings') => void;
  onOpenMessageModal: (listing: Listing) => void;
  onShowToast: (msg: string) => void;
  newlyAddedId: string | null;
}

const CATEGORY_FILTERS: ('All' | ListingCategory)[] = ['All', 'Books', 'Cycles', 'Electronics', 'Other'];

export const ListingsSection: React.FC<ListingsSectionProps> = ({
  listings,
  user,
  activeTab,
  setActiveTab,
  onOpenMessageModal,
  onShowToast,
  newlyAddedId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | ListingCategory>('All');
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('au_campus_favourites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Visibly count up live listings
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    try {
      localStorage.setItem('au_campus_favourites', JSON.stringify(favourites));
    } catch (e) {
      console.warn("Storage warning:", e);
    }
  }, [favourites]);

  // Live count up animation
  const totalListings = listings.length;
  useEffect(() => {
    if (displayCount === totalListings) return;
    const step = totalListings > displayCount ? 1 : -1;
    const timer = setTimeout(() => {
      setDisplayCount((prev) => prev + step);
    }, 40);
    return () => clearTimeout(timer);
  }, [totalListings, displayCount]);

  const toggleFavourite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavourites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleShare = async (listing: Listing, e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = `${window.location.origin}#listing-${listing.id}`;
    const text = `${listing.name} — ₹${listing.price}, ${listing.condition}. Check it out on Campus Cart: ${shareUrl}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Campus Cart: ${listing.name}`,
          text: text,
          url: shareUrl
        });
      } catch (err) {
        // Fallback to copy if user cancels or fails
      }
    } else {
      navigator.clipboard.writeText(text);
      onShowToast('Link copied to clipboard!');
    }
  };

  const handleDelete = async (listing: Listing, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!window.confirm(`Are you sure you want to delete "${listing.name}"?`)) return;

    try {
      // 1. Delete image from Storage if path exists
      if (listing.imagePath) {
        await deleteListingImage(listing.imagePath);
      }
      // 2. Delete document from Firestore
      await deleteDoc(doc(db, 'listings', listing.id));
      onShowToast('Listing deleted successfully');
    } catch (err) {
      console.error('Failed to delete listing:', err);
      handleFirestoreError(err, OperationType.DELETE, `listings/${listing.id}`);
      onShowToast('Failed to delete listing.');
    }
  };

  const handleToggleSold = async (listing: Listing, e: React.MouseEvent) => {
    e.stopPropagation();
    const nextSoldState = !listing.isSold;
    try {
      await updateDoc(doc(db, 'listings', listing.id), {
        isSold: nextSoldState,
        updatedAt: serverTimestamp()
      });
      onShowToast(nextSoldState ? 'Listing marked as Sold Out' : 'Listing marked as Available');
    } catch (err) {
      console.error('Failed to update listing status:', err);
      handleFirestoreError(err, OperationType.UPDATE, `listings/${listing.id}`);
      onShowToast('Failed to update status.');
    }
  };

  // Filter listings based on Tab, Category, and Search Query
  const filteredListings = listings.filter((item) => {
    // Tab filter
    if (activeTab === 'favourites') {
      if (!favourites.includes(item.id)) return false;
    } else if (activeTab === 'my-listings') {
      if (!user || item.sellerId !== user.uid) return false;
    }

    // Category filter
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description?.toLowerCase().includes(q) || false;
      const matchCat = item.category.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat) return false;
    }

    return true;
  });

  // Placeholder SVG Graphic generator based on Category
  const renderCategoryPlaceholder = (category: ListingCategory) => {
    switch (category) {
      case 'Books':
        return (
          <div className="w-full h-full bg-[#FAFBFC] border-b-2 border-[#1B3A5C] flex flex-col items-center justify-center p-6 text-center text-[#1B3A5C]">
            <BookOpen className="w-12 h-12 text-[#800020] mb-2" />
            <span className="font-doodle text-xl font-bold">Textbook / Notes</span>
          </div>
        );
      case 'Cycles':
        return (
          <div className="w-full h-full bg-[#FAFBFC] border-b-2 border-[#1B3A5C] flex flex-col items-center justify-center p-6 text-center text-[#1B3A5C]">
            <Bike className="w-12 h-12 text-[#1B3A5C] mb-2" />
            <span className="font-doodle text-xl font-bold">Campus Bicycle</span>
          </div>
        );
      case 'Electronics':
        return (
          <div className="w-full h-full bg-[#FAFBFC] border-b-2 border-[#1B3A5C] flex flex-col items-center justify-center p-6 text-center text-[#1B3A5C]">
            <Zap className="w-12 h-12 text-[#1B3A5C] mb-2" />
            <span className="font-doodle text-xl font-bold">Gadget / Calc</span>
          </div>
        );
      default:
        return (
          <div className="w-full h-full bg-[#FAFBFC] border-b-2 border-[#1B3A5C] flex flex-col items-center justify-center p-6 text-center text-[#1B3A5C]">
            <Package className="w-12 h-12 text-[#1B3A5C] mb-2" />
            <span className="font-doodle text-xl font-bold">Campus Used Item</span>
          </div>
        );
    }
  };

  return (
    <section id="listings-grid-section" className="max-w-6xl mx-auto px-4 sm:px-6 my-12 scroll-mt-20">
      
      {/* Header: Live Count & Tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        
        {/* Live Count Counter */}
        <div className="flex items-center gap-3">
          <div className="bg-[#595B5A] text-white border-2 border-[#1B3A5C] font-extrabold text-lg px-4 py-1.5 rounded-2xl shadow-xs flex items-center gap-2">
            <Zap className="w-5 h-5 text-white fill-white" />
            <span>{displayCount}</span>
            <span className="text-xs uppercase tracking-wider font-black">Live Listings</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-[#FAFBFC] border-2 border-[#1B3A5C] p-1.5 rounded-full shadow-xs">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#800020] text-white shadow-xs'
                : 'text-[#1B3A5C] hover:bg-[#C9E2F5]/30'
            }`}
          >
            All Listings
          </button>

          <button
            onClick={() => setActiveTab('favourites')}
            className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'favourites'
                ? 'bg-[#800020] text-white shadow-xs'
                : 'text-[#1B3A5C] hover:bg-[#C9E2F5]/30'
            }`}
          >
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>My Favourites ({favourites.length})</span>
          </button>

          {user && (
            <button
              onClick={() => setActiveTab('my-listings')}
              className={`px-4 py-1.5 rounded-full text-xs font-black transition-all cursor-pointer ${
                activeTab === 'my-listings'
                  ? 'bg-[#800020] text-white shadow-xs'
                  : 'text-[#1B3A5C] hover:bg-[#C9E2F5]/30'
              }`}
            >
              My Listings
            </button>
          )}
        </div>
      </div>

      {/* (1) Search Bar: Pill Shape Matching Theme */}
      <div className="relative mb-4">
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-[#1B3A5C]/60" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for books, cycles, electronics…"
          className="w-full bg-[#FAFBFC] border-2 border-[#1B3A5C] rounded-full pl-12 pr-4 py-3 text-sm font-semibold text-[#1B3A5C] placeholder-[#1B3A5C]/50 focus:outline-none focus:ring-2 focus:ring-[#800020] shadow-xs"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-3 text-xs font-bold bg-[#1B3A5C] text-white rounded-full w-5 h-5 flex items-center justify-center"
          >
            ×
          </button>
        )}
      </div>

      {/* (2) Category Filter Chips directly below search bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        {CATEGORY_FILTERS.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-black border-2 border-[#1B3A5C] transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#800020] text-white shadow-xs'
                  : 'bg-[#FAFBFC] text-[#1B3A5C] hover:bg-[#C9E2F5]/40'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid of Corkboard Index Cards */}
      {filteredListings.length === 0 ? (
        <div className="bg-[#FAFBFC] border-2 border-dashed border-[#1B3A5C] rounded-3xl p-12 text-center my-8">
          <div className="w-16 h-16 bg-[#595B5A] text-white border-2 border-[#1B3A5C] rounded-full mx-auto flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-black text-[#1B3A5C] mb-2">No listings found</h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
            {activeTab === 'favourites'
              ? "You haven't added any items to your favourites yet. Click the heart icon on any listing card to save it here!"
              : activeTab === 'my-listings'
              ? "You haven't listed any items for sale yet. Fill out the form above to post your first item!"
              : "Try adjusting your search terms or selecting a different category filter."}
          </p>
          {(searchQuery || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="bg-[#1B3A5C] text-white text-xs font-bold px-4 py-2 rounded-full hover:bg-[#1B3A5C]/80 transition-colors"
            >
              Reset Filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing, index) => {
            const isFav = favourites.includes(listing.id);
            const isNewlyAdded = listing.id === newlyAddedId;
            const isOwner = user && listing.sellerId === user.uid;

            // Slight random corkboard tilt effect
            const tiltClass = index % 2 === 0 ? 'card-pinned-left' : 'card-pinned-right';

            return (
              <div
                key={listing.id}
                id={`listing-${listing.id}`}
                className={`border-2 border-[#1B3A5C] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative group ${
                  listing.isSold ? 'bg-slate-100/90 border-[#1B3A5C]/70' : 'bg-[#FAFBFC]'
                } ${tiltClass} ${
                  isNewlyAdded ? 'ring-4 ring-[#800020] animate-pulse' : ''
                }`}
              >
                {/* Sticky-note Category Tag in Top Corner */}
                <div className={`absolute top-3 left-3 z-30 border-2 border-[#1B3A5C] font-black text-[11px] px-2.5 py-1 rounded-lg shadow-xs uppercase tracking-wider ${
                  listing.isSold ? 'bg-slate-600 text-slate-200' : 'bg-[#595B5A] text-white'
                }`}>
                  {listing.category}
                </div>

                {/* (3) Heart / Favourite Doodle Icon Top-Right */}
                <button
                  onClick={(e) => toggleFavourite(listing.id, e)}
                  className="absolute top-3 right-3 z-30 bg-[#FAFBFC] border-2 border-[#1B3A5C] p-2 rounded-full shadow-xs hover:scale-110 active:scale-95 transition-transform cursor-pointer"
                  title={isFav ? 'Remove from favourites' : 'Add to favourites'}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${
                      isFav ? 'fill-[#800020] text-[#800020]' : 'text-[#1B3A5C]'
                    }`}
                  />
                </button>

                {/* Card Media Header */}
                <div>
                  <div className={`w-full h-48 relative overflow-hidden border-b-2 border-[#1B3A5C] ${listing.isSold ? 'bg-slate-200' : 'bg-slate-100'}`}>
                    {listing.imageUrl ? (
                      <img
                        src={listing.imageUrl}
                        alt={listing.name}
                        className={`w-full h-full object-cover transition-transform duration-300 ${
                          listing.isSold ? 'grayscale contrast-75 brightness-90 opacity-80' : 'group-hover:scale-105'
                        }`}
                        loading="lazy"
                      />
                    ) : (
                      <div className={listing.isSold ? 'grayscale contrast-75 opacity-70 w-full h-full' : 'w-full h-full'}>
                        {renderCategoryPlaceholder(listing.category)}
                      </div>
                    )}

                    {/* Grayscale Overlay & Sold Out Badge overlay */}
                    {listing.isSold && (
                      <>
                        <div className="absolute inset-0 bg-slate-900/35 backdrop-grayscale z-10 pointer-events-none" />
                        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none p-2">
                          <div className="bg-[#1B3A5C] text-white border-2 border-white px-4 py-1.5 rounded-full font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl flex items-center gap-2 transform -rotate-3 backdrop-blur-xs">
                            <Ban className="w-4 h-4 text-rose-400 shrink-0" />
                            <span>Sold Out</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Condition Badge */}
                    <div className="absolute bottom-3 right-3 z-20 bg-[#FAFBFC] text-[#1B3A5C] border-2 border-[#1B3A5C] font-extrabold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {listing.condition}
                    </div>
                  </div>

                  {/* Card Main Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className={`font-extrabold text-lg line-clamp-2 leading-tight ${listing.isSold ? 'text-slate-500' : 'text-[#1B3A5C]'}`}>
                        {listing.name}
                      </h3>
                    </div>

                    {/* Price in Bold Notebook Red or Greyed-Out if Sold */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-2xl font-black ${listing.isSold ? 'text-slate-400 line-through' : 'text-[#800020]'}`}>
                        ₹{listing.price.toLocaleString('en-IN')}
                      </span>
                      {listing.isSold && (
                        <span className="text-[10px] font-black uppercase tracking-wider bg-slate-200 text-slate-700 border border-slate-400 px-2 py-0.5 rounded-md">
                          Sold
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className={`text-xs line-clamp-2 leading-relaxed mb-4 ${listing.isSold ? 'text-slate-400' : 'text-slate-600'}`}>
                      {listing.description || 'No description provided.'}
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-4 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (!listing.isSold) onOpenMessageModal(listing);
                    }}
                    disabled={listing.isSold}
                    className={`flex-1 font-extrabold text-xs py-2.5 px-3 rounded-full transition-colors flex items-center justify-center gap-1.5 ${
                      listing.isSold
                        ? 'bg-slate-200 text-slate-500 border-2 border-slate-300 cursor-not-allowed opacity-80 shadow-none'
                        : 'bg-[#1B3A5C] hover:bg-[#122840] text-white cursor-pointer'
                    }`}
                    title={listing.isSold ? 'This item has been sold out' : 'Message seller'}
                  >
                    {listing.isSold ? (
                      <>
                        <Ban className="w-3.5 h-3.5 text-slate-400" />
                        <span>Sold Out</span>
                      </>
                    ) : (
                      <>
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Message seller</span>
                      </>
                    )}
                  </button>

                  {/* Share button */}
                  <button
                    onClick={(e) => handleShare(listing, e)}
                    className="p-2.5 bg-[#FAFBFC] border-2 border-[#1B3A5C] hover:bg-[#C9E2F5]/30 text-[#1B3A5C] rounded-full transition-colors cursor-pointer"
                    title="Share listing"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Owner Mark as Sold / Available toggle */}
                  {isOwner && (
                    <button
                      onClick={(e) => handleToggleSold(listing, e)}
                      className={`p-2.5 border-2 rounded-full transition-colors cursor-pointer ${
                        listing.isSold
                          ? 'bg-emerald-50 border-emerald-600 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-amber-50 border-amber-600 text-amber-800 hover:bg-amber-100'
                      }`}
                      title={listing.isSold ? 'Re-list item (Mark as Available)' : 'Mark item as Sold'}
                    >
                      {listing.isSold ? (
                        <RotateCcw className="w-3.5 h-3.5" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}

                  {/* Delete button for seller */}
                  {isOwner && (
                    <button
                      onClick={(e) => handleDelete(listing, e)}
                      className="p-2.5 bg-red-50 border-2 border-[#800020] text-[#800020] hover:bg-[#800020] hover:text-white rounded-full transition-colors cursor-pointer"
                      title="Delete listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </section>
  );
};
