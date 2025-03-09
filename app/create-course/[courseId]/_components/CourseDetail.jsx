import React from 'react'
import { IoBarChartSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa6";
import { FaBookOpen } from "react-icons/fa";
import { IoPlayCircle } from "react-icons/io5";

function CourseDetail({ course }) {
  return (
    <div className='border p-6 rounded-xl shadow-sm  mt-3 '>
        <div className=' grid grid-cols-2 md:grid-cols-4 gap-5'>
            <div className='flex gap-2'>
                  <IoBarChartSharp  className='text-4xl text-primary'/>
                  <div>
                    <h2 className='text-xs  text-gray-500 '>Skill Level</h2>
                    <h2 className='font-medium text-lg '>{course?.level}</h2>
                  </div>
            </div>
              <div className='flex gap-2'>
                  <FaClock className='text-4xl text-primary' />
                  <div>
                      <h2 className='text-xs  text-gray-500 '>Duration</h2>
                      <h2 className='font-medium text-lg '>{course?.courseOutput?.totalDuration}</h2>
                  </div>
              </div>
              <div className='flex gap-2'>
                  <FaBookOpen className='text-4xl text-primary' />
                  <div>
                      <h2 className='text-xs  text-gray-500 '>No of Chapters</h2>
                      <h2 className='font-medium text-lg '>{course?.courseOutput?.noOfChapters}</h2>
                  </div>
              </div>
              <div className='flex gap-2'>
                  <IoPlayCircle className='text-[44px] text-primary' />
                  <div>
                      <h2 className='text-xs  text-gray-500 '>Video Included</h2>
                      <h2 className='font-medium text-lg '>{course?.includeVideo}</h2>
                  </div>
                  
              </div>
        </div>
    </div>
  )
}

export default CourseDetail