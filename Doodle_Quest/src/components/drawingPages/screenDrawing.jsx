// import React, { useRef, useEffect, useState } from "react";
// import screenBG from "../../assets/screenbg.png";
// import { useAuth } from "@clerk/clerk-react";
// import axios from "axios";
// import saveaudio from "../../assets/audio/save.wav";
// function ScreenDrawing() {
//   // --- Canvas Refs & State ---
//   const canvasRef = useRef(null);
//   const drawingState = useRef({ isDrawing: false, lastX: 0, lastY: 0 });
  
//   // --- Auth & Task State ---
//   const { getToken, userId } = useAuth();
//   const [activeTask, setActiveTask] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [loadingTasks, setLoadingTasks] = useState(true);

//   const [doodle,setDoodle]=useState("moon");
//   const [language, setLanguage] = useState("english");

//   //  Replace with actual logged-in userId or dummy one for now

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = await getToken();
//         if (!token) return;
        
//         const response = await axios.get('http://localhost:3000/api/tasks/my-tasks', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
        
//         const allTasks = response.data;
//         setTasks(allTasks);

//         //  MAPPING LOGIC: Find the first task that is NOT completed
//         // This effectively "queues" tasks. The child sees them one by one.
//         const currentTask = allTasks.find(t => t.status !== 'completed');
        
//         console.log(" Current Active Task:", currentTask); // Debug log
//         setActiveTask(currentTask || null);

//       } catch (err) {
//         console.error("Error fetching tasks:", err);
//       } finally {
//         setLoadingTasks(false);
//       }
//     };
//     fetchTasks();
//   }, [getToken]);

//   // Send canvas image to backend every 4 seconds
// const audioRef=useRef(null);

// useEffect(() => {
//   const interval = setInterval(async () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const image = await canvas.toDataURL("image/png");

//     try {
//       const res = await axios.post("http://localhost:3000/api/doodle/analyze", {
//         userId,
//         image
//       });

//       if (!res.data.isSafe) {
//         alert("Unsafe doodle detected! Clearing canvas.");
//         handleClearCanvas(); // auto clear
//       }
//     } catch (err) {
//       console.log("Doodle analysis failed:", err);
//     }
//   }, 4000);

//   return () => clearInterval(interval);
// }, []);

//   //  Automatically start and stop timer when entering/leaving screen mode
//   // AUTO REDIRECT WHEN LIMIT REACHED
// useEffect(() => {
//   if (!userId) return;

//   const eventSource = new EventSource(`http://localhost:3000/api/time/stream/${userId}`);

//   eventSource.onmessage = (event) => {
//     const data = JSON.parse(event.data);

//     console.log("SSE:", data);

//     // Update displayed time (optional)
//     if (data.timeUsed !== undefined) {
//       console.log("Time Used:", data.timeUsed);
//     }

//     // Redirect when limit reached
//     if (data.message === "LIMIT_REACHED") {
//       alert("Daily limit reached! Redirecting home.");
//       window.location.href = "/"; // go home page
//       eventSource.close();
//     }
//   };

//   eventSource.onerror = () => {
//     console.log("SSE connection error");
//     eventSource.close();
//   };

//   return () => eventSource.close();
// }, [userId]);

//   useEffect(() => {
//     if (!userId) return;
//     const startTimer = async () => {
//       try {
//         await fetch("http://localhost:3000/api/time/start", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId }),
//         });
//       } catch (err) { console.error(err); }
//     };
//     const stopTimer = async () => {
//       try {
//         await fetch("http://localhost:3000/api/time/stop", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ userId }),
//         });
//       } catch (err) { console.error(err); }
//     };
//     startTimer();
//     return () => { stopTimer(); };
//   }, [userId]);

//   // =========================================
//   // 2. TASK LOGIC (Fetch & Complete)
//   // =========================================
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const token = await getToken();
//         if (!token) return;
//         const response = await axios.get('http://localhost:3000/api/tasks/my-tasks', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setTasks(response.data);
//       } catch (err) {
//         console.error("Error fetching tasks:", err);
//       } finally {
//         setLoadingTasks(false);
//       }
//     };
//     fetchTasks();
//   }, [getToken]);

//   const handleCompleteTask = async (taskId) => {
//     try {
//       const token = await getToken();
//       await axios.put(`http://localhost:3000/api/tasks/complete/${taskId}`, {}, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
      
//       setTasks(prevTasks => 
//         prevTasks.map(task => 
//           task._id === taskId ? { ...task, status: 'completed' } : task
//         )
//       );
//       alert("Great Job 🎨");
//     } catch (err) {
//       console.error("Error completing task:", err);
//     }
//   };

//   // =========================================
//   // 3. CANVAS LOGIC (Drawing & Uploading)
//   // =========================================
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const context = canvas.getContext("2d");

//     const setCanvasSize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//       context.strokeStyle = "black";
//       context.lineWidth = 4;
//       context.lineCap = "round";
//       context.lineJoin = "round";
//     };
//     setCanvasSize();

//     const startDrawing = (e) => {
//       drawingState.current.isDrawing = true;
//       [drawingState.current.lastX, drawingState.current.lastY] = [e.offsetX, e.offsetY];
//     };
//     const stopDrawing = () => {
//       drawingState.current.isDrawing = false;
//     };
//     const draw = (e) => {
//       if (!drawingState.current.isDrawing) return;
//       context.beginPath();
//       context.moveTo(drawingState.current.lastX, drawingState.current.lastY);
//       context.lineTo(e.offsetX, e.offsetY);
//       context.stroke();
//       [drawingState.current.lastX, drawingState.current.lastY] = [e.offsetX, e.offsetY];
//     };

//     canvas.addEventListener("mousedown", startDrawing);
//     canvas.addEventListener("mouseup", stopDrawing);
//     canvas.addEventListener("mouseout", stopDrawing);
//     canvas.addEventListener("mousemove", draw);
//     window.addEventListener("resize", setCanvasSize);

//     return () => {
//       canvas.removeEventListener("mousedown", startDrawing);
//       canvas.removeEventListener("mouseup", stopDrawing);
//       canvas.removeEventListener("mouseout", stopDrawing);
//       canvas.removeEventListener("mousemove", draw);
//       window.removeEventListener("resize", setCanvasSize);
//     };
//   }, []);

//   const handleClearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");
//     context.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   // const handleSubmitDoodle = async () => {
//   //   const canvas = canvasRef.current;
//   //   if (!canvas) return;
//   //   const token = await getToken();

//   //   canvas.toBlob(async (blob) => {
//   //     if (!blob) return;
//   //     const formData = new FormData();
//   //     formData.append("doodleImage", blob, "doodle.png");
//   //     formData.append("prompt", "Screen Drawing"); 

//   //     try {
//   //       await axios.post("http://localhost:3000/api/storage/upload-doodle", formData, {
//   //         headers: {
//   //           Authorization: `Bearer ${token}`,
//   //           "Content-Type": "multipart/form-data",
//   //         },
//   //       });
//   //       alert("Your doodle was saved!");
//   //       handleClearCanvas();
//   //     } catch (error) {
//   //       console.error("Error uploading doodle:", error);
//   //       alert("Upload failed.");
//   //     }
//   //   }, "image/png");
//   // };

//   // const handleSubmitDoodle = async () => {
//   //   console.log(" Submit button clicked");
//   //   audioRef.current.play();
//   //   const canvas = canvasRef.current;
//   //   if (!canvas) {
//   //     console.error(" Canvas ref is missing");
//   //     return;
//   //   }

//   //   // 1. Get Token
//   //   const token = await getToken();
//   //   if (!token) {
//   //     alert(" Error: You are not logged in (No Token)");
//   //     return;
//   //   }

//   //   // 2. Create Blob
//   //   canvas.toBlob(async (blob) => {
//   //     if (!blob) {
//   //       alert(" Error: Canvas is empty");
//   //       return;
//   //     }
//   //     console.log("Image Blob created size:", blob.size);

//   //     // 3. Create FormData
//   //     const formData = new FormData();
//   //     formData.append("doodleImage", blob, "doodle.png");
//   //     formData.append("prompt", "Screen Drawing");

//   //     try {
//   //       console.log(" Sending request to http://localhost:3000/api/storage/upload-doodle...");
        
//   //       // 4. Send Request
//   //       const response = await axios.post(
//   //         `http://localhost:3000/api/storage/upload-doodle?doodle=${encodeURIComponent(doodle)}&language=${encodeURIComponent(language)}`, 
//   //         formData, 
//   //         {
//   //           headers: {
//   //             Authorization: `Bearer ${token}`,
//   //             "Content-Type": "multipart/form-data",
//   //           },
//   //         }
//   //       );

//   //       console.log(" Upload Success:", response.data);
//   //       alert("Your doodle was saved!");
//   //       handleClearCanvas();

//   //     } catch (error) {
//   //       console.error(" Upload Failed Details:", error);
        
//   //       if (error.response) {
//   //         // Server responded with a status code (e.g., 400, 401, 500)
//   //         console.error("Server Status:", error.response.status);
//   //         console.error("Server Data:", error.response.data);
//   //         alert(`Upload Failed: Server Error ${error.response.status} - ${JSON.stringify(error.response.data)}`);
//   //       } else if (error.request) {
//   //         // Request was made but no response received (Network Error)
//   //         console.error("No response from server. Is Backend running?");
//   //         alert("Upload Failed: Backend not responding. Is 'node app.js' running on port 3000?");
//   //       } else {
//   //         alert(`Upload Failed: ${error.message}`);
//   //       }
//   //     }
//   //   }, "image/png");
//   // };

//   const handleSubmitDoodle = async () => {
//     console.log(" Submit button clicked");
//     if(audioRef.current) audioRef.current.play();
    
//     const canvas = canvasRef.current;
//     const token = await getToken();
//     if (!token) return alert("You are not logged in");

//     canvas.toBlob(async (blob) => {
//       if (!blob) return alert("Canvas is empty");

//       const formData = new FormData();
//       formData.append("doodleImage", blob, "doodle.png");
//       // Use the active task title as the prompt, or fallback
//       formData.append("prompt", activeTask ? activeTask.title : "Screen Drawing");

//       try {
//         // 1. Upload the Doodle
//         await axios.post(
//           `http://localhost:3000/api/storage/upload-doodle?doodle=${encodeURIComponent(doodle)}&language=${encodeURIComponent(language)}`, 
//           formData, 
//           { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
//         );

//         // 2. If this was for a Task, Mark it Complete & Advance
//         if (activeTask) {
//             // A. Tell Backend
//             await axios.put(`http://localhost:3000/api/tasks/complete/${activeTask._id}`, {}, {
//                 headers: { Authorization: `Bearer ${token}` }
//             });

//             // B. Update Frontend State Instantly (No Refresh!)
//             const updatedTasks = tasks.map(task => 
//                 task._id === activeTask._id ? { ...task, status: 'completed' } : task
//             );
//             setTasks(updatedTasks);

//             // C. Find the NEXT pending task
//             const nextTask = updatedTasks.find(t => t.status !== 'completed');
//             setActiveTask(nextTask || null);

//             alert(`Great job! You finished "${activeTask.title}". Loading next...`);
//         } else {
//             alert("Your free-style doodle was saved!");
//         }

//         // 3. Clear Canvas for the next drawing
//         handleClearCanvas();

//       } catch (error) {
//         console.error("Upload Failed:", error);
//         alert("Upload Failed.");
//       }
//     }, "image/png");
//   };

//   return (
//     <div className="min-h-screen bg-[#EAD6DE] flex flex-col pb-20">
      
//       {/* Navbar */}
//       <nav className="bg-[#2C2A4A] px-6 py-2 flex items-center justify-between shadow-lg text-white">
//         <img src="/src/assets/doodle-quest-logo.png" alt="Logo" className="h-12" />
//         <h1 className="font-['Roboto_Slab'] text-5xl tracking-wider">Screen Doodles</h1>
//         <div className="flex items-center space-x-4">
//           <button className="w-16 h-16 rounded-full flex items-center justify-center p-2 hover:bg-gray-200 transition">
//             <img src="/src/assets/home-icon.png" alt="Home" />
//           </button>
//           <button className="w-16 h-16 rounded-full flex items-center justify-center p-2.5 hover:bg-orange-500 transition">
//             <img src="/src/assets/click.png" alt="Back" />
//           </button>
//         </div>
//       </nav>

//       {/* Main Drawing Area */}
//       <div
//         className="flex-col bg-center min-h-[85vh] p-6 bg-[length:100%_100%]"
//         style={{ backgroundImage: `url(${screenBG})` }}
//       >
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
          
//           {/* Left Column: Clue Box (Static for other uses)
//           <div className="lg:col-span-1">
//             <h2 className="text-xl font-['Orbitron'] font-bold text-white mb-2">
//               Clue Box
//             </h2>
//             <div className="bg-white h-72 w-full border-4 border-white rounded-2xl shadow-xl flex items-center justify-center">
//                <p className="text-gray-400 italic">Clues appear here...</p>
//             </div>
//           </div> */}

//          {/*  DYNAMIC CLUE BOX */}
//           <div className="lg:col-span-1">
//             <h2 className="text-xl font-['Orbitron'] font-bold text-white mb-2">Clue Box</h2>
            
//             <div className="bg-white h-72 w-full border-4 border-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-4 text-center overflow-hidden relative">
               
//                {activeTask ? (
//                  <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
                   
//                    {/*  THE PARENT'S SELECTED IMAGE */}
//                    {activeTask.taskImage ? (
//                      <img 
//                        src={activeTask.taskImage} 
//                        alt="Clue" 
//                        className="w-36 h-36 object-contain mb-3 drop-shadow-md" 
//                      />
//                    ) : (
//                      <div className="text-6xl mb-2">🖌️</div>
//                    )}
                   
//                    {/* Task Info */}
//                    <h3 className="text-2xl font-bold text-[#2C2A4A] font-['Roboto_Slab'] uppercase tracking-wide">
//                      {activeTask.title}
//                    </h3>
                   
//                    {activeTask.description && (
//                      <p className="text-xs text-gray-500 mt-1 max-w-[80%] leading-tight">
//                        {activeTask.description}
//                      </p>
//                    )}

//                    {/* Done Button */}
//                    <button 
//                       onClick={() => {handleCompleteTask(activeTask._id) ; handleSubmitDoodle;}}
//                       className="mt-3 bg-green-500 hover:bg-green-600 text-white px-6 py-1.5 rounded-full text-sm font-bold shadow-md transform active:scale-95 transition-all"
//                    >
//                      I Drew It! 
//                    </button>
//                    <audio
//             src={saveaudio}
//                        hidden
//            ref={audioRef}
//            preload="auto"
//           />
//                  </div>
//                ) : (
//                  // Empty State
//                  <div className="text-gray-400 italic">
//                     <p className="text-5xl mb-2 opacity-50">🌟</p>
//                     <p className="font-bold">No active tasks!</p>
//                     <p className="text-xs">Ask your parent for a challenge.</p>
//                  </div>
//                )}

//             </div>
//           </div>

//           {/* Right Column: Screen Canvas */}
//           <div className="lg:col-span-2">
//             <div className="flex items-center gap-2 mb-2">
//               <img src="/src/assets/screen.png" alt="Icon" className="w-7 h-7" />
//               <h2 className="text-xl font-['Orbitron'] font-bold text-white">Screen Canvas</h2>
//             </div>
//             <canvas
//               ref={canvasRef}
//               className="bg-white w-full h-[60vh] border-4 border-white rounded-2xl shadow-xl"
//             ></canvas>
//           </div>
//         </div>

//         <div className="flex justify-end font-['Saira_Stencil_One'] tracking-wide mt-4 gap-4">
//           <button onClick={handleClearCanvas} className="bg-[#D0021B] px-8 py-3 rounded-xl text-white text-lg shadow-[4px_4px_0px_#000000] hover:bg-red-700 transition">
//             Clear
//           </button>
//           <button onClick={handleSubmitDoodle} className="bg-[#4CAF50] px-8 py-3 rounded-xl text-white text-lg shadow-[4px_4px_0px_#000000] hover:bg-green-700 transition">
//             Submit
//           </button>
//           <audio
//             src={saveaudio}
//                        hidden
//            ref={audioRef}
//            preload="auto"
//           />
//         </div>
//       </div>

//       {/* TASK TABLE SECTION */}
//       <div className="mt-12 px-8 lg:px-20">
//         <div className="flex items-center gap-3 mb-6">
//             <h1 className="text-3xl font-['Orbitron'] text-gray-800">To-Do's</h1>
//             <div className="w-8 h-8 bg-gray-600 rounded p-1">
//               <img src="/src/assets/todo.png" alt="To Do" className="w-full h-full invert" />
//             </div>
//         </div>

//         <div className="bg-white rounded-lg shadow-lg w-full border-2 border-gray-200 overflow-hidden flex flex-col">
//            {/* Scrollable Container */}
//            <div className="overflow-y-auto max-h-80 custom-scrollbar">
//               <table className="w-full text-left border-collapse relative">
//                 {/* Sticky Header */}
//                 <thead className="bg-[#e5cef0] sticky top-0 z-10 shadow-sm">
//                   <tr>
//                     <th className="px-6 py-4 text-sm font-bold text-gray-800 border-b border-gray-300">SR. No.</th>
//                     <th className="px-6 py-4 text-sm font-bold text-gray-800 border-b border-gray-300">Task Details</th>
//                     <th className="px-6 py-4 text-sm font-bold text-gray-800 border-b border-gray-300">Status</th>
//                     <th className="px-6 py-4 text-sm font-bold text-gray-800 border-b border-gray-300">Action / Message</th>
//                   </tr>
//                 </thead>

//                 <tbody className="bg-gray-50">
//                   {loadingTasks ? (
//                     <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500">Loading tasks...</td></tr>
//                   ) : tasks.length === 0 ? (
//                     <tr><td colSpan="4" className="px-6 py-12 text-center text-gray-500">No tasks assigned yet.</td></tr>
//                   ) : (
//                     tasks.map((task, index) => (
//                       <tr key={task._id} className="border-b border-gray-200 hover:bg-blue-50 transition">
//                         <td className="px-6 py-4 text-sm text-gray-700 font-medium">{index + 1}</td>
                        
//                         <td className="px-6 py-4 text-sm text-gray-700">
//                           <div className="font-bold text-base">{task.title}</div>
//                           <div className="text-xs text-gray-500">{task.description}</div>
//                         </td>
                        
//                         <td className="px-6 py-4">
//                           {task.status === 'completed' ? (
//                             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800 border border-green-200">
//                               Done 
//                             </span>
//                           ) : (
//                             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-yellow-100 text-yellow-800 border border-yellow-200">
//                               Pending 
//                             </span>
//                           )}
//                         </td>
                        
                        
//                         <td className="px-6 py-4">
//                            {task.status !== 'completed' ? (
//                               <button 
//                                 onClick={() => handleCompleteTask(task._id)}
//                                 className="bg-[#3B17AB] text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-md hover:bg-[#2a0f80] transition"
//                               >
//                                 Mark Done
//                               </button>
//                            ) : (
//                               //APPRECIATION 
//                               <div>
//                                 {task.appreciationMessage ? (
//                                    <div className="text-sm text-purple-700 font-bold bg-purple-100 p-2 rounded-lg border border-purple-200 inline-block animate-pulse">
//                                        Msg: "{task.appreciationMessage}"
//                                    </div>
//                                 ) : (
//                                    <span className="text-xs text-gray-400 italic">Waiting for parent...</span>
//                                 )}
//                               </div>
//                            )}
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//            </div>
//         </div>
//       </div>

//     </div>
//   );
// }

// export default ScreenDrawing;

import React, { useRef, useEffect, useState } from "react";
import screenBG from "../../assets/screenbg.png";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import saveaudio from "../../assets/audio/save.wav";

function ScreenDrawing() {
  const canvasRef = useRef(null);
  const drawingState = useRef({ isDrawing: false, lastX: 0, lastY: 0 });
  const audioRef = useRef(null);
  
  const { getToken, userId } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [loadingTasks, setLoadingTasks] = useState(true);

  // ✅ NEW STATES FOR "HELP" FLOW
  const [clueState, setClueState] = useState("ask"); // 'ask' | 'visible' | 'hidden'
  const [aiFeedback, setAiFeedback] = useState(""); // Stores AI guess if wrong
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // --- 1. Fetch Tasks ---
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await getToken();
        if (!token) return;
        const response = await axios.get('http://localhost:3000/api/tasks/my-tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setTasks(response.data);
        const currentTask = response.data.find(t => t.status !== 'completed');
        setActiveTask(currentTask || null);
        
        // Reset clue state when new task loads
        setClueState("ask");
        setAiFeedback("");

      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoadingTasks(false);
      }
    };
    fetchTasks();
  }, [getToken]);

  // --- 2. Canvas Logic (Unchanged) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    const setCanvasSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      context.strokeStyle = "black";
      context.lineWidth = 4;
      context.lineCap = "round";
      context.lineJoin = "round";
    };
    setCanvasSize();
    const startDrawing = (e) => {
      drawingState.current.isDrawing = true;
      [drawingState.current.lastX, drawingState.current.lastY] = [e.offsetX, e.offsetY];
    };
    const stopDrawing = () => { drawingState.current.isDrawing = false; };
    const draw = (e) => {
      if (!drawingState.current.isDrawing) return;
      context.beginPath();
      context.moveTo(drawingState.current.lastX, drawingState.current.lastY);
      context.lineTo(e.offsetX, e.offsetY);
      context.stroke();
      [drawingState.current.lastX, drawingState.current.lastY] = [e.offsetX, e.offsetY];
    };
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("resize", setCanvasSize);
    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);

  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  // --- 3. Smart Submit Logic ---
  const handleSubmitDoodle = async () => {
    if (!activeTask) return alert("No active task!");
    
    const canvas = canvasRef.current;
    const imageBase64 = canvas.toDataURL("image/png");
    
    // CASE A: BLIND MODE (Clue Hidden) -> Verify with AI
    if (clueState === "hidden") {
        setIsAnalyzing(true);
        try {
            // 1. Analyze with Backend AI (Gemini Vision)
            const res = await axios.post("http://localhost:3000/api/doodle/analyze", {
                userId,
                image: imageBase64
            });

            const aiLabel = res.data.label.toLowerCase(); 
            const target = activeTask.title.toLowerCase();

            console.log(`🎯 AI Saw: ${aiLabel} | Target: ${target}`);

            // 2. Check match (Fuzzy check)
            if (aiLabel.includes(target)) {
                // SUCCESS! Proceed to upload
                setAiFeedback("✨ Perfect match!");
                await uploadAndComplete(imageBase64);
            } else {
                // FAIL! Show Clue & Feedback
                setAiFeedback(`I saw "${aiLabel}". Try using the clue!`);
                setClueState("visible"); // Force show clue
                alert(`Oops! That looks like ${aiLabel}. Look at the clue box and try again!`);
            }
        } catch (err) {
            console.error("AI Check Failed", err);
            // Fallback: If AI fails, just let them submit
            await uploadAndComplete(imageBase64);
        } finally {
            setIsAnalyzing(false);
        }
    } 
    // CASE B: HELP MODE (Clue Visible) -> Just Submit
    else {
        await uploadAndComplete(imageBase64);
    }
  };

  // --- 4. Core Upload Function ---
  const uploadAndComplete = async (imageBase64) => {
    if(audioRef.current) audioRef.current.play();
    const token = await getToken();
    
    // Convert Base64 to Blob for Upload
    const res = await fetch(imageBase64);
    const blob = await res.blob();
    const formData = new FormData();
    formData.append("doodleImage", blob, "doodle.png");
    formData.append("prompt", activeTask.title);

    try {
        // Upload
        await axios.post(
          `http://localhost:3000/api/storage/upload-doodle`, 
          formData, 
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
        );

        // Mark Complete
        await axios.put(`http://localhost:3000/api/tasks/complete/${activeTask._id}`, {}, {
            headers: { Authorization: `Bearer ${token}` }
        });

        // Update Local State (No Refresh)
        const updatedTasks = tasks.map(t => 
            t._id === activeTask._id ? { ...t, status: 'completed' } : t
        );
        setTasks(updatedTasks);
        
        // Find Next Task
        const nextTask = updatedTasks.find(t => t.status !== 'completed');
        setActiveTask(nextTask || null);
        
        // Reset UI for next task
        setClueState("ask");
        setAiFeedback("");
        handleClearCanvas();
        alert("Great job! Loading next task...");

    } catch (err) {
        console.error("Upload failed", err);
        alert("Something went wrong saving your doodle.");
    }
  };

  return (
    <div className="min-h-screen bg-[#EAD6DE] flex flex-col pb-20">
      
      {/* Navbar (Same) */}
      <nav className="bg-[#2C2A4A] px-6 py-2 flex items-center justify-between shadow-lg text-white">
        <img src="/src/assets/doodle-quest-logo.png" alt="Logo" className="h-12" />
        <h1 className="font-['Roboto_Slab'] text-5xl tracking-wider">Screen Doodles</h1>
        <div className="flex items-center space-x-4">
          <button className="w-16 h-16 rounded-full flex items-center justify-center p-2 hover:bg-gray-200 transition bg-white/20">
            <img src="/src/assets/home-icon.png" />
          </button>
        </div>
      </nav>

      {/* Main Area */}
      <div className="flex-col bg-center min-h-[85vh] p-6 bg-[length:100%_100%]" style={{ backgroundImage: `url(${screenBG})` }}>
        
        {/* ✅ LAYOUT FIX: Changed 'items-start' to 'items-center' to center the left boxes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          
          {/* LEFT COLUMN: SPLIT BOXES */}
          <div className="lg:col-span-1 flex flex-col gap-6 w-full">
            
            {/* 1. ASSIGNMENT BOARD */}
            <div className="bg-white rounded-2xl shadow-xl border-4 border-[#3B17AB] p-6 text-center relative overflow-hidden transform hover:scale-[1.02] transition duration-300">
               <div className="absolute top-0 left-0 w-full h-3 bg-[#3B17AB]"></div>
               <h2 className="text-gray-500 font-bold text-xs uppercase tracking-widest mb-2">Current Mission</h2>
               {activeTask ? (
                 <h1 className="text-4xl font-['Roboto_Slab'] text-[#2C2A4A] animate-pulse drop-shadow-sm">
                   Draw a {activeTask.title}
                 </h1>
               ) : (
                 <h1 className="text-xl text-gray-400">All missions complete! 🎉</h1>
               )}
            </div>

            {/* 2. MAGIC CLUE BOX */}
            <div className="bg-white h-72 w-full border-4 border-white rounded-2xl shadow-xl flex flex-col items-center justify-center p-4 text-center relative transition-all duration-500">
               <h2 className="absolute top-3 left-4 text-sm font-bold text-gray-400 flex items-center gap-1">
                 💡 Clue Box
               </h2>

               {activeTask ? (
                 <>
                   {/* STATE A: ASK FOR HELP */}
                   {clueState === "ask" && (
                     <div className="animate-in fade-in zoom-in flex flex-col gap-4">
                        <p className="text-2xl font-bold text-gray-700">Do you need help?</p>
                        <div className="flex gap-4 justify-center">
                           <button 
                             onClick={() => setClueState("hidden")}
                             className="bg-red-500 hover:bg-red-600 text-white text-lg px-8 py-2 rounded-full font-bold shadow-lg transform hover:scale-110 transition"
                           >
                             NO 🧠
                           </button>
                           <button 
                             onClick={() => setClueState("visible")}
                             className="bg-green-500 hover:bg-green-600 text-white text-lg px-8 py-2 rounded-full font-bold shadow-lg transform hover:scale-110 transition"
                           >
                             YES 👀
                           </button>
                        </div>
                     </div>
                   )}

                   {/* STATE B: SHOW IMAGE (Help/Fail Mode) */}
                   {clueState === "visible" && (
                     <div className="animate-in fade-in zoom-in">
                        {activeTask.taskImage ? (
                          <img src={activeTask.taskImage} alt="Clue" className="w-36 h-36 object-contain mb-2 drop-shadow-md mx-auto" />
                        ) : (
                          <div className="text-6xl mb-2">🎨</div>
                        )}
                        <p className="text-sm text-gray-500 px-4">{activeTask.description}</p>
                        
                        {/* AI FEEDBACK MESSAGE */}
                        {aiFeedback && (
                            <div className="mt-3 bg-red-100 border border-red-200 text-red-600 text-xs font-bold px-3 py-1 rounded-full animate-bounce">
                                🤖 {aiFeedback}
                            </div>
                        )}
                     </div>
                   )}

                   {/* STATE C: BLIND MODE (Hidden) */}
                   {clueState === "hidden" && (
                     <div className="animate-in fade-in zoom-in">
                        <div className="text-7xl mb-4 opacity-20">🙈</div>
                        <p className="font-bold text-xl text-[#2C2A4A]">Draw from memory!</p>
                        <p className="text-sm text-gray-500 mt-1">I will check your drawing.</p>
                        {isAnalyzing && <p className="text-blue-600 font-bold animate-pulse mt-3 text-lg">🤖 Checking...</p>}
                     </div>
                   )}
                 </>
               ) : (
                 <div className="text-gray-300 text-6xl">🌟</div>
               )}
            </div>
          </div>

          {/* Right Column: Screen Canvas */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-2">
              <img src="/src/assets/screen.png" alt="Icon" className="w-7 h-7" />
              <h2 className="text-xl font-['Orbitron'] font-bold text-white">Screen Canvas</h2>
            </div>
            <canvas ref={canvasRef} className="bg-white w-full h-[65vh] border-4 border-white rounded-2xl shadow-xl"></canvas>
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="flex justify-end font-['Saira_Stencil_One'] tracking-wide mt-6 gap-6 pr-4">
          <button onClick={handleClearCanvas} className="bg-[#D0021B] px-10 py-3 rounded-xl text-white text-xl shadow-[4px_4px_0px_#000000] hover:bg-red-700 transition">
            Clear
          </button>
          
          <button 
            onClick={handleSubmitDoodle} 
            disabled={isAnalyzing}
            className={`px-10 py-3 rounded-xl text-white text-xl shadow-[4px_4px_0px_#000000] transition flex items-center gap-3
              ${isAnalyzing ? "bg-gray-400 cursor-wait" : "bg-[#4CAF50] hover:bg-green-700"}
            `}
          >
            {isAnalyzing ? "Checking..." : (clueState === "hidden" ? "Check Drawing" : "Submit")}
          </button>
          
          <audio src={saveaudio} hidden ref={audioRef} preload="auto" />
        </div>
      </div>
    </div>
  );
}

export default ScreenDrawing;