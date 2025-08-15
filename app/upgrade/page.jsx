"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from 'drizzle-orm';

export default function UpgradePage() {
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [courseData, setCourseData] = useState({
    count: 0,
    totalChapters: 0,
    lastCreated: null,
    mostPopularCategory: null,
    courses: []
  });
  const [loading, setLoading] = useState(true);
  const MAX_FREE_COURSES = 5;

  useEffect(() => {
    const fetchCourseAnalytics = async () => {
      if (!isLoaded) return;
      
      try {
        const userEmail = user.primaryEmailAddress?.emailAddress;
        const userCourses = await db.select()
          .from(CourseList)
          .where(eq(CourseList.createdBy, userEmail));
        
        // Calculate analytics
        const totalChapters = userCourses.reduce((sum, course) => {
          return sum + (course.courseOutput?.chapters?.length || 0);
        }, 0);
        
        // Get most recent course
        const sortedByDate = [...userCourses].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        // Get most popular category
        const categoryCounts = userCourses.reduce((acc, course) => {
          const category = course.category || 'Uncategorized';
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        }, {});
        
        const mostPopularCategory = Object.entries(categoryCounts)
          .sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
        
        setCourseData({
          count: userCourses.length,
          totalChapters,
          lastCreated: sortedByDate[0]?.createdAt,
          mostPopularCategory,
          courses: userCourses
        });
        
      } catch (error) {
        console.error('Error fetching course analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseAnalytics();
  }, [isLoaded, user]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upgrade Your Plan</h1>
          <p className="text-xl text-gray-600 mb-6">
            You've created {courseData.count} out of {MAX_FREE_COURSES} free courses.
            Unlock unlimited course creation today!
          </p>
          
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-4 max-w-2xl mx-auto mb-6">
            <div 
              className="bg-purple-600 h-4 rounded-full transition-all duration-500"
              style={{ 
                width: `${Math.min(100, (courseData.count / MAX_FREE_COURSES) * 100)}%`,
                backgroundColor: courseData.count >= MAX_FREE_COURSES ? '#ef4444' : '#7c3aed'
              }}
            ></div>
          </div>
          
          {/* Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8 max-w-5xl mx-auto">
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Courses Created</h3>
              <p className="text-3xl font-bold text-gray-800">{courseData.count} <span className="text-sm text-gray-500">/ {MAX_FREE_COURSES}</span></p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Total Chapters</h3>
              <p className="text-3xl font-bold text-gray-800">{courseData.totalChapters}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Favorite Category</h3>
              <p className="text-xl font-bold text-gray-800 capitalize">{courseData.mostPopularCategory || 'N/A'}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
              <h3 className="text-gray-500 text-sm font-medium">Last Created</h3>
              <p className="text-gray-800">
                {courseData.lastCreated ? new Date(courseData.lastCreated).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Free</h3>
              <p className="mt-2 text-gray-600">For getting started</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">$0</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {MAX_FREE_COURSES} courses
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Unlimited courses
                </li>
                <li className="flex items-center text-gray-400">
                  <svg className="h-5 w-5 text-gray-300 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Advanced analytics
                </li>
              </ul>
              <div className="mt-8">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => router.push('/dashboard')}
                >
                  Current Plan
                </Button>
              </div>
            </div>
          </div>

          {/* Pro Plan */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-purple-600 transform scale-105">
            <div className="bg-purple-600 text-white text-center py-2">
              <span className="text-sm font-semibold">MOST POPULAR</span>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-semibold text-gray-800">Pro</h3>
              <p className="mt-2 text-gray-600">For power users</p>
              <div className="mt-6">
                <span className="text-4xl font-bold">$9</span>
                <span className="text-gray-600">/month</span>
              </div>
              <ul className="mt-6 space-y-3">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Unlimited courses
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Advanced analytics
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Priority support
                </li>
              </ul>
              <div className="mt-8">
                <Button 
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={() => {
                    // Handle upgrade logic here
                    alert('Upgrading to Pro plan!');
                  }}
                >
                  Upgrade to Pro
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="text-purple-600 hover:bg-purple-50"
          >
            ← Back to previous page
          </Button>
        </div>
      </div>
    </div>
  );
}
