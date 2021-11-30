import { createDiv, createH2, createH6, getById } from "./html";

describe("html tools", () => {
  it("createDiv create tag", () => {
    const elem = createDiv();
    expect(elem).toBeTruthy();
    expect(elem.nodeName).toEqual("DIV");
  });

  it("createDiv with classes", () => {
    const cls = "some-class some-other-class";
    const elem = createDiv(cls);

    cls.split(" ").forEach((item) => {
      expect(elem.classList.contains(item)).toBeTruthy();
    });
  });

  it("createDiv without classes", () => {
    const elem = createDiv();
    expect(elem.classList.length).toEqual(0);
  });

  it("createH2", () => {
    const text = "some text for h2";
    const elem = createH2(text);

    expect(elem).toBeTruthy();
    expect(elem.nodeName).toEqual("H2");
    expect(elem.innerText).toEqual(text);
  });

  it("getById existing element", () => {
    const id = "element-id";
    const elem = document.createElement("div");

    elem.id = id;
    document.body.appendChild(elem);

    const find = getById(id);
    expect(find).toBeTruthy();
    expect(find.id).toEqual(id);

    document.body.removeChild(elem);
  });

  it("getById not existing element", () => {
    const id = "element-id";

    expect(() => getById(id)).toThrow(Error);
  });

  it("createH6 create tag", () => {
    const text = "some text for h6";
    const elem = createH6(text);

    expect(elem).toBeTruthy();
    expect(elem.nodeName).toEqual("H6");
    expect(elem.innerText).toEqual(text);
  });

  it("createH6 with classes", () => {
    const cls = "some-class some-other-class";
    const text = "some text for h6";
    const elem = createH6(text, cls);

    cls.split(" ").forEach((item) => {
      expect(elem.classList.contains(item)).toBeTruthy();
    });
  });

  it("createH6 without classes", () => {
    const text = "some text for h6";
    const elem = createH6(text);

    expect(elem.classList.length).toEqual(0);
  });
});
