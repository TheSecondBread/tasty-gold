import React, { useState, useEffect } from "react";
import { useLocation, useNavigate} from "react-router-dom";

function Qr() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [state, setState] = useState("");
  const [place, setPlace] = useState("");
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
      !firstName ||
      !lastName ||
      !phone ||
      !email ||
      !pinCode ||
      !state ||
      !place ||
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
      firstName,
      lastName,
      phone,
      email,
      pinCode,
      state,
      place,
      couponCode,
      comments,
      imageBase64,
    };

    console.log(formData); // Log all form data including the Base64 image

    fetch(`${process.env.REACT_APP_BACKEND_URL}/submit`, {
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
    <div className="flex flex-col items-center bg-gradient-to-b from-[#fdd152] to-[#8d2e12]">
      <div className="flex flex-col items-center justify-center">
        <img src="Home1.png" alt="Home 1" />
        <img src="Home2.png" alt="Home 2" />
        <img src="Home3.png" alt="Home 3" />
      </div>

      {/* Display search parameters in an h3 */}
      {/* <h3 className="mb-5 text-center text-white font-bold">{"Applied coupon: " + searchParams.get("code")}</h3> */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-[400px] px-2"
      >
        <label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
          />
        </label>
        <label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
          />
        </label>
        <label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
          />
        </label>
        <label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
          />
        </label>
        <label>
          <div className="flex gap-1">
            <input
              type="number"
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              placeholder="Pin Code"
              className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
            />
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="State"
              className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
            />
          </div>
        </label>
        <input
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Place"
          className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
        />
        <label>
          <input
            type="text"
            value={couponCode}
            disabled={true}
            placeholder="Coupon Code"
            className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
          />
        </label>
        <div className="flex gap-1">
          <label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              placeholder="Any Comment/Suggestions"
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
                Upload your image with pouch
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
            className="mt-5 p-2 bg-[#42D851] text-white w-[223px] h-[65px] text-[32px] font-bold rounded-full mb-10 shadow-lg active:shadow-none"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default Qr;
