import React from "react";
import CustomBtn from "./CustomBtn";
import { useRouter } from "next/navigation";
// import { FaCameraRetro } from "react-icons/fa";
// import { GiNotebook } from "react-icons/gi";
// import { SlNote } from "react-icons/sl";
const skillsData = [
  {
    name: "Daily",
    price: "5,000",
    // icon: (
    //   <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />
    // ),
    link: "#",
    description: [
      "Monthly access to fitness area.",
      "Training sessions on demand.",
      "Personal trainer on demand.",
      "Live classes on demand.",
    ],
    duration: "1 day",
    aosDelay: "0",
  },

  {
    name: "biweekly",
    price: "10,000",
    // icon: (
    //   <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />
    // ),
    link: "#",
    description: [
      "Monthly access to fitness area.",
      "Training sessions on demand.",
      "Personal trainer on demand.",
      "Live classes on demand.",
    ],
    duration: "14 days",
    aosDelay: "0",
  },

  {
    name: "Monthly",
    price: "20,000",
    // icon: (
    //   <FaCameraRetro className="text-5xl text-primary group-hover:text-black duration-300" />
    // ),
    link: "#",
    description: [
      "Monthly access to fitness area.",
      "Training sessions on demand.",
      "Personal trainer on demand.",
      "Live classes on demand.",
    ],
    duration: "30 days",
    aosDelay: "0",
  },
  {
    name: "Quaterly",
    price: "60,000",
    // icon: (
    //   <GiNotebook className="text-5xl text-primary group-hover:text-black duration-300" />
    // ),
    link: "#",
    description: [
      "Monthly access to fitness area.",
      "Training sessions on demand.",
      "Personal trainer on demand.",
      "Live classes on demand.",
    ],
    duration: "90 days ",
    aosDelay: "500",
  },
  {
    name: "6 Months",
    price: "200,000",
    // icon: (
    //   <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />
    // ),
    link: "#",
    description: [
      "Monthly access to fitness area.",
      "Training sessions on demand.",
      "Personal trainer on demand.",
      "Live classes on demand.",
    ],
    duration: "12 month",
    aosDelay: "1000",
  },
  {
    name: "1 Year",
    price: "400,000",
    // icon: (
    //   <SlNote className="text-5xl text-primary group-hover:text-black duration-500" />
    // ),
    link: "#",
    description: [
      "Monthly access to fitness area.",
      "Training sessions on demand.",
      "Personal trainer on demand.",
      "Live classes on demand.",
    ],
    duration: "12 month",
    aosDelay: "1000",
  },
];
const Services = () => {
  const router = useRouter();
  return (
    <>
      <span id="member"></span>
      <div className="dark:bg-black dark:text-white py-14 sm:min-h-[600px] sm:grid sm:place-items-center">
        <div className="container">
          <div className="pb-12">
            <h1
              data-aos="fade-up"
              className="text-3xl font-bold text-center sm:text-4xl"
            >
              Our <span className="text-primary">Plans</span>
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {skillsData.map((skill, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={skill.aosDelay}
                className="card text-center space-y-3 sm:space-y-6 p-4 sm:py-16 dark:bg-[#111111] bg-gray-200   hover:bg-primary/20 dark:hover:bg-primary/50 duration-300 text-black dark:text-white rounded-lg group "
              >
                {/* <div className="grid place-items-center">{skill.icon}</div> */}
                <h1 className="text-3xl font-bold">{skill.name}</h1>
                <h1 className="text-center text-4xl font-semibold text-primary">
                  ₦{skill.price}
                </h1>

                {skill.description.map((desc) => (
                  <p>{desc}</p>
                ))}
                <p className="font-semibold text-2xl">
                  {" "}
                  Duration : {skill.duration}
                </p>
                <CustomBtn
                  title="Learn more"
                  onClick={() => router.push("/profile")}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
