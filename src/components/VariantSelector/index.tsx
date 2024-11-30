import React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import type { ProductVariation } from '@/types/product'

interface VariantSelectorProps {
  variations: ProductVariation[]
  selectedVariation: ProductVariation
  onVariationChange: (variation: ProductVariation) => void
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  variations,
  selectedVariation,
  onVariationChange,
}) => {
  return (
    <Select
      value={selectedVariation.name}
      onValueChange={(value) => {
        const variation = variations.find((v) => v.name === value)
        if (variation) {
          onVariationChange(variation)
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Sélectionnez une variante" />
      </SelectTrigger>
      <SelectContent>
        {variations.map((variation) => (
          <SelectItem key={variation.id} value={variation.name}>
            {variation.name} - {variation.price}€
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
