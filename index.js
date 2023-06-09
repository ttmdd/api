const url = "https://icanhazdadjoke.com/"

const jokeButton = document.getElementById("btn");
jokeButton.addEventListener("click", getJoke);

async function getJoke() {

    var options = {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    }

    try {
        var response = await fetch(url, options);
        console.log(response)

        if (response.ok) {
            var json = await response.json();
            console.log(json)
        } else {
            console.log("Server error")
        }
    } catch (err) {
        console.log("Network error");
    }
}