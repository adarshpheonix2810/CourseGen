import { UserInputContext } from "@/app/_context/UserinputContext";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";

function TopicDescription() {
  const { userCourseInput, setUserCourseInput } = useContext(UserInputContext);

  const safeInput = userCourseInput || {};

  const handleInputChange = (fieldName, value) => {
    setUserCourseInput((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <div className="mx-20 lg:mx-44">
      <div className="mt-5">
        <label htmlFor="topic">
          Write the topic for which you want to generate a course
        </label>
        <Input
          id="topic"
          placeholder="Topic"
          className="h-14 text-xl"
          value={safeInput.topic || ""}
          onChange={(e) => handleInputChange("topic", e.target.value)}
        />
      </div>
      <div className="mt-5">
        <label htmlFor="description">
          Tell us more about your course, what you want to learn (Optional)
        </label>
        <Textarea
          id="description"
          placeholder="Description"
          className="h-24 text-xl"
          value={safeInput.description || ""}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>
    </div>
  );
}

export default TopicDescription;
