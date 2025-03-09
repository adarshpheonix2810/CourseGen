"use client"

import { db } from '@/configs/db'
import { Chapters, CourseList } from '@/configs/schema'
import { and, eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import ChapterListCard from './_components/ChapterListCard'
import ChapterContent from './_components/ChapterContent'

function CourseStart({ params: paramsPromise }) {
    const params = React.use(paramsPromise); // Unwrap params

    const [course, setCourse] = useState();
    const [selectedChapter, setSelectedChapter] = useState();
    const [chapterContent, setChapterContent] = useState();

    useEffect(() => {
        if (params?.courseId) {
            GetCourse();
        }
    }, [params]);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(eq(CourseList?.courseId, params?.courseId));
        setCourse(result[0]);
        GetSelectedChapterContent(0);
        
    };

    const GetSelectedChapterContent = async (chapterId) => {
        if (!course?.courseId) return; // Ensure course exists before querying

        const result = await db.select().from(Chapters)
            .where(and(eq(Chapters.chapterId, chapterId), eq(Chapters.courseId, course?.courseId)));
        setChapterContent(result[0]);
        console.log(result);
    };

    return (
        <div>
            <div className='fixed md:w-72 hidden md:block h-screen border-r shadow-sm'>
                <h2 className='font-medium text-lg bg-primary p-4 text-white'>{course?.courseOutput?.courseName}</h2>
                <div className='overflow-y-auto h-full'>
                    {course?.courseOutput?.chapters?.map((chapter, index) => (
                        <div key={index} className={`cursor-pointer hover:bg-blue-50 ${selectedChapter?.name === chapter?.chapterName && 'bg-blue-100'}`}
                            onClick={() => {
                                setSelectedChapter(chapter);
                                GetSelectedChapterContent(index);
                            }}
                        >
                            <ChapterListCard chapter={chapter} index={index} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='md:ml-72 '>
                <ChapterContent chapter={selectedChapter} content={chapterContent} />
            </div>
        </div>
    );
}

export default CourseStart;
