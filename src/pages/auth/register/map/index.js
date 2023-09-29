import { useMediaQuery } from "@mui/material";
import React from "react";
import IranMap from "./IranMap";
import testData from "./test-data.js";
const InteractiveIranMap = ({
  data = testData,
  height = 400,
  defaultAreasColor = "255,255,255",
  selectedAreaColor = "#00f",
  selectedAreaTextColor = "#fff",
  unselectedAreaTextColor = "#000",
  backgroundColor = "transparent",
  defaultSelectedArea = "tehran",
  setSelected,
  selected,
  setFinalSelect,
  finalSelect
}) => {
  const themeColor = "light";
  const selectAreaHandler = (area) => {
    setSelected((prevState) => ({ ...prevState, selectedArea: area.name }));
  };

  let arr = Object.values(data);
  let max = Math.max(...arr);
  const isMd = useMediaQuery("(min-width:900px)");

  return (
    <div>
      <IranMap
        onClick={selectAreaHandler}
        height={isMd ? height : 300}
        data={data}
        maxValue={max}
        selectedArea={selected.selectedArea}
        defaultAreasColor={themeColor === "dark" ? "0,0,0" : "255,255,255"}
        selectedAreaColor={selectedAreaColor}
        selectedAreaTextColor={selectedAreaTextColor}
        unselectedAreaTextColor={themeColor === "dark" ? "#fff" : "#000"}
        backgroundColor={backgroundColor}
        setFinalSelect={setFinalSelect}
        finalSelect={finalSelect}
      />
    </div>
  );
};

export default InteractiveIranMap;
