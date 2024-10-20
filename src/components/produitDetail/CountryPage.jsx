import React, { useState } from 'react';
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';

export default function CountryPage() {
  const [countryId, setCountryId] = useState(0);
  const [isCountryOpen, setIsCountryOpen] = useState(false)
const handleSubmit = () => {
  setIsCountryOpen(false)
}

  return (
    <div className="max-w-lg mx-auto p-8 bg-[#B17236] rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-white text-center mb-8">Select Your African Country</h1>
      
      <div className="mb-6">
        <label className="block text-white mb-2">Country</label>
        <CountrySelect
        value={countryId}
          onChange={(e) => setCountryId(e.id)}
          placeHolder="Select Country"
          className="border border-[#30A08B] rounded-md p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#30A08B] transition duration-200"
        />
      </div>

      {/* <div className="mb-6">
        <label className="block text-white mb-2">State</label>
        <StateSelect
          countryid={countryId}
          onChange={(e) => setStateId(e.id)}
          placeHolder="Select State"
          className="border border-[#30A08B] rounded-md p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#30A08B] transition duration-200"
        />
      </div>

      <div className="mb-6">
        <label className="block text-white mb-2">City</label>
        <CitySelect
          countryid={countryId}
          stateid={stateId}
          onChange={(e) => console.log(e)}
          placeHolder="Select City"
          className="border border-[#30A08B] rounded-md p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#30A08B] transition duration-200"
        />
      </div>

      <div className="mb-6">
        <label className="block text-white mb-2">Language</label>
        <LanguageSelect
          onChange={(e) => console.log(e)}
          placeHolder="Select Language"
          className="border border-[#30A08B] rounded-md p-3 w-full bg-white focus:outline-none focus:ring-2 focus:ring-[#30A08B] transition duration-200"
        />
      </div> */}
      
      <button onClick={handleSubmit} className="w-full bg-[#30A08B] text-white font-semibold py-3 rounded-md hover:bg-[#B2905F] transition duration-300">
        Soumettre
      </button>
    </div>
  )
}
