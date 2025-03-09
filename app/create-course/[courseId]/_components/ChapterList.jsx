import React from 'react';
import { FaClock } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";
import EditChapters from './EditChapters';

function ChapterList({ course, refreshData, edit = true }) {
  const chapters = course?.courseOutput?.chapters || [];

  return (
    <div className='mt-3'>
      <h2 className='font-medium text-xl'>Chapters</h2>
      <div className='mt-2'>
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <div key={index} className='border p-5 rounded-lg mb-2 flex items-center justify-between'>
              <div className='flex gap-5 items-center'>
                <h2 className='bg-primary flex-none h-10 w-10 text-white rounded-full text-center p-2'>
                  {index + 1}
                </h2>
                <div>
                  <h2 className='font-medium text-lg'>
                    {chapter?.chapterName}
                    {edit && <EditChapters course={course} index={index} refreshData={refreshData} />}
                  </h2>
                  <p className='text-sm text-gray-500'>{chapter?.about}</p>
                  <p className='flex gap-2 text-primary items-center mt-1'>
                    <FaClock /> {chapter?.duration}
                  </p>
                </div>
              </div>
              <FaCheckCircle className='text-4xl text-gray-300 flex-none' />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No chapters available.</p>
        )}
      </div>
    </div>
  );
}

export default ChapterList;
