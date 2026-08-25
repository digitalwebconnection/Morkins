import { useMemo } from 'react';
import type { CategoryFilter, DepartmentFilter, ProductTypeFilter, SortOption } from '../types';
import { PRODUCTS_DATA } from '../lib/api/products';

export interface UseProductsOptions {
  category?: CategoryFilter;
  department?: DepartmentFilter;
  productType?: ProductTypeFilter;
  sortBy?: SortOption;
  searchQuery?: string;
  inStockOnly?: boolean;
}

export function useProducts(options: UseProductsOptions = {}) {
  const products = PRODUCTS_DATA;
  const loading = false;

  const {
    category = 'All',
    department = 'all',
    productType = 'all',
    sortBy = 'featured',
    searchQuery = '',
    inStockOnly = false,
  } = options;

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category !== 'All') {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }

    if (department !== 'all') {
      result = result.filter(p => p.department === department);
    }

    if (productType !== 'all') {
      result = result.filter(p => p.productType === productType);
    }

    if (inStockOnly) {
      result = result.filter(p => p.inStock);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        p => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        result.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'featured':
      default:
        // Keep original order
        break;
    }

    return result;
  }, [products, category, department, productType, sortBy, searchQuery, inStockOnly]);

  const bestSellers = useMemo(() => {
    return products.filter(p => p.badge === 'Best Seller' || p.rating >= 4.9);
  }, [products]);

  const newArrivals = useMemo(() => {
    return products.filter(p => p.badge === 'New' || p.badge === 'Trending');
  }, [products]);

  return {
    products: filteredProducts,
    allProducts: products,
    bestSellers,
    newArrivals,
    loading,
    totalCount: filteredProducts.length,
  };
}

export function useProduct(id: number | string | undefined) {
  const numericId = Number(id);
  const product = useMemo(() => {
    if (isNaN(numericId)) return undefined;
    return PRODUCTS_DATA.find(p => p.id === numericId);
  }, [numericId]);

  return { product };
}
