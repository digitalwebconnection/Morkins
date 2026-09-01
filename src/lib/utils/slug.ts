/**
 * Converts a string into an SEO-friendly URL slug
 * Example: "Botanical Radiance Glow Serum" -> "botanical-radiance-glow-serum"
 */
export function slugify(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // remove non-word chars except hyphens and spaces
    .replace(/[\s_-]+/g, '-') // collapse whitespace and underscores to single hyphen
    .replace(/^-+|-+$/g, ''); // remove leading and trailing hyphens
}

/**
 * Returns the SEO-friendly URL path for a product
 * Example: getProductUrl({ name: "Botanical Radiance Glow Serum", slug: "botanical-radiance-glow-serum" }) 
 *       -> "/products/botanical-radiance-glow-serum"
 */
export function getProductUrl(product: { id?: number | string; name?: string; slug?: string }): string {
  if (!product) return '/products';
  if (product.slug) return `/products/${product.slug}`;
  if (product.name) return `/products/${slugify(product.name)}`;
  if (product.id !== undefined) return `/products/${product.id}`;
  return '/products';
}
