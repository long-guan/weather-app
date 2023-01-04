import { setBackground } from "./setBackground";
import { exportData } from "./locationSearch.js"

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

export function displayTopData(data, location) {
    currentWeatherMain.innerHTML = data.current.weather[0].main;
    setBackground(data.current.weather[0].main);
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

export function displayDailyData(data) {
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

export function displayHourlyData(data) {
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
        displayDailyData(exportData());
    }
});

hourlyBtn.addEventListener('click', ()=> {
    if (daily == true) {
        daily = false;
        dailyBtn.classList.remove('selected');
        hourlyBtn.classList.add('selected');
        displayHourlyData(exportData());
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
