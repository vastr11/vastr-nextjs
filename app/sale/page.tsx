import type { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { getSaleProducts } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Sale | VASTR – Up to 30% Off Premium Pakistani Menswear',
  description: 'Shop VASTR\'s sale collection. Up to 30% off premium Pakistani menswear including Shalwar Kameez, Sherwani, Waistcoat and more.',
  alternates: { canonical: '/sale' },
};

export default function SalePage() {
  const saleProducts = getSaleProducts();

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <div
          style={{
            backgroundColor: '#1a1a1a',
            color: '#ffffff',
            textAlign: 'center',
            padding: '80px 32px',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '11px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#c41e1e',
              marginBottom: '16px',
            }}
          >
            Limited Time
          </p>
          <h1
            style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 500,
              lineHeight: 1.1,
            }}
          >
            On <em style={{ fontStyle: 'italic' }}>Sale</em>
          </h1>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '16px',
              color: '#8a8a8a',
              marginTop: '16px',
            }}
          >
            Up to 30% off selected styles
          </p>
        </div>

        {/* Products */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '60px 32px 80px' }}>
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '13px',
              color: '#8a8a8a',
              marginBottom: '32px',
              letterSpacing: '0.05em',
            }}
          >
            {saleProducts.length} sale items
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px 16px',
            }}
          >
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
