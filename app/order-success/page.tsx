'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <main style={{ minHeight: '70vh', backgroundColor: '#f5f0eb', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div style={{ backgroundColor: '#ffffff', padding: '56px 48px', maxWidth: '520px', width: '100%', textAlign: 'center', boxShadow: '0 4px 40px rgba(0,0,0,0.06)' }}>
        
        {/* Check Icon */}
        <div style={{ width: '72px', height: '72px', backgroundColor: '#f0fdf4', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
          <span style={{ fontSize: '32px' }}>✓</span>
        </div>

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '28px', fontWeight: 500, color: '#1a1a1a', marginBottom: '12px' }}>
          Order Place Ho Gaya!
        </h1>

        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', color: '#5a5a5a', marginBottom: '8px' }}>
          Shukriya aapki shopping ke liye!
        </p>

        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#8a8a8a', marginBottom: '32px' }}>
          Confirmation email aapke inbox mein bhej di gayi hai.
        </p>

        {/* Order ID */}
        {orderId && (
          <div style={{ backgroundColor: '#f5f0eb', padding: '16px 24px', marginBottom: '32px' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '4px' }}>
              Order Number
            </p>
            <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 600, color: '#1a1a1a' }}>
              #{orderId.slice(0, 8).toUpperCase()}
            </p>
          </div>
        )}

        {/* Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
          {[
            { icon: '🚚', text: 'Delivery 3-5 business days mein hogi' },
            { icon: '📱', text: 'Courier tracking SMS pe milegi' },
            { icon: '💬', text: 'Koi masla ho tو WhatsApp karein' },
          ].map((item) => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: '#faf8f5', textAlign: 'left' }}>
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#3d3d3d' }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Link href="/" style={{ display: 'block', backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px', textDecoration: 'none', textAlign: 'center' }}>
            Shopping Jaari Rakhein
          </Link>
          <Link href="/account" style={{ display: 'block', backgroundColor: 'transparent', color: '#1a1a1a', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px', textDecoration: 'none', border: '1px solid #1a1a1a', textAlign: 'center' }}>
            My Orders Dekhein
          </Link>
        </div>
      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#8a8a8a' }}>Loading...</p></div>}>
        <OrderSuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}