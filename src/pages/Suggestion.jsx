import React from "react";
import SuggestionPage from "../components/suggestion/SuggestionPage";
import HomeHeader from "../components/homePage/HomeHeader";
function Suggestion({ paniernbr, acces }) {
  return (
    <>
      <HomeHeader acces={acces} paniernbr={paniernbr} />
      <SuggestionPage />
    </>
  );
}

export default Suggestion;
