import React, { useState } from 'react';
import { Listing } from '../types';
import { X, Copy, Check, MessageSquare } from 'lucide-react';

// Simple inline WhatsApp glyph (lucide-react has no brand icons)
const WhatsAppIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.04 2c-5.52 0-10 4.48-10 10 0 1.77.46 3.45 1.27 4.9L2 22l5.25-1.38a9.94 9.94 0 0 0 4.79 1.22h.01c5.52 0 10-4.48 10-10s-4.49-9.84-10.01-9.84Zm0 18.15a8.1 8.1 0 0 1-4.14-1.13l-.3-.18-3.12.82.83-3.04-.19-.31a8.13 8.13 0 0 1-1.25-4.33c0-4.49 3.66-8.15 8.16-8.15 2.18 0 4.22.85 5.76 2.39a8.09 8.09 0 0 1 2.39 5.76c0 4.5-3.66 8.17-8.14 8.17Zm4.47-6.11c-.24-.12-1.45-.72-1.68-.8-.22-.08-.39-.12-.55.12-.16.24-.63.8-.78.97-.14.16-.28.18-.53.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.43-1.34-1.67-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.55-1.33-.76-1.82-.2-.48-.4-.42-.55-.42h-.47c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.13 3.64.58.25 1.03.4 1.38.51.58.18 1.11.16 1.53.1.47-.07 1.45-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28Z"/>
  </svg>
);

interface MessageModalProps {
  listing: Listing | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

// AUSM's point-of-contact WhatsApp number. As founder-run for now, every
// "Message on WhatsApp" tap comes straight here rather than to individual
// sellers, so no per-listing phone number needs to be collected or shown.
const FOUNDER_WHATSAPP_NUMBER = '918849064832'; // (+91) 88490 64832

export const MessageModal: React.FC<MessageModalProps> = ({ listing, onClose, onShowToast }) => {
  if (!listing) return null;

  const defaultMessage = `Hi AUSM! I'm interested in "${listing.name}" (₹${listing.price}), listed by ${listing.sellerName}, on Campus Cart AU. Could you help connect me with the seller?`;

  const [message, setMessage] = useState(defaultMessage);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    onShowToast('Message copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/${FOUNDER_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = () => {
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
          <div className="w-10 h-10 rounded-full bg-[#595B5A] border-2 border-[#1B3A5C] flex items-center justify-center font-bold text-lg text-white">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#1B3A5C]">Contact AUSM</h3>
            <p className="text-xs text-slate-500 font-medium">We'll connect you with the seller on WhatsApp</p>
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

        {/* Message Input Textarea */}
        <div className="space-y-2 mb-6">
          <label className="block text-xs font-extrabold uppercase tracking-wider text-[#1B3A5C]">
            Your Message
          </label>
          <textarea
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-white border-2 border-[#1B3A5C] rounded-2xl p-3 text-xs font-medium text-[#1B3A5C] focus:outline-none focus:ring-2 focus:ring-[#800020]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex-1 bg-[#25D366] hover:bg-[#1FB855] text-white font-extrabold text-xs py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Message on WhatsApp</span>
          </a>
          <button
            onClick={handleCopy}
            className="bg-white border-2 border-[#1B3A5C] text-[#1B3A5C] font-extrabold text-xs py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

      </div>
    </div>
  );
};
