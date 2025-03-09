"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import React, { useContext, useEffect, useState } from 'react';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const context = useContext(UserCourseListContext);
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);

  // Ensure context is defined before accessing values
  const userCourseList = context?.userCourseList || [];
  const setUserCourseList = context?.setUserCourseList || (() => {});

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList?.createdBy, user.primaryEmailAddress.emailAddress));
      
      setCourseList(result);
      setUserCourseList(result);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='mt-10'>
      <h2 className='font-medium text-xl'>My AI Courses</h2>
      <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList.length > 0 ? (
          courseList.map((course, index) => (
            <CourseCard course={course} key={index} refreshData={getUserCourses} />
          ))
        ) : (
          [1, 2, 3, 4, 5].map((_, index) => (
            <div key={index} className='w-full mt-5 bg-slate-200 animate-pulse rounded-lg h-[250px]'></div>
          ))
        )}
      </div>
    </div>
  );
}

export default UserCourseList;
