import { displayData } from "./displayController";
import { getData } from "./fetchData";
import { getLatLon } from "./fetchLatLon";

export function searchLoc() {
    let searchBtn = document.querySelector('.search-btn');

    searchBtn.addEventListener('click', ()=> {
        let location = document.querySelector('.location-input').value;
        let data = returnData(location);
        data.then((data)=> {
            displayData(data, location);
        });

    });
}

async function returnData(location) {
    let coordinates = await getLatLon(location)
    let data = await getData(coordinates.lat, coordinates.lon);
    console.log(data);
    return data;
    // console.log(coordinates.lat);
    // console.log(coordinates.lon);
}
