import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '../../../../utilities/getPayload'
import { ProductCard } from '../../../../components/ProductCard'
import type { Media } from '../../../../types/payload'

interface CategoryPageProps {
  params: {
    slug: string
  }
}

interface ProductCategory {
  id: string
  name: string
  slug: string
  description?: string
}

interface ProductVariation {
  name: string
  price: number
  stock: number
}

interface Product {
  id: string
  name: string
  slug: string
  productType: 'simple' | 'variable'
  price?: number
  variations?: ProductVariation[]
  images: Media[]
}

async function getCategory(slug: string) {
  const payload = await getPayloadClient()

  try {
    const category = await payload.find({
      collection: 'product-categories',
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
    })

    return category.docs[0] as ProductCategory
  } catch (error) {
    console.error('Error fetching category:', error)
    return null
  }
}

async function getCategoryProducts(categoryId: string) {
  const payload = await getPayloadClient()

  try {
    const products = await payload.find({
      collection: 'products',
      where: {
        category: {
          equals: categoryId,
        },
        _status: {
          equals: 'published',
        },
      },
      depth: 1,
    })

    return products.docs as Product[]
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params

  const category = await getCategory(slug)

  if (!category) {
    notFound()
  }

  const products = await getCategoryProducts(category.id)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-2 text-center text-4xl font-bold">{category.name}</h1>
      {category.description && (
        <p className="mb-8 text-center text-lg text-gray-600">{category.description}</p>
      )}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => {
            const price =
              product.productType === 'simple'
                ? product.price || 0
                : product.variations && product.variations.length > 0
                  ? {
                      min: Math.min(...product.variations.map((v) => v.price)),
                      max: Math.max(...product.variations.map((v) => v.price)),
                    }
                  : { min: 0, max: 0 }

            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                slug={product.slug}
                imageUrl={(product.images[0] as any).url}
                price={price}
                productType={product.productType}
              />
            )
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucun produit disponible dans cette catégorie.</p>
      )}
    </div>
  )
}
