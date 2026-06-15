'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { getCart, clearCart } from '@/lib/cartStore';
import { formatPrice } from '@/lib/products';

export default function CheckoutPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [localCart, setLocalCart] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');
  const [isGuest, setIsGuest] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
    deliveryType: 'standard',
    paymentMethod: 'cod',
  });

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
      // Local cart from localStorage
      const saved = localStorage.getItem('vastr_cart');
      if (saved) setLocalCart(JSON.parse(saved));
      setIsGuest(true);
    }
    setLoading(false);
  };

  const allItems = user ? cartItems : localCart;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const subtotal = allItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
  const delivery = form.deliveryType === 'express' ? 500 : subtotal >= 5000 ? 0 : 250;
  const total = subtotal + delivery;

  const handlePlaceOrder = async () => {
    if (!form.fullName || !form.phone || !form.address || !form.city) {
      setError('Sari zaruri information fill karein');
      return;
    }
    if (allItems.length === 0) {
      setError('Cart khali hai');
      return;
    }

    setPlacing(true);
    try {
      // Order save karo
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user?.id || null,
          full_name: form.fullName,
          phone: form.phone,
          address: form.address,
          city: form.city,
          postal_code: form.postalCode,
          total_amount: total,
          delivery_type: form.deliveryType,
          payment_method: form.paymentMethod,
          status: 'pending',
          is_guest: !user,
          guest_email: !user ? form.email : null,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Order items save karo
      const orderItems = allItems.map((item: any) => ({
        order_id: order.id,
        product_id: item.product_id || item.id,
        product_name: item.product_name,
        product_price: item.product_price,
        size: item.size,
        quantity: item.quantity,
      }));

      await supabase.from('order_items').insert(orderItems);

      // Email notification
      await fetch('/api/send-order-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          customerName: form.fullName,
          customerEmail: form.email || user?.email || '',
          items: allItems,
          total,
          address: `${form.address}, ${form.city}`,
          paymentMethod: form.paymentMethod,
        }),
      });

      // Cart clear karo
      if (user) {
        await clearCart(user.id);
      } else {
        localStorage.removeItem('vastr_cart');
      }

      router.push(`/order-success?id=${order.id}`);

    } catch (err: any) {
      setError('Order place karne mein masla hua — dobara try karein');
      setPlacing(false);
    }
  };

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

        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 500, marginBottom: '8px', color: '#1a1a1a' }}>
          Checkout
        </h1>

        {/* Guest/Login Banner */}
        {!user && (
          <div style={{ backgroundColor: '#f5f0eb', padding: '16px 20px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#3d3d3d' }}>
              Account hai? Login karke order history save karein
            </p>
            <Link href="/auth" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'underline' }}>
              Login / Sign Up
            </Link>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '48px', alignItems: 'start' }}>

          {/* Left — Form */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 500, marginBottom: '24px', color: '#1a1a1a', paddingBottom: '12px', borderBottom: '1px solid #e8e0d5' }}>
                Delivery Information
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                  <input name="fullName" type="text" value={form.fullName} onChange={handleChange} placeholder="Apna poora naam" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5' }} />
                </div>

                <div>
                  <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>Phone Number *</label>
                  <input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="03XX-XXXXXXX" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5' }} />
                </div>

                {/* Guest ke liye email optional */}
                {!user && (
                  <div>
                    <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>
                      Email <span style={{ color: '#8a8a8a', textTransform: 'none', fontSize: '11px' }}>(Optional — order updates ke liye)</span>
                    </label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="email@example.com" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5' }} />
                  </div>
                )}

                <div>
                  <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>Address *</label>
                  <textarea name="address" value={form.address} onChange={handleChange} placeholder="Ghar/flat number, gali, mohalla" rows={3} style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5', resize: 'vertical' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>City *</label>
                    <input name="city" type="text" value={form.city} onChange={handleChange} placeholder="Lahore" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5' }} />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', display: 'block', marginBottom: '6px' }}>Postal Code</label>
                    <input name="postalCode" type="text" value={form.postalCode} onChange={handleChange} placeholder="54000" style={{ width: '100%', padding: '12px 14px', border: '1px solid #d5cdc4', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', outline: 'none', backgroundColor: '#faf8f5' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Type */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 500, marginBottom: '24px', color: '#1a1a1a', paddingBottom: '12px', borderBottom: '1px solid #e8e0d5' }}>
                Delivery Option
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { value: 'standard', label: 'Standard Delivery', desc: '3-5 business days', price: subtotal >= 5000 ? 'Free' : 'Rs. 250' },
                  { value: 'express', label: 'Express Delivery', desc: '1-2 business days', price: 'Rs. 500' },
                ].map((option) => (
                  <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: form.deliveryType === option.value ? '1.5px solid #1a1a1a' : '1px solid #d5cdc4', cursor: 'pointer', backgroundColor: form.deliveryType === option.value ? '#faf8f5' : '#ffffff' }}>
                    <input type="radio" name="deliveryType" value={option.value} checked={form.deliveryType === option.value} onChange={handleChange} style={{ accentColor: '#1a1a1a', width: '16px', height: '16px' }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }}>{option.label}</p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a' }}>{option.desc}</p>
                    </div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', fontWeight: 500, color: option.price === 'Free' ? '#2d6a2d' : '#1a1a1a' }}>{option.price}</p>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 500, marginBottom: '24px', color: '#1a1a1a', paddingBottom: '12px', borderBottom: '1px solid #e8e0d5' }}>
                Payment Method
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { value: 'cod', label: 'Cash on Delivery', desc: 'Delivery pe payment karein' },
                  { value: 'bank', label: 'Bank Transfer', desc: 'Order ke baad details mileingi' },
                ].map((option) => (
                  <label key={option.value} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: form.paymentMethod === option.value ? '1.5px solid #1a1a1a' : '1px solid #d5cdc4', cursor: 'pointer', backgroundColor: form.paymentMethod === option.value ? '#faf8f5' : '#ffffff' }}>
                    <input type="radio" name="paymentMethod" value={option.value} checked={form.paymentMethod === option.value} onChange={handleChange} style={{ accentColor: '#1a1a1a', width: '16px', height: '16px' }} />
                    <div>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', fontWeight: 600, color: '#1a1a1a' }}>{option.label}</p>
                      <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a' }}>{option.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Summary */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <div style={{ backgroundColor: '#f5f0eb', padding: '32px', marginBottom: '16px' }}>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '20px', fontWeight: 500, marginBottom: '20px', color: '#1a1a1a' }}>
                Order Summary
              </h2>

              {allItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#8a8a8a', marginBottom: '16px' }}>Cart khali hai</p>
                  <Link href="/" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'underline' }}>Shopping Karein</Link>
                </div>
              ) : (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    {allItems.map((item: any, i: number) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #e8e0d5' }}>
                        <div>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#1a1a1a' }}>{item.product_name}</p>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: '#8a8a8a' }}>Size: {item.size} × {item.quantity}</p>
                        </div>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#1a1a1a' }}>{formatPrice(item.product_price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#5a5a5a' }}>Subtotal</span>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#1a1a1a' }}>{formatPrice(subtotal)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#5a5a5a' }}>Delivery</span>
                      <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: delivery === 0 ? '#2d6a2d' : '#1a1a1a' }}>{delivery === 0 ? 'Free' : formatPrice(delivery)}</span>
                    </div>
                    <div style={{ borderTop: '1px solid #d5cdc4', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 600, color: '#1a1a1a' }}>Total</span>
                      <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '17px', fontWeight: 600, color: '#1a1a1a' }}>{formatPrice(total)}</span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {error && (
              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '12px 16px', marginBottom: '16px' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#c41e1e' }}>{error}</p>
              </div>
            )}

            <button onClick={handlePlaceOrder} disabled={placing} style={{ width: '100%', backgroundColor: placing ? '#8a8a8a' : '#1a1a1a', color: '#ffffff', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', padding: '18px', border: 'none', cursor: placing ? 'not-allowed' : 'pointer', transition: 'all 0.3s ease' }}>
              {placing ? 'Order Place Ho Raha Hai...' : 'Place Order'}
            </button>

            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: '#8a8a8a', textAlign: 'center', marginTop: '12px' }}>
              🔒 Secure & Safe Checkout
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}