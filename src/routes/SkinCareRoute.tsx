import SkinCarePage from '../features/skincare/SkinCarePage';
import { useCart } from '../hooks';

export default function SkinCareRoute() {
  const { addToCart } = useCart();
  return <SkinCarePage onAddToCart={addToCart} />;
}
