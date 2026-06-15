import Link from 'next/link';
import { Product, formatPrice } from '@/lib/products';

interface ProductCardProps {
  product: Product;
  width?: string;
}

export default function ProductCard({ product, width = '100%' }: ProductCardProps) {
  const isDark = product.id.includes('dark') ||
    ['sh-001', 'sh-003', 'sh-005', 'sh-007',
     'wc-002', 'wc-004', 'wc-006', 'wc-008',
     'pc-002', 'pc-004', 'pc-006', 'pc-008',
     'pec-001', 'pec-003', 'pec-005', 'pec-007',
     'sk-004', 'sk-006', 'sk-008',
     'un-002', 'un-004', 'un-006', 'un-008',
     'ac-002', 'ac-004', 'ac-006', 'ac-008'].includes(product.id);

  return (
    <Link
      href={`/product/${product.slug}`}
      style={{
        display: 'block',
        width,
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <div className="product-card">
        {/* Badge */}
        {product.badge && (
          <span
            className={`product-badge ${
              product.badge === 'NEW IN'
                ? 'badge-new'
                : product.badge === 'PREMIUM'
                ? 'badge-premium'
                : 'badge-sale'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Image */}
        <div
          style={{
            aspectRatio: '3/4',
            backgroundColor: isDark ? '#2d2d2d' : '#e8e0d5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '11px',
              letterSpacing: '0.1em',
              color: isDark ? '#5a5a5a' : '#b0a9a0',
              textTransform: 'uppercase',
            }}
          >
            Product Image
          </span>

          {/* Hover overlay */}
          <div className="product-image-overlay">
            <span>Add to Bag</span>
          </div>
        </div>

        {/* Info */}
        <div
          style={{
            padding: '12px 0 4px',
          }}
        >
          <p
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '10px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#8a8a8a',
              marginBottom: '4px',
            }}
          >
            {product.category}
          </p>
          <h3
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '15px',
              fontWeight: 400,
              color: '#1a1a1a',
              marginBottom: '6px',
              lineHeight: 1.3,
            }}
          >
            {product.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '14px',
                color: product.discount ? '#c41e1e' : '#1a1a1a',
                fontWeight: 500,
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '13px',
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
}
