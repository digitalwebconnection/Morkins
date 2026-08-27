import React, { useState } from 'react';
import {
  Star, ThumbsUp, CheckCircle2, MessageSquare, 
  Sparkles, X} from 'lucide-react';
import type { User, Order } from '../../../types';

interface ReviewsTabProps {
  user: User;
  orders: Order[];
  t?: (key: string) => string;
}

interface ReviewItem {
  id: string;
  productId: number;
  productName: string;
  productImg: string;
  rating: number;
  title: string;
  comment: string;
  skinType: string;
  date: string;
  helpfulCount: number;
  verified: boolean;
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-1',
    productId: 1,
    productName: 'Rosewater Facial Mist',
    productImg: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    title: 'Transformative calming hydration for sensitive skin',
    comment: 'The cellular steam extraction makes a noticeable difference. It instantly soothes post-cleanse tightness without any sticky residue. Smells purely of fresh Damask petals.',
    skinType: 'Sensitive / Dehydrated',
    date: 'July 18, 2026',
    helpfulCount: 14,
    verified: true,
  },
  {
    id: 'rev-2',
    productId: 2,
    productName: 'Marula Nourishing Face Oil',
    productImg: 'https://images.unsplash.com/photo-1617897903246-719242758050?q=80&w=300&auto=format&fit=crop',
    rating: 5,
    title: 'Golden cold-pressed luxury oil',
    comment: 'Absorbs within seconds and leaves a velvet, non-greasy glow. My lipid barrier feels restored after 2 weeks of nightly use.',
    skinType: 'Combination Skin',
    date: 'May 30, 2026',
    helpfulCount: 9,
    verified: true,
  },
];

export const ReviewsTab: React.FC<ReviewsTabProps> = ({ user, orders }) => {
  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem(`morkins_reviews_${user.email}`);
    return saved ? JSON.parse(saved) : DEFAULT_REVIEWS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetProduct, setTargetProduct] = useState<{ id: number; name: string; img: string } | null>(null);
  const [newRating, setNewRating] = useState(5);
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newSkinType, setNewSkinType] = useState('Combination Skin');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Find all purchased items across delivered orders
  const allPurchasedItems = orders
    .flatMap((o) => o.items)
    .filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

  // Unreviewed items
  const pendingReviewItems = allPurchasedItems.filter(
    (item) => !reviews.some((r) => r.productId === item.id)
  );

  const handleOpenWriteModal = (item: { id: number; name: string; img: string }) => {
    setTargetProduct(item);
    setNewRating(5);
    setNewTitle('');
    setNewComment('');
    setIsModalOpen(true);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetProduct || !newTitle || !newComment) {
      alert('Please provide a review title and clinical feedback.');
      return;
    }
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      productId: targetProduct.id,
      productName: targetProduct.name,
      productImg: targetProduct.img,
      rating: newRating,
      title: newTitle,
      comment: newComment,
      skinType: newSkinType,
      date: 'Today',
      helpfulCount: 0,
      verified: true,
    };
    const updated = [newRev, ...reviews];
    setReviews(updated);
    localStorage.setItem(`morkins_reviews_${user.email}`, JSON.stringify(updated));
    setIsModalOpen(false);
    showToast('Review submitted! +50 Sanctuary Loyalty Leaves awarded.');
  };

  return (
    <div className="space-y-7 animate-fade-in text-[#1C2E1A]">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-[#12602F] text-white text-xs font-bold rounded-lg shadow-2xl border border-[#AFD971]/30 flex items-center gap-3 animate-slide-up">
          <CheckCircle2 className="w-4 h-4 text-[#AFD971] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ── 1. HEADER & REVIEWS KPI BAR ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-md relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-[#12602F] via-[#C49746] to-[#AFD971]" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-[#E5DEC9]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-linear-to-r from-[#D8EFE3] to-[#FAF8F2] border border-[#13442C]/20 text-[#0D3322] text-[10px] font-bold uppercase tracking-widest mb-2 shadow-2xs">
              <Star className="w-3 h-3 text-[#12602F]" />
              <span>Verified Botanical Community Testimonials</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1C2E1A]">
              My Clinical Reviews
            </h2>
            <p className="text-xs sm:text-sm text-[#464D3F] mt-1 max-w-2xl leading-relaxed">
              Share authentic feedback on your skin journey, help fellow botanical patrons, and earn +50 Sanctuary Leaves for each verified review.
            </p>
          </div>

          <div className="p-3.5 bg-[#FAF8F2] rounded-lg border border-[#DDD3C1] text-xs font-mono text-[#12602F] font-bold flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            <span>+{reviews.length * 50} Leaves Earned</span>
          </div>
        </div>

        {/* 3 Metric Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
          <div className="p-4 bg-linear-to-b from-[#FAF8F2] to-white rounded-lg border border-[#DDD3C1]/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Published Reviews
            </span>
            <strong className="font-serif text-xl font-bold text-[#1C2E1A] mt-0.5 block">
              {reviews.length} Submissions
            </strong>
          </div>

          <div className="p-4 bg-linear-to-b from-[#FAF8F2] to-white rounded-lg border border-[#DDD3C1]/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Average Rating Given
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <strong className="font-serif text-xl font-bold text-[#12602F]">5.0</strong>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-linear-to-b from-[#FAF8F2] to-white rounded-lg border border-[#DDD3C1]/80 shadow-2xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#8C6221] block">
              Community Upvotes
            </span>
            <strong className="font-serif text-xl font-bold text-[#1C2E1A] mt-0.5 block items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-[#12602F]" />
              <span>{reviews.reduce((acc, r) => acc + r.helpfulCount, 0)} Helpful Votes</span>
            </strong>
          </div>
        </div>
      </div>

      {/* ── 2. PENDING REVIEWS (EARN LEAVES) ── */}
      {pendingReviewItems.length > 0 && (
        <div className="bg-white rounded-lg p-6 sm:p-7 border border-[#DDD3C1] shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#8C6221]" />
              <h3 className="font-serif text-base font-bold text-[#1C2E1A]">
                Pending Feedback (+50 Leaves Each)
              </h3>
            </div>
            <span className="text-[10px] font-mono font-bold text-[#12602F] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {pendingReviewItems.length} Waiting
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {pendingReviewItems.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-[#FAF8F2] rounded-lg border border-[#E5DEC9] flex items-center justify-between gap-3 shadow-2xs"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-12 h-12 rounded-lg object-cover bg-white border border-[#DDD3C1] shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-serif text-xs font-bold text-[#1C2E1A] truncate">{item.name}</h4>
                    <p className="text-[10px] text-stone-500 font-mono">Delivered Harvest</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenWriteModal(item)}
                  className="px-3 py-1.5 rounded-lg bg-[#12602F] hover:bg-[#1B6A45] text-white text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs whitespace-nowrap"
                >
                  Write Review
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── 3. PUBLISHED REVIEWS LIST ── */}
      <div className="bg-white rounded-lg p-6 sm:p-8 border border-[#DDD3C1] shadow-sm space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5DEC9]">
          <h3 className="font-serif text-lg font-bold text-[#1C2E1A] flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#12602F]" />
            <span>Published Reviews ({reviews.length})</span>
          </h3>
          <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">
            Live in Community
          </span>
        </div>

        <div className="divide-y divide-[#E5DEC9]">
          {reviews.map((rev) => (
            <div key={rev.id} className="py-5 first:pt-0 last:pb-0 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.productImg}
                    alt={rev.productName}
                    className="w-12 h-12 rounded-lg object-cover bg-[#FAF8F2] border border-[#DDD3C1] shrink-0 shadow-2xs"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-[#1C2E1A]">
                      {rev.productName}
                    </h4>
                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                      <div className="flex text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-amber-400" />
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-[#12602F] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                        ✓ Verified Buyer
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        Skin Type: {rev.skinType}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-stone-400 self-start sm:self-auto">
                  {rev.date}
                </span>
              </div>

              <div>
                <h5 className="font-serif text-xs font-bold text-[#1C2E1A] mb-1">
                  "{rev.title}"
                </h5>
                <p className="text-xs text-[#464D3F] leading-relaxed font-light">
                  {rev.comment}
                </p>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-stone-500 pt-1">
                <span className="flex items-center gap-1 text-[#12602F] font-bold">
                  <ThumbsUp className="w-3 h-3" />
                  <span>{rev.helpfulCount} people found this helpful</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── MODAL: WRITE REVIEW ── */}
      {isModalOpen && targetProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#162820]/60 backdrop-blur-xs transition-opacity animate-fade-in"
            onClick={() => setIsModalOpen(false)}
          />

          <div className="relative bg-white rounded-lg max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#DDD3C1] z-10 animate-scale-up space-y-4">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D8EFE3] text-[#0D3322] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                <Sparkles className="w-3 h-3 text-[#12602F]" />
                <span>Earn +50 Sanctuary Leaves</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#1C2E1A]">
                Review {targetProduct.name}
              </h3>
            </div>

            <form onSubmit={handleReviewSubmit} className="space-y-4 pt-1">
              {/* Rating selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                  Overall Clinical Rating
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewRating(star)}
                      className="p-1 cursor-pointer hover:scale-110 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= newRating ? 'text-amber-400 fill-amber-400' : 'text-stone-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold font-mono text-[#12602F] ml-2">
                    {newRating}/5 Stars
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Headline / Key Takeaway
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Noticeable glow in 7 days without irritation"
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-xs font-medium text-[#1C2E1A] bg-[#FAF8F2] outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Skin Compatibility
                </label>
                <select
                  value={newSkinType}
                  onChange={(e) => setNewSkinType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-xs font-medium text-[#1C2E1A] bg-[#FAF8F2] outline-none cursor-pointer"
                >
                  <option value="Sensitive / Dehydrated">Sensitive / Dehydrated</option>
                  <option value="Combination Skin">Combination Skin</option>
                  <option value="Dry / Mature">Dry / Mature</option>
                  <option value="Oily / Acne-Prone">Oily / Acne-Prone</option>
                  <option value="Normal Balanced">Normal Balanced</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-1">
                  Clinical Experience & Feedback
                </label>
                <textarea
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Describe texture, absorption, cellular results, and scent..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-200 text-xs text-[#1C2E1A] bg-[#FAF8F2] outline-none"
                  required
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-lg border border-stone-200 text-stone-700 text-xs font-bold uppercase tracking-wider hover:bg-stone-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-2.5 rounded-lg bg-[#12602F] hover:bg-[#1B6A45] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer shadow-xs"
                >
                  Publish & Earn +50 Leaves
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;
