let currentWeatherMain = document.querySelector('.current-weather-main');
let locationDisplay = document.querySelector('.location-display');
let weatherDesc = document.querySelector('.weather-desc');
let dayDate = document.querySelector('.day-date');


export function displayData(data, location) {
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
