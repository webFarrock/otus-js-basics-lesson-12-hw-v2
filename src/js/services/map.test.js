import { createMapImage } from "./map";

describe("map", () => {
  it("createMapImage", () => {
    const lat = 10;
    const lon = 20;
    const elem = createMapImage(lat, lon);

    expect(elem).toBeTruthy();
    expect(elem.nodeName).toEqual("IMG");
    expect(elem.src).toContain(`center=${lat},${lon}`);
  });
});
