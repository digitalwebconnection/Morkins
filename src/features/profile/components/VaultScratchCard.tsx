import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Award, Sparkles, Copy, Check, RotateCw, Gift, RefreshCw } from 'lucide-react';

export interface ScratchReward {
  id: string;
  title: string;
  code: string;
  desc: string;
  badge: string;
  color: string;
}

const REWARDS_POOL: ScratchReward[] = [
  { 
    id: 'r1', 
    title: '🎉 $35.00 STORE CREDIT', 
    code: 'VAULT-35-GOLD', 
    desc: 'Auto-applied on all botanical formulations over $60', 
    badge: 'Tier: Gold VIP', 
    color: '#AFD971' 
  },
  { 
    id: 'r2', 
    title: '✨ 30% OFF YOUR HARVEST', 
    code: 'MORKINS-30-VIP', 
    desc: 'Valid across complete clinical organic skincare range', 
    badge: 'Special VIP Drop', 
    color: '#E5C378' 
  },
  { 
    id: 'r3', 
    title: '🌿 $40.00 BOTANICAL VOUCHER', 
    code: 'HARVEST-40-OFF', 
    desc: 'Plus +100 bonus patron loyalty points added to vault', 
    badge: 'Limited Reward', 
    color: '#93C5FD' 
  },
  { 
    id: 'r4', 
    title: '💎 $50.00 DIAMOND CREDIT', 
    code: 'DIAMOND-50-VAULT', 
    desc: 'Highest patron tier unlocked credit award', 
    badge: 'Diamond Jackpot', 
    color: '#F472B6' 
  },
  { 
    id: 'r5', 
    title: '🌸 $25.00 OFF + FREE SHIPPING', 
    code: 'RADIANCE-25-FREE', 
    desc: 'Includes complimentary express greenhouse delivery', 
    badge: 'Express Delivery', 
    color: '#FBBF24' 
  }
];

interface VaultScratchCardProps {
  userEmail?: string;
  points?: number;
  tier?: string;
  nextTierPoints?: number;
}

export const VaultScratchCard: React.FC<VaultScratchCardProps> = ({
  userEmail = 'patron@morkins.com',
  points = 380,
  tier = 'Gold',
  nextTierPoints = 120
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeReward, setActiveReward] = useState<ScratchReward>(REWARDS_POOL[0]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  // Initialize or load reward for this specific user
  const initUserReward = useCallback((forceNew = false) => {
    const storageKeyReward = `morkins_vault_reward_${userEmail.toLowerCase()}`;
    const storageKeyScratched = `morkins_vault_scratched_${userEmail.toLowerCase()}`;

    if (!forceNew) {
      const savedRewardId = localStorage.getItem(storageKeyReward);
      const savedScratched = localStorage.getItem(storageKeyScratched);

      if (savedRewardId) {
        const found = REWARDS_POOL.find(r => r.id === savedRewardId);
        if (found) setActiveReward(found);
      } else {
        // Pick a random reward from the pool
        const randomReward = REWARDS_POOL[Math.floor(Math.random() * REWARDS_POOL.length)];
        setActiveReward(randomReward);
        localStorage.setItem(storageKeyReward, randomReward.id);
      }

      if (savedScratched === 'true') {
        setIsScratched(true);
        setScratchPercent(100);
      } else {
        setIsScratched(false);
        setScratchPercent(0);
      }
    } else {
      // Pick a different random reward
      const otherRewards = REWARDS_POOL.filter(r => r.id !== activeReward.id);
      const randomReward = otherRewards[Math.floor(Math.random() * otherRewards.length)] || REWARDS_POOL[0];
      setActiveReward(randomReward);
      localStorage.setItem(storageKeyReward, randomReward.id);
      localStorage.removeItem(storageKeyScratched);
      setIsScratched(false);
      setScratchPercent(0);
    }
  }, [userEmail, activeReward.id]);

  useEffect(() => {
    initUserReward();
  }, [userEmail, initUserReward]);

  // Draw Gold Metallic Canvas Overlay
  const paintCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width || 280;
    const height = rect.height || 90;
    
    // Scale for crisp high-DPI screens
    canvas.width = width * 2;
    canvas.height = height * 2;
    ctx.scale(2, 2);

    // Reset composite mode
    ctx.globalCompositeOperation = 'source-over';

    // Rich Metallic Gold & Champagne Gradient
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(0.25, '#F3E5AB');
    gradient.addColorStop(0.5, '#C59B27');
    gradient.addColorStop(0.75, '#E5C378');
    gradient.addColorStop(1, '#A07818');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Gold Sheen diagonal lines
    ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
    for (let i = -height; i < width + height; i += 16) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 8, 0);
      ctx.lineTo(i + 8 - 20, height);
      ctx.lineTo(i - 20, height);
      ctx.fill();
    }

    // Outer border inside canvas
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(3, 3, width - 6, height - 6);

    // Scratch Instruction Foil Text
    ctx.fillStyle = '#2B1E0A';
    ctx.font = 'bold 12px Plus Jakarta Sans, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('✦ RUB & SCRATCH TO REVEAL ✦', width / 2, height / 2 - 8);

    ctx.font = 'bold 9px Plus Jakarta Sans, sans-serif';
    ctx.fillStyle = '#4D3614';
    ctx.fillText('🪙 Drag with mouse or finger to scratch', width / 2, height / 2 + 10);
  }, [isScratched]);

  // Re-draw canvas when flipped
  useEffect(() => {
    if (isFlipped && !isScratched) {
      setTimeout(() => {
        paintCanvas();
      }, 50);
    }
  }, [isFlipped, isScratched, paintCanvas]);

  // Handle continuous smooth scratching
  const scratchMove = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isScratched) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const currentX = clientX - rect.left;
    const currentY = clientY - rect.top;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 26;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    if (lastPosRef.current) {
      ctx.beginPath();
      ctx.moveTo(lastPosRef.current.x, lastPosRef.current.y);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
    } else {
      ctx.beginPath();
      ctx.arc(currentX, currentY, 13, 0, Math.PI * 2);
      ctx.fill();
    }

    lastPosRef.current = { x: currentX, y: currentY };
    checkScratchProgress(canvas, ctx);
  };

  const checkScratchProgress = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparentCount = 0;

    for (let i = 3; i < pixels.length; i += 24) {
      if (pixels[i] === 0) {
        transparentCount++;
      }
    }

    const totalSampled = pixels.length / 24;
    const percent = Math.min(100, Math.round((transparentCount / totalSampled) * 100));
    setScratchPercent(percent);

    if (percent > 36 && !isScratched) {
      setIsScratched(true);
      const storageKeyScratched = `morkins_vault_scratched_${userEmail.toLowerCase()}`;
      localStorage.setItem(storageKeyScratched, 'true');
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    lastPosRef.current = null;
    scratchMove(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratchMove(e.clientX, e.clientY);
  };

  const handleMouseUp = () => {
    isDrawingRef.current = false;
    lastPosRef.current = null;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    isDrawingRef.current = true;
    lastPosRef.current = null;
    if (e.touches[0]) scratchMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    if (e.touches[0]) scratchMove(e.touches[0].clientX, e.touches[0].clientY);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeReward.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleInstantReveal = () => {
    setIsScratched(true);
    setScratchPercent(100);
    const storageKeyScratched = `morkins_vault_scratched_${userEmail.toLowerCase()}`;
    localStorage.setItem(storageKeyScratched, 'true');
  };

  const handleResetNewCard = () => {
    initUserReward(true);
    setTimeout(() => {
      paintCanvas();
    }, 50);
  };

  return (
    <div className="w-full h-full min-h-43.75 perspective-[1000px] select-none">
      <div 
        className={`relative w-full h-full duration-700 transform-3d transition-transform ${
          isFlipped ? 'transform-[rotateY(180deg)]' : ''
        }`}
      >
        {/* ──────── FRONT FACE: PATRON VAULT TEASER (NO AMOUNT) ──────── */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden bg-linear-to-br from-[#0D4B24] via-[#12602F] to-[#0A381B] text-white p-5 sm:p-6 rounded-xl shadow-md border border-[#AFD971]/30 flex flex-col justify-between overflow-hidden cursor-pointer group"
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

          {/* Mystery Teaser & Scratch CTA Area */}
          <div className="py-1 flex items-center justify-between gap-3">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center gap-1.5 text-amber-200">
                <Sparkles className="w-4 h-4 text-amber-300 animate-pulse shrink-0" />
                <span className="font-serif text-base sm:text-lg font-bold tracking-wide text-white truncate">
                  VIP Mystery Prize
                </span>
              </div>
              <p className="text-[10px] text-white/80 font-light truncate">
                ✦ Scratch to unlock custom voucher ✦
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
              <span>{isScratched ? 'View Card ↻' : 'Scratch ↻'}</span>
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

        {/* ──────── BACK FACE: 180° INTERACTIVE SCRATCH COUPON CARD ──────── */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden transform-[rotateY(180deg)] bg-linear-to-br from-[#1C170E] via-[#2A2114] to-[#141009] text-white p-4 sm:p-5 rounded-3xl shadow-md border border-[#C49746]/40 flex flex-col justify-between overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#E5C378] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>VIP Patron Scratch</span>
            </span>

            <div className="flex items-center gap-1.5">
              {/* Draw New Card Re-Roll Button */}
              <button
                type="button"
                onClick={handleResetNewCard}
                className="px-2 py-0.5 rounded-md bg-amber-500/20 hover:bg-amber-500/30 text-[9px] text-amber-300 uppercase font-bold flex items-center gap-1 transition-colors cursor-pointer border border-amber-500/30"
                title="Draw a fresh random reward"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Re-Draw</span>
              </button>

              {/* Flip Back to Front */}
              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="px-2 py-0.5 rounded-md bg-white/10 hover:bg-white/20 text-[9px] text-white/80 uppercase font-bold flex items-center gap-1 transition-colors cursor-pointer"
                title="Flip back to front"
              >
                <RotateCw className="w-2.5 h-2.5" />
                <span>Front</span>
              </button>
            </div>
          </div>

          {/* Scratch Surface Area */}
          <div className="relative w-full h-19.5 sm:h-21 rounded-lg overflow-hidden border border-[#C49746]/30 bg-linear-to-r from-[#0F361A] to-[#12602F] flex flex-col items-center justify-center p-2 shadow-inner">
            {/* Underneath Revealed Dynamic Coupon */}
            <div className="text-center space-y-1 w-full animate-fade-in">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-[9px] uppercase font-extrabold tracking-wider" style={{ color: activeReward.color }}>
                  {activeReward.title}
                </span>
              </div>
              <div className="flex items-center justify-center gap-1.5 bg-black/50 px-2.5 py-0.5 rounded-md border border-[#AFD971]/30 max-w-52.5 mx-auto">
                <span className="font-mono font-bold text-xs text-[#AFD971] tracking-widest">
                  {activeReward.code}
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
              <span className="text-[8px] text-amber-200/90 font-light block truncate">
                {copied ? '✓ Code Copied to Clipboard!' : activeReward.desc}
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
                className="absolute inset-0 w-full h-full cursor-crosshair touch-none transition-opacity duration-300 z-10"
              />
            )}
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between text-[9px] pt-0.5 text-white/75">
            {!isScratched ? (
              <>
                <span className="text-amber-200/80 font-mono font-bold">Scratched: {scratchPercent}%</span>
                <button
                  type="button"
                  onClick={handleInstantReveal}
                  className="text-[#AFD971] hover:underline font-bold uppercase cursor-pointer flex items-center gap-1"
                >
                  <span>Auto Peel</span>
                  <Sparkles className="w-2.5 h-2.5" />
                </button>
              </>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-[#AFD971] font-bold">
                  ✓ {activeReward.badge}
                </span>
                <button
                  type="button"
                  onClick={handleResetNewCard}
                  className="text-amber-300 hover:underline font-bold text-[8px] uppercase cursor-pointer"
                >
                  Scratch Another ↻
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
