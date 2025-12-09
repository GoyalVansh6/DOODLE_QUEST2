
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useUser, useAuth } from '@clerk/clerk-react';
// import { useNavigate } from 'react-router-dom';// ✅ Clerk import
// import { io } from "socket.io-client";


// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

// const Parent = () => {
//   // Screen-time states
//   const [screenTime, setScreenTime] = useState(0);
//   const [dailyLimit, setDailyLimit] = useState(0);
//   const [newLimit, setNewLimit] = useState("");



//   const { user } = useUser();
//   const { getToken } = useAuth();

//   // --- Stats State ---
//   const [stats, setStats] = useState({
//     totalDoodles: 0,
//     puzzlesSolved: 0,
//     totalQuizzes: 0,
//     averageQuizScore: 0,
//     screenTimeMinutes: 0,
//     weeklyDoodles: 0,
//     weeklyQuizzes: 0,
//     weeklyPuzzles: 0,
//     weeklyGoalPercent: 0
//   });

//   const [loading, setLoading] = useState(true);
//   const [cameraAllowed, setCameraAllowed] = useState(false);
//   const userId = "child123"; // temp — later dynamic
//   // --- Task Management State ---
//   const [taskMode, setTaskMode] = useState('assign'); // 'assign' or 'review'
//   const [taskTitle, setTaskTitle] = useState("");
//   const [taskDesc, setTaskDesc] = useState("");
//   const [assigning, setAssigning] = useState(false);

//   // Review State
//   const [taskList, setTaskList] = useState([]);
//   const [appreciationMsg, setAppreciationMsg] = useState("");
//   const [activeTaskId, setActiveTaskId] = useState(null);// Which task are we appreciating?

//   const updateCameraPermission = async (value) => {
//     try {
//       await axios.put("http://localhost:3000/api/camera/update", {
//         userId,
//         allowed: value
//       });

//       setCameraAllowed(value);
//       alert("Camera permission updated!");
//     } catch (err) {
//       console.log("Camera update error:", err);
//       alert("Failed to change camera permission");
//     }
//   };

//   useEffect(() => {
//     const socket = io("http://localhost:3000");

//     socket.on("unsafe-doodle", (data) => {
//       if (data.userId === userId) {
//         alert("⚠️ ALERT: " + data.message);
//       }
//     });

//     return () => socket.disconnect();
//   }, []);

//   // --- Fetch Analytics & Tasks ---
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const token = await getToken();
//         if (!token) return;

//         const config = { headers: { Authorization: `Bearer ${token}` } };

//         // 1. Get Stats
//         const statsRes = await axios.get('http://localhost:3000/api/dashboard/stats', config);
//         setStats(statsRes.data);

//         // 2. Get Tasks (for review)
//         // Note: In dev mode, we act as both parent and child, so this works.
//         // In prod, you'd fetch tasks by childId.
//         const tasksRes = await axios.get('http://localhost:3000/api/tasks/my-tasks', config);
//         setTaskList(tasksRes.data);

//       } catch (err) {
//         console.error("Error fetching data:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [getToken]); // Reload when token is ready

//   // --- Handle Task Assignment ---
//   const handleAssignTask = async (e) => {
//     e.preventDefault();
//     if (!taskTitle) return alert("Please enter a task title");

//     setAssigning(true);
//     try {
//       const token = await getToken();
//       // Assign to self for testing
//       await axios.post('http://localhost:3000/api/tasks/assign', {
//         childId: user.id,
//         title: taskTitle,
//         description: taskDesc,
//         dueDate: new Date()
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert("Task Assigned Successfully!");
//       setTaskTitle("");
//       setTaskDesc("");

//       // Refresh list
//       const res = await axios.get('http://localhost:3000/api/tasks/my-tasks', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setTaskList(res.data);

//     } catch (err) {
//       console.error("Error assigning task:", err);
//       alert("Failed to assign task.");
//     } finally {
//       setAssigning(false);
//     }
//   };

//   // --- Handle Sending Appreciation ---
//   const handleSendAppreciation = async (taskId) => {
//     if (!appreciationMsg) return alert("Write a message first!");

//     try {
//       const token = await getToken();
//       await axios.put(`http://localhost:3000/api/tasks/appreciate/${taskId}`, {
//         message: appreciationMsg
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       alert("Appreciation Sent! 🌟");
//       setAppreciationMsg("");
//       setActiveTaskId(null);

//       // Update local list to show the new message
//       setTaskList(prev => prev.map(t =>
//         t._id === taskId ? { ...t, appreciationMessage: appreciationMsg } : t
//       ));

//     } catch (err) {
//       console.error(err);
//       alert("Failed to send message");
//     }
//   };

//   useEffect(() => {
//     const fetchScreenTime = async () => {
//       try {
//         const res = await axios.get(`http://localhost:3000/api/time/status/${userId}`);
//         setScreenTime(res.data.timeUsed);
//         setDailyLimit(res.data.dailyLimit);
//       } catch (err) {
//         console.log("Error fetching screen time:", err);
//       }
//     };

//     fetchScreenTime();
//   }, []);
//   const updateLimit = async () => {
//     if (!newLimit) return alert("Enter limit in minutes");

//     try {
//       await axios.put("http://localhost:3000/api/time/limit", {
//         userId,
//         limitMinutes: Number(newLimit),
//       });

//       alert("Screen-time limit updated!");
//       setDailyLimit(Number(newLimit));
//       setNewLimit("");
//     } catch (err) {
//       console.log("Error updating limit:", err);
//       alert("Failed to update limit");
//     }
//   };


//   // --- Chart Data ---
//   const barData = [
//     { name: 'Doodles', count: stats.weeklyDoodles },
//     { name: 'Quizzes', count: stats.weeklyQuizzes },
//     { name: 'Puzzles', count: stats.weeklyPuzzles },
//   ];

//   const pieData = [
//     { name: 'Doodles', value: stats.totalDoodles },
//     { name: 'Puzzles', value: stats.puzzlesSolved },
//     { name: 'Quizzes', value: stats.totalQuizzes },
//   ];

//   const hasData = stats.totalDoodles > 0 || stats.puzzlesSolved > 0 || stats.totalQuizzes > 0;
//   const displayPieData = hasData ? pieData : [{ name: 'No Data', value: 1 }];
//   const COLORS = hasData ? ['#8884d8', '#82ca9d', '#ffc658'] : ['#e0e0e0'];

//   const menuItems = [
//     { label: "DRAWINGS", active: true },
//     { label: "STORY LISTENED", active: false },
//     { label: "PUZZLE ANALYSIS", active: false },
//     { label: "SCREEN TIME", active: false },
//     { label: "PAPER TIME", active: false },
//   ];

//   return (
//     <div className="bg-[#F4EDE6] min-h-screen pb-10 flex flex-col">

//       {/* --- Navbar --- */}
//       <nav className="nav flex bg-[#2C2A4A] h-16 text-white justify-between items-center px-10 shadow-md">
//         <div className="text-center font-orbitron text-xl font-bold bg-gradient-to-r from-[#EDFFF5] to-[rgba(133,213,237,0.74)] bg-clip-text text-transparent">
//           DoodleQuest
//         </div>
//         <div className="text-3xl font-robotoSlab">Guardian's Hub</div>
//         <div className="flex gap-4">
//           <img src="/src/assets/home.png" alt="Home" width="30" />
//           <img src="/src/assets/post.png" alt="Post" width="30" />
//         </div>
//       </nav>

//       <div className="text-[#4A0303] font-robotoSlab text-5xl mt-8 text-center my-10">
//         Progress Hub
//       </div>
//       {/* --- Top Images Section --- */}
//       <div className="w-full max-w-7xl mx-auto mt-4 mb-14 flex justify-center gap-8 px-4">

//         {/* Image 1 */}
//         <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-black shadow-xl bg-white">
//           <img src="/src/assets/image3.png" alt="Child" className="w-full h-full object-cover" />
//         </div>

//         {/* Timer Image (Middle) */}
//         <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-black shadow-xl bg-pink-100 flex flex-col items-center justify-center">
//           <h3 className="font-thin text-4xl mb-4 font-robotoSlab">Timer</h3>
//           <img src="/src/assets/clock.png" alt="Timer" className="w-32 opacity-80"
//             onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/2928/2928750.png'} />
//         </div>

//         {/* Image 3 */}
//         <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-black shadow-xl bg-white">
//           <img src="/src/assets/image2.png" alt="Child" className="w-full h-full object-cover" />
//         </div>
//       </div>



//       {/* --- MAIN DASHBOARD GRID --- */}
//       <div className="max-w-[1400px] mx-auto w-full px-6 flex gap-6 items-start">

//         {/* === LEFT SIDEBAR (FIXED ALIGNMENT) === */}
//         <div className="w-64 bg-[#0F172A] text-white  rounded-lg overflow-hidden shadow-lg flex-shrink-0 flex flex-col py-20">
//           {menuItems.map((item, index) => (
//             <div key={index} className="flex items-center h-20 w-full group cursor-pointer">

//               {/* Left Column: Dot/Icon */}
//               <div className="w-[60px] flex justify-center items-center h-full relative">
//                 {/* Optional: Vertical Line segment to connect dots */}
//                 {index !== menuItems.length - 1 && (
//                   <div className="absolute bottom-0 top-1/2 w-px bg-gray-700 -z-10 h-full"></div>
//                 )}
//                 {index !== 0 && (
//                   <div className="absolute top-0 bottom-1/2 w-px bg-gray-700 -z-10 h-full"></div>
//                 )}

//                 {/* The Dot */}
//                 <div className={`rounded-full p-1 ${item.active ? 'bg-white' : 'bg-transparent'}`}>
//                   <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-black' : 'bg-gray-500'}`}></div>
//                 </div>
//               </div>

//               {/* Right Column: Label/Button */}
//               <div className="flex-1 pr-6 flex items-center">
//                 <div className={`w-full py-2 text-lg font-bold tracking-wide transition-all duration-200
//                             ${item.active
//                     ? 'bg-white text-black text-center rounded shadow-md scale-105'
//                     : 'text-white opacity-70 pl-4 hover:opacity-100'
//                   }`}
//                 >
//                   {item.label}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* === RIGHT CONTENT AREA === */}
//         <div className="flex-grow bg-[#E2E2EA] p-6 rounded-2xl shadow-inner">

//           {/* ROW 1: Highlights + Bar Chart */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

//             {/* 1. Weekly Highlights Card */}
//             <div className="bg-[#4285F4] rounded-2xl text-white overflow-hidden shadow-lg flex flex-col">
//               <div className="p-6 flex items-center gap-4">
//                 <div className="w-14 h-14 bg-yellow-300 rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
//                   <img src="/src/assets/user.png" alt="User" className="w-full h-full object-cover" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-lg">{user?.firstName || 'UserABC'}</h2>
//                   <p className="text-xs opacity-90">Age 8 • Grade 3</p>
//                   <span className="bg-[#A2E49A] text-[#1a4515] text-[10px] px-2 py-0.5 rounded-full font-bold">Creative Learner</span>
//                 </div>
//               </div>
//               <div className="bg-white text-gray-800 p-5 flex-grow flex flex-col justify-center gap-3">
//                 <h3 className="text-[#4285F4] font-bold mb-1">🏆 This Week's Highlights</h3>
//                 <div className="flex items-center gap-2 text-sm"><span className="text-yellow-500">⭐</span> Completed <b>{stats.weeklyDoodles}</b> Doodling Sessions</div>
//                 <div className="flex items-center gap-2 text-sm"><span className="text-yellow-500">☀️</span> Took <b>{stats.weeklyQuizzes}</b> Quizzes</div>
//                 <div className="flex items-center gap-2 text-sm"><span className="text-yellow-500">⭐</span> Solved <b>{stats.weeklyPuzzles}</b> Puzzles this week</div>

//                 <div className="mt-4">
//                   <div className="flex justify-between text-xs font-bold mb-1">
//                     <span>Weekly Learning Goal</span>
//                     <span className="text-green-600">{stats.weeklyGoalPercent}% Done</span>
//                   </div>
//                   <div className="w-full bg-gray-200 h-2 rounded-full">
//                     <div className="bg-red-500 h-2 rounded-full" style={{ width: `${stats.weeklyGoalPercent}%` }}></div>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-1">Great progress this week!</p>
//                 </div>
//               </div>
//             </div>

//             {/* 2. Bar Chart (Weekly Division) */}
//             <div className="bg-gray-200 rounded-2xl p-4 shadow-lg border border-gray-300 flex flex-col">
//               <h3 className="text-sm font-bold mb-4 ml-2">Weekly Activity</h3>
//               <div className="flex-grow h-64">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={barData}>
//                     <CartesianGrid strokeDasharray="3 3" />
//                     <XAxis dataKey="name" tick={{ fontSize: 12 }} />
//                     <YAxis allowDecimals={false} />
//                     <Tooltip />
//                     <Bar dataKey="count" fill="#8884d8" barSize={40} radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
//                 <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#8884d8]"></div> Activities</div>
//               </div>
//             </div>
//           </div>

//           {/* ROW 2: Stats Grid + Pie Chart */}
//           <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

//             {/* 3. Four Small Stats Cards */}
//             <div className="grid grid-cols-2 gap-4">
//               {/* Card A */}
//               <div className="bg-[#EBDAC5] p-4 rounded-xl border border-black/20 shadow-sm relative">
//                 <div className="text-xs font-bold text-gray-600">Total Drawings</div>
//                 <div className="text-3xl font-bold mt-1">{stats.totalDoodles}</div>
//                 <div className="text-[10px] text-green-700 font-bold mt-1">+12% from last week</div>
//                 <div className="absolute top-2 right-2"><img src="/src/assets/pin.png" w="20" /></div>
//               </div>
//               {/* Card B */}
//               <div className="bg-[#C8E1A5] p-4 rounded-xl border border-black/20 shadow-sm relative">
//                 <div className="text-xs font-bold text-gray-600">Quizzes Taken</div>
//                 <div className="text-3xl font-bold mt-1">{stats.totalQuizzes}</div>
//                 <div className="text-[10px] text-green-700 font-bold mt-1">+12% from last week</div>
//                 <div className="absolute top-2 right-2"><img src="/src/assets/copy.png" w="20" /></div>
//               </div>
//               {/* Card C */}
//               <div className="bg-[#A9C2E9] p-4 rounded-xl border border-black/20 shadow-sm relative">
//                 <div className="text-xs font-bold text-gray-600">Puzzles Solved</div>
//                 <div className="text-3xl font-bold mt-1">{stats.puzzlesSolved}</div>
//                 <div className="text-[10px] text-green-700 font-bold mt-1">+12% from last week</div>
//                 <div className="absolute top-2 right-2"><img src="/src/assets/puzzle.png" w="20" /></div>
//                 {/* --- CAMERA PERMISSION CARD --- */}
//                 <div className="bg-[#FFE4C4] p-4 rounded-xl border border-black/20 shadow-sm relative mt-4">

//                   <h2 className="text-lg font-bold mb-2">Camera Permissions</h2>

//                   <p className="text-[15px] mb-2">
//                     Allow your child to use the camera for Paper Drawing recognition.
//                   </p>

//                   <div className="flex gap-3 mt-3">
//                     <button
//                       onClick={() => updateCameraPermission(true)}
//                       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//                     >
//                       Allow Camera
//                     </button>

//                     <button
//                       onClick={() => updateCameraPermission(false)}
//                       className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
//                     >
//                       Disable Camera
//                     </button>
//                   </div>

//                   <p className="mt-3 text-sm">
//                     Current status:
//                     <b className="ml-2">{cameraAllowed ? "Allowed" : "Not Allowed"}</b>
//                   </p>
//                 </div>

//               </div>
//               {/* Card D */}
//               <div className="bg-[#85DCE4] p-4 rounded-xl border border-black/20 shadow-sm relative">

//                 <h2 className="text-lg font-bold mb-1">Screen Time Control</h2>

//                 <p className="text-xl">
//                   <b>Used Today:</b> {screenTime} min
//                 </p>

//                 <p className="text-xl mt-1">
//                   <b>Daily Limit:</b> {dailyLimit} min
//                 </p>

//                 <div className="mt-4">
//                   <label className="block text-sm font-semibold mb-1">Set New Limit (minutes)</label>

//                   <input
//                     type="number"
//                     value={newLimit}
//                     onChange={(e) => setNewLimit(e.target.value)}
//                     className="border p-2 rounded w-full"
//                     placeholder="e.g., 90"
//                   />

//                   <button
//                     onClick={updateLimit}
//                     className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700 w-full"
//                   >
//                     Update Limit
//                   </button>
//                 </div>
//               </div>


//             </div>

//             {/* 4. Pie Chart (Total Doodles) */}
//             <div className="bg-gray-200 rounded-2xl p-4 shadow-lg border border-gray-300 flex flex-col items-center justify-center">
//               <h3 className="text-sm font-bold self-start mb-2">Total Activity</h3>
//               <div className="w-full h-48 relative">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={pieData}
//                       innerRadius={40}
//                       outerRadius={60}
//                       paddingAngle={5}
//                       dataKey="value"
//                     >
//                       {pieData.map((entry, index) => (
//                         <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                       ))}
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//                 {/* Center Text */}
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <span className="text-xl font-bold">{stats.totalDoodles + stats.totalQuizzes + stats.puzzlesSolved}</span>
//                 </div>
//               </div>
//               <div className="text-[16px] flex gap-2 mt-2">
//                 <span className="text-[#6c68b8]">● Doodles</span>
//                 <span className="text-[#4eb575]">● Puzzles</span>
//                 <span className="text-[#dda533]">● Quizzes</span>
//               </div>
//             </div>

//           </div>

//         </div>
//       </div>

//       {/* Warning Section */}
//       <div className="w-11/12 max-w-5xl mx-auto mt-8 bg-[#D7D3D3] p-6 rounded-lg shadow text-center font-robotoSlab border-l-8 border-yellow-500">
//         <p className="text-lg mb-2"><span className="text-red-600 font-bold">⚠️ Warning:</span> Encourage regular breaks for movement, outdoor play, and face-to-face interaction.</p>
//         <p className="text-lg"><span className="text-green-600 font-bold">🌟 Good News:</span> Your child is doing amazing! Their creativity is growing.</p>
//       </div>



//       {/* ✅ === TASK MANAGEMENT SECTION (UPDATED WITH TOGGLE) === */}
//       <div className="w-full max-w-6xl mx-auto mt-10 px-6">
//         <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

//           {/* Header with Toggle */}
//           <div className="bg-[#2C2A4A] px-6 py-4 border-b border-gray-100 flex justify-between items-center">
//             <div className="flex items-center gap-3">
//               <img src="/src/assets/post.png" alt="Task" className="w-6 invert" />
//               <h2 className="text-xl font-bold text-white font-orbitron">Task Management</h2>
//             </div>

//             {/* SLIDER / TOGGLE BUTTONS */}
//             <div className="bg-[#0F172A] p-1 rounded-full flex gap-1">
//               <button
//                 onClick={() => setTaskMode('assign')}
//                 className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${taskMode === 'assign' ? 'bg-white text-[#2C2A4A]' : 'text-white hover:bg-white/10'}`}
//               >
//                 Assign New
//               </button>
//               <button
//                 onClick={() => setTaskMode('review')}
//                 className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${taskMode === 'review' ? 'bg-white text-[#2C2A4A]' : 'text-white hover:bg-white/10'}`}
//               >
//                 Review & Appreciate
//               </button>
//             </div>
//           </div>

//           {/* Content Area */}
//           <div className="p-8">

//             {/* === VIEW 1: ASSIGN TASKS === */}
//             {taskMode === 'assign' && (
//               <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
//                 <div className="flex-1">
//                   <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Task</h3>
//                   <form onSubmit={handleAssignTask} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-bold text-gray-600 mb-1">Task Title</label>
//                       <input
//                         type="text"
//                         className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#3B17AB] outline-none transition"
//                         placeholder="e.g. Draw a Sunny Beach"
//                         value={taskTitle}
//                         onChange={(e) => setTaskTitle(e.target.value)}
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-bold text-gray-600 mb-1">Instructions</label>
//                       <textarea
//                         className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#3B17AB] outline-none transition h-24 resize-none"
//                         placeholder="e.g. Use yellow for sand and blue for water..."
//                         value={taskDesc}
//                         onChange={(e) => setTaskDesc(e.target.value)}
//                       ></textarea>
//                     </div>
//                     <button
//                       type="submit"
//                       disabled={assigning}
//                       className="bg-[#3B17AB] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2a0f80] transition shadow-lg w-full md:w-auto disabled:opacity-50"
//                     >
//                       {assigning ? "Assigning..." : "Assign Task to Child"}
//                     </button>
//                   </form>
//                 </div>
//                 <div className="flex-1 bg-blue-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-blue-100">
//                   <img src="https://cdn-icons-png.flaticon.com/512/4205/4205906.png" alt="Tasks" className="w-32 mb-4 opacity-80" />
//                   <h4 className="font-bold text-blue-900">Encourage Creativity!</h4>
//                   <p className="text-sm text-blue-700 mt-2 max-w-xs">
//                     Assigning specific themes helps focus your child's imagination. Try topics like "Animals", "Space", or "Family".
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* === VIEW 2: REVIEW TASKS === */}
//             {taskMode === 'review' && (
//               <div className="animate-fade-in">
//                 <h3 className="text-lg font-bold text-gray-800 mb-4">Child's Progress</h3>
//                 <div className="grid grid-cols-1 gap-4">
//                   {taskList.length === 0 ? (
//                     <p className="text-center text-gray-500 py-8 italic">No tasks assigned yet.</p>
//                   ) : (
//                     taskList.map(task => (
//                       <div key={task._id} className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition bg-gray-50">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3">
//                             <h4 className="font-bold text-gray-800">{task.title}</h4>
//                             <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
//                               {task.status === 'completed' ? 'COMPLETED' : 'PENDING'}
//                             </span>
//                           </div>
//                           <p className="text-sm text-gray-600 mt-1">{task.description}</p>
//                           {task.appreciationMessage && (
//                             <p className="text-xs text-purple-600 mt-2 font-medium">✨ Your Message: "{task.appreciationMessage}"</p>
//                           )}
//                         </div>

//                         {/* Action Area */}
//                         <div className="flex-shrink-0">
//                           {task.status === 'completed' && !task.appreciationMessage ? (
//                             activeTaskId === task._id ? (
//                               <div className="flex gap-2">
//                                 <input
//                                   type="text"
//                                   placeholder="Write something nice..."
//                                   className="border rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
//                                   value={appreciationMsg}
//                                   onChange={(e) => setAppreciationMsg(e.target.value)}
//                                 />
//                                 <button
//                                   onClick={() => handleSendAppreciation(task._id)}
//                                   className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-purple-700"
//                                 >
//                                   Send
//                                 </button>
//                               </div>
//                             ) : (
//                               <button
//                                 onClick={() => setActiveTaskId(task._id)}
//                                 className="bg-white border-2 border-purple-600 text-purple-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-purple-50 transition"
//                               >
//                                 Send Appreciation 💖
//                               </button>
//                             )
//                           ) : (
//                             <div className="text-xs text-gray-400 font-medium italic w-32 text-center">
//                               {task.status === 'pending' ? 'Waiting for child...' : 'Message Sent ✅'}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Parent;

import React, { useState, useEffect, useRef } from 'react'; //  Added useRef
import axios from 'axios';
import { useUser, useAuth } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';//  Clerk import
import { io } from "socket.io-client";


import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Parent = () => {
  // Screen-time states
  const [screenTime, setScreenTime] = useState(0);
  const [dailyLimit, setDailyLimit] = useState(0);
  const [newLimit, setNewLimit] = useState("");



  const { user } = useUser();
  const { getToken } = useAuth();

  // --- Stats State ---
  const [stats, setStats] = useState({
    totalDoodles: 0,
    puzzlesSolved: 0,
    totalQuizzes: 0,
    averageQuizScore: 0,
    screenTimeMinutes: 0,
    weeklyDoodles: 0,
    weeklyQuizzes: 0,
    weeklyPuzzles: 0,
    weeklyGoalPercent: 0
  });

  const [loading, setLoading] = useState(true);
  const [cameraAllowed, setCameraAllowed] = useState(false);
  const userId = "child123"; // temp — later dynamic
  // --- Task Management State ---
  const [taskMode, setTaskMode] = useState('assign'); // 'assign' or 'review'
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [assigning, setAssigning] = useState(false);

  // Review State
  const [taskList, setTaskList] = useState([]);
  const [appreciationMsg, setAppreciationMsg] = useState("");
  const [activeTaskId, setActiveTaskId] = useState(null);// Which task are we appreciating?

  // --- AI SUGGESTION LOGIC START (NEW) ---
  const [aiData, setAiData] = useState(null); // Stores age & suggestions
  const [showSuggestions, setShowSuggestions] = useState(false); // Toggles dropdown
  const wrapperRef = useRef(null); // Detects clicks outside

  // 1. Fetch Suggestions on Load
  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        // Assuming your backend for AI is on port 5000 as per previous setup
        const res = await fetch('http://localhost:5000/api/parental/suggestions');
        const result = await res.json();
        if (result.success) {
          setAiData(result);
        }
      } catch (error) {
        console.error("Error fetching AI suggestions:", error);
      }
    };
    fetchSuggestions();
  }, []);

  // 2. Click Outside Listener (Closes menu)
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 3. Handle Selecting a Word
  const handleSelectSuggestion = (word) => {
    setTaskTitle(word);
    setShowSuggestions(false);
  };
  // --- AI SUGGESTION LOGIC END ---

  const updateCameraPermission = async (value) => {
    try {
      await axios.put("http://localhost:3000/api/camera/update", {
        userId,
        allowed: value
      });

      setCameraAllowed(value);
      alert("Camera permission updated!");
    } catch (err) {
      console.log("Camera update error:", err);
      alert("Failed to change camera permission");
    }
  };

  useEffect(() => {
    const socket = io("http://localhost:3000");

    socket.on("unsafe-doodle", (data) => {
      if (data.userId === userId) {
        alert("⚠️ ALERT: " + data.message);
      }
    });

    return () => socket.disconnect();
  }, []);

  // --- Fetch Analytics & Tasks ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const config = { headers: { Authorization: `Bearer ${token}` } };

        // 1. Get Stats
        const statsRes = await axios.get('http://localhost:3000/api/dashboard/stats', config);
        setStats(statsRes.data);

        // 2. Get Tasks (for review)
        // Note: In dev mode, we act as both parent and child, so this works.
        // In prod, you'd fetch tasks by childId.
        const tasksRes = await axios.get('http://localhost:3000/api/tasks/my-tasks', config);
        setTaskList(tasksRes.data);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]); // Reload when token is ready

  // --- Handle Task Assignment ---
  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!taskTitle) return alert("Please enter a task title");

    setAssigning(true);
    try {
      const token = await getToken();
      // Assign to self for testing
      await axios.post('http://localhost:3000/api/tasks/assign', {
        childId: user.id,
        title: taskTitle,
        description: taskDesc,
        dueDate: new Date()
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Task Assigned Successfully!");
      setTaskTitle("");
      setTaskDesc("");

      // Refresh list
      const res = await axios.get('http://localhost:3000/api/tasks/my-tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTaskList(res.data);

    } catch (err) {
      console.error("Error assigning task:", err);
      alert("Failed to assign task.");
    } finally {
      setAssigning(false);
    }
  };

  // --- Handle Sending Appreciation ---
  const handleSendAppreciation = async (taskId) => {
    if (!appreciationMsg) return alert("Write a message first!");

    try {
      const token = await getToken();
      await axios.put(`http://localhost:3000/api/tasks/appreciate/${taskId}`, {
        message: appreciationMsg
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Appreciation Sent! 🌟");
      setAppreciationMsg("");
      setActiveTaskId(null);

      // Update local list to show the new message
      setTaskList(prev => prev.map(t =>
        t._id === taskId ? { ...t, appreciationMessage: appreciationMsg } : t
      ));

    } catch (err) {
      console.error(err);
      alert("Failed to send message");
    }
  };

  useEffect(() => {
    const fetchScreenTime = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/time/status/${userId}`);
        setScreenTime(res.data.timeUsed);
        setDailyLimit(res.data.dailyLimit);
      } catch (err) {
        console.log("Error fetching screen time:", err);
      }
    };

    fetchScreenTime();
  }, []);
  const updateLimit = async () => {
    if (!newLimit) return alert("Enter limit in minutes");

    try {
      await axios.put("http://localhost:3000/api/time/limit", {
        userId,
        limitMinutes: Number(newLimit),
      });

      alert("Screen-time limit updated!");
      setDailyLimit(Number(newLimit));
      setNewLimit("");
    } catch (err) {
      console.log("Error updating limit:", err);
      alert("Failed to update limit");
    }
  };


  // --- Chart Data ---
  const barData = [
    { name: 'Doodles', count: stats.weeklyDoodles },
    { name: 'Quizzes', count: stats.weeklyQuizzes },
    { name: 'Puzzles', count: stats.weeklyPuzzles },
  ];

  const pieData = [
    { name: 'Doodles', value: stats.totalDoodles },
    { name: 'Puzzles', value: stats.puzzlesSolved },
    { name: 'Quizzes', value: stats.totalQuizzes },
  ];

  const hasData = stats.totalDoodles > 0 || stats.puzzlesSolved > 0 || stats.totalQuizzes > 0;
  const displayPieData = hasData ? pieData : [{ name: 'No Data', value: 1 }];
  const COLORS = hasData ? ['#8884d8', '#82ca9d', '#ffc658'] : ['#e0e0e0'];

  const menuItems = [
    { label: "DRAWINGS", active: true },
    { label: "STORY LISTENED", active: false },
    { label: "PUZZLE ANALYSIS", active: false },
    { label: "SCREEN TIME", active: false },
    { label: "PAPER TIME", active: false },
  ];

  return (
    <div className="bg-[#F4EDE6] min-h-screen pb-10 flex flex-col">

      {/* --- Navbar --- */}
      <nav className="nav flex bg-[#2C2A4A] h-16 text-white justify-between items-center px-10 shadow-md">
        <div className="text-center font-orbitron text-xl font-bold bg-gradient-to-r from-[#EDFFF5] to-[rgba(133,213,237,0.74)] bg-clip-text text-transparent">
          DoodleQuest
        </div>
        <div className="text-3xl font-robotoSlab">Guardian's Hub</div>
        <div className="flex gap-4">
          <img src="/src/assets/home.png" alt="Home" width="30" />
          <img src="/src/assets/post.png" alt="Post" width="30" />
        </div>
      </nav>

      <div className="text-[#4A0303] font-robotoSlab text-5xl mt-8 text-center my-10">
        Progress Hub
      </div>
      {/* --- Top Images Section --- */}
      <div className="w-full max-w-7xl mx-auto mt-4 mb-14 flex justify-center gap-8 px-4">

        {/* Image 1 */}
        <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-black shadow-xl bg-white">
          <img src="/src/assets/image3.png" alt="Child" className="w-full h-full object-cover" />
        </div>

        {/* Timer Image (Middle) */}
        <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-black shadow-xl bg-pink-100 flex flex-col items-center justify-center">
          <h3 className="font-thin text-4xl mb-4 font-robotoSlab">Timer</h3>
          <img src="/src/assets/clock.png" alt="Timer" className="w-32 opacity-80"
            onError={(e) => e.target.src = 'https://cdn-icons-png.flaticon.com/512/2928/2928750.png'} />
        </div>

        {/* Image 3 */}
        <div className="w-64 h-80 rounded-2xl overflow-hidden border-4 border-black shadow-xl bg-white">
          <img src="/src/assets/image2.png" alt="Child" className="w-full h-full object-cover" />
        </div>
      </div>



      {/* --- MAIN DASHBOARD GRID --- */}
      <div className="max-w-[1400px] mx-auto w-full px-6 flex gap-6 items-start">

        {/* === LEFT SIDEBAR (FIXED ALIGNMENT) === */}
        <div className="w-64 bg-[#0F172A] text-white  rounded-lg overflow-hidden shadow-lg flex-shrink-0 flex flex-col py-20">
          {menuItems.map((item, index) => (
            <div key={index} className="flex items-center h-20 w-full group cursor-pointer">

              {/* Left Column: Dot/Icon */}
              <div className="w-[60px] flex justify-center items-center h-full relative">
                {/* Optional: Vertical Line segment to connect dots */}
                {index !== menuItems.length - 1 && (
                  <div className="absolute bottom-0 top-1/2 w-px bg-gray-700 -z-10 h-full"></div>
                )}
                {index !== 0 && (
                  <div className="absolute top-0 bottom-1/2 w-px bg-gray-700 -z-10 h-full"></div>
                )}

                {/* The Dot */}
                <div className={`rounded-full p-1 ${item.active ? 'bg-white' : 'bg-transparent'}`}>
                  <div className={`w-2 h-2 rounded-full ${item.active ? 'bg-black' : 'bg-gray-500'}`}></div>
                </div>
              </div>

              {/* Right Column: Label/Button */}
              <div className="flex-1 pr-6 flex items-center">
                <div className={`w-full py-2 text-lg font-bold tracking-wide transition-all duration-200
                            ${item.active
                    ? 'bg-white text-black text-center rounded shadow-md scale-105'
                    : 'text-white opacity-70 pl-4 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === RIGHT CONTENT AREA === */}
        <div className="flex-grow bg-[#E2E2EA] p-6 rounded-2xl shadow-inner">

          {/* ROW 1: Highlights + Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

            {/* 1. Weekly Highlights Card */}
            <div className="bg-[#4285F4] rounded-2xl text-white overflow-hidden shadow-lg flex flex-col">
              <div className="p-6 flex items-center gap-4">
                <div className="w-14 h-14 bg-yellow-300 rounded-full border-2 border-white flex items-center justify-center overflow-hidden">
                  <img src="/src/assets/user.png" alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">{user?.firstName || 'UserABC'}</h2>
                  <p className="text-xs opacity-90">Age 8 • Grade 3</p>
                  <span className="bg-[#A2E49A] text-[#1a4515] text-[10px] px-2 py-0.5 rounded-full font-bold">Creative Learner</span>
                </div>
              </div>
              <div className="bg-white text-gray-800 p-5 flex-grow flex flex-col justify-center gap-3">
                <h3 className="text-[#4285F4] font-bold mb-1">🏆 This Week's Highlights</h3>
                <div className="flex items-center gap-2 text-sm"><span className="text-yellow-500">⭐</span> Completed <b>{stats.weeklyDoodles}</b> Doodling Sessions</div>
                <div className="flex items-center gap-2 text-sm"><span className="text-yellow-500">☀️</span> Took <b>{stats.weeklyQuizzes}</b> Quizzes</div>
                <div className="flex items-center gap-2 text-sm"><span className="text-yellow-500">⭐</span> Solved <b>{stats.weeklyPuzzles}</b> Puzzles this week</div>

                <div className="mt-4">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>Weekly Learning Goal</span>
                    <span className="text-green-600">{stats.weeklyGoalPercent}% Done</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full">
                    <div className="bg-red-500 h-2 rounded-full" style={{ width: `${stats.weeklyGoalPercent}%` }}></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Great progress this week!</p>
                </div>
              </div>
            </div>

            {/* 2. Bar Chart (Weekly Division) */}
            <div className="bg-gray-200 rounded-2xl p-4 shadow-lg border border-gray-300 flex flex-col">
              <h3 className="text-sm font-bold mb-4 ml-2">Weekly Activity</h3>
              <div className="flex-grow h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="count" fill="#8884d8" barSize={40} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
                <div className="flex items-center gap-1"><div className="w-2 h-2 bg-[#8884d8]"></div> Activities</div>
              </div>
            </div>
          </div>

          {/* ROW 2: Stats Grid + Pie Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">

            {/* 3. Four Small Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card A */}
              <div className="bg-[#EBDAC5] p-4 rounded-xl border border-black/20 shadow-sm relative">
                <div className="text-xs font-bold text-gray-600">Total Drawings</div>
                <div className="text-3xl font-bold mt-1">{stats.totalDoodles}</div>
                <div className="text-[10px] text-green-700 font-bold mt-1">+12% from last week</div>
                <div className="absolute top-2 right-2"><img src="/src/assets/pin.png" w="20" /></div>
              </div>
              {/* Card B */}
              <div className="bg-[#C8E1A5] p-4 rounded-xl border border-black/20 shadow-sm relative">
                <div className="text-xs font-bold text-gray-600">Quizzes Taken</div>
                <div className="text-3xl font-bold mt-1">{stats.totalQuizzes}</div>
                <div className="text-[10px] text-green-700 font-bold mt-1">+12% from last week</div>
                <div className="absolute top-2 right-2"><img src="/src/assets/copy.png" w="20" /></div>
              </div>
              {/* Card C */}
              <div className="bg-[#A9C2E9] p-4 rounded-xl border border-black/20 shadow-sm relative">
                <div className="text-xs font-bold text-gray-600">Puzzles Solved</div>
                <div className="text-3xl font-bold mt-1">{stats.puzzlesSolved}</div>
                <div className="text-[10px] text-green-700 font-bold mt-1">+12% from last week</div>
                <div className="absolute top-2 right-2"><img src="/src/assets/puzzle.png" w="20" /></div>
                {/* --- CAMERA PERMISSION CARD --- */}
                <div className="bg-[#FFE4C4] p-4 rounded-xl border border-black/20 shadow-sm relative mt-4">

                  <h2 className="text-lg font-bold mb-2">Camera Permissions</h2>

                  <p className="text-[15px] mb-2">
                    Allow your child to use the camera for Paper Drawing recognition.
                  </p>

                  <div className="flex gap-3 mt-3">
                    <button
                      onClick={() => updateCameraPermission(true)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      Allow Camera
                    </button>

                    <button
                      onClick={() => updateCameraPermission(false)}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Disable Camera
                    </button>
                  </div>

                  <p className="mt-3 text-sm">
                    Current status:
                    <b className="ml-2">{cameraAllowed ? "Allowed" : "Not Allowed"}</b>
                  </p>
                </div>

              </div>
              {/* Card D */}
              <div className="bg-[#85DCE4] p-4 rounded-xl border border-black/20 shadow-sm relative">

                <h2 className="text-lg font-bold mb-1">Screen Time Control</h2>

                <p className="text-xl">
                  <b>Used Today:</b> {screenTime} min
                </p>

                <p className="text-xl mt-1">
                  <b>Daily Limit:</b> {dailyLimit} min
                </p>

                <div className="mt-4">
                  <label className="block text-sm font-semibold mb-1">Set New Limit (minutes)</label>

                  <input
                    type="number"
                    value={newLimit}
                    onChange={(e) => setNewLimit(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="e.g., 90"
                  />

                  <button
                    onClick={updateLimit}
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-3 hover:bg-blue-700 w-full"
                  >
                    Update Limit
                  </button>
                </div>
              </div>


            </div>

            {/* 4. Pie Chart (Total Doodles) */}
            <div className="bg-gray-200 rounded-2xl p-4 shadow-lg border border-gray-300 flex flex-col items-center justify-center">
              <h3 className="text-sm font-bold self-start mb-2">Total Activity</h3>
              <div className="w-full h-48 relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={40}
                      outerRadius={60}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-xl font-bold">{stats.totalDoodles + stats.totalQuizzes + stats.puzzlesSolved}</span>
                </div>
              </div>
              <div className="text-[16px] flex gap-2 mt-2">
                <span className="text-[#6c68b8]">● Doodles</span>
                <span className="text-[#4eb575]">● Puzzles</span>
                <span className="text-[#dda533]">● Quizzes</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Warning Section */}
      <div className="w-11/12 max-w-5xl mx-auto mt-8 bg-[#D7D3D3] p-6 rounded-lg shadow text-center font-robotoSlab border-l-8 border-yellow-500">
        <p className="text-lg mb-2"><span className="text-red-600 font-bold">⚠️ Warning:</span> Encourage regular breaks for movement, outdoor play, and face-to-face interaction.</p>
        <p className="text-lg"><span className="text-green-600 font-bold">🌟 Good News:</span> Your child is doing amazing! Their creativity is growing.</p>
      </div>



      {/* ✅ === TASK MANAGEMENT SECTION (UPDATED WITH TOGGLE) === */}
      <div className="w-full max-w-6xl mx-auto mt-10 px-6">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">

          {/* Header with Toggle */}
          <div className="bg-[#2C2A4A] px-6 py-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/src/assets/post.png" alt="Task" className="w-6 invert" />
              <h2 className="text-xl font-bold text-white font-orbitron">Task Management</h2>
            </div>

            {/* SLIDER / TOGGLE BUTTONS */}
            <div className="bg-[#0F172A] p-1 rounded-full flex gap-1">
              <button
                onClick={() => setTaskMode('assign')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${taskMode === 'assign' ? 'bg-white text-[#2C2A4A]' : 'text-white hover:bg-white/10'}`}
              >
                Assign New
              </button>
              <button
                onClick={() => setTaskMode('review')}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-all ${taskMode === 'review' ? 'bg-white text-[#2C2A4A]' : 'text-white hover:bg-white/10'}`}
              >
                Review & Appreciate
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="p-8">

            {/* === VIEW 1: ASSIGN TASKS === */}
            {taskMode === 'assign' && (
              <div className="flex flex-col md:flex-row gap-8 animate-fade-in">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-4">Create New Task</h3>
                  <form onSubmit={handleAssignTask} className="space-y-4">

                    {/* === TASK TITLE INPUT WITH AI (UPDATED) === */}
                    <div className="relative" ref={wrapperRef}>
                      <label className="block text-sm font-bold text-gray-600 mb-1">
                        Task Title
                        {aiData && (
                          <span className="ml-2 text-xs font-normal text-[#3B17AB] bg-indigo-50 px-2 py-0.5 rounded-full animate-pulse">
                            ✨ AI Suggestions Ready (Age: {aiData.childAge})
                          </span>
                        )}
                      </label>

                      <div className="relative">
                        <input
                          type="text"
                          className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#3B17AB] outline-none transition"
                          placeholder="Type or pick an AI suggestion..."
                          value={taskTitle}
                          onChange={(e) => setTaskTitle(e.target.value)}
                          onFocus={() => setShowSuggestions(true)}
                          autoComplete="off"
                        />

                        {/* === THE AI DROPDOWN MENU === */}
                        {showSuggestions && aiData?.suggestions && (
                          <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#2C2A4A] to-[#3B17AB] px-4 py-2 text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                              <span>🤖 Recommended for Age {aiData.childAge}</span>
                            </div>

                            {/* List of Suggestions */}
                            {aiData.suggestions.map((word, index) => (
                              <div
                                key={index}
                                onClick={() => handleSelectSuggestion(word)}
                                className="px-4 py-3 cursor-pointer hover:bg-blue-50 border-b border-gray-100 last:border-0 text-gray-700 font-medium transition-colors flex justify-between group"
                              >
                                <span>{word}</span>
                                <span className="text-[#3B17AB] text-sm opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                                  Select
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-600 mb-1">Instructions</label>
                      <textarea
                        className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-[#3B17AB] outline-none transition h-24 resize-none"
                        placeholder="e.g. Use yellow for sand and blue for water..."
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      disabled={assigning}
                      className="bg-[#3B17AB] text-white px-8 py-3 rounded-full font-bold hover:bg-[#2a0f80] transition shadow-lg w-full md:w-auto disabled:opacity-50"
                    >
                      {assigning ? "Assigning..." : "Assign Task to Child"}
                    </button>
                  </form>
                </div>
                <div className="flex-1 bg-blue-50 rounded-xl p-6 flex flex-col justify-center items-center text-center border border-blue-100">
                  <img src="https://cdn-icons-png.flaticon.com/512/4205/4205906.png" alt="Tasks" className="w-32 mb-4 opacity-80" />
                  <h4 className="font-bold text-blue-900">Encourage Creativity!</h4>
                  <p className="text-sm text-blue-700 mt-2 max-w-xs">
                    Assigning specific themes helps focus your child's imagination. Try topics like "Animals", "Space", or "Family".
                  </p>
                </div>
              </div>
            )}

            {/* === VIEW 2: REVIEW TASKS === */}
            {taskMode === 'review' && (
              <div className="animate-fade-in">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Child's Progress</h3>
                <div className="grid grid-cols-1 gap-4">
                  {taskList.length === 0 ? (
                    <p className="text-center text-gray-500 py-8 italic">No tasks assigned yet.</p>
                  ) : (
                    taskList.map(task => (
                      <div key={task._id} className="border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row justify-between items-center gap-4 hover:shadow-md transition bg-gray-50">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-gray-800">{task.title}</h4>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${task.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {task.status === 'completed' ? 'COMPLETED' : 'PENDING'}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                          {task.appreciationMessage && (
                            <p className="text-xs text-purple-600 mt-2 font-medium">✨ Your Message: "{task.appreciationMessage}"</p>
                          )}
                        </div>

                        {/* Action Area */}
                        <div className="flex-shrink-0">
                          {task.status === 'completed' && !task.appreciationMessage ? (
                            activeTaskId === task._id ? (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder="Write something nice..."
                                  className="border rounded px-2 py-1 text-sm outline-none focus:border-purple-500"
                                  value={appreciationMsg}
                                  onChange={(e) => setAppreciationMsg(e.target.value)}
                                />
                                <button
                                  onClick={() => handleSendAppreciation(task._id)}
                                  className="bg-purple-600 text-white px-3 py-1 rounded text-sm font-bold hover:bg-purple-700"
                                >
                                  Send
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setActiveTaskId(task._id)}
                                className="bg-white border-2 border-purple-600 text-purple-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-purple-50 transition"
                              >
                                Send Appreciation 💖
                              </button>
                            )
                          ) : (
                            <div className="text-xs text-gray-400 font-medium italic w-32 text-center">
                              {task.status === 'pending' ? 'Waiting for child...' : 'Message Sent ✅'}
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Parent;