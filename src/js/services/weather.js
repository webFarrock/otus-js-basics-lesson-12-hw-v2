import axios from "axios";

const API_KEY = "b7b153f94047fd58f7ac795cd03608df";
const ICON_BASE_PATH = "//openweathermap.org/img/wn/";

const weatherApiInstance = axios.create({
  baseURL: "//api.openweathermap.org/data/2.5/weather",
  params: {
    apikey: API_KEY,
  },
});

/**
 * @param {String} cityName
 * @return {Promise<null|any>}
 */
const getWeather = async (cityName) => {
  try {
    const result = await weatherApiInstance.get(`?q=${cityName}`);
    return result.data;
  } catch (e) {
    console.warn(`Error while fetch weather for city "${cityName}"`, e);
    return null;
  }
};

/**
 * @param {String} icon
 * @return {HTMLImageElement}
 */
const createIconImage = (icon) => {
  const iconImg = document.createElement("img");
  iconImg.src = `${ICON_BASE_PATH}${icon}@2x.png`;
  return iconImg;
};

export { getWeather, createIconImage };
