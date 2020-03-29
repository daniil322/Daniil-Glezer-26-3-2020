import React from "react";
import likedHeart from "../assets/imgs/heart.svg";
import heart from "../assets/imgs/heart-like.svg";
import storageService from "../services/storage-service";
import { checkCity } from "../services/utils";
import Snackbar from "@material-ui/core/Snackbar";
import { useState } from "react";
import { City } from "../common/state";

interface Props {
  city: City;
  updateFavorite: (key: string) => void;
  isFavorite: boolean;
}

const TimeBar = ({ city, updateFavorite, isFavorite }: Props) => {
  const [modalState, setModalState] = useState("");

  const saveToFavorites = () => {
    const isFavorite = checkCity(city.key);
    setModalState("");
    if (isFavorite) {
      storageService.removeFromStorage(city.key);
      setModalState("The city has been removed");
    } else {
      storageService.saveToStorage(city);
      setModalState("The city has been added");
    }
    updateFavorite(city.key);
  };

  const favoriteImg = isFavorite ? likedHeart : heart;
  const removeModal = () => setModalState("");
  const isModalOpen = modalState ? true : false;
  const currTime = `${new Date().toLocaleString()}`;

  return (
    <div>
      <div className="current-date flex justify-center align-center">
        {currTime}
        <img
          className="pointer"
          src={favoriteImg}
          alt="heart"
          onClick={saveToFavorites}
        />
      </div>
      <Snackbar
        autoHideDuration={1200}
        open={isModalOpen}
        onClose={removeModal}
        message={modalState}
      />
    </div>
  );
};

export default TimeBar;
