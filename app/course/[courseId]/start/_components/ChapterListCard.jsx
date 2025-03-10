import React from 'react'
import { LuClock3 } from "react-icons/lu";

function ChapterListCard({chapter,index}) {
  return (
    <div className='flex flex-col p-4 items-center border-b md:flex-row lg:flex-row xl:flex-row'>
        <div>
            <h2 className='p-1 w-8 h-8 text-center bg-primary text-white rounded-full'>{index+1}</h2>
        </div>
        <div className='ml-4'>
            <h2 className='font-medium text-lg md:text-xl'>{chapter?.chapterName}</h2>
            <h2 className='flex items-center gap-2 text-sm text-primary'><LuClock3 />{chapter?.duration}</h2>
        </div>
    </div>
  )
}

export default ChapterListCard