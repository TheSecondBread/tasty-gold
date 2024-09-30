import React from 'react';
import WinnerPhotoCard from './WinnerPhotoCard';
import WinnerDetailsCard from './WinnerDetailsCard';

function Winners() {
  const winners = [
    { name: 'a' },
    { name: 'b' },
    { name: 'c' },
    { name: 'd' }
  ];
  const commonWinners = [
    { name: 'Alice' },
    { name: 'Bob' },
    { name: 'Charlie' },
    { name: 'David' },
    { name: 'Eve' },
    { name: 'Frank' },
    { name: 'Grace' },
    { name: 'Hannah' },
    { name: 'Ivy' },
    { name: 'Jack' }
];


  return (
    <div>
      <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />
      </div>
      <div className="mt-10 px-2 grid grid-cols-2 gap-4">
        {winners.map((winner) => (
          <WinnerPhotoCard key={winner.name} />
        ))}
      </div>
      <div className='flex justify-center mt-10 flex-col items-center gap-2 mb-10'>
        {commonWinners.map((comm)=>(
        <WinnerDetailsCard key={comm.name} name={comm.name}></WinnerDetailsCard>

        ))}
      </div>
    </div>
  );
}

export default Winners;
