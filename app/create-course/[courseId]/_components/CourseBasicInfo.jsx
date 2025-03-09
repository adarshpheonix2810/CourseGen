import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { IoExtensionPuzzle } from "react-icons/io5";
import EditCourseBasicInfo from "./EditCourseBasicInfo";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/configs/firebaseConfig";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";
import { db } from "@/configs/db";
import Link from "next/link";

function CourseBasicInfo({ course, refreshData, edit = true }) {
  const [selectedFile, setSelectedFile] = useState("");

  useEffect(() => {
    if (course?.courseBanner) {
      setSelectedFile(course.courseBanner);
    }
  }, [course]);

  const onFileSelected = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(URL.createObjectURL(file));

      const fileName = Date.now() + ".jpg";
      const storageRef = ref(storage, "ai-course/" + fileName);
      await uploadBytes(storageRef, file);
      console.log("Upload File Completed");

      const downloadUrl = await getDownloadURL(storageRef);
      console.log(downloadUrl);

      await db
        .update(CourseList)
        .set({ courseBanner: downloadUrl })
        .where(eq(CourseList.id, course?.id));

      refreshData(true); // Ensure UI updates after upload
    }
  };

  return (
    <div className="p-10 border rounded-xl shadow-sm mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className="font-bold text-2xl flex items-center">
            {course?.courseOutput?.courseName}
            {edit && <EditCourseBasicInfo course={course} refreshData={refreshData} />}
          </h2>
          <p className="text-sm text-gray-400 mt-3">{course?.courseOutput?.description}</p>
          <h2 className="font-medium mt-2 flex gap-2 items-center text-primary">
            <IoExtensionPuzzle />
            {course?.category}
          </h2>
          {!edit && (
            <Link href={`/course/${course?.courseId}/start`}>
              <Button className="w-full mt-5">Start</Button>
            </Link>
          )}
        </div>
        <div>
          <label htmlFor="upload-image">
            <Image
              src={selectedFile ? selectedFile : "/book.jpg"}
              alt="book"
              height={300}
              width={300}
              className="w-full rounded-xl h-[250px] object-cover cursor-pointer"
            />
          </label>
          {edit && (
            <input
              type="file"
              id="upload-image"
              className="opacity-0"
              onChange={onFileSelected}
              accept="image/*"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseBasicInfo;
