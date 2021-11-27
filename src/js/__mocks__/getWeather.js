const data = {
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
};

const getWeather = async (cityName) => {
  try {
    return await new Promise((resolve, reject) => {
      process.nextTick(() => (data[cityName] ? resolve(data[cityName]) : reject(new Error("weather not found"))));
    });
  } catch (e) {
    return null;
  }
};

export { getWeather };
