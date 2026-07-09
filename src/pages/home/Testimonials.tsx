import { useState, useRef } from 'react'

interface SocialPost {
  id: number
  videoUrl: string
  thumbnailUrl: string
  productName: string
  productImg: string
  price: string
  description: string
  ingredients: string
  rating: number
  reviewsCount: number
}

const SOCIAL_POSTS: SocialPost[] = [
  {
    id: 1,
    videoUrl: 'https://v1.pinimg.com/videos/mc/720p/5a/68/24/5a68242ade693aba90875d897b13feda.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522337360788-8b13edd793be?auto=format&fit=crop&w=600&h=800&q=80',
    productName: 'Glow Boosting Serum',
    productImg: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=100&h=100&q=80',
    price: '$38.00',
    rating: 4.9,
    reviewsCount: 124,
    description: 'A lightweight, fast-absorbing serum packed with 10% Vitamin C and hyaluronic acid to instantly illuminate your skin tone, target dark spots, and provide all-day deep hydration.',
    ingredients: '98% Organic Vitamin C, Pure Hyaluronic Acid, Ferulic Acid, Licorice Root Extract'
  },
  {
    id: 2,
    videoUrl: 'https://v1.pinimg.com/videos/mc/720p/c7/53/28/c7532835d5cdd682b924426ef89fc404.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&h=800&q=80',
    productName: 'Barrier Restore Cream',
    productImg: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=100&h=100&q=80',
    price: '$42.00',
    rating: 4.8,
    reviewsCount: 98,
    description: "A rich nourishing cream designed to rebuild and protect your skin's moisture barrier. Enriched with ceramides, squalane, and soothing centella asiatica to calm redness.",
    ingredients: 'Ceramides NP/AP/EOP, Sugarcane Squalane, Centella Asiatica (Cica), Organic Shea Butter'
  },
  {
    id: 3,
    videoUrl: 'https://v1.pinimg.com/videos/mc/720p/20/8b/66/208b662971933336108fb8c94cc8707d.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&h=800&q=80',
    productName: 'Rosehip Replenishing Oil',
    productImg: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=100&h=100&q=80',
    price: '$34.00',
    rating: 4.9,
    reviewsCount: 143,
    description: '100% organic cold-pressed rosehip seed oil. Rich in essential fatty acids and antioxidants to promote cellular regeneration, smooth fine lines, and restore natural elasticity.',
    ingredients: 'Cold-pressed Rosa Canina (Rosehip) Seed Oil, Vitamin E (Tocopherol)'
  },
  {
    id: 4,
    videoUrl: 'https://v1.pinimg.com/videos/iht/expMp4/c1/01/3b/c1013b79a42ad85819f1a79874761d01_720w.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=600&h=800&q=80',
    productName: 'Vitamin C Bright Gel',
    productImg: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=100&h=100&q=80',
    price: '$28.00',
    rating: 4.7,
    reviewsCount: 84,
    description: 'A cooling gel-moisturizer that revives dull, tired skin. Packed with citrus extracts and kakadu plum to deliver a burst of antioxidants and locks in oil-free moisture.',
    ingredients: 'Kakadu Plum Extract, Aloe Vera Leaf Juice, Green Tea Leaf Extract'
  },
  {
    id: 5,
    videoUrl: 'https://v1.pinimg.com/videos/iht/expMp4/69/ff/46/69ff46836623d68f45a2ff1e86dcc28c_720w.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&h=800&q=80',
    productName: 'Daily Sun Protect SPF 50',
    productImg: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=100&h=100&q=80',
    price: '$36.00',
    rating: 4.8,
    reviewsCount: 112,
    description: 'An ultra-sheer, broad-spectrum mineral SPF 50 sunscreen. Leaves a completely transparent, dewy finish with zero white cast, doubling as a hydrating primer.',
    ingredients: 'Non-Nano Zinc Oxide 12%, Green Tea Extract, Sea Buckthorn, Hyaluronic Acid'
  },
  {
    id: 6,
    videoUrl: 'https://v1.pinimg.com/videos/iht/expMp4/a2/5e/06/a25e060090543422d12d9d1407f665fb_720w.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&h=800&q=80',
    productName: 'Squalane Facial Oil',
    productImg: 'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&w=100&h=100&q=80',
    price: '$32.00',
    rating: 4.9,
    reviewsCount: 76,
    description: "Pure sugarcane-derived squalane oil. Mirrors your skin's natural sebum to seal in moisture, balance oil production, and enhance your skin glow without clogging pores.",
    ingredients: '100% Sugarcane-Derived Squalane'
  }
]

interface TestimonialsProps {
  onAddToCart?: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void
}

export default function Testimonials({ onAddToCart }: TestimonialsProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const [selectedPost, setSelectedPost] = useState<SocialPost | null>(null)
  const [modalMuted, setModalMuted] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleScroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = 340
      sliderRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const handleAddToCartClick = () => {
    if (selectedPost && onAddToCart) {
      const itemPrice = parseFloat(selectedPost.price.replace('$', ''))
      onAddToCart({
        id: selectedPost.id + 1000,
        name: selectedPost.productName,
        price: itemPrice,
        img: selectedPost.productImg
      }, false)
      for (let i = 1; i < quantity; i++) {
        onAddToCart({
          id: selectedPost.id + 1000,
          name: selectedPost.productName,
          price: itemPrice,
          img: selectedPost.productImg
        }, false)
      }
      setShowSuccess(true)
      setTimeout(() => {
        setShowSuccess(false)
      }, 2500)
    }
  }

  return (
    <section className="py-14 bg-white overflow-hidden">
      {/* Hide horizontal scrollbar and define modal keyframes */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          .animate-fade-in {
            animation: fadeIn 0.25s ease-out forwards;
          }
          .animate-scale-up {
            animation: scaleUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `
      }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-4 relative">
        
        {/* Section Header */}
        <div className="mb-6 flex flex-col text-left">
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#17335A] uppercase tracking-wider">
            TRENDING ON FEED
          </h2>
          <p className="text-brand-dark tracking-wide text-md mt-1">
            Real skin, unfiltered results. Tap any creator's video to instantly shop their daily Morkins routine.
          </p>
        </div>

        {/* Carousel Container (with hover transitions for arrows) */}
        <div className="relative w-full group/slider overflow-hidden rounded-xl">
          
          {/* Left Arrow Button (shows crescent when not hovered, slides to semi-circle when hovered) */}
          <button
            onClick={() => handleScroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 translate-x-[-85%] opacity-30 z-20 w-25 h-25 rounded-full bg-black/20 hover:bg-white/85 flex items-center justify-end pr-4.5 text-black transition-all duration-500 group-hover/slider:opacity-100 group-hover/slider:translate-x-[-40%] cursor-pointer active:scale-95"
            aria-label="Scroll Left"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow Button (shows crescent when not hovered, slides to semi-circle when hovered) */}
          <button
            onClick={() => handleScroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[85%] opacity-30 z-20 w-25 h-25 rounded-full bg-black/20 hover:bg-white/85 flex items-center justify-start pl-4.5 text-black transition-all duration-500 group-hover/slider:opacity-100 group-hover/slider:translate-x-[40%] cursor-pointer active:scale-95"
            aria-label="Scroll Right"
          >
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Slider Panel */}
          <div 
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar py-2"
          >
            {SOCIAL_POSTS.map((post) => (
              <div 
                key={post.id}
                onClick={() => {
                  setSelectedPost(post)
                  setModalMuted(true)
                  setQuantity(1)
                }}
                className="relative flex-none w-56 sm:w-65 h-[340px] sm:h-[450px] rounded-lg overflow-hidden shadow-sm border border-brand-dark/5 group/card cursor-pointer"
              >
                
                {/* Loop Video Element */}
                <video
                  src={post.videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  ref={(el) => {
                    if (el) {
                      el.defaultMuted = true;
                      el.muted = true;
                      el.play().catch(() => {});
                    }
                  }}
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700"
                />

                {/* Glassmorphic Play Overlay (Center) */}
                <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-black/20 opacity-0 group-hover/card:opacity-100 transition-all duration-500 flex items-center justify-center z-10">
                  <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transform scale-90 group-hover/card:scale-100 hover:bg-white hover:text-[#17335A] transition-all duration-300 shadow-[0_8px_32px_0_rgba(0,0,0,0.15)]">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>

                {/* Floating Bottom Product Tag - Refined Glassmorphic style (Hidden by default, slides up on hover) */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-lg p-2 flex items-center justify-between gap-2 z-10 opacity-0 translate-y-4 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-y-0 group-hover/card:bg-black/60 group-hover/card:border-white/20">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img 
                      src={post.productImg} 
                      alt={post.productName} 
                      className="w-9 h-9 object-cover rounded-md border border-white/20 bg-white/10 shrink-0" 
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="text-white text-[10px] font-bold leading-none tracking-wider uppercase truncate">
                        {post.productName}
                      </span>
                      <span className="text-white/60 text-[8px] font-medium tracking-wide mt-1 uppercase">
                        Quick Shop
                      </span>
                    </div>
                  </div>
                  
                  {/* Shopping Bag Icon that turns into solid white button on hover */}
                  <div className="flex items-center justify-center w-8 h-8 rounded-md bg-white/10 text-white group-hover/card:bg-white group-hover/card:text-[#17335A] transition-all duration-300 shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 0 1-8 0" />
                    </svg>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Shoppable Video Modal Overlay */}
      {selectedPost && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedPost(null)}
        >
          {/* Modal Card Container */}
          <div 
            className="relative w-full max-w-4xl bg-white rounded-lg overflow-hidden shadow-2xl flex flex-col md:flex-row h-[90vh] md:h-[550px] border border-brand-dark/10 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-30 p-2 rounded-full bg-black/10 hover:bg-black/25 text-white md:text-[#5c7886] md:bg-gray-50 md:hover:bg-gray-100 transition-all duration-300 cursor-pointer shadow-sm"
              aria-label="Close modal"
            >
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Left Column: Video Player */}
            <div className="relative w-full md:w-[42%] h-[45%] md:h-full bg-black shrink-0">
              <video
                src={selectedPost.videoUrl}
                autoPlay
                loop
                muted={modalMuted}
                playsInline
                ref={(el) => {
                  if (el) {
                    el.defaultMuted = modalMuted;
                    el.muted = modalMuted;
                    el.play().catch(() => {});
                  }
                }}
                className="w-full h-full object-cover"
              />
              {/* Mute/Unmute Toggle Button */}
              <button
                onClick={() => setModalMuted(!modalMuted)}
                className="absolute bottom-4 right-4 z-20 p-2.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all duration-300 cursor-pointer"
              >
                {modalMuted ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Right Column: Product Info & Actions */}
            <div className="w-full md:w-[58%] h-[55%] md:h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar bg-white">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold tracking-widest text-brand-light uppercase">MORKINS BEAUTY</span>
                <h3 className="font-serif text-[#17335A] text-2xl font-normal mt-1 leading-tight">{selectedPost.productName}</h3>
                
                {/* Product Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4.5 h-4.5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-[#5c7886] font-medium">{selectedPost.rating} ({selectedPost.reviewsCount} reviews)</span>
                </div>

                {/* Price Display */}
                <div className="text-xl font-bold text-[#17335A] mt-3 font-mono">
                  {selectedPost.price}
                </div>

                {/* Accent Divider */}
                <hr className="my-4.5 border-gray-100" />

                {/* Details / Description */}
                <p className="text-xs sm:text-sm text-[#5c7886] leading-relaxed">
                  {selectedPost.description}
                </p>

                {/* Ingredients Pill */}
                <div className="mt-5 p-3.5 bg-gray-50 rounded-xl border border-gray-100">
                  <span className="text-[9px] uppercase font-bold tracking-widest text-[#17335A] block">Key Ingredients</span>
                  <span className="text-xs text-[#5c7886] mt-0.5 block italic leading-relaxed">{selectedPost.ingredients}</span>
                </div>
              </div>

              {/* Action Buttons: Quantity & Add to Cart */}
              <div className="mt-6 md:mt-0 pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-3 bg-white">
                {/* Quantity input */}
                <div className="flex items-center justify-between border border-gray-200 rounded-lg h-12 px-3 sm:w-32 shrink-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="text-[#5c7886] hover:text-[#17335A] font-bold text-lg px-2 cursor-pointer select-none"
                  >
                    -
                  </button>
                  <span className="text-[#17335A] font-bold text-sm font-mono">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="text-[#5c7886] hover:text-[#17335A] font-bold text-lg px-2 cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>
                
                {/* Submit Action */}
                <button 
                  onClick={handleAddToCartClick}
                  className={`flex-1 h-12 text-white font-bold text-xs tracking-widest uppercase rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98 ${
                    showSuccess ? 'bg-brand-light' : 'bg-[#41677a] hover:bg-[#17335A]'
                  }`}
                >
                  {showSuccess ? (
                    <>
                      <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Added
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      
    </section>
  )
}
