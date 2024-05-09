import React from "react";
import { Button } from "./ui/button";
import { BtnProps } from "@/utils/types";

const CustomBtn = ({ type = "primary", title, animation }: BtnProps) => {
  return (
    <Button
      className={`
        ${
          type === "primary"
            ? "bg-primary"
            : type === "outline"
            ? "border-2 border-primary bg-transparent hover:bg-primary/80 hover:text-black duration-500 py-2 px-6 text-primary tracking-wider"
            : ""
        } font-semibold  text-base `}
      data-aos={animation}
    >
      {title}
    </Button>
  );
};

export default CustomBtn;
