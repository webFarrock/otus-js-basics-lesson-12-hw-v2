import axios from "axios";

const API_KEY = "b7b153f94047fd58f7ac795cd03608df";
const WEATHER_BASE_URL = "//api.openweathermap.org/data/2.5/weather";
const ICON_BASE_PATH = "//openweathermap.org/img/wn/";

/**
 * @param {String} cityName
 * @return {Promise<null|any>}
 */
const getWeather = async (cityName) => {
  try {
    const result = await axios.get("", {
      baseURL: WEATHER_BASE_URL,
      params: {
        q: cityName,
        apikey: API_KEY,
      },
    });
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

export { getWeather, createIconImage, API_KEY, WEATHER_BASE_URL };
