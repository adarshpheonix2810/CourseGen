ALTER TABLE "chapters" ALTER COLUMN "videoId" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "chapters" ALTER COLUMN "videoId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "chapters" ADD COLUMN "courseid" varchar NOT NULL;--> statement-breakpoint
ALTER TABLE "chapters" DROP COLUMN "courseId";