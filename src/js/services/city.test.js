import { getCurrentCity } from "../__mocks__/getCurrentCity";

describe("city", () => {
  it("getCurrentCity", async () => {
    const result = await getCurrentCity();
    expect(result).toEqual("London");
  });
});
