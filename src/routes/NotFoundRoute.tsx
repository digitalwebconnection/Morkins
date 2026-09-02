import NotFoundPage from '../features/notfound/NotFoundPage';
import { useCart } from '../hooks';

export default function NotFoundRoute() {
  const { addToCart } = useCart();
  return <NotFoundPage onAddToCart={addToCart} />;
}
