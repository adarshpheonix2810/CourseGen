import { boolean, integer, json, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const CourseList = pgTable('courseList', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseId').notNull(),  // ✅ Keep naming consistent
  name: varchar('name').notNull(),
  category: varchar('category').notNull(),
  level: varchar('level').notNull(),
  includeVideo: varchar('includeVideo').notNull().default('Yes'),
  courseOutput: json('courseOutput').notNull(),
  createdBy: varchar('createdBy').notNull(),
  userName: varchar('username'),
  userProfileImage: varchar('userProfileImage'),
  courseBanner: varchar('courseBanner').default('/book.jpg'),
  publish: boolean('publish').default(false)
});

export const Chapters = pgTable('chapters', {
  id: serial('id').primaryKey(),
  courseId: varchar('courseid').notNull(),  // ✅ Fixed inconsistent naming
  chapterId: varchar('chapterId').notNull(),
  content: json('content').notNull(),
  videoId: varchar('videoId').notNull()  // ✅ Allow NULL values
});
