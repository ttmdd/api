import WEATHER_API_KEY from "./apikey.js";

const url = "https://icanhazdadjoke.com/"
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=${WEATHER_API_KEY}`

window.addEventListener("load", getWeather);

const weather = document.getElementById("weather");
const weatherIcon = document.getElementById("weather-icon");

const jokeButton = document.getElementById("btnJoke");
jokeButton.addEventListener("click", getJoke);

const showJoke = document.getElementById("joke");

const rating = document.getElementById("rating");

const radioButtons = document.querySelectorAll('input[name="rating"]');

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

let reportJokes = [];
let jokeObj = {}

async function getWeather() {
    let options = {
    method: "GET"
    }
    
    try {
    let response = await fetch(weatherUrl, options);
    
    if (response.ok) {
        let json = await response.json();
        // console.log(json)
        weather.innerHTML = `${Math.round(json.main.temp)} ºC`
        weatherIcon.src = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`;
    } else {
        console.log("Server error")
    }
    } catch (err) {
        console.log("Network error");
    }
    };
    

async function getJoke() {

    let options = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        let response = await fetch(url, options);

        if (response.ok) {
            let json = await response.json();

            showJoke.innerHTML = json.joke;
            rating.style.display = "block";

            const date = new Date();

            jokeObj[json.id] = {
                joke: json.joke,
                date: date.toISOString(),
                score: 0 
            }

            getRating(json.id);
            reportJokes.push({...jokeObj[json.id]});
            // console.log("report jokes array", reportJokes);

        } else {
            console.log("Server error")
        }
    } catch (err) {
        console.log("Network error");
    }

    // fetch(url, options)
    //     .then((response) => response.json())
    //     .then((jokes) => { showJoke.innerHTML = jokes.joke }) 
}


function getRating(jokeId) {

    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', (e) => {
            if (btn1.checked) {
                jokeObj[jokeId].score = 1;
            } else if (btn2.checked) {
                jokeObj[jokeId].score = 2;
            } else if (btn3.checked) {
                jokeObj[jokeId].score = 3;
            } 
            // console.log("joke after rating", jokeObj);
        })
    }

}
