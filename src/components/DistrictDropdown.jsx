import React, { useState } from 'react';

const districtNames = [
  "ADILABAD",
  "BHADRADRI KOTHAGUDEM",
  "HANUMAKONDA",
  "HYDERABAD",
  "JAGTIAL",
  "JANGOAN",
  "JAYASHANKAR BHOOPALPALLY",
  "JOGULAMBA GADWAL",
  "KAMAREDDY",
  "KARIMNAGAR",
  "KHAMMAM",
  "KOMARAM BHEEM ASIFABAD",
  "MAHABUBABAD",
  "MAHABUBNAGAR",
  "MANCHERIAL",
  "MEDAK",
  "MEDCHAL-MALKAJGIRI",
  "MULUG",
  "NAGARKURNOOL",
  "NALGONDA",
  "NARAYANPET",
  "NIRMAL",
  "NIZAMABAD",
  "PEDDAPALLI",
  "RAJANNA SIRCILLA",
  "RANGAREDDY",
  "SANGAREDDY",
  "SIDDIPET",
  "SURYAPET",
  "VIKARABAD",
  "WANAPARTHY",
  "WARANGAL",
  "YADADRI BHUVANAGIRI"
];

const DistrictDropdown = () => {
  const [district, setDistrict] = useState('');
  const [filteredDistricts, setFilteredDistricts] = useState(districtNames);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setDistrict(value);
    setFilteredDistricts(
      districtNames.filter(name => name.toLowerCase().includes(value.toLowerCase()))
    );
    setIsDropdownVisible(true); // Show dropdown while typing
  };

  const handleSelectChange = (name) => {
    setDistrict(name); // Set the selected district in the input
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleBlur = () => {
    setTimeout(() => setIsDropdownVisible(false), 100); // Delay hiding to allow click event to register
  };

  return (
    <div className="relative"> {/* Wrap with relative to position dropdown */}
      <input
        type="text"
        value={district}
        onClick={toggleDropdown} // Show dropdown on click
        onChange={handleInputChange}
        onBlur={handleBlur} // Hide dropdown when input loses focus
        placeholder="District*"
        className="w-full border border-gray-300 rounded-md px-2 py-1 h-[63px]"
      />
      {isDropdownVisible && (
        <ul className="absolute z-10 w-full border border-gray-300 bg-white rounded-md mt-1 max-h-60 overflow-auto">
          {filteredDistricts.map((name, index) => (
            <li 
              key={index} 
              onClick={() => handleSelectChange(name)} // Set the selected district and hide dropdown
              className="cursor-pointer hover:bg-gray-200 px-2 py-1"
            >
              {name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DistrictDropdown;
