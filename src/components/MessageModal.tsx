import React, { useState } from 'react';
import { Listing } from '../types';
import { X, Send, Copy, Check, MessageSquare } from 'lucide-react';

interface MessageModalProps {
  listing: Listing | null;
  onClose: () => void;
  onShowToast: (msg: string) => void;
}

export const MessageModal: React.FC<MessageModalProps> = ({ listing, onClose, onShowToast }) => {
  if (!listing) return null;

  const defaultMessage = `Hi! I saw your listing for "${listing.name}" (₹${listing.price}) on Campus Cart AU and I'd like to buy it. Is it still available for campus pickup?`;

  const [message, setMessage] = useState(defaultMessage);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    onShowToast('Message copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
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
            <h3 className="font-extrabold text-lg text-[#1B3A5C]">Contact Seller</h3>
            <p className="text-xs text-slate-500 font-medium">AU Campus Marketplace Direct Message</p>
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
          <button
            onClick={handleCopy}
            className="flex-1 bg-[#800020] hover:bg-[#600018] text-white font-extrabold text-xs py-3 px-4 rounded-full transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied!' : 'Copy Message'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
