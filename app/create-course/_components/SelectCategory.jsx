import { UserInputContext } from "../_context/UserinputContext";
import CategoryList from "@/app/_shared/CategoryList";
import Image from "next/image";
import React, { useContext } from "react";

function SelectCategory() {
  const {userCourseInput,setUserCourseInput}=useContext(UserInputContext);

  const handleCategoryChange = (category) => {
    setUserCourseInput(prev=>({
      ...prev,
      category: category,
    }))
  }
  return (
    <div className="px-10 md:px-20">
      <h2 className="my-5">Select the Course Category</h2>
      <div className="grid grid-cols-3 gap-10">
        {CategoryList.map((item, index) => (
          <div
            key={item.name}
            className={`flex flex-col p-5 border items-center rounded-xl hover:border-primary hover:bg-blue-50 cursor-pointer
            ${
              userCourseInput?.category == item.name &&
              "border-primary bg-blue-50"
            }`}
            onClick={() => handleCategoryChange(item.name)}
          >
            <Image src={item.icon } alt = 'Logo'width={50} height={50} />
            <h2>{item.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectCategory;
