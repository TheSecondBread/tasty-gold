import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
function WinnerList({week}) {
  const navigate = useNavigate()
  const handleCardClick = (winner) => {
    // Navigate to the test2 page and pass the winner details as state
    navigate('/view-winner', { state: { winner } });
  };

  const [winners, setWinners] = useState([])
  // let week = 1

  useEffect(() => {
    fetch(`/api/v1/getwinners?week=${week}&gift_type=gold`)
      .then((resp) => resp.json())
      .then((data) => {
        const fetchedWinners = data["msg"].map((winner, index) => ({
          id: index + 1,
          sup: ["st", "nd", "rd", "th"][index], 
          type: index === 0 ? "5g GOLD" : index === 1 ? "5g GOLD" : index === 2 ? "55 inch TV" : "270 Ltr Fridge",
          location: [winner.name, winner.district, winner.state],
          phone: winner.phone,
          image: index === 0 ? "/coin.png" : index === 1 ? "/coin.png" : index === 2 ? "tv.png" : "fridge.png"
        }));

        setWinners(fetchedWinners)
        console.log(fetchedWinners)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [week])

  return (
    <>
      {winners.map((winner) => (
        <div key={winner.id} className="relative cursor-pointer hover:shadow-md" onClick={() => handleCardClick(winner)}>
          <div className="h-[120px] min-w-[303px] bg-[#990100] -rotate-3 transform -skew-x-12 rounded-lg absolute shadow-2xl"></div>
          <div className="h-[120px] min-w-[300px] bg-[#FDDC7D] border-2 border-[#990100] transform -skew-x-12 rounded-lg relative z-10 ">
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

                  <img className="h-full w-full object-contain" src={winner.image} onError={(e) => { e.target.src = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"; }}
                    alt="Winner"></img>
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
