const API_KEY = "AIzaSyBx0xC5JHjnOL8wu8UHKjjLIhxmqRDlbVM";
const MAP_BASIC_URL = "//maps.googleapis.com/maps/api/staticmap";
const MAP_ZOOM = 12;
const MAP_WIDTH = "400";
const MAP_HEIGHT = "400";

const makeMapSrc = (lat, lon) => {
  return `${MAP_BASIC_URL}?key=${API_KEY}&center=${lat},${lon}&zoom=${MAP_ZOOM}&size=${MAP_WIDTH}x${MAP_HEIGHT}`;
};

const createMapImage = (lat, lon) => {
  const img = new Image();
  img.src = makeMapSrc(lat, lon);
  img.width = MAP_WIDTH;
  img.height = MAP_HEIGHT;

  return img;
};

export { createMapImage };
