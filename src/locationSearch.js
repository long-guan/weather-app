import { displayDailyData, displayHourlyData, displayTopData } from "./displayController";
import { getData } from "./fetchData";
import { getLatLon } from "./fetchLatLon";
import { addLoader, removeLoader } from "./loader";

let savedData = {};

export function defaultLoc(location) {
    let data = returnData(location);
    data.then((data)=> {
        savedData = data;
        console.log(savedData);
        displayTopData(data, location);
        displayDailyData(data);
        removeLoader();
    });
}

export function searchLoc() {
    let searchBtn = document.querySelector('.search-btn');
    searchBtn.addEventListener('click', ()=> {
        let location = document.querySelector('.location-input').value;
        let data = returnData(location);
        data.then((data)=> {
            savedData = data;
            displayTopData(data, location);
            displayDailyData(data);
            removeLoader();
        });
    });
}

export function exportData() {
    return savedData;
}

async function returnData(location) {
    addLoader();
    let coordinates = await getLatLon(location)
    let data = await getData(coordinates.lat, coordinates.lon);
    return data;
    // console.log(coordinates.lat);
    // console.log(coordinates.lon);
}
