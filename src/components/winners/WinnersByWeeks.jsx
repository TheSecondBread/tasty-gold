import React from 'react'
import WinnerCard from './WinnerCard'
import { useNavigate } from 'react-router-dom';

function WinnersByWeeks() {
    const dates = [
        { name: '1st week draw', date: '12 Oct 2024', week: 1 },
        { name: '2nd week draw', date: '19 Oct 2024', week: 2 },
        { name: '3rd week draw', date: '26 Oct 2024', week: 3 }
      ];
      const navigate = useNavigate()
    function handleWinners(week){
      navigate('/winners', { state: { week } });
    }
  return (
    <div>
        <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />
      </div>
    <div>
    {dates.map((date)=>(
        <div key={date.week} onClick={()=>handleWinners(date.week)}>
          <WinnerCard date={date} key={date.name}></WinnerCard>
          </div>
    ))}
    </div>
    </div>
  )
}

export default WinnersByWeeks
