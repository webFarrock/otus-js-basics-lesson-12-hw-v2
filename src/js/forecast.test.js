import { initApp } from "./forecast";
import {
  getHistoryContainer,
  getMapContainer,
  getSearchBtn,
  getSearchInput,
  getWeatherResultBLock,
} from "./services/markup";

import { weatherMockData } from "./__mocks__/getWeather";

jest.mock("./services/city", () => {
  const { getCurrentCity } = jest.requireActual("./__mocks__/getCurrentCity");
  return {
    __esModule: true,
    getCurrentCity: async () => {
      return getCurrentCity();
    },
  };
});

jest.mock("./services/weather", () => {
  const { getWeather } = jest.requireActual("./__mocks__/getWeather");
  const { createIconImage } = jest.requireActual("./services/weather");
  return {
    __esModule: true,
    createIconImage,
    getWeather: async (cityName) => {
      return getWeather(cityName);
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
      process.nextTick(() => {
        resolve();
      });
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
      process.nextTick(() => {
        resolve();
      });
    });

    const historyContainer = getHistoryContainer();
    const h6 = historyContainer.querySelector("h6");
    expect(h6.innerText).toEqual(expect.stringContaining(cityName));
  });
});
