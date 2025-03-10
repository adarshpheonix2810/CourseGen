"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiHome, HiRocketLaunch } from "react-icons/hi2";
import { GrUpgrade } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Progress } from "@/components/ui/progress";
import { useClerk } from "@clerk/clerk-react"; // Import useClerk hook

import { UserCourseListContext } from "@/app/_context/UserCourseListContext";
import { useContext, } from "react";

export default function SideBar() {
  const { userCourseList, setUserCourseList }=useContext(UserCourseListContext);  
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk(); // Use the useClerk hook to get the signOut method
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const Menu = [
    {
      id: 1,
      name: "Home",
      icon: <HiHome />,
      path: "/dashboard",
    },
    {
      id: 2,
      name: "Explore",
      icon: <HiRocketLaunch />,
      path: "/dashboard/explore",
    },
    {
      id: 3,
      name: "Upgrade",
      icon: <GrUpgrade />,
      path: "/dashboard/upgrade",
    },
    {
      id: 4,
      name: "Logout",
      icon: <BiLogOut />,
      path: "/logout",
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(); // Sign out the user
      router.push("/sign-in"); // Redirect to the sign-in page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleMenuItemClick = (path) => {
    router.push(path);
  };

  return (
    <div className={`fixed h-full w-full md:w-64 p-5 shadow-md bg-white overflow-hidden ${isSidebarOpen ? 'block' : 'hidden'}`}>
      <Image src="/name-logo-black.svg" width={50} height={50} alt="Logo" />
      <hr className="my-5" />

      <ul>
        {Menu.map((item) => (
          <li key={item.id} className="w-full">
            {item.name === "Logout" ? (
              <button
                onClick={handleLogout}
                className={`flex items-center gap-2 w-full text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg mb-3 ${
                  pathname === item.path ? "bg-gray-100 text-black" : ""
                }`}
              >
                <div className="text-2xl">{item.icon}</div>
                <h2>{item.name}</h2>
              </button>
            ) : (
              <Link href={item.path} onClick={() => handleMenuItemClick(item.path)} className="w-full">
                <div
                  className={`flex items-center gap-2 text-gray-600 p-3 cursor-pointer hover:bg-gray-100 hover:text-black rounded-lg ${
                    pathname === item.path ? "bg-gray-100 text-black" : ""
                  }`}
                >
                  <div className="text-2xl">{item.icon}</div>
                  <h2>{item.name}</h2>
                </div>
              </Link>
            )}
          </li>
        ))}
      </ul>
      <div className='absolute bottom-10 w-[80%]'>
        <Progress value={(userCourseList?.length/5)*100} />
        <h2 className='text-sm my-2 font-semibold'>{userCourseList?.length} Out of 5  Course Created</h2>
        <h2 className='text-xs text-gray-500'>Upgrade your plan for unlimited course generation</h2>
      </div>
    </div>
  );
}