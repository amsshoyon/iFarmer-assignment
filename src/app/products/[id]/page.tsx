import React from "react"
import { Product } from "@/types/productTypes"
import Link from "next/link"
import DeleteProduct from "@/app/products/[id]/DeleteProduct"

export default async function ProductPage(props: any) {
  const id = Array.isArray(props.params.id) ? props.params.id[0] : props.params.id
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { cache: "no-store" })

  if (!res.ok) throw new Error("Failed to fetch products")
  const product: Product = await res.json()

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
        <div className='flex items-start justify-center'>
          <img src={product.images?.[0] || "/placeholder.png"} alt={product.title} className='w-full max-w-md rounded-lg object-cover shadow-lg' />
        </div>

        <div>
          <h1 className='mb-4 text-3xl font-bold'>{product.title}</h1>
          <p className='mb-4 text-lg text-gray-600'>{product.category?.name}</p>
          <p className='mb-6 text-2xl font-semibold text-green-600'>${product.price}</p>
          <p className='mb-6 text-gray-700'>{product.description}</p>

          <div className='flex items-center gap-3'>
            <Link href={`/products/${product.id}/edit`} className='btn bg-green-900 text-white'>
              Edit
            </Link>
            <DeleteProduct id={product.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
