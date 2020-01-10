

//decalre variable for city here so its accessible in global scope
let city;

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

    }
    console.log(Getdata());
}




