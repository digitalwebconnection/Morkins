import BannerSlider from './BannerSlider'
import ProductGrid from './ProductGrid'
import IngredientsSpotlight from './IngredientsSpotlight'
import FeaturedProductSection from './FeaturedProductSection'
import BestSellers from './BestSellers'
import Testimonials from './Testimonials'
import ImageFeed from './ImageFeed'
import New from './New'
// import SourcingTimeline from './SourcingTimeline'
import SkinQuiz from './SkinQuiz'
// import ClinicalStudy from './ClinicalStudy'

interface HomeProps {
  onAddToCart: (product: { id: number; name: string; price: number; img: string }, openCart?: boolean) => void
}

export default function Home({ onAddToCart }: HomeProps) {
  return (
    <main>
      {/* Auto-advancing promotional banner carousel (Hero Section) */}
      <BannerSlider />

      {/* Interactive Ingredients Spotlight */}
      <IngredientsSpotlight />

      {/* Brand Story and Statistics Section */}
      {/* <OurStory /> */}
      <New/>

    

      {/* Product Section: Displays 4 products (expandable) */}
      <ProductGrid onAddToCart={onAddToCart} />

      {/* Interactive Skin Quiz / Routine Builder */}
      <SkinQuiz onAddToCart={onAddToCart} />

      {/* Best Seller Section: Split layout carousel and image */}
      <BestSellers onAddToCart={onAddToCart} />

      {/* Clinical Study Results & Efficacy */}
      {/* <ClinicalStudy /> */}

      {/* Parallax Featured Products Section */}
      <FeaturedProductSection />

      {/* Testimonials 4-card grid layout */}
      <Testimonials onAddToCart={onAddToCart} />

      {/* Lifestyle image feed carousel */}
      <ImageFeed />
    </main>
  )
}
