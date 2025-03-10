import Image from "next/image";
import React from "react";
import { IoBook } from "react-icons/io5";
import { FaEllipsisVertical } from "react-icons/fa6";
import DropdownOption from "./DropdownOption";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";

function CourseCard({ course, refreshData, displayUser = false }) {
  const handleOnDelete = async () => {
    const resp = await db
      .delete(CourseList)
      .where(eq(CourseList.id, course?.id))
      .returning({ id: CourseList?.id });

    if (resp) {
      refreshData();
    }
  };

  return (
    <div className="shadow-sm rounded-lg border p-2 hover:scale-105 transition-all cursor-pointer mt-4 gap-2">
      <Link href={"/course/" + course?.courseId}>
        <Image
          src={course?.courseBanner}
          alt="Logo"
          width={300}
          height={200}
          className="w-full  h-[200px] object-cover rounded-lg"
        />
      </Link>

      <div className="p-2 ">
        <h2 className="font-medium text-lg text-blue-600 flex justify-between items-center ">
          {course?.courseOutput?.courseName}

          {!displayUser && (
            <DropdownOption handleOnDelete={() => handleOnDelete()}>
              <FaEllipsisVertical />
            </DropdownOption>
          )}
        </h2>

        <p className="text-sm text-gray-500 my-1 italic">{course?.category}</p>
        <div className="flex items-center justify-between">
          <h2 className="flex gap-2 items-center p-2 bg-blue-100 text-primary text-sm rounded-sm">
            <IoBook />
            {course?.courseOutput?.chapters?.length} Chapters
          </h2>
          <h2 className="text-sm bg-blue-200 text-primary p-2  rounded-sm ">
            {course?.level}
          </h2>
        </div>
        {displayUser && (
          <div className="flex gap-2 items-center mt-2 ">
            <Image
              src={course?.userProfileImage}
              alt="Logo"
              width={35}
              height={35}
              className="rounded-full"
            />
            <h2 className="text-sm">{course?.userName}</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseCard;
