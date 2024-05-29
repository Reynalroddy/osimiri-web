import React from "react";
import { Button } from "./ui/button";
import CustomBtn from "./CustomBtn";
import { useRouter } from "next/navigation";
const Hero = () => {
  const router = useRouter();

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
      id="home"
    >
      <div className="bg-white/70  dark:bg-black/80 duration-300 ">
        <div className="container min-h-[620px] flex items-center">
          <div className="w-full md:w-[550px] mx-auto text-center space-y-5">
            <p
              data-aos="fade-up"
              className="text-primary text-2xl font-semibold"
            >
              Start Your Fitness Journey
            </p>
            <h1
              data-aos="fade-up"
              data-aos-delay="300"
              className="text-5xl md:text-7xl font-bold"
            >
              Your Fitness Journey Begins!
            </h1>
            <p data-aos="fade-up" data-aos-delay="500">
              “The body achieves what the mind believes.”{" "}
            </p>
            <CustomBtn
              animation="fade-up"
              title={"Get Started"}
              onClick={() => router.push("/auth/register")}
            ></CustomBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
