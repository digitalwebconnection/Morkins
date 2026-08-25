import NewArrivalsPage from '../features/newarrivals/NewArrivalsPage';
import { useCart } from '../hooks';

export default function NewArrivalsRoute() {
  const { addToCart } = useCart();
  return <NewArrivalsPage onAddToCart={addToCart} />;
}
