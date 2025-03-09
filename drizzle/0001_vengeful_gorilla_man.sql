ALTER TABLE "chapters" ALTER COLUMN "videoId" SET DEFAULT null;--> statement-breakpoint
ALTER TABLE "chapters" ALTER COLUMN "videoId" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courseList" ALTER COLUMN "courseBanner" SET DEFAULT '/book.jpg';