let arrayAllCities = [];
fetch('https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json')
    .then(response => response.json())
    .then(data => {
        for(let i = 0; i < data.city.length; i++) {
            arrayAllCities.push(data.city[i].name)
        }
    })

function getWeather(city) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&lang=ru&appid=269180f147b6ac5a5ab5b421c1366e26')
        .then(response => response.json())
        .then(data => {
            if(data.cod === '404') {
                alert('Такого города нет в базе данного сервиса ');
                return;
            }
            tableDrawing(data);

        })
}


