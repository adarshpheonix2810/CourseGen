"use client";
import React, { useContext } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { FiPlusCircle, FiZap } from "react-icons/fi";
import { theme } from "@/app/theme";

function AddCourse() {
  const { user } = useUser();
  const { userCourseList } = useContext(UserCourseListContext);
  const canCreateCourse = userCourseList?.length < 5;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back, <span className="text-primary-600">{user?.fullName || 'Educator'}</span>!
          </h2>
          <p className="text-gray-600 mt-1">
            {canCreateCourse 
              ? "Ready to create your next amazing course?"
              : "You've reached your course limit. Upgrade to create more courses."}
          </p>
        </div>
        
        <Link 
          href={canCreateCourse ? '/create-course' : '/dashboard/upgrade'}
          className="w-full md:w-auto"
        >
          <Button 
            className={`w-full md:w-auto h-12 px-6 text-base font-medium transition-all duration-200 ${
              canCreateCourse 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
            }`}
          >
            <FiPlusCircle className="mr-2 h-5 w-5" />
            {canCreateCourse ? 'Create New Course' : 'Upgrade Plan'}
          </Button>
        </Link>
      </div>
      
      {!canCreateCourse && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start">
          <FiZap className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
          <p className="text-sm text-yellow-700">
            You've reached the free tier limit of 5 courses. Upgrade to unlock unlimited courses and advanced features.
          </p>
        </div>
      )}
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: "AI-Powered Creation",
              description: "Generate courses with AI in minutes",
              icon: "🤖"
            },
            {
              title: "Engaging Content",
              description: "Create interactive learning experiences",
              icon: "🎯"
            },
            {
              title: "Easy Sharing",
              description: "Share with students or the community",
              icon: "🚀"
            }
          ].map((feature, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
              <span className="text-2xl">{feature.icon}</span>
              <div>
                <h4 className="font-medium text-gray-900">{feature.title}</h4>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
