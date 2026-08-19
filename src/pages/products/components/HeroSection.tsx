export default function HeroSection() {
  return (
    <div className="relative overflow-hidden min-h-[60vh] flex items-center justify-center bg-brand-cream">
      {/* Background Image & Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/product-hero-poster.jpg')" }}
      >
        {/* Soft radial overlay to ensure text readability in the center while keeping sides clear */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-white/70 via-white/40 to-transparent"></div>
      </div>
    </div>
  );
}