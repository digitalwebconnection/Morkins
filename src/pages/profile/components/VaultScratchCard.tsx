import React, { useState, useEffect, useRef } from 'react';
import { Award, Sparkles, Copy, Check, RotateCw, Gift } from 'lucide-react';

interface VaultScratchCardProps {
  creditBalance?: string;
  points?: number;
  tier?: string;
  nextTierPoints?: number;
}

export const VaultScratchCard: React.FC<VaultScratchCardProps> = ({
  points = 380,
  tier = 'Gold',
  nextTierPoints = 120
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  const couponCode = 'MORKINS-VAULT-30';

  useEffect(() => {
    const savedScratched = localStorage.getItem('morkins_vault_card_scratched');
    if (savedScratched === 'true') {
      setIsScratched(true);
      setScratchPercent(100);
    }
  }, []);

  // Initialize Canvas when flipped to back side
  useEffect(() => {
    if (!isFlipped || isScratched) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.offsetWidth || 280;
    const height = canvas.offsetHeight || 130;
    canvas.width = width;
    canvas.height = height;

    // Draw Gold Metallic Foil Background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#C49746');
    gradient.addColorStop(0.3, '#E5C378');
    gradient.addColorStop(0.6, '#A37A2C');
    gradient.addColorStop(1, '#DDB86C');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Add subtle scratch pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
    for (let i = 0; i < width; i += 12) {
      ctx.fillRect(i, 0, 4, height);
    }

    // Foil text instructions
    ctx.fillStyle = '#2C1D08';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ SCRATCH TO REVEAL ✦', width / 2, height / 2 - 8);

    ctx.font = '9px sans-serif';
    ctx.fillStyle = '#4A3414';
    ctx.fillText('Rub with mouse or tap to peel', width / 2, height / 2 + 10);
  }, [isFlipped, isScratched]);

  const scratchAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 16, 0, Math.PI * 2);
    ctx.fill();

    // Check scratched percentage periodically
    checkScratchCompletion(canvas, ctx);
  };

  const checkScratchCompletion = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 16) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalSampled = pixels.length / 16;
    const percent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
    setScratchPercent(percent);

    if (percent > 35 && !isScratched) {
      setIsScratched(true);
      localStorage.setItem('morkins_vault_card_scratched', 'true');
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    if (e.touches[0]) scratchAt(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    if (e.touches[0]) scratchAt(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(couponCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstantReveal = () => {
    setIsScratched(true);
    setScratchPercent(100);
    localStorage.setItem('morkins_vault_card_scratched', 'true');
  };

  return (
    <div className="lg:col-span-3 w-full h-[180px] sm:h-[180px] [perspective:1000px] select-none">
      <div 
        className={`relative w-full h-full duration-700 [transform-style:preserve-3d] transition-transform ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* ──────── FRONT FACE: PATRON VAULT SCRATCH CARD TEASER ──────── */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] bg-linear-to-br from-[#0D4B24] via-[#12602F] to-[#0A381B] text-white p-4 sm:p-5 rounded-xl shadow-md border border-[#AFD971]/30 flex flex-col justify-between overflow-hidden cursor-pointer group"
          onClick={() => setIsFlipped(true)}
        >
          {/* Header */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#AFD971] flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>Patron Vault</span>
            </span>
            <span className="text-[10px] text-[#AFD971] font-mono bg-white/10 px-2 py-0.5 rounded-md border border-white/15">
              {points} Pts
            </span>
          </div>

          {/* Mystery Teaser & Scratch CTA Area (No Amount Shown) */}
          <div className="py-1 flex items-center justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-1.5 text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
                <span className="font-serif text-base sm:text-lg font-bold tracking-wide text-white truncate">
                  VIP Secret Reward
                </span>
              </div>
              <p className="text-[10px] text-white/80 font-light truncate">
                ✦ Scratch card to reveal surprise ✦
              </p>
            </div>

            {/* Glowing Flip Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(true);
              }}
              className="px-3.5 py-2 bg-linear-to-r from-[#AFD971] to-[#C49746] hover:from-[#c2eb88] hover:to-[#dfb15e] text-[#0A381B] rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center gap-1.5 cursor-pointer active:scale-95 shrink-0 group-hover:scale-105"
              title="Flip to scratch card"
            >
              <Gift className="w-3.5 h-3.5 text-[#0A381B] animate-bounce" />
              <span>Scratch ↻</span>
            </button>
          </div>

          {/* Tier Progress Bar */}
          <div className="space-y-1">
            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div className="h-full bg-linear-to-r from-[#AFD971] via-[#C49746] to-[#E5C378] rounded-full w-[76%] shadow-xs" />
            </div>
            <div className="flex justify-between text-[9px] text-white/80 font-medium">
              <span className="text-[#AFD971] font-bold">Level: {tier}</span>
              <span className="text-amber-200 font-semibold">{nextTierPoints} pts to Diamond</span>
            </div>
          </div>
        </div>

        {/* ──────── BACK FACE: 180° SCRATCH COUPON CARD ──────── */}
        <div 
          className="absolute inset-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)] bg-linear-to-br from-[#1C170E] via-[#2A2114] to-[#141009] text-white p-3.5 sm:p-4 rounded-xl shadow-md border border-[#C49746]/40 flex flex-col justify-between overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5C378] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>VIP Coupon Scratch</span>
            </span>

            <button
              type="button"
              onClick={() => setIsFlipped(false)}
              className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[9px] text-white/80 uppercase font-bold flex items-center gap-1 transition-colors cursor-pointer"
              title="Flip back to balance"
            >
              <RotateCw className="w-2.5 h-2.5" />
              <span>Balance</span>
            </button>
          </div>

          {/* Scratch Surface Area */}
          <div className="relative w-full h-[78px] sm:h-[84px] rounded-lg overflow-hidden border border-[#C49746]/30 bg-linear-to-r from-[#0F361A] to-[#12602F] flex flex-col items-center justify-center p-2 shadow-inner">
            {/* Underneath Revealed Coupon */}
            <div className="text-center space-y-1 w-full animate-fade-in">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[9px] uppercase font-extrabold text-[#AFD971] tracking-wider">
                  🎉 $30.00 CREDIT + 50 BONUS PTS
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-black/40 px-2.5 py-1 rounded-md border border-[#AFD971]/30 max-w-[210px] mx-auto">
                <span className="font-mono font-bold text-xs text-[#AFD971] tracking-widest">
                  {couponCode}
                </span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="text-amber-300 hover:text-white p-0.5 cursor-pointer transition-transform active:scale-90"
                  title="Copy Code"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-[#AFD971]" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <span className="text-[8px] text-amber-200/90 font-light block">
                {copied ? '✓ Code Copied to Clipboard!' : 'Apply at checkout on orders over $60'}
              </span>
            </div>

            {/* Interactive HTML5 Scratch Canvas Overlay */}
            {!isScratched && (
              <canvas
                ref={canvasRef}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-300"
              />
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between text-[9px] pt-0.5 text-white/75">
            {!isScratched ? (
              <>
                <span className="text-amber-200/80">Scratched: {scratchPercent}%</span>
                <button
                  type="button"
                  onClick={handleInstantReveal}
                  className="text-[#AFD971] hover:underline font-bold uppercase cursor-pointer"
                >
                  Peel All ✦
                </button>
              </>
            ) : (
              <span className="text-[#AFD971] font-bold mx-auto">
                ✦ Unlocked VIP Reward Claimed ✦
              </span>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
