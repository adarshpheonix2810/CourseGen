"use client";
import React, { useContext } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserCourseListContext } from "@/app/_context/UserCourseListContext";

function AddCourse() {
  const { user } = useUser();
  const { userCourseList, setUserCourseList } = useContext(UserCourseListContext);
  return (
    <div className="flex flex-col items-center justify-center p-4 max-w-full overflow-hidden">
      <div className="mb-4 text-center w-full">
        <h2 className="text-2xl md:text-3xl text-blue-600 font-bold">
          Hello,
          <span className="font-bold text-red-600">{user?.fullName}</span>
        </h2>
        <p className="text-xs md:text-sm text-gray-700 italic">
          Create new course with Ai, Share with your friends
        </p>
      </div>
      <Link href={userCourseList>=5?'/dashboard/upgrade':'/create-course'}>
        <Button className="w-full md:w-auto py-3 text-lg">+ Create AI Course</Button>
      </Link>
    </div>
  );
}

export default AddCourse;
