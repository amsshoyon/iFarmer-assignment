"use client"
import React, { useState } from "react"
import Link from "next/link"

const navMenus = [
  {
    label: "Tic-Tac-Toe",
    href: "/tik-tak-toe"
  },
  {
    label: "Product App",
    href: "/products"
  }
]

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='text-lg font-bold text-white'>
          <Link href='/'>iFarmer</Link>
        </div>
        <div className='hidden space-x-4 md:flex'>
          {navMenus.map((navItem) => (
            <Link href={navItem.href} className='text-gray-300 hover:text-white' key={navItem.label.replace(" ", "_")}>
              {navItem.label}
            </Link>
          ))}
        </div>

        <div className='md:hidden'>
          <button onClick={() => setIsOpen(!isOpen)} className='text-gray-300 hover:text-white focus:text-white focus:outline-none'>
            <svg className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
              {isOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className='mt-2 md:hidden'>
          {navMenus.map((navItem) => (
            <Link href={navItem.href} className='block px-4 py-2 text-gray-300 hover:text-white' key={navItem.label.replace(" ", "_")}>
              {navItem.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
