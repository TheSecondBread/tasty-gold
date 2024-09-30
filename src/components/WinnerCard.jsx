import React from "react";

function WinnerCard({date}) {
  return (
    <div className="cursor-pointer">
        
      <div className="mt-20 md:mt-24 flex px-2 justify-center">
        <div className="flex items-center justify-center md:justify-between md:px-10 w-full max-w-[450px]  h-[163px] md:h-[163px] border-4 border-[#ac0e0b] bg-[#FFEDCC] rounded-[20px] shadow-3xl">
          <img
            src="goldfestoffer.png"
            width={190}
            height={231}
            className="mb-10 md:mb-10"
          ></img>
          <div className="text-center">
            <h1 className="laila-bold font-extrabold text-[24px] sm:text-[28px] md:text-[28px] text-center text-nowrap custom-text-14">
            {date.name}
            </h1>
            <p className="text-[18px] laila-bold custom-text-14">{date.date}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WinnerCard;
