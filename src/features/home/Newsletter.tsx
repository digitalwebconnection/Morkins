import { useState, type FormEvent } from 'react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <section className="bg-[#F4F8F5] py-6 lg:py-10 px-4 text-center border-t border-b border-[#13442C]/10">
      <div className="max-w-5xl mx-auto">
        <p className="text-[13px] font-bold text-[#5E826D] uppercase tracking-[0.2em] mb-2.5">
          JOIN THE MORKINS COMMUNITY
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#13442C] leading-tight">
          Healthy Skin Starts Here
        </h2>
        <p className="text-stone-900 text-sm sm:text-base leading-relaxed mb-8 max-w-5xl mx-auto mt-3">
          Subscribe to receive skincare tips, exclusive product launches, dermatologist insights, and special offers delivered directly to your inbox.
        </p>
        
        {/* Unified Input + Button Container */}
        <form 
          className="relative flex items-center max-w-xl mx-auto bg-white rounded-full border border-[#13442C]/20 shadow-xs focus-within:border-[#13442C] focus-within:ring-2 focus-within:ring-[#13442C]/15 transition-all "
          onSubmit={handleSubmit}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="w-full pl-6 pr-4 py-2 bg-transparent text-[#162820] placeholder:text-stone-400 focus:outline-none text-sm"
            required
          />
          <button
            type="submit"
            className="px-7 py-3.5 rounded-r-full bg-[#13442C] hover:bg-[#1B6A45] text-white font-bold text-[11px] uppercase tracking-widest transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer shrink-0"
          >
            {subscribed ? '✓ SUBSCRIBED' : 'SUBSCRIBE'}
          </button>
        </form>

        {subscribed && (
          <p className="text-[#13442C] text-xs font-semibold mt-3 animate-fade-in">
            Thank you for subscribing to our newsletter!
          </p>
        )}
      </div>
    </section>
  )
}

