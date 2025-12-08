import React from 'react'

const Rewards = () => {
  return (
    <div className="bg-[#FFA500] min-h-screen m-0">
        <div className="ml-14 font-orbitron pt-10 font-bold">
            DoodleQuest
        </div>
        <div className="main flex justify-between items-center">
            <div className="cont text-8xl text-white mr-0 ">
                <p className="mb-11">
                    Congratulations
                </p>
                <p className="mb-11 ml-20">
                     You Earned
                </p>
                <p className="ml-20">
                    <span className="font-bold"> 50 </span>
                    <span> Points </span>
                    <span className="font-bold">!!!</span>
                </p>
                
            </div>
            <div className="img">
                 <img src="/src/assets/deck.png" alt=""  width="800"/>
            </div>
            

        </div>
       
      
    </div>
  )
}

export default Rewards
