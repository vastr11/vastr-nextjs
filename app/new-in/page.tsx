import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getNewArrivals } from '@/lib/products';

export const metadata: Metadata = {
  title: 'New In | VASTR – Latest Pakistani Menswear Collection',
  description: 'Discover the latest arrivals at VASTR. Fresh styles in Shalwar Kameez, Sherwani, Waistcoat and more.',
  alternates: { canonical: '/new-in' },
};

export default function NewInPage() {
  const newProducts = getNewArrivals();

  return (
    <>
      <Header />
      <main>
        <div
          style={{
            backgroundColor: '#f5f0eb',
            padding: '80px 32px 60px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#8a8a8a',
              marginBottom: '16px',
            }}
          >
            Just Arrived
          </p>
          <h1
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 60px)',
              fontWeight: 500,
              lineHeight: 1.1,
              color: '#1a1a1a',
            }}
          >
            New <em style={{ fontStyle: 'italic' }}>In</em>
          </h1>
        </div>

        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '60px 32px 80px' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px 16px',
            }}
          >
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
