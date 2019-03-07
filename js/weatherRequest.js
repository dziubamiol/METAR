const ICAO = "UKKK";
const url = `https://api.checkwx.com/metar/${ICAO}/decoded`;
const header = {
    'X-API-Key' : '79c7b57e88b5aac6a07a2ae529'
};

let data = fetch(url, {
    method: 'GET',

    headers: header
})
    .then(res => res.json())
    .then(json => setWeather(json.data[0]))
    .catch(err => alert(err));


function setWeather(json) {
    document.getElementsByClassName("weather-content-face")[0].style.opacity = 1;
    document.getElementById("loading").remove();

    document.getElementById("icao").innerText = json.icao;
    document.getElementById("icao-back").innerText = json.icao;
    document.getElementById("full-name").innerText = json.station.name;
    document.getElementById("full-name-back").innerText = json.station.name;
    document.getElementById("time").innerText = "Time: " + json.observed.split("T")[1].split(":").slice(0, 2).join(":") + "Z";
    document.getElementById("wind").innerText = "Wind: " + json.wind.degrees + "°" + " " + json.wind.speed_kts + "KTS";
    document.getElementById("wind-dir").style.transform = "rotateZ(" + parseInt(json.wind.degrees) +"deg)";
    document.getElementById("temperature").innerText = "Temperature: " + json.temperature.celsius + "°C / " + json.dewpoint.celsius + "°C";
    document.getElementById("humidity").innerText = "Humidity: " + json.humidity.percent + "%";
    document.getElementById("visibility").innerText = "Visibility: " + json.visibility.meters + "m";
    console.log(json.clouds[0].base_feet_agl);
    if (json.clouds[0].base_feet_agl === undefined) {
        document.getElementById("ceiling").innerText = "Ceiling: " + json.clouds[0].code;
    }
    else {
        document.getElementById("ceiling").innerText = "Ceiling: " + json.clouds[0].code + " " + json.clouds[0].base_feet_agl + "ft";
    }

    document.getElementById("raw-metar").innerText = json.raw_text;
}
