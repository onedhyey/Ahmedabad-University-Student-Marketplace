import React, { useState } from 'react';
import { User } from 'firebase/auth';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, signInWithGoogleAU, handleFirestoreError, OperationType } from '../lib/firebase';
import { Listing } from '../types';
import { X, Flag, AlertCircle, CheckCircle2 } from 'lucide-react';

export type ReportReason = 'Scam' | 'Inappropriate' | 'Sold elsewhere' | 'Other';

const REPORT_REASONS: ReportReason[] = ['Scam', 'Inappropriate', 'Sold elsewhere', 'Other'];

interface ReportModalProps {
  listing: Listing | null;
  user: User | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
  onShowDomainWarning: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ listing, user, onClose, onShowToast, onShowDomainWarning }) => {
  const [reason, setReason] = useState<ReportReason>('Scam');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!listing) return null;

  const handleSubmit = async () => {
    setErrorMessage(null);

    let activeUser = user;
    if (!activeUser) {
      try {
        const authRes = await signInWithGoogleAU();
        if (!authRes.isAllowed || !authRes.user) {
          onShowDomainWarning();
          return;
        }
        activeUser = authRes.user;
      } catch (err) {
        setErrorMessage('Sign in failed. Please use your @ahduni.edu.in email to report a listing.');
        return;
      }
    }

    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'reports'), {
        listingId: listing.id,
        reporterId: activeUser.uid,
        reason,
        createdAt: serverTimestamp()
      });
      setSubmitted(true);
      onShowToast('Thanks — this listing has been reported to our moderators.');
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error('Failed to submit report:', err);
      handleFirestoreError(err, OperationType.CREATE, 'reports');
      setErrorMessage('Failed to submit report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B3A5C]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAFBFC] border-2 border-[#1B3A5C] rounded-3xl max-w-md w-full p-6 shadow-xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#FAFBFC] border-2 border-[#1B3A5C] p-1.5 rounded-full text-[#1B3A5C] hover:bg-slate-200 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#800020] border-2 border-[#1B3A5C] flex items-center justify-center font-bold text-lg text-white">
            <Flag className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#1B3A5C]">Report Listing</h3>
            <p className="text-xs text-slate-500 font-medium">Help keep AUSM safe for everyone</p>
          </div>
        </div>

        {/* Item summary banner */}
        <div className="bg-[#C9E2F5]/30 border-2 border-[#1B3A5C] rounded-2xl p-3 mb-4 flex items-center gap-3">
          {listing.imageUrl ? (
            <img src={listing.imageUrl} alt={listing.name} className="w-12 h-12 rounded-xl object-cover border border-[#1B3A5C]" />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#595B5A] border border-[#1B3A5C] flex items-center justify-center font-bold text-xs text-white">
              {listing.category[0]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-bold text-xs text-[#1B3A5C] truncate">{listing.name}</p>
            <p className="font-black text-sm text-[#800020]">₹{listing.price.toLocaleString('en-IN')}</p>
          </div>
        </div>

        {errorMessage && (
          <div className="mb-4 bg-red-50 border-2 border-[#800020] rounded-2xl p-3 text-[#800020] text-xs font-bold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {submitted ? (
          <div className="bg-emerald-50 border-2 border-emerald-600 rounded-2xl p-4 text-emerald-800 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 shrink-0" />
            <span>Report submitted. Thank you for flagging this.</span>
          </div>
        ) : (
          <>
            {/* Reason Dropdown */}
            <div className="space-y-1.5 mb-6">
              <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
                Reason for reporting <span className="text-[#800020]">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as ReportReason)}
                className="w-full bg-white border-2 border-[#1B3A5C] rounded-2xl px-4 py-3 text-sm font-semibold text-[#1B3A5C] focus:outline-none focus:ring-2 focus:ring-[#800020] cursor-pointer"
              >
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
              {!user && (
                <p className="text-[11px] font-medium text-slate-500 pt-1">
                  You'll be asked to sign in with your @ahduni.edu.in account to submit this report.
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#800020] hover:bg-[#600018] text-white font-black text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Flag className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Report'}</span>
            </button>
          </>
        )}

      </div>
    </div>
  );
};
