'use client';

import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
        backgroundColor: '#8a8580',
      }}
    >
      {/* Video Background Placeholder */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#8a8580',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {/* When you have a video, replace this div with: */}
        {/* <video autoPlay muted loop playsInline style={{ width:'100%', height:'100%', objectFit:'cover' }}>
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video> */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            border: '2px solid rgba(255,255,255,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="rgba(255,255,255,0.7)">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}
        >
          Campaign Video
        </p>
      </div>

      {/* Dark gradient at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '60%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '1440px',
          width: '100%',
          margin: '0 auto',
          padding: '0 48px 80px',
        }}
      >
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '20px',
          }}
        >
          Spring / Summer 2025 Collection
        </p>
        <h1
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(48px, 7vw, 100px)',
            fontWeight: 500,
            color: '#ffffff',
            lineHeight: 1.05,
            marginBottom: '40px',
            maxWidth: '700px',
          }}
        >
          Dressed in
          <br />
          <em style={{ fontStyle: 'italic', fontWeight: 400 }}>Quiet</em>
          <br />
          Power.
        </h1>
        <Link
          href="/new-in"
          style={{
            display: 'inline-block',
            backgroundColor: '#ffffff',
            color: '#1a1a1a',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '16px 36px',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
        >
          Shop New Collection
        </Link>
      </div>
    </section>
  );
}
