import React from "react";
import FrequementQeustion from "../components/QuestionFrequement/FrequementQeustion";
import HomeHeader from "../components/homePage/HomeHeader";
function Question({ paniernbr }) {
  return (
    <>
      <HomeHeader paniernbr={paniernbr} />
      <FrequementQeustion />
    </>
  );
}

export default Question;
