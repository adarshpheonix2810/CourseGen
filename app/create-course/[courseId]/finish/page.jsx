"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { and, eq } from 'drizzle-orm';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState, use } from 'react';
import CourseBasicInfo from '../_components/CourseBasicInfo';
import { MdContentCopy } from "react-icons/md";

function FinishScreen({ params }) {
    const { user } = useUser();
    const [course, setCourse] = useState(null);
    const [copied, setCopied] = useState(false);
    const router = useRouter();

    // ✅ Unwrap `params` before using it
    const { courseId } = use(params);

    useEffect(() => {
        if (courseId && user) {
            GetCourse();
        }
    }, [courseId, user]);

    const GetCourse = async () => {
        const result = await db.select().from(CourseList)
            .where(and(eq(CourseList.courseId, courseId)),
                eq(CourseList?.createdBy, user?.primaryEmailAddress?.emailAddress));

        setCourse(result[0]);
        console.log(result);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_HOST_NAME}/course/view/${courseId}`);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Failed to copy text:", error);
        }
    };

    return (
        <div className='px-10 md:px-20 lg:px-44 my-7'>
            <h2 className='text-center font-bold text-2xl my-3 text-primary'>Congrats! Your Course is Ready</h2>

            {course && <CourseBasicInfo course={course} refreshData={() => console.log()} />}

            <h2 className='mt-3'>Course URL:</h2>
            <h2 className='text-center text-gray-400 border p-2 rounded flex gap-5 items-center'>
                {process.env.NEXT_PUBLIC_HOST_NAME}{courseId}
                <MdContentCopy
                    className={`h-5 w-5 cursor-pointer ${copied ? 'text-green-500' : 'text-primary'}`}
                    onClick={handleCopy}
                />
            </h2>
        </div>
    );
}

export default FinishScreen;
