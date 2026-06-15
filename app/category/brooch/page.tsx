import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Brooch | VASTR – Premium Men\'s Accessories',
    description: 'Shop premium brooches at VASTR. Elegant brooches for weddings and formal occasions.',
};

const products = [
    { id: 1, name: 'Gold Floral Brooch', price: 2500, badge: 'NEW IN', isDark: false },
    { id: 2, name: 'Silver Brooch', price: 1800, badge: '', isDark: true },
    { id: 3, name: 'Pearl Brooch', price: 2200, badge: 'PREMIUM', isDark: false },
    { id: 4, name: 'Diamond Brooch', price: 4500, badge: 'PREMIUM', isDark: true },
    { id: 5, name: 'Vintage Brooch', price: 1500, badge: 'SALE', isDark: false },
    { id: 6, name: 'Enamel Brooch', price: 2000, badge: 'NEW IN', isDark: true },
    { id: 7, name: 'Crystal Brooch', price: 1200, badge: 'SALE', isDark: false },
    { id: 8, name: 'Rose Gold Brooch', price: 3000, badge: '', isDark: true },
];

export default function BroochPage() {
    return (
        <>
            <Header />
            <main>
                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '20px 32px 0' }}>
                    <ol style={{ display: 'flex', gap: '8px', listStyle: 'none', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', color: '#8a8a8a' }}>
                        <li><Link href="/" style={{ color: '#8a8a8a', textDecoration: 'none' }}>Home</Link></li>
                        <li>·</li>
                        <li><Link href="/category/accessories" style={{ color: '#8a8a8a', textDecoration: 'none' }}>Accessories</Link></li>
                        <li>·</li>
                        <li style={{ color: '#1a1a1a' }}>Brooch</li>
                    </ol>
                </div>

                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 32px 0' }}>
                    <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 500, color: '#1a1a1a', marginBottom: '8px' }}>
                        Brooch
                    </h1>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', color: '#8a8a8a', marginBottom: '32px' }}>
                        Elegant brooches to complete your formal look
                    </p>
                </div>

                <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px 80px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px 16px' }}>
                        {products.map((product) => (
                            <Link key={product.id} href={`/product/brooch-${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div style={{ position: 'relative', cursor: 'pointer' }}>
                                    {product.badge && (
                                        <span style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: product.badge === 'SALE' ? '#c41e1e' : '#1a1a1a', color: '#fff', fontFamily: 'Cormorant Garamond, serif', fontSize: '10px', padding: '4px 10px', letterSpacing: '0.1em', zIndex: 1 }}>
                                            {product.badge}
                                        </span>
                                    )}
                                    <div style={{ aspectRatio: '3/4', backgroundColor: product.isDark ? '#2d2d2d' : '#e8e0d5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', color: product.isDark ? '#5a5a5a' : '#b0a9a0', letterSpacing: '0.1em' }}>Product Image</span>
                                    </div>
                                    <div style={{ padding: '12px 0 4px' }}>
                                        <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', fontWeight: 400, color: '#1a1a1a', marginBottom: '6px' }}>{product.name}</h3>
                                        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '14px', color: '#1a1a1a' }}>Rs. {product.price.toLocaleString()}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}