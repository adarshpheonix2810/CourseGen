CREATE TABLE "chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"chapterId" varchar NOT NULL,
	"content" json NOT NULL,
	"videoId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "courseList" (
	"id" serial PRIMARY KEY NOT NULL,
	"courseId" varchar NOT NULL,
	"name" varchar NOT NULL,
	"category" varchar NOT NULL,
	"level" varchar NOT NULL,
	"includeVideo" varchar DEFAULT 'Yes' NOT NULL,
	"courseOutput" json NOT NULL,
	"createdBy" varchar NOT NULL,
	"username" varchar,
	"userProfileImage" varchar,
	"courseBanner" varchar DEFAULT '/course-cover.svg',
	"publish" boolean DEFAULT false
);
