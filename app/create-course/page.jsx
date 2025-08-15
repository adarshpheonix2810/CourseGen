"use client";
import { Button } from "@/components/ui/button";
import React, { useContext, useEffect, useState } from "react";
import {
  HiClipboardDocumentCheck,
  HiLightBulb,
  HiMiniSquares2X2,
} from "react-icons/hi2";
import SelectCategory from "./_components/SelectCategory";
import TopicDecription from "./_components/TopicDecription";
import SelectOption from "./_components/SelectOption";
import { UserInputContext } from "../_context/UserInputContext";
import { GenerateCourseLayout_AI } from "@/configs/AiModel";
import LoadingDialog from "./_components/LoadingDialog";
import { db } from "@/configs/db";
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import { CourseList } from "../../configs/schema";
import { useRouter } from "next/navigation";

function CreateCourse() {
  const StepperOptions = [
    {
      id: 1,
      name: "Category",
      icon: <HiMiniSquares2X2 />,
    },
    {
      id: 2,
      name: "Topic & Desc",
      icon: <HiLightBulb />,
    },
    {
      id: 3,
      name: "Options",
      icon: <HiClipboardDocumentCheck />,
    },
  ]
  const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);
  const [loading,setLoading]=useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [courseCount, setCourseCount] = useState(0);
  const {user}=useUser();
  const router=useRouter();
  const MAX_FREE_COURSES = 5;
  // Check course count on component mount and send notifications
  useEffect(() => {
    const checkCourseCount = async () => {
      try {
        if (user?.id) {
          const userEmail = user.primaryEmailAddress?.emailAddress;
          const userCourses = await db.select()
            .from(CourseList)
            .where(eq(CourseList.createdBy, userEmail));
          
          const currentCount = userCourses.length;
          setCourseCount(currentCount);
          
          // Send notification email when user is approaching the limit (at 80% of max)
          const warningThreshold = Math.floor(MAX_FREE_COURSES * 0.8);
          if (currentCount >= warningThreshold && currentCount < MAX_FREE_COURSES) {
            try {
              await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: userEmail,
                  courseCount: currentCount,
                  maxFreeCourses: MAX_FREE_COURSES,
                  type: 'approaching_limit'
                })
              });
            } catch (error) {
              console.error('Error sending notification email:', error);
            }
          }
          
          // Redirect to upgrade page if user has reached the limit
          if (currentCount >= MAX_FREE_COURSES) {
            try {
              await fetch('/api/notify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  email: userEmail,
                  courseCount: currentCount,
                  maxFreeCourses: MAX_FREE_COURSES,
                  type: 'limit_reached'
                })
              });
            } catch (error) {
              console.error('Error sending limit reached email:', error);
            }
            router.push('/upgrade');
          }
        }
      } catch (error) {
        console.error('Error checking course count:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkCourseCount();
  }, [user]);
  
  // Show loading state while checking course count
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }
  
  // Redirect to upgrade page if user tries to access with max courses
  if (courseCount >= MAX_FREE_COURSES) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-6xl mb-4">🎓</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Course Limit Reached</h1>
          <p className="text-gray-600 mb-6">
            You've created {courseCount} out of {MAX_FREE_COURSES} free courses.
            Upgrade your plan to create unlimited courses!
          </p>
          <div className="space-y-3">
            <Button 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              onClick={() => router.push('/upgrade')}
            >
              Upgrade Now
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => router.push('/dashboard')}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

/**used to check button statusenable or disable*/
  const checkStatus=() =>{
    if(userCourseInput?.length==0)
    {
      return true;
    }
    if (activeIndex==0 &&(userCourseInput?.category?.length==0||userCourseInput?.category==undefined))
    {
      return true;
    }
    if(activeIndex==1&&(userCourseInput?.topic?.length==0||userCourseInput?.topic==undefined)){
      return true;
    }
    else if(activeIndex==2&&(userCourseInput?.level==undefined||
      userCourseInput?.duration==undefined||
      userCourseInput?.displayVideo==undefined||
      userCourseInput?.noOfChapters==undefined)){
        return true;
      }
    return false;

    };
  
    const GenerateCourseLayout = async () => {
      setLoading(true);
      try {
        const BASIC_PROMPT = 'Generate a Course Tutorial on Following Detail with field Course Name, Description, Along with Chapter Name, About, Duration:';
        const USER_INPUT_PROMPT = 'Category:' + userCourseInput?.category + 
                                ', Topic:' + userCourseInput?.topic + 
                                ', Level:' + userCourseInput?.level + 
                                ', Duration:' + userCourseInput?.duration + 
                                ', NoOfChapters:' + userCourseInput?.noOfChapters + 
                                ', in JSON format with proper escaping for special characters.';
        const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
        
        console.log('Sending prompt to AI:', FINAL_PROMPT);
        
        const result = await GenerateCourseLayout_AI.sendMessage(FINAL_PROMPT);
        
        if (!result || !result.response) {
          throw new Error('No response received from the AI service');
        }
        
        const responseText = result.response.text();
        console.log('Raw AI response:', responseText);
        
        // Clean up the response text if needed (remove markdown code blocks)
        const cleanJson = responseText.replace(/```json|```/g, '').trim();
        console.log('Cleaned JSON:', cleanJson);
        
        const courseData = JSON.parse(cleanJson);
        console.log('Parsed course data:', courseData);
        
        await SaveCourseLayoutInDb(courseData);
      } catch (error) {
        console.error('Error generating course layout:', error);
        // Show error to user
        alert(`Failed to generate course: ${error.message}`);
      } finally {
        setLoading(false);
      }
    }

  const SaveCourseLayoutInDb = async (courseLayout) => {
    let id = uuidv4();
    setLoading(true);
    
    try {
      const values = {
        courseId: id,
        name: userCourseInput?.topic || '',
        level: userCourseInput?.level || '', // Default to 0 if undefined
        category: userCourseInput?.category,
        courseOutput: courseLayout,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName,
        userProfileImage: user?.imageUrl
      };
  
      const result = await db.insert(CourseList).values(values);
      
      console.log("Course saved successfully");
      setLoading(false);
    } catch (error) {
      console.error('Error saving course:', error);

      setLoading(false);
      
    }
    router.replace('/create-course/' + id);
  };

  return (
    <div>
      {/* Stepper */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h2 className="text-4xl text-primary font-medium">Create Course</h2>
        <div className="flex mt-10">
          {StepperOptions.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center w-[50px] md:w-[100px]">
                <div className={`bg-gray-400 p-3 rounded-full text-white
                    ${activeIndex >= index && 'bg-purple-600'}`}>
                      {item.icon}
                </div>
                <h2 className="hidden md:block md:text-sm">{item.name}</h2>
              </div>
              {index != StepperOptions?.length - 1 && (
                <div
                  className={`h-1 w[50px] md:w-[100px] rounded-full lg:w-[170px] bg-gray-400
                    ${activeIndex - 1 >= index && 'bg-purple-600'}
                    `}
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 lg:px-44 mt-40">
        {/* Component */}
        {activeIndex == 0?<SelectCategory/>:
        activeIndex == 1?<TopicDecription/>:
        <SelectOption/>}
        {/* Next Previous Buttons */}

        <div className="flex justify-between mt-10">
          <Button
            disabled={activeIndex == 0}
            variant="outline"
            onClick={() => setActiveIndex(activeIndex - 1)}
          >
            Previous
          </Button>
          {activeIndex<2&&<Button disabled={checkStatus()} onClick={() => setActiveIndex(activeIndex + 1)}>Next</Button>}
          {activeIndex==2&& <Button disabled={checkStatus()} onClick={() => GenerateCourseLayout()}>Generate Course</Button>}
        </div>
      </div>
      <LoadingDialog loading={loading}/>
    </div>

  );
}

export default CreateCourse;
