import React from 'react'
import { notFound } from 'next/navigation'
import { getPayloadClient } from '../../../utilities/getPayload'
import { ProductCategoryCard } from '../../../components/ProductCategoryCard'
import type { Media } from '../../../types/payload'

interface ProductCategory {
  id: string
  name: string
  slug: string
  image: Media
}

async function getCategories() {
  const payload = await getPayloadClient()

  try {
    const categories = await payload.find({
      collection: 'product-categories',
      sort: 'name',
      depth: 1,
    })

    return categories.docs as ProductCategory[]
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}

export default async function CategoriesPage() {
  const categories = await getCategories()

  if (!categories || categories.length === 0) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 text-center text-4xl font-bold">Catégories de Produits</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {categories.map((category) => (
          <ProductCategoryCard
            key={category.id}
            name={category.name}
            slug={category.slug}
            imageUrl={(category.image as any).url}
          />
        ))}
      </div>
    </div>
  )
}
