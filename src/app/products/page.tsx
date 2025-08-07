import React from "react"
import ProductCard from "@/app/products/components/ProductCard"
import Link from "next/link"

type Product = {
  id: number
  title: string
  price: number
  description: string
  images: string[]
  category: {
    id: number
    name: string
    image: string
  }
}

const LIMIT = 10

type Props = {
  searchParams?: { page?: string }
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = parseInt(searchParams?.page ?? "1", 10)
  const offset = (page - 1) * LIMIT

  const res = await fetch(`https://api.escuelajs.co/api/v1/products?offset=${offset}&limit=${LIMIT}`, { cache: "no-store" })

  if (!res.ok) {
    throw new Error("Failed to fetch products")
  }

  const products: Product[] = await res.json()
  const hasNextPage = products.length === LIMIT

  return (
    <div className='p-4'>
      <h1 className='mb-4 text-2xl font-bold'>Product List - Page {page}</h1>
      <div className='grid grid-cols-5 gap-4'>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>

      {/* Pagination */}
      <div className='mt-6 flex gap-4'>
        {page > 1 && (
          <a href={`/products?page=${page - 1}`} className='rounded border px-4 py-2 hover:bg-gray-200'>
            Previous
          </a>
        )}
        {hasNextPage && (
          <Link href={`/products?page=${page + 1}`} className='rounded border px-4 py-2 hover:bg-gray-200'>
            Next
          </Link>
        )}
      </div>
    </div>
  )
}
