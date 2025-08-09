import React from "react"
import { Product } from "@/types/productTypes"
import Link from "next/link"

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/products/${product.id}`} className='w-full rounded border p-3 shadow'>
      <img src={product.images[0]} alt={product.title} className='mb-2 h-40 w-full rounded object-cover' />
      <h3 className='mb-1 text-lg font-bold'>{product.title}</h3>
      <p className='mb-2 text-sm text-gray-600'>${product.price}</p>
      <p className='line-clamp-2 text-sm text-gray-500'>{product.description}</p>
    </Link>
  )
}

export default ProductCard
