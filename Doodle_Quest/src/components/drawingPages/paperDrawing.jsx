// import { useEffect, useRef,useState } from 'react';

// function PaperDrawing() {

// const videoRef=useRef(null);
//   const [stream, setStream] = useState(null);
//   const [cameraOn, setCameraOn] = useState(false);
//   const startCamera = async () => {
//    const video = videoRef.current;
   
//    if(!video) return;

//    try {
//       const newStream =await navigator.mediaDevices.getUserMedia({ video: true })
         
//             video.srcObject = newStream;
//              setStream(newStream);
//       setCameraOn(true);
       
         
//    }catch(err) {
//       console.error("Error accessing camera: ", err);
//       alert("Could not access the camera. Please check permissions.");
//    }
//   };
//     const stopCamera = () => {
//     if (stream) {
//       stream.getTracks().forEach((track) => track.stop());
//       setStream(null);
//       setCameraOn(false);
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       if (stream) {
//         stream.getTracks().forEach((track) => track.stop());
//       }
//     };
//   }, [stream]);

//   return (
//     <div className="min-h-screen bg-[#E8FFE8]">
//       {/* Navbar */}
//       <div className="bg-[#08031B] px-8 py-4 flex items-center justify-between">
//         <div className="flex items-center space-x-8">
          
//           <div className="font-['Orbitron'] text-xl text-white">DoodleQuest</div>
//         </div>
//         <div className="font-['Saira Stencil One'] text-4xl text-white">Paper Doodles</div>
//         <div className="flex items-center space-x-4">
//           {/* Home icon*/}
//           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//             <img src="/src/assets/home-icon.png" alt="Home" className="w-full h-full" />
//           </div>
//           {/* Back arrow icon */}
//           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//            <img src="/src/assets/click.png" className="w-8 h-8 rounded" alt="Back" />
//           </div>
//         </div>
//       </div>

//       {/* Main Content Area */}
//       <div className="px-8 py-8 bg-[url(/src/assets/paperbg.png)]  min-h-screen bg-cover bg-left-top">
//         <div className="flex gap-8">
//           {/* Left Side - Camera Feed */}
//           <div className="flex-1">
//             <div className="flex items-center gap-3 mb-4">
//               <h1 className="text-3xl font-['Orbitron'] text-gray-800">CAMERA FEED</h1>
//               {/* Camera icon  */}
//               <img src="/src/assets/camera.png" alt="Camera" className="w-8 h-8" />
//             </div>
//             <div className="bg-white h-96 w-[800px] border-2 border-black rounded-lg mb-4 flex items-center justify-center text-gray-500">
//               <video ref={videoRef} autoPlay className="w-full h-full object-cover rounded-lg" />
//             </div>
//             <button className="bg-[#E41111] px-6 py-2 rounded-full text-white font-semibold flex items-center gap-2"  onClick={cameraOn ? stopCamera : startCamera}>
//               <div className="w-4 h-4 bg-white rounded-sm"></div>
//               ON/OFF
//             </button>
//           </div>

//           {/* Right Side - Images */}
//           <div className="flex-1 relative">
           

//             {/* Family Image Placeholder */}
//             <div className="absolute top-60 right-24 w-11/12 h-48 rounded-lg flex items-center justify-center text-gray-500 text-sm">
//               <img src="/src/assets/FamilyTable.png" alt="Family at Table" className="relative top-2"></img>
//             </div>
            
//             {/* Date Dropdown */}
//             <div className="absolute bottom-0 right-0">
//               <select className="bg-white border border-gray-300 rounded px-3 py-2 text-sm absolute top-52 right-2">
//                 <option>Select Date</option>
//               </select>
//             </div>
//           </div>
//         </div>
//         </div>


//       <div>
//         <div className="mt-12 ml-36">
//           <div className="flex items-center gap-3 mb-6">
//             <h1 className="text-3xl font-['Orbitron'] text-gray-800">To-Do's</h1>
//             {/*  To Do icon  */}
//             <div className="w-6 h-6 bg-gray-600 rounded">
//               <img src="/src/assets/todo.png" alt="To Do" className=" rounded w-8 h-8" />
//               </div>
//           </div>
          
//           <div className="bg-white rounded-lg shadow-lg overflow-hidden w-[90%] ">
           
//             <div className="w-full">
//             <table className="w-full">
//               <thead className="bg-[#BAF7C3]">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">SR. No.</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Assigned Tasks</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Update</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-gray-300">
//                 <tr>
//                   <td colSpan="4" className="px-6 py-12 text-center text-gray-500 w-9 h-56">
//                     No tasks assigned yet
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//             </div>
            
//           </div>
//         </div>
//       </div>
       
//     </div>
//   );
// }

// export default PaperDrawing;

import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@clerk/clerk-react'; // ✅ ADDED
import axios from 'axios'; // ✅ ADDED

function PaperDrawing() {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);

  // ✅ NEW: State for Tasks
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = "child123";
  // --- Camera Logic (Unchanged) ---
  const startCamera = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = newStream;
      setStream(newStream);
      setCameraOn(true);
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("Could not access the camera. Please check permissions.");
    }
  };

  const checkPermissionAndStart = async () => {
  try {
    const res = await fetch(`http://localhost:3000/api/camera/${userId}`);
    const { cameraAllowed } = await res.json();

    if (!cameraAllowed) {
      alert("Camera access disabled by your parent.");
      return; 
    }

    startCamera();  // only run if allowed
  } catch (err) {
    console.error(err);
  }
};
// useEffect(() => {
//   checkPermissionAndStart() ;
// })


    const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setCameraOn(false);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  //  Fetch Tasks from Backend on Load
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const response = await axios.get('http://localhost:3000/api/tasks/my-tasks', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(response.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [getToken]);

  //: Function to Mark Task as Complete
  const handleCompleteTask = async (taskId) => {
    try {
      const token = await getToken();
      await axios.put(`http://localhost:3000/api/tasks/complete/${taskId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Update the UI instantly
      setTasks(prevTasks => 
        prevTasks.map(task => 
          task._id === taskId ? { ...task, status: 'completed' } : task
        )
      );
      alert("Task completed! Great job!");
    } catch (err) {
      console.error("Error completing task:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="min-h-screen bg-[#E8FFE8]">
      {/* Navbar */}
      <div className="bg-[#08031B] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <div className="font-['Orbitron'] text-xl text-white">DoodleQuest</div>
        </div>
        <div className="font-['Saira Stencil One'] text-4xl text-white">Paper Doodles</div>
        <div className="flex items-center space-x-4">
          {/* Home icon*/}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <img src="/src/assets/home-icon.png" alt="Home" className="w-full h-full" />
          </div>
          {/* Back arrow icon */}
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <img src="/src/assets/click.png" className="w-8 h-8 rounded" alt="Back" />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-8 py-8 bg-[url(/src/assets/paperbg.png)] min-h-screen bg-cover bg-left-top">
        <div className="flex gap-8">
          {/* Left Side - Camera Feed */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h1 className="text-3xl font-['Orbitron'] text-gray-800">CAMERA FEED</h1>
              {/* Camera icon  */}
              <img src="/src/assets/camera.png" alt="Camera" className="w-8 h-8" />
            </div>
            <div className="bg-white h-96 w-[800px] border-2 border-black rounded-lg mb-4 flex items-center justify-center text-gray-500">
              <video ref={videoRef} autoPlay className="w-full h-full object-cover rounded-lg" />
            </div>
            <button className="bg-[#E41111] px-6 py-2 rounded-full text-white font-semibold flex items-center gap-2"  onClick={cameraOn ? stopCamera : checkPermissionAndStart}>
              <div className="w-4 h-4 bg-white rounded-sm"></div> 
              ON/OFF
            </button>
          </div>

          {/* Right Side - Images */}
          <div className="flex-1 relative">
            {/* Family Image Placeholder */}
            <div className="absolute top-48 right-24 w-11/12 h-48 rounded-lg flex items-center justify-center text-gray-500 text-sm">
              <img src="/src/assets/FamilyTable.png" alt="Family at Table" className="relative top-2" />
            </div>
            
            {/* Date Dropdown */}
            <div className="absolute bottom-0 right-0">
              <select className="bg-white border border-gray-300 rounded px-3 py-2 text-sm absolute top-52 right-2">
                <option>Select Date</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mt-12 ml-36">
          <div className="flex items-center gap-3 mb-6">
            <h1 className="text-3xl font-['Orbitron'] text-gray-800">To-Do's</h1>
            {/* To Do icon */}
            <div className="w-6 h-6 bg-gray-600 rounded">
              <img src="/src/assets/todo.png" alt="To Do" className="rounded w-8 h-8" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg w-[90%] flex flex-col border border-gray-200">
            
            {/* ✅ SCROLL WRAPPER: This makes the list scrollable */}
            <div className="overflow-y-auto max-h-64 custom-scrollbar">
              
              <table className="w-full text-left border-collapse relative">
                
                {/* ✅ STICKY HEADER: Keeps the green header visible while scrolling */}
                <thead className="bg-[#BAF7C3] sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">SR. No.</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Assigned Tasks</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Update</th>
                  </tr>
                </thead>

                <tbody className="bg-gray-300">
                  {loading ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500 w-9 h-56">
                        Loading tasks...
                      </td>
                    </tr>
                  ) : tasks.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-gray-500 w-9 h-56">
                        No tasks assigned yet
                      </td>
                    </tr>
                  ) : (
                    tasks.map((task, index) => (
                      <tr key={task._id} className="border-b border-gray-200 bg-white hover:bg-blue-50 transition">
                        <td className="px-6 py-4 text-left text-sm text-gray-700 font-medium">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 text-left text-md text-gray-800">
                          <div className="font-bold">{task.title}</div>
                          <div className="text-xs text-gray-700">{task.description}</div>
                        </td>
                        <td className="px-6 py-4 text-left text-sm text-gray-700">
                          {task.status === 'completed' ? (
                            <span className="text-green-700 font-bold bg-green-100 px-2 py-1 rounded-xl text-sm">Completed</span>
                          ) : (
                            <span className="text-red-600 font-bold bg-red-100 px-2 py-1 rounded-xl text-sm">Pending</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-left text-sm text-gray-700">
                          {task.status !== 'completed' ? (
                            <button 
                              onClick={() => handleCompleteTask(task._id)}
                              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition shadow-sm"
                            >
                              Done
                            </button>
                          ) : (
                            <span>✅</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  );
}

export default PaperDrawing;