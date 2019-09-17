function deleteOldTable() {
    document.getElementsByTagName('tbody')[0].innerHTML = '';
}

function tableDrawing(data) {
    let tr = document.createElement('tr');
    let th = document.createElement('th');
    th.setAttribute('scope', 'row');
    th.innerText = `${date}.${(new Date).getMonth()+1}.${(new Date).getFullYear()}`;
    tr.append(th);
    let count = 0;
    for(let i = 0; i < data.list.length; i++) {
        if(parseInt(data.list[i].dt_txt.slice(8,10)) === date) {
            count++;
            let td = document.createElement('td');
            let p = document.createElement('div');
            p.innerText = `${Math.round(data.list[i].main.temp-273.15)}°C`;
            td.append(p);
            let img = document.createElement('img');
            img.setAttribute('src', `http://openweathermap.org/img/w/${data.list[i].weather[0].icon}.png`);
            td.append(img);
            tr.append(td)
        }
    }
    document.getElementsByTagName('tbody')[0].append(tr);
    //если выбрать текущий день, то выдаст погоду от текущего момента и до следующего дня
    if(count !== 8) {
        for(let i = 0; i < 8-count; i++) {
            let td = document.createElement('td');
            document.getElementsByTagName('tbody')[0].lastElementChild.childNodes[0].after(td);

        }
    }
}


function addTooltip() {
    isInputChange = true;
    let inputValue = document.getElementById('inputCities').value;
    let counter = 0;
    if(document.getElementById('cities')) {
        document.getElementById('cities').remove();
    }
    let datalist = document.createElement('datalist');
    datalist.setAttribute('id', 'cities');
    let citiesArray = [];
    for(let i = 0; i < arrayAllCities.length; i++) {
        if(counter > 5) {
            break;
        }
        if((arrayAllCities[i].indexOf(inputValue) === 0) ||
            (arrayAllCities[i].toLowerCase().indexOf(inputValue) === 0)) {
            if(citiesArray.indexOf(arrayAllCities[i]) === -1) {
                counter++;
                citiesArray.push(arrayAllCities[i]);
                let option = document.createElement('option');
                option.setAttribute('value', arrayAllCities[i]);
                datalist.append(option);
            }
        }

    }
    document.getElementById('inputCities').append(datalist)
}


function suggestDates() {
    const day = new Date();
    const dateArray = [];
    let today = day;
    for(let i = 0; i < 5; i++) {
        let tempDay = today.getDate();
        let tempMonth = today.getMonth()+1;
        let resultStr = `${tempDay}.${tempMonth}`
        dateArray.push(resultStr);
        today= new Date(today.getTime() + (24 * 60 * 60 * 1000));
    }
    const year = day.getFullYear();
    const select = document.getElementById('selectDay');
    for(let i = 0; i < dateArray.length; i++) {
        let option = document.createElement('option');
        let text = dateArray[i] + '.' + year;
        option.innerText = text;
        select.append(option);
    }
    return dateArray;
}
