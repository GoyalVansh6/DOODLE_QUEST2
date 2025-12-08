import React from 'react';

const WelcomePage = () => {
  return (
    <div className="h-screen flex flex-col bg-[#F4EDE6] relative overflow-hidden px-4 py-8">
      
      {/* Gradient Text - Compact */}
      <div>
      <h1 className="
        font-[Orbitron] 
        font-bold 
        text-[28px] 
        sm:text-[35px] 
        md:text-[42px] 
        lg:text-[48px]
        leading-[1.1] 
        tracking-[0.08em] 
        bg-gradient-to-r from-[#170942] to-[rgba(23,9,66,0.57)]


        text-transparent 
        bg-clip-text
        text-center
        mb-2
        
      ">
        DoodleQuest
        


      </h1>

      
      <h2 className="font-[Roboto Slab] font-semibold text-[24px] sm:text-[32px] md:text-[42px] lg:text-[52px] xl:text-[60px] text-black text-center mb-4 leading-[1.1] ">
        LEARNING WITH DOODLING
      </h2>
      </div>

      {/* Image Container - Takes remaining space */}
      <div className="flex-1 w-full flex items-center justify-center min-h-0">
        <img 
          className="max-w-full max-h-full object-contain w-auto h-auto"
          src="images/drawingChildren.PNG" 
          alt="Playful Children" 
        />
      </div>
    </div>

     

  )
}

export default WelcomePage;
