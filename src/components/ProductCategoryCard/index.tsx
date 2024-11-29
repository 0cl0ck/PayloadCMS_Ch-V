import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '../../utilities/cn'

interface ProductCategoryCardProps {
  name: string
  slug: string
  imageUrl: string
  className?: string
}

export const ProductCategoryCard: React.FC<ProductCategoryCardProps> = ({
  name,
  slug,
  imageUrl,
  className,
}) => {
  return (
    <Link
      href={`/categories/${slug}`}
      className={cn(
        'group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg',
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="text-xl font-semibold text-white">{name}</h3>
      </div>
    </Link>
  )
}
