import ProductDetailsPage from '../features/products/ProductDetailsPage';
import { useCart } from '../hooks';

export default function ProductDetailsRoute() {
  const { addToCart } = useCart();
  return <ProductDetailsPage onAddToCart={addToCart} />;
}
