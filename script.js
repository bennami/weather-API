//decalre variable for city here so its accessible in global scope
const APIKEY = 'de5b3977c5462dfc5d0ee481127a2703';
let getweather;
let date;
let city;
//hide results of search
let hide = document.getElementById('box');
hide.style.visibility='hidden';

//execute Api when cityname is given and search button is clicked
document.getElementById('button').addEventListener('click', function(){
    Getdata(GetCity());
});

//gets city from input
function GetCity() {
    hide.style.visibility = 'visible';
    //get value from input
    return city =document.getElementById('search').value;
}

//fetches API data
async function Getdata(city) {
    const Url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${APIKEY}&units=metric`;
    //fetch and when u have fetched put promise that you will put data  in filterdata function
    fetch(Url).then((response) => response.json()).then((responseJson) => {
        this.filterTheData(responseJson);
    });
    getPhoto(city);
}

//fetch picture from unsplash
async function getPhoto(city){
    let response = await fetch(`https://api.unsplash.com/search/photos?query=${city}&client_id=6dd1c2b99d5c25b862d3b76b3523ad08d8fbffcd651e18e457bfe84ff49c8d66`);
    let data = await response.json();
    console.log(data.results[3]);
    let bgPicture = data.results[2].urls.regular;
    document.getElementById('TodayBox').style.backgroundImage = `url(${bgPicture})`;

}

//filter data of data api
function filterTheData (data) {

//get current date
    date = new Date(); //.toLocaleString();
    let CurrentDay = date.getDate();

//get date api
    let entireDate;
    let x;
    let timez = [];
    let hourLess;
    let imane = [];
    for (x = 0; x < data.list.length; x++) {

        entireDate = data.list[x].dt_txt;
        //get rid of hours
        hourLess = entireDate.slice(0, 10);
        timez.push(hourLess);

        let newdays = new Date(timez[x]).getDay();
        imane.push(newdays);

    }


    let temp1;
    let temp2;
    let temp3;
    let temp4;
    let temp5;

    let res1 = [];
    let alldata = [];
    let alltemp = [];

    let alltempFeel= [];
    let allminTemp = [];
    let allmaxTemp = [];
    let allhumidity = [];
    let allIcons = [];
    let weatherdescription = [];

    //get all temp
    for(z=0; z<imane.length;z++){

        alldata.push(data.list[z]);
        alltemp.push(Math.floor(data.list[z].main.temp));
        let tempFeel = Math.floor(data.list[z].main.feels_like);
        alltempFeel.push(tempFeel);
        let  minTemp = Math.floor(data.list[z].main.temp_min);
        allminTemp.push(minTemp);
        let  maxTemp = Math.floor(data.list[z].main.temp_max);
        allmaxTemp.push(maxTemp);
        let humidity = data.list[z].main.humidity;
        allhumidity.push(humidity);
        let icons = data.list[z].weather[0].icon;
        allIcons.push(icons);
        getweather = data.list[z].weather[0].description;
        weatherdescription.push(getweather);
    }

    //check how long first day is
    for (y = 0; y < imane.length; y++) {

        if (imane[0] === imane[y]) {

            res1.push(imane[y]);
            //console.log(res1);
        }
    }

    //slice weather description
    let sliceweather1 = weatherdescription.slice(res1.length, res1.length+8);//slicezeathers[0]
    let sliceweather2 = weatherdescription.slice(res1.length+8, res1.length+16);
    let sliceweather3 = weatherdescription.slice(res1.length+16, res1.length+24);
    let sliceweather4 = weatherdescription.slice(res1.length+24, res1.length+32);

    let sliceweathers = [];
    for(let i=1; i <= 4; i++) {
        sliceweathers.push(weatherdescription.slice(res1.length+(8 * (i-1)), res1.length+(8 * i)));
    }

    //slice temp according to length of first array
    let daynow = alltemp.slice(0,res1.length);
    console.log(daynow);
    let dayafter1tomorrow = alltemp.slice(res1.length, res1.length+8);
    let dayafter2tomorrow = alltemp.slice(res1.length+8, res1.length+16);
    let dayafter3tomorrow = alltemp.slice(res1.length+16, res1.length+24);
    let dayafter4tomorrow = alltemp.slice(res1.length+24, res1.length+32);

    // Getting average of temp values
    function average(array) {
        return Math.round(array.reduce((a, b) => a + b) / array.length);
    }
    temp1 = average(daynow);
    temp2 = average(dayafter1tomorrow);
    temp3 = average(dayafter2tomorrow);
    temp4 = average(dayafter3tomorrow);
    temp5 = average(dayafter4tomorrow);

    //tempfeel for main day
    let slicetempfeel1 = alltempFeel.slice(0,res1.length);
    let tempfeel1 = average(slicetempfeel1);

    //get icons
    let sliceicons1 = allIcons.slice(0, res1.length);
    let sliceicons2 = allIcons.slice(res1.length, res1.length+8);
    let sliceicons3 = allIcons.slice(res1.length+8, res1.length+16);
    let sliceicons4 = allIcons.slice(res1.length+16, res1.length+24);
    let sliceicons5 = allIcons.slice(res1.length+24, res1.length+32);

    let icon1  = sliceicons1[0];
    let icon2  = sliceicons2[0];
    let icon3  = sliceicons3[0];
    let icon4  = sliceicons4[0];
    let icon5  = sliceicons5[0];

    //slice humidity
    let slicehumid1 = allhumidity.slice(0, res1.length);
    let slicehumid2 = allhumidity.slice(res1.length, res1.length+8);
    let slicehumid3 = allhumidity.slice(res1.length+8, res1.length+16);
    let slicehumid4 = allhumidity.slice(res1.length+16, res1.length+24);
    let slicehumid5 = allhumidity.slice(res1.length+24, res1.length+32);

    //getaverage humidity
    let humid1 = average(slicehumid1);
    let humid2 = average(slicehumid2);
    let humid3 = average(slicehumid3);
    let humid4 = average(slicehumid4);
    let humid5 = average(slicehumid5);


    //set days of the week, this doesnt work properly cuz if current day is 6, coming days will be 7,8,9,10. need to reverse count
    //temporary solution: array of 15 elements
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday", "Friday", "Saturday"];
    let currentday = days[date.getDay()];
    let comingday2 = days[date.getDay() + 1];
    let comingday3 = days[date.getDay() + 2];
    let comingday4 = days[date.getDay() + 3];
    let comingday5 = days[date.getDay() + 4];



    //get current time
    let CurrentHour = date.getHours();
    let CurrentMinute = date.getMinutes();

    //CurrentMinute = CurrentMinute.padStart(2, 0);
    if(CurrentMinute <10){
        CurrentMinute = `0${CurrentHour}`;
    }else{
        CurrentMinute;
    }

    if(CurrentHour <10){
        CurrentHour = `0${CurrentHour}`;
    }else{
        CurrentHour;
    }
    let CurrentTime = `${CurrentHour}:${CurrentMinute}`;


    //assign current time and days of the week
    let current = document.getElementById('date');
    current.innerHTML = currentday + " " + CurrentDay;
    let currenttime = document.getElementById('hour');
    currenttime.innerHTML = CurrentTime;
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

    //tempfeel, this is an average now, but maybe it shouldn't?
    let temperature = document.getElementById('temp');
    temperature.innerHTML = `feels like ${tempfeel1}&degC rigth now`;

    //average temperature
    let averagetemp = document.querySelector('.degrees');
    averagetemp.innerHTML = `${temp1}&degC`;
    let next1 = document.querySelector('.next1');
    next1.innerHTML = `${temp2}&degC`;
    let next2 = document.querySelector('.next2');
    next2.innerHTML = `${temp3}&degC`;
    let next3 = document.querySelector('.next3');
    next3.innerHTML = `${temp4}&degC`;
    let next4 = document.querySelector('.next4');
    next4.innerHTML = `${temp5}&degC`;

    //Icons
    let icons1 = document.getElementById('icon');
    let icons2 = document.getElementById('icon2');
    let icons3 = document.getElementById('icon3');
    let icons4 = document.getElementById('icon4');
    let icons5 = document.getElementById('icon5');
    icons1.src = `http://openweathermap.org/img/wn/${icon1}@2x.png`;
    icons2.src = `http://openweathermap.org/img/wn/${icon2}@2x.png`;
    icons3.src = `http://openweathermap.org/img/wn/${icon3}@2x.png`;
    icons4.src = `http://openweathermap.org/img/wn/${icon4}@2x.png`;
    icons5.src = `http://openweathermap.org/img/wn/${icon5}@2x.png`;

    //chance of rain
    let humidity =document.querySelector('.humidity1');
    humidity.innerHTML = `humidity: ${humid1}%`;
    let humidity2 =document.querySelector('.humidity2');
    humidity2.innerHTML =`humidity: ${humid2}%`;
    let humidity3 =document.querySelector('.humidity3');
    humidity3.innerHTML = `humidity: ${humid3}%`;
    let humidity4 =document.querySelector('.humidity4');
    humidity4.innerHTML = `humidity: ${humid4}%`;
    let humidity5 =document.querySelector('.humidity5');
    humidity5.innerHTML = `humidity: ${humid5}%`;


}

