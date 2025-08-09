import ProductListClient from "@/app/products/components/ProductListClient"
import { Suspense } from "react"

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListClient />
    </Suspense>
  )
}
