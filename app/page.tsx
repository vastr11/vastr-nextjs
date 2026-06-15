import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/home/HeroSection';
import CategorySection from '@/components/home/CategorySection';
import NewArrivalsSection from '@/components/home/NewArrivalsSection';
import SaleSection from '@/components/home/SaleSection';
import CampaignSection from '@/components/home/CampaignSection';

export const metadata: Metadata = {
  title: 'VASTR – Premium Pakistani Menswear | Shalwar Kameez, Sherwani & More',
  description: 'Shop premium Pakistani menswear at VASTR. Shalwar Kameez, Sherwani, Prince Coat, Pent Coat, Waistcoat and Accessories. Free shipping on orders over Rs. 5,000.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategorySection />
        <NewArrivalsSection />
        <SaleSection />
        <CampaignSection />

        {/* Features Strip */}
        <section
          style={{
            backgroundColor: '#f5f0eb',
            padding: '48px 32px',
          }}
        >
          <div
            style={{
              maxWidth: '1440px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '32px',
              textAlign: 'center',
            }}
          >
            {[
              { icon: '🚚', title: 'Free Shipping', desc: 'On orders over Rs. 5,000' },
              { icon: '↩️', title: 'Easy Returns', desc: 'Within 7 days of delivery' },
              { icon: '🔒', title: 'Secure Payment', desc: 'Safe & encrypted checkout' },
              { icon: '⭐', title: 'Premium Quality', desc: 'Handcrafted with care' },
            ].map((feature) => (
              <div key={feature.title}>
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '12px' }}>
                  {feature.icon}
                </span>
                <h3
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '16px',
                    fontWeight: 600,
                    color: '#1a1a1a',
                    marginBottom: '6px',
                  }}
                >
                  {feature.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '14px',
                    color: '#8a8a8a',
                  }}
                >
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
