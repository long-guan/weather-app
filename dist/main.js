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
let dailyForecast = document.querySelectorAll('.daily');
let hourlyBtn = document.querySelector('.hourly-btn');

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
    let dailyData = data.daily.splice(1);
    let index = 0;
    for (let day of dailyForecast) {
        day.children[0].innerHTML = weekDays[index];
        day.children[1].innerHTML = Math.round(dailyData[index].temp.max) + '°F';
        day.children[2].innerHTML = Math.round(dailyData[index].temp.min) + '°F';
        day.children[3].innerHTML = dailyData[index].weather[0].main;
        index++;
    }
}

function displayHourlyData(data) {
    hourlyBtn.addEventListener('click', ()=> {
        sortHourlyData(data)
        console.log('working');
    });
}

function sortHourlyData(data) {
    let hours = data.hourly;
    console.log(hours);
    convertUnixToHour(hours);
}

function convertUnixToHour(hours) {
    let convertedHours = [];
    for (let hour in hours) {
        let unixTime = new Date(hour.dt * 1000);
        convertedHours.push(unixTime.toLocaleTimeString("en-US"));
    }
    console.log(convertedHours);
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
/* harmony export */   "searchLoc": () => (/* binding */ searchLoc)
/* harmony export */ });
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");
/* harmony import */ var _fetchData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchData */ "./src/fetchData.js");
/* harmony import */ var _fetchLatLon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchLatLon */ "./src/fetchLatLon.js");




function defaultLoc(location) {
    let data = returnData(location);
        data.then((data)=> {
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
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayTopData)(data, location);
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayDailyData)(data);
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayHourlyData)(data);
        });

    });
}

async function returnData(location) {
    let coordinates = await (0,_fetchLatLon__WEBPACK_IMPORTED_MODULE_2__.getLatLon)(location)
    let data = await (0,_fetchData__WEBPACK_IMPORTED_MODULE_1__.getData)(coordinates.lat, coordinates.lon);
    console.log(data);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNKMEQ7OztBQUcxRDtBQUNBLDhEQUFVOztBQUVWO0FBQ0EsNkRBQVMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9kaXNwbGF5Q29udHJvbGxlci5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC8uL3NyYy9mZXRjaERhdGEuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZmV0Y2hMYXRMb24uanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbG9jYXRpb25TZWFyY2guanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvc2V0QmFja2dyb3VuZC5qcyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNldEJhY2tncm91bmQgfSBmcm9tIFwiLi9zZXRCYWNrZ3JvdW5kXCI7XG5cbmxldCBjdXJyZW50V2VhdGhlck1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY3VycmVudC13ZWF0aGVyLW1haW4nKTtcbmxldCBsb2NhdGlvbkRpc3BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24tZGlzcGxheScpO1xubGV0IHdlYXRoZXJEZXNjID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndlYXRoZXItZGVzYycpO1xubGV0IGRheURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGF5LWRhdGUnKTtcbmxldCB0aW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRpbWUnKTtcbmxldCB0ZW1wZXJhdHVyZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZW1wZXJhdHVyZScpO1xubGV0IHdpbmRDaGlsbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53aW5kLWNoaWxsJyk7XG5sZXQgaHVtaWRpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaHVtaWRpdHknKTtcbmxldCByYWluQ2hhbmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJhaW4tY2hhbmNlJyk7XG5sZXQgd2luZFNwZWVkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLndpbmQtc3BlZWQnKTtcbmxldCBkYWlseUZvcmVjYXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmRhaWx5Jyk7XG5sZXQgaG91cmx5QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvdXJseS1idG4nKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlUb3BEYXRhKGRhdGEsIGxvY2F0aW9uKSB7XG4gICAgY3VycmVudFdlYXRoZXJNYWluLmlubmVySFRNTCA9IGRhdGEuY3VycmVudC53ZWF0aGVyWzBdLm1haW47XG4gICAgc2V0QmFja2dyb3VuZChkYXRhLmN1cnJlbnQud2VhdGhlclswXS5tYWluKTtcbiAgICBsb2NhdGlvbkRpc3BsYXkuaW5uZXJIVE1MID0gZml4Q2FzZShsb2NhdGlvbik7XG4gICAgd2VhdGhlckRlc2MuaW5uZXJIVE1MID0gZGF0YS5jdXJyZW50LndlYXRoZXJbMF0uZGVzY3JpcHRpb247XG4gICAgZGF5RGF0ZS5pbm5lckhUTUwgPSBnZXREYXkoKSArICcsICcgKyBnZXREYXRlKCk7XG4gICAgdGltZS5pbm5lckhUTUwgPSBnZXRUaW1lKCk7XG4gICAgdGVtcGVyYXR1cmUuaW5uZXJIVE1MID0gTWF0aC5yb3VuZChkYXRhLmN1cnJlbnQudGVtcCkgKyAnIMKwRic7XG4gICAgd2luZENoaWxsLmlubmVySFRNTCA9IE1hdGgucm91bmQoZGF0YS5jdXJyZW50LmZlZWxzX2xpa2UpICsgJyDCsEYnO1xuICAgIGh1bWlkaXR5LmlubmVySFRNTCA9IGRhdGEuY3VycmVudC5odW1pZGl0eSArICclJztcbiAgICByYWluQ2hhbmNlLmlubmVySFRNTCA9IE1hdGgucm91bmQoZGF0YS5kYWlseVswXS5wb3AgKiAxMDApICsgJyUnO1xuICAgIHdpbmRTcGVlZC5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhdGEuY3VycmVudC53aW5kX3NwZWVkKSArICcgbXBoJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpc3BsYXlEYWlseURhdGEoZGF0YSkge1xuICAgIGxldCB3ZWVrRGF5cyA9IHNvcnRXZWVrRGF5cygpO1xuICAgIGxldCBkYWlseURhdGEgPSBkYXRhLmRhaWx5LnNwbGljZSgxKTtcbiAgICBsZXQgaW5kZXggPSAwO1xuICAgIGZvciAobGV0IGRheSBvZiBkYWlseUZvcmVjYXN0KSB7XG4gICAgICAgIGRheS5jaGlsZHJlblswXS5pbm5lckhUTUwgPSB3ZWVrRGF5c1tpbmRleF07XG4gICAgICAgIGRheS5jaGlsZHJlblsxXS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhaWx5RGF0YVtpbmRleF0udGVtcC5tYXgpICsgJ8KwRic7XG4gICAgICAgIGRheS5jaGlsZHJlblsyXS5pbm5lckhUTUwgPSBNYXRoLnJvdW5kKGRhaWx5RGF0YVtpbmRleF0udGVtcC5taW4pICsgJ8KwRic7XG4gICAgICAgIGRheS5jaGlsZHJlblszXS5pbm5lckhUTUwgPSBkYWlseURhdGFbaW5kZXhdLndlYXRoZXJbMF0ubWFpbjtcbiAgICAgICAgaW5kZXgrKztcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5SG91cmx5RGF0YShkYXRhKSB7XG4gICAgaG91cmx5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgICAgIHNvcnRIb3VybHlEYXRhKGRhdGEpXG4gICAgICAgIGNvbnNvbGUubG9nKCd3b3JraW5nJyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIHNvcnRIb3VybHlEYXRhKGRhdGEpIHtcbiAgICBsZXQgaG91cnMgPSBkYXRhLmhvdXJseTtcbiAgICBjb25zb2xlLmxvZyhob3Vycyk7XG4gICAgY29udmVydFVuaXhUb0hvdXIoaG91cnMpO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0VW5peFRvSG91cihob3Vycykge1xuICAgIGxldCBjb252ZXJ0ZWRIb3VycyA9IFtdO1xuICAgIGZvciAobGV0IGhvdXIgaW4gaG91cnMpIHtcbiAgICAgICAgbGV0IHVuaXhUaW1lID0gbmV3IERhdGUoaG91ci5kdCAqIDEwMDApO1xuICAgICAgICBjb252ZXJ0ZWRIb3Vycy5wdXNoKHVuaXhUaW1lLnRvTG9jYWxlVGltZVN0cmluZyhcImVuLVVTXCIpKTtcbiAgICB9XG4gICAgY29uc29sZS5sb2coY29udmVydGVkSG91cnMpO1xufVxuXG4vLyByZXR1cm5zIHRoZSBsb2NhdGlvbiBuYW1lIHdpdGggdGhlIGZpcnN0IGxldHRlciBjYXBpdGFsaXplZFxuZnVuY3Rpb24gZml4Q2FzZShsb2NhdGlvbikge1xuICAgIGxldCBmaXJzdExldHRlciA9IGxvY2F0aW9uWzBdLnRvVXBwZXJDYXNlKCk7XG4gICAgbGV0IHJlc3QgPSBsb2NhdGlvbi5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBmaXJzdExldHRlciArIHJlc3Q7XG59XG5cbi8vIHJldHVybnMgZGF5IG9mIHRoZSB3ZWVrIHN0YXJ0aW5nIHdpdGggdGhlIGRheSBvZiB0aGUgd2VlayBmb3IgdG9tb3Jyb3dcbmZ1bmN0aW9uIHNvcnRXZWVrRGF5cygpIHtcbiAgICBsZXQgZGF5ID0gZ2V0RGF5KCk7XG4gICAgbGV0IHdlZWtEYXlzID0gWydNb25kYXknLCAnVHVlc2RheScsICdXZWRuZXNkYXknLCAnVGh1cnNkYXknLCAnRnJpZGF5JywgJ1NhdHVyZGF5JywgJ1N1bmRheSddO1xuICAgIGlmIChkYXkgPT0gJ01vbmRheScpIHtcbiAgICAgICAgbGV0IHNlY29uZFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgwLCAxKTtcbiAgICAgICAgbGV0IGZpcnN0UGFydCA9IHdlZWtEYXlzLnNsaWNlKDEpO1xuICAgICAgICBsZXQgc29ydGVkRGF5ID0gZmlyc3RQYXJ0LmNvbmNhdChzZWNvbmRQYXJ0KTtcbiAgICAgICAgcmV0dXJuIHNvcnRlZERheTtcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAnVHVlc2RheScpIHsgLy8gMFxuICAgICAgICBsZXQgc2Vjb25kUGFydCA9IHdlZWtEYXlzLnNsaWNlKDAsIDIpO1xuICAgICAgICBsZXQgZmlyc3RQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMik7XG4gICAgICAgIGxldCBzb3J0ZWREYXkgPSBmaXJzdFBhcnQuY29uY2F0KHNlY29uZFBhcnQpO1xuICAgICAgICByZXR1cm4gc29ydGVkRGF5O1xuICAgIH0gZWxzZSBpZiAoZGF5ID09ICdXZWRuZXNkYXknKSB7XG4gICAgICAgIGxldCBzZWNvbmRQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMCwgMyk7XG4gICAgICAgIGxldCBmaXJzdFBhcnQgPSB3ZWVrRGF5cy5zbGljZSgzKTtcbiAgICAgICAgbGV0IHNvcnRlZERheSA9IGZpcnN0UGFydC5jb25jYXQoc2Vjb25kUGFydCk7XG4gICAgICAgIHJldHVybiBzb3J0ZWREYXk7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gJ1RodXJzZGF5Jykge1xuICAgICAgICBsZXQgc2Vjb25kUGFydCA9IHdlZWtEYXlzLnNsaWNlKDAsIDQpO1xuICAgICAgICBsZXQgZmlyc3RQYXJ0ID0gd2Vla0RheXMuc2xpY2UoNCk7XG4gICAgICAgIGxldCBzb3J0ZWREYXkgPSBmaXJzdFBhcnQuY29uY2F0KHNlY29uZFBhcnQpO1xuICAgICAgICByZXR1cm4gc29ydGVkRGF5O1xuICAgIH0gZWxzZSBpZiAoZGF5ID09ICdGcmlkYXknKSB7XG4gICAgICAgIGxldCBzZWNvbmRQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMCwgNSk7XG4gICAgICAgIGxldCBmaXJzdFBhcnQgPSB3ZWVrRGF5cy5zbGljZSg1KTtcbiAgICAgICAgbGV0IHNvcnRlZERheSA9IGZpcnN0UGFydC5jb25jYXQoc2Vjb25kUGFydCk7XG4gICAgICAgIHJldHVybiBzb3J0ZWREYXk7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gJ1NhdHVyZGF5Jykge1xuICAgICAgICBsZXQgc2Vjb25kUGFydCA9IHdlZWtEYXlzLnNsaWNlKDAsIDYpO1xuICAgICAgICBsZXQgZmlyc3RQYXJ0ID0gd2Vla0RheXMuc2xpY2UoNik7XG4gICAgICAgIGxldCBzb3J0ZWREYXkgPSBmaXJzdFBhcnQuY29uY2F0KHNlY29uZFBhcnQpO1xuICAgICAgICByZXR1cm4gc29ydGVkRGF5O1xuICAgIH0gZWxzZSBpZiAoZGF5ID09ICdTdW5kYXknKSB7XG4gICAgICAgIGxldCBzZWNvbmRQYXJ0ID0gd2Vla0RheXMuc2xpY2UoMCwgNyk7XG4gICAgICAgIGxldCBmaXJzdFBhcnQgPSB3ZWVrRGF5cy5zbGljZSg3KTtcbiAgICAgICAgbGV0IHNvcnRlZERheSA9IGZpcnN0UGFydC5jb25jYXQoc2Vjb25kUGFydCk7XG4gICAgICAgIHJldHVybiBzb3J0ZWREYXk7XG4gICAgfVxufVxuXG4vLyByZXR1cm5zIGN1cnJlbnQgZGF5XG5mdW5jdGlvbiBnZXREYXkoKSB7XG4gICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBkYXkgPSBkLmdldERheSgpO1xuICAgIGlmIChkYXkgPT0gMCkge1xuICAgICAgICByZXR1cm4gJ1N1bmRheSc7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gMSkge1xuICAgICAgICByZXR1cm4gJ01vbmRheSc7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gMikge1xuICAgICAgICByZXR1cm4gJ1R1ZXNkYXknO1xuICAgIH0gZWxzZSBpZiAoZGF5ID09IDMpIHtcbiAgICAgICAgcmV0dXJuICdXZWRuZXNkYXknO1xuICAgIH0gZWxzZSBpZiAoZGF5ID09IDQpIHtcbiAgICAgICAgcmV0dXJuICdUaHVyc2RheSc7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gNSkge1xuICAgICAgICByZXR1cm4gJ0ZyaWRheSc7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gNikge1xuICAgICAgICByZXR1cm4gJ1NhdHVyZGF5JztcbiAgICB9XG59XG5cbi8vIHJldHVybnMgbW9udGggYW5kIGRhdGUgZnJvbSBuZXcgRGF0ZSgpXG5mdW5jdGlvbiBnZXREYXRlKCkge1xuICAgIGxldCBkID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY291bnQgPSAwO1xuICAgIGxldCBkYXRlID0gJyc7XG4gICAgZm9yIChsZXQgY2hhciBvZiBTdHJpbmcoZCkpIHtcbiAgICAgICAgaWYgKGNoYXIgPT0gJyAnKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PSAxIHx8IGNvdW50ID09IDIpIHtcbiAgICAgICAgICAgIGRhdGUgKz0gY2hhcjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGF0ZTtcbn1cblxuLy8gcmV0dXJucyB0aW1lIGZyb20gbmV3IERhdGUoKVxuZnVuY3Rpb24gZ2V0VGltZSgpIHtcbiAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBsZXQgdGltZSA9ICcnO1xuICAgIGZvciAobGV0IGNoYXIgb2YgU3RyaW5nKGQpKSB7XG4gICAgICAgIGlmIChjaGFyID09ICcgJykge1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQgPT0gNCkge1xuICAgICAgICAgICAgdGltZSArPSBjaGFyO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRpbWUgPSBmb3JtYXRUaW1lKHRpbWUpO1xuICAgIHJldHVybiB0aW1lO1xufVxuXG4vLyBjb252ZXJ0cyBtaWxpdGFyeSB0aW1lIHRvIHN0YW5kYXJkIDEyLWhyIHRpbWUgZm9ybWF0IChociBhbmQgbWludXRlKVxuZnVuY3Rpb24gZm9ybWF0VGltZSh0aW1lKSB7XG4gICAgbGV0IGhvdXIgPSB0aW1lLnNsaWNlKDAsMyk7XG4gICAgbGV0IG1pbnV0ZSA9IHRpbWUuc2xpY2UoNCw2KTtcbiAgICBsZXQgcG0gPSBmYWxzZTtcbiAgICBpZiAoaG91ciA+IDEyKSB7XG4gICAgICAgIGhvdXIgPSBob3VyIC0gMTI7XG4gICAgICAgIHBtID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHBtID09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIGhvdXIgKyAnOicgKyBtaW51dGUgKyAnIFBNJztcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaG91ciArICc6JyArIG1pbnV0ZSArICcgQU0nO1xuICAgIH1cbn1cbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXREYXRhKGxhdCwgbG9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IHVybCA9ICdodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8zLjAvb25lY2FsbD9sYXQ9JyArIGxhdCArICcmbG9uPScgKyBsb24gKyAnJkFQUElEPTUwMWQwZjEyMWE4OGY1ODg5MTc1NTU5Y2U2MDU1ZTQxJnVuaXRzPWltcGVyaWFsJztcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICByZXR1cm4gZGF0YTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRMYXRMb24obG9jYXRpb24pIHtcbiAgICB0cnkge1xuICAgICAgICBsZXQgdXJsID0gJ2h0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JyArIGxvY2F0aW9uICsgJyZBUFBJRD01MDFkMGYxMjFhODhmNTg4OTE3NTU1OWNlNjA1NWU0MSdcbiAgICAgICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2godXJsKTtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhWzBdLmxvbik7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFbMF0ubGF0KTtcbiAgICAgICAgcmV0dXJuIHtsb246IGRhdGFbMF0ubG9uLCBsYXQ6IGRhdGFbMF0ubGF0fTtcbiAgICB9IGNhdGNoKGVycikge1xuICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IGRpc3BsYXlEYWlseURhdGEsIGRpc3BsYXlIb3VybHlEYXRhLCBkaXNwbGF5VG9wRGF0YSB9IGZyb20gXCIuL2Rpc3BsYXlDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4vZmV0Y2hEYXRhXCI7XG5pbXBvcnQgeyBnZXRMYXRMb24gfSBmcm9tIFwiLi9mZXRjaExhdExvblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gZGVmYXVsdExvYyhsb2NhdGlvbikge1xuICAgIGxldCBkYXRhID0gcmV0dXJuRGF0YShsb2NhdGlvbik7XG4gICAgICAgIGRhdGEudGhlbigoZGF0YSk9PiB7XG4gICAgICAgICAgICBkaXNwbGF5VG9wRGF0YShkYXRhLCBsb2NhdGlvbik7XG4gICAgICAgICAgICBkaXNwbGF5RGFpbHlEYXRhKGRhdGEpO1xuICAgICAgICAgICAgZGlzcGxheUhvdXJseURhdGEoZGF0YSk7XG4gICAgICAgIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoTG9jKCkge1xuICAgIGxldCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJ0bicpO1xuICAgIHNlYXJjaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpPT4ge1xuICAgICAgICBsZXQgbG9jYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubG9jYXRpb24taW5wdXQnKS52YWx1ZTtcbiAgICAgICAgbGV0IGRhdGEgPSByZXR1cm5EYXRhKGxvY2F0aW9uKTtcbiAgICAgICAgZGF0YS50aGVuKChkYXRhKT0+IHtcbiAgICAgICAgICAgIGRpc3BsYXlUb3BEYXRhKGRhdGEsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGRpc3BsYXlEYWlseURhdGEoZGF0YSk7XG4gICAgICAgICAgICBkaXNwbGF5SG91cmx5RGF0YShkYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmV0dXJuRGF0YShsb2NhdGlvbikge1xuICAgIGxldCBjb29yZGluYXRlcyA9IGF3YWl0IGdldExhdExvbihsb2NhdGlvbilcbiAgICBsZXQgZGF0YSA9IGF3YWl0IGdldERhdGEoY29vcmRpbmF0ZXMubGF0LCBjb29yZGluYXRlcy5sb24pO1xuICAgIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIHJldHVybiBkYXRhO1xuICAgIC8vIGNvbnNvbGUubG9nKGNvb3JkaW5hdGVzLmxhdCk7XG4gICAgLy8gY29uc29sZS5sb2coY29vcmRpbmF0ZXMubG9uKTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBzZXRCYWNrZ3JvdW5kKGN1cnJlbnRXZWF0aGVyKSB7XG4gICAgaWYgKGN1cnJlbnRXZWF0aGVyID09ICdDbG91ZHMnKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1hZ2UvY2xvdWQuanBnJylcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9ICdibGFjayc7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50V2VhdGhlciA9PSAnU3VubnknKSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJ1cmwoJy4vaW1hZ2Uvc3VubnkuanBnJylcIjtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5jb2xvciA9ICdibGFjayc7XG4gICAgfSBlbHNlIGlmIChjdXJyZW50V2VhdGhlciA9PSAnUmFpbicpIHtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcInVybCgnLi9pbWFnZS9yYWluLmpwZycpXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSAnd2hpdGUnO1xuICAgIH0gZWxzZSBpZiAoY3VycmVudFdlYXRoZXIgPT0gJ0NsZWFyJykge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IFwidXJsKCcuL2ltYWdlL2NsZWFyLmpwZycpXCI7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuY29sb3IgPSAnYmxhY2snO1xuICAgIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiXG5cbmltcG9ydCB7ZGVmYXVsdExvYywgc2VhcmNoTG9jfSBmcm9tICcuL2xvY2F0aW9uU2VhcmNoLmpzJztcblxuXG4vLyBkZWZhdWx0IGxvY2F0aW9uIHVwb24gcGFnZSBsb2FkIGlzIFNlYXR0bGVcbmRlZmF1bHRMb2MoJ1NlYXR0bGUnKTtcblxuLy8gc2V0cyB1cCBzZWFyY2ggZnVuY3Rpb25cbnNlYXJjaExvYygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9