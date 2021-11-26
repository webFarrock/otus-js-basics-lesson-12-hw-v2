import axios from "axios";

const API_KEY = "b7b153f94047fd58f7ac795cd03608df";

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

export { getWeather };
