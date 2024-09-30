import React from 'react'

function WinnerDetailsCard({name}) {
  return (
    <div>
      <div className='w-[406px] h-[40px] bg-[#FFEDCC] border-4 border-[#980D0B] rounded-[9px] text-center'>
        {name}
      </div>
    </div>
  )
}

export default WinnerDetailsCard
