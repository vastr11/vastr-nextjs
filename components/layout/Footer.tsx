import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        paddingTop: '64px',
        paddingBottom: '32px',
        marginTop: '80px',
      }}
    >
      <div
        style={{
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 32px',
        }}
      >
        {/* Top Footer Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px',
            marginBottom: '64px',
          }}
        >
          {/* Brand Column */}
          <div>
            <h3
              style={{
                fontFamily: 'Playfair Display, Georgia, serif',
                fontSize: '24px',
                fontWeight: 700,
                letterSpacing: '0.1em',
                marginBottom: '16px',
              }}
            >
              VASTR
            </h3>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '14px',
                color: '#8a8a8a',
                lineHeight: 1.8,
                maxWidth: '260px',
              }}
            >
              Premium Pakistani menswear crafted for the modern gentleman. Quality, tradition and elegance in every stitch.
            </p>
            <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
              {['Instagram', 'Facebook', 'TikTok'].map((social) => (
                <a
                  key={social}
                  href="#"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: '#8a8a8a',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: '#ffffff',
              }}
            >
              Shop
            </h4>
            {[
              { label: 'New In', href: '/new-in' },
              { label: 'Shalwar Kameez', href: '/category/shalwar-kameez' },
              { label: 'Waistcoat', href: '/category/waistcoat' },
              { label: 'Prince Coat', href: '/category/prince-coat' },
              { label: 'Pent Coat', href: '/category/pent-coat' },
              { label: 'Sherwani', href: '/category/sherwani' },
              { label: 'Unstitched', href: '/category/unstitched' },
              { label: 'Accessories', href: '/category/accessories' },
              { label: 'Sale', href: '/sale' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '14px',
                  color: '#8a8a8a',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Help Column */}
          <div>
            <h4
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: '#ffffff',
              }}
            >
              Help
            </h4>
            {[
              { label: 'Size Guide', href: '/size-guide' },
              { label: 'Shipping & Returns', href: '/shipping' },
              { label: 'Care Instructions', href: '/care' },
              { label: 'Contact Us', href: '/contact' },
              { label: 'Track Your Order', href: '/track' },
              { label: 'FAQ', href: '/faq' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  display: 'block',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '14px',
                  color: '#8a8a8a',
                  textDecoration: 'none',
                  marginBottom: '10px',
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Newsletter Column */}
          <div>
            <h4
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                marginBottom: '20px',
                color: '#ffffff',
              }}
            >
              Stay in the Loop
            </h4>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '14px',
                color: '#8a8a8a',
                marginBottom: '16px',
                lineHeight: 1.7,
              }}
            >
              Subscribe to receive updates on new arrivals, special offers and exclusive collections.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  background: 'transparent',
                  border: '1px solid #3d3d3d',
                  color: '#ffffff',
                  padding: '12px 16px',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '14px',
                  outline: 'none',
                  width: '100%',
                }}
              />
              <button className="btn-white" style={{ width: '100%', textAlign: 'center' }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ borderTop: '1px solid #2d2d2d', paddingTop: '32px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '12px',
                color: '#5a5a5a',
                letterSpacing: '0.05em',
              }}
            >
              © {new Date().getFullYear()} VASTR. All rights reserved.
            </p>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '12px',
                    color: '#5a5a5a',
                    textDecoration: 'none',
                    letterSpacing: '0.05em',
                  }}
                >
                  {link}
                </a>
              ))}
            </div>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '12px',
                color: '#5a5a5a',
              }}
            >
              Made in Pakistan 🇵🇰
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
