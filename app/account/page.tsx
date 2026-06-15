'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { supabase } from '@/lib/supabase';
import { signOut } from '@/lib/auth';
import { formatPrice } from '@/lib/products';

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push('/auth'); return; }
    setUser(user);
    await fetchOrders(user.id);
    setLoading(false);
  };

  const fetchOrders = async (userId: string) => {
    const { data } = await supabase
      .from('orders')
      .select(`*, order_items(*)`)
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    setOrders(data || []);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return '#b8965a';
      case 'confirmed': return '#2d6a2d';
      case 'shipped': return '#1a4a8a';
      case 'delivered': return '#2d6a2d';
      case 'cancelled': return '#c41e1e';
      default: return '#8a8a8a';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'confirmed': return 'Confirm Ho Gaya';
      case 'shipped': return 'Ship Ho Gaya';
      case 'delivered': return 'Deliver Ho Gaya';
      case 'cancelled': return 'Cancel';
      default: return status;
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
      <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px 80px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 500, color: '#1a1a1a', marginBottom: '4px' }}>
              My Account
            </h1>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#8a8a8a' }}>
              {user?.email}
            </p>
          </div>
          <button onClick={handleSignOut} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '10px 20px', border: '1px solid #d5cdc4', background: 'transparent', color: '#8a8a8a', cursor: 'pointer' }}>
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e8e0d5', marginBottom: '32px' }}>
          {['orders', 'profile'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '12px 24px', background: 'none', border: 'none', borderBottom: activeTab === tab ? '2px solid #1a1a1a' : '2px solid transparent', color: activeTab === tab ? '#1a1a1a' : '#8a8a8a', cursor: 'pointer', marginBottom: '-1px' }}>
              {tab === 'orders' ? 'My Orders' : 'Profile'}
            </button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            {orders.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '18px', color: '#8a8a8a', marginBottom: '24px' }}>
                  Abhi tak koi order nahi
                </p>
                <Link href="/" className="btn-primary">
                  Shopping Karein
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {orders.map((order) => (
                  <div key={order.id} style={{ border: '1px solid #e8e0d5', padding: '24px' }}>
                    
                    {/* Order Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '4px' }}>
                          Order Number
                        </p>
                        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: getStatusColor(order.status), color: '#ffffff', fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>
                          {getStatusLabel(order.status)}
                        </span>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a' }}>
                          {new Date(order.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div style={{ backgroundColor: '#faf8f5', padding: '16px', marginBottom: '16px' }}>
                      {order.order_items?.map((item: any) => (
                        <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #e8e0d5' }}>
                          <div>
                            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#1a1a1a' }}>{item.product_name}</p>
                            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: '#8a8a8a' }}>Size: {item.size} × {item.quantity}</p>
                          </div>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#1a1a1a' }}>
                            {formatPrice(item.product_price * item.quantity)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Order Footer */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                      <div>
                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', color: '#8a8a8a' }}>
                          {order.payment_method === 'cod' ? '💵 Cash on Delivery' : '🏦 Bank Transfer'} · {order.city}
                        </p>
                      </div>
                      <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '18px', fontWeight: 600, color: '#1a1a1a' }}>
                        {formatPrice(order.total_amount)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div style={{ maxWidth: '480px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ padding: '20px', backgroundColor: '#f5f0eb' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '4px' }}>Email</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', color: '#1a1a1a' }}>{user?.email}</p>
              </div>
              <div style={{ padding: '20px', backgroundColor: '#f5f0eb' }}>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8a8a8a', marginBottom: '4px' }}>Member Since</p>
                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', color: '#1a1a1a' }}>
                  {new Date(user?.created_at).toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' })}
                </p>
              </div>
              <button onClick={handleSignOut} style={{ width: '100%', backgroundColor: 'transparent', color: '#c41e1e', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', padding: '14px', border: '1px solid #c41e1e', cursor: 'pointer' }}>
                Logout
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}