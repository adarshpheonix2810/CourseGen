"use client"
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '@/app/_components/Header';
import ChapterList from '@/app/create-course/[courseId]/_components/ChapterList';
import CourseBasicInfo from '@/app/create-course/[courseId]/_components/CourseBasicInfo';
import CourseDetail from '@/app/create-course/[courseId]/_components/CourseDetail';
import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { eq } from 'drizzle-orm';

function CoursePage({ params: paramsPromise }) {
    const params = React.use(paramsPromise); // Unwrapping params
    const { isLoaded, userId } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();
    
    // Prevent automatic redirects
    useEffect(() => {
        // This prevents the default Clerk redirect behavior
        if (isLoaded && !userId) {
            // User is not signed in, but we'll still show public content
            console.log('User not signed in, showing public content');
        }
    }, [isLoaded, userId]);

    useEffect(() => {
        if (params?.courseId) {
            getCourse();
        }
    }, [params?.courseId]);

    const getCourse = async () => {
        try {
            setLoading(true);
            const result = await db.select()
                .from(CourseList)
                .where(eq(CourseList.courseId, params.courseId));
                
            if (result.length === 0) {
                throw new Error('Course not found');
            }
            
            setCourse(result[0]);
        } catch (err) {
            console.error('Error fetching course:', err);
            setError(err.message || 'Failed to load course');
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Header />
                <div className="container mx-auto p-6">
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Course</h1>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => router.back()}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                            >
                                Go Back
                            </button>
                            <button
                                onClick={() => window.location.reload()}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <div className="container mx-auto p-4 md:p-8">
                {loading ? (
                    <div className="space-y-6">
                        <div className="animate-pulse">
                            <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
                            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
                            <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
                            <div className="h-48 bg-gray-200 rounded-lg"></div>
                        </div>
                    </div>
                ) : course ? (
                    <div className="space-y-8">
                        <CourseBasicInfo 
                            course={course} 
                            edit={false} 
                            refreshData={getCourse} 
                        />
                        <CourseDetail 
                            course={course} 
                            edit={false} 
                        />
                        <ChapterList 
                            course={course} 
                            edit={false} 
                        />
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default CoursePage;
