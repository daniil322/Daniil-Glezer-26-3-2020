import React from "react";
import { useSelector } from "react-redux";
import { StoreState, City } from "../common/state";
import FavoritePreview from "./FavoritePreview";

interface Props {
  favorites: City[];
  updateFavorites: () => void;
}

const FavoritesList = ({ favorites, updateFavorites }: Props) => {
  const favoritesWeather = useSelector((state: StoreState) => state.favorites);

  return (
    <div className="flex text-center wrap">
      {favoritesWeather.map((weather, i) => {
        return (
          <div key={favorites[i].key}>
            <FavoritePreview
              updateFavorites={updateFavorites}
              weather={weather}
              favorite={favorites[i]}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FavoritesList;
