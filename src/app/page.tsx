import Link from "next/link"

export default function HomePage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-6'>
      <h1 className='mb-8 text-4xl font-bold text-gray-900'>iFarmer Assignment</h1>

      <div className='flex gap-6'>
        <Link
          href='/products'
          className='rounded bg-blue-600 px-6 py-3 text-white shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none'
        >
          Products List
        </Link>

        <Link
          href='/tik-tac-toe'
          className='rounded border border-blue-600 px-6 py-3 text-blue-600 shadow hover:bg-blue-50 focus:ring-4 focus:ring-blue-300 focus:outline-none'
        >
          Tik Tac Toe
        </Link>
      </div>
    </div>
  )
}
