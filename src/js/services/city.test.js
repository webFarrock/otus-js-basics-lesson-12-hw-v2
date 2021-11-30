import axios from "axios";
import { getCurrentCity, GEO_JS_GET_PATH } from "./city";

jest.mock("axios");

describe("city", () => {
  it("getCurrentCity", async () => {
    const expectedCity = "London";
    const resp = { data: { city: expectedCity } };

    axios.get.mockResolvedValue(resp);
    const result = await getCurrentCity();
    expect(result).toEqual(expectedCity);
    expect(axios.get).toHaveBeenCalledWith(GEO_JS_GET_PATH);
  });
});
