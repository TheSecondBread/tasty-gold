import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";

function Qr() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [place, setPlace] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [comments, setComments] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate()

  // Extracting search parameters from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Set coupon code from URL parameters
  useEffect(() => {
    const codeFromParams = searchParams.get("code");
    if (codeFromParams) {
      setCouponCode(codeFromParams);
    }
  }, [location.search]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImageBase64(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (
      !name ||
      !phone ||
      !pinCode ||
      !place ||
      !district ||
      !state ||
      !couponCode ||
      !comments ||
      !imageBase64
    ) {
      alert("All fields are required")
      return;
    }
    else if(phone.length != 10){
      alert("Phone number must be of 10 digits")
      return;
    }


    const formData = {
      name,
      phone,
      place,
      district,
      pinCode,
      state,
      comments,
      imageBase64,
      couponCode,
    };

    console.log(formData); // Log all form data including the Base64 image

    fetch(`/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("Success:", data);
        if(data["msg"] === "success"){
          // alert("Form submission successful")
          navigate("/success")
        }
        else if(data["msg"] === "invalid coupon"){
          alert("Invalid or incorrect coupon")
        }
        else if(data["msg"] === "coupon already exists"){
          alert("This coupon was already used")
        }
        else{
          alert("Failed to submit form")
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="flex flex-col items-center laila-light">
      <div className="flex flex-col items-center justify-center  md:px-20">
        <div className="border-4 border-[#ac0e0b] mt-4 rounded-2xl mb-2 md:border-8 bg-[#ac0e0b]">
        <img src="offer.jpg" alt="offer image" className="rounded-xl" />

        </div>
        <div  className="border-4 border-[#ac0e0b] rounded-2xl mb-3 md:border-8 bg-[#ac0e0b]">
        <img src="offerdetails.jpg" alt="offer details" className="rounded-xl"/>
        </div>
        <div className="flex flex-col justify-center items-center">
        <img src="tastygold.png" alt="tasty gold" className="mt-1" width={"40%"} height={"40%"}/>
        <img src="premium.png" alt="premium" width={"40%"} height={"40%"}></img>
        <img src="cookingoils.png" alt="cooking oils" width={"30%"} height={"40%"}></img>
        <img src="sb.png" alt="sb" className="bg-[#92b13f] px-2 mb-4 rounded-md mt-4" width={"60%"} height={"40%"}></img>
        </div>
        
      </div>
      <label>
          <input
            type="text"
            value={couponCode}
            disabled={true}
            placeholder="Coupon Code"
            className="w-full border border-gray-300 rounded-md px-2 py-1 h-[30px]  min-w-[300px] max-w-[400px] bg-white mb-8  text-center"
          />
        </label>
      <h3 className="mb-5 text-center text-white font-bold text-2xl">Fill The Details</h3>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-[400px] px-2 text-base"
      >
        <label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name*"
            className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
          />
        </label>
        <label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone*"
            className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
          />
        </label>
        <label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Place*"
          className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
        />
        </label>
        <label>
        <input
          type="text"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          placeholder="District*"
          className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
        />
        </label>
        <label>
          <div className="flex gap-1">
            <input
              type="number"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="Pin Code*"
              className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State*"
              className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
            />
          </div>
        </label>


        <div className="flex gap-1">
          <label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Any Comment/Suggestions*"
              className="w-[220px] border border-gray-300 rounded-md px-2 py-1 h-[143px]"
            />
          </label>
          <div className="relative w-full h-[143px] border border-gray-300 rounded-md bg-white flex items-center justify-center">
            {/* File input */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center text-center">
              <img
                src="upload.png"
                alt="Upload Icon"
                className="h-10 w-10 mb-2"
              />
              <span className="text-gray-500 text-sm">
                Upload your image with pouch*
              </span>
            </div>
          </div>
        </div>

        {imagePreview && (
          <div className="mt-5 flex justify-center">
            <img
              src={imagePreview}
              alt="Uploaded"
              className="w-full max-w-[200px] h-auto"
            />
          </div>
        )}

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-5 p-2 bg-white text-black w-[223px] h-[65px] text-[32px] font-bold rounded-[43px] mb-10 shadow-3xl active:shadow-none border-1 border-black m-plus-2-font"
          >
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
}

export default Qr;
