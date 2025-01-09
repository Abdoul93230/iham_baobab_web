import React from "react";
import SuggestionPage from "../components/suggestion/SuggestionPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Suggestion({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} />
      <SuggestionPage />
    </>
  );
}

export default Suggestion;
