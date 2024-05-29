"use client";
import About from "@/components/About";
import Hero from "@/components/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import BannerImg from "@/assets/home2.jpeg";
import BannerImg1 from "@/assets/home1.jpeg";
import Services from "@/components/Services";
import AppStoreBanner from "@/components/AppStore";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
export default function Home() {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 800,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);
  return (
    <>
      <Hero />
      <About
        number="01"
        title=" Unique Experiences Tailored To Your Lifestyle"
        text="  Our timetable offers a wide range of low to high-intensity
                fitness programmes to suit your fitness lifestyle. There’s
                something for everyone! Enjoy a sense of belonging in a
                community that supports your fitness goals and reminds you that
                you are not alone!"
        img={BannerImg1}
        reverse={false}
      />
      <About
        number="02"
        title="Ultra-Modern Facilities"
        text=" We have variety of  professionally certified personal trainers and ultra-modern facilities in our gym center.Our core cardio classes are designed to help you reach your goal. "
        img={BannerImg}
        reverse={true}
      />
      <Services />
      <AppStoreBanner />
      <Testimonials />
      <Footer />
    </>
  );
}
