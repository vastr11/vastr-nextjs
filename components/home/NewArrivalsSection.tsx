'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { getNewArrivals, formatPrice } from '@/lib/products';
import ProductCard from '@/components/product/ProductCard';

export default function NewArrivalsSection() {
  const products = getNewArrivals();
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      style={{
        padding: '80px 0',
        backgroundColor: '#faf8f5',
      }}
    >
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '40px',
          }}
        >
          <div>
            <p className="section-subheading" style={{ marginBottom: '8px' }}>
              Just Landed
            </p>
            <h2 className="section-heading">
              New <em>Arrivals</em>
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => scroll('left')}
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid #d5cdc4',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={() => scroll('right')}
                style={{
                  width: 40,
                  height: 40,
                  border: '1px solid #d5cdc4',
                  background: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={carouselRef}
          className="product-carousel"
        >
          {products.map((product) => (
            <div key={product.id} style={{ flexShrink: 0, width: '240px' }}>
              <ProductCard product={product} width="240px" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
