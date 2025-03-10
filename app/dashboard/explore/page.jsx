"use client"

import { db } from '@/configs/db'
import { CourseList } from '@/configs/schema'
import React, { useEffect, useState } from 'react'
import CourseCard from '../_components/CourseCard';
import { Button } from '@/components/ui/button';

function Explore() {
  const [courseList, setCourseList] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    GetAllCourse();
  }, [pageIndex]);

  const GetAllCourse = async () => {
    const result = await db.select().from(CourseList)
      .limit(3)
      .offset(pageIndex * 3);

    setCourseList(result);
  };

  return (
    <div className='p-4 max-w-full overflow-hidden'>
      <h2 className='font-bold text-3xl text-blue-600'>Explore More Projects</h2>
      <p className='text-gray-700 italic'>Explore more projects built with AI by other users</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {courseList?.map((course, index) => (
          <div key={index} className='w-full'>
            <CourseCard course={course} displayUser={true} />
          </div>
        ))}
      </div>

      <div className='flex justify-between mt-5'>
        {/* Show "Prev Page" button only if pageIndex is greater than 0 */}
        {pageIndex !== 0 && <Button onClick={() => setPageIndex(pageIndex - 1)}>Prev Page</Button>}

        {/* Show "Next Page" button only if the courseList contains exactly 3 items */}
        {courseList.length === 3 && <Button onClick={() => setPageIndex(pageIndex + 1)}>Next Page</Button>}
      </div>
    </div>
  )
}

export default Explore;