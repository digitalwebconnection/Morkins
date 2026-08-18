export default function Newsletter() {
  return (
    <section className="bg-[#0B1A28] py-20 lg:py-28 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <p className="text-[#A68A56] text-[11px] font-bold tracking-[0.2em] uppercase mb-4">
          JOIN THE MORKINS COMMUNITY
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-6 leading-tight font-normal">
          Healthy Skin Starts Here
        </h2>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          Subscribe to receive skincare tips, exclusive product launches, dermatologist insights, and special offers delivered directly to your inbox.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full sm:w-2/3 px-6 py-4 rounded-full bg-white text-[#0B1A28] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#A68A56] text-sm"
            required
          />
          <button
            type="submit"
            className="w-full sm:w-1/3 px-8 py-4 rounded-full bg-[#A68A56] text-[#0B1A28] font-bold text-[11px] uppercase tracking-widest hover:bg-[#C2A36B] transition-colors duration-300 shadow-md cursor-pointer whitespace-nowrap"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  )
}
