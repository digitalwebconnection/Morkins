import { useCart } from '../hooks';
import OrderDetailsPage from '../features/orders/OrderDetailsPage';

export default function OrderDetailsRoute() {
  const { addToCart } = useCart();
  return <OrderDetailsPage onAddToCart={addToCart} />;
}
