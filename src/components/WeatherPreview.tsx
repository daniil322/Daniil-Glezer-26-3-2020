import React from "react";
import { NewWeatherForcast, StoreState } from "../common/state";
import { useSelector } from "react-redux";
import { MeasureUnit } from "../common/types";
import { celsiusToFahrenheit, getDateFormat, iconUrl } from "../services/utils";

interface Props {
  forcast: NewWeatherForcast;
  addedDays: number;
}

const WeatherPreview = ({
  forcast: {
    temperature: { maximum, minimum },
    day,
    night
  },
  addedDays
}: Props) => {
  const { unit } = useSelector((state: StoreState) => state);

  const maxValue =
    unit === MeasureUnit.C
      ? Math.floor(maximum.value)
      : celsiusToFahrenheit(maximum.value);
  const minValue =
    unit === MeasureUnit.C
      ? Math.floor(minimum.value)
      : celsiusToFahrenheit(minimum.value);

  return (
    <div>
      <p>{getDateFormat(addedDays)}</p>
      <div className="flex justify-center">
        <p className="unit-value"> {maxValue + unit}</p>
        <img src={iconUrl(day.icon)} alt="" />
      </div>
      <div className="flex justify-center">
        <p className="unit-value">{minValue + unit}</p>
        <img src={iconUrl(night.icon)} alt="" />
      </div>
    </div>
  );
};

export default WeatherPreview;
