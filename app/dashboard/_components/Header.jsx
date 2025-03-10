import React, { useState } from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'

import { FiAlignJustify } from "react-icons/fi";

function Header({ sidebarState, setSidebarState }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(sidebarState);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
};

  return (
    <div className='flex justify-between bg-slate-200 items-center p-5 shadow-sm'>
        <button className='md:hidden' onClick={toggleSidebar}>
            <FiAlignJustify className='text-2xl' />
        </button>
        <Image src={'/favicon_io/favicon.ico'} alt="Logo" width={40} height={40}/>
        <UserButton />
    </div>
  );
}

export default Header