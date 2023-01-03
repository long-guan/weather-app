export function setBackground(currentWeather) {
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
