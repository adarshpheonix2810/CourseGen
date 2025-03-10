import { UserInputContext } from "../../_context/UserInputContext";
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
    <div className="mx-5 md:mx-20 lg:mx-44">
      <h2 className="my-5 text-lg md:text-2xl">Write the topic for which you want to generate a course</h2>
      <Input
        id="topic"
        placeholder="Topic"
        className="h-14 text-lg md:text-xl"
        value={safeInput.topic || ""}
        onChange={(e) => handleInputChange("topic", e.target.value)}
      />
      <h2 className="my-5 text-lg md:text-2xl">Tell us more about your course, what you want to learn (Optional)</h2>
      <Textarea
        id="description"
        placeholder="Description"
        className="h-24 text-lg md:text-xl"
        value={safeInput.description || ""}
        onChange={(e) => handleInputChange("description", e.target.value)}
      />
    </div>
  );
}

export default TopicDescription;
