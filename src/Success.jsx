// import React from "react";

// function Success() {
//   return (
//     <div className="flex justify-center items-center">
//       <div className="flex flex-col items-center justify-center">
//         <img src="Home1.jpg" alt="Home 1" className="mt-10" />
//         <div></div>
//         <div className="px-10 bg-[#FFEDCC] rounded-3xl mt-20 bg-opacity-50 py-10">
//           <h1 className="text-[36px] text-center laila-bold ">
//             Thank you!<br></br> Best of Luck <br></br>Chance to win in
//           </h1>
//           <h1 className="text-[36px] laila-bold text-nowrap">“GOLD FEST OFFER”</h1>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Success;
import React from "react";

function Success() {
  return (
    <div>
      <div className="border-4 border-[#ac0e0b] mt-20 rounded-2xl md:border-8 bg-[#ac0e0b]">
        <img src="Home1.jpg" alt="Home 1" className="rounded-xl" />
      </div>

      <div className="flex p-4">
  <div className="flex flex-col items-center justify-center w-full max-w-lg mx-auto">
    <div className="px-10 bg-[#FFEDCC] rounded-3xl mt-20 bg-opacity-50 py-10">
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
