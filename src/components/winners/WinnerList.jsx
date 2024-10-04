import React from 'react'
import { useNavigate } from 'react-router-dom';
function WinnerList() {
    const navigate = useNavigate()
    const handleCardClick = (winner) => {
        // Navigate to the test2 page and pass the winner details as state
        navigate('/view-winner', { state: { winner } });
    };
    const winners = [
        {
          id: 1,
          sup: "st",
          type: "5g GOLD",
          location: ["Person 1", "Kamareddy", "Telangana"],
          phone: "1234567890",
          image: "https://www.dexerto.com/cdn-image/wp-content/uploads/2024/04/15/ishowspeed-breaks-setup-24M-subscribers.jpg"
        },
        {
          id: 2,
          sup: "nd",
          type: "5g GOLD",
          location: ["Person 2", "Kamareddy", "Telangana"],
          phone: "1234567890",
          image: "https://res.cloudinary.com/dqzkirtbz/image/upload/w_auto/q_auto,f_auto,dpr_auto/v1698342290/Website/blog/female_portrait_postcrest.jpg"
        },
        {
          id: 3,
          sup: "rd",
    
          type: "55 inch TV",
          location: ["Person 3", "Kamareddy", "Telangana"],
          phone: "1234567890",
          image: "https://www.picsofasia.com/wp-content/uploads/2018/03/Top_intro-north-vietnam.jpg"
        },
        {
          id: 4,
          sup: "th",
    
          type: "270 Ltr Fridge",
          location: ["Person 4", "Kamareddy", "Telangana"],
          phone: "1234567890",
          image: "https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
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
                  <div className="border-2 h-[64px] max-w-[108px] bg-[#ffedcc] rounded-md skew-x-12 border-[#980d0b] mb-5 content-center overflow-hidden">
                    
              <img className="h-full w-full object-contain" src={winner.image}></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
  )
}

export default WinnerList
