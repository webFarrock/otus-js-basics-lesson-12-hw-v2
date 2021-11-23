import { getCurrentCity } from "./services/city";
import { createMapImage } from "./services/map";
import { getSearchHistory, updateHistory } from "./storage/localStorage";
import { createDiv, createH2, createSpinner } from "./tools/html";
import { getWeather } from "./services/weather";

const SEARCH_INPUT_ELEM_ID = "search-input";
const SEARCH_SUBMIT_ELEM_ID = "search-submit";
const HISTORY_CONTAINER_ELEM_ID = "search-history";
const MAP_CONTAINER_ELEM_ID = "map-container";

/**
 * @return {HTMLDivElement}
 */
const buildMapBlock = () => {
  const mapBlockCol = createDiv("col-md-6");
  const mapHeader = createH2("Выбранный город");
  const mapContainer = createDiv();
  mapContainer.id = MAP_CONTAINER_ELEM_ID;

  const spinnerEl = createSpinner();

  mapContainer.appendChild(spinnerEl);
  mapBlockCol.appendChild(mapHeader);
  mapBlockCol.appendChild(mapContainer);

  return mapBlockCol;
};

/**
 * @return {HTMLDivElement}
 */
const buildSearchBlock = () => {
  const searchBlockCol = createDiv("col-md-6");
  const searchRowEl = createDiv("row");
  const searchHeader = createH2("Введите адрес или город");
  const searchColEl = createDiv("col pb-5");
  const searchInput = document.createElement("input");
  searchInput.classList.add(..."form-control form-control--search-input float-start".split(" "));
  searchInput.id = SEARCH_INPUT_ELEM_ID;

  const historyHeader = createH2("История поиска");
  const searchSubmit = document.createElement("input");
  searchSubmit.classList.add(..."btn btn-primary float-end".split(" "));
  searchSubmit.type = "submit";
  searchSubmit.id = SEARCH_SUBMIT_ELEM_ID;

  const historyContainer = createDiv("list-group list-group--search-history");
  historyContainer.id = HISTORY_CONTAINER_ELEM_ID;

  const spinnerEl = createSpinner();

  historyContainer.appendChild(spinnerEl);
  searchBlockCol.appendChild(searchHeader);
  searchColEl.appendChild(searchInput);
  searchColEl.appendChild(searchSubmit);
  searchRowEl.appendChild(searchColEl);

  searchBlockCol.appendChild(searchRowEl);
  searchBlockCol.appendChild(historyHeader);
  searchBlockCol.appendChild(historyContainer);

  return searchBlockCol;
};

const buildMarkup = (appEl) => {
  const appContainer = appEl;
  const searchBlock = buildSearchBlock();
  const mapBlock = buildMapBlock();

  appContainer.innerHTML = "";
  appContainer.appendChild(searchBlock);
  appContainer.appendChild(mapBlock);

  updateHistory(); // tmp
};

const applyForecastData = (data = {}) => {
  console.log("applyForecastData", data);
};

const applyCityData = (data = {}) => {
  console.log("applyCityData", data);
};

const applyAppData = (cityData = {}, forecastData = {}) => {
  applyCityData(cityData);
  applyForecastData(forecastData);
};

const initApp = async (appEl) => {
  buildMarkup(appEl);
  const currentCity = await getCurrentCity();
  console.log("currentCity: ", currentCity);

  const mapImage = await createMapImage(currentCity);
  console.log("map: ", mapImage);

  const weather = await getWeather(currentCity);
  console.log("weather: ", weather);

  const historyData = getSearchHistory();
  const cityData = getCurrentCity();
  const forecastData = {};
  applyAppData(cityData, forecastData, historyData);
};

export { initApp };
