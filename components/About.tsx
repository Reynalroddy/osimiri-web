import React from "react";
import BannerImg from "@/assets/banner-kyiao0qv.png";
import Image from "next/image";
import CustomBtn from "./CustomBtn";
import { StaticImageData } from "next/image";
const About = ({
  reverse,
  img,
  number,
  title,
  text,
}: {
  reverse: boolean;
  img: string | StaticImageData;
  number: string;
  title: string;
  text: string;
}) => {
  return (
    <div
      className={`py-14 ${
        reverse ? "dark:bg-[#111111] bg-white" : "dark:bg-black bg-slate-100"
      } duration-300`}
    >
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 place-items-center">
          <div className={reverse ? "order-last" : ""} data-aos="fade-up">
            <Image
              src={img}
              height={300}
              alt=""
              className="sm:scale-125 sm:-translate-x-11 max-h-[300px] drop-shadow-[2px_10px_6px_rgba(0,0,0,0.50)] mx-auto"
            />
          </div>

          <div>
            <div className="space-y-5 sm:p-16 pb-6">
              <div data-aos="zoom-in" className="flex items-center gap-4">
                <div className="text-primary/70 text-7xl ">
                  <h1 className="font-bold">{number}</h1>
                </div>
                <div>
                  <p className="text-primary">Why Glowing stars</p>
                  <h1 className="text-2xl sm:text-4xl font-bold">{title}</h1>
                </div>
              </div>
              <p data-aos="fade-up" className="leading-8 tracking-wide">
                {text}
                {/* Ultra-Modern Facilities
We have over 200 professionally certified personal trainers and ultra-modern facilities across all our branches in Lagos, Port Harcourt, Abuja and Ibadan. */}
              </p>

              <CustomBtn
                title={" Get Started"}
                type={"outline"}
                animation="fade-up"
              ></CustomBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
