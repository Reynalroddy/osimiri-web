"use client";
import About from "@/components/About";
import Classes from "@/components/Classes";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Membership from "@/components/Membership";
import Teams from "@/components/Teams";
import Testimonial from "@/components/Testimonial";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
    });
  }, []);
  return (
    <>
      <Hero />
      <div data-aos="fade-right" className="text-center">
        guyss
      </div>
    </>
  );
}
