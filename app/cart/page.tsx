'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { getCart, removeFromCart, updateQuantity } from '@/lib/cartStore';
import { getLocalCart, removeFromLocalCart, updateLocalCartQuantity } from '@/lib/localCart';
import { formatPrice } from '@/lib/products';

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUserAndCart();
  }, []);

  const checkUserAndCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    if (user) {
      const items = await getCart(user.id);
      setCartItems(items || []);
    } else {
      setCartItems(getLocalCart());
    }
    setLoading(false);
  };

  const handleRemove = async (id: string) => {
    if (user) {
      await removeFromCart(id);
    } else {
      removeFromLocalCart(id);
    }
    setCartItems(prev => prev.filter(i => i.id !== id));
  };

  const handleQuantity = async (id: string, qty: number) => {
    if (user) {
      await updateQuantity(id, qty);
    } else {
      updateLocalCartQuantity(id, qty);
    }
    if (qty <= 0) {
      setCartItems(prev => prev.filter(i => i.id !== id));
    } else {
      setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
  const delivery = subtotal >= 5000 ? 0 : 250;
  const total = subtotal + delivery;

  if (loading) return (
    <>
      <Header />
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#8a8a8a' }}>Loading...</p>
      </div>
      <Footer />
    </>
  );

  return (
    <>
      <Header />
      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px 80px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 500, marginBottom: '40px', color: '#1a1a1a' }}>
          Your Bag ({cartItems.length})
        </h1>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0', borderTop: '1px solid #e8e0d5' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#8a8a8a', marginBottom: '32px' }}>
              Aapka bag khali hai
            </p>
            <Link href="/" className="btn-primary">Shopping Karein</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start' }}>

            {/* Cart Items */}
            <div>
              {cartItems.map((item) => (
                <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '20px', padding: '24px 0', borderBottom: '1px solid #e8e0d5' }}>
                  <div style={{ aspectRatio: '3/4', backgroundColor: '#e8e0d5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '10px', color: '#b0a9a0' }}>IMG</span>
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '4px' }}>VASTR</p>
                    <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 500, color: '#1a1a1a', marginBottom: '6px' }}>{item.product_name}</h3>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a', marginBottom: '16px' }}>Size: {item.size}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d5cdc4' }}>
                        <button onClick={() => handleQuantity(item.id, item.quantity - 1)} style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>−</button>
                        <span style={{ width: '36px', textAlign: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px' }}>{item.quantity}</span>
                        <button onClick={() => handleQuantity(item.id, item.quantity + 1)} style={{ width: '36px', height: '36px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' }}>+</button>
                      </div>
                      <button onClick={() => handleRemove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: '#8a8a8a', textDecoration: 'underline', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Remove</button>
                    </div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', fontWeight: 500, color: '#1a1a1a', marginTop: '12px' }}>
                      {formatPrice(item.product_price * item.quantity)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div style={{ backgroundColor: '#f5f0eb', padding: '32px', position: 'sticky', top: '120px' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 500, marginBottom: '24px', color: '#1a1a1a' }}>
                Order Summary
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#5a5a5a' }}>Subtotal</span>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#1a1a1a' }}>{formatPrice(subtotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#5a5a5a' }}>Delivery</span>
                  <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: delivery === 0 ? '#2d6a2d' : '#1a1a1a' }}>
                    {delivery === 0 ? 'Free' : formatPrice(delivery)}
                  </span>
                </div>
                {subtotal < 5000 && (
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: '#8a8a8a' }}>
                    {formatPrice(5000 - subtotal)} aur — free delivery!
                  </p>
                )}
                <div style={{ borderTop: '1px solid #d5cdc4', paddingTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 600 }}>Total</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 600 }}>{formatPrice(total)}</span>
                </div>
              </div>

              <button onClick={() => router.push('/checkout')} style={{ width: '100%', backgroundColor: '#1a1a1a', color: '#ffffff', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '16px', border: 'none', cursor: 'pointer', marginBottom: '12px' }}>
                Proceed to Checkout
              </button>

              {!user && (
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a', textAlign: 'center', marginTop: '12px' }}>
                  <Link href="/auth" style={{ color: '#1a1a1a', textDecoration: 'underline' }}>Login karein</Link> — order history save karne ke liye
                </p>
              )}

              <Link href="/" style={{ display: 'block', textAlign: 'center', fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a', textDecoration: 'underline', marginTop: '12px' }}>
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}