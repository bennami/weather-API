

//decalre variable for city here so its accessible in global scope
let city;
let getweather;

//execute Api when cityname is given and search button is clicked
document.getElementById('button').onclick = function() {GetCity()};

//run this function on click
function GetCity(){

    //get value from input
    city = document.getElementById('search').value;
    //console.log(city);

    //place value in city's place on URL
    const Url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=de5b3977c5462dfc5d0ee481127a2703&units=metric`;

    //fetch API JSON
    async function Getdata() {

        //fetch stream of data
        let response = await fetch(Url);

        //convert it to json format
        let data = await response.json();
        console.log(data);

        let temp3hours = [];
        var temp = Math.floor(data.list[0].main.temp);
        let tempFeel = Math.floor(data.list[0].main.feels_like);
        let mintemp = Math.floor(data.list[0].main.temp_min);
        let maxtemp = Math.floor(data.list[0].main.temp_max);
        let humidity = data.list[0].main.humidity;

       // change src of icon to match weather conditions
       let icon = data.list[0].weather[0].icon;
       document.getElementById('icon').src =`http://openweathermap.org/img/wn/${icon}@2x.png`;





        console.log(humidity, icon);


        getweather = data.list[0].weather[0].description;




        //loop to get temp list every 3 hours
        let i;
        for (i = 0; i < data.list.length; i++) {
             let templist = Math.floor(data.list[i].main.temp);
             //console.log(templist);
             temp3hours.push(templist);
             //console.log(templist);
            let icon = data.list[i].weather[i].icon;
            console.log(icon);
        }


        // Getting sum of numbers
        function average(array) {
            return Math.round(array.reduce((a, b) => a + b) / array.length);
        }

        //slice array of temp per day and get average temp
        let day1 = temp3hours.slice(0, 8);
        day1 = average(day1);

        let day2 = temp3hours.slice(8,16);
        day2 = average(day2);

        let day3 = temp3hours.slice(16,24);
        day3 = average(day3);

        let day4 = temp3hours.slice(24,32);
        day4 = average(day4);

        let day5 = temp3hours.slice(32,50);
        day5 = average(day5);

        console.log(day1, day2, day3, day4,day5);

        //assign API data to DOM elements
        let weather = document.getElementById('weather');
        weather.innerHTML = getweather;

        let temperature = document.getElementById('temp');
        temperature.innerHTML = `feels like ${tempFeel}&degC rigth now`;

        let averagetemp = document.querySelector('.degrees');

        averagetemp.innerHTML= `${day1}&degC`

    }
    console.log(Getdata());
}




