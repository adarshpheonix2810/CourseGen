import React from 'react';
import AddCourse from './_components/AddCourse';
import UserCourseList from './_components/UserCourseList';
import { theme } from '../theme';

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Manage your courses and track your progress</p>
        </div>
        
        {/* Quick Actions */}
        <div className="mb-10">
          <AddCourse />
        </div>
        
        {/* Courses Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">My Courses</h2>
            <p className="text-sm text-gray-500 mt-1">All courses you've created</p>
          </div>
          <div className="p-6">
            <UserCourseList />
          </div>
        </div>
        

      </div>
    </div>
  );
}

export default Dashboard;