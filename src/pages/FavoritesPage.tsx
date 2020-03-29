import React, { useEffect, useState } from "react";
import storageService from "../services/storage-service";
import { useDispatch } from "react-redux";
import { getFavorites } from "../actions/weather-action";
import FavoritesList from "../components/FavoritesList";

const FavoritesPage = () => {
  const dispatch = useDispatch();
  const [favorites, setFavorites] = useState(storageService.loadFromStorage());

  const updateFavorites = async () => {
    const favorites = storageService.loadFromStorage();
    await dispatch(getFavorites(favorites));
    setFavorites(favorites);
  };

  useEffect(() => {
    dispatch(getFavorites(favorites));
  }, [favorites, dispatch]);

  return (
    <div>
      <FavoritesList updateFavorites={updateFavorites} favorites={favorites} />
    </div>
  );
};

export default FavoritesPage;
