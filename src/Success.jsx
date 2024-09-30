import React from "react";

function Success() {
  return (
    <div>
      <div className="border-4 border-[#ac0e0b] mt-10 rounded-2xl md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer" className="rounded-xl" />
      </div>

      <div className="flex mt-10 p-4">
        <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
          <div className="px-10 bg-[#FFEDCC] rounded-3xl  bg-opacity-50 py-10 w-[320px]">
            <h1 className="text-[25px] text-center laila-bold md:text-[32px] sm:text-[28px]">
              Thank you!
              <br />
              Best of Luck
              <br />
              Chance to win in
              <br />
              <span className="font-bold">“GOLD FEST OFFER”</span>
            </h1>
          </div>
        </div>
      </div>
      <div>
      <div className="flex flex-col justify-center items-center">
        <img src="tastygold.png" alt="tasty gold" className="mt-2" width={"50%"} height={"50%"}/>
        {/* <img src="premium.png" alt="premium" width={"40%"} height={"40%"}></img>
        <img src="cookingoils.png" alt="cooking oils" width={"30%"} height={"40%"}></img> */}
        
        <img src="cooking.png" alt="premium" width={"30%"} height={"30%"}></img>
        <img src="sb.png" alt="sb" className="bg-[#92b13f] px-2  mb-2 rounded-md mt-3" width={"60%"} height={"40%"}></img>
        </div>
      </div>
    </div>
  );
}

export default Success;
