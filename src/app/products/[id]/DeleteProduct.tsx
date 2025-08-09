"use client"
import React from "react"
import { useRouter } from "next/navigation"

const DeleteProduct = ({ id }: { id: number }) => {
  const router = useRouter()

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return
    try {
      await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {
        method: "DELETE"
      })
      alert("Product deleted successfully!")
      router.push("/products")
    } catch (err) {
      console.error("Error deleting product:", err)
      alert("Failed to delete product.")
    }
  }

  return (
    <button onClick={handleDelete} className='btn bg-red-800 text-white'>
      Delete
    </button>
  )
}

export default DeleteProduct
