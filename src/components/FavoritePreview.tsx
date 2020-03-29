import React from "react";
import { WeatherCondition } from "../common/state";
import { useHistory } from "react-router";
import { getCurrentTheme, iconUrl } from "../services/utils";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import likedHeart from "../assets/imgs/heart.svg";
import StorageService from "../services/storage-service";
import { useSelector } from "react-redux";
import { StoreState, City } from "../common/state";
import { MeasureUnit } from "../common/types";

interface Props {
  weather: WeatherCondition;
  favorite: City;
  updateFavorites: () => void;
}

const FavoritePreview = ({
  weather,
  favorite: { name, key },
  updateFavorites
}: Props) => {
  const history = useHistory();
  const { theme, unit } = useSelector((state: StoreState) => state);

  const showDetails = () => {
    history.push(`/?key=${key}&city=${name}`);
  };

  const removeFromFavorites = () => {
    StorageService.removeFromStorage(key);
    StorageService.loadFromStorage();
    updateFavorites();
  };

  const temperatureValue =
    unit === MeasureUnit.C
      ? Math.floor(weather.temperature.metric.value)
      : Math.floor(weather.temperature.imperial.value);

  return (
    <Card
      style={{
        backgroundColor: theme === "light" ? "white" : "#1a1a1a"
      }}
      variant="outlined"
      className={`favorite-container ${getCurrentTheme(theme)}`}
    >
      <CardContent>
        <p>{name}</p>
        <img src={iconUrl(weather.weatherIcon)} alt="" />
        <p>{`${temperatureValue}${unit}`}</p>
        <CardActions>
          <Button
            style={{ color: theme === "light" ? "" : "#c4c9d7" }}
            onClick={showDetails}
            size="small"
          >
            Show More
          </Button>
          <img
            className="pointer favorite-heart"
            src={likedHeart}
            alt="heart"
            onClick={removeFromFavorites}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default FavoritePreview;
