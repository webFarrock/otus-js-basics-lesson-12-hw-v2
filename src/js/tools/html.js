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
 * @return {HTMLDivElement}
 */
const createSpinner = () => {
  const spinnerEl = createDiv("spinner-border");
  return spinnerEl;
};

export { createH2, createDiv, createSpinner };
