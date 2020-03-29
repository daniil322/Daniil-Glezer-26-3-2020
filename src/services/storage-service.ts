import { City } from "../common/state";

const loadFromStorage = () => {
  var val = localStorage.getItem("favorites");
  return val ? JSON.parse(val) : [];
};

const saveToStorage = (val: City) => {
  const savedCities = loadFromStorage();
  localStorage.setItem("favorites", JSON.stringify([...savedCities, val]));
};

const removeFromStorage = (key: string) => {
  let savedCities = loadFromStorage();
  savedCities = savedCities.filter((city: City) => {
    return key !== city.key;
  });
  localStorage.setItem("favorites", JSON.stringify(savedCities));
};

export default {
  loadFromStorage,
  saveToStorage,
  removeFromStorage
};
