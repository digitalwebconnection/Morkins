import UserProfile from '../features/profile/UserProfile';
import { useCart, useAuth } from '../hooks';

export default function ProfileRoute() {
  const { addToCart } = useCart();
  const { logout } = useAuth();

  return <UserProfile onAddToCart={addToCart} onLogout={logout} />;
}
