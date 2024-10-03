import React from 'react'
import { useNavigate } from 'react-router-dom';
function WinnerList() {
    const navigate = useNavigate()
    const handleCardClick = (winner) => {
        // Navigate to the test2 page and pass the winner details as state
        navigate('/viewwinner', { state: { winner } });
    };
    const winners = [
        {
          id: 1,
          sup: "st",
          type: "5g GOLD",
          location: ["Ne amma", "Kamareddy", "Telangana"],
          phone: "1234567890",
        },
        {
          id: 2,
          sup: "nd",
          type: "5g GOLD",
          location: ["Ne amma", "Kamareddy", "Telangana"],
          phone: "1234567890",
        },
        {
          id: 3,
          sup: "rd",
    
          type: "55 inch TV",
          location: ["Ne amma", "Kamareddy", "Telangana"],
          phone: "1234567890",
        },
        {
          id: 4,
          sup: "th",
    
          type: "270 Ltr Fridge",
          location: ["Ne amma", "Kamareddy", "Telangana"],
          phone: "1234567890",
        },
      ];
  return (
    <>
        {winners.map((winner) => (
          <div key={winner.id} className="relative cursor-pointer hover:shadow-md" onClick={()=>handleCardClick(winner)}>
            <div className="h-[120px] w-[383px] bg-[#990100] -rotate-3 transform -skew-x-12 rounded-lg absolute shadow-2xl"></div>
            <div className="h-[120px] w-[380px] bg-[#FDDC7D] border-2 border-[#990100] transform -skew-x-12 rounded-lg relative z-10 ">
              <div className="w-full flex justify-around items-center ">
                <div className="skew-x-12">
                  <div>
                    <h1 className="text-[20px] text-[#990100] font-bold text-right">
                      {winner.type}
                    </h1>
                    <h1 className="laila-bold text-[20px] text-left">
                      <span className="text-[54px] font-serif">
                        {winner.id}
                        <sup className="text-[24px] ">{winner.sup}</sup>
                      </span>WINNER
                    </h1>
                  </div>
                </div>
                <div className="laila-medium text-left skew-x-12 mb-5 text-[13px]">
                  {winner.location.map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                  <p>{winner.phone}</p>
                </div>
                <div>
                  <div className="border-2 h-[64px] w-[108px] bg-[#ffedcc] rounded-md skew-x-12 border-[#980d0b] mb-5"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
  )
}

export default WinnerList
