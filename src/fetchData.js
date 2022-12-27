export async function getData(location) {
    try {
        let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&APPID=501d0f121a88f5889175559ce6055e41&units=imperial';
        let response = await fetch(url);
        let data = await response.json();
        // console.log(data);
        return data;
    } catch(err) {
        console.log(err);
    }
}
