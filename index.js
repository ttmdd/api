const url = "https://icanhazdadjoke.com/"

const jokeButton = document.getElementById("btnJoke");
jokeButton.addEventListener("click", getJoke);

const showJoke = document.getElementById("joke");

const rating = document.getElementById("rating");

const radioButtons = document.querySelectorAll('input[name="rating"]');

const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");

var reportJokes = [];
var jokeObj = {}

async function getJoke() {

    var options = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        var response = await fetch(url, options);

        if (response.ok) {
            var json = await response.json();

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

    for (var i = 0; i < radioButtons.length; i++) {
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
