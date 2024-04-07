import React from "react";
import Spline from "@splinetool/react-spline";
import { Heading, Label, SubHeading } from "../../global/Text";
import { TextButton } from "../../global/Buttons";
import { COLORS } from "../../global/Colors";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate()
  return (
    <div className="relative h-screen bg-[#0A0C2C] flex flex-col items-center justify-center">
      <div className="z-40 flex flex-col items-center mb-36">
        <Heading text="Brutus"/>
        <Label text="Let's get all students the classes that they want, whenever they want." className="mt-4"/>
        <SubHeading text="Down with Caesar. Down with antiquity."  className="mt-4"/>
        <button onClick={() => {
          navigate("/login")
        }} className="mt-4 text-text font-bold bg-white bg-opacity-50 px-8 py-4 rounded-md hover:text-primary duration-200">
          Login
        </button>
      </div>
      <div className="absolute">
        <Spline scene="https://prod.spline.design/nJnoBU827izqxHkS/scene.splinecode" />
      </div>
    </div>
  );
}

export default Landing;
