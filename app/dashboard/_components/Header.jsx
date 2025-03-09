import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

function Header() {
  return (
    <div className='flex justify-between bg-slate-200 items-center p-5 shadow-sm'>
      <Image src={'/favicon_io/favicon.ico'} alt="Logo" width={40} height={40}/>
      <UserButton />
    </div>
  )
}

export default Header