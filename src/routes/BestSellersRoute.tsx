import BestSellersPage from '../features/bestsellers/BestSellersPage';
import { useCart } from '../hooks';

export default function BestSellersRoute() {
  const { addToCart } = useCart();
  return <BestSellersPage onAddToCart={addToCart} />;
}
