export async function getData() {
    try {
        let response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Seattle&APPID=501d0f121a88f5889175559ce6055e41');
        let data = await response.json();
        return data;
    } catch(err) {
        console.log('something went wrong');
    }
}
