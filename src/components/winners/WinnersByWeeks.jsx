import React, { useEffect, useState } from 'react'
import WinnerCard from './WinnerCard'
import { useNavigate } from 'react-router-dom';

function WinnersByWeeks() {
  const [weeks, setWeeks] = useState([{ name: 'Coming soon', date: '', week: 0 }])

  useEffect(() => {
    fetch("/api/v1/getwinnerweeks")
      .then(resp => resp.json())
      .then((data) => {
        const formattedWeeks = data["msg"].map(item => {
          const week = item[0]; // First element is the week number
          const date = new Date(item[1]); // Second element is the date string
          const options = { year: 'numeric', month: 'long', day: 'numeric' };
          const formattedDate = date.toLocaleDateString('en-US', options); // Format the date

          // Generate the ordinal suffix for the week number
          const suffix = week === 1 ? 'st' : week === 2 ? 'nd' : week === 3 ? 'rd' : 'th';

          return {
            name: `${week}${suffix} week draw`,
            date: formattedDate,
            week: week
          };
        });

        if (formattedWeeks.length != 0) {

          setWeeks(formattedWeeks); // Store the formatted weeks in state
        }

      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // Empty dependency array means this runs once on mou

  const navigate = useNavigate()

  function handleWinners(week) {
    navigate('/winners', { state: { week } });
  }

  return (
    <div>
      <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />
      </div>
      <div>
        {weeks.map((date) => (
          <div key={date.week} onClick={() => handleWinners(date.week)}>
            <WinnerCard date={date} key={date.name}></WinnerCard>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WinnersByWeeks
