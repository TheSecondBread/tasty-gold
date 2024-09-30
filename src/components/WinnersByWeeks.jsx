import React from 'react'
import WinnerCard from './WinnerCard'

function WinnersByWeeks() {
    const dates = [
        { name: '1st week draw', date: '12 Oct 2024' },
        { name: '2nd week draw', date: '19 Oct 2024' },
        { name: '3rd week draw', date: '26 Oct 2024' }
      ];
      
      
  return (
    <div>
        <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />
      </div>
    <a href='winners'>
    {dates.map((date)=>(
        
        <WinnerCard date={date} key={date.name}></WinnerCard>
    ))}
    </a>
    </div>
  )
}

export default WinnersByWeeks
