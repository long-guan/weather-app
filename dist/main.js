/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/displayController.js":
/*!**********************************!*\
  !*** ./src/displayController.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayDailyData": () => (/* binding */ displayDailyData),
/* harmony export */   "displayHourlyData": () => (/* binding */ displayHourlyData),
/* harmony export */   "displayTopData": () => (/* binding */ displayTopData)
/* harmony export */ });
/* harmony import */ var _setBackground__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setBackground */ "./src/setBackground.js");
/* harmony import */ var _locationSearch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locationSearch.js */ "./src/locationSearch.js");



let currentWeatherMain = document.querySelector('.current-weather-main');
let locationDisplay = document.querySelector('.location-display');
let weatherDesc = document.querySelector('.weather-desc');
let dayDate = document.querySelector('.day-date');
let time = document.querySelector('.time');
let temperature = document.querySelector('.temperature');
let windChill = document.querySelector('.wind-chill');
let humidity = document.querySelector('.humidity');
let rainChance = document.querySelector('.rain-chance');
let windSpeed = document.querySelector('.wind-speed');
let forecast = document.querySelectorAll('.daily');
let hourlyBtn = document.querySelector('.hourly-btn');
let dailyBtn = document.querySelector('.daily-btn');
let daily = true;

function displayTopData(data, location) {
    currentWeatherMain.innerHTML = data.current.weather[0].main;
    (0,_setBackground__WEBPACK_IMPORTED_MODULE_0__.setBackground)(data.current.weather[0].main);
    locationDisplay.innerHTML = fixCase(location);
    weatherDesc.innerHTML = data.current.weather[0].description;
    dayDate.innerHTML = getDay() + ', ' + getDate();
    time.innerHTML = getTime();
    temperature.innerHTML = Math.round(data.current.temp) + ' °F';
    windChill.innerHTML = Math.round(data.current.feels_like) + ' °F';
    humidity.innerHTML = data.current.humidity + '%';
    rainChance.innerHTML = Math.round(data.daily[0].pop * 100) + '%';
    windSpeed.innerHTML = Math.round(data.current.wind_speed) + ' mph';
}

function displayDailyData(data) {
    let weekDays = sortWeekDays();
    let dailyData = data.daily;
    let weekIndex = 0;
    let dataIndex = 1;
    for (let day of forecast) {
        day.children[0].innerHTML = weekDays[weekIndex];
        day.children[1].innerHTML = Math.round(dailyData[dataIndex].temp.max) + '°F';
        day.children[2].innerHTML = Math.round(dailyData[dataIndex].temp.min) + '°F';
        day.children[3].innerHTML = dailyData[dataIndex].weather[0].main;
        dataIndex++;
        weekIndex++;
    }
}

function displayHourlyData(data) {
    let cloneData = JSON.parse(JSON.stringify(data));
    let hourData = convertHourly(cloneData);
    let index = 1; // don't use index 0 since it is the current hour
    for (let hour of forecast) {
        hour.children[0].innerHTML = hourData[index].dt;
        hour.children[1].innerHTML = Math.round(hourData[index].temp) + '°F';
        hour.children[2].innerHTML = Math.round(hourData[index].pop * 100) + '% Rain';
        hour.children[3].innerHTML = hourData[index].weather[0].main;
        index++;
    }
    (0,_locationSearch_js__WEBPACK_IMPORTED_MODULE_1__.exportData)();
}

dailyBtn.addEventListener('click', ()=> {
    if (daily == false) {
        daily = true;
        hourlyBtn.classList.remove('selected');
        dailyBtn.classList.add('selected');
        displayDailyData((0,_locationSearch_js__WEBPACK_IMPORTED_MODULE_1__.exportData)());
    }
});

hourlyBtn.addEventListener('click', ()=> {
    if (daily == true) {
        daily = false;
        dailyBtn.classList.remove('selected');
        hourlyBtn.classList.add('selected');
        displayHourlyData((0,_locationSearch_js__WEBPACK_IMPORTED_MODULE_1__.exportData)());
    }
});

// convert unixTime to local time
function convertHourly(data) {
    let hours = data.hourly;
    for (let hour of hours) {
        let unixTime = new Date(hour.dt * 1000);
        let hourUnconverted = unixTime.toLocaleTimeString("en-US");
        let amPm = ' ' + hourUnconverted[hourUnconverted.length - 2] + hourUnconverted[hourUnconverted.length - 1];
        hour.dt = Math.round(parseInt(hourUnconverted)) + amPm;
    }
    return hours;
}

// returns the location name with the first letter capitalized
function fixCase(location) {
    let firstLetter = location[0].toUpperCase();
    let rest = location.slice(1).toLowerCase();
    return firstLetter + rest;
}

// returns day of the week starting with the day of the week for tomorrow
function sortWeekDays() {
    let day = getDay();
    let weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    if (day == 'Monday') {
        let secondPart = weekDays.slice(0, 1);
        let firstPart = weekDays.slice(1);
        let sortedDay = firstPart.concat(secondPart);
        return sortedDay;
    } else if (day == 'Tuesday') { // 0
        let secondPart = weekDays.slice(0, 2);
        let firstPart = weekDays.slice(2);
        let sortedDay = firstPart.concat(secondPart);
        return sortedDay;
    } else if (day == 'Wednesday') {
        let secondPart = weekDays.slice(0, 3);
        let firstPart = weekDays.slice(3);
        let sortedDay = firstPart.concat(secondPart);
        return sortedDay;
    } else if (day == 'Thursday') {
        let secondPart = weekDays.slice(0, 4);
        let firstPart = weekDays.slice(4);
        let sortedDay = firstPart.concat(secondPart);
        return sortedDay;
    } else if (day == 'Friday') {
        let secondPart = weekDays.slice(0, 5);
        let firstPart = weekDays.slice(5);
        let sortedDay = firstPart.concat(secondPart);
        return sortedDay;
    } else if (day == 'Saturday') {
        let secondPart = weekDays.slice(0, 6);
        let firstPart = weekDays.slice(6);
        let sortedDay = firstPart.concat(secondPart);
        return sortedDay;
    } else if (day == 'Sunday') {
        let secondPart = weekDays.slice(0, 7);
        let firstPart = weekDays.slice(7);
        let sortedDay = firstPart.concat(secondPart);
        return sortedDay;
    }
}

// returns current day
function getDay() {
    let d = new Date();
    let day = d.getDay();
    if (day == 0) {
        return 'Sunday';
    } else if (day == 1) {
        return 'Monday';
    } else if (day == 2) {
        return 'Tuesday';
    } else if (day == 3) {
        return 'Wednesday';
    } else if (day == 4) {
        return 'Thursday';
    } else if (day == 5) {
        return 'Friday';
    } else if (day == 6) {
        return 'Saturday';
    }
}

// returns month and date from new Date()
function getDate() {
    let d = new Date();
    let count = 0;
    let date = '';
    for (let char of String(d)) {
        if (char == ' ') {
            count++;
        }
        if (count == 1 || count == 2) {
            date += char;
        }
    }
    return date;
}

// returns time from new Date()
function getTime() {
    let d = new Date();
    let count = 0;
    let time = '';
    for (let char of String(d)) {
        if (char == ' ') {
            count++;
        }
        if (count == 4) {
            time += char;
        }
    }
    time = formatTime(time);
    return time;
}

// converts military time to standard 12-hr time format (hr and minute)
function formatTime(time) {
    let hour = time.slice(0,3);
    let minute = time.slice(4,6);
    let pm = false;
    if (hour > 12) {
        hour = hour - 12;
        pm = true;
    }
    if (pm == true) {
        return hour + ':' + minute + ' PM';
    } else {
        return hour + ':' + minute + ' AM';
    }
}


/***/ }),

/***/ "./src/fetchData.js":
/*!**************************!*\
  !*** ./src/fetchData.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getData": () => (/* binding */ getData)
/* harmony export */ });
async function getData(lat, lon) {
    try {
        let url = 'https://api.openweathermap.org/data/3.0/onecall?lat=' + lat + '&lon=' + lon + '&APPID=501d0f121a88f5889175559ce6055e41&units=imperial';
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        return data;
    } catch(err) {
        console.log(err);
    }
}


/***/ }),

/***/ "./src/fetchLatLon.js":
/*!****************************!*\
  !*** ./src/fetchLatLon.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getLatLon": () => (/* binding */ getLatLon)
/* harmony export */ });
async function getLatLon(location) {
    try {
        let url = 'http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&APPID=501d0f121a88f5889175559ce6055e41'
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        // console.log(data[0].lon);
        // console.log(data[0].lat);
        return {lon: data[0].lon, lat: data[0].lat};
    } catch(err) {
        console.log(err);
    }
}


/***/ }),

/***/ "./src/loader.js":
/*!***********************!*\
  !*** ./src/loader.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addLoader": () => (/* binding */ addLoader),
/* harmony export */   "removeLoader": () => (/* binding */ removeLoader)
/* harmony export */ });
function addLoader() {
    let div = document.createElement('div');
    div.classList.add('loader');
    document.body.appendChild(div);
    document.querySelector('.top-outer-cont').classList.add('blur');
    document.querySelector('.bot-outer-cont').classList.add('blur');
}

function removeLoader() {
    document.querySelector('.loader').remove();
    document.querySelector('.top-outer-cont').classList.remove('blur');
    document.querySelector('.bot-outer-cont').classList.remove('blur');
}


/***/ }),

/***/ "./src/locationSearch.js":
/*!*******************************!*\
  !*** ./src/locationSearch.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultLoc": () => (/* binding */ defaultLoc),
/* harmony export */   "exportData": () => (/* binding */ exportData),
/* harmony export */   "searchLoc": () => (/* binding */ searchLoc)
/* harmony export */ });
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");
/* harmony import */ var _fetchData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchData */ "./src/fetchData.js");
/* harmony import */ var _fetchLatLon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchLatLon */ "./src/fetchLatLon.js");
/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./loader */ "./src/loader.js");





let savedData = {};

function defaultLoc(location) {
    let data = returnData(location);
    data.then((data)=> {
        savedData = data;
        console.log(savedData);
        (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayTopData)(data, location);
        (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayDailyData)(data);
        (0,_loader__WEBPACK_IMPORTED_MODULE_3__.removeLoader)();
    });
}

function searchLoc() {
    let searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', ()=> {
        let location = document.querySelector('.location-input').value;
        let data = returnData(location);
        data.then((data)=> {
            savedData = data;
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayTopData)(data, location);
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayDailyData)(data);
            (0,_loader__WEBPACK_IMPORTED_MODULE_3__.removeLoader)();
        });
    });
}

function exportData() {
    return savedData;
}

async function returnData(location) {
    (0,_loader__WEBPACK_IMPORTED_MODULE_3__.addLoader)();
    let coordinates = await (0,_fetchLatLon__WEBPACK_IMPORTED_MODULE_2__.getLatLon)(location)
    let data = await (0,_fetchData__WEBPACK_IMPORTED_MODULE_1__.getData)(coordinates.lat, coordinates.lon);
    return data;
    // console.log(coordinates.lat);
    // console.log(coordinates.lon);
}


/***/ }),

/***/ "./src/setBackground.js":
/*!******************************!*\
  !*** ./src/setBackground.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "setBackground": () => (/* binding */ setBackground)
/* harmony export */ });
function setBackground(currentWeather) {
    if (currentWeather == 'Clouds') {
        document.body.style.backgroundImage = "url('./image/cloud.jpg')";
        document.body.style.color = 'black';
    } else if (currentWeather == 'Sunny') {
        document.body.style.backgroundImage = "url('./image/sunny.jpg')";
        document.body.style.color = 'black';
    } else if (currentWeather == 'Rain') {
        document.body.style.backgroundImage = "url('./image/rain.jpg')";
        document.body.style.color = 'white';
    } else if (currentWeather == 'Clear') {
        document.body.style.backgroundImage = "url('./image/clear.jpg')";
        document.body.style.color = 'black';
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _locationSearch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./locationSearch.js */ "./src/locationSearch.js");





// default location upon page load is Seattle
(0,_locationSearch_js__WEBPACK_IMPORTED_MODULE_0__.defaultLoc)('Seattle');

// sets up search function
(0,_locationSearch_js__WEBPACK_IMPORTED_MODULE_0__.searchLoc)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7OztBQzNDTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNkQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNKMEQ7OztBQUcxRDtBQUNBLDhEQUFVOztBQUVWO0FBQ0EsNkRBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mZXRjaERhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZmV0Y2hMYXRMb24uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbG9hZGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvY2F0aW9uU2VhcmNoLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL3NldEJhY2tncm91bmQuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzZXRCYWNrZ3JvdW5kIH0gZnJvbSBcIi4vc2V0QmFja2dyb3VuZFwiO1xuaW1wb3J0IHsgZXhwb3J0RGF0YSB9IGZyb20gXCIuL2xvY2F0aW9uU2VhcmNoLmpzXCJcblxubGV0IGN1cnJlbnRXZWF0aGVyTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXdlYXRoZXItbWFpbicpO1xubGV0IGxvY2F0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbi1kaXNwbGF5Jyk7XG5sZXQgd2VhdGhlckRlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1kZXNjJyk7XG5sZXQgZGF5RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXktZGF0ZScpO1xubGV0IHRpbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGltZScpO1xubGV0IHRlbXBlcmF0dXJlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlbXBlcmF0dXJlJyk7XG5sZXQgd2luZENoaWxsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQtY2hpbGwnKTtcbmxldCBodW1pZGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5odW1pZGl0eScpO1xubGV0IHJhaW5DaGFuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucmFpbi1jaGFuY2UnKTtcbmxldCB3aW5kU3BlZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2luZC1zcGVlZCcpO1xubGV0IGZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRhaWx5Jyk7XG5sZXQgaG91cmx5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJseS1idG4nKTtcbmxldCBkYWlseUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYWlseS1idG4nKTtcbmxldCBkYWlseSA9IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5VG9wRGF0YShkYXRhLCBsb2NhdGlvbikge1xuICAgIGN1cnJlbnRXZWF0aGVyTWFpbi5pbm5lckhUTUwgPSBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5tYWluO1xuICAgIHNldEJhY2tncm91bmQoZGF0YS5jdXJyZW50LndlYXRoZXJbMF0ubWFpbik7XG4gICAgbG9jYXRpb25EaXNwbGF5LmlubmVySFRNTCA9IGZpeENhc2UobG9jYXRpb24pO1xuICAgIHdlYXRoZXJEZXNjLmlubmVySFRNTCA9IGRhdGEuY3VycmVudC53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uO1xuICAgIGRheURhdGUuaW5uZXJIVE1MID0gZ2V0RGF5KCkgKyAnLCAnICsgZ2V0RGF0ZSgpO1xuICAgIHRpbWUuaW5uZXJIVE1MID0gZ2V0VGltZSgpO1xuICAgIHRlbXBlcmF0dXJlLmlubmVySFRNTCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LnRlbXApICsgJyDCsEYnO1xuICAgIHdpbmRDaGlsbC5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC5mZWVsc19saWtlKSArICcgwrBGJztcbiAgICBodW1pZGl0eS5pbm5lckhUTUwgPSBkYXRhLmN1cnJlbnQuaHVtaWRpdHkgKyAnJSc7XG4gICAgcmFpbkNoYW5jZS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhdGEuZGFpbHlbMF0ucG9wICogMTAwKSArICclJztcbiAgICB3aW5kU3BlZWQuaW5uZXJIVE1MID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQud2luZF9zcGVlZCkgKyAnIG1waCc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5RGFpbHlEYXRhKGRhdGEpIHtcbiAgICBsZXQgd2Vla0RheXMgPSBzb3J0V2Vla0RheXMoKTtcbiAgICBsZXQgZGFpbHlEYXRhID0gZGF0YS5kYWlseTtcbiAgICBsZXQgd2Vla0luZGV4ID0gMDtcbiAgICBsZXQgZGF0YUluZGV4ID0gMTtcbiAgICBmb3IgKGxldCBkYXkgb2YgZm9yZWNhc3QpIHtcbiAgICAgICAgZGF5LmNoaWxkcmVuWzBdLmlubmVySFRNTCA9IHdlZWtEYXlzW3dlZWtJbmRleF07XG4gICAgICAgIGRheS5jaGlsZHJlblsxXS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhaWx5RGF0YVtkYXRhSW5kZXhdLnRlbXAubWF4KSArICfCsEYnO1xuICAgICAgICBkYXkuY2hpbGRyZW5bMl0uaW5uZXJIVE1MID0gTWF0aC5yb3VuZChkYWlseURhdGFbZGF0YUluZGV4XS50ZW1wLm1pbikgKyAnwrBGJztcbiAgICAgICAgZGF5LmNoaWxkcmVuWzNdLmlubmVySFRNTCA9IGRhaWx5RGF0YVtkYXRhSW5kZXhdLndlYXRoZXJbMF0ubWFpbjtcbiAgICAgICAgZGF0YUluZGV4Kys7XG4gICAgICAgIHdlZWtJbmRleCsrO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlIb3VybHlEYXRhKGRhdGEpIHtcbiAgICBsZXQgY2xvbmVEYXRhID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gICAgbGV0IGhvdXJEYXRhID0gY29udmVydEhvdXJseShjbG9uZURhdGEpO1xuICAgIGxldCBpbmRleCA9IDE7IC8vIGRvbid0IHVzZSBpbmRleCAwIHNpbmNlIGl0IGlzIHRoZSBjdXJyZW50IGhvdXJcbiAgICBmb3IgKGxldCBob3VyIG9mIGZvcmVjYXN0KSB7XG4gICAgICAgIGhvdXIuY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gaG91ckRhdGFbaW5kZXhdLmR0O1xuICAgICAgICBob3VyLmNoaWxkcmVuWzFdLmlubmVySFRNTCA9IE1hdGgucm91bmQoaG91ckRhdGFbaW5kZXhdLnRlbXApICsgJ8KwRic7XG4gICAgICAgIGhvdXIuY2hpbGRyZW5bMl0uaW5uZXJIVE1MID0gTWF0aC5yb3VuZChob3VyRGF0YVtpbmRleF0ucG9wICogMTAwKSArICclIFJhaW4nO1xuICAgICAgICBob3VyLmNoaWxkcmVuWzNdLmlubmVySFRNTCA9IGhvdXJEYXRhW2luZGV4XS53ZWF0aGVyWzBdLm1haW47XG4gICAgICAgIGluZGV4Kys7XG4gICAgfVxuICAgIGV4cG9ydERhdGEoKTtcbn1cblxuZGFpbHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHtcbiAgICBpZiAoZGFpbHkgPT0gZmFsc2UpIHtcbiAgICAgICAgZGFpbHkgPSB0cnVlO1xuICAgICAgICBob3VybHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgZGFpbHlCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgZGlzcGxheURhaWx5RGF0YShleHBvcnREYXRhKCkpO1xuICAgIH1cbn0pO1xuXG5ob3VybHlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKT0+IHtcbiAgICBpZiAoZGFpbHkgPT0gdHJ1ZSkge1xuICAgICAgICBkYWlseSA9IGZhbHNlO1xuICAgICAgICBkYWlseUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgICAgICBob3VybHlCdG4uY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcbiAgICAgICAgZGlzcGxheUhvdXJseURhdGEoZXhwb3J0RGF0YSgpKTtcbiAgICB9XG59KTtcblxuLy8gY29udmVydCB1bml4VGltZSB0byBsb2NhbCB0aW1lXG5mdW5jdGlvbiBjb252ZXJ0SG91cmx5KGRhdGEpIHtcbiAgICBsZXQgaG91cnMgPSBkYXRhLmhvdXJseTtcbiAgICBmb3IgKGxldCBob3VyIG9mIGhvdXJzKSB7XG4gICAgICAgIGxldCB1bml4VGltZSA9IG5ldyBEYXRlKGhvdXIuZHQgKiAxMDAwKTtcbiAgICAgICAgbGV0IGhvdXJVbmNvbnZlcnRlZCA9IHVuaXhUaW1lLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLVVTXCIpO1xuICAgICAgICBsZXQgYW1QbSA9ICcgJyArIGhvdXJVbmNvbnZlcnRlZFtob3VyVW5jb252ZXJ0ZWQubGVuZ3RoIC0gMl0gKyBob3VyVW5jb252ZXJ0ZWRbaG91clVuY29udmVydGVkLmxlbmd0aCAtIDFdO1xuICAgICAgICBob3VyLmR0ID0gTWF0aC5yb3VuZChwYXJzZUludChob3VyVW5jb252ZXJ0ZWQpKSArIGFtUG07XG4gICAgfVxuICAgIHJldHVybiBob3Vycztcbn1cblxuLy8gcmV0dXJucyB0aGUgbG9jYXRpb24gbmFtZSB3aXRoIHRoZSBmaXJzdCBsZXR0ZXIgY2FwaXRhbGl6ZWRcbmZ1bmN0aW9uIGZpeENhc2UobG9jYXRpb24pIHtcbiAgICBsZXQgZmlyc3RMZXR0ZXIgPSBsb2NhdGlvblswXS50b1VwcGVyQ2FzZSgpO1xuICAgIGxldCByZXN0ID0gbG9jYXRpb24uc2xpY2UoMSkudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gZmlyc3RMZXR0ZXIgKyByZXN0O1xufVxuXG4vLyByZXR1cm5zIGRheSBvZiB0aGUgd2VlayBzdGFydGluZyB3aXRoIHRoZSBkYXkgb2YgdGhlIHdlZWsgZm9yIHRvbW9ycm93XG5mdW5jdGlvbiBzb3J0V2Vla0RheXMoKSB7XG4gICAgbGV0IGRheSA9IGdldERheSgpO1xuICAgIGxldCB3ZWVrRGF5cyA9IFsnTW9uZGF5JywgJ1R1ZXNkYXknLCAnV2VkbmVzZGF5JywgJ1RodXJzZGF5JywgJ0ZyaWRheScsICdTYXR1cmRheScsICdTdW5kYXknXTtcbiAgICBpZiAoZGF5ID09ICdNb25kYXknKSB7XG4gICAgICAgIGxldCBzZWNvbmRQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMCwgMSk7XG4gICAgICAgIGxldCBmaXJzdFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgxKTtcbiAgICAgICAgbGV0IHNvcnRlZERheSA9IGZpcnN0UGFydC5jb25jYXQoc2Vjb25kUGFydCk7XG4gICAgICAgIHJldHVybiBzb3J0ZWREYXk7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gJ1R1ZXNkYXknKSB7IC8vIDBcbiAgICAgICAgbGV0IHNlY29uZFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgwLCAyKTtcbiAgICAgICAgbGV0IGZpcnN0UGFydCA9IHdlZWtEYXlzLnNsaWNlKDIpO1xuICAgICAgICBsZXQgc29ydGVkRGF5ID0gZmlyc3RQYXJ0LmNvbmNhdChzZWNvbmRQYXJ0KTtcbiAgICAgICAgcmV0dXJuIHNvcnRlZERheTtcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAnV2VkbmVzZGF5Jykge1xuICAgICAgICBsZXQgc2Vjb25kUGFydCA9IHdlZWtEYXlzLnNsaWNlKDAsIDMpO1xuICAgICAgICBsZXQgZmlyc3RQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMyk7XG4gICAgICAgIGxldCBzb3J0ZWREYXkgPSBmaXJzdFBhcnQuY29uY2F0KHNlY29uZFBhcnQpO1xuICAgICAgICByZXR1cm4gc29ydGVkRGF5O1xuICAgIH0gZWxzZSBpZiAoZGF5ID09ICdUaHVyc2RheScpIHtcbiAgICAgICAgbGV0IHNlY29uZFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgwLCA0KTtcbiAgICAgICAgbGV0IGZpcnN0UGFydCA9IHdlZWtEYXlzLnNsaWNlKDQpO1xuICAgICAgICBsZXQgc29ydGVkRGF5ID0gZmlyc3RQYXJ0LmNvbmNhdChzZWNvbmRQYXJ0KTtcbiAgICAgICAgcmV0dXJuIHNvcnRlZERheTtcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAnRnJpZGF5Jykge1xuICAgICAgICBsZXQgc2Vjb25kUGFydCA9IHdlZWtEYXlzLnNsaWNlKDAsIDUpO1xuICAgICAgICBsZXQgZmlyc3RQYXJ0ID0gd2Vla0RheXMuc2xpY2UoNSk7XG4gICAgICAgIGxldCBzb3J0ZWREYXkgPSBmaXJzdFBhcnQuY29uY2F0KHNlY29uZFBhcnQpO1xuICAgICAgICByZXR1cm4gc29ydGVkRGF5O1xuICAgIH0gZWxzZSBpZiAoZGF5ID09ICdTYXR1cmRheScpIHtcbiAgICAgICAgbGV0IHNlY29uZFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgwLCA2KTtcbiAgICAgICAgbGV0IGZpcnN0UGFydCA9IHdlZWtEYXlzLnNsaWNlKDYpO1xuICAgICAgICBsZXQgc29ydGVkRGF5ID0gZmlyc3RQYXJ0LmNvbmNhdChzZWNvbmRQYXJ0KTtcbiAgICAgICAgcmV0dXJuIHNvcnRlZERheTtcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAnU3VuZGF5Jykge1xuICAgICAgICBsZXQgc2Vjb25kUGFydCA9IHdlZWtEYXlzLnNsaWNlKDAsIDcpO1xuICAgICAgICBsZXQgZmlyc3RQYXJ0ID0gd2Vla0RheXMuc2xpY2UoNyk7XG4gICAgICAgIGxldCBzb3J0ZWREYXkgPSBmaXJzdFBhcnQuY29uY2F0KHNlY29uZFBhcnQpO1xuICAgICAgICByZXR1cm4gc29ydGVkRGF5O1xuICAgIH1cbn1cblxuLy8gcmV0dXJucyBjdXJyZW50IGRheVxuZnVuY3Rpb24gZ2V0RGF5KCkge1xuICAgIGxldCBkID0gbmV3IERhdGUoKTtcbiAgICBsZXQgZGF5ID0gZC5nZXREYXkoKTtcbiAgICBpZiAoZGF5ID09IDApIHtcbiAgICAgICAgcmV0dXJuICdTdW5kYXknO1xuICAgIH0gZWxzZSBpZiAoZGF5ID09IDEpIHtcbiAgICAgICAgcmV0dXJuICdNb25kYXknO1xuICAgIH0gZWxzZSBpZiAoZGF5ID09IDIpIHtcbiAgICAgICAgcmV0dXJuICdUdWVzZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAzKSB7XG4gICAgICAgIHJldHVybiAnV2VkbmVzZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSA0KSB7XG4gICAgICAgIHJldHVybiAnVGh1cnNkYXknO1xuICAgIH0gZWxzZSBpZiAoZGF5ID09IDUpIHtcbiAgICAgICAgcmV0dXJuICdGcmlkYXknO1xuICAgIH0gZWxzZSBpZiAoZGF5ID09IDYpIHtcbiAgICAgICAgcmV0dXJuICdTYXR1cmRheSc7XG4gICAgfVxufVxuXG4vLyByZXR1cm5zIG1vbnRoIGFuZCBkYXRlIGZyb20gbmV3IERhdGUoKVxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcbiAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBsZXQgZGF0ZSA9ICcnO1xuICAgIGZvciAobGV0IGNoYXIgb2YgU3RyaW5nKGQpKSB7XG4gICAgICAgIGlmIChjaGFyID09ICcgJykge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgPT0gMSB8fCBjb3VudCA9PSAyKSB7XG4gICAgICAgICAgICBkYXRlICs9IGNoYXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGRhdGU7XG59XG5cbi8vIHJldHVybnMgdGltZSBmcm9tIG5ldyBEYXRlKClcbmZ1bmN0aW9uIGdldFRpbWUoKSB7XG4gICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgbGV0IHRpbWUgPSAnJztcbiAgICBmb3IgKGxldCBjaGFyIG9mIFN0cmluZyhkKSkge1xuICAgICAgICBpZiAoY2hhciA9PSAnICcpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID09IDQpIHtcbiAgICAgICAgICAgIHRpbWUgKz0gY2hhcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0aW1lID0gZm9ybWF0VGltZSh0aW1lKTtcbiAgICByZXR1cm4gdGltZTtcbn1cblxuLy8gY29udmVydHMgbWlsaXRhcnkgdGltZSB0byBzdGFuZGFyZCAxMi1ociB0aW1lIGZvcm1hdCAoaHIgYW5kIG1pbnV0ZSlcbmZ1bmN0aW9uIGZvcm1hdFRpbWUodGltZSkge1xuICAgIGxldCBob3VyID0gdGltZS5zbGljZSgwLDMpO1xuICAgIGxldCBtaW51dGUgPSB0aW1lLnNsaWNlKDQsNik7XG4gICAgbGV0IHBtID0gZmFsc2U7XG4gICAgaWYgKGhvdXIgPiAxMikge1xuICAgICAgICBob3VyID0gaG91ciAtIDEyO1xuICAgICAgICBwbSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChwbSA9PSB0cnVlKSB7XG4gICAgICAgIHJldHVybiBob3VyICsgJzonICsgbWludXRlICsgJyBQTSc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGhvdXIgKyAnOicgKyBtaW51dGUgKyAnIEFNJztcbiAgICB9XG59XG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YShsYXQsIGxvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCB1cmwgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMy4wL29uZWNhbGw/bGF0PScgKyBsYXQgKyAnJmxvbj0nICsgbG9uICsgJyZBUFBJRD01MDFkMGYxMjFhODhmNTg4OTE3NTU1OWNlNjA1NWU0MSZ1bml0cz1pbXBlcmlhbCc7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGF0TG9uKGxvY2F0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IHVybCA9ICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPScgKyBsb2NhdGlvbiArICcmQVBQSUQ9NTAxZDBmMTIxYTg4ZjU4ODkxNzU1NTljZTYwNTVlNDEnXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YVswXS5sb24pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhWzBdLmxhdCk7XG4gICAgICAgIHJldHVybiB7bG9uOiBkYXRhWzBdLmxvbiwgbGF0OiBkYXRhWzBdLmxhdH07XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYWRkTG9hZGVyKCkge1xuICAgIGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuY2xhc3NMaXN0LmFkZCgnbG9hZGVyJyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3Atb3V0ZXItY29udCcpLmNsYXNzTGlzdC5hZGQoJ2JsdXInKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm90LW91dGVyLWNvbnQnKS5jbGFzc0xpc3QuYWRkKCdibHVyJyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZW1vdmVMb2FkZXIoKSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmxvYWRlcicpLnJlbW92ZSgpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50b3Atb3V0ZXItY29udCcpLmNsYXNzTGlzdC5yZW1vdmUoJ2JsdXInKTtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm90LW91dGVyLWNvbnQnKS5jbGFzc0xpc3QucmVtb3ZlKCdibHVyJyk7XG59XG4iLCJpbXBvcnQgeyBkaXNwbGF5RGFpbHlEYXRhLCBkaXNwbGF5SG91cmx5RGF0YSwgZGlzcGxheVRvcERhdGEgfSBmcm9tIFwiLi9kaXNwbGF5Q29udHJvbGxlclwiO1xuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gXCIuL2ZldGNoRGF0YVwiO1xuaW1wb3J0IHsgZ2V0TGF0TG9uIH0gZnJvbSBcIi4vZmV0Y2hMYXRMb25cIjtcbmltcG9ydCB7IGFkZExvYWRlciwgcmVtb3ZlTG9hZGVyIH0gZnJvbSBcIi4vbG9hZGVyXCI7XG5cbmxldCBzYXZlZERhdGEgPSB7fTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRMb2MobG9jYXRpb24pIHtcbiAgICBsZXQgZGF0YSA9IHJldHVybkRhdGEobG9jYXRpb24pO1xuICAgIGRhdGEudGhlbigoZGF0YSk9PiB7XG4gICAgICAgIHNhdmVkRGF0YSA9IGRhdGE7XG4gICAgICAgIGNvbnNvbGUubG9nKHNhdmVkRGF0YSk7XG4gICAgICAgIGRpc3BsYXlUb3BEYXRhKGRhdGEsIGxvY2F0aW9uKTtcbiAgICAgICAgZGlzcGxheURhaWx5RGF0YShkYXRhKTtcbiAgICAgICAgcmVtb3ZlTG9hZGVyKCk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hMb2MoKSB7XG4gICAgbGV0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYnRuJyk7XG4gICAgc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbi1pbnB1dCcpLnZhbHVlO1xuICAgICAgICBsZXQgZGF0YSA9IHJldHVybkRhdGEobG9jYXRpb24pO1xuICAgICAgICBkYXRhLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgc2F2ZWREYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGRpc3BsYXlUb3BEYXRhKGRhdGEsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlEYWlseURhdGEoZGF0YSk7XG4gICAgICAgICAgICByZW1vdmVMb2FkZXIoKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnREYXRhKCkge1xuICAgIHJldHVybiBzYXZlZERhdGE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJldHVybkRhdGEobG9jYXRpb24pIHtcbiAgICBhZGRMb2FkZXIoKTtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBhd2FpdCBnZXRMYXRMb24obG9jYXRpb24pXG4gICAgbGV0IGRhdGEgPSBhd2FpdCBnZXREYXRhKGNvb3JkaW5hdGVzLmxhdCwgY29vcmRpbmF0ZXMubG9uKTtcbiAgICByZXR1cm4gZGF0YTtcbiAgICAvLyBjb25zb2xlLmxvZyhjb29yZGluYXRlcy5sYXQpO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzLmxvbik7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc2V0QmFja2dyb3VuZChjdXJyZW50V2VhdGhlcikge1xuICAgIGlmIChjdXJyZW50V2VhdGhlciA9PSAnQ2xvdWRzJykge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltYWdlL2Nsb3VkLmpwZycpXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSAnYmxhY2snO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFdlYXRoZXIgPT0gJ1N1bm55Jykge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltYWdlL3N1bm55LmpwZycpXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSAnYmxhY2snO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFdlYXRoZXIgPT0gJ1JhaW4nKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1hZ2UvcmFpbi5qcGcnKVwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gJ3doaXRlJztcbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRXZWF0aGVyID09ICdDbGVhcicpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWFnZS9jbGVhci5qcGcnKVwiO1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmNvbG9yID0gJ2JsYWNrJztcbiAgICB9XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIlxuXG5pbXBvcnQge2RlZmF1bHRMb2MsIHNlYXJjaExvY30gZnJvbSAnLi9sb2NhdGlvblNlYXJjaC5qcyc7XG5cblxuLy8gZGVmYXVsdCBsb2NhdGlvbiB1cG9uIHBhZ2UgbG9hZCBpcyBTZWF0dGxlXG5kZWZhdWx0TG9jKCdTZWF0dGxlJyk7XG5cbi8vIHNldHMgdXAgc2VhcmNoIGZ1bmN0aW9uXG5zZWFyY2hMb2MoKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==