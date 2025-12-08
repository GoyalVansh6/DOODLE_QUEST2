import React, { use, useState } from 'react';
import { useEffect } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useSearchParams } from "react-router-dom";

// import { set } from 'mongoose';
// NOTE: It is best practice to move font imports to your main index.html file.
const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Orbitron:wght@400..900&family=Saira+Stencil+One&family=Roboto+Slab&family=Special+Gothic+Condensed+One&family=Spline+Sans:wght@300..700&display=swap');
    `}
  </style>
);

// Component names in React should be capitalized
function Storytime() {
   const [searchParams] = useSearchParams();
  const storyId = searchParams.get("storyId");
 const [story, setStory] = useState(
`The little bird sang a joyful tune
A sleepy fox dreamt beneath the moon.
The wind whispered secrets through the trees,
As fireflies danced on the evening breeze.
`
);
const [doodle,setDoodle]=useState("sun");
const [language, setLanguage] = useState("english");
const [isPlaying, setIsPlaying] = useState(false);
const [imgurl,setimgurl]=useState("src/assets/storyimg.png");

const { getToken, userId } = useAuth();

const [audioUrl, setAudioUrl] = useState(null);
// useEffect(() => {
//       fetch(`http://localhost:3000/api/story/story?obj=${doodle}&lang=${language}`)
//         .then(res => {
//           console.log(res); return res.json()})
//         .then(data => {setStory(data.story); setimgurl(data.imageurl);})
//                .catch(err => console.error(err));
//     }, [doodle, language]);
// useEffect( ()=>async()=>{
//     const token = await getToken();
//   fetch(`http://localhost:3000/api/story/story`, {
//   headers: {
//     Authorization: `Bearer ${token}`
//   }})
//   .then(res=>res.json()).
//   then(data=>{setStory(data.storyText); setimgurl(data.storyImage);}).catch(err=>console.error(err));
// },[userId]);
useEffect(() => {
  async function fetchStory() {
    const token = await getToken();
    
    const url = storyId
      ? `http://localhost:3000/api/story/story?Id=${storyId}`
      : `http://localhost:3000/api/story/story`; // latest story
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setStory(data.storyText);
        setimgurl(data.storyImage);
      })
      .catch(err => console.error(err));
  }

  fetchStory();
}, [userId]);

useEffect(() => {
 if (!isPlaying) return;
   fetch(`http://localhost:3000/api/audio?story=${encodeURIComponent(story)}`)
    .then(res => res.blob())
    .then(blob => {
      console.log("audio fetching")
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
      const audio = new Audio(url);
      audio.play();
    })
    .catch(err => console.error(err))
    .finally(() => setIsPlaying(false));
},[]);




  return (
    <div>
      <GlobalStyles />
      <nav className="bg-[#081b4f] px-8 py-4 flex items-center justify-between text-white">
        <div className="flex items-center space-x-8">
          <div className="font-['Orbitron'] text-xl">DoodleQuest</div>
        </div>
        <div className="font-['Roboto Slab'] text-4xl">Little Stories</div>
                <div className="flex items-center gap-4">

  {/* Language Selector */}
  <select
    className="bg-[#0b245c] text-white px-3 py-2 rounded-lg font-['Spline Sans']"
    value={language}
    onChange={(e) => setLanguage(e.target.value)}
  >
    <option value="english">English</option>
    <option value="hindi">Hindi</option>
    <option value="punjabi">Punjabi</option>
    <option value="spanish">Spanish</option>
  </select>

  {/* Audio Button */}
  <button
    onClick={() => setIsPlaying(true)}
    className="bg-[#FF5900] px-4 py-2 rounded-lg hover:bg-orange-700 transition text-white font-['Spline Sans']"
  >
    🔊 Audio
  </button>

{/* {audioUrl && (
  <audio controls src={audioUrl} className="w-full" />
)} */}

  {/* Icons */}
  <img src="/src/assets/home-icon.png" alt="Home" className="w-8 h-8" />
  <img src="/src/assets/click.png" className="w-8 h-8 rounded" alt="Back" />
</div>

      </nav>

      <div className="px-4 py-8 bg-[url('/src/assets/storybg.jpg')] min-h-screen flex justify-center items-center bg-cover bg-center">
        
        {/* Story Box */}
        <div className="bg-[#0202028F] p-10 w-full max-w-5xl h-[500px] flex rounded-lg shadow-2xl">
          
          {/* Story Content */}
          <div className="relative text-white font-['Spline Sans'] text-4xl p-8 w-1/2 flex flex-col justify-center">
            <p className="leading-snug md:leading-normal text-xl md:text-3xl whitespace-pre-line">
              {/* The little bird sang a joyful tune.<br />
              A sleepy fox dreamt beneath the moon.<br />
              The wind whispered secrets through the trees,<br />
              As fireflies danced on the evening breeze. */}
             {story}
            </p>
            {/* FIX: Buttons are now positioned reliably at the bottom of the text area */}
            <div className="flex gap-7 mt-auto">
              <button className="bg-[#FF5900] text-xl text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">Bookmark</button>
              <button className="bg-[#FF5900] text-xl text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition">Skip</button>
            </div>
          </div>
          
          {/* Image */}
          <div className="w-1/2 h-full">
            <img src={`${imgurl}`} alt="Story Illustration" className="w-full h-full object-cover rounded-r-lg" />
          </div>

        </div>
      </div>
    </div>
  )
};

export default Storytime;