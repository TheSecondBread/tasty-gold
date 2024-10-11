import React, { useEffect, useState } from "react";
import WinnerList from "./WinnerList";
import { useLocation } from "react-router-dom";

function WinnersTable() {
  const location = useLocation();
  const { week } = location.state || {};

  const [winners, setWinners] = useState([])
  const [flag, setFlag] = useState(false)

  useEffect(()=>{
    fetch(`/api/v1/getwinners?week=${week}&gift_type=silver`)
    .then((resp)=>resp.json())
    .then((data)=>{
      setWinners(data["msg"])
      console.log(winners)
    })
    .catch((err)=>{
      console.log(err)
    })
  }, [week])
  

  return (
    <div className="px-2 md:px-0">
      <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b] ">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />
      </div>

      <h1 className="text-[24px] laila-bold text-center mt-10">
        SILVER WINNERS
      </h1>
      <div className="laila-medium">
  {/* Full table for all screens, but with adjustments for smaller screens */}
  <table className="min-w-full mt-4 border-[#990100] border-4 rounded-xl mb-10">
    <thead className="bg-[#FFEDCC]">
      <tr className="border-b-2 border-black laila-bold">
        <th className="border border-[#990100] px-2 py-1 text-center text-black text-sm sm:text-base">
          S.No
        </th>
        <th className="border border-[#990100] px-2 py-1 text-center text-black text-sm sm:text-base">
          NAME
        </th>
        <th className="border border-[#990100] px-2 py-1 text-center text-black text-sm sm:text-base">
          PLACE
        </th>
        <th className="border border-[#990100] px-2 py-1 text-center text-black text-sm sm:text-base">
          MOBILE
        </th>
      </tr>
    </thead>
    <tbody>
      {winners.map((row, i) => (
        <tr
          key={i + 1}
          className="bg-[#ffcf9b] bg-opacity-90 text-black"
        >
          <td className="border-r border-[#990100] px-2 py-1 text-right text-sm sm:text-base">
            {i + 1}
          </td>
          <td className="border-r border-[#990100] px-2 py-1 text-sm sm:text-base">
            {row.name}
          </td>
          <td className="border-r border-[#990100] px-2 py-1 text-sm sm:text-base">
            {row.district}
          </td>
          <td className="border-r border-[#990100] px-2 py-1 text-sm sm:text-base">
            {row.phone}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

      {/* gold */}
      <div>
        <h1 className="text-[24px] laila-bold text-center mt-10">
          BUMPER OFFER WINNERS
        </h1>
        <div className="flex justify-center ">
          <div className=" bg-[#FFEDCC] border-4 border-[#980D0B] rounded-lg w-[420px] h-auto  flex flex-col justify-center items-center px-1 gap-10 py-16 ">
            <WinnerList week={week}></WinnerList>
          </div>
        </div>
      </div>
      {/* gold end*/}

    </div>
  );
}

export default WinnersTable;
