import type { Metadata } from 'next';
// @ts-ignore
import './globals.css';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import dynamic from 'next/dynamic';

const Preloader = dynamic(() => import('@/components/ui/Preloader'), { ssr: false });

export const metadata: Metadata = {
  metadataBase: new URL('https://vastr.pk'),
  title: {
    default: 'VASTR – Premium Pakistani Menswear | Shalwar Kameez, Sherwani & More',
    template: '%s | VASTR',
  },
  description: 'Shop premium Pakistani menswear at VASTR. Discover our curated collection of Shalwar Kameez, Sherwani, Prince Coat, Pent Coat, Waistcoat and more. Free shipping on orders over Rs. 5,000.',
  keywords: ['Pakistani menswear', 'Shalwar Kameez', 'Sherwani', 'Prince Coat', 'Pent Coat', 'Waistcoat', 'Pakistani fashion', 'VASTR', 'men clothing Pakistan'],
  openGraph: {
    type: 'website',
    locale: 'en_PK',
    url: 'https://vastr.pk',
    siteName: 'VASTR',
    title: 'VASTR – Premium Pakistani Menswear',
    description: 'Discover premium Pakistani menswear. Shalwar Kameez, Sherwani, Waistcoat and more.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VASTR – Premium Pakistani Menswear',
    description: 'Discover premium Pakistani menswear. Shalwar Kameez, Sherwani, Waistcoat and more.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Preloader />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}