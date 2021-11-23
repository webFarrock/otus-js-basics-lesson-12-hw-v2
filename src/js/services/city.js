import axios from "axios";

const API_KEY = "330e63a5-aa91-4873-a92c-181ef54c5bc0";
const DEFAULT_USER_COORDS = [40.730885, -73.997383];
const DEFAULT_USER_CITY = "New York, US";

const geocoderApiInstance = axios.create({
  baseURL: "//geocode-maps.yandex.ru/1.x/",
  params: {
    apikey: API_KEY,
    format: "json",
    lang: "ru_RU",
    results: 1,
    kind: "locality",
  },
});

const getCityNameByCoords = async (lat, lng) => {
  try {
    const result = await geocoderApiInstance.get(`/?geocode=${lat},${lng}`);
    return result.data?.response?.GeoObjectCollection?.featureMember[0]?.GeoObject?.name || null;
  } catch (error) {
    console.warn("Error while define user city. Use default city", error);
    return null;
  }
};

const getUserCurrentCoords = async () => {
  let position = null;
  try {
    position = await new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject();
      }
    });

    return [position.coords.latitude, position.coords.longitude];
  } catch (e) {
    console.warn("Error while define user coords. Use default city");
    return DEFAULT_USER_COORDS;
  }
};

const getCurrentCity = async () => {
  const userCoords = await getUserCurrentCoords();
  const userCityName = (await getCityNameByCoords(...userCoords)) || DEFAULT_USER_CITY;
  return userCityName;
};

export { getCurrentCity };
