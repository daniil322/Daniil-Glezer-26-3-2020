import { City } from "../common/types";

const loadFromStorage = () => {
    var val = localStorage.getItem('favorites')
    return (val) ? JSON.parse(val) : [];
}

const saveToStorage = (val: City) => {
    const saveCitys = loadFromStorage()
    localStorage['favorites'] = JSON.stringify([...saveCitys, val]);
}
const removeFromStorage = (key: string) => {
    let saveCitys = loadFromStorage()
    saveCitys = saveCitys.filter((city: City) => {
        return key !== city.key
    })
    localStorage['favorites'] = JSON.stringify(saveCitys);
}

export default {
    loadFromStorage,
    saveToStorage,
    removeFromStorage
}