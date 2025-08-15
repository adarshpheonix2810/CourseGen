"use client"

import { db } from '@/configs/db';
import { and, eq } from 'drizzle-orm';
import { CourseList, Chapters } from '@/configs/schema';
import { useUser } from '@clerk/nextjs';
import React, { useEffect, useState } from 'react';
import CourseBasicInfo from './_components/CourseBasicInfo';
import CourseDetail from './_components/CourseDetail';
import ChapterList from './_components/ChapterList';
import { Button } from '@/components/ui/button';
import { GenerateChapterContent_AI } from '@/configs/AiModel';
import LoadingDialog from '../_components/LoadingDialog';
import service from '@/configs/service';
import { useRouter } from 'next/navigation';

function CourseLayout({ params: paramsPromise }) {
  const { user } = useUser();
  const [params, setParams] = useState([]);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function unwrapParams() {
      const resolvedParams = await paramsPromise;
      setParams(resolvedParams);
    }
    unwrapParams();
  }, [paramsPromise]);

  useEffect(() => {
    if (params && user) {
     params && GetCourse();
    }
  }, [params, user]);

  const GetCourse = async () => {
    if (!params?.courseId) return;

    const result = await db.select().from(CourseList)
      .where(and(eq(CourseList.courseId, params?.courseId),
          eq(CourseList.createdBy, user?.primaryEmailAddress?.emailAddress))
        
      );

    setCourse(result[0]);
    console.log(result);
  };

  const GenerateChapterContent = async () => {
    setLoading(true);
    const chapters = course?.courseOutput?.chapters || [];
    
    try {
      // Process chapters sequentially to avoid overwhelming the API
      for (let index = 0; index < chapters.length; index++) {
        const chapter = chapters[index];
        const PROMPT = `Explain the concept in detail on Topic: ${course?.courseName || 'the topic'}, 
                       Chapter: ${chapter?.chapterName || 'this chapter'}, in JSON Format with a list of objects 
                       containing fields: title, description (in detail), and code (in <precode> format if applicable). 
                       Ensure valid JSON with proper escaping of special characters.`;
        
        console.log(`Generating content for chapter ${index + 1}/${chapters.length}:`, chapter?.chapterName);
        
        try {
          // Generate chapter content using AI
          const result = await GenerateChapterContent_AI.sendMessage(PROMPT);
          
          if (!result || !result.response) {
            throw new Error('No response received from the AI service');
          }
          
          const responseText = result.response.text();
          console.log('Raw AI response for chapter:', chapter?.chapterName, responseText);
          
          // Clean up the response text (remove markdown code blocks)
          const cleanJson = responseText.replace(/```json|```/g, '').trim();
          console.log('Cleaned JSON for chapter:', chapter?.chapterName, cleanJson);
          
          // Parse the JSON content
          const content = JSON.parse(cleanJson);
          console.log('Parsed content for chapter:', chapter?.chapterName, content);
          
          // Get related video (if needed)
          let videoId = '';
          try {
            const videoResponse = await service.getVideos(`${course?.courseName}: ${chapter?.chapterName}`);
            console.log('Video response for chapter:', chapter?.chapterName, videoResponse);
            videoId = videoResponse[0]?.id?.videoId || '';
          } catch (videoError) {
            console.error('Error fetching video for chapter:', chapter?.chapterName, videoError);
            // Continue without video if there's an error
          }
          
          // Save chapter to database
          await db.insert(Chapters).values({
            chapterId: index,
            courseId: course?.courseId,
            content: content,
            videoId: videoId
          });
          
          console.log(`Successfully processed chapter: ${chapter?.chapterName}`);
          
        } catch (error) {
          console.error(`Error processing chapter ${chapter?.chapterName}:`, error);
          // Continue to next chapter even if one fails
          continue;
        }
      }
      
      // Mark course as published after all chapters are processed
      await db.update(CourseList)
        .set({ publish: true })
        .where(eq(CourseList.courseId, course?.courseId));
      
      // Redirect to finish page
      router.replace(`/create-course/${course?.courseId}/finish`);
      
    } catch (error) {
      console.error('Error in GenerateChapterContent:', error);
      // Show error to user
      alert(`Failed to generate course content: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className='mt-10 px-7 md:px-20 lg:px-44'>
        <h1 className='font-bold text-center text-2xl '>Course Layout</h1>

        <LoadingDialog loading={loading}/>

        <CourseBasicInfo course={course} refreshData={()=>GetCourse()}/>

        <CourseDetail course={course}/>

        <ChapterList course={course} refreshData={() => GetCourse()} />

          <Button onClick={GenerateChapterContent} className="my-10">
            Generate Course Content
          </Button>
    </div>
  )
}

export default CourseLayout;
