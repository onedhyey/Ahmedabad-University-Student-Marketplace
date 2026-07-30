import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, processAndUploadImage, signInWithGoogleAU, handleFirestoreError, OperationType } from '../lib/firebase';
import { ListingCategory, ListingCondition } from '../types';
import { PlusCircle, Send, Image as ImageIcon, Sparkles, AlertCircle, UploadCloud, CheckCircle2, Zap, HelpCircle, ChevronDown, ChevronUp, ShieldCheck } from 'lucide-react';

interface SellFormProps {
  user: User | null;
  onShowDomainWarning: () => void;
  onListingAdded: (listingId: string) => void;
}

const CATEGORIES: ListingCategory[] = ['Books', 'Cycles', 'Electronics', 'Other'];
const CONDITIONS: ListingCondition[] = ['Like New', 'Good', 'Fair'];

export const SellForm: React.FC<SellFormProps> = ({ user, onShowDomainWarning, onListingAdded }) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ListingCategory>('Books');
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<ListingCondition>('Like New');
  const [description, setDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showAccountHelp, setShowAccountHelp] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Please enter an item name.');
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setErrorMessage('Please enter a valid price in Rupees (₹).');
      return;
    }

    let activeUser = user;

    // If user is signed out, prompt Google auth
    if (!activeUser) {
      try {
        const authRes = await signInWithGoogleAU();
        if (!authRes.isAllowed || !authRes.user) {
          onShowDomainWarning();
          return;
        }
        activeUser = authRes.user;
      } catch (err) {
        setErrorMessage('Sign in failed. Please use your @ahduni.edu.in email to list items.');
        return;
      }
    }

    setIsSubmitting(true);
    setUploadProgress('Creating listing document...');

    try {
      const sellerId = activeUser.uid;
      const sellerName = activeUser.displayName || 'AU Student';
      const sellerPhoto = activeUser.photoURL || '';

      // 1. Initial doc creation
      const docRef = await addDoc(collection(db, 'listings'), {
        name: name.trim(),
        category,
        price: parsedPrice,
        condition,
        description: description.trim(),
        imageUrl: '',
        imagePath: '',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        sellerId,
        sellerName,
        sellerPhoto,
        isSold: false
      });

      const listingId = docRef.id;

      // 2. If an image is selected, process & upload to Firebase Storage
      let uploadedUrl = '';
      let uploadedPath = '';

      if (selectedFile) {
        setUploadProgress('Resizing & uploading image...');
        const uploadRes = await processAndUploadImage(selectedFile, sellerId, listingId);
        uploadedUrl = uploadRes.imageUrl;
        uploadedPath = uploadRes.imagePath;

        // Update document with image URLs
        const { updateDoc, doc } = await import('firebase/firestore');
        await updateDoc(doc(db, 'listings', listingId), {
          imageUrl: uploadedUrl,
          imagePath: uploadedPath,
          updatedAt: serverTimestamp()
        });
      }

      // Reset form
      setName('');
      setPrice('');
      setDescription('');
      setSelectedFile(null);
      setImagePreview(null);
      setUploadProgress(null);

      // Trigger callback & smooth scroll
      onListingAdded(listingId);

    } catch (err) {
      console.error('Error adding listing:', err);
      handleFirestoreError(err, OperationType.CREATE, 'listings');
      setErrorMessage('Failed to submit listing. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  return (
    <section id="sell-form-section" className="max-w-3xl mx-auto px-4 sm:px-6 my-12">
      {/* Dashed Coupon Card */}
      <div className="bg-[#FAFBFC] border-2 border-dashed border-[#1B3A5C]/40 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
        
        {/* Coupon Header Badge */}
        <div className="flex items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#800020] text-white flex items-center justify-center font-bold">
              <PlusCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#1B3A5C]">
                Sell an item
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Pass it on to another student at Ahmedabad University
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-[#595B5A] text-white text-xs font-bold px-3 py-1 rounded-full border border-[#1B3A5C]">
            <span>Instant Listing</span>
            <Zap className="w-3.5 h-3.5 text-white fill-white" />
          </span>
        </div>

        {errorMessage && (
          <div className="mb-6 bg-red-50 border-2 border-[#800020] rounded-2xl p-4 text-[#800020] text-xs sm:text-sm font-bold flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: Item Name & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
                Item Name <span className="text-[#800020]">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Hero Sprint Cycle, CLRS Textbook, Casio Calc"
                className="w-full bg-white border-2 border-[#1B3A5C] rounded-2xl px-4 py-3 text-sm font-semibold text-[#1B3A5C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800020]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
                Price (₹) <span className="text-[#800020]">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-sm font-black text-[#1B3A5C]">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min="0"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="500"
                  className="w-full bg-white border-2 border-[#1B3A5C] rounded-2xl pl-8 pr-4 py-3 text-sm font-semibold text-[#1B3A5C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800020]"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Category Chips */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
              Category <span className="text-[#800020]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => {
                const isSelected = category === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer border-2 border-[#1B3A5C] ${
                      isSelected
                        ? 'bg-[#800020] text-white shadow-xs'
                        : 'bg-white text-[#1B3A5C] hover:bg-[#C9E2F5]/30'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 3: Condition Chips */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
              Condition <span className="text-[#800020]">*</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {CONDITIONS.map((cond) => {
                const isSelected = condition === cond;
                return (
                  <button
                    key={cond}
                    type="button"
                    onClick={() => setCondition(cond)}
                    className={`px-4 py-2 rounded-full text-xs font-black transition-all cursor-pointer border-2 border-[#1B3A5C] ${
                      isSelected
                        ? 'bg-[#800020] text-white shadow-xs'
                        : 'bg-white text-[#1B3A5C] hover:bg-[#C9E2F5]/30'
                    }`}
                  >
                    {cond}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 4: Description */}
          <div className="space-y-1.5">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
              Short Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide details (e.g. edition, scratches, inclusion of accessories, pickup spot at AU)..."
              className="w-full bg-white border-2 border-[#1B3A5C] rounded-2xl px-4 py-3 text-sm font-semibold text-[#1B3A5C] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#800020]"
            />
          </div>

          {/* Row 5: Photo Upload (Client resize + Storage) */}
          <div className="space-y-2">
            <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
              Item Photo (Optional)
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <label className="w-full sm:w-auto bg-white border-2 border-dashed border-[#1B3A5C] hover:bg-[#C9E2F5]/20 px-5 py-3 rounded-2xl text-xs font-bold text-[#1B3A5C] cursor-pointer flex items-center justify-center gap-2 transition-colors">
                <ImageIcon className="w-4 h-4 text-[#800020]" />
                <span>{selectedFile ? 'Change Photo' : 'Choose Photo (Resized to 1200px)'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-[#1B3A5C] shrink-0">
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setImagePreview(null);
                    }}
                    className="absolute top-0 right-0 bg-[#800020] text-white text-[10px] w-4 h-4 flex items-center justify-center font-bold"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Uploading Status Overlay */}
          {uploadProgress && (
            <div className="bg-[#595B5A] border-2 border-[#1B3A5C] rounded-2xl p-3 flex items-center gap-3 text-xs font-bold text-white">
              <Send className="w-4 h-4 text-white animate-bounce" />
              <span>{uploadProgress}</span>
            </div>
          )}

          {/* 2 & 3. Unauthenticated Notice & Help Info */}
          {!user && (
            <div className="bg-[#C9E2F5]/30 border-2 border-[#1B3A5C] rounded-2xl p-4 my-4 space-y-3">
              <div className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#1B3A5C] text-white flex items-center justify-center text-xs font-black shrink-0 mt-0.5">
                  !
                </div>
                <div>
                  <h4 className="font-extrabold text-xs sm:text-sm text-[#1B3A5C] leading-snug">
                    Use your Ahmedabad University Google account to continue.
                  </h4>
                  <p className="text-xs font-medium text-[#1B3A5C]/90 leading-relaxed mt-0.5">
                    Only <span className="font-black underline decoration-[#800020] text-[#800020]">@ahduni.edu.in</span> email addresses are allowed to access AUSM. If you sign in with any other Google account, access will be denied.
                  </p>
                </div>
              </div>

              {/* 3. Help icon and muted text block */}
              <div className="border-t border-[#1B3A5C]/20 pt-2.5">
                <button
                  type="button"
                  onClick={() => setShowAccountHelp(!showAccountHelp)}
                  className="w-full text-left flex items-center justify-between text-xs font-bold text-slate-600 hover:text-[#1B3A5C] transition-colors cursor-pointer group"
                >
                  <span className="flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-[#800020] shrink-0" />
                  </span>
                  {showAccountHelp ? (
                    <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>

                {showAccountHelp && (
                  <div className="mt-2 p-3 bg-white/90 border border-slate-300 rounded-xl text-[11px] font-medium text-slate-600 space-y-1 leading-relaxed animate-in fade-in duration-150">
                    <p>
                      Signed in with the wrong Google account earlier? Your browser may automatically reuse that account.
                    </p>
                    <p className="font-semibold text-slate-700">
                      To choose a different account, clear this website's cookies/site data and then try signing in again.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#800020] hover:bg-[#600018] text-white font-black text-base px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Send className="w-5 h-5 animate-spin" />
                  <span>Posting Listing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>{user ? 'Post Listing Now' : 'Sign in with Google & Post Listing'}</span>
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};
