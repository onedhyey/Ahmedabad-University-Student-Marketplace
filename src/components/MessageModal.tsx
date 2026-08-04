import React, { useState } from 'react';
import { Listing } from '../types';
import { X, MessageCircle } from 'lucide-react';

interface MessageModalProps {
  listing: Listing | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

// AUSM's official WhatsApp contact number.
// Buyers contact AUSM directly. AUSM coordinates with the seller,
// keeping both parties' personal contact details private.
const AUSM_WHATSAPP_NUMBER = '918849064832'; // +91 88490 64832

export const MessageModal: React.FC<MessageModalProps> = ({
  listing,
  onClose,
  onShowToast
}) => {
  if (!listing) return null;

  const defaultMessage = `Hi AUSM!

I'd like to buy "${listing.name}" if it's still available.

Could you please let me know the next steps?

Thanks!`;

  const [message, setMessage] = useState(defaultMessage);

  const whatsappHref = `https://wa.me/${AUSM_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleMessageUs = () => {
    onShowToast('Opening WhatsApp...');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1B3A5C]/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAFBFC] border-2 border-[#1B3A5C] rounded-3xl max-w-md w-full p-6 shadow-xl relative">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-[#FAFBFC] border-2 border-[#1B3A5C] p-1.5 rounded-full text-[#1B3A5C] hover:bg-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-[#595B5A] border-2 border-[#1B3A5C] flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>

          <div>
            <h3 className="font-extrabold text-lg text-[#1B3A5C]">
              Message AUSM
            </h3>

            <p className="text-xs text-slate-500 font-medium">
              Your privacy comes first. AUSM will coordinate with the seller on your behalf.
            </p>
          </div>
        </div>

        {/* Listing Summary */}
        <div className="bg-[#C9E2F5]/30 border-2 border-[#1B3A5C] rounded-2xl p-3 mb-4 flex items-center gap-3">
          {listing.imageUrl ? (
            <img
              src={listing.imageUrl}
              alt={listing.name}
              className="w-12 h-12 rounded-xl object-cover border border-[#1B3A5C]"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-[#595B5A] border border-[#1B3A5C] flex items-center justify-center font-bold text-xs text-white">
              {listing.category[0]}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <p className="font-bold text-xs text-[#1B3A5C] truncate">
              {listing.name}
            </p>

            <p className="font-black text-sm text-[#800020]">
              ₹{listing.price.toLocaleString('en-IN')}
            </p>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2 mb-6">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
            Your Message
          </label>

          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white border-2 border-[#1B3A5C] rounded-2xl p-3 text-xs font-medium text-[#1B3A5C] focus:outline-none focus:ring-2 focus:ring-[#800020]"
          />
        </div>

        {/* Action Button */}
        <div className="flex gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleMessageUs}
            className="flex-1 bg-[#800020] hover:bg-[#600018] text-white font-extrabold text-xs py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Continue on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};