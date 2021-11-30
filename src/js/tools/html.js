/**
 * @param {String} elClasses
 * @return {HTMLDivElement}
 */
const createDiv = (elClasses = "") => {
  const elem = document.createElement("div");

  if (elClasses) {
    elem.classList.add(...elClasses.split(" "));
  }

  return elem;
};

/**
 * @param {String} text
 * @return {HTMLInputElement}
 */
const createH2 = (text) => {
  const h2 = document.createElement("h2");
  h2.innerText = text;
  return h2;
};

/**
 * @param {String} text
 * @param {String} elClasses
 * @return {HTMLInputElement}
 */
const createH6 = (text, elClasses = "") => {
  const h6 = document.createElement("h6");

  if (elClasses) {
    h6.classList.add(...elClasses.split(" "));
  }

  h6.innerText = text;
  return h6;
};

const getById = (id) => {
  const elem = document.getElementById(id);
  if (!elem) {
    throw new Error(`can't find element with id="${id}"`);
  }

  return elem;
};

export { createH2, createH6, createDiv, getById };
