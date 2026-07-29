import React, { useState, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { auth, db, isAUStudent, signOutUser, handleFirestoreError, OperationType } from './lib/firebase';
import { Listing } from './types';
import { seedInitialListingsIfEmpty } from './lib/seed';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SellForm } from './components/SellForm';
import { ListingsSection } from './components/ListingsSection';
import { MessageModal } from './components/MessageModal';
import { DomainErrorToast } from './components/DomainErrorToast';
import { Footer } from './components/Footer';
import { TermsPage } from './TermsPage';
import { GuidePage } from './components/GuidePage';
import { DiscountsPage } from './components/DiscountsPage';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [listings, setListings] = useState<Listing[]>([]);
  const [listingsLoading, setListingsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<'all' | 'favourites' | 'my-listings'>('all');
  const [selectedMessageListing, setSelectedMessageListing] = useState<Listing | null>(null);
  const [showDomainWarning, setShowDomainWarning] = useState(false);

  const [view, setView] = useState<'marketplace' | 'guide' | 'discounts' | 'terms' | 'manifesto'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/guide' || hash === '#guide') return 'guide';
      if (path === '/discounts' || hash === '#discounts') return 'discounts';
      if (path === '/terms' || hash === '#terms') return 'terms';
      if (path === '/manifesto' || hash === '#manifesto') return 'manifesto';
    }
    return 'marketplace';
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [newlyAddedId, setNewlyAddedId] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 3000);
  };

  // URL routing listener for /guide, /discounts, /terms, /manifesto, or hashes
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/guide' || hash === '#guide') {
        setView('guide');
      } else if (path === '/discounts' || hash === '#discounts') {
        setView('discounts');
      } else if (path === '/terms' || hash === '#terms') {
        setView('terms');
      } else if (path === '/manifesto' || hash === '#manifesto') {
        setView('manifesto');
      } else {
        setView('marketplace');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  const navigateToGuide = () => {
    setView('guide');
    try {
      if (window.location.pathname !== '/guide') {
        window.history.pushState(null, '', '/guide');
      }
    } catch {
      window.location.hash = 'guide';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToDiscounts = () => {
    setView('discounts');
    try {
      if (window.location.pathname !== '/discounts') {
        window.history.pushState(null, '', '/discounts');
      }
    } catch {
      window.location.hash = 'discounts';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTerms = () => {
    setView('terms');
    try {
      if (window.location.pathname !== '/terms') {
        window.history.pushState(null, '', '/terms');
      }
    } catch {
      window.location.hash = 'terms';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToManifesto = () => {
    setView('manifesto');
    try {
      if (window.location.pathname !== '/manifesto') {
        window.history.pushState(null, '', '/manifesto');
      }
    } catch {
      window.location.hash = 'manifesto';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setView('marketplace');
    try {
      if (window.location.pathname !== '/' || window.location.hash !== '') {
        window.history.pushState(null, '', '/');
      }
    } catch {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 1. Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        if (!isAUStudent(currentUser)) {
          await signOutUser();
          setUser(null);
          setShowDomainWarning(true);
        } else {
          setUser(currentUser);
        }
      } else {
        setUser(null);
      }
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // 2. Seed initial items if empty & Realtime Firestore Subscription
  useEffect(() => {
    seedInitialListingsIfEmpty();

    const q = query(collection(db, 'listings'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetched: Listing[] = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
            name: data.name || '',
            category: data.category || 'Other',
            price: data.price || 0,
            condition: data.condition || 'Good',
            description: data.description || '',
            imageUrl: data.imageUrl || '',
            imagePath: data.imagePath || '',
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            sellerId: data.sellerId || '',
            sellerName: data.sellerName || 'AU Student',
            sellerPhoto: data.sellerPhoto || '',
            isSold: !!data.isSold
          };
        });

        setListings(fetched);
        setListingsLoading(false);
      },
      (error) => {
        console.error("Listings real-time subscription error:", error);
        handleFirestoreError(error, OperationType.LIST, 'listings');
        setListingsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const myListingsCount = user
    ? listings.filter((item) => item.sellerId === user.uid).length
    : 0;

  const handleListingAdded = (listingId: string) => {
    setNewlyAddedId(listingId);
    showToast('Listing posted live to campus marketplace!');

    // Smooth scroll to grid
    setTimeout(() => {
      const gridEl = document.getElementById('listings-grid-section');
      gridEl?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    setTimeout(() => {
      setNewlyAddedId(null);
    }, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#800020] selection:text-white">
      
      {/* Toast Popup Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-[#595B5A] border-2 border-[#1B3A5C] text-white font-extrabold text-xs px-4 py-3 rounded-2xl shadow-lg animate-in slide-in-from-top-4 duration-200">
          {toastMessage}
        </div>
      )}

      {/* Navbar */}
      <Navbar
        user={user}
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (view !== 'marketplace') {
            navigateToHome();
          }
        }}
        myListingsCount={myListingsCount}
        onOpenSignIn={() => {}}
        onShowDomainWarning={() => setShowDomainWarning(true)}
        onNavigateHome={navigateToHome}
        onOpenGuide={navigateToGuide}
        onOpenDiscounts={navigateToDiscounts}
        onOpenTerms={navigateToTerms}
        onOpenManifesto={navigateToManifesto}
      />

      {/* Main Page Layout */}
      <main className="flex-1">
        {view === 'guide' ? (
          <GuidePage
            onBackToMarketplace={navigateToHome}
            onNavigateToDiscounts={navigateToDiscounts}
            onNavigateToTerms={navigateToTerms}
          />
        ) : view === 'discounts' ? (
          <DiscountsPage
            onBackToMarketplace={navigateToHome}
            onNavigateToGuide={navigateToGuide}
            onNavigateToTerms={navigateToTerms}
          />
        ) : view === 'terms' || view === 'manifesto' ? (
          <TermsPage 
            initialTab={view === 'manifesto' ? 'manifesto' : 'terms'} 
            onBackToMarketplace={navigateToHome} 
            onNavigateToTab={(tab) => {
              if (tab === 'manifesto') navigateToManifesto();
              else navigateToTerms();
            }}
          />
        ) : (
          <>
            {/* (1) Hero Section */}
            <Hero />

            {/* (2) Sell an item Form */}
            <SellForm
              user={user}
              onShowDomainWarning={() => setShowDomainWarning(true)}
              onListingAdded={handleListingAdded}
            />

            {/* (3) Listings Grid with Search, Filters & Tabs */}
            <ListingsSection
              listings={listings}
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onOpenMessageModal={(listing) => setSelectedMessageListing(listing)}
              onShowToast={showToast}
              newlyAddedId={newlyAddedId}
            />
          </>
        )}
      </main>

      {/* (4) Footer */}
      <Footer 
        onOpenGuide={navigateToGuide}
        onOpenDiscounts={navigateToDiscounts}
        onOpenTerms={navigateToTerms} 
        onOpenManifesto={navigateToManifesto} 
      />

      {/* Modals & Popups */}
      {selectedMessageListing && (
        <MessageModal
          listing={selectedMessageListing}
          onClose={() => setSelectedMessageListing(null)}
          onShowToast={showToast}
        />
      )}

      {showDomainWarning && (
        <DomainErrorToast onClose={() => setShowDomainWarning(false)} />
      )}

    </div>
  );
}

