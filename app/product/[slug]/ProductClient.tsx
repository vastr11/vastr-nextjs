'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { addToCart } from '@/lib/cartStore';
import { addToLocalCart } from '@/lib/localCart';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Product, formatPrice } from '@/lib/products';

interface Props {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductClient({ product, relatedProducts }: Props) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState('');
  const [addedToBag, setAddedToBag] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('details');
  const [imageIndex, setImageIndex] = useState(0);

  const isDark = ['sh-001', 'sh-003', 'sh-005', 'sh-007',
    'wc-002', 'wc-004', 'wc-006', 'wc-008',
    'pc-002', 'pc-004', 'pc-006', 'pc-008',
    'pec-001', 'pec-003', 'pec-005', 'pec-007',
    'sk-004', 'sk-006', 'sk-008',
    'un-002', 'un-004', 'un-006', 'un-008',
    'ac-002', 'ac-004', 'ac-006', 'ac-008'].includes(product.id);

  const handleAddToBag = async () => {
    if (!selectedSize) { alert('Please select a size'); return; }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        await addToCart(user.id, {
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          size: selectedSize,
          quantity: 1,
        });
        setAddedToBag(true);
        setTimeout(() => setAddedToBag(false), 2000);
      } else {
        addToLocalCart({
          product_id: product.id,
          product_name: product.name,
          product_price: product.price,
          size: selectedSize,
          quantity: 1,
        });
        router.push('/cart');
      }
    } catch (err) {
      alert('Cart mein add karne mein masla hua');
    }
    setLoading(false);
  };

  const productSchema = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: { '@type': 'Brand', name: 'VASTR' },
    offers: {
      '@type': 'Offer',
      url: `https://vastr.pk/product/${product.slug}`,
      priceCurrency: 'PKR',
      price: product.price,
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <Header />
      <main>
        {/* Breadcrumb */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '16px 20px 0' }}>
          <nav aria-label="Breadcrumb">
            <ol style={{ display: 'flex', alignItems: 'center', gap: '6px', listStyle: 'none', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: '#8a8a8a', flexWrap: 'wrap' }}>
              <li><Link href="/" style={{ color: '#8a8a8a', textDecoration: 'none' }}>Home</Link></li>
              <li style={{ opacity: 0.5 }}>·</li>
              <li><Link href={`/category/${product.categorySlug}`} style={{ color: '#8a8a8a', textDecoration: 'none' }}>{product.category}</Link></li>
              <li style={{ opacity: 0.5 }}>·</li>
              <li style={{ color: '#1a1a1a' }}>{product.name}</li>
            </ol>
          </nav>
        </div>

        {/* Product Layout */}
        <div className="product-layout" style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '24px 20px 60px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>

          {/* Images */}
          <div>
            <div style={{
              aspectRatio: '3/4',
              backgroundColor: isDark ? '#2d2d2d' : '#e8e0d5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
              position: 'relative',
            }}>
              {product.badge && (
                <span style={{
                  position: 'absolute', top: '14px', left: '14px',
                  backgroundColor: product.badge === 'SALE' ? '#c41e1e' : '#1a1a1a',
                  color: '#fff', fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '10px', letterSpacing: '0.1em', padding: '4px 10px',
                  textTransform: 'uppercase', fontWeight: 600,
                }}>
                  {product.badge}
                </span>
              )}
              <span style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '13px',
                color: isDark ? '#4a4a4a' : '#b0a9a0',
                letterSpacing: '0.1em', textTransform: 'uppercase',
              }}>
                Product Image
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[0, 1, 2].map((i) => (
                <div key={i} onClick={() => setImageIndex(i)} style={{
                  width: '72px', aspectRatio: '3/4', cursor: 'pointer',
                  backgroundColor: i === 1 ? (isDark ? '#3d3d3d' : '#ddd6cb') : (isDark ? '#2d2d2d' : '#e8e0d5'),
                  border: imageIndex === i ? '2px solid #1a1a1a' : '2px solid transparent',
                  transition: 'border-color 0.2s ease',
                }} />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '11px',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              color: '#8a8a8a', marginBottom: '8px',
            }}>
              {product.category}
            </p>

            <h1 style={{
              fontFamily: 'Playfair Display, Georgia, serif',
              fontSize: 'clamp(22px, 4vw, 36px)',
              fontWeight: 500, color: '#1a1a1a',
              lineHeight: 1.2, marginBottom: '16px',
            }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <span style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: '22px',
                fontWeight: 500, color: product.discount ? '#c41e1e' : '#1a1a1a',
              }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', color: '#8a8a8a', textDecoration: 'line-through' }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span style={{ backgroundColor: '#c41e1e', color: '#fff', fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', padding: '3px 8px' }}>
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <p style={{
              fontFamily: 'Cormorant Garamond, serif', fontSize: '15px',
              color: '#3d3d3d', lineHeight: 1.7, marginBottom: '24px',
            }}>
              {product.description}
            </p>

            <div style={{ borderTop: '1px solid #e8e0d5', paddingTop: '24px' }} />

            {/* Size Selection */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '12px',
                  letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1a1a1a',
                }}>
                  Size: <span style={{ fontWeight: 400, color: '#5a5a5a' }}>{selectedSize || 'Select a size'}</span>
                </p>
                <Link href="/size-guide" style={{
                  fontFamily: 'Cormorant Garamond, serif', fontSize: '12px',
                  color: '#8a8a8a', textDecoration: 'underline',
                }}>
                  Size Guide
                </Link>
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button key={size} onClick={() => setSelectedSize(size)} style={{
                    fontFamily: 'Cormorant Garamond, serif', fontSize: '13px',
                    minWidth: '52px', height: '44px', padding: '0 12px',
                    border: selectedSize === size ? '1.5px solid #1a1a1a' : '1px solid #d5cdc4',
                    background: selectedSize === size ? '#1a1a1a' : 'transparent',
                    color: selectedSize === size ? '#ffffff' : '#1a1a1a',
                    cursor: 'pointer', transition: 'all 0.2s ease',
                  }}>
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Bag */}
            <button onClick={handleAddToBag} disabled={loading} style={{
              width: '100%',
              backgroundColor: addedToBag ? '#2d6a2d' : loading ? '#8a8a8a' : '#1a1a1a',
              color: '#ffffff', fontFamily: 'Cormorant Garamond, serif',
              fontSize: '12px', letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '16px', border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease', marginBottom: '10px',
            }}>
              {addedToBag ? '✓ Added to Bag' : loading ? 'Adding...' : 'Add to Bag'}
            </button>

            <button style={{
              width: '100%', backgroundColor: 'transparent', color: '#1a1a1a',
              fontFamily: 'Cormorant Garamond, serif', fontSize: '12px',
              letterSpacing: '0.18em', textTransform: 'uppercase',
              padding: '16px', border: '1px solid #1a1a1a', cursor: 'pointer',
              marginBottom: '24px',
            }}>
              ♡ Add to Wishlist
            </button>

            {/* Features */}
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px', padding: '16px 0',
              borderTop: '1px solid #e8e0d5', borderBottom: '1px solid #e8e0d5',
              marginBottom: '24px',
            }}>
              {[
                { icon: '🚚', text: 'Free shipping over Rs. 5,000' },
                { icon: '↩️', text: '7-day returns' },
                { icon: '🔒', text: 'Secure payment' },
              ].map((f) => (
                <div key={f.text} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '18px' }}>{f.icon}</span>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', color: '#5a5a5a', lineHeight: 1.4 }}>{f.text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div>
              <div style={{ display: 'flex', borderBottom: '1px solid #e8e0d5', marginBottom: '16px' }}>
                {['details', 'fabric', 'shipping'].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab)} style={{
                    fontFamily: 'Cormorant Garamond, serif', fontSize: '12px',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '10px 16px', background: 'none', border: 'none',
                    borderBottom: activeTab === tab ? '2px solid #1a1a1a' : '2px solid transparent',
                    color: activeTab === tab ? '#1a1a1a' : '#8a8a8a',
                    cursor: 'pointer', marginBottom: '-1px',
                  }}>
                    {tab === 'details' ? 'Details' : tab === 'fabric' ? 'Fabric & Care' : 'Shipping'}
                  </button>
                ))}
              </div>

              {activeTab === 'details' && (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {product.details.map((detail, i) => (
                    <li key={i} style={{
                      fontFamily: 'Cormorant Garamond, serif', fontSize: '14px',
                      color: '#3d3d3d', padding: '5px 0', display: 'flex', gap: '10px', lineHeight: 1.5,
                    }}>
                      <span style={{ color: '#b0a9a0', flexShrink: 0 }}>—</span>{detail}
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === 'fabric' && (
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#3d3d3d', lineHeight: 1.7 }}>
                  <strong>Fabric:</strong> {product.fabric}. For best results, follow the care instructions included with your garment. Premium fabrics may require dry cleaning.
                </p>
              )}

              {activeTab === 'shipping' && (
                <div>
                  {[
                    { title: 'Standard Delivery', desc: '3–5 business days · Rs. 250' },
                    { title: 'Express Delivery', desc: '1–2 business days · Rs. 500' },
                    { title: 'Free Shipping', desc: 'On all orders over Rs. 5,000' },
                    { title: 'Easy Returns', desc: 'Within 7 days of delivery' },
                  ].map((item) => (
                    <div key={item.title} style={{ padding: '10px 0', borderBottom: '1px solid #f0ebe5' }}>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', fontWeight: 600, color: '#1a1a1a', marginBottom: '2px' }}>{item.title}</p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a' }}>{item.desc}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div style={{ backgroundColor: '#faf8f5', padding: '48px 20px' }}>
            <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
              <h2 style={{
                fontFamily: 'Playfair Display, serif', fontSize: 'clamp(22px, 3vw, 28px)',
                fontWeight: 500, marginBottom: '32px', textAlign: 'center',
              }}>
                You May Also <em style={{ fontStyle: 'italic' }}>Like</em>
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                gap: '16px',
              }}>
                {relatedProducts.map((rp) => (
                  <ProductCard key={rp.id} product={rp} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}