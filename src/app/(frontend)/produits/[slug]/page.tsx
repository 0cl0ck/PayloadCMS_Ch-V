import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '@/utilities/getPayload'
import type { Product } from '@/types/product'
import ProductPageClient from './ProductPageClient'

interface ProductPageProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string): Promise<Product | null> {
  const payload = await getPayloadClient()

  try {
    const product = await payload.find({
      collection: 'products',
      where: {
        slug: {
          equals: slug,
        },
        _status: {
          equals: 'published',
        },
      },
      depth: 1,
    })

    return product.docs[0] as Product
  } catch (error) {
    console.error('Error fetching product:', error)
    return null
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProduct(slug)

  if (!product) {
    notFound()
  }

  return <ProductPageClient product={product} />
}
