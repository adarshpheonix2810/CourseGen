import React from 'react'
import { Button } from "../../components/ui/button";
import BoxReveal from "../../components/ui/box-reveal";

import { FaGithub, FaTwitter, FaReact } from 'react-icons/fa';
import { SiNotion, SiGoogleDrive } from 'react-icons/si';
import { OrbitingCircles } from '@/components/ui/orbiting-circles';
import { VscVscode } from 'react-icons/vsc';
import Link from 'next/link';

function boxfeatures() {
    return (
        <>
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Card */}
              <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-800 flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px]">
                <div className="size-full items-center justify-center overflow-hidden">
                  <BoxReveal boxColor={"#5046e6"} duration={0.5}>
                    <p className="text-[3.5rem] font-semibold text-white">
                      CourseGen<span className="text-[#5046e6]">.</span>
                    </p>
                  </BoxReveal>
                  <BoxReveal boxColor={"#5046e6"} duration={0.5} delay={0.2}>
                    <h2 className="mt-[.5rem] text-[1rem] text-white">
                      Unlimited Courses for <span className="text-[#5046e6]">Students</span>
                    </h2>
                  </BoxReveal>
                  <BoxReveal boxColor={"#5046e6"} duration={0.5} delay={0.4}>
                    <div className="mt-6">
                      <p className="text-white">
                        -&gt; 20+ free and open-source animated components built with
                        <span className="font-semibold text-[#5046e6]"> React</span>,
                        <span className="font-semibold text-[#5046e6]"> Typescript</span>,
                        <span className="font-semibold text-[#5046e6]"> Tailwind CSS</span>, and
                        <span className="font-semibold text-[#5046e6]"> Motion</span>.
                        <br />
                        -&gt; 100% open-source, and customizable.
                        <br />
                      </p>
                    </div>
                  </BoxReveal>
                  <BoxReveal boxColor={"#5046e6"} duration={0.5} delay={0.6}>
                    <Link href={'/dashboard/explore'}>
                    <Button className="mt-[1.6rem] bg-[#5046e6] hover:bg-[#4038c2]">Explore</Button>
                    </Link>
                  </BoxReveal>
                </div>
              </div>

              {/* Second Card */}
              <div className="bg-black p-6 rounded-lg shadow-lg border border-gray-800 flex items-center justify-center min-h-[300px] md:min-h-[400px]">
                <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden">
                  <OrbitingCircles iconSize={40} color="#0077B5">
                    <FaGithub color="#fb3b5e" />
                    <SiNotion color="#ffffff" />
                    <FaReact color="#22d3ee" />
                    <VscVscode color="#fcd34d" />
                    <FaTwitter color="#1DA1F2" />
                  </OrbitingCircles>
                  <OrbitingCircles iconSize={30} radius={100} reverse speed={2} color="#FEC053">
                    <FaGithub color="#e879f9" />
                    <SiNotion color="#FFFFFF" />
                    <FaReact color="#22d3ee" />
                    <VscVscode color="#1F9CF0" />
                  </OrbitingCircles>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
    );
}

export default boxfeatures