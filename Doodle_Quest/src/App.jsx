// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import { useAuth } from "@clerk/clerk-react";

// import Login from './components/Login';
// import Signup from './components/Signup';
// import WelcomePage from './components/WelcomePage';
// import QuizFlash from "./components/quiz/QuizFlash";
// import Quiz from "./components/quiz/Quiz";
// import QuizReward from "./components/quiz/QuizReward";
// import Child from "./components/dashboards/Child";
// import Parent from "./components/dashboards/Parent";
// import Doddledeck from "./components/my doddles/Doddledeck";
// import Rewards from "./components/rewards/Rewards";
// import PaperDrawing from "./components/drawingPages/paperDrawing";
// import ScreenDrawing from "./components/drawingPages/screenDrawing";
// import Storytime from "./components/story/storytime";
// import ProtectedRoute from "./components/ProtectedRoutes";

// function App() {
//   const { isLoaded, userId } = useAuth();

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   if (!userId) {
//     return (
//       <Routes>
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/welcome" element={<WelcomePage />} />
//         <Route path="*" element={<Login />} />
//       </Routes>
//     );
//   }

//   return (
//     <Routes>
//       <Route path="/quizflash" element={<QuizFlash />} />
//       <Route path="/quiz" element={<Quiz />} />
//       <Route path="/quizreward" element={<QuizReward />} />
//       <Route path="/" element={<ProtectedRoute><Child /></ProtectedRoute>} />
//       <Route path="/parent" element={<ProtectedRoute><Parent/></ProtectedRoute>} />
//       <Route path="/doddledeck" element={<Doddledeck/>}/>
//       <Route path="/rewards" element={<Rewards/>}/>
//       <Route path="/screendrawing" element={<ScreenDrawing/>}/>
//       <Route path="/paperdrawing" element={<PaperDrawing/>}/>
//       <Route path="/storytime" element={<Storytime/>}/>
//       <Route path="/signup" element={<Signup/>}/>
//       <Route path="/login" element={<Login/>}/>
//       <Route path="/welcome" element={<WelcomePage/>}/>
//     </Routes>
//   );
// }

// export default App;


import React, { useRef, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

// Components
import Login from "./components/Login";
import Signup from "./components/Signup";
import WelcomePage from "./components/WelcomePage";
import QuizFlash from "./components/quiz/QuizFlash";
import Quiz from "./components/quiz/Quiz";
import QuizReward from "./components/quiz/QuizReward";
import Child from "./components/dashboards/Child";
import Parent from "./components/dashboards/Parent";
import Doddledeck from "./components/my doddles/Doddledeck";
import Rewards from "./components/rewards/Rewards";
import PaperDrawing from "./components/drawingPages/paperDrawing";
import ScreenDrawing from "./components/drawingPages/screenDrawing";
import Storytime from "./components/story/storytime";
import ProtectedRoute from "./components/ProtectedRoutes";

// Audio
import Tune from "./assets/audio/Tuning.mp3";


// MUSIC WRAPPER 
function MusicWrapper({ children }) {
  const audioRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const noMusicRoutes = ["/parent"]; // Add more later

    if (noMusicRoutes.includes(location.pathname)) {
      audioRef.current?.pause();
    } else {
      audioRef.current.volume = 0.5;
      audioRef.current.play().catch(() => {});
    }
  }, [location.pathname]);

  return (
    <>
      <audio ref={audioRef} src={Tune} loop preload="auto" />
      {children}
    </>
  );
}

// End 


function App() {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) return <div>Loading...</div>;

  // If NOT logged in → only show login/signup pages
  if (!userId) {
    return (
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  // If logged in → show full app + global music
  return (
    <MusicWrapper>
      <Routes>

        {/* CHILD ROUTES */}
        <Route path="/" element={<ProtectedRoute><Child /></ProtectedRoute>} />
        <Route path="/quizflash" element={<ProtectedRoute><QuizFlash /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/quizreward" element={<ProtectedRoute><QuizReward /></ProtectedRoute>} />
        <Route path="/rewards" element={<ProtectedRoute><Rewards /></ProtectedRoute>} />
        <Route path="/doddledeck" element={<ProtectedRoute><Doddledeck /></ProtectedRoute>} />
        <Route path="/screendrawing" element={<ProtectedRoute><ScreenDrawing /></ProtectedRoute>} />
        <Route path="/paperdrawing" element={<ProtectedRoute><PaperDrawing /></ProtectedRoute>} />
        <Route path="/storytime" element={<ProtectedRoute><Storytime /></ProtectedRoute>} />

        {/* PARENT ROUTE */}
        <Route path="/parent" element={<ProtectedRoute><Parent /></ProtectedRoute>} />

        {/* AUTH ROUTES (music won't play here) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<WelcomePage />} />

      </Routes>
    </MusicWrapper>
  );
}

export default App;