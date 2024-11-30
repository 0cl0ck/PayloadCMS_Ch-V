'use client'

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { QuantitySelector } from '@/components/QuantitySelector'
import { VariantSelector } from '@/components/VariantSelector'
import type { Product, ProductVariation } from '@/types/product'
import { RichText } from '@payloadcms/richtext-lexical/react'

interface ProductPageClientProps {
  product: Product
}

function ClientQuantitySelector({ max }: { max?: number }) {
  const [quantity, setQuantity] = React.useState(1)
  return <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} max={max} />
}

function ClientVariantSelector({
  variations,
  defaultVariation,
}: {
  variations: ProductVariation[]
  defaultVariation: ProductVariation
}) {
  const [selectedVariation, setSelectedVariation] =
    React.useState<ProductVariation>(defaultVariation)

  const handleVariationChange = React.useCallback((variation: ProductVariation) => {
    setSelectedVariation(variation)
  }, [])

  return (
    <div className="space-y-4">
      <VariantSelector
        variations={variations}
        selectedVariation={selectedVariation}
        onVariationChange={handleVariationChange}
      />
      <div className="text-2xl font-bold">{selectedVariation.price}€</div>
    </div>
  )
}

export default function ProductPageClient({ product }: ProductPageClientProps) {
  const hasVariations =
    product.productType === 'variable' && product.variations && product.variations.length > 0

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
          {product.images?.[0] && (
            <Image
              src={product.images[0].url}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-lg font-semibold">Description</h3>
            <div className="mt-2">
              {product.description && <RichText data={product.description} />}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {hasVariations && product.variations ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Variantes</h3>
                <ClientVariantSelector
                  variations={product.variations}
                  defaultVariation={product.variations[0]}
                />
              </div>
            ) : (
              <div className="text-2xl font-bold">{product.price}€</div>
            )}

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">Quantité</h3>
              <ClientQuantitySelector
                max={product.productType === 'simple' ? product.stock || undefined : undefined}
              />
            </div>

            <Button size="lg" className="w-full">
              Ajouter au panier
            </Button>

            {/* Additional Info */}
            <div className="mt-8 space-y-4 border-t pt-8 text-sm text-gray-600 dark:text-gray-400">
              <p>THC : {product.thcContent}%</p>
              {product.productType === 'simple' && product.stock !== undefined && (
                <p>Stock disponible : {product.stock} unités</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
