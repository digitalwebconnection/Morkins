import p1 from '../../../assets/product/p1.jpg'
import p2 from '../../../assets/product/p2.jpg'
import p3 from '../../../assets/product/p3.jpg'
import p4 from '../../../assets/product/p4.jpg'
import p5 from '../../../assets/product/p5.jpg'
import p6 from '../../../assets/product/p6.jpg'
import p7 from '../../../assets/product/p7.avif'
import p8 from '../../../assets/product/p8.avif'
import p9 from '../../../assets/product/p9.avif'
import p10 from '../../../assets/product/p10.avif'
import p11 from '../../../assets/product/p11.avif'
import p12 from '../../../assets/product/p12.avif'
import p13 from '../../../assets/product/p13.avif'

export interface ProductExtended {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  brand: string;
  img: string;
  hoverImg: string;
  badge?: string;
  description: string;
  inStock: boolean;
}

export const PRODUCTS_EXTENDED: ProductExtended[] = [
  {
    id: 1,
    name: 'Botanical Radiance Glow Serum',
    price: 34.00,
    discountPrice: 28.00,
    rating: 4.9,
    reviewsCount: 148,
    category: 'Serums',
    brand: 'Morkins',
    img: p1,
    hoverImg: p4,
    badge: 'Best Seller',
    description: 'High-potency botanical serum infused with active plant peptides for instant luminosity and deep cellular renewal.',
    inStock: true,
  },
  {
    id: 2,
    name: 'Bio-Active Barrier Repair Cream',
    price: 32.00,
    discountPrice: 26.00,
    rating: 4.8,
    reviewsCount: 112,
    category: 'Moisturizers',
    brand: 'Morkins',
    img: p2,
    hoverImg: p7,
    badge: 'Popular',
    description: 'Ultra-nourishing lipid-replenishing moisturizer that restores epidermal strength and locks in 24h hydration.',
    inStock: true,
  },
  {
    id: 3,
    name: 'Gentle Clarifying Foaming Wash',
    price: 24.00,
    discountPrice: 19.00,
    rating: 4.7,
    reviewsCount: 95,
    category: 'Cleansers',
    brand: 'Morkins',
    img: p3,
    hoverImg: p8,
    badge: 'Essential',
    description: 'pH-balanced purifying botanical cleanser that lifts impurities without stripping essential moisture.',
    inStock: true,
  },
  {
    id: 4,
    name: 'Hyaluronic Dew Plumping Elixir',
    price: 36.00,
    discountPrice: 30.00,
    rating: 4.9,
    reviewsCount: 180,
    category: 'Serums',
    brand: 'Morkins',
    img: p4,
    hoverImg: p1,
    badge: 'Trending',
    description: 'Multi-molecular hyaluronic acid formula delivering multi-depth moisture surge and bouncy smoothness.',
    inStock: true,
  },
  {
    id: 5,
    name: 'Niacinamide Pore Tightening Serum',
    price: 30.00,
    discountPrice: 25.00,
    rating: 4.8,
    reviewsCount: 134,
    category: 'Serums',
    brand: 'Morkins',
    img: p5,
    hoverImg: p9,
    description: 'Clinical-grade 10% Niacinamide + Zinc PCA to refine enlarged pores, regulate sebum, and even skin tone.',
    inStock: true,
  },
  {
    id: 6,
    name: 'Retinol Cellular Renewal Treatment',
    price: 42.00,
    discountPrice: 35.00,
    rating: 4.9,
    reviewsCount: 210,
    category: 'Treatments',
    brand: 'Morkins',
    img: p6,
    hoverImg: p10,
    badge: 'Clinical Grade',
    description: 'Encapsulated pure retinol targeting fine lines, hyperpigmentation, and accelerating collagen regeneration.',
    inStock: true,
  },
  {
    id: 7,
    name: 'Centella Soothing Calming Gel',
    price: 28.00,
    discountPrice: 22.00,
    rating: 4.8,
    reviewsCount: 89,
    category: 'Moisturizers',
    brand: 'Morkins',
    img: p7,
    hoverImg: p2,
    description: 'Instant cooling relief and skin-barrier reinforcement for sensitive, stressed, or red-prone complexions.',
    inStock: true,
  },
  {
    id: 8,
    name: 'Bakuchiol Natural Firming Elixir',
    price: 38.00,
    discountPrice: 31.00,
    rating: 4.9,
    reviewsCount: 125,
    category: 'Serums',
    brand: 'Morkins',
    img: p8,
    hoverImg: p5,
    badge: 'New',
    description: 'Gentle plant-derived retinol alternative that visibly firms and smooths texture without irritation.',
    inStock: true,
  },
  {
    id: 9,
    name: 'Salicylic Purifying Exfoliant Tonic',
    price: 26.00,
    discountPrice: 21.00,
    rating: 4.7,
    reviewsCount: 103,
    category: 'Treatments',
    brand: 'Morkins',
    img: p9,
    hoverImg: p3,
    description: '2% BHA salicylic clarifying solution that clears congestion, blackheads, and dead skin build-up.',
    inStock: true,
  },
  {
    id: 10,
    name: 'Ceramide Deep Moisture Hydro-Gel',
    price: 33.00,
    discountPrice: 27.00,
    rating: 4.8,
    reviewsCount: 76,
    category: 'Moisturizers',
    brand: 'Morkins',
    img: p10,
    hoverImg: p6,
    description: 'Tri-ceramide lipid infusion that strengthens weakened barrier and defends against environmental stressors.',
    inStock: true,
  },
  {
    id: 11,
    name: 'Peptide Collagen Boost Fluid',
    price: 40.00,
    discountPrice: 34.00,
    rating: 4.9,
    reviewsCount: 162,
    category: 'Serums',
    brand: 'Morkins',
    img: p11,
    hoverImg: p1,
    badge: 'Top Rated',
    description: 'Multi-peptide matrix revitalizing skin elasticity and boosting facial contour definition.',
    inStock: true,
  },
  {
    id: 12,
    name: 'Vitamin E Overnight Recovery Mask',
    price: 29.00,
    discountPrice: 24.00,
    rating: 4.8,
    reviewsCount: 98,
    category: 'Masks',
    brand: 'Morkins',
    img: p12,
    hoverImg: p2,
    description: 'Rich antioxidant overnight treatment creating a protective moisture cocoon for waking up with dewy skin.',
    inStock: true,
  },
  {
    id: 13,
    name: 'Botanical Scalp & Hair Density Serum',
    price: 35.00,
    discountPrice: 29.00,
    rating: 4.9,
    reviewsCount: 140,
    category: 'Serums',
    brand: 'Morkins',
    img: p13,
    hoverImg: p11,
    badge: 'Hair Care',
    description: 'Targeted peptide and caffeine blend to stimulate roots, strengthen follicles, and improve hair density.',
    inStock: true,
  },
];
