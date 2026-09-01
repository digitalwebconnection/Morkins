import HairCarePage from '../features/haircare/HairCarePage';
import { useCart } from '../hooks';

export default function HairCareRoute() {
  const { addToCart } = useCart();
  return <HairCarePage onAddToCart={addToCart} />;
}
