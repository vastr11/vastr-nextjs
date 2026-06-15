'use client';

import Link from 'next/link';
import { categories } from '@/lib/products';
import { useRef } from 'react';

const displayCategories = [
  { name: 'Prince Coat', slug: 'prince-coat', isDark: false, image: null },
  { name: 'Pent Coat', slug: 'pent-coat', isDark: false, image: null },
  { name: 'Sherwani', slug: 'sherwani', isDark: true, image: '/images/categories/sherwani.jpg' },
  { name: 'Fabric', slug: 'unstitched', isDark: true, image: null },
  { name: 'Shalwar Kameez', slug: 'shalwar-kameez', isDark: false, image: null },
  { name: 'Waistcoat', slug: 'waistcoat', isDark: false, image: null },
  { name: 'Accessories', slug: 'accessories', isDark: false, image: null },
];

export default function CategorySection() {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 300;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section style={{ padding: '80px 0 64px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px' }}>
        {/* Heading */}
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
              Explore
            </p>
            <h2 className="section-heading">
              Shop by <em>Category</em>
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => scroll('left')}
              style={{
                width: 44,
                height: 44,
                border: '1px solid #d5cdc4',
                background: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              aria-label="Scroll left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              style={{
                width: 44,
                height: 44,
                border: '1px solid #d5cdc4',
                background: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
              }}
              aria-label="Scroll right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

        {/* Category Carousel */}
        <div
          ref={carouselRef}
          className="category-carousel"
          style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}
        >
          {displayCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              style={{
                flexShrink: 0,
                width: '180px',
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              <div
                style={{
                  width: '180px',
                  aspectRatio: '3/4',
                  backgroundColor: cat.isDark ? '#2d2d2d' : '#e8e0d5',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease',
                }}
              >
                <span
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    color: cat.isDark ? '#5a5a5a' : '#b0a9a0',
                  }}
                >
                  Image
                </span>
              </div>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#1a1a1a',
                  marginTop: '10px',
                  textAlign: 'center',
                }}
              >
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
