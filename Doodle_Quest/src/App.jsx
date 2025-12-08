import React from "react";
// Change: Removed `BrowserRouter as Router` from the import
import {  BrowserRouter as Router , Routes, Route } from "react-router-dom";

// Import all your components here
import Login from './components/Login';
import Signup from './components/Signup';
import WelcomePage from './components/WelcomePage';
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

function App() {
  // Change: Removed the <Router> wrapper from here
  return (
   
      <Routes>
        <Route path="/quizflash" element={<QuizFlash />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quizreward" element={<QuizReward />} />
        <Route path="/" element={<ProtectedRoute><Child /></ProtectedRoute>} />
        {/* <Route path="/" element={<Child />} /> */}
        <Route path="/parent"  element= {<ProtectedRoute><Parent/></ProtectedRoute>}/>
        {/* <Route path="/parent" element={<Parent />} /> */}
        <Route path="/doddledeck" element ={<Doddledeck/>}/>
        <Route path="/rewards" element = {<Rewards/>}/>
        <Route path="/screendrawing" element = {<ScreenDrawing/>}/>
        <Route path="/paperdrawing" element = {<PaperDrawing/>}/>
        <Route path="/storytime" element = {<Storytime/>}/>
        <Route path="/signup" element = {<Signup/>}/>
        <Route path="/login" element = {<Login/>}/>
        <Route path="/welcome" element = {<WelcomePage/>}/>
       </Routes>
     
   
    
  );
}

export default App;
