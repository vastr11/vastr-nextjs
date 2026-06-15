# VASTR – Premium Pakistani Menswear E-Commerce

A fully functional Next.js 14 e-commerce website built for VASTR, a premium Pakistani menswear brand.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
vastr/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout with SEO metadata
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles & CSS variables
│   ├── sitemap.ts                # Auto-generated XML sitemap
│   ├── robots.ts                 # robots.txt configuration
│   ├── not-found.tsx             # 404 page
│   ├── new-in/
│   │   └── page.tsx              # New Arrivals page
│   ├── sale/
│   │   └── page.tsx              # Sale page
│   ├── cart/
│   │   └── page.tsx              # Shopping cart
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx          # Dynamic category pages
│   └── product/
│       └── [slug]/
│           └── page.tsx          # Dynamic product pages
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Sticky header with announcement bar
│   │   └── Footer.tsx            # Footer with newsletter signup
│   ├── home/
│   │   ├── HeroSection.tsx       # Hero with video placeholder
│   │   ├── CategorySection.tsx   # Shop by category carousel
│   │   ├── NewArrivalsSection.tsx # New arrivals carousel
│   │   ├── SaleSection.tsx       # Sale products grid
│   │   └── CampaignSection.tsx   # Campaign/banner section
│   └── product/
│       └── ProductCard.tsx       # Reusable product card component
│
├── lib/
│   └── products.ts               # All product data, types & helper functions
│
└── public/
    └── images/                   # Add your product images here
```

---

## 🛍️ Categories

| Category | URL | Products |
|----------|-----|----------|
| Shalwar Kameez | `/category/shalwar-kameez` | 8 |
| Waistcoat | `/category/waistcoat` | 8 |
| Prince Coat | `/category/prince-coat` | 8 |
| Pent Coat | `/category/pent-coat` | 8 |
| Sherwani | `/category/sherwani` | 8 |
| Unstitched | `/category/unstitched` | 8 |
| Accessories | `/category/accessories` | 8 |

**Total: 56 products** with individual product pages

---

## 🎨 Design System

### Colors
```css
--cream: #f5f0eb          /* Light background */
--cream-dark: #e8e0d5     /* Darker cream */
--charcoal: #1a1a1a       /* Primary text/buttons */
--muted: #8a8a8a          /* Secondary text */
--accent-red: #c41e1e     /* Sale/accent */
--gold: #b8965a           /* Premium accent */
```

### Typography
- **Display/Headings**: Playfair Display (serif)
- **Body/Nav**: Cormorant Garamond (serif)

---

## 🔍 SEO Features

- ✅ Dynamic `<title>` and `<meta description>` per page
- ✅ OpenGraph tags for social sharing
- ✅ `robots.txt` configuration
- ✅ XML sitemap (`/sitemap.xml`) — auto-generates all URLs
- ✅ Product schema markup (JSON-LD) on product pages
- ✅ Breadcrumb schema markup
- ✅ Canonical URLs
- ✅ Semantic HTML structure
- ✅ Next.js Image optimization ready
- ✅ Clean URL structure

---

## 🖼️ Adding Real Images

1. Place product images in `/public/images/`
2. Update `ProductCard.tsx` to use Next.js `<Image>` component
3. Update the `images` array in each product in `lib/products.ts`

**Recommended image format:** WebP, 3:4 aspect ratio, 800×1067px minimum

---

## 🎬 Adding Hero Video

In `components/home/HeroSection.tsx`, uncomment and update:

```jsx
<video autoPlay muted loop playsInline style={{ width:'100%', height:'100%', objectFit:'cover' }}>
  <source src="/videos/hero.mp4" type="video/mp4" />
</video>
```

Place your video file at `public/videos/hero.mp4`.

---

## 📦 Adding More Products

Edit `lib/products.ts` — add new entries to the `products` array following the `Product` type schema.

---

## 🛒 Integrating a Backend

The site is ready for backend integration. Suggested options:
- **Shopify** — Use Shopify Storefront API
- **WooCommerce** — REST API
- **Supabase / Firebase** — For custom backend
- **Stripe** — Payment processing

---

## 🌐 Deployment

**Vercel (Recommended):**
```bash
npx vercel
```

**Or build and deploy:**
```bash
npm run build
npm start
```

---

## 📝 SEO Checklist for Further Optimization

- [ ] Add Google Analytics
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google
- [ ] Add product images with descriptive alt text
- [ ] Create blog/content section for keyword targeting
- [ ] Set up structured data for organization
- [ ] Add customer reviews schema
- [ ] Configure social media meta images (OG images)
- [ ] Set up redirects for old URLs if migrating
- [ ] Monitor Core Web Vitals

---

Made with ❤️ for VASTR — Premium Pakistani Menswear
