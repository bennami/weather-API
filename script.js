

//decalre variable for city here so its accessible in global scope
let city;
let getweather;

//execute Api when cityname is given and search button is clicked
document.getElementById('button').onclick = function() {GetCity()};

//run this function on click
function GetCity(){

    //get value from input
    city = document.getElementById('search').value;
    console.log(city);

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

        getweather = data.list[0].weather[0].description;



               let i;
               //console.log(temp,tempFeel,mintemp,maxtemp);

               for (i = 0; i < data.list.length; i++) {
                   let templist = Math.floor(data.list[i].main.temp);
                   //console.log(templist);
                   temp3hours.push(templist);
                   //console.log(templist);

               }

               // console.log(temp3hours.length);
               //console.log(temp3hours);

               // console.log( temp3hours.splice(1,8));


               let day1 = [temp3hours.slice(0, 8)];

        // Getting sum of numbers





               let day2 = [ temp3hours.slice(8,16)];

               let day3 = [ temp3hours.slice(16,24)];

               let day4 = [ temp3hours.slice(24,32)];

               let day5 = [ temp3hours.slice(32,50)];

console.log(day1, day2, day3, day4,day5);

        let weather = document.getElementById('weather');
        weather.innerHTML = getweather;

        let temperature = document.getElementById('temp');
        temperature.innerHTML = `feels like ${tempFeel}&degC rigth now`;

        let degrees = document.querySelector('.degrees');

        degrees.innerHTML= `${temp}&degC`

    }
    console.log(Getdata());
}




