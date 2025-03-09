import { AnimatedGradientText } from '@/components/ui/animated-gradient-text'
import Link from 'next/link';
import React from 'react'
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkles } from '../../components/ui/sparkles';
import Button from '@/components/ui/Buttons';



function Hero() {
    return (
        <>
            <div className='w-full min-h-screen overflow-hidden bg-black bg-cover bg-no-repeat bg-center bg-fixed'>
                <div className="flex justify-center items-center mt-16">
                    <div className="group relative mx-auto flex items-center justify-center rounded-full px-2 py-1 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f] w-3/4 sm:w-1/2 md:w-1/3 lg:w-1/4 mt-16 ">
                        <span
                            className={cn(
                                "absolute inset-0 block  h-full w-full animate-gradient rounded-full bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]",
                            )}
                            style={{
                                WebkitMask:
                                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "destination-out",
                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                maskComposite: "subtract",
                                WebkitClipPath:
                                    "padding-box",
                            }}
                        />
                        <div className="flex items-center justify-center ">
                            <div className='animate-spin'>
                                🎉
                            </div>
                            <hr className="mx-2 h-4 w-px shrink-0 bg-neutral-500" />
                            <AnimatedGradientText className="text-sm font-medium whitespace-nowrap">
                                Introducing Course Generator
                            </AnimatedGradientText>
                            <ChevronRight
                                className="ml-1 size-4 stroke-gray-400 transition-transform
 duration-300 ease-in-out group-hover:translate-x-0.5"
                            />
                        </div>
                    </div>
                </div>
                <div className="flex items-center justify-center mt-20">
                    <h1 className="text-6xl text-center font-extrabold text-gray-400">
                        AI Course Generator
                    </h1>
                </div>
                <div className="flex items-center justify-center mt-8">
                    <h1 className="text-5xl text-transparent bg-clip-text animate-writing bg-gradient-to-r from-[#fa8cff] via-[#9182ff] to-[#0476ff]">
                        Creating
                    </h1>
                    <h1 className="text-5xl text-transparent bg-clip-text animate-writing delay-200 bg-gradient-to-r from-[#fa8cff] via-[#9182ff] to-[#0476ff]">
                        Today!
                    </h1>
                </div>
                <div className="overflow-hidden bg-black mt-10">
                    <div className="relative -mt-32 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#369eff,transparent_80%)] before:opacity-100 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] after:rounded-[100%] after:border-t after:border-[#7876c566] after:bg-zinc-900">
                        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px] "></div>
                        <Sparkles
                            density={800}
                            speed={1}
                            size={1.1}
                            color="#FFFFFF"
                            className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
                        />
                    </div>
                </div>
                <div className="flex justify-center mt-10" style={{ marginTop: '-10.5rem' }}> {/* Adjusted spacing */}
                    <Link href={'/dashboard'}>
                        <Button className="hidden mr-8 lg:block">
                            Get Started
                        </Button>
                    </Link>
                </div>
                <h1 className='text-2xl text-gray-400 mt-10 text-center'>
                    Empowering learners with customized AI-driven educational experiences.
                </h1>
            </div>
        </>
    )
}

export default Hero