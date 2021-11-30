import "jest-localstorage-mock";
import { addToHistory, getSearchHistory, HISTORY_MAX_SIZE } from "./localStorage";

describe("history storage", () => {
  const randomString = () =>
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5);

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    localStorage.setItem.mockClear();
  });

  it("save cities to history", () => {
    const cities = ["London", "Amsterdam"];

    cities.forEach((city) => {
      addToHistory(city);
    });

    const citiesFromHistory = getSearchHistory();
    expect(citiesFromHistory).toEqual(expect.arrayContaining(cities));
  });

  it(`save to history only last ${HISTORY_MAX_SIZE} items`, () => {
    const cities = [];
    for (let i = 0; i <= 100; i += 1) {
      cities.push(randomString());
    }

    const expectedResult = cities.slice(-1 * HISTORY_MAX_SIZE);

    cities.forEach((city) => {
      addToHistory(city);
    });

    const citiesFromHistory = getSearchHistory();
    expect(citiesFromHistory).toEqual(expect.arrayContaining(expectedResult));
  });
});
