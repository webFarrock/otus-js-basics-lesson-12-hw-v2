import "./styles/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { initApp } from "./js/forecast";

console.log("test changes");
const APP_ELEM_ID = "app";
const appEl = document.getElementById(APP_ELEM_ID);

if (!appEl) {
  throw new Error(`Can't find app element with id="${APP_ELEM_ID}"`);
}

initApp(appEl);
