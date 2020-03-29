import React from "react";
import { StoreState } from "../common/state";
import { iconUrl } from "../services/utils";
import { City } from "../common/state";
import { useSelector } from "react-redux";
import { MeasureUnit } from "../common/types";

interface Props {
  city: City;
}

const ConditionDetails = ({ city }: Props) => {
  const { currCondition, unit } = useSelector((state: StoreState) => state);

  const temperatureValue = !currCondition.temperature
    ? ""
    : unit === MeasureUnit.C
    ? Math.floor(currCondition.temperature?.metric.value)
    : Math.floor(currCondition.temperature?.imperial.value);
  const weatherIconUrl = currCondition.weatherIcon
    ? iconUrl(currCondition.weatherIcon)
    : "";

  return (
    <div className="flex column justify-center">
      <div className="flex column justify-center curr-condition-container">
        <div className="flex justify-center weather-text">
          <p className="center-self">{city.name}</p>
        </div>
        <div className="flex justify-center curr-weather center-self ">
          <img src={weatherIconUrl} alt="" />
          <p className="center-self ">{`${temperatureValue} ${unit}`}</p>
        </div>
        <div className="flex justify-center weather-text">
          <p> {currCondition.weatherText}</p>
        </div>
      </div>
    </div>
  );
};

export default ConditionDetails;
