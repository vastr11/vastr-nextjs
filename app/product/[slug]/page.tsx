import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { products, getProductBySlug, getProductsByCategory } from '@/lib/products';
import ProductClient from './ProductClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.name} | VASTR`,
    description: product.description,
    alternates: { canonical: `/product/${params.slug}` },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  return <ProductClient product={product} relatedProducts={relatedProducts} />;
}
