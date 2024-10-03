import React from "react";
import WinnerList from "./WinnerList";

function WinnersTable() {
  const data = [
    { id: 1, name: "Laxmi ", place: "Madnoore", mobile: "1234562654" },
    { id: 2, name: "Laxmi B", place: "Madnoore", mobile: "2234562654" },
    { id: 3, name: "Laxmi C", place: "Madnoore", mobile: "3234562654" },
    { id: 4, name: "Laxmi D", place: "Madnoore", mobile: "4234562654" },
    { id: 5, name: "Laxmi E", place: "Madnoore", mobile: "5234562654" },
    { id: 6, name: "Laxmi F", place: "Madnoore", mobile: "6234562654" },
    { id: 7, name: "Laxmi G", place: "Madnoore", mobile: "7234562654" },
    { id: 8, name: "Laxmi H", place: "Madnoore", mobile: "8234562654" },
    { id: 9, name: "Laxmi I", place: "Madnoore", mobile: "9234562654" },
    { id: 10, name: "Laxmi J", place: "Madnoore", mobile: "0345672654" },
    { id: 11, name: "Laxmi K", place: "Madnoore", mobile: "1345672654" },
    { id: 12, name: "Laxmi L", place: "Madnoore", mobile: "2345672654" },
    { id: 13, name: "Laxmi M", place: "Madnoore", mobile: "3345672654" },
    { id: 14, name: "Laxmi N", place: "Madnoore", mobile: "4345672654" },
    { id: 15, name: "Laxmi O", place: "Madnoore", mobile: "5345672654" },
  ];

  return (
    <div className="px-2 md:px-0">
      <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b] ">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />
      </div>
      {/* gold */}
      <div>
        <h1 className="text-[24px] laila-bold text-center mt-10">
          BUMPER OFFER WINNERS
        </h1>
        <div className="flex justify-center ">
          <div className=" bg-[#FFEDCC] border-4 border-[#980D0B] rounded-lg w-[420px] h-auto  flex flex-col justify-center items-center px-1 gap-10 py-16 ">
            <WinnerList></WinnerList>
          </div>
        </div>
      </div>
      {/* gold end*/}

      <h1 className="text-[24px] laila-bold text-center mt-10">
        SILVER WINNERS
      </h1>
      <div className="overflow-x-auto px-2 laila-medium">
        <table className="min-w-full  mt-4 border-[#990100] border-4 rounded-xl  mb-10 ">
          <thead className="bg-[#FFEDCC]  ">
            <tr className="border-b-2 border-black  laila-bold">
              <th className="border border-[#990100] px-4 py-2 text-center text-black">
                S.No
              </th>
              <th className="border border-[#990100] px-4 py-2 text-center text-black">
                NAME
              </th>
              <th className="border border-[#990100] px-4 py-2 text-center text-black">
                PLACE
              </th>
              <th className="border border-[#990100] px-4 py-2 text-center text-black">
                MOBILE
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr
                key={row.id}
                className="bg-[#ffcf9b] bg-opacity-90  text-black"
              >
                <td className="border-r border-[#990100] px-4 py-2 text-right">
                  {row.id}
                </td>
                <td className="border-r border-[#990100] px-4 py-2">
                  {row.name}
                </td>
                <td className="border-r border-[#990100] px-4 py-2">
                  {row.place}
                </td>
                <td className="border-r border-[#990100] px-4 py-2">
                  {row.mobile}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WinnersTable;
