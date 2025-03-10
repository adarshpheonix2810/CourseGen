import React from 'react';
import { FaClock } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import EditChapters from './EditChapters';

function ChapterList({ course, refreshData, edit = true }) {
  const chapters = course?.courseOutput?.chapters || [];

  return (
    <div className='container mx-auto p-4 mt-3 md:p-6 lg:p-8 xl:p-10'>
      <div className='mt-3 sm:mt-5 md:mt-7 lg:mt-9 xl:mt-11'>
        <h2 className='font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Chapters</h2>
        <div className='mt-2 sm:mt-3 md:mt-4 lg:mt-5 xl:mt-6'>
          {chapters.length > 0 ? (
            chapters.map((chapter, index) => (
              <div key={index} className='border p-5 rounded-lg mb-2 flex items-center justify-between sm:p-6 md:p-7 lg:p-8 xl:p-9'>
                <div className='flex gap-5 items-center sm:gap-7 md:gap-9 lg:gap-11 xl:gap-13'>
                  <h2 className='bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 xl:h-18 xl:w-18'>
                    {index + 1}
                  </h2>
                  <div>
                    <h2 className='font-medium text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl'>{chapter?.chapterName}
                      {edit && <EditChapters course={course} index={index} refreshData={refreshData} />}
                    </h2>
                    <p className='text-sm text-gray-500 sm:text-base md:text-lg lg:text-xl xl:text-2xl'>{chapter?.about}</p>
                    <p className='flex gap-2 text-primary items-center mt-1 sm:mt-2 md:mt-3 lg:mt-4 xl:mt-5'>
                      <FaClock /> {chapter?.duration}
                    </p>
                  </div>
                </div>
                <FaCheckCircle className='text-4xl text-gray-300 flex-none sm:ml-4 md:ml-6 lg:ml-8 xl:ml-10' />
              </div>
            ))
          ) : (
            <p className="text-gray-500 sm:text-base md:text-lg lg:text-xl xl:text-2xl">No chapters available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChapterList;
