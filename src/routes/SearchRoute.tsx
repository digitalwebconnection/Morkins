import { useCart } from '../hooks';
import SearchResultsPage from '../features/search/SearchResultsPage';

export default function SearchRoute() {
  const { addToCart } = useCart();
  return <SearchResultsPage onAddToCart={addToCart} />;
}
