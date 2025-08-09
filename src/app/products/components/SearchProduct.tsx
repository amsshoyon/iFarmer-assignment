import React, { useRef } from "react"

const SearchProduct = ({ setSearchParam }: { setSearchParam: (_title: string) => void }) => {
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (debounceRef.current) clearTimeout(debounceRef.current)

    debounceRef.current = setTimeout(async () => {
      setSearchParam(value)
    }, 300)
  }

  return (
    <div>
      <input type='text' placeholder='Search products...' onChange={handleSearch} className='mb-4 w-full max-w-md rounded border p-2' />
    </div>
  )
}

export default SearchProduct
