import p1 from '../../assets/product/p1.jpg'
import p2 from '../../assets/product/p2.jpg'
import p3 from '../../assets/product/p3.jpg'
import p4 from '../../assets/product/p4.jpg'
import p5 from '../../assets/product/p5.jpg'
import p6 from '../../assets/product/p6.jpg'
import p7 from '../../assets/product/p7.avif'
import p8 from '../../assets/product/p8.avif'
import p9 from '../../assets/product/p9.avif'
import p10 from '../../assets/product/p10.avif'
import p11 from '../../assets/product/p11.avif'
import p12 from '../../assets/product/p12.avif'
import p13 from '../../assets/product/p13.avif'

export interface Product {
  id: number
  name: string
  price: number
  discountPrice?: number
  rating: number
  reviewsCount: number
  category: string
  img: string
  hoverImg: string
  badge?: string
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Botanical Radiance Glow Serum',
    price: 34.00,
    discountPrice: 28.00,
    rating: 4.9,
    reviewsCount: 148,
    category: 'Serums',
    img: p1,
    hoverImg: p4,
    badge: 'Best Seller'
  },
  {
    id: 2,
    name: 'Bio-Active Barrier Repair Cream',
    price: 32.00,
    discountPrice: 26.00,
    rating: 4.8,
    reviewsCount: 112,
    category: 'Moisturizers',
    img: p2,
    hoverImg: p7,
    badge: 'Popular'
  },
  {
    id: 3,
    name: 'Gentle Clarifying Foaming Wash',
    price: 24.00,
    discountPrice: 19.00,
    rating: 4.7,
    reviewsCount: 95,
    category: 'Cleansers',
    img: p3,
    hoverImg: p8,
    badge: 'Essential'
  },
  {
    id: 4,
    name: 'Hyaluronic Dew Plumping Elixir',
    price: 36.00,
    discountPrice: 30.00,
    rating: 4.9,
    reviewsCount: 180,
    category: 'Serums',
    img: p4,
    hoverImg: p1,
    badge: 'Trending'
  },
  {
    id: 5,
    name: 'Niacinamide Pore Tightening Serum',
    price: 30.00,
    discountPrice: 25.00,
    rating: 4.8,
    reviewsCount: 134,
    category: 'Serums',
    img: p5,
    hoverImg: p9,
  },
  {
    id: 6,
    name: 'Retinol Cellular Renewal Treatment',
    price: 42.00,
    discountPrice: 35.00,
    rating: 4.9,
    reviewsCount: 210,
    category: 'Treatments',
    img: p6,
    hoverImg: p10,
    badge: 'Clinical Grade'
  },
  {
    id: 7,
    name: 'Centella Soothing Calming Gel',
    price: 28.00,
    discountPrice: 22.00,
    rating: 4.8,
    reviewsCount: 89,
    category: 'Moisturizers',
    img: p7,
    hoverImg: p2,
  },
  {
    id: 8,
    name: 'Bakuchiol Natural Firming Elixir',
    price: 38.00,
    discountPrice: 31.00,
    rating: 4.9,
    reviewsCount: 125,
    category: 'Serums',
    img: p8,
    hoverImg: p5,
    badge: 'New'
  },
  {
    id: 9,
    name: 'Salicylic Purifying Exfoliant Tonic',
    price: 26.00,
    discountPrice: 21.00,
    rating: 4.7,
    reviewsCount: 103,
    category: 'Treatments',
    img: p9,
    hoverImg: p3,
  },
  {
    id: 10,
    name: 'Ceramide Deep Moisture Hydro-Gel',
    price: 33.00,
    discountPrice: 27.00,
    rating: 4.8,
    reviewsCount: 76,
    category: 'Moisturizers',
    img: p10,
    hoverImg: p6,
  },
  {
    id: 11,
    name: 'Peptide Collagen Boost Fluid',
    price: 40.00,
    discountPrice: 34.00,
    rating: 4.9,
    reviewsCount: 162,
    category: 'Serums',
    img: p11,
    hoverImg: p1,
    badge: 'Top Rated'
  },
  {
    id: 12,
    name: 'Vitamin E Overnight Recovery Mask',
    price: 29.00,
    discountPrice: 24.00,
    rating: 4.8,
    reviewsCount: 98,
    category: 'Masks',
    img: p12,
    hoverImg: p2,
  },
  {
    id: 13,
    name: 'Botanical Scalp & Hair Density Serum',
    price: 35.00,
    discountPrice: 29.00,
    rating: 4.9,
    reviewsCount: 140,
    category: 'Serums',
    img: p13,
    hoverImg: p11,
    badge: 'Hair Care'
  },
]
