const url = "https://icanhazdadjoke.com/"

const jokeButton = document.getElementById("btn");
jokeButton.addEventListener("click", getJoke);

const showJoke = document.getElementById("joke");

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