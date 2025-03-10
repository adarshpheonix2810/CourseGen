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
    <Dialog className="sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
      <DialogTrigger>
        <HiPencilSquare className="ml-2 cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="p-4 md:p-6 lg:p-8 xl:p-10">
        <DialogHeader>
          <DialogTitle>Edit Chapter</DialogTitle>
          <DialogDescription>
            Make changes to the chapter details below.
          </DialogDescription>
        </DialogHeader>

        {/* Input Fields */}
        <div className="mt-3">
          <label className="block text-sm font-medium mb-2">Chapter Title</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter chapter name"
            className="w-full p-2 pl-10 text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mt-3">
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            className="h-40 w-full p-2 pl-10 text-sm border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Enter chapter description"
          />
        </div>

        {/* Dialog Footer with Button Fix */}
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button
              onClick={onUpdateHandler}
              className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditChapters;
