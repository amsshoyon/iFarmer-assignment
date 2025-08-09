import { Product } from "@/types/productTypes"
import ProductForm from "@/app/products/components/ProductForm"

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, { cache: "no-store" })
  if (!res.ok) throw new Error("Failed to fetch product")
  return res.json()
}

export default async function EditProductPage(props: any) {
  const id = Array.isArray(props.params.id) ? props.params.id[0] : props.params.id
  const product = await getProduct(id)
  return <ProductForm initialData={product} isEdit />
}
