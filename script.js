

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
        let timelist =[];
        var temp = Math.floor(data.list[0].main.temp);
        let tempFeel = Math.floor(data.list[0].main.feels_like);
        let mintemp = Math.floor(data.list[0].main.temp_min);
        let maxtemp = Math.floor(data.list[0].main.temp_max);
        let humidity = data.list[0].main.humidity;

       // get icon
       let icon = data.list[0].weather[0].icon;
       let time = data.list[0].dt_txt;

       console.log(time);


        //console.log(humidity, icon);


        getweather = data.list[0].weather[0].description;




        //loop to get temp list every 3 hours and timestamp
        let i;
        for (i = 0; i < data.list.length; i++) {
             let templist = Math.floor(data.list[i].main.temp);
             //console.log(templist);
             temp3hours.push(templist);
             //console.log(templist);
           let times = data.list[i].dt_txt;
           timelist.push(times);



        }
        console.log(timelist);
        //loop to get icons



        // Getting average of numbers
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

       // console.log(day1, day2, day3, day4,day5);

        //assign API data to DOM elements
        let cityname = document.getElementById('cityname');
        cityname.innerHTML = city;

        let weather = document.getElementById('weather');
        weather.innerHTML = getweather;

        let temperature = document.getElementById('temp');
        temperature.innerHTML = `feels like ${tempFeel}&degC rigth now`;

        let averagetemp = document.querySelector('.degrees');
        averagetemp.innerHTML= `${day1}&degC`;

        let next1 = document.querySelector('.next1');
        next1.innerHTML = `${day2}&degC`;

        let next2 = document.querySelector('.next2');
        next2.innerHTML = `${day3}&degC`;

        let next3 = document.querySelector('.next3');
        next3.innerHTML = `${day4}&degC`;

        let next4 = document.querySelector('.next4');
        next4.innerHTML = `${day5}&degC`;


        //icons

        //main day icon
        document.getElementById('icon').src =`http://openweathermap.org/img/wn/${icon}@2x.png`;

        //upcoming days icon
        let icon2 = document.getElementById('icon2');
        let icon3 = document.getElementById('icon3');
        let icon4 = document.getElementById('icon4');
        let icon5 = document.getElementById('icon5');

        icon2.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        icon3.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        icon4.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
        icon5.src = `http://openweathermap.org/img/wn/${icon}@2x.png`;
    }
    console.log(Getdata());
}




