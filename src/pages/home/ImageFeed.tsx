import { useState } from 'react'

const IMAGES = [
  'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1598440947570-5b5f2575b6e6?auto=format&fit=crop&w=400&q=80',
  'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80',
]

export default function ImageFeed() {
  const [startIndex, setStartIndex] = useState(0)

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % (IMAGES.length - 3))
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + (IMAGES.length - 3)) % (IMAGES.length - 3))
  }

  return (
    <section className="py-20 bg-brand-cream text-brand-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#195641] uppercase">Social Feed</span>
            <h2 className="font-serif text-4xl font-normal mt-2 leading-tight">Follow Our Journey</h2>
            <p className="text-brand-dark/60 text-sm mt-2">Tag us @morkinsofficial to share your routine and be featured.</p>
          </div>
          <div className="flex items-center gap-2 mt-6 sm:mt-0">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all cursor-pointer"
              aria-label="Previous images"
            >
              &larr;
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-full border border-brand-dark/20 flex items-center justify-center hover:bg-brand-dark hover:text-white transition-all cursor-pointer"
              aria-label="Next images"
            >
              &rarr;
            </button>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 transition-transform duration-500">
            {IMAGES.slice(startIndex, startIndex + 4).map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 border border-brand-dark/5"
              >
                <img
                  src={img}
                  alt={`Skincare Routine ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Hover Instagram Icon Overlay */}
                <div className="absolute inset-0 bg-[#17335A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
