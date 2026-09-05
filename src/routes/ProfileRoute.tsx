import { useNavigate } from 'react-router-dom';
import UserProfile from '../features/profile/UserProfile';
import { useCart, useAuth } from '../hooks';

export default function ProfileRoute() {
  const { addToCart } = useCart();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/', { replace: true });
  };

  return <UserProfile onAddToCart={addToCart} onLogout={handleLogout} />;
}

