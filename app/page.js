import Header from "./_components/Header";
import React from "react";


import Sparkle from "./_components/Sparkle";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import Logo from "./_components/logo";
import Boxfeatures from "./_components/Boxfeatures";
import Price from "./_components/Price";

export default function Home()
 {
  return (
    <div className="bg-black min-h-screen">
      
      {/* HEADER SECTION */}
      <Header />

      {/* Hero */}
      <Hero />

      {/* logo */}
      <Logo/>

      {/* Features */}
      <Features />

      {/* Boxfeatures */}
      <Boxfeatures />

      {/* Pricing */}
      <Price/>
      {/* Sparkle */}
      {/* <Sparkle/> */}
    </div>
  );
}
