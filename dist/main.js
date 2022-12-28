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
/* harmony export */   "displayData": () => (/* binding */ displayData)
/* harmony export */ });
let currentWeatherMain = document.querySelector('.current-weather-main');
let locationDisplay = document.querySelector('.location-display');
let weatherDesc = document.querySelector('.weather-desc');
let dayDate = document.querySelector('.day-date');


function displayData(data, location) {
    currentWeatherMain.innerHTML = data.current.weather[0].main;
    locationDisplay.innerHTML = fixCase(location);
    weatherDesc.innerHTML = data.current.weather[0].description;
    dayDate.innerHTML = getDay() + ', ' + getDate();
}

function fixCase(location) {
    let firstLetter = location[0].toUpperCase();
    let rest = location.slice(1).toLowerCase();
    return firstLetter + rest;
}

function getDay() {
    let d = new Date();
    console.log(d);
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

function getDate() {
    let d = new Date();
    let count = 0;
    let date = '';
    for (let letter in d) {
        if (letter == ' ') {
            count++;
        }
        if (count == 1 || 2) {
            date.append(letter);
        }
    }
    console.log(date);
    return date;
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
/* harmony export */   "searchLoc": () => (/* binding */ searchLoc)
/* harmony export */ });
/* harmony import */ var _displayController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./displayController */ "./src/displayController.js");
/* harmony import */ var _fetchData__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fetchData */ "./src/fetchData.js");
/* harmony import */ var _fetchLatLon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./fetchLatLon */ "./src/fetchLatLon.js");




function searchLoc() {
    let searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', ()=> {
        let location = document.querySelector('.location-input').value;
        let data = returnData(location);
        data.then((data)=> {
            (0,_displayController__WEBPACK_IMPORTED_MODULE_0__.displayData)(data, location);
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
/* harmony import */ var _fetchData_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fetchData.js */ "./src/fetchData.js");
/* harmony import */ var _locationSearch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./locationSearch.js */ "./src/locationSearch.js");



// getData('47.6038', '-122.3301');
(0,_locationSearch_js__WEBPACK_IMPORTED_MODULE_1__.searchLoc)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDdERPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDVk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixNQUFNO0FBQ047QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaa0Q7QUFDWjtBQUNJOztBQUVuQztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwrREFBVztBQUN2QixTQUFTOztBQUVULEtBQUs7QUFDTDs7QUFFQTtBQUNBLDRCQUE0Qix1REFBUztBQUNyQyxxQkFBcUIsbURBQU87QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3hCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7OztBQ051QztBQUNPOztBQUU5QztBQUNBLDZEQUFTIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZGlzcGxheUNvbnRyb2xsZXIuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvZmV0Y2hEYXRhLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2ZldGNoTGF0TG9uLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL2xvY2F0aW9uU2VhcmNoLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsibGV0IGN1cnJlbnRXZWF0aGVyTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jdXJyZW50LXdlYXRoZXItbWFpbicpO1xubGV0IGxvY2F0aW9uRGlzcGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbi1kaXNwbGF5Jyk7XG5sZXQgd2VhdGhlckRlc2MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VhdGhlci1kZXNjJyk7XG5sZXQgZGF5RGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kYXktZGF0ZScpO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBkaXNwbGF5RGF0YShkYXRhLCBsb2NhdGlvbikge1xuICAgIGN1cnJlbnRXZWF0aGVyTWFpbi5pbm5lckhUTUwgPSBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5tYWluO1xuICAgIGxvY2F0aW9uRGlzcGxheS5pbm5lckhUTUwgPSBmaXhDYXNlKGxvY2F0aW9uKTtcbiAgICB3ZWF0aGVyRGVzYy5pbm5lckhUTUwgPSBkYXRhLmN1cnJlbnQud2VhdGhlclswXS5kZXNjcmlwdGlvbjtcbiAgICBkYXlEYXRlLmlubmVySFRNTCA9IGdldERheSgpICsgJywgJyArIGdldERhdGUoKTtcbn1cblxuZnVuY3Rpb24gZml4Q2FzZShsb2NhdGlvbikge1xuICAgIGxldCBmaXJzdExldHRlciA9IGxvY2F0aW9uWzBdLnRvVXBwZXJDYXNlKCk7XG4gICAgbGV0IHJlc3QgPSBsb2NhdGlvbi5zbGljZSgxKS50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiBmaXJzdExldHRlciArIHJlc3Q7XG59XG5cbmZ1bmN0aW9uIGdldERheSgpIHtcbiAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gICAgY29uc29sZS5sb2coZCk7XG4gICAgbGV0IGRheSA9IGQuZ2V0RGF5KCk7XG4gICAgaWYgKGRheSA9PSAwKSB7XG4gICAgICAgIHJldHVybiAnU3VuZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAxKSB7XG4gICAgICAgIHJldHVybiAnTW9uZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSAyKSB7XG4gICAgICAgIHJldHVybiAnVHVlc2RheSc7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gMykge1xuICAgICAgICByZXR1cm4gJ1dlZG5lc2RheSc7XG4gICAgfSBlbHNlIGlmIChkYXkgPT0gNCkge1xuICAgICAgICByZXR1cm4gJ1RodXJzZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSA1KSB7XG4gICAgICAgIHJldHVybiAnRnJpZGF5JztcbiAgICB9IGVsc2UgaWYgKGRheSA9PSA2KSB7XG4gICAgICAgIHJldHVybiAnU2F0dXJkYXknO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGF0ZSgpIHtcbiAgICBsZXQgZCA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGNvdW50ID0gMDtcbiAgICBsZXQgZGF0ZSA9ICcnO1xuICAgIGZvciAobGV0IGxldHRlciBpbiBkKSB7XG4gICAgICAgIGlmIChsZXR0ZXIgPT0gJyAnKSB7XG4gICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCA9PSAxIHx8IDIpIHtcbiAgICAgICAgICAgIGRhdGUuYXBwZW5kKGxldHRlcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coZGF0ZSk7XG4gICAgcmV0dXJuIGRhdGU7XG59XG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGF0YShsYXQsIGxvbikge1xuICAgIHRyeSB7XG4gICAgICAgIGxldCB1cmwgPSAnaHR0cHM6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2RhdGEvMy4wL29uZWNhbGw/bGF0PScgKyBsYXQgKyAnJmxvbj0nICsgbG9uICsgJyZBUFBJRD01MDFkMGYxMjFhODhmNTg4OTE3NTU1OWNlNjA1NWU0MSZ1bml0cz1pbXBlcmlhbCc7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG4iLCJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0TGF0TG9uKGxvY2F0aW9uKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgbGV0IHVybCA9ICdodHRwOi8vYXBpLm9wZW53ZWF0aGVybWFwLm9yZy9nZW8vMS4wL2RpcmVjdD9xPScgKyBsb2NhdGlvbiArICcmQVBQSUQ9NTAxZDBmMTIxYTg4ZjU4ODkxNzU1NTljZTYwNTVlNDEnXG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCk7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YVswXS5sb24pO1xuICAgICAgICAvLyBjb25zb2xlLmxvZyhkYXRhWzBdLmxhdCk7XG4gICAgICAgIHJldHVybiB7bG9uOiBkYXRhWzBdLmxvbiwgbGF0OiBkYXRhWzBdLmxhdH07XG4gICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBkaXNwbGF5RGF0YSB9IGZyb20gXCIuL2Rpc3BsYXlDb250cm9sbGVyXCI7XG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSBcIi4vZmV0Y2hEYXRhXCI7XG5pbXBvcnQgeyBnZXRMYXRMb24gfSBmcm9tIFwiLi9mZXRjaExhdExvblwiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VhcmNoTG9jKCkge1xuICAgIGxldCBzZWFyY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoLWJ0bicpO1xuXG4gICAgc2VhcmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCk9PiB7XG4gICAgICAgIGxldCBsb2NhdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2NhdGlvbi1pbnB1dCcpLnZhbHVlO1xuICAgICAgICBsZXQgZGF0YSA9IHJldHVybkRhdGEobG9jYXRpb24pO1xuICAgICAgICBkYXRhLnRoZW4oKGRhdGEpPT4ge1xuICAgICAgICAgICAgZGlzcGxheURhdGEoZGF0YSwgbG9jYXRpb24pO1xuICAgICAgICB9KTtcblxuICAgIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXR1cm5EYXRhKGxvY2F0aW9uKSB7XG4gICAgbGV0IGNvb3JkaW5hdGVzID0gYXdhaXQgZ2V0TGF0TG9uKGxvY2F0aW9uKVxuICAgIGxldCBkYXRhID0gYXdhaXQgZ2V0RGF0YShjb29yZGluYXRlcy5sYXQsIGNvb3JkaW5hdGVzLmxvbik7XG4gICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gICAgLy8gY29uc29sZS5sb2coY29vcmRpbmF0ZXMubGF0KTtcbiAgICAvLyBjb25zb2xlLmxvZyhjb29yZGluYXRlcy5sb24pO1xufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge2dldERhdGF9IGZyb20gJy4vZmV0Y2hEYXRhLmpzJztcbmltcG9ydCB7c2VhcmNoTG9jfSBmcm9tICcuL2xvY2F0aW9uU2VhcmNoLmpzJztcblxuLy8gZ2V0RGF0YSgnNDcuNjAzOCcsICctMTIyLjMzMDEnKTtcbnNlYXJjaExvYygpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9