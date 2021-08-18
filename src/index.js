import "./styles.css";
import constants from "./constants";

let box1 = document.getElementsByClassName("box")[0];
let box2 = document.getElementsByClassName("box")[1];
let box3 = document.getElementsByClassName("box")[2];

function clearValues() {
  box1.innerHTML = "";
  box2.innerHTML = "";
  box3.innerHTML = "";
}

let boxValues = constants.boxesValues;

function shuffle() {
  clearValues();
  boxValues = [...constants.boxesValues].sort(() => Math.random() - 0.5);
  displayBox(boxValues);
}

let mobileView = window.innerWidth <= 375;

function createBox(box) {
  let child = document.createElement("div");
  child.innerHTML = `${box.label}`;
  if (window.innerWidth > 375) {
    child.style.backgroundColor = box.color;
  } else {
    child.style.borderLeft = `10px solid ${box.color}`;
  }
  return child;
}

function displayBox(boxValue) {
  boxValue.forEach((box, index) => {
    if (index < 3) {
      box1.appendChild(createBox(box));
    } else if (index < 6) {
      box2.appendChild(createBox(box));
    } else {
      box3.appendChild(createBox(box));
    }
  });
}

function sort() {
  clearValues();
  boxValues = constants.boxesValues;
  displayBox(boxValues);
}

function debounce(cb, delay) {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(cb, delay);
  };
}

function checkMediaQuery() {
  if (
    (mobileView && window.innerWidth > 375) ||
    (!mobileView && !(window.innerWidth > 375))
  ) {
    mobileView = window.innerWidth <= 375;
    clearValues();
    displayBox(boxValues);
  }
}

displayBox(boxValues);

const callingDebounce = debounce(checkMediaQuery, 100);

document.getElementById("shuffle").addEventListener("click", shuffle);
document.getElementById("sort").addEventListener("click", sort);
window.addEventListener("resize", callingDebounce);
