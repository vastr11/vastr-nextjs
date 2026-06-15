import Link from 'next/link';

export default function CampaignSection() {
  return (
    <section
      style={{
        position: 'relative',
        height: '80vh',
        minHeight: '500px',
        backgroundColor: '#8a8580',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Campaign Image placeholder */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#8a8580',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '12px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          Campaign Image
        </p>
      </div>

      {/* Gradient */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          padding: '0 48px 64px',
          width: '100%',
        }}
      >
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '12px',
          }}
        >
          The Collection
        </p>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 500,
            color: '#ffffff',
            marginBottom: '24px',
            lineHeight: 1.2,
          }}
        >
          Crafted for the{' '}
          <em style={{ fontStyle: 'italic' }}>Modern</em>
          <br />
          Pakistani Man
        </h2>
        <Link href="/new-in" className="btn-white">
          Shop Now
        </Link>
      </div>
    </section>
  );
}
