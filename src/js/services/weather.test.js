import { createIconImage } from "./weather";
import { getWeather } from "../__mocks__/getWeather";

describe("weather", () => {
  it("createIconImage", () => {
    const iconId = "my-icon";
    const elem = createIconImage(iconId);

    expect(elem).toBeTruthy();
    expect(elem.nodeName).toEqual("IMG");
    expect(elem.src).toContain(iconId);
  });

  it("getWeather success", async () => {
    const result = await getWeather("London");
    expect(result).toBeTruthy();
  });

  it("getWeather fail", async () => {
    const result = await getWeather("fake");
    expect(result).toBeNull();
  });
});
