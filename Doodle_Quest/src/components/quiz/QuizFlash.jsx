import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import kidsBalloon from "../../assets/Kids in Balloon.png";
import logo from "../../assets/DoodleQuest.png";
import leaf from '../../assets/Leaf.png';
import quizdesign from '../../assets/quizdesign.png'

const QuizFlash = () => {

  const [countdown, setCountdown] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown === 0) {
      navigate("/quiz"); 
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown, navigate]);
    return (
        <div className="flex justify-center min-h-screen bg-[#A9C2E9] ">

            {/* Logo */}
            <img
                src={logo}
                alt="DoodleQuest Logo"
                className="absolute top-2 sm:top-6 left-2 sm:left-6 w-28 sm:w-52"
            />
            <div className="flex  sm:flex-row gap-5 sm:gap-0 flex-grow mt-10 sm:mt-0">
                {/* Left side (kids image) */}
                <div className="flex items-center sm:items-end w-full">
                    <img
                        src={kidsBalloon}
                        alt="Kids with Balloons"
                        className="w-72 sm:w-[68%]"
                    />
                </div>

                {/* Right side (text) */}
                <div className="flex flex-col justify-center items-center w-3/4 text-center tracking-wider sm:gap-10">
                    <h1 className="text-4xl sm:text-8xl font-robotoSlab  text-white">
                        Hey
                    </h1>
                    <h1 className="text-4xl sm:text-8xl font-robotoSlab  text-white">
                        Welcome to
                    </h1>

                    <h2 className="text-3xl sm:text-7xl font-alexandria text-gray-900">
                        QUIZ TIME
                    </h2>
                    <p className="text-2xl md:text-6xl text-white mt-6 sm:mt-16 ">
                        Starting in <span className="font-robotoSlab">{countdown}s..</span>
                    </p>
                </div>

                {/*the right side images */}
                <div className="flex justify-end items-center">
                    <img src={quizdesign} alt="design" className="h-24 sm:h-80 w-20 sm:w-64" />
                </div>
                <div className="absolute bottom-0 right-0">
                    <img src={leaf} alt="leaf" className="w:10 sm:w-28 h-10 sm:h-28" />
                </div>
            </div>
        </div>

    );
};

export default QuizFlash;
