"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Product } from "@/types/productTypes"

interface Category {
  id: number
  name: string
}

interface ProductFormProps {
  initialData?: Product
  isEdit?: boolean
}

export default function ProductForm({ initialData, isEdit = false }: ProductFormProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title || "")
  const [price, setPrice] = useState(initialData?.price || 0)
  const [description, setDescription] = useState(initialData?.description || "")
  const [categoryId, setCategoryId] = useState(initialData?.category?.id || 1)
  const [images, setImages] = useState(initialData?.images?.join(", ") || "")

  const [categories, setCategories] = useState<Category[]>([])
  const [loadingCategories, setLoadingCategories] = useState(true)
  const [categoryError, setCategoryError] = useState<string | null>(null)

  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true)
      setCategoryError(null)
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories")
        if (!res.ok) throw new Error("Failed to fetch categories")
        const data: Category[] = await res.json()
        setCategories(data)
        // If no category selected yet (e.g. in create mode), select first category by default
        if (!initialData && data.length > 0) {
          setCategoryId(data[0].id)
        }
      } catch (err) {
        setCategoryError((err as Error).message)
      } finally {
        setLoadingCategories(false)
      }
    }
    void fetchCategories()
  }, [initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const payload: any = {
      title,
      price,
      description,
      categoryId,
      images: images
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean)
    }

    const url = isEdit ? `https://api.escuelajs.co/api/v1/products/${initialData?.id}` : "https://api.escuelajs.co/api/v1/products/"
    const method = isEdit ? "PUT" : "POST"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (!res.ok) {
        throw new Error("Something went wrong!")
      }

      alert(isEdit ? "Product updated!" : "Product created!")
      router.push(!isEdit ? "/products" : `/products/${initialData?.id}`)
    } catch (err) {
      alert((err as Error).message || "Failed to submit form")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='mx-auto mt-10 max-w-xl space-y-6 rounded-lg bg-white p-8 shadow-md'>
      <h1 className='text-3xl font-bold text-gray-900'>{isEdit ? "Edit Product" : "Create Product"}</h1>

      <div>
        <label htmlFor='title' className='mb-2 block font-semibold text-gray-700'>
          Title
        </label>
        <input
          id='title'
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full rounded border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
          required
          disabled={submitting}
        />
      </div>

      <div>
        <label htmlFor='price' className='mb-2 block font-semibold text-gray-700'>
          Price
        </label>
        <input
          id='price'
          type='number'
          min={0}
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className='w-full rounded border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
          required
          disabled={submitting}
        />
      </div>

      <div>
        <label htmlFor='description' className='mb-2 block font-semibold text-gray-700'>
          Description
        </label>
        <textarea
          id='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full rounded border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
          rows={4}
          required
          disabled={submitting}
        />
      </div>

      <div>
        <label htmlFor='category' className='mb-2 block font-semibold text-gray-700'>
          Category
        </label>

        {loadingCategories ? (
          <p className='text-gray-500'>Loading categories...</p>
        ) : categoryError ? (
          <p className='text-red-600'>{categoryError}</p>
        ) : (
          <select
            id='category'
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className='w-full rounded border border-gray-300 px-4 py-2 text-gray-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
            disabled={submitting}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        )}
      </div>

      <div>
        <label htmlFor='images' className='mb-2 block font-semibold text-gray-700'>
          Images (comma separated URLs)
        </label>
        <input
          id='images'
          type='text'
          value={images}
          onChange={(e) => setImages(e.target.value)}
          className='w-full rounded border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none'
          placeholder='https://example.com/image1.jpg, https://example.com/image2.jpg'
          required
          disabled={submitting}
        />
      </div>

      <button
        type='submit'
        disabled={submitting || loadingCategories}
        className='w-full rounded bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400'
      >
        {submitting ? (isEdit ? "Updating..." : "Creating...") : isEdit ? "Update Product" : "Create Product"}
      </button>
    </form>
  )
}
