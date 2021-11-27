import {
  buildMarkup,
  getHistoryContainer,
  getMapContainer,
  getSearchBtn,
  getSearchInput,
  getWeatherResultBLock,
  renderMap,
  renderWeather,
} from "./markup";

describe("basic markup", () => {
  let appEl;
  beforeEach(() => {
    appEl = document.createElement("div");
    buildMarkup(appEl);
    document.body.appendChild(appEl);
  });

  it("creates history container", () => {
    const elem = getHistoryContainer();
    expect(elem).toBeTruthy();
  });

  it("creates weather block", () => {
    const elem = getWeatherResultBLock();
    expect(elem).toBeTruthy();
  });

  it("creates map container", () => {
    const elem = getMapContainer();
    expect(elem).toBeTruthy();
  });

  it("creates search btn", () => {
    const elem = getSearchBtn();
    expect(elem).toBeTruthy();
  });

  it("creates search input", () => {
    const elem = getSearchInput();
    expect(elem).toBeTruthy();
  });

  it("creates weather markup", () => {
    const name = "london";
    const description = "some description";
    const icon = "someIconId";
    const main = "other";

    renderWeather(name, description, icon, main);

    const weatherBlock = getWeatherResultBLock();
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(name));
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(description));
    expect(weatherBlock.innerText).toEqual(expect.stringContaining(main));

    const img = weatherBlock.querySelector("img");
    expect(img).toBeTruthy();
    expect(img.src).toEqual(expect.stringContaining(icon));
  });

  it("render map", () => {
    const coords = {
      lat: "some-lat",
      lon: "some-lon",
    };

    renderMap(coords);

    const mapContainer = getMapContainer();
    const img = mapContainer.querySelector("img");

    expect(img).toBeTruthy();
    expect(img.src).toEqual(expect.stringContaining(coords.lat));
    expect(img.src).toEqual(expect.stringContaining(coords.lon));
  });
});
