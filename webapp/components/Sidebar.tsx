'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '../constants'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { Button } from './ui/button'
import { logout } from '@/lib/services'
const Sidebar = () => {
    const router = useRouter()
    const pathname = usePathname()
    const handleLogout = () => {
            logout(); // Call the logout function
            router.push("/login"); // Redirect to the sign-in page after logging out
          };
  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-4'>
            <Link href="/" className='mb-12 cursor-pointer items-center gap-2 flex'>
            <Image src='/purpleback.jpg' alt='logo' width={120} height={100}/>
            <h1 className='sidebar-logo '>IAD</h1>
            </Link>
            {sidebarLinks.map((item)=>{
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)
                return (
                    <Link href={item.route} key={item.label} className={cn('sidebar-link',{
                        'bg-slate-950': isActive
                    })}>
                        <div className="relative size-6">
                        </div>
                        <p className={cn("sidebar-label",{'!text-white': isActive})}>
                            {item.label}
                        </p>
                    </Link>
                )
            })}
            <Button onClick={handleLogout} className='bg-slate-950'>Logout</Button>
        </nav>
    </section>
  )
}

export default Sidebar