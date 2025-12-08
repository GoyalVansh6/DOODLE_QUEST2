// import React, { useState, useEffect } from 'react';
// import { useAuth } from '@clerk/clerk-react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Doddledeck = () => {
//   const { getToken } = useAuth();
//   const [history, setHistory] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // This function runs when the component loads
//     const fetchHistory = async () => {
//       try {
//         const token = await getToken();
//         if (!token) return;

//         // 1. Ask your backend for all history
//         const response = await axios.get(
//           'http://localhost:3000/api/storage/history',
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         // 2. Save the data in state
//         setHistory(response.data);
//       } catch (err) {
//         setError('Failed to fetch history.');
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchHistory();
//   }, [getToken]);

//   // A helper function to format the date
//   const formatDate = (dateString) => {
//     if (!dateString) return '---';
//     return new Date(dateString).toLocaleDateString();
//   };

//   // Helper variables to safely get data
//   const doodle1 = history?.doodles[0];
//   const doodle2 = history?.doodles[1];
//   const quiz1 = history?.quizzes[0];
//   const quiz2 = history?.quizzes[1];

//   return (
//     <div className="bg-[#F4EDE6] min-h-screen pb-10">
//       {/* --- Your Navbar (Unchanged) --- */}
//     <nav className="bg-[#2C2A4A] px-6 py-2 flex items-center justify-between shadow-lg text-white">
//         <img
//           src="/src/assets/doodle-quest-logo.png"
//           alt="DoodleQuest Logo"
//           className="h-12"
//         />
//         <h1 className="font-['Roboto_Slab'] text-5xl tracking-wider">
//           Doodle Deck
//         </h1>
//         <div className="flex items-center space-x-4">
//           <button className="w-16 h-16 rounded-full flex items-center justify-center p-2 hover:bg-gray-200 transition">
//             <img src="/src/assets/home-icon.png" alt="Home" />
//           </button>
//           <button className="w-16 h-16 rounded-full flex items-center justify-center p-2.5 hover:bg-orange-500 transition">
//             <img src="/src/assets/click.png" alt="Back" />
//           </button>
//         </div>
//       </nav>

//       {/* --- Dynamic Content Area --- */}
//       <div className="container m-auto mt-20 flex flex-col items-center">
//         {loading && (
//           <h2 className="text-center text-2xl font-bold">Loading...</h2>
//         )}
//         {error && (
//           <h2 className="text-center text-2xl font-bold text-red-600">
//             {error}
//           </h2>
//         )}
        
//         {/* Render the table ONLY when history is loaded */}
//         {history && (
//           <div className="grid grid-cols-[150px_300px_190px_190px_190px] ">
//             {/* === Column 1: DATE === */}
//             <div className="col1 grid grid-rows-[50px_200px_200px] text-center">
//               {/* ✅ UPDATED BG */}
//               <div className="border border-black font-bold text-center pt-2 font-robotoSlab bg-pink-200">
//                 DATE
//               </div>
//               <div className="border border-black pt-20">
//                 {formatDate(doodle1?.createdAt)}
//               </div>
//               <div className="border border-black pt-20">
//                 {formatDate(doodle2?.createdAt)}
//               </div>
//             </div>

//             {/* === Column 2: DOODLES === */}
//             <div className="col1 grid grid-rows-[50px_200px_200px]">
//               {/* ✅ UPDATED BG */}
//               <div className="border border-black font-bold text-center font-robotoslab pt-2 bg-blue-200">
//                 DOODLES
//               </div>
//               {/* ✅ UPDATED BG to white */}
//               <div className="border border-black p-4 flex items-center justify-center bg-white">
//                 {doodle1 ? (
//                   <img src={doodle1.imageUrl} alt="Doodling" className="w-full h-full object-contain"/>
//                 ) : (
//                   <p>No Doodle</p>
//                 )}
//               </div>
//               {/* ✅ UPDATED BG to white */}
//               <div className="border-black border p-4 flex items-center justify-center bg-white">
//                 {doodle2 ? (
//                   <img src={doodle2.imageUrl} alt="Doodling" className="w-full h-full object-contain" />
//                 ) : (
//                   <p>No Doodle</p>
//                 )}
//               </div>
//             </div>

//             {/* === Column 3: STORY === */}
//             <div className="col1 grid grid-rows-[50px_200px_200px]">
//               {/* ✅ UPDATED BG */}
//               <div className="border border-black font-bold text-center font-robotoSlab pt-2 bg-green-200">
//                 STORY
//               </div>
//               <div className="border border-black text-center">
//                 <div className="mt-9 ml-3 mr-3">Snow White</div>
//                 <div className="btn">
//                   <button className="pl-4 pr-4 mt-11 rounded-md border-black border text-sm bg-green-500 shadow-gray-600 shadow-md">Read Now</button>
//                 </div>
//               </div>
//               <div className="border border-black text-center">
//                 <div className="mt-9 ml-3 mr-3">Beauty and the Beast</div>
//                 <div className="btn">
//                   <button className="pl-4 pr-4 mt-16 rounded-md border-black border text-sm bg-green-500 shadow-gray-600 shadow-md">Read Now</button>
//                 </div>
//               </div>
//             </div>

//             {/* === Column 4: QUIZ === */}
//             <div className="col1 grid grid-rows-[50px_200px_200px]">
//               {/* ✅ UPDATED BG */}
//               <div className="border border-black font-bold text-center pt-2 font-robotoSlab bg-yellow-200">
//                 QUIZ
//               </div>
//               <div className="border border-black p-6 text-center">
//                 {quiz1 ? (
//                   <>
//                     <div className="text-3xl mt-6">
//                       {quiz1.score}/{quiz1.totalQuestions}
//                     </div>
//                     <div className="btn2">
//                       <button className="pl-4 pr-4 mt-11 rounded-md border-black border text-sm bg-[#FFA500] shadow-gray-600 shadow-md">Retake</button>
//                     </div>
//                   </>
//                 ) : (
//                   <p className="mt-6">No Quiz Taken</p>
//                 )}
//               </div>
//               <div className="border border-black p-6 text-center">
//                 {quiz2 ? (
//                   <>
//                     <div className="text-3xl mt-6">
//                       {quiz2.score}/{quiz2.totalQuestions}
//                     </div>
//                     <div className="btn2">
//                       <button className="pl-4 pr-4 mt-11 rounded-md border-black border text-sm bg-[#FFA500] shadow-gray-600 shadow-md">Retake</button>
//                     </div>
//                   </>
//                 ) : (
//                   <p className="mt-6">No Quiz Taken</p>
//                 )}
//               </div>
//             </div>

//             {/* === Column 5: REWARDS === */}
//             <div className="col1 grid grid-rows-[50px_200px_200px]">
//               {/* ✅ UPDATED BG */}
//               <div className="border border-black font-bold text-center font-robotoSlab pt-2 bg-purple-200">
//                 REWARDS
//               </div>
//               <div className="border border-black text-center pr-7 pt-2">
//                 <img src="src/assets/reward.png" alt="" width="300" className="i" />
//               </div>
//               <div className="text-center pt-8 pl-7 border border-black">
//                 <img src="src/assets/reward1.png" alt="" width="130" />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Doddledeck;

import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";




const Doddledeck = () => {
  const { getToken } = useAuth();
  const [history, setHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const config = { headers: { Authorization: `Bearer ${token}` } };

        const historyRes = await axios.get('http://localhost:3000/api/storage/history', config);
        setHistory(historyRes.data);
        console.log(history);
      } catch (err) {
        setError('Failed to fetch data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken]);

  const formatDate = (dateString) => {
    if (!dateString) return '---';
    return new Date(dateString).toLocaleDateString();
  };

  // ✅ CALCULATE SCORE INSTANTLY (Frontend Logic)
  // 20 pts per doodle, 10 pts per quiz
  // const totalScore = history 
  //   ? (history.doodles.length * 20) + (history.quizAttempts.length * 10) 
  //   : 0;

  // // We need to determine how many rows to show based on which list is longer
  // const maxRows = history ? Math.max(history.doodles.length, history.quizAttempts.length) : 0;
  // const rows = Array.from({ length: maxRows });
const totalScore = history 
  ? ((history.doodles?.length || 0) * 20) + ((history.quizAttempts?.length || 0) * 10)
  : 0;

const maxRows = Math.max(
  history?.doodles?.length || 0,
  history?.quizAttempts?.length || 0
);

const rows = Array.from({ length: maxRows });

  return (
    <div className="bg-[#F4EDE6] min-h-screen pb-10">
      
      {/* ✅ NAVBAR (Fixed Color) */}
      <nav className="bg-[#2C2A4A] px-6 py-2 flex items-center justify-between shadow-lg text-white h-20">
        <div className="text-center font-orbitron text-xl ml-7 font-bold bg-gradient-to-r from-[#EDFFF5] to-[rgba(133,213,237,0.74)] bg-clip-text text-transparent">
            DoodleQuest
        </div>
        <div className="text-5xl font-robotoSlab">Doodle Deck</div>
        <div className="flex gap-9 ml-6">
          <Link to="/"><div className="home"><img src="/src/assets/home.png" alt="" width="40" /></div></Link>
          <div className="post"><img src="/src/assets/post.png" alt="" width="40" /></div>
        </div>
      </nav>

      {/* ✅ TOTAL SCORE HEADER */}
      <div className="container m-auto mt-10 text-center">
         <div className="inline-block bg-white px-10 py-4 rounded-full shadow-xl border-4 border-[#F4C721] transform hover:scale-105 transition">
            <h2 className="text-2xl font-bold font-robotoSlab text-[#2C2A4A]">
               🌟 Total Score: <span className="text-4xl text-[#D0021B] font-extrabold ml-2">{totalScore}</span> Points
            </h2>
         </div>
      </div>

      {/* Content Area */}
      <div className="container m-auto mt-14 flex flex-col items-center px-4">
        {loading && <h2 className="text-center text-2xl font-bold">Loading...</h2>}
        {error && <h2 className="text-center text-2xl font-bold text-red-600">{error}</h2>}
        
        {history && (
          <div className="w-full max-w-7xl bg-white shadow-2xl rounded-lg overflow-hidden border border-black">
            
            {/* ✅ ONE SINGLE HEADER ROW */}
            <div className="grid grid-cols-5 text-center border-b border-black">
                <div className="py-4 font-bold font-robotoSlab bg-pink-200 border-r border-black">DATE</div>
                <div className="py-4 font-bold font-robotoslab bg-blue-200 border-r border-black">DOODLES</div>
                <div className="py-4 font-bold font-robotoSlab bg-green-200 border-r border-black">STORY</div>
                <div className="py-4 font-bold font-robotoSlab bg-yellow-200 border-r border-black">QUIZ</div>
                <div className="py-4 font-bold font-robotoSlab bg-purple-200">POINTS</div>
            </div>

            {/* ✅ DYNAMIC ROWS LOOP */}
            {history?.doodles && history.stories && history.quizAttempts && (
            history.doodles.map((doodle, index) => {
                // const doodle = history.doodles[index];
                // const quiz = history.quizzes[index];
                  const story = history.stories.find(s => s.doodleId === doodle._id);
                 const quiz = history.quizzes.find(q => q.doodleId === doodle._id);
                const quizAttempts = history.quizAttempts.find(a => a.doodleId === doodle._id);
                
                // Calculate points for THIS SPECIFIC row
                const rowPoints = (doodle ? 20 : 0) + (quiz ? 10 : 0);

                return (
                  <div key={doodle._id} className="grid grid-cols-5 text-center border-b border-gray-300 last:border-0">
                    
                    {/* Col 1: DATE */}
                    <div className="border-r border-black flex items-center justify-center h-64 bg-white">
                        <span className="text-lg font-bold">
                            {formatDate(doodle.createdAt)}
                        </span>
                    </div>

                    {/* Col 2: DOODLES */}
                    <div className="border-r border-black flex items-center justify-center h-64 bg-white p-4">
                        {doodle.imageUrl ? (
                            <img src={doodle.imageUrl} alt="Doodle" className="w-full h-full object-contain"/>
                        ) : (
                            <span className="text-gray-400 italic">No Doodle</span>
                        )}
                    </div>

                    {/* Col 3: STORY (Static) */}
                    <div className="border-r border-black flex flex-col items-center justify-center h-64 bg-white p-2">
                        <div className="font-bold mb-2">Story {index + 1}</div>
                        {story ? (
                            <button onClick={() => navigate(`/storytime?storyId=${story._id}`)}  className="px-4 py-1 bg-green-500 text-white text-sm rounded shadow hover:bg-green-600 transition">
                                Read Now
                            </button>
                        ) : (
                            <span className="text-gray-400 italic">No Story</span>
                        )}  
                    </div>

                    {/* Col 4: QUIZ */}
                    <div className="border-r border-black flex flex-col items-center justify-center h-64 bg-white p-2">
                      {/* <div className="text-3xl font-bold mb-2">
                        <button className="px-4 py-1 bg-green-400 text-sm rounded shadow hover:bg-yellow-500 transition">View Quiz</button>
                      </div> */}
                        <div >
                        {quizAttempts ? (
                            <>
                                <div className="text-3xl font-bold mb-2">{quizAttempts.score}/{quizAttempts.totalQuestions}</div>
                                <button onClick={() => navigate(`/quiz?quizId=${quiz._id}`)} className="px-4 py-1 bg-yellow-400 text-sm rounded shadow hover:bg-yellow-500 transition">
                                    Retake
                                </button>
                            </>
                        ) : (
                          <button onClick={() => navigate(`/quiz?quizId=${quiz._id}`)} className="px-4 py-1 bg-yellow-400 text-sm rounded shadow hover:bg-yellow-500 transition">Attempt Quiz</button>
                            // <span className="text-gray-400 italic">Attempt the Quiz first!</span>
                        )}
                        </div>
                    </div>
                    {/* {quizAttempt ? (
  <>
    <div className="border-r border-black flex flex-col items-center justify-center h-64 bg-white p-2">
      {quizAttempt.score}/{quizAttempt.totalQuestions}
    </div>
    <button>Retake</button>
  </>
) : (
  <span>No Quiz</span>
)} */}


                    {/* Col 5: POINTS */}
                    <div className="border-black flex flex-col items-center justify-center h-64 bg-white">
                        <div className="text-4xl font-extrabold text-purple-700">
                            +{rowPoints}
                        </div>
                        <div className="text-xs text-gray-500 font-bold uppercase mt-1">Earned</div>
                    </div>

                  </div>
                );
            })
            )}
        
            {/* Empty State if no data */}
            {rows.length === 0 && (
                <div className="p-10 text-center text-xl text-gray-500">
                    No history found. Start doodling to earn points!
                </div>
            )}

          </div>
        )}
      </div>
    </div>
  );
};

export default Doddledeck;