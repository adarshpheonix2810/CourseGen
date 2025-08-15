import Image from "next/image";
import React from "react";
import { IoBook } from "react-icons/io5";
import { FaEllipsisVertical } from "react-icons/fa6";
import DropdownOption from "./DropdownOption";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseCard({ course, refreshData, displayUser = false, className = '' }) {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };

  const handleCardClick = (e) => {
    // Don't navigate if clicking on dropdown or its children
    if (e.target.closest('.dropdown-option')) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // Navigation will be handled by the Link component
  };

  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className={`bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200 group ${className}`}>
      <div className="relative">
        <Link 
          href={"/course/" + course?.courseId}
          className="block overflow-hidden rounded-t-lg"
          onClick={handleCardClick}
        >
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={course?.courseBanner || '/placeholder-course.jpg'}
              alt={course?.courseOutput?.courseName || 'Course thumbnail'}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4 text-white">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                {course?.level || 'Beginner'}
              </span>
            </div>
            <div className="absolute top-2 right-2">
              {!displayUser && (
                <div className="dropdown-option" onClick={(e) => e.stopPropagation()}>
                  <DropdownOption handleOnDelete={handleOnDelete}>
                    <div className="p-1.5 rounded-full bg-white/80 text-gray-700 hover:bg-white transition-colors cursor-pointer">
                      <FaEllipsisVertical className="w-4 h-4" />
                    </div>
                  </DropdownOption>
                </div>
              )}
            </div>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <Link 
              href={"/course/" + course?.courseId}
              className="block"
              onClick={handleCardClick}
            >
              <h3 className="font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                {course?.courseOutput?.courseName || 'Untitled Course'}
              </h3>
            </Link>
            
            <p className="mt-1 text-sm text-gray-500 line-clamp-2">
              {course?.courseOutput?.description || 'No description available'}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm text-gray-500">
            <IoBook className="w-4 h-4" />
            <span>{course?.courseOutput?.chapters?.length || 0} chapters</span>
            <span className="mx-1">•</span>
            <span>{course?.duration || 'Self-paced'}</span>
          </div>
          
          {course?.createdAt && (
            <span className="text-xs text-gray-400">
              {formatDate(course.createdAt)}
            </span>
          )}
        </div>

        {displayUser && course?.userProfileImage && (
          <div className="mt-4 pt-3 border-t border-gray-100">
            <div className="flex items-center">
              <div className="relative h-8 w-8 rounded-full overflow-hidden">
                <Image
                  src={course.userProfileImage}
                  alt={course.userName || 'Instructor'}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="ml-2">
                <p className="text-xs font-medium text-gray-900">{course.userName || 'Instructor'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
