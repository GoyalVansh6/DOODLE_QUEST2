// import React from "react";
// import { ChevronDown } from "lucide-react";
// import { Link , useNavigate  } from "react-router-dom";
// import { useState } from "react";
// import ScreenDrawing from "./drawingPages/screenDrawing";
// import { useClerk } from "@clerk/clerk-react";



// const navItems = [
//   { name: "Stories", img: "images/stories.png", to: "/storytime" },
//   { name: "Rewards", img: "images/awards.PNG", to: "/quizreward" },
//   { name: "Parental", img: "images/parental.png", to: "/parent" },
//   {
//     name: "Home", img: "images/home.png", to: "/", special: "border-4 border-yellow-400",
//   },
//   { name: "Doodles", img: "images/sun.PNG", to: "/screendrawing" },
//   { name: "Puzzles", img: "images/puzzles.png", to: "/quiz" },
//   { name: "Logout", img: "images/logout.png", to: "/login" },];

// const Welcome2 = () => {

//     const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const { signOut } = useClerk();


//   const handleModeSelection = async (mode) => {
//     setLoading(true);
//     const userId = "child123"; // later replace with logged-in user id

//     try {
//       const res = await fetch("http://localhost:3000/api/mode/set-mode", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, mode }),
//       });

//       const data = await res.json();
//       console.log("Mode set:", data);

//       // Navigate to correct screen after successful mode set
//       if (mode === "paper") navigate("/paperdrawing");
//       else navigate("/screendrawing");
//     } catch (err) {
//       console.error("Error setting mode:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       {/* Top Navbar */}
//       <div className="w-full bg-[#1F1B2E] flex items-center justify-between px-6 py-3">
//         <h1
//           className="
//           font-[Orbitron] 
//           font-bold 
//           text-[28px]
//           bg-gradient-to-r 
//           from-[#dffcff] 
//           to-[#4da6c8] 
//           text-transparent 
//           bg-clip-text
//           mx-9
//         "
//         >
//           DoodleQuest
//         </h1>

//         <div className="flex items-center gap-2">
//           <img
//             src="images/capboy.jpg"
//             alt="Boy"
//             className="w-8 h-8 rounded-full"
//           />
//           <ChevronDown className="w-4 h-4 mr-2 text-white" />
//         </div>
//       </div>

//       <div className="">
//         {/* Navigation icons */}
//         <div className="flex justify-evenly font-orbitron font-semibold items-center py-4 w-full">
//           {navItems.map((item, index) => (
//             <Link key={index} to={item.to}>
//               <div className="flex flex-col items-center">
//                 <img
//                   className={`w-[60px] h-[60px] rounded-full object-cover ${item.special || ""}`}
//                   src={item.img}
//                   alt={item.name}
//                 />
//                 <p className="text-md mt-1">{item.name}</p>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Hero Section */}
//         <section
//           className="relative bg-[60%_60%] bg-cover min-h-[75vh] flex flex-col items-center justify-center text-center py-24"
//           style={{
//             backgroundImage: "url('images/mixed.png')",
//           }}
//         >
//           {/* Background Overlay */}
//           <div className="absolute inset-0 bg-black/40"></div>

//           {/* Hero content */}
//           <div className="relative z-10">
//             <h1 className="text-5xl md:text-8xl font-marck-script text-white mb-8">
//               Play. Doodle. Grow!
//             </h1>

// <div className="flex gap-6 font-['Roboto_Slab'] justify-center">
//   <button
//     onClick={() => handleModeSelection("paper")}
//     disabled={loading}
//     className="bg-[#F4C721] text-black font-semibold px-6 py-3 rounded-md hover:opacity-80 shadow-[4px_4px_0px_#000000]"
//   >
//     PAPER MODE
//   </button>
//  <Link to = "/ScreenDrawing" >
//   <button
//     onClick={() => handleModeSelection("screen")}
//     disabled={loading}
//     className="bg-[#F4C721] text-black font-semibold px-6 py-3 rounded-md hover:opacity-80 shadow-[4px_4px_0px_#000000]"
//   >
//     SCREEN MODE
//   </button>
//   </Link>
// </div>

//           </div>
//           <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
//             <svg
//               viewBox="0 0 1440 120"
//               preserveAspectRatio="none"
//               className="relative block w-full h-[120px]"
//             >
//               <path
//                 d="M0,64 C240,112 480,0 720,48 C960,96 1200,96 1440,64 L1440,120 L0,120 Z"
//                 fill='white' 
//               />
//             </svg>
//           </div>

//         </section>

//         {/* Introduction Section */}
//         <div className="flex  justify-center items-center gap-5 px-6 ">
//           {/* Left: Image full cover */}
//           <div className="w-3/4 flex justify-center">
//             <img
//               src="images/screen.png"
//               alt="AI Screen"
//               className="w-full h-full object-cover rounded-lg"
//             />
//           </div>

//           {/* Right: Text Box */}
//         <div className="w-1/2 h-80 p-9 rounded-2xl font-salsa bg-white border border-gray-200 shadow-[inset_0px_0px_40px_0px_rgba(0,0,0,0.3)] flex items-center">
//             <p className="text-2xl font-medium text-gray-800 text-center">
//               The AI Platform transforms doodles into interactive learning.
//               Using machine learning, it personalizes activities, rewards
//               creativity, and adapts to each child, making imagination the
//               starting point for fun, discovery, and knowledge.
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Welcome2;

import React from "react";
import { ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import ScreenDrawing from "./drawingPages/screenDrawing";
import PaperDrawing from "./drawingPages/paperDrawing";


import { useClerk } from "@clerk/clerk-react";

const navItems = [
  { name: "Stories", img: "images/stories.png", to: "/storytime" },
  { name: "Rewards", img: "images/awards.PNG", to: "/quizreward" },
  { name: "Parental", img: "images/parental.png", to: "/parent" },
  {
    name: "Home",
    img: "images/home.png",
    to: "/",
    special: "border-4 border-yellow-400",
  },
  { name: "Doodles", img: "images/sun.PNG", to: "/doddledeck" },
  { name: "Puzzles", img: "images/puzzles.png", to: "/quiz" },
  { name: "Logout", img: "images/logout.png", to: "/login" },
];

const Welcome2 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { signOut } = useClerk();

  const handleModeSelection = async (mode) => {
    setLoading(true);
    const userId = "child123"; // later replace with logged-in user id

    try {
      const res = await fetch("http://localhost:3000/api/mode/set-mode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, mode }),
      });

      const data = await res.json();
      console.log("Mode set:", data);

      if (mode === "paper") navigate("/paperdrawing");
      else navigate("/screendrawing");
    } catch (err) {
      console.error("Error setting mode:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="w-full bg-[#1F1B2E] flex items-center justify-between px-6 py-3">
        <h1
          className="
          font-[Orbitron] 
          font-bold 
          text-[28px]
          bg-gradient-to-r 
          from-[#dffcff] 
          to-[#4da6c8] 
          text-transparent 
          bg-clip-text
          mx-9
        "
        >
          DoodleQuest
        </h1>

        <div className="flex items-center gap-2">
          <img
            src="images/capboy.jpg"
            alt="Boy"
            className="w-8 h-8 rounded-full"
          />
          <ChevronDown className="w-4 h-4 mr-2 text-white" />
        </div>
      </div>

      <div className="">
        {/* Navigation icons */}
        <div className="flex justify-evenly font-orbitron font-semibold items-center py-4 w-full">
          {navItems.map((item, index) => {
            if (item.name === "Logout") {
              return (
                <div
                  key={index}
                  onClick={async () => {
                    await signOut();
                    navigate("/login");
                  }}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <img
                    className={`w-[60px] h-[60px] rounded-full object-cover ${
                      item.special || ""
                    }`}
                    src={item.img}
                    alt={item.name}
                  />
                  <p className="text-md mt-1">{item.name}</p>
                </div>
              );
            }

            return (
              <Link key={index} to={item.to}>
                <div className="flex flex-col items-center">
                  <img
                    className={`w-[60px] h-[60px] rounded-full object-cover ${
                      item.special || ""
                    }`}
                    src={item.img}
                    alt={item.name}
                  />
                  <p className="text-md mt-1">{item.name}</p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Hero Section */}
        <section
          className="relative bg-[60%_60%] bg-cover min-h-[75vh] flex flex-col items-center justify-center text-center py-24"
          style={{
            backgroundImage: "url('images/mixed.png')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>

          <div className="relative z-10">
            <h1 className="text-5xl md:text-8xl font-marck-script text-white mb-8">
              Play. Doodle. Grow!
            </h1>

<div className="flex gap-6 font-['Roboto_Slab'] justify-center">
  <Link to= "/paperdrawing">
  <button
    onClick={() => handleModeSelection("paper")}
    disabled={loading}
    className="bg-[#F4C721] text-black font-semibold px-6 py-3 rounded-md hover:opacity-80 shadow-[4px_4px_0px_#000000]"
  >
    PAPER MODE
  </button>
  </Link>
 <Link to = "/screendrawing" >
  <button
    onClick={() => handleModeSelection("screen")}
    disabled={loading}
    className="bg-[#F4C721] text-black font-semibold px-6 py-3 rounded-md hover:opacity-80 shadow-[4px_4px_0px_#000000]"
  >
    SCREEN MODE
  </button>
  </Link>
</div>
          </div>

          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
            <svg
              viewBox="0 0 1440 120"
              preserveAspectRatio="none"
              className="relative block w-full h-[120px]"
            >
              <path
                d="M0,64 C240,112 480,0 720,48 C960,96 1200,96 1440,64 L1440,120 L0,120 Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Introduction Section */}
        <div className="flex  justify-center items-center gap-5 px-6 ">
          <div className="w-3/4 flex justify-center">
            <img
              src="images/screen.png"
              alt="AI Screen"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div className="w-1/2 h-80 p-9 rounded-2xl font-salsa bg-white border border-gray-200 shadow-[inset_0px_0px_40px_0px_rgba(0,0,0,0.3)] flex items-center">
            <p className="text-2xl font-medium text-gray-800 text-center">
              The AI Platform transforms doodles into interactive learning.
              Using machine learning, it personalizes activities, rewards
              creativity, and adapts to each child, making imagination the
              starting point for fun, discovery, and knowledge.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Welcome2;

