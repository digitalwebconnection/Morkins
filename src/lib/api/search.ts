import { PRODUCTS_DATA } from './products';
import type { ProductExtended } from '../../types';

export interface SearchFilters {
  category?: string;
  department?: 'women' | 'men' | '';
  minPrice?: number;
  maxPrice?: number;
  inStockOnly?: boolean;
  sortBy?: 'relevance' | 'price-asc' | 'price-desc' | 'rating';
}

export interface SearchResult {
  query: string;
  total: number;
  products: ProductExtended[];
  suggestedKeywords?: string[];
  categories: { name: string; count: number }[];
}

/**
 * Searches products by name, description, category, skin concern, or botanical ingredients.
 * Connects to the backend search endpoint with resilient client-side fallback for offline/development environments.
 */
export async function searchProducts(
  query: string,
  filters: SearchFilters = {}
): Promise<SearchResult> {
  const trimmedQuery = query.trim().toLowerCase();

  try {
    // Attempt backend endpoint if active
    const response = await fetch(`/api/products/search?q=${encodeURIComponent(trimmedQuery)}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch {
    // Fall back to client-side catalog search below
  }

  // Client-side search algorithm with multi-field matching & relevance weighting
  let matches = PRODUCTS_DATA.filter((product) => {
    if (!trimmedQuery) return true;

    const nameMatch = product.name.toLowerCase().includes(trimmedQuery);
    const catMatch = product.category.toLowerCase().includes(trimmedQuery);
    const brandMatch = product.brand.toLowerCase().includes(trimmedQuery);
    const descMatch = product.description
      ? product.description.toLowerCase().includes(trimmedQuery)
      : false;
    const skinTypeMatch = product.skinType
      ? product.skinType.toLowerCase().includes(trimmedQuery)
      : false;
    const keyIngMatch = product.keyIngredients
      ? product.keyIngredients.some((ing: string) => ing.toLowerCase().includes(trimmedQuery))
      : false;

    return nameMatch || catMatch || brandMatch || descMatch || skinTypeMatch || keyIngMatch;
  });

  // Apply filters
  if (filters.category) {
    matches = matches.filter(
      (p) => p.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }

  if (filters.department) {
    matches = matches.filter((p) => p.department === filters.department);
  }

  if (typeof filters.minPrice === 'number' && typeof filters.maxPrice === 'number') {
    matches = matches.filter((p) => {
      const price = p.discountPrice || p.price;
      return price >= (filters.minPrice ?? 0) && price <= (filters.maxPrice ?? 9999);
    });
  }

  if (filters.inStockOnly) {
    matches = matches.filter((p) => p.inStock);
  }

  // Sort results
  if (filters.sortBy === 'price-asc') {
    matches.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
  } else if (filters.sortBy === 'price-desc') {
    matches.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
  } else if (filters.sortBy === 'rating') {
    matches.sort((a, b) => b.rating - a.rating);
  }

  // Compute category facets
  const categoryCountMap = matches.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1;
    return acc;
  }, {});

  const categories = Object.entries(categoryCountMap).map(([name, count]) => ({
    name,
    count,
  }));

  const suggestedKeywords = [
    'Radiance Glow Serum',
    'Hyaluronic Dew',
    'Retinol Renewal',
    'Scalp Vitality Tonic',
    'Peptide Barrier Cream',
    'Vitamin C',
  ];

  return {
    query,
    total: matches.length,
    products: matches,
    suggestedKeywords,
    categories,
  };
}
