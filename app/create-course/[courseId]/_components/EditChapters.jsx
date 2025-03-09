import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
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
import { eq } from "drizzle-orm";
import { CourseList } from "@/configs/schema";

function EditChapters({ course, index, refreshData }) {
  const chapters = course?.courseOutput?.chapters || [];

  // Handle undefined chapter case
  const chapter = chapters[index] || {};

  const [name, setName] = useState(chapter?.chapterName || "");
  const [about, setAbout] = useState(chapter?.about || "");

  // Sync state when course updates
  useEffect(() => {
    setName(chapter?.chapterName || "");
    setAbout(chapter?.about || "");
  }, [course, index]);

  const onUpdateHandler = async () => {
    if (!chapters[index]) return;

    // Update local state
    chapters[index].chapterName = name;
    chapters[index].about = about;

    // Update database
    const result = await db
      .update(CourseList)
      .set({ courseOutput: course?.courseOutput })
      .where(eq(CourseList?.id, course?.id))
      .returning({ id: CourseList.id });

    refreshData(true);
    console.log("Update Result:", result);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <HiPencilSquare className="ml-2 cursor-pointer" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            Make changes to the chapter details below.
          </DialogDescription>
        </DialogHeader>

        {/* Input Fields */}
        <div className="mt-3">
          <label>Chapter Title</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter chapter name"
          />
        </div>

        <div className="mt-3">
          <label>Description</label>
          <Textarea
            className="h-40"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Enter chapter description"
          />
        </div>

        {/* Dialog Footer with Button Fix */}
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={onUpdateHandler}>Update</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
