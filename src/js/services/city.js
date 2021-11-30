import axios from "axios";

const GEO_JS_GET_PATH = "https://get.geojs.io/v1/ip/geo.json";

const getCurrentCity = async () => {
  try {
    const res = await axios.get(GEO_JS_GET_PATH);
    return res.data.city;
  } catch (e) {
    console.error(`error while get geo js data: `, e);
    return null;
  }
};

export { getCurrentCity, GEO_JS_GET_PATH };
