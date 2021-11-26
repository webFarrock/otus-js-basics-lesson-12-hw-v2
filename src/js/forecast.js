import { getCurrentCity } from "./services/city";
import { createMapImage } from "./services/map";
import { addToHistory, getSearchHistory } from "./storage/localStorage";
import { createDiv, createH2, createH6, getById } from "./tools/html";
import { getWeather } from "./services/weather";

const SEARCH_INPUT_ELEM_ID = "search-input";
const SEARCH_SUBMIT_ELEM_ID = "search-submit";
const HISTORY_CONTAINER_ELEM_ID = "search-history";
const MAP_CONTAINER_ELEM_ID = "map-container";
const WEATHER_RESULT = "weather-result";
const HISTORY_CITY_NAME = "js-history-city-name";

/**
 * @return {HTMLDivElement}
 */
const buildMapBlock = () => {
  const mapBlockCol = createDiv("col-md-6");
  const mapHeader = createH2("Выбранный город");
  const mapContainer = createDiv();
  mapContainer.id = MAP_CONTAINER_ELEM_ID;

  const weatherResult = createDiv();
  weatherResult.id = WEATHER_RESULT;

  mapBlockCol.appendChild(mapHeader);
  mapBlockCol.appendChild(weatherResult);
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
  searchSubmit.disabled = true;

  const historyContainer = createDiv("list-group list-group--search-history");
  historyContainer.id = HISTORY_CONTAINER_ELEM_ID;

  searchBlockCol.appendChild(searchHeader);
  searchColEl.appendChild(searchInput);
  searchColEl.appendChild(searchSubmit);
  searchRowEl.appendChild(searchColEl);

  searchBlockCol.appendChild(searchRowEl);
  searchBlockCol.appendChild(historyHeader);
  searchBlockCol.appendChild(historyContainer);

  return searchBlockCol;
};

/**
 * @param {HTMLElement} appEl
 */
const buildMarkup = (appEl) => {
  const appContainer = appEl;
  const searchBlock = buildSearchBlock();
  const mapBlock = buildMapBlock();

  appContainer.innerHTML = "";
  appContainer.appendChild(searchBlock);
  appContainer.appendChild(mapBlock);
};

/**
 * @return {HTMLElement}
 */
const getHistoryContainer = () => {
  return getById(HISTORY_CONTAINER_ELEM_ID);
};

/**
 * @return {HTMLElement}
 */
const getMapContainer = () => {
  return getById(MAP_CONTAINER_ELEM_ID);
};

/**
 * @return {HTMLElement}
 */
const getWeatherResultBLock = () => {
  return getById(WEATHER_RESULT);
};

/**
 * @return {HTMLElement}
 */
const getSearchBtn = () => {
  return getById(SEARCH_SUBMIT_ELEM_ID);
};

/**
 * @return {HTMLElement}
 */
const getSearchInput = () => {
  return getById(SEARCH_INPUT_ELEM_ID);
};

const enableSearchBtn = () => {
  getSearchBtn().disabled = false;
};

const disableSearchBtn = () => {
  getSearchBtn().disabled = true;
};

const renderWeather = (weatherData) => {
  const weatherResultBlock = getWeatherResultBLock();
  const { name } = weatherData;
  const { description, icon, main } = weatherData.weather[0];
  const iconImg = document.createElement("img");
  iconImg.src = `//openweathermap.org/img/wn/${icon}@2x.png`;

  weatherResultBlock.innerText = [name, main, description].join(", ");
  weatherResultBlock.appendChild(iconImg);
};

const renderMap = ({ lat, lon }) => {
  const img = createMapImage(lat, lon);
  const mapContainer = getMapContainer();
  mapContainer.appendChild(img);
};

const renderHistory = (history) => {
  const historyContainer = getHistoryContainer();
  historyContainer.innerHTML = "";
  const listGroupItems = history.map((city) => {
    const listGroupItem = createDiv("list-group-item list-group-item-action d-flex gap-3 py-3");
    const listGroupItemIn = createDiv("d-flex gap-2 w-100 justify-content-between");
    const header = createH6(city, `mb-0 ${HISTORY_CITY_NAME}`);

    listGroupItemIn.appendChild(header);
    listGroupItem.appendChild(listGroupItemIn);

    return listGroupItem;
  });

  listGroupItems.forEach((item) => {
    historyContainer.appendChild(item);
  });
};

const updateWeather = async (cityName) => {
  const weather = await getWeather(cityName);
  if (!weather) {
    alert(`Погода для "${cityName}" не найдена`);
    return false;
  }

  const mapContainer = getMapContainer();
  mapContainer.innerHTML = "";
  renderWeather(weather);
  renderMap(weather.coord);

  return true;
};

const initEventListeners = () => {
  const searchInput = getSearchInput();

  searchInput.addEventListener("input", (e) => {
    if (e.target.value.trim()) {
      enableSearchBtn();
    } else {
      disableSearchBtn();
    }
  });

  const searchBtn = getSearchBtn();
  searchBtn.addEventListener("click", () => {
    const input = getSearchInput();
    const cityName = input.value;
    const find = updateWeather(cityName);

    if (find) {
      addToHistory(cityName);
      const history = getSearchHistory();
      renderHistory(history);
    }

    input.value = "";
  });

  const historyContainer = getHistoryContainer();

  historyContainer.addEventListener("click", (e) => {
    let cityName = null;
    if (e.target.classList.contains(HISTORY_CITY_NAME)) {
      cityName = e.target.innerText;
    } else {
      const cityElem = e.target.querySelector(`.${HISTORY_CITY_NAME}`);
      if (cityElem) {
        cityName = cityElem.innerText;
      }
    }

    if (cityName) {
      updateWeather(cityName);
      addToHistory(cityName);
      const history = getSearchHistory();
      renderHistory(history);
    }
  });
};

const initApp = async (appEl) => {
  buildMarkup(appEl);
  const currentCity = await getCurrentCity();

  initEventListeners();
  updateWeather("Москва");

  const history = getSearchHistory();
  renderHistory(history);
};

export { initApp };
