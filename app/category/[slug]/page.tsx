import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { categories, getProductsByCategory, getCategoryBySlug } from '@/lib/products';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return categories.map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return { title: 'Category Not Found' };

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
    },
    alternates: {
      canonical: `/category/${params.slug}`,
    },
  };
}

const sortOptions = ['Featured', 'Price: Low to High', 'Price: High to Low', 'New In', 'Sale'];

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const products = getProductsByCategory(params.slug);

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://vastr.pk' },
      {
        '@type': 'ListItem',
        position: 2,
        name: category.name,
        item: `https://vastr.pk/category/${params.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main>
        {/* Breadcrumb */}
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '20px 32px 0',
          }}
        >
          <nav aria-label="Breadcrumb">
            <ol
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                listStyle: 'none',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '12px',
                letterSpacing: '0.08em',
                color: '#8a8a8a',
              }}
            >
              <li>
                <Link href="/" style={{ color: '#8a8a8a', textDecoration: 'none' }}>
                  Home
                </Link>
              </li>
              <li style={{ opacity: 0.5 }}>·</li>
              <li style={{ color: '#1a1a1a' }}>{category.name}</li>
            </ol>
          </nav>
        </div>

        {/* Category Header */}
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '32px 32px 0',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              marginBottom: '32px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <h1
                style={{
                  fontFamily: 'Playfair Display, Georgia, serif',
                  fontSize: 'clamp(28px, 4vw, 48px)',
                  fontWeight: 500,
                  color: '#1a1a1a',
                  lineHeight: 1.1,
                  marginBottom: '8px',
                }}
              >
                {category.name}
              </h1>
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '15px',
                  color: '#8a8a8a',
                  maxWidth: '500px',
                }}
              >
                {category.description}
              </p>
            </div>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '13px',
                color: '#8a8a8a',
                letterSpacing: '0.05em',
              }}
            >
              {products.length} products
            </p>
          </div>

          {/* Filter/Sort Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '16px 0',
              borderTop: '1px solid #e8e0d5',
              borderBottom: '1px solid #e8e0d5',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {['All', 'New In', 'Premium', 'Sale'].map((filter) => (
                <button
                  key={filter}
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '11px',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    padding: '8px 16px',
                    border: filter === 'All' ? '1px solid #1a1a1a' : '1px solid #d5cdc4',
                    background: filter === 'All' ? '#1a1a1a' : 'transparent',
                    color: filter === 'All' ? '#ffffff' : '#1a1a1a',
                    cursor: 'pointer',
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
            <select
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '12px',
                letterSpacing: '0.08em',
                padding: '8px 12px',
                border: '1px solid #d5cdc4',
                background: 'transparent',
                color: '#1a1a1a',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {sortOptions.map((opt) => (
                <option key={opt}>{opt}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            padding: '0 32px 80px',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '24px 16px',
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Related categories */}
        <div
          style={{
            backgroundColor: '#f5f0eb',
            padding: '64px 32px',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '28px',
                fontWeight: 500,
                marginBottom: '32px',
                textAlign: 'center',
              }}
            >
              You Might Also Like
            </h2>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {[
                { name: 'Shalwar Kameez', slug: 'shalwar-kameez' },
                { name: 'Waistcoat', slug: 'waistcoat' },
                { name: 'Sherwani', slug: 'sherwani' },
                { name: 'Accessories', slug: 'accessories' },
              ]
                .filter((c) => c.slug !== params.slug)
                .slice(0, 3)
                .map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`/category/${cat.slug}`}
                    className="btn-outline"
                  >
                    {cat.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
