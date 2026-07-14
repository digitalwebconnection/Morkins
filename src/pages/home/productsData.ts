// import p1 from '../../assets/product/1.png'
// import p2 from '../../assets/product/2.png'
// import p3 from '../../assets/product/3.png'
// import p4 from '../../assets/product/4.png'
// import p5 from '../../assets/product/5.png'
// import p6 from '../../assets/product/6.png'
// import p7 from '../../assets/product/19.png'
// import p8 from '../../assets/product/20.png'
// import p9 from '../../assets/product/23.png'
// import p10 from '../../assets/product/24.png'


import p12 from '../../assets/product/12.png'
import p13 from '../../assets/product/13.png'
import p14 from '../../assets/product/14.png'
import p15 from '../../assets/product/15.png'
import p16 from '../../assets/product/16.png'
import p17 from '../../assets/product/17.png'
import p19 from '../../assets/product/19.png'
import p20 from '../../assets/product/20.png'
import p23 from '../../assets/product/23.png'
import p24 from '../../assets/product/24.png'

export interface Product {
  id: number
  name: string
  price: number
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
    name: 'Hyaluronic Acid Hydrating Serum',
    price: 34.00,
    rating: 4.8,
    reviewsCount: 92,
    category: 'Serums',
    img: p12,
    hoverImg: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 2,
    name: 'Centella Calming Gel Cream',
    price: 29.00,
    rating: 4.7,
    reviewsCount: 88,
    category: 'Moisturizers',
    img: p13,
    hoverImg: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 3,
    name: 'Bakuchiol Wrinkle Defense Cream',
    price: 38.00,
    rating: 4.9,
    reviewsCount: 115,
    category: 'Moisturizers',
    img: p14,
    hoverImg: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=400&q=80',
    badge: 'Anti-Aging'
  },
  {
    id: 4,
    name: 'Niacinamide Pore Refiner',
    price: 31.00,
    rating: 4.8,
    reviewsCount: 104,
    category: 'Treatments',
    img: p15,
    hoverImg: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5,
    name: 'Ceramide Barrier Repair Cream',
    price: 33.00,
    rating: 4.9,
    reviewsCount: 120,
    category: 'Moisturizers',
    img: p16,
    hoverImg: 'https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&w=400&q=80',
    badge: 'Repair'
  },
  {
    id: 6,
    name: 'Salicylic Acid Exfoliating Cleanser',
    price: 22.00,
    rating: 4.7,
    reviewsCount: 74,
    category: 'Cleansers',
    img: p17,
    hoverImg: 'https://images.unsplash.com/photo-1508747703725-719ae2c13d4b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 7,
    name: 'Peptide Complex Firming Serum',
    price: 40.00,
    rating: 4.9,
    reviewsCount: 96,
    category: 'Serums',
    img: p19,
    hoverImg: 'https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 8,
    name: 'Squalane Cleansing Oil',
    price: 26.00,
    rating: 4.8,
    reviewsCount: 85,
    category: 'Cleansers',
    img: p20,
    hoverImg: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 9,
    name: 'Vitamin E Hydrating Mask',
    price: 28.00,
    rating: 4.8,
    reviewsCount: 61,
    category: 'Masks',
    img: p23,
    hoverImg: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 10,
    name: 'AHA/BHA Resurfacing Liquid',
    price: 35.00,
    rating: 4.9,
    reviewsCount: 112,
    category: 'Treatments',
    img: p24,
    hoverImg: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=400&q=80',
    badge: 'Popular'
  }
]
