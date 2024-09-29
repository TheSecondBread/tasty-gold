import React from "react";

function Success() {
  return (
    <div>
      <div className="border-4 border-[#ac0e0b] mt-20 rounded-2xl md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer" className="rounded-xl" />
      </div>

      <div className="flex p-4">
  <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
    <div className="px-10 bg-[#FFEDCC] rounded-3xl mt-20 bg-opacity-50 py-10 w-[320px]">
      <h1 className="text-[36px] text-center laila-bold md:text-[32px] sm:text-[28px]">
        Thank you!<br />
        Best of Luck<br />
        Chance to win in<br />
        <span className="font-bold">“GOLD FEST OFFER”</span>
      </h1>
    </div>
  </div>
</div>

    </div>
  );
}

export default Success;
