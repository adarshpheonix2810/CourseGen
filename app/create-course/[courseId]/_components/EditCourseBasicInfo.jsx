import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HiPencilSquare } from "react-icons/hi2";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { db } from "@/configs/db";
import { CourseList } from "@/configs/schema";
import { eq } from "drizzle-orm";

function EditCourseBasicInfo({ course, refreshData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // Fetch data from correct structure
  useEffect(() => {
    if (course?.courseOutput) {
      setName(course.courseOutput.courseName || "");
      setDescription(course.courseOutput.description || "");
    }
  }, [course]);

  const onUpdateHandler = async () => {
    if (!course) return;

    // Update correct fields inside `courseOutput`
    const updatedCourse = {
      ...course,
      courseOutput: {
        ...course.courseOutput,
        courseName: name,
        description: description,
      },
    };

    await db
      .update(CourseList)
      .set({ courseOutput: updatedCourse.courseOutput })
      .where(eq(CourseList.id, course?.id));

    refreshData(true);
  };

  return (
    <div className="p-5 md:p-10 border rounded-xl shadow-sm">
      <Dialog>
        <DialogTrigger>
          <HiPencilSquare className="ml-2 cursor-pointer text-xl" />
        </DialogTrigger>
        <DialogContent className="p-4 md:p-6 lg:p-8 xl:p-10">
          <DialogHeader>
            <DialogTitle>Edit Course Title & Description</DialogTitle>
          </DialogHeader>
          <div className="mt-3">
            <label className="block text-sm font-medium mb-2">Course Title</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} className="w-full" />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              className="h-40 w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button onClick={onUpdateHandler}>Update</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCourseBasicInfo;
