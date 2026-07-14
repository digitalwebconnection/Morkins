import { useState } from 'react'
import { PRODUCTS } from './productsData'

interface ProductRecommendation {
  id: number
  name: string
  price: number
  img: string
  stepLabel: string
}

interface RoutineRecommendation {
  title: string
  description: string
  products: ProductRecommendation[]
}

interface SkinQuizProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }) => void
}

export default function SkinQuiz({ onAddToCart }: SkinQuizProps) {
  const [step, setStep] = useState(1)
  const [skinType, setSkinType] = useState('')
  const [isAddingAll, setIsAddingAll] = useState(false)
  const [addedAllSuccess, setAddedAllSuccess] = useState(false)

  const handleSelectType = (type: string) => {
    setSkinType(type)
    setStep(2)
  }

  const handleSelectGoal = (_goal: string) => {
    setStep(3)
  }

  const getProductById = (id: number, stepLabel: string): ProductRecommendation => {
    const product = PRODUCTS.find((p) => p.id === id)
    if (!product) {
      throw new Error(`Product with ID ${id} not found`)
    }
    return {
      id: product.id,
      name: product.name,
      price: product.price,
      img: product.img,
      stepLabel
    }
  }

  // Determine recommendation based on quiz selections
  const getRecommendation = (): RoutineRecommendation => {
    if (skinType === 'dry') {
      return {
        title: 'Nourishing Hydration Regimen',
        description: 'Designed specifically to drench parched skin cells, repair compromised lipid barriers, and seal in lasting botanical moisture.',
        products: [
          getProductById(6, 'STEP 01: PREP'),
          getProductById(1, 'STEP 02: TREAT'),
          getProductById(8, 'STEP 03: MOISTURIZE')
        ]
      }
    } else if (skinType === 'oily') {
      return {
        title: 'Balancing Clarity Regimen',
        description: 'Formulated to regulate excess sebum, clarify clogged pores, and provide oil-free hydration for a fresh, matte finish.',
        products: [
          getProductById(7, 'STEP 01: PREP'),
          getProductById(5, 'STEP 02: TREAT'),
          getProductById(4, 'STEP 03: MOISTURIZE')
        ]
      }
    } else if (skinType === 'dull') {
      return {
        title: 'Radiance & Glow Regimen',
        description: 'Infused with high-potency Vitamin C and botanical brighteners to target hyperpigmentation and reveal glowing skin.',
        products: [
          getProductById(6, 'STEP 01: PREP'),
          getProductById(4, 'STEP 02: TREAT'),
          getProductById(2, 'STEP 03: MOISTURIZE')
        ]
      }
    } else {
      // Sensitive / Aging
      return {
        title: 'Restorative Barrier Regimen',
        description: 'Meticulously crafted with bio-compatible ceramides and botanical complexes to soothe redness and lock in youth-preserving nutrients.',
        products: [
          getProductById(6, 'STEP 01: PREP'),
          getProductById(1, 'STEP 02: TREAT'),
          getProductById(2, 'STEP 03: MOISTURIZE')
        ]
      }
    }
  }

  const recommendation = getRecommendation()
  const originalTotalPrice = recommendation.products.reduce((acc, p) => acc + p.price, 0)
  const bundleDiscount = 0.15 // 15% off
  const bundlePrice = originalTotalPrice * (1 - bundleDiscount)

  const handleAddBundleToCart = () => {
    setIsAddingAll(true)
    recommendation.products.forEach((p, idx) => {
      // Small timeout to stagger additions in case state updates require sequence
      setTimeout(() => {
        onAddToCart({ id: p.id, name: p.name, price: p.price, img: p.img })
        if (idx === recommendation.products.length - 1) {
          setIsAddingAll(false)
          setAddedAllSuccess(true)
        }
      }, idx * 150)
    })
  }

  return (
    <section className="py-16  text-brand-dark border-b border-brand-dark/5">
      <div className="max-w-7xl mx-auto px-4 relative">

        {/* Title Block */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold tracking-widest text-[#5c7886] uppercase">Interactive Routine Builder</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#17335A] mt-2 leading-tight uppercase">
            Discover Your Daily Regimen
          </h2>
          <p className="text-gray-600 text-sm mt-3">
            Answer two quick questions about your skin, and let our formula engine build your optimized 3-step skincare regimen.
          </p>
        </div>

        {/* Quiz Container with Glassmorphism */}
        <div className=" relative min-h-[280px] flex flex-col py-10 overflow-hidden">

          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 w-full h-1  ">
            <div
              className="h-full bg-[#17335a] transition-all duration-500"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>

          {/* STEP 1: SKIN TYPE */}
          {step === 1 && (
            <div className="animate-fade-in text-center">
              <span className="text-[10px] font-bold tracking-widest text-black uppercase">QUESTION 01</span>
              <h3 className="font-serif text-2xl text-[#17335A] mt-2 mb-8 font-semibold">How would you describe your skin?</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                {[
                  { id: 'dry', label: 'Dry / Flaky', desc: 'Lacks oil, feels tight, shows texture.' },
                  { id: 'oily', label: 'Oily / Congested', desc: 'Excess shine, enlarged pores, acne-prone.' },
                  { id: 'dull', label: 'Dull / Uneven Tone', desc: 'Pigmentation, spots, lack of radiance.' },
                  { id: 'sensitive', label: 'Sensitive / Aging', desc: 'Prone to redness, fine lines, fatigue.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectType(item.id)}
                    className="flex flex-col items-center justify-center p-4 bg-white hover:bg-[#17335A] border border-[#17335A]/80 hover:border-[#17335A] text-black hover:text-white rounded-xl shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                  >
                    <span className="font-semibold text-lg font-serif  uppercase tracking-wider">{item.label}</span>
                    <span className="text-[14px] mt-2 opacity-80 group-hover:opacity-100 leading-normal ">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: SKIN GOAL */}
          {step === 2 && (
            <div className="animate-fade-in text-center">
              <span className="text-[10px] font-bold tracking-widest text-[#5c7886] uppercase">QUESTION 02</span>
              <h3 className="font-serif text-2xl text-[#17335A] mt-2 mb-8 font-normal">What is your primary skin goal?</h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                {[
                  { id: 'glow', label: 'Drape in Dewy Glow', desc: 'Hydrate skin cells, restore barrier.' },
                  { id: 'calm', label: 'Sooth & Calm Skin', desc: 'Lessen active redness, clear breakouts.' },
                  { id: 'renew', label: 'Refine & Rejuvenate', desc: 'Plump skin layers, target aging signs.' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectGoal(item.id)}
                    className="flex flex-col items-center justify-center p-6 bg-white hover:bg-[#17335A] border border-brand-light/10 hover:border-[#17335A] text-black hover:text-white rounded-xl shadow-xs hover:shadow-md transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                  >
                    <span className="font-bold text-lg uppercase tracking-wider">{item.label}</span>
                    <span className="text-[14px] mt-2 opacity-80 group-hover:opacity-100 leading-normal ">{item.desc}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => setStep(1)}
                className="mt-8 text-xs font-bold tracking-widest uppercase text-[#5c7886] hover:text-[#17335A] transition-colors duration-200 cursor-pointer"
              >
                ← Back to step 1
              </button>
            </div>
          )}

          {/* STEP 3: RECOMMENDATION RESULT */}
          {step === 3 && (
            <div className="animate-fade-in">
              <div className="flex flex-col lg:flex-row gap-10 items-center justify-between">

                {/* Left Result Details */}
                <div className="lg:w-[35%] text-left">
                  <span className="text-[10px] font-extrabold tracking-widest text-black bg-brand-light/10 px-3 py-1 rounded-full uppercase">
                    Your Diagnosis
                  </span>
                  <h4 className="font-serif text-3xl font-normal text-[#17335A] mt-4 mb-3 leading-snug">
                    {recommendation.title}
                  </h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {recommendation.description}
                  </p>

                  <div className="border-t border-brand-dark/10 pt-5 mb-6">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-gray-500 uppercase font-semibold">Individual Value</span>
                      <span className="text-xs text-gray-500 line-through font-mono">${originalTotalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-[#17335A]">Bundle Price (15% Off)</span>
                      <span className="text-lg font-bold text-brand-dark font-mono">${bundlePrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={handleAddBundleToCart}
                      disabled={isAddingAll}
                      className={`w-full py-3.5 rounded-full text-white text-xs font-bold tracking-widest uppercase shadow-md transition-all duration-300 cursor-pointer active:scale-98 ${addedAllSuccess
                          ? 'bg-[#17335A] hover:bg-[#17335A]/90'
                          : 'bg-brand-dark hover:bg-[#17335A]/90'
                        }`}
                    >
                      {isAddingAll ? (
                        'Adding Regimen...'
                      ) : addedAllSuccess ? (
                        '✓ Regimen Added To Bag'
                      ) : (
                        'Add Entire Regimen'
                      )}
                    </button>


                  </div>
                </div>

                {/* Right Recommended Product Cards */}
                <div className="lg:w-[65%] w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {recommendation.products.map((p) => {
                    const isLocal = !p.img.startsWith('http')
                    return (
                      <div
                        key={p.id}
                        className="bg-white rounded-xl p-4  border border-brand-dark/5 flex flex-col items-center justify-between text-center relative group"
                      >
                        <span className="text-[8px] font-bold text-gray-900 uppercase tracking-widest mb-2 block">
                          {p.stepLabel}
                        </span>

                        <div className={`w-34 h-34 flex items-center justify-center rounded-lg mb-3 ${isLocal ? 'bg-[#5c7886]/10 p-2' : 'bg-brand-cream-dark'
                          }`}>
                          <img
                            src={p.img}
                            alt={p.name}
                            className={`object-contain transition-transform duration-500 group-hover:scale-105 ${isLocal ? 'max-h-full w-auto' : 'w-full h-full object-fill'
                              }`}
                          />
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h5 className="font-sans text-xs font-bold text-black leading-tight line-clamp-2">
                              {p.name}
                            </h5>
                            <span className="text-xs font-bold text-[#17335A] font-mono mt-1 block">
                              ${p.price.toFixed(2)}
                            </span>
                          </div>

                          <button
                            onClick={() => onAddToCart({ id: p.id, name: p.name, price: p.price, img: p.img })}
                            className="mt-3 py-1.5 px-3 bg-[#17335a] hover:bg-[#17335A] text-white text-[9px] font-bold uppercase tracking-wider rounded-full transition-all duration-300 cursor-pointer active:scale-95 whitespace-nowrap"
                          >
                            + Quick Add
                          </button>
                        </div>
                      </div>
                    )
                  })}
                </div>

              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  )
}
