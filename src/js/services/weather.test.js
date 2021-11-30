import axios from "axios";
import { API_KEY, createIconImage, getWeather, WEATHER_BASE_URL } from "./weather";

jest.mock("axios");

describe("weather", () => {
  it("createIconImage", () => {
    const iconId = "my-icon";
    const elem = createIconImage(iconId);

    expect(elem).toBeTruthy();
    expect(elem.nodeName).toEqual("IMG");
    expect(elem.src).toContain(iconId);
  });

  it("getWeather", async () => {
    const resp = { data: { fake: "fake" } };
    const cityName = "London";

    axios.get.mockResolvedValue(resp);

    const result = await getWeather(cityName);
    expect(result).toBeTruthy();

    expect(axios.get).toHaveBeenCalledWith("", {
      baseURL: WEATHER_BASE_URL,
      params: {
        q: cityName,
        apikey: API_KEY,
      },
    });
  });
});
