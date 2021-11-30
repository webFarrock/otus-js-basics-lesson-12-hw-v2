const SEARCH_HISTORY_KEY = "SEARCH_HISTORY";
const HISTORY_MAX_SIZE = 10;
/**
 * @return {any|*[]}
 */
const getSearchHistory = () => {
  let history = localStorage.getItem(SEARCH_HISTORY_KEY);
  if (!history) {
    return [];
  }
  history = JSON.parse(history);

  return Array.isArray(history) ? history : [];
};

const addToHistory = (cityName) => {
  const history = getSearchHistory();
  history.unshift(cityName);

  const newHistory = history.filter((value, index, self) => self.indexOf(value) === index).slice(0, HISTORY_MAX_SIZE);

  localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
};

export { getSearchHistory, addToHistory, HISTORY_MAX_SIZE };
