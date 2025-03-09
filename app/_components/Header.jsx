"use client"
import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

// rfce
function Header() {
  return (
    <header className='overflow-hidden bg-black bg-cover bg-no-repeat bg-center bg-fixed  '>
      <div className="bg-gradient-to-r from-[#22D3EE] to-[#8B5CF6] p-2 flex justify-between items-center border-4 border-[#000] rounded-3xl">
        <Image src={'./name-logo-black.svg'} alt="Logo" width={50} height={50} />
        <Link href={'/dashboard'}>
          <Button className="hover:bg-slate-700 transition duration-300 ease-in-out">Get started</Button>
        </Link>
      </div>

    </header>
  )
}

export default Header
