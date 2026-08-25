export default function Newsletter() {
  return (
    <section className="bg-white/30 py-8 lg:py-18 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-[16px] font-bold text-[#A68A56] uppercase tracking-[0.2em] mb-3">
          JOIN THE MORKINS COMMUNITY
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl font-medium text-[#0B1A28] leading-tight">
          Healthy Skin Starts Here
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          Subscribe to receive skincare tips, exclusive product launches, dermatologist insights, and special offers delivered directly to your inbox.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-2/3 px-6 py-4 rounded-full bg-white text-[#0B1A28] placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-[#A68A56] text-sm"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-1/3 px-8 py-4 rounded-full bg-[#A68A56] text-white font-bold text-[11px] uppercase tracking-widest hover:bg-[#C2A36B] transition-colors duration-300 shadow-md cursor-pointer whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  )
}
