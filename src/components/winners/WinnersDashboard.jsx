import React from "react";

function WinnersDashboard() {
  return (
    <div>
      <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />
      </div>

      {/* Winners Section */}
      <a href="/winners-by-weeks"><div className="mt-20 md:mt-24 flex px-2 justify-center">
        <div className="flex items-center justify-center md:justify-between md:px-10 w-full max-w-[450px]  h-[163px] md:h-[163px] border-4 border-[#ac0e0b] bg-[#FFEDCC] rounded-[20px] shadow-3xl">
          <img
            src="goldfestoffer.png"
            width={190}
            height={231}
            className="mb-10 md:mb-10"
          ></img>
          <h1 className="laila-bold font-extrabold text-[30px] sm:text-[36px] md:text-[36px] text-center md:text-left custom-text-20">
            WINNERS
          </h1>
        </div>
      </div>
      </a>

      {/* Privacy Policy Section */}
      <a href="privacy-policy" >
      <div className="mt-10 flex justify-center px-2 mb-20">
        <div className="w-full max-w-[450px] h-auto border-4 border-[#ac0e0b] bg-[#FFEDCC] rounded-[20px] p-6 shadow-3xl">
          <h1 className="laila-bold text-[28px] md:text-[36px] text-center">
            Privacy Policy For Tasty Gold Oils
          </h1>
        </div>
      </div>
    </a>

    </div>
  );
}

export default WinnersDashboard;
