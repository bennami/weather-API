

//decalre variable for city here so its accessible in global scope
let city;
let getweather;
let date;

let hide = document.getElementById('box');
    hide.style.visibility='hidden';

//execute Api when cityname is given and search button is clicked
document.getElementById('button').onclick = function() {GetCity()};



//run this function on click
function GetCity(){
    hide.style.visibility='visible';
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


        // get icons for all days
        let icons1 = data.list[0].weather[0].icon;

        let icons2 = data.list[8].weather[0].icon;

        let icons3 = data.list[16].weather[0].icon;

        let icons4 = data.list[24].weather[0].icon;

        let icons5 = data.list[32].weather[0].icon;


   console.log(icons1,icons2,icons3,icons4,icons5);




        getweather = data.list[0].weather[0].description;


        //loop to get temp list every 3 hours
        let i;
        for (i = 0; i < data.list.length; i++) {
            let templist = Math.floor(data.list[i].main.temp);
            temp3hours.push(templist);
        }
        //console.log(temp3hours);



        // Getting average of temp values
        function average(array) {
            return Math.round(array.reduce((a, b) => a + b) / array.length);
        }

        //slice array of temp per day and get average temp
        let day1 = temp3hours.slice(0, 8);
        day1 = average(day1);

        let day2 = temp3hours.slice(8, 16);
        day2 = average(day2);

        let day3 = temp3hours.slice(16, 24);
        day3 = average(day3);

        let day4 = temp3hours.slice(24, 32);
        day4 = average(day4);

        let day5 = temp3hours.slice(32, 50);
        day5 = average(day5);

        //console.log(day1, day2, day3, day4,day5);

        //get current date
        date = new Date(); //.toLocaleString();
        let CurrentDay = date.getDate();


        //get date api

        let entireDate;
        let x;
        let timez =[];
        let hourLess;
        let imane =[];
        for(x =0; x < data.list.length; x++){

            entireDate = data.list[x].dt_txt;
            //get rid of hours
            hourLess = entireDate.slice(0,10);
            timez.push(hourLess);

           let newdays = new Date(timez[x]).getDay();
            console.log(newdays);
            imane.push(newdays);
        }
        console.log(imane);
        console.log(timez);

        //sort
        imane.sort()
        console.log(temp3hours);




        let days =[ "Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let currentday = days[date.getDay()];
        let comingday2 = days[date.getDay()+1];
        let comingday3 = days[date.getDay()+2];
        let comingday4 = days[date.getDay()+3];
        let comingday5 = days[date.getDay()+4];
       // console.log(currentday,comingday2,comingday3,comingday4,comingday5);



        //get current time
        let CurrentHour = date.getHours();
        let CurrentMinute = date.getMinutes();
        let CurrentMonth = date.getMonth()+1;
        let CurrentYear = date.getFullYear();
        if(CurrentMinute<10){
            CurrentMinute = `0${CurrentMinute}`;
        }else{
            CurrentMinute
        }
        let CurrentTime = `${CurrentHour}:${CurrentMinute}`;

        if (CurrentMonth < 10) {
            CurrentMonth = "0" + CurrentMonth;
        } else {
            CurrentMonth;
        }


        let CurrentDate;

        CurrentDate = `${CurrentYear}-${CurrentMonth}-${CurrentDay}`;

        CurrentDate = `${CurrentDate}`;
        console.log(CurrentDate);


        //assign day names to DOM
        let current = document.getElementById('date');
        current.innerHTML = currentday +" "+CurrentDay+" "+CurrentTime;

        let coming2 = document.getElementById('comingday1');
        coming2.innerHTML = comingday2;

        let coming3 = document.getElementById('comingday2');
        coming3.innerHTML = comingday3;

        let coming4 = document.getElementById('comingday3');
        coming4.innerHTML = comingday4;

        let coming5 = document.getElementById('comingday4');
        coming5.innerHTML = comingday5;







        //assign API data to DOM elements

        //cityname
        let cityname = document.getElementById('cityname');
        cityname.innerHTML = city;

        //weather description
        let weather = document.getElementById('weather');
        weather.innerHTML = getweather;

        //tempfeel
        let temperature = document.getElementById('temp');
        temperature.innerHTML = `feels like ${tempFeel}&degC rigth now`;

        //average temperature
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

        //main day icon
        document.getElementById('icon').src =`http://openweathermap.org/img/wn/${icons1}@2x.png`;

        //upcoming days icon assign
        let icon2 = document.getElementById('icon2');
        let icon3 = document.getElementById('icon3');
        let icon4 = document.getElementById('icon4');
        let icon5 = document.getElementById('icon5');

        icon2.src = `http://openweathermap.org/img/wn/${icons2}@2x.png`;
        icon3.src = `http://openweathermap.org/img/wn/${icons3}@2x.png`;
        icon4.src = `http://openweathermap.org/img/wn/${icons4}@2x.png`;
        icon5.src = `http://openweathermap.org/img/wn/${icons5}@2x.png`;
    }
    console.log(Getdata());
}




