"use client";

import { db } from '@/configs/db';
import { CourseList } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FiPlusCircle, FiChevronDown, FiX } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import CourseCard from './CourseCard';
import { UserCourseListContext } from '@/app/_context/UserCourseListContext';

// Sort options
const SORT_OPTIONS = [
  { id: 'newest', label: 'Newest First' },
  { id: 'oldest', label: 'Oldest First' },
  { id: 'name-asc', label: 'Name (A-Z)' },
  { id: 'name-desc', label: 'Name (Z-A)' },
  { id: 'chapters-asc', label: 'Chapters (Fewest First)' },
  { id: 'chapters-desc', label: 'Chapters (Most First)' },
];

// Filter options
const FILTER_OPTIONS = {
  level: [
    { id: 'all', label: 'All Levels' },
    { id: 'beginner', label: 'Beginner' },
    { id: 'intermediate', label: 'Intermediate' },
    { id: 'advanced', label: 'Advanced' },
  ],
  category: [
    { id: 'all', label: 'All Categories' },
    { id: 'programming', label: 'Programming' },
    { id: 'design', label: 'Design' },
    { id: 'business', label: 'Business' },
    { id: 'marketing', label: 'Marketing' },
    { id: 'lifestyle', label: 'Lifestyle' },
  ],
};

function UserCourseList() {
  const [courseList, setCourseList] = useState([]);
  const context = useContext(UserCourseListContext);
  const { user } = useUser();
  const [mounted, setMounted] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeSort, setActiveSort] = useState('newest');
  const [activeFilters, setActiveFilters] = useState({
    level: 'all',
    category: 'all',
  });

  // Ensure context is defined before accessing values
  const userCourseList = context?.userCourseList || [];
  const setUserCourseList = context?.setUserCourseList || (() => {});

  // Apply sorting and filtering
  const filteredAndSortedCourses = useMemo(() => {
    return [...userCourseList]
      // Apply filters
      .filter(course => {
        const matchesLevel = 
          activeFilters.level === 'all' || 
          course.level?.toLowerCase() === activeFilters.level;
        
        const matchesCategory = 
          activeFilters.category === 'all' || 
          course.category?.toLowerCase() === activeFilters.category;
        
        return matchesLevel && matchesCategory;
      })
      // Apply sorting
      .sort((a, b) => {
        switch (activeSort) {
          case 'newest':
            return new Date(b.createdAt) - new Date(a.createdAt);
          case 'oldest':
            return new Date(a.createdAt) - new Date(b.createdAt);
          case 'name-asc':
            return (a.courseOutput?.courseName || '').localeCompare(b.courseOutput?.courseName || '');
          case 'name-desc':
            return (b.courseOutput?.courseName || '').localeCompare(a.courseOutput?.courseName || '');
          case 'chapters-asc':
            return (a.courseOutput?.chapters?.length || 0) - (b.courseOutput?.chapters?.length || 0);
          case 'chapters-desc':
            return (b.courseOutput?.chapters?.length || 0) - (a.courseOutput?.chapters?.length || 0);
          default:
            return 0;
        }
      });
  }, [userCourseList, activeSort, activeFilters]);

  const handleSortChange = (sortId) => {
    setActiveSort(sortId);
    setIsSortOpen(false);
  };

  const handleFilterChange = (type, value) => {
    setActiveFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      level: 'all',
      category: 'all',
    });
  };

  const handleDeleteCourse = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      return;
    }

    try {
      // Update local state immediately for a responsive feel
      setUserCourseList(prev => prev.filter(course => course.id !== courseId));
      
      // Call API to delete the course
      const response = await fetch(`/api/course/${courseId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete course');
      }

      // Refresh the course list to ensure consistency
      await getUserCourses();
      
    } catch (error) {
      console.error('Error deleting course:', error);
      // Revert the UI if the API call fails
      await getUserCourses();
      alert('Failed to delete course. Please try again.');
    }
  };

  useEffect(() => {
    if (user) {
      getUserCourses();
    }
  }, [user]);

  const getUserCourses = async () => {
    try {
      if (!user?.primaryEmailAddress?.emailAddress) return;
      
      const result = await db
        .select()
        .from(CourseList)
        .where(eq(CourseList?.createdBy, user.primaryEmailAddress.emailAddress));
      
      setCourseList(result);
      setUserCourseList(result);
    } catch (error) {
      console.error("Error fetching user courses:", error);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Check if any filters are active
  const isFilterActive = activeFilters.level !== 'all' || activeFilters.category !== 'all';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredAndSortedCourses.length} {filteredAndSortedCourses.length === 1 ? 'course' : 'courses'} found
            {isFilterActive && ' (filtered)'}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Sort Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsSortOpen(!isSortOpen);
                if (isFilterOpen) setIsFilterOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Sort
              <FiChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isSortOpen && (
              <div className="absolute right-0 z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  {SORT_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSortChange(option.id)}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        activeSort === option.id
                          ? 'bg-gray-100 text-gray-900'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => {
                setIsFilterOpen(!isFilterOpen);
                if (isSortOpen) setIsSortOpen(false);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Filter
              <FiChevronDown className={`w-4 h-4 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isFilterOpen && (
              <div className="absolute right-0 z-10 mt-1 w-64 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="p-4 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Level</h3>
                    <div className="space-y-2">
                      {FILTER_OPTIONS.level.map((option) => (
                        <label key={option.id} className="flex items-center">
                          <input
                            type="radio"
                            name="level"
                            checked={activeFilters.level === option.id}
                            onChange={() => handleFilterChange('level', option.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Category</h3>
                    <div className="space-y-2">
                      {FILTER_OPTIONS.category.map((option) => (
                        <label key={option.id} className="flex items-center">
                          <input
                            type="radio"
                            name="category"
                            checked={activeFilters.category === option.id}
                            onChange={() => handleFilterChange('category', option.id)}
                            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {isFilterActive && (
                    <button
                      onClick={clearFilters}
                      className="w-full mt-2 px-3 py-1.5 text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center justify-center gap-1"
                    >
                      <FiX className="w-3.5 h-3.5" />
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isFilterActive && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.level !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {FILTER_OPTIONS.level.find(f => f.id === activeFilters.level)?.label}
              <button 
                onClick={() => handleFilterChange('level', 'all')}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-600 hover:bg-indigo-200"
              >
                <FiX className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
          {activeFilters.category !== 'all' && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {FILTER_OPTIONS.category.find(f => f.id === activeFilters.category)?.label}
              <button 
                onClick={() => handleFilterChange('category', 'all')}
                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-indigo-600 hover:bg-indigo-200"
              >
                <FiX className="w-2.5 h-2.5" />
              </button>
            </span>
          )}
        </div>
      )}

      {filteredAndSortedCourses.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-xl">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {isFilterActive ? 'No courses match your filters' : 'No courses yet'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {isFilterActive ? 'Try adjusting your filters' : 'Get started by creating a new course.'}
          </p>
          <div className="mt-6 space-x-3">
            {isFilterActive ? (
              <button
                onClick={clearFilters}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear filters
              </button>
            ) : (
              <Link 
                href="/create-course" 
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <FiPlusCircle className="-ml-1 mr-2 h-5 w-5" />
                New Course
              </Link>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAndSortedCourses.map((course, index) => (
            <CourseCard 
              key={index} 
              course={course}
              onDelete={handleDeleteCourse}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default UserCourseList;
