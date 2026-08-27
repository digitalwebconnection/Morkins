export interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice?: number;
  rating: number;
  reviewsCount: number;
  category: string;
  img: string;
  hoverImg: string;
  badge?: string;
  description?: string;
  skinType?: string;
  keyIngredients?: string[];
}

export interface ProductExtended extends Product {
  department: 'women' | 'men';
  productType: 'skincare' | 'haircare';
  brand: string;
  inStock: boolean;
}

export type CategoryFilter = 'All' | 'Serums' | 'Moisturizers' | 'Cleansers' | 'Treatments' | 'Masks';
export type DepartmentFilter = 'all' | 'women' | 'men';
export type ProductTypeFilter = 'all' | 'skincare' | 'haircare';
export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating';
