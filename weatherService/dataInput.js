const dateArray = suggestDates();
let date;
let isCheckedDay = false;
let isInputChange = false;

function searchWeather() {
    if(isInputChange) {
        deleteOldTable();
    }
    let city = document.getElementById('inputCities').value;
    if(!city) {
        alert('Введите город');
        return;
    }
    if(!isCheckedDay) {
        alert('Выберите дату')
    }
    if((!city) || (!isCheckedDay)) return;

    getWeather(city);
    isInputChange = false;
}

function checkDay() {
    isCheckedDay = true;
    let select = document.getElementById( 'selectDay' );
    let selIndex = select.selectedIndex;
    date = '';
    let j = dateArray[selIndex-1][0];
    for(var i = 0; i < dateArray[selIndex-1].length; i++) {
        if(dateArray[selIndex-1][i] === '.') break;
        date += dateArray[selIndex-1][i];
    }
    date = Number(date);
}
