import React from "react";

function Home() {
  return (
    <div className="flex justify-center mt-8 laila-light">
      <div className="flex flex-col items-center justify-center">
        <img src="tastygold.png" alt="tasty gold" className="mt-1" width={"50%"} height={"50%"}/>
        {/* <img src="premium.png" alt="premium" width={"40%"} height={"40%"}></img> */}
        {/* <img src="cookingoils.png" alt="cooking oils" width={"30%"} height={"40%"}></img> */}
        <img src="cooking.png" alt="premium" width={"40%"} height={"40%"}></img>

        <img src="sb.png" alt="sb" className="bg-[#92b13f] px-2 mb-4 rounded-md mt-4" width={"75%"} height={"50%"}></img>
        
        <div className="w-full bg-[rgba(172,14,11,0.72)]">
          <h1 className="font-bold text-[40px] text-white text-center">OFFER ENDED! WAIT UNTIL NEXT OFFER.</h1>
        </div>
        
        <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
          <img src="offer.jpg" alt="offer image" className="rounded-xl" />
        </div>

      </div>

    </div>
  );
}

export default Home;
