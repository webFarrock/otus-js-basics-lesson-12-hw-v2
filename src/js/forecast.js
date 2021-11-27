import { getCurrentCity } from "./services/city";
import { addToHistory, getSearchHistory } from "./storage/localStorage";
import { getWeather } from "./services/weather";
import {
  buildMarkup,
  disableSearchBtn,
  enableSearchBtn,
  getHistoryContainer,
  getMapContainer,
  getSearchBtn,
  getSearchInput,
  HISTORY_CITY_NAME,
  renderHistory,
  renderMap,
  renderWeather,
} from "./services/markup";

const updateWeather = async (cityName) => {
  const weather = await getWeather(cityName);
  if (!weather) {
    alert(`Погода для "${cityName}" не найдена`);
    return false;
  }

  const mapContainer = getMapContainer();
  mapContainer.innerHTML = "";
  const { name } = weather;
  const { description, icon, main } = weather.weather[0];
  renderWeather(name, description, icon, main);
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
  searchBtn.addEventListener("click", async () => {
    const input = getSearchInput();
    const cityName = input.value;
    const find = await updateWeather(cityName);

    if (find) {
      addToHistory(cityName);
      const history = getSearchHistory();
      renderHistory(history);
    }

    disableSearchBtn();
    input.value = "";
  });

  const historyContainer = getHistoryContainer();

  historyContainer.addEventListener("click", async (e) => {
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
      await updateWeather(cityName);
      addToHistory(cityName);
      const history = getSearchHistory();
      renderHistory(history);
    }
  });
};

const initApp = async (appEl) => {
  buildMarkup(appEl);
  initEventListeners();

  const history = getSearchHistory();
  renderHistory(history);

  const currentCity = await getCurrentCity();
  await updateWeather(currentCity);
};

export { initApp };
