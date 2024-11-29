import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '../../utilities/cn'

interface ProductCardProps {
  id: string
  name: string
  slug: string
  imageUrl: string
  price: number | { min: number; max: number }
  productType: 'simple' | 'variable'
  className?: string
}

export const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  slug,
  imageUrl,
  price,
  productType,
  className,
}) => {
  const displayPrice = typeof price === 'number' ? `${price}€` : `À partir de ${price.min}€`

  return (
    <Link
      href={`/produits/${slug}`}
      className={cn(
        'group block overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg',
        className,
      )}
    >
      <div className="aspect-square w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          width={400}
          height={400}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-green-600">{name}</h3>
        <p className="mt-2 text-xl font-bold text-green-600">{displayPrice}</p>
      </div>
    </Link>
  )
}
