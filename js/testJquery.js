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
    .then(json => updateData(json.data[0]))
    .catch(err => alert(err));


function updateData(json) {
    //document.getElementById("loading").remove();

    let time = "Time: " + json.observed.split("T")[1].split(":").slice(0, 2).join(":") + "Z";
    let wind = "Wind: " + (json.wind.degrees !== undefined ? json.wind.degrees + "°" + " " + json.wind.speed_kts :
    0) + "KTS";
    let temperature = "Temperature: " + json.temperature.celsius + "°C / " + json.dewpoint.celsius + "°C";
    let humidity = "Humidity: " + json.humidity.percent + "%";
    let visibilty = "Visibility: " + json.visibility.meters + "m";
    let ceiling = json.clouds[0].base_feet_agl === undefined ? "Ceiling: " + json.clouds[0].code :
        "Ceiling: " + json.clouds[0].code + " " + json.clouds[0].base_feet_agl + "ft";
    let raw_metar = json.raw_text;



    const airportCard = `<div class="weather-card" id="ukkk">
        <div class="weather-card-inner" id="111">
            <div id="loading">
                <img src="icons/animated/Spinner-1s-200px.svg" alt="loading">
            </div>
            <div class="weather-content-face">
                <div class="airport header" id="icao">${json.icao}</div>
                <div class="airport full-name" id="full-name">${json.station.name}</div>
                <div class="data-wrapper normal">
                    <div class="information">
                        <div id="time">${time}</div>
                        <div id="wind">${wind}</div>
                        <div id="temperature">${temperature}</div>
                        <div id="humidity">${humidity}</div>
                        <div id="visibility">${visibilty}</div>
                        <div id="ceiling">${ceiling}</div>
                    </div>
                    <div class="graphics">
                        <div class="weather">
                            <img src="icons/animated/night.svg" alt="sunset" id="weather-image">
                        </div>
                        <div class="wind">
                            <img src="icons/static/navigation.svg" alt="wind" id="wind-dir">
                        </div>
                        <!--<div class="flight-rules" id="flight-rules">-->
                            <!--VFR-->
                        <!--</div>-->
                    </div>
                </div>
            </div>
            <div></div>
            <div class="weather-content-back">
                <div class="airport header" id="icao-back">${json.icao}</div>
                <div class="airport full-name" id="full-name-back">${json.station.name}</div>
                <div class="metar-wrapper normal">
                    <div class="metar" id="raw-metar">
                        ${raw_metar}
                    </div>
                </div>
            </div>
        </div>
    </div>`;

    $(document.body).append(airportCard);

    document.getElementsByClassName("weather-content-face")[0].style.opacity = 1;
    document.getElementById("loading").remove();
    document.getElementById("wind-dir").style.transform = "rotateZ(" + parseInt(json.wind.degrees) +"deg)";
}


//ukll loww ukdd lkmt umms kewr kfrg
