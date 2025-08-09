"use client"

import React, { useEffect, useState } from "react"
import { Product } from "@/types/productTypes"
import SearchProduct from "@/app/products/components/SearchProduct"
import ProductCard from "@/app/products/components/ProductCard"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const LIMIT = 10

const ProductListClient: React.FC = () => {
  const searchParams = useSearchParams()
  const pageParam = searchParams.get("page")
  const page = pageParam ? parseInt(pageParam, 10) : 1
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState({ offset: ((page - 1) * LIMIT).toString(), limit: LIMIT.toString() })

  useEffect(() => {
    setParams({
      offset: ((page - 1) * LIMIT).toString(),
      limit: LIMIT.toString()
    })
  }, [page])

  useEffect(() => {
    const q = new URLSearchParams(params)
    const fetchProduct = async () => {
      try {
        setProducts([])
        setLoading(true)
        const res = await fetch(`https://api.escuelajs.co/api/v1/products?${q.toString()}`, { cache: "no-store" })
        const data = await res.json()
        setProducts(data)
      } catch (err) {
        console.error("Error fetching product:", err)
      } finally {
        setLoading(false)
      }
    }
    void fetchProduct()
  }, [params])

  const hasNextPage = products.length === LIMIT

  return (
    <div className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-lg font-bold md:text-2xl'>Product List - Page {page}</h1>
        <Link href='/products/create' className='btn rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700'>
          Add
        </Link>
      </div>
      <SearchProduct setSearchParam={(title: string) => setParams((prev) => ({ ...prev, title }))} />
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5'>
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
        {loading && [...Array(10)].map((_, i) => <div className='h-[322px] w-full animate-pulse rounded bg-gray-200' key={i} />)}
      </div>

      <div className='mt-6 flex gap-4'>
        {page > 1 && (
          <Link href={`/products?page=${page - 1}`} className='rounded border px-4 py-2 hover:bg-gray-200'>
            Previous
          </Link>
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

export default ProductListClient
