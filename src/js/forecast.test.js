import { initApp } from "./forecast";
import {
  getHistoryContainer,
  getMapContainer,
  getSearchBtn,
  getSearchInput,
  getWeatherResultBLock,
} from "./services/markup";

const weatherMockData = {
  London: {
    coord: {
      lon: -0.1257,
      lat: 51.5085,
    },
    weather: [
      {
        id: 500,
        main: "Rain",
        description: "light rain",
        icon: "10n",
      },
    ],
    base: "stations",
    main: {
      temp: 276.68,
      feels_like: 271.51,
      temp_min: 274.64,
      temp_max: 277.4,
      pressure: 982,
      humidity: 81,
    },
    visibility: 7000,
    wind: {
      speed: 7.72,
      deg: 300,
      gust: 12.86,
    },
    rain: {
      "1h": 0.82,
    },
    clouds: {
      all: 90,
    },
    dt: 1637985504,
    sys: {
      type: 1,
      id: 1414,
      country: "GB",
      sunrise: 1637998702,
      sunset: 1638028701,
    },
    timezone: 0,
    id: 2643743,
    name: "London",
    cod: 200,
  },
  Amsterdam: {
    coord: {
      lon: 20,
      lat: 30,
    },
    weather: [
      {
        id: 500,
        main: "Sunny",
        description: "Bright sun",
        icon: "25n",
      },
    ],
    base: "stations",
    main: {
      temp: 276.68,
      feels_like: 271.51,
      temp_min: 274.64,
      temp_max: 277.4,
      pressure: 982,
      humidity: 81,
    },
    visibility: 7000,
    wind: {
      speed: 7.72,
      deg: 300,
      gust: 12.86,
    },
    rain: {
      "1h": 0.82,
    },
    clouds: {
      all: 90,
    },
    dt: 1637985504,
    sys: {
      type: 1,
      id: 1414,
      country: "GB",
      sunrise: 1637998702,
      sunset: 1638028701,
    },
    timezone: 0,
    id: 2643743,
    name: "Amsterdam",
    cod: 200,
  },
};

jest.mock("axios");

jest.mock("./services/city", () => {
  return {
    __esModule: true,
    getCurrentCity: () => {
      return "London";
    },
  };
});

jest.mock("./services/weather", () => {
  const { createIconImage } = jest.requireActual("./services/weather");
  return {
    __esModule: true,
    createIconImage,
    getWeather: (cityName) => {
      return new Promise((resolve, reject) => {
        return weatherMockData[cityName] ? resolve(weatherMockData[cityName]) : reject(new Error("weather not found"));
      });
    },
  };
});

describe("forecast init app", () => {
  let appEl;

  beforeEach(async () => {
    appEl = document.createElement("div");
    document.body.appendChild(appEl);
    await initApp(appEl);
  });

  afterEach(() => {
    document.body.removeChild(appEl);
  });

  it("should build markup with default city", async () => {
    const currentCity = "London";
    const currentCityWeather = weatherMockData[currentCity].weather[0];

    expect(appEl.querySelector(`#${getHistoryContainer().id}`)).toBeTruthy();
    expect(appEl.querySelector(`#${getSearchInput().id}`)).toBeTruthy();
    expect(appEl.querySelector(`#${getMapContainer().id}`)).toBeTruthy();
    expect(appEl.querySelector(`#${getSearchBtn().id}`)).toBeTruthy();

    const weatherBlock = getWeatherResultBLock();
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(currentCity));
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(currentCityWeather.description));
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(currentCityWeather.main));

    const img = weatherBlock.querySelector("img");
    expect(img).toBeTruthy();
    expect(img.src).toEqual(expect.stringContaining(currentCityWeather.icon));
  });

  it("should init input event listener", () => {
    const input = getSearchInput();
    const btn = getSearchBtn();

    expect(btn.disabled).toBeTruthy();

    input.value = "some text";
    input.dispatchEvent(new Event("input"));

    expect(btn.disabled).toBeFalsy();

    input.value = "";
    input.dispatchEvent(new Event("input"));

    expect(btn.disabled).toBeTruthy();
  });

  it("should init button event listener", async () => {
    const cityName = "Amsterdam";
    const cityWeather = weatherMockData[cityName].weather[0];
    const input = getSearchInput();
    const btn = getSearchBtn();

    input.value = cityName;
    input.dispatchEvent(new Event("input"));
    btn.dispatchEvent(new Event("click"));

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    expect(input.value).toBeFalsy();
    expect(btn.disabled).toBeTruthy();

    const weatherBlock = getWeatherResultBLock();
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(cityName));
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(cityWeather.description));
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(cityWeather.main));

    const img = weatherBlock.querySelector("img");
    expect(img).toBeTruthy();
    expect(img.src).toEqual(expect.stringContaining(cityWeather.icon));
  });

  it("should render history", async () => {
    const cityName = "Amsterdam";
    const input = getSearchInput();
    const btn = getSearchBtn();

    input.value = cityName;
    input.dispatchEvent(new Event("input"));
    btn.dispatchEvent(new Event("click"));

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 100);
    });

    const historyContainer = getHistoryContainer();
    const h6 = historyContainer.querySelector("h6");
    expect(h6.innerText).toEqual(expect.stringContaining(cityName));
  });
});
