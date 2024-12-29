'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pathname = usePathname()

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <nav className="bg-white border-gray-200 absolute w-full z-1000">
            <div className="flex flex-wrap items-center justify-between w-full">
                <Link href="/" className="flex items-center" onClick={closeMenu}>
                    <Image src='/logo.png' alt='logo' width={120} height={100} className='' />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">IAD</span>
                </Link>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMenu}
                    type="button"
                    className="inline-flex mr-8 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-default"
                    aria-expanded={isMenuOpen}
                >
                    <span className="sr-only">Open main menu</span>
                    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
                    </svg>
                </button>

                {/* Popover Menu */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 w-full md:hidden bg-white shadow-lg border-t border-gray-200 z-10">
                        <ul className="font-medium flex flex-col p-4 space-y-2 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <li>
                                <Link href="/" className="block py-2 px-3 text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white" onClick={closeMenu}>
                                    Home
                                </Link>
                                {sidebarLinks.slice(1).map((item) => {
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                                    
                                    return (
                                        <Link 
                                            href={item.route} 
                                            key={item.route} 
                                            className="block py-2 px-3 text-blue-700 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
                                            onClick={closeMenu}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default MobileNav
