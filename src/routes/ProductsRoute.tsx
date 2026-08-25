import ProductsPage from '../features/products/ProductsPage';
import { useCart } from '../hooks';

export default function ProductsRoute() {
  const { addToCart } = useCart();
  return <ProductsPage onAddToCart={addToCart} />;
}
