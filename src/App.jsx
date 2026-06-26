import Header from './components/Header';
import Hero from './components/Hero';
import FeatureShowcase from './components/FeatureShowcase';
import PricingSection from './components/PricingSection';
import SocialProof from './components/SocialProof';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureShowcase />
        <PricingSection />
        <SocialProof />
      </main>
      <Footer />
    </>
  );
}

export default App;
