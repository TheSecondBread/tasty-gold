import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

function GenerateWinners() {
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [week, setWeek] = useState();
  const [token, setToken] = useState();

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!fromDate || !toDate || !week || !token) {
      alert("All fields are required");
      return;
    } else if (fromDate == "") {
      alert("from date is not valid");
      return;
    } else if (toDate == "") {
      alert("to date is not valid");
    }

    const formData = {
      start_date: fromDate,
      end_date: toDate,
      week: parseInt(week),
      limit: 50,
      token: token,
    };

    // console.log(formData); // Log all form data including the Base64 image
    setLoading(true)
    setTimeout(() => {
      navigate("/winners-dashboard");
    }, 30000);

    // fetch(`/api/v1/generatewinners`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // console.log("Success:", data);
    //     if (data["msg"] === "success") {
    //       // alert("Form submission successful")
    //       navigate("/winners-dashboard");
    //     } else if (data["msg"] === "invalid token") {
    //       alert("Token is not valid");
    //     } else if (data["msg"] === "winners for this week were already chosen") {
    //       alert("Winners for this week were already chosen")
    //     }
    //     else {
    //       alert("Failed to submit form");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  return (
    <div>
      <div className="flex flex-col items-center laila-light">
        <div className="flex flex-col items-center justify-center  md:px-20">
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
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-[400px] px-2 text-base"
        >
          <label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              placeholder="From date*"
              className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
            />
          </label>
          <label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              placeholder="To date*"
              className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
            />
          </label>
          <label>
            <input
              type="number"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
              placeholder="Week: 1, 2, 3,...*"
              className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
            />
          </label>
          <label>
            <input
              type="password"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Put your auth token here*"
              className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
            />
          </label>

          <div className="flex justify-center">
            {loading == false ? (
              <button
                type="submit"
                className="mt-5 p-2 bg-white text-black w-[223px] h-[65px] text-[24px] font-bold rounded-[43px] mb-10 shadow-3xl active:shadow-none border-1 border-black m-plus-2-font"
              >
                LUCKY DRAW
              </button>
            ) : (
              <Loader />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default GenerateWinners;
