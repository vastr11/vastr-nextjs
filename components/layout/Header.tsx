'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';

const categoryLinks = [
  { label: 'New In', href: '/new-in' },
  { label: 'Shalwar Kameez', href: '/category/shalwar-kameez' },
  { label: 'Waistcoat', href: '/category/waistcoat' },
  { label: 'Prince Coat', href: '/category/prince-coat' },
  { label: 'Pent Coat', href: '/category/pent-coat' },
  { label: 'Sherwani', href: '/category/sherwani' },
  { label: 'Unstitched', href: '/category/unstitched' },
  { label: 'Sale', href: '/sale', isRed: true },
];

const accessoriesItems = [
  { label: 'All Accessories', href: '/category/accessories' },
  { label: 'Cufflinks', href: '/category/cufflinks' },
  { label: 'Brooch', href: '/category/brooch' },
  { label: 'Pocket Square', href: '/category/pocket-square' },
  { label: 'Groom Necklace', href: '/category/groom-necklace' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const accRef = useRef<HTMLButtonElement>(null);
  const timerRef = useRef<any>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchCartCount(session.user.id);
      } else {
        const localCart = JSON.parse(localStorage.getItem('vastr_cart') || '[]');
        const localCount = localCart.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(localCount);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) fetchCartCount(session.user.id);
      else setCartCount(0);
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('scroll', handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const fetchCartCount = async (userId: string) => {
    const { data } = await supabase.from('cart_items').select('quantity').eq('user_id', userId);
    const total = data?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    setCartCount(total);
  };

  const openDropdown = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (accRef.current) {
      const rect = accRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + window.scrollY, left: rect.left + rect.width / 2 });
    }
    setDropdownOpen(true);
  };

  const closeDropdown = () => {
    timerRef.current = setTimeout(() => setDropdownOpen(false), 200);
  };

  const keepOpen = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const BagIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );

  const SearchIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
    </svg>
  );

  const AccountIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const MenuIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="1.8" strokeLinecap="round">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );

  return (
    <>
      {/* Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-track">
          {['NEW COLLECTION JUST DROPPED', 'EASY RETURNS WITHIN 7 DAYS', 'SHOP NOW & SAVE BIG', 'FREE SHIPPING ON ORDERS OVER RS. 5,000',
            'NEW COLLECTION JUST DROPPED', 'EASY RETURNS WITHIN 7 DAYS', 'SHOP NOW & SAVE BIG', 'FREE SHIPPING ON ORDERS OVER RS. 5,000']
            .map((msg, i) => (
              <span key={i} style={{ padding: '0 40px' }}>
                {msg}{i < 7 && <span style={{ marginLeft: 40, opacity: 0.4 }}>·</span>}
              </span>
            ))}
        </div>
      </div>

      <header style={{
        backgroundColor: '#fff',
        borderBottom: '1px solid #e8e0d5',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        boxShadow: scrolled ? '0 2px 20px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.3s ease',
      }}>

        {/* DESKTOP */}
        {!isMobile && (
          <>
            <div style={{
              maxWidth: '1440px',
              margin: '0 auto',
              padding: '0 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '64px',
            }}>
              {/* Left nav */}
              <nav style={{ display: 'flex', gap: '32px', flex: 1 }}>
                <Link href="/new-in" className="nav-link">New In</Link>
                <Link href="/men" className="nav-link">Men</Link>
                <Link href="/sale" className="nav-link sale">Sale</Link>
              </nav>

              {/* Center Logo — NO circle border */}
              <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src="/images/vastr-logo 2.png"
                  alt="VASTR"
                  style={{ width: '52px', height: '52px', objectFit: 'contain' }}
                />
              </Link>

              {/* Right icons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flex: 1, justifyContent: 'flex-end' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                  <SearchIcon />
                </button>
                <Link href={user ? '/account' : '/auth'} style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                  {user ? <AccountIcon /> : <span className="nav-link">Login</span>}
                </Link>
                <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                  <BagIcon />
                  {cartCount > 0 && (
                    <span style={{ position: 'absolute', top: '-8px', right: '-8px', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '50%', width: '16px', height: '16px', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Category Nav */}
            <div style={{ borderTop: '1px solid #e8e0d5', overflow: 'visible' }}>
              <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '40px', height: '44px', overflow: 'visible' }}>
                {categoryLinks.map((link) => (
                  <Link key={link.href} href={link.href} style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: link.isRed ? '#c41e1e' : '#1a1a1a', textDecoration: 'none', whiteSpace: 'nowrap', fontWeight: 500 }}>
                    {link.label}
                  </Link>
                ))}
                <button
                  ref={accRef}
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}
                >
                  Accessories
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.5" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }}>
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}

        {/* MOBILE */}
        {isMobile && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: '56px', position: 'relative' }}>
            {/* Left */}
            <div style={{ display: 'flex', gap: '14px', flex: 1, alignItems: 'center' }}>
              <Link href="/new-in" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', textDecoration: 'none', fontWeight: 500 }}>New In</Link>
              <Link href="/sale" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c41e1e', textDecoration: 'none', fontWeight: 500 }}>Sale</Link>
            </div>

            {/* Center Logo — NO circle border */}
            <Link href="/" style={{ textDecoration: 'none', position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src="/images/vastr-logo 2.png"
                alt="VASTR"
                style={{ width: '44px', height: '44px', objectFit: 'contain' }}
              />
            </Link>

            {/* Right icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1, justifyContent: 'flex-end' }}>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                <SearchIcon size={17} />
              </button>
              <Link href={user ? '/account' : '/auth'} style={{ display: 'flex', alignItems: 'center', color: '#1a1a1a' }}>
                <AccountIcon size={17} />
              </Link>
              <Link href="/cart" style={{ position: 'relative', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <BagIcon size={17} />
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: '-7px', right: '-7px', backgroundColor: '#1a1a1a', color: '#fff', borderRadius: '50%', width: '15px', height: '15px', fontSize: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
                    {cartCount}
                  </span>
                )}
              </Link>
              <button onClick={() => setMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}>
                <MenuIcon />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Accessories Dropdown */}
      {dropdownOpen && !isMobile && (
        <div
          onMouseEnter={keepOpen}
          onMouseLeave={closeDropdown}
          style={{ position: 'fixed', top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px`, transform: 'translateX(-50%)', backgroundColor: '#ffffff', border: '1px solid #e8e0d5', boxShadow: '0 8px 40px rgba(0,0,0,0.12)', minWidth: '200px', zIndex: 99999 }}
        >
          {accessoriesItems.map((item, idx) => (
            <Link key={item.href} href={item.href} onClick={() => setDropdownOpen(false)}
              style={{ display: 'block', padding: '12px 20px', fontFamily: 'Cormorant Garamond, serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: idx === 0 ? '#8a8a8a' : '#1a1a1a', textDecoration: 'none', borderBottom: idx < accessoriesItems.length - 1 ? '1px solid #f0ebe5' : 'none' }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f5f0eb'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}

      {/* Mobile Drawer */}
      <div className={`mobile-nav-backdrop ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)} />
      <div className={`mobile-nav ${menuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid #e8e0d5' }}>
          <img src="/images/vastr-logo 2.png" alt="VASTR" style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
          <button onClick={() => setMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '24px' }}>×</button>
        </div>
        <nav style={{ padding: '16px 24px' }}>
          {categoryLinks.map((link) => (
            <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}
              style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', letterSpacing: '0.1em', textTransform: 'uppercase', color: link.isRed ? '#c41e1e' : '#1a1a1a', padding: '13px 0', borderBottom: '1px solid #e8e0d5', textDecoration: 'none' }}>
              {link.label}
            </Link>
          ))}
          <Link href="/category/accessories" onClick={() => setMenuOpen(false)}
            style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', padding: '13px 0', borderBottom: '1px solid #e8e0d5', textDecoration: 'none' }}>
            Accessories
          </Link>
          <div style={{ paddingLeft: '16px' }}>
            {accessoriesItems.slice(1).map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMenuOpen(false)}
                style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5a5a5a', padding: '10px 0', borderBottom: '1px solid #f0ebe5', textDecoration: 'none' }}>
                — {item.label}
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '16px' }}>
            {user ? (
              <Link href="/account" onClick={() => setMenuOpen(false)}
                style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', padding: '13px 0', borderBottom: '1px solid #e8e0d5', textDecoration: 'none' }}>
                My Account
              </Link>
            ) : (
              <Link href="/auth" onClick={() => setMenuOpen(false)}
                style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: '15px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1a1a1a', padding: '13px 0', borderBottom: '1px solid #e8e0d5', textDecoration: 'none' }}>
                Login / Sign Up
              </Link>
            )}
          </div>
        </nav>
      </div>
    </>
  );
}