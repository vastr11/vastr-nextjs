import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
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
            color: '#8a8a8a',
            marginBottom: '16px',
          }}
        >
          404
        </p>
        <h1
          style={{
            fontFamily: 'Playfair Display, Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 500,
            color: '#1a1a1a',
            marginBottom: '20px',
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '17px',
            color: '#8a8a8a',
            marginBottom: '40px',
            maxWidth: '400px',
          }}
        >
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="btn-primary">
          Return Home
        </Link>
      </main>
      <Footer />
    </>
  );
}
