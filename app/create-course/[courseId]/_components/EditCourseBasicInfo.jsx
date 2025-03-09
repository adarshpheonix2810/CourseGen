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

  // ✅ Fetch data from correct structure
  useEffect(() => {
    if (course?.courseOutput) {
      setName(course.courseOutput.courseName || "");
      setDescription(course.courseOutput.description || "");
    }
  }, [course]);

  const onUpdateHandler = async () => {
    if (!course) return;

    // ✅ Update correct fields inside `courseOutput`
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
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare className="ml-2 cursor-pointer text-xl" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Course Title & Description</DialogTitle>
        </DialogHeader>
        <div className="mt-3">
          <label>Course Title</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mt-3">
          <label>Description</label>
          <Textarea
            className="h-40"
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
  );
}

export default EditCourseBasicInfo;
