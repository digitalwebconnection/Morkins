import Home from '../features/home/Home';
import { useCart } from '../hooks';

export default function HomeRoute() {
  const { addToCart } = useCart();
  return <Home onAddToCart={addToCart} />;
}
