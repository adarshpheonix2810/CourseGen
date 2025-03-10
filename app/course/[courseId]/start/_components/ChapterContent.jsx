import React from 'react'
import YouTube from 'react-youtube'

const opts = {
    height: '390',
    width: '640',
    playerVars: {
        autoplay: 0,
    },
};
import ReactMarkdown from 'react-markdown';

function ChapterContent({chapter , content}) {
    
  return (
    <div className='p-5 md:p-10 overflow-hidden'>
        <h2 className='font-medium text-2xl md:text-3xl'>{chapter?.chapterName}</h2>
        <p className='text-gray-500 text-sm md:text-base'>{chapter?.about}</p>

        <div className='flex justify-center my-6 '>        
            <YouTube
                videoId={content?.videoId}
                opts={opts}
            />
        </div>
        <div>
    {content?.content?.map((item, index) => (
        <div key={index} className='p-5 bg-sky-50 mb-3 rounded-lg '>
            <h2 className='font-medium text-lg md:text-xl'>{item?.title}</h2>
            <ReactMarkdown>{item?.description}</ReactMarkdown>
            {item?.code && (
                <div className='p-4 bg-black text-white rounded-md mt-3 '>
                    <pre>
                        <code>{item?.code}</code>
                    </pre>
                </div>
            )}
        </div>
    ))}
</div>

    </div>
  )
}

export default ChapterContent