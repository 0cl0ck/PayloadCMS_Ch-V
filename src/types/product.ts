import { Media } from './payload'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

export interface ProductVariation {
  id: string
  name: string
  price: number
  stock: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: DefaultTypedEditorState | null
  productType: 'simple' | 'variable'
  price?: number
  stock?: number
  thcContent: number
  images: Media[]
  variations?: ProductVariation[]
  _status: 'draft' | 'published'
}
