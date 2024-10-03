import React from 'react'
import { useLocation } from 'react-router-dom';

function ViewWinner() {
    const location = useLocation();
    const { winner } = location.state || {};

  return (
    <div>
        <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
          <img src="offer.jpg" alt="offer image" className="rounded-xl" />
        </div>
        <div className="border-4 border-[#ac0e0b] rounded-2xl mb-3 md:border-8 bg-[#ac0e0b]">
          <img
            src="offerdetails.jpg"
            alt="offer details"
            className="rounded-xl"
          />
        </div>
        <div className='flex flex-col justify-center items-center mt-20 mb-10'>
            <div className='w-[371px] h-[451px] bg-[#FFEDCC] opacity-80 flex justify-center items-center'>
            {/* <img src={`data:image/png;base64,${winner.img}`} alt="Winner" /> */}
              <img src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"></img>
            </div>
            <div className='mt-10 bg-[#FFEDCC] opacity-80 w-[371px] text-center text-[24px] laila-medium'>{winner.type} Winner</div>
            <div className='text-[16px] laila-medium mt-2'>
                {winner.location.map((line)=>(
                    <p key={line} className='text-[24px] laila-medium font-bold text-white'>{line}</p>
                ))}
                    <p  className='text-[24px] laila-medium font-bold text-white'>{winner.phone}</p>
            </div>
        </div>
      
    </div>
  )
}

export default ViewWinner
