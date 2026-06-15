import Link from 'next/link';
import { getSaleProducts, formatPrice } from '@/lib/products';

export default function SaleSection() {
  const products = getSaleProducts().slice(0, 4);

  return (
    <section style={{ padding: '80px 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="section-subheading" style={{ marginBottom: '8px' }}>
            Limited Time
          </p>
          <h2 className="section-heading">
            On <em>Sale</em>
          </h2>
        </div>

        {/* Products Grid — 2x2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
        >
          {products.map((product) => {
            const isDark = ['sh-004', 'pc-008', 'pec-008', 'wc-007'].includes(product.id);

            return (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
              >
                <div style={{ position: 'relative', cursor: 'pointer' }}>
                  {/* Discount Badge */}
                  {product.discount && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '16px',
                        left: '16px',
                        backgroundColor: '#c41e1e',
                        color: '#ffffff',
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        padding: '5px 12px',
                        zIndex: 10,
                        textTransform: 'uppercase',
                      }}
                    >
                      {product.discount}% OFF
                    </span>
                  )}

                  {/* Image — taller aspect ratio */}
                  <div
                    style={{
                      aspectRatio: '2/3',
                      backgroundColor: isDark ? '#2d2d2d' : '#e8e0d5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '12px',
                        color: isDark ? '#5a5a5a' : '#b0a9a0',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                      }}
                    >
                      Product Image
                    </span>
                  </div>

                  {/* Info */}
                  <div style={{ padding: '16px 0 8px' }}>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '6px' }}>
                      {product.category}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'Playfair Display, serif',
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        fontWeight: 400,
                        marginBottom: '8px',
                        color: '#1a1a1a',
                      }}
                    >
                      {product.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '16px',
                          color: '#c41e1e',
                          fontWeight: 500,
                        }}
                      >
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span
                          style={{
                            fontFamily: 'Cormorant Garamond, serif',
                            fontSize: '14px',
                            color: '#8a8a8a',
                            textDecoration: 'line-through',
                          }}
                        >
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/sale" className="btn-primary">
            Shop All Sale Items
          </Link>
        </div>
      </div>
    </section>
  );
}