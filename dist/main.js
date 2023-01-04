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
    let savedData = data;
    let weekDays = sortWeekDays();
    let dailyData = savedData.daily.splice(1);
    console.log(savedData);
    console.log(dailyData);
    let index = 0;
    for (let day of forecast) {
        day.children[0].innerHTML = weekDays[index];
        day.children[1].innerHTML = Math.round(dailyData[index].temp.max) + '°F';
        day.children[2].innerHTML = Math.round(dailyData[index].temp.min) + '°F';
        day.children[3].innerHTML = dailyData[index].weather[0].main;
        index++;
    }
}

function displayHourlyData(data) {
    hourlyBtn.addEventListener('click', ()=> {
        let hourData = convertHourly(data);
        hourData.splice(0,1); // remove current hour
        let index = 0;
        for (let hour of forecast) {
            hour.children[0].innerHTML = hourData[index].dt;
            hour.children[1].innerHTML = Math.round(hourData[index].temp) + '°F';
            hour.children[2].innerHTML = Math.round(hourData[index].pop * 100) + '% Rain';
            hour.children[3].innerHTML = hourData[index].weather[0].main;
            index++;
        }
    });
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




let savedData = [];

function defaultLoc(location) {
    let data = returnData(location);
        data.then((data)=> {
            savedData = data;
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayTopData)(data, location);
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayDailyData)(data);
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayHourlyData)(data);
        });
}

function searchLoc() {
    let searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', ()=> {
        let location = document.querySelector('.location-input').value;
        let data = returnData(location);
        data.then((data)=> {
            savedData = data;
            console.log(savedData);
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayTopData)(data, location);
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayDailyData)(data);
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayHourlyData)(data);
        });

    });
}

function exportData() {
    console.log(savedData);
    return savedData;
}

async function returnData(location) {
    let coordinates = await (0,_fetchLatLon__WEBPACK_IMPORTED_MODULE_2__.getLatLon)(location)
    let data = await (0,_fetchData__WEBPACK_IMPORTED_MODULE_1__.getData)(coordinates.lat, coordinates.lon);
    console.log(data);
    console.log(data.daily[0]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDTjtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2RBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ0owRDs7O0FBRzFEO0FBQ0EsOERBQVU7O0FBRVY7QUFDQSw2REFBUyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2Rpc3BsYXlDb250cm9sbGVyLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ZldGNoRGF0YS5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mZXRjaExhdExvbi5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9sb2NhdGlvblNlYXJjaC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9zZXRCYWNrZ3JvdW5kLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2V0QmFja2dyb3VuZCB9IGZyb20gXCIuL3NldEJhY2tncm91bmRcIjtcbmltcG9ydCB7IGV4cG9ydERhdGEgfSBmcm9tIFwiLi9sb2NhdGlvblNlYXJjaC5qc1wiXG5cbmxldCBjdXJyZW50V2VhdGhlck1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC13ZWF0aGVyLW1haW4nKTtcbmxldCBsb2NhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24tZGlzcGxheScpO1xubGV0IHdlYXRoZXJEZXNjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItZGVzYycpO1xubGV0IGRheURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF5LWRhdGUnKTtcbmxldCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcbmxldCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZScpO1xubGV0IHdpbmRDaGlsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kLWNoaWxsJyk7XG5sZXQgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHknKTtcbmxldCByYWluQ2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhaW4tY2hhbmNlJyk7XG5sZXQgd2luZFNwZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQtc3BlZWQnKTtcbmxldCBmb3JlY2FzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kYWlseScpO1xubGV0IGhvdXJseUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ob3VybHktYnRuJyk7XG5sZXQgZGFpbHlCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGFpbHktYnRuJyk7XG5sZXQgZGFpbHkgPSB0cnVlO1xuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheVRvcERhdGEoZGF0YSwgbG9jYXRpb24pIHtcbiAgICBjdXJyZW50V2VhdGhlck1haW4uaW5uZXJIVE1MID0gZGF0YS5jdXJyZW50LndlYXRoZXJbMF0ubWFpbjtcbiAgICBzZXRCYWNrZ3JvdW5kKGRhdGEuY3VycmVudC53ZWF0aGVyWzBdLm1haW4pO1xuICAgIGxvY2F0aW9uRGlzcGxheS5pbm5lckhUTUwgPSBmaXhDYXNlKGxvY2F0aW9uKTtcbiAgICB3ZWF0aGVyRGVzYy5pbm5lckhUTUwgPSBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICBkYXlEYXRlLmlubmVySFRNTCA9IGdldERheSgpICsgJywgJyArIGdldERhdGUoKTtcbiAgICB0aW1lLmlubmVySFRNTCA9IGdldFRpbWUoKTtcbiAgICB0ZW1wZXJhdHVyZS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC50ZW1wKSArICcgwrBGJztcbiAgICB3aW5kQ2hpbGwuaW5uZXJIVE1MID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQuZmVlbHNfbGlrZSkgKyAnIMKwRic7XG4gICAgaHVtaWRpdHkuaW5uZXJIVE1MID0gZGF0YS5jdXJyZW50Lmh1bWlkaXR5ICsgJyUnO1xuICAgIHJhaW5DaGFuY2UuaW5uZXJIVE1MID0gTWF0aC5yb3VuZChkYXRhLmRhaWx5WzBdLnBvcCAqIDEwMCkgKyAnJSc7XG4gICAgd2luZFNwZWVkLmlubmVySFRNTCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LndpbmRfc3BlZWQpICsgJyBtcGgnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGlzcGxheURhaWx5RGF0YShkYXRhKSB7XG4gICAgbGV0IHNhdmVkRGF0YSA9IGRhdGE7XG4gICAgbGV0IHdlZWtEYXlzID0gc29ydFdlZWtEYXlzKCk7XG4gICAgbGV0IGRhaWx5RGF0YSA9IHNhdmVkRGF0YS5kYWlseS5zcGxpY2UoMSk7XG4gICAgY29uc29sZS5sb2coc2F2ZWREYXRhKTtcbiAgICBjb25zb2xlLmxvZyhkYWlseURhdGEpO1xuICAgIGxldCBpbmRleCA9IDA7XG4gICAgZm9yIChsZXQgZGF5IG9mIGZvcmVjYXN0KSB7XG4gICAgICAgIGRheS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSB3ZWVrRGF5c1tpbmRleF07XG4gICAgICAgIGRheS5jaGlsZHJlblsxXS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhaWx5RGF0YVtpbmRleF0udGVtcC5tYXgpICsgJ8KwRic7XG4gICAgICAgIGRheS5jaGlsZHJlblsyXS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhaWx5RGF0YVtpbmRleF0udGVtcC5taW4pICsgJ8KwRic7XG4gICAgICAgIGRheS5jaGlsZHJlblszXS5pbm5lckhUTUwgPSBkYWlseURhdGFbaW5kZXhdLndlYXRoZXJbMF0ubWFpbjtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5SG91cmx5RGF0YShkYXRhKSB7XG4gICAgaG91cmx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgICAgIGxldCBob3VyRGF0YSA9IGNvbnZlcnRIb3VybHkoZGF0YSk7XG4gICAgICAgIGhvdXJEYXRhLnNwbGljZSgwLDEpOyAvLyByZW1vdmUgY3VycmVudCBob3VyXG4gICAgICAgIGxldCBpbmRleCA9IDA7XG4gICAgICAgIGZvciAobGV0IGhvdXIgb2YgZm9yZWNhc3QpIHtcbiAgICAgICAgICAgIGhvdXIuY2hpbGRyZW5bMF0uaW5uZXJIVE1MID0gaG91ckRhdGFbaW5kZXhdLmR0O1xuICAgICAgICAgICAgaG91ci5jaGlsZHJlblsxXS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGhvdXJEYXRhW2luZGV4XS50ZW1wKSArICfCsEYnO1xuICAgICAgICAgICAgaG91ci5jaGlsZHJlblsyXS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGhvdXJEYXRhW2luZGV4XS5wb3AgKiAxMDApICsgJyUgUmFpbic7XG4gICAgICAgICAgICBob3VyLmNoaWxkcmVuWzNdLmlubmVySFRNTCA9IGhvdXJEYXRhW2luZGV4XS53ZWF0aGVyWzBdLm1haW47XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmRhaWx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgaWYgKGRhaWx5ID09IGZhbHNlKSB7XG4gICAgICAgIGRhaWx5ID0gdHJ1ZTtcbiAgICAgICAgaG91cmx5QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgICAgIGRhaWx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgIGRpc3BsYXlEYWlseURhdGEoZXhwb3J0RGF0YSgpKTtcbiAgICB9XG59KTtcblxuaG91cmx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgaWYgKGRhaWx5ID09IHRydWUpIHtcbiAgICAgICAgZGFpbHkgPSBmYWxzZTtcbiAgICAgICAgZGFpbHlCdG4uY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICAgICAgaG91cmx5QnRuLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XG4gICAgICAgIGRpc3BsYXlIb3VybHlEYXRhKGV4cG9ydERhdGEoKSk7XG4gICAgfVxufSk7XG5cbi8vIGNvbnZlcnQgdW5peFRpbWUgdG8gbG9jYWwgdGltZVxuZnVuY3Rpb24gY29udmVydEhvdXJseShkYXRhKSB7XG4gICAgbGV0IGhvdXJzID0gZGF0YS5ob3VybHk7XG4gICAgZm9yIChsZXQgaG91ciBvZiBob3Vycykge1xuICAgICAgICBsZXQgdW5peFRpbWUgPSBuZXcgRGF0ZShob3VyLmR0ICogMTAwMCk7XG4gICAgICAgIGxldCBob3VyVW5jb252ZXJ0ZWQgPSB1bml4VGltZS50b0xvY2FsZVRpbWVTdHJpbmcoXCJlbi1VU1wiKTtcbiAgICAgICAgbGV0IGFtUG0gPSAnICcgKyBob3VyVW5jb252ZXJ0ZWRbaG91clVuY29udmVydGVkLmxlbmd0aCAtIDJdICsgaG91clVuY29udmVydGVkW2hvdXJVbmNvbnZlcnRlZC5sZW5ndGggLSAxXTtcbiAgICAgICAgaG91ci5kdCA9IE1hdGgucm91bmQocGFyc2VJbnQoaG91clVuY29udmVydGVkKSkgKyBhbVBtO1xuICAgIH1cbiAgICByZXR1cm4gaG91cnM7XG59XG5cbi8vIHJldHVybnMgdGhlIGxvY2F0aW9uIG5hbWUgd2l0aCB0aGUgZmlyc3QgbGV0dGVyIGNhcGl0YWxpemVkXG5mdW5jdGlvbiBmaXhDYXNlKGxvY2F0aW9uKSB7XG4gICAgbGV0IGZpcnN0TGV0dGVyID0gbG9jYXRpb25bMF0udG9VcHBlckNhc2UoKTtcbiAgICBsZXQgcmVzdCA9IGxvY2F0aW9uLnNsaWNlKDEpLnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIGZpcnN0TGV0dGVyICsgcmVzdDtcbn1cblxuLy8gcmV0dXJucyBkYXkgb2YgdGhlIHdlZWsgc3RhcnRpbmcgd2l0aCB0aGUgZGF5IG9mIHRoZSB3ZWVrIGZvciB0b21vcnJvd1xuZnVuY3Rpb24gc29ydFdlZWtEYXlzKCkge1xuICAgIGxldCBkYXkgPSBnZXREYXkoKTtcbiAgICBsZXQgd2Vla0RheXMgPSBbJ01vbmRheScsICdUdWVzZGF5JywgJ1dlZG5lc2RheScsICdUaHVyc2RheScsICdGcmlkYXknLCAnU2F0dXJkYXknLCAnU3VuZGF5J107XG4gICAgaWYgKGRheSA9PSAnTW9uZGF5Jykge1xuICAgICAgICBsZXQgc2Vjb25kUGFydCA9IHdlZWtEYXlzLnNsaWNlKDAsIDEpO1xuICAgICAgICBsZXQgZmlyc3RQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMSk7XG4gICAgICAgIGxldCBzb3J0ZWREYXkgPSBmaXJzdFBhcnQuY29uY2F0KHNlY29uZFBhcnQpO1xuICAgICAgICByZXR1cm4gc29ydGVkRGF5O1xuICAgIH0gZWxzZSBpZiAoZGF5ID09ICdUdWVzZGF5JykgeyAvLyAwXG4gICAgICAgIGxldCBzZWNvbmRQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMCwgMik7XG4gICAgICAgIGxldCBmaXJzdFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgyKTtcbiAgICAgICAgbGV0IHNvcnRlZERheSA9IGZpcnN0UGFydC5jb25jYXQoc2Vjb25kUGFydCk7XG4gICAgICAgIHJldHVybiBzb3J0ZWREYXk7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gJ1dlZG5lc2RheScpIHtcbiAgICAgICAgbGV0IHNlY29uZFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgwLCAzKTtcbiAgICAgICAgbGV0IGZpcnN0UGFydCA9IHdlZWtEYXlzLnNsaWNlKDMpO1xuICAgICAgICBsZXQgc29ydGVkRGF5ID0gZmlyc3RQYXJ0LmNvbmNhdChzZWNvbmRQYXJ0KTtcbiAgICAgICAgcmV0dXJuIHNvcnRlZERheTtcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAnVGh1cnNkYXknKSB7XG4gICAgICAgIGxldCBzZWNvbmRQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMCwgNCk7XG4gICAgICAgIGxldCBmaXJzdFBhcnQgPSB3ZWVrRGF5cy5zbGljZSg0KTtcbiAgICAgICAgbGV0IHNvcnRlZERheSA9IGZpcnN0UGFydC5jb25jYXQoc2Vjb25kUGFydCk7XG4gICAgICAgIHJldHVybiBzb3J0ZWREYXk7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gJ0ZyaWRheScpIHtcbiAgICAgICAgbGV0IHNlY29uZFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgwLCA1KTtcbiAgICAgICAgbGV0IGZpcnN0UGFydCA9IHdlZWtEYXlzLnNsaWNlKDUpO1xuICAgICAgICBsZXQgc29ydGVkRGF5ID0gZmlyc3RQYXJ0LmNvbmNhdChzZWNvbmRQYXJ0KTtcbiAgICAgICAgcmV0dXJuIHNvcnRlZERheTtcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAnU2F0dXJkYXknKSB7XG4gICAgICAgIGxldCBzZWNvbmRQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMCwgNik7XG4gICAgICAgIGxldCBmaXJzdFBhcnQgPSB3ZWVrRGF5cy5zbGljZSg2KTtcbiAgICAgICAgbGV0IHNvcnRlZERheSA9IGZpcnN0UGFydC5jb25jYXQoc2Vjb25kUGFydCk7XG4gICAgICAgIHJldHVybiBzb3J0ZWREYXk7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gJ1N1bmRheScpIHtcbiAgICAgICAgbGV0IHNlY29uZFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgwLCA3KTtcbiAgICAgICAgbGV0IGZpcnN0UGFydCA9IHdlZWtEYXlzLnNsaWNlKDcpO1xuICAgICAgICBsZXQgc29ydGVkRGF5ID0gZmlyc3RQYXJ0LmNvbmNhdChzZWNvbmRQYXJ0KTtcbiAgICAgICAgcmV0dXJuIHNvcnRlZERheTtcbiAgICB9XG59XG5cbi8vIHJldHVybnMgY3VycmVudCBkYXlcbmZ1bmN0aW9uIGdldERheSgpIHtcbiAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGRheSA9IGQuZ2V0RGF5KCk7XG4gICAgaWYgKGRheSA9PSAwKSB7XG4gICAgICAgIHJldHVybiAnU3VuZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAxKSB7XG4gICAgICAgIHJldHVybiAnTW9uZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAyKSB7XG4gICAgICAgIHJldHVybiAnVHVlc2RheSc7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gMykge1xuICAgICAgICByZXR1cm4gJ1dlZG5lc2RheSc7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gNCkge1xuICAgICAgICByZXR1cm4gJ1RodXJzZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSA1KSB7XG4gICAgICAgIHJldHVybiAnRnJpZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSA2KSB7XG4gICAgICAgIHJldHVybiAnU2F0dXJkYXknO1xuICAgIH1cbn1cblxuLy8gcmV0dXJucyBtb250aCBhbmQgZGF0ZSBmcm9tIG5ldyBEYXRlKClcbmZ1bmN0aW9uIGdldERhdGUoKSB7XG4gICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBjb3VudCA9IDA7XG4gICAgbGV0IGRhdGUgPSAnJztcbiAgICBmb3IgKGxldCBjaGFyIG9mIFN0cmluZyhkKSkge1xuICAgICAgICBpZiAoY2hhciA9PSAnICcpIHtcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50ID09IDEgfHwgY291bnQgPT0gMikge1xuICAgICAgICAgICAgZGF0ZSArPSBjaGFyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkYXRlO1xufVxuXG4vLyByZXR1cm5zIHRpbWUgZnJvbSBuZXcgRGF0ZSgpXG5mdW5jdGlvbiBnZXRUaW1lKCkge1xuICAgIGxldCBkID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGxldCB0aW1lID0gJyc7XG4gICAgZm9yIChsZXQgY2hhciBvZiBTdHJpbmcoZCkpIHtcbiAgICAgICAgaWYgKGNoYXIgPT0gJyAnKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PSA0KSB7XG4gICAgICAgICAgICB0aW1lICs9IGNoYXI7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdGltZSA9IGZvcm1hdFRpbWUodGltZSk7XG4gICAgcmV0dXJuIHRpbWU7XG59XG5cbi8vIGNvbnZlcnRzIG1pbGl0YXJ5IHRpbWUgdG8gc3RhbmRhcmQgMTItaHIgdGltZSBmb3JtYXQgKGhyIGFuZCBtaW51dGUpXG5mdW5jdGlvbiBmb3JtYXRUaW1lKHRpbWUpIHtcbiAgICBsZXQgaG91ciA9IHRpbWUuc2xpY2UoMCwzKTtcbiAgICBsZXQgbWludXRlID0gdGltZS5zbGljZSg0LDYpO1xuICAgIGxldCBwbSA9IGZhbHNlO1xuICAgIGlmIChob3VyID4gMTIpIHtcbiAgICAgICAgaG91ciA9IGhvdXIgLSAxMjtcbiAgICAgICAgcG0gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAocG0gPT0gdHJ1ZSkge1xuICAgICAgICByZXR1cm4gaG91ciArICc6JyArIG1pbnV0ZSArICcgUE0nO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBob3VyICsgJzonICsgbWludXRlICsgJyBBTSc7XG4gICAgfVxufVxuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERhdGEobGF0LCBsb24pIHtcbiAgICB0cnkge1xuICAgICAgICBsZXQgdXJsID0gJ2h0dHBzOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9kYXRhLzMuMC9vbmVjYWxsP2xhdD0nICsgbGF0ICsgJyZsb249JyArIGxvbiArICcmQVBQSUQ9NTAxZDBmMTIxYTg4ZjU4ODkxNzU1NTljZTYwNTVlNDEmdW5pdHM9aW1wZXJpYWwnO1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuIiwiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldExhdExvbihsb2NhdGlvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCB1cmwgPSAnaHR0cDovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZ2VvLzEuMC9kaXJlY3Q/cT0nICsgbG9jYXRpb24gKyAnJkFQUElEPTUwMWQwZjEyMWE4OGY1ODg5MTc1NTU5Y2U2MDU1ZTQxJ1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwpO1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFbMF0ubG9uKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YVswXS5sYXQpO1xuICAgICAgICByZXR1cm4ge2xvbjogZGF0YVswXS5sb24sIGxhdDogZGF0YVswXS5sYXR9O1xuICAgIH0gY2F0Y2goZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgZGlzcGxheURhaWx5RGF0YSwgZGlzcGxheUhvdXJseURhdGEsIGRpc3BsYXlUb3BEYXRhIH0gZnJvbSBcIi4vZGlzcGxheUNvbnRyb2xsZXJcIjtcbmltcG9ydCB7IGdldERhdGEgfSBmcm9tIFwiLi9mZXRjaERhdGFcIjtcbmltcG9ydCB7IGdldExhdExvbiB9IGZyb20gXCIuL2ZldGNoTGF0TG9uXCI7XG5cbmxldCBzYXZlZERhdGEgPSBbXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRMb2MobG9jYXRpb24pIHtcbiAgICBsZXQgZGF0YSA9IHJldHVybkRhdGEobG9jYXRpb24pO1xuICAgICAgICBkYXRhLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgc2F2ZWREYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGRpc3BsYXlUb3BEYXRhKGRhdGEsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlEYWlseURhdGEoZGF0YSk7XG4gICAgICAgICAgICBkaXNwbGF5SG91cmx5RGF0YShkYXRhKTtcbiAgICAgICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZWFyY2hMb2MoKSB7XG4gICAgbGV0IHNlYXJjaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gtYnRuJyk7XG4gICAgc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbi1pbnB1dCcpLnZhbHVlO1xuICAgICAgICBsZXQgZGF0YSA9IHJldHVybkRhdGEobG9jYXRpb24pO1xuICAgICAgICBkYXRhLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgc2F2ZWREYXRhID0gZGF0YTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNhdmVkRGF0YSk7XG4gICAgICAgICAgICBkaXNwbGF5VG9wRGF0YShkYXRhLCBsb2NhdGlvbik7XG4gICAgICAgICAgICBkaXNwbGF5RGFpbHlEYXRhKGRhdGEpO1xuICAgICAgICAgICAgZGlzcGxheUhvdXJseURhdGEoZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHBvcnREYXRhKCkge1xuICAgIGNvbnNvbGUubG9nKHNhdmVkRGF0YSk7XG4gICAgcmV0dXJuIHNhdmVkRGF0YTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmV0dXJuRGF0YShsb2NhdGlvbikge1xuICAgIGxldCBjb29yZGluYXRlcyA9IGF3YWl0IGdldExhdExvbihsb2NhdGlvbilcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGdldERhdGEoY29vcmRpbmF0ZXMubGF0LCBjb29yZGluYXRlcy5sb24pO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIGNvbnNvbGUubG9nKGRhdGEuZGFpbHlbMF0pO1xuICAgIHJldHVybiBkYXRhO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzLmxhdCk7XG4gICAgLy8gY29uc29sZS5sb2coY29vcmRpbmF0ZXMubG9uKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBzZXRCYWNrZ3JvdW5kKGN1cnJlbnRXZWF0aGVyKSB7XG4gICAgaWYgKGN1cnJlbnRXZWF0aGVyID09ICdDbG91ZHMnKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1hZ2UvY2xvdWQuanBnJylcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9ICdibGFjayc7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50V2VhdGhlciA9PSAnU3VubnknKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1hZ2Uvc3VubnkuanBnJylcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9ICdibGFjayc7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50V2VhdGhlciA9PSAnUmFpbicpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWFnZS9yYWluLmpwZycpXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFdlYXRoZXIgPT0gJ0NsZWFyJykge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltYWdlL2NsZWFyLmpwZycpXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSAnYmxhY2snO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5cbmltcG9ydCB7ZGVmYXVsdExvYywgc2VhcmNoTG9jfSBmcm9tICcuL2xvY2F0aW9uU2VhcmNoLmpzJztcblxuXG4vLyBkZWZhdWx0IGxvY2F0aW9uIHVwb24gcGFnZSBsb2FkIGlzIFNlYXR0bGVcbmRlZmF1bHRMb2MoJ1NlYXR0bGUnKTtcblxuLy8gc2V0cyB1cCBzZWFyY2ggZnVuY3Rpb25cbnNlYXJjaExvYygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9