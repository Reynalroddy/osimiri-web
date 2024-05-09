"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import AOS from "aos";
import "aos/dist/aos.css";
const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <div
      className=" duration-300"
      style={{
        backgroundImage: `url(/hero.jpeg)`, // coming from public folder
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        width: "100%",
        height: "80%",
      }}
    >
      {/* <Image src={BannerImg} alt="" width={80} height={80} /> */}
      {/* <img src={BannerImg} /> */}
      <div className="bg-white/70  dark:bg-black/80 duration-300 ">
        <div className="container min-h-[620px] flex items-center">
          <div className="w-full md:w-[550px] mx-auto text-center space-y-5">
            <p
              data-aos="fade-left"
              className="text-primary text-2xl font-semibold"
            >
              Start Your Fitness Journey
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="400"
              className="text-5xl md:text-7xl font-bold"
            >
              Your Fitness Journey Begins!
            </h1>
            <p
              data-aos="fade-up"
              //  data-aos-delay="500"
            >
              “The body achieves what the mind believes.”{" "}
            </p>
            <Button
              data-aos="fade-up"
              data-aos-delay="700"
              className="bg-primary text-white font-semibold  text-base"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
