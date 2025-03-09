"use client"

import React, { useEffect, useState } from 'react'
import SideBar from './_components/SideBar'
import Header from './_components/Header'
import { UserCourseListContext } from '../_context/UserCourseListContext'

function DashboardLayout({children}) {
  const [userCourseList , setUserCourseList]=useState([]);
  const [isMounted, setIsMounted] = useState(false);

  // Check if the component is mounted on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid rendering content until the client has mounted
  }
  return (
    <UserCourseListContext.Provider value={{ userCourseList, setUserCourseList }}>
    <div>
        <div className='md:w-64 hidden md:block'>
            <SideBar/>
        </div>
        <div className='md:ml-64'>
            <Header/>
            <div className='p-10'>
          {children}
            </div>
        </div>
    </div>

    </UserCourseListContext.Provider>
  )
}

export default DashboardLayout