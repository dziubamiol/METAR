const weatherCard = `<div class="weather-card">
        <div class="weather-card-inner">
            <div id="loading">
                <img src="icons/animated/Spinner-1s-200px.svg" alt="loading">
            </div>
        </div>
    </div>`;


function add() {
    const input = document.getElementById("airport-input");
    let airportCode = input.value;
    input.value = "";
    input.style.backgroundColor = "#ffffff";
    input.placeholder = "Enter valid ICAO";
    console.log("GGG");
    $(weatherCard).insertBefore(document.getElementById("add_card"));
    $(document.getElementById("add_card")).prev().click(flip);
    console.log(airportCode);

    const url = `https://api.checkwx.com/metar/${airportCode}/decoded`;
    const header = {
        'X-API-Key' : '79c7b57e88b5aac6a07a2ae529'
    };

    function addInformation(json) {
        console.log(json);
        let time = "Time: " + json.observed.split("T")[1].split(":").slice(0, 2).join(":") + "Z";
        let wind = "Wind: ";
        if (json.wind === undefined) {
            wind += "0KTS";
        }
        else {
            wind += json.wind.degrees + "°" + " " + json.wind.speed_kts + "KTS";
        }
        let temperature = "Temperature: " + json.temperature.celsius + "°C / " + json.dewpoint.celsius + "°C";
        let humidity = "Humidity: " + json.humidity.percent + "%";
        let visibilty = "Visibility: " + json.visibility.meters + "m";
        let ceiling = json.clouds[0].base_feet_agl === undefined ? "Ceiling: " + json.clouds[0].code :
            "Ceiling: " + json.clouds[0].code + " " + json.clouds[0].base_feet_agl + "ft";
        let raw_metar = json.raw_text;



        const airportCard = `<div class="weather-content-face">
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
                            <img src="icons/animated/night.svg" alt="sunset" class="weather-image">
                        </div>
                        <div class="wind">
                            <img src="icons/static/navigation.svg" alt="wind" class="wind-dir">
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
            </div>`;

        console.log($(document.getElementById("add_card")).prev());
        $($(document.getElementById("add_card")).prev().find('.weather-card-inner')).append(airportCard);
        //document.getElementById("wind-dir").style.transform = "rotateZ(-45deg)";
        $(document.getElementById("add_card")).prev().find('.wind-dir').css('transform', 'rotateZ(-45deg)');
        //document.getElementsByClassName("weather-content-face")[0].style.opacity = 1;
        $(document.getElementById("add_card")).prev().find('.weather-content-face').css('opacity', '1');
        document.getElementById("loading").remove();
        //document.getElementById("wind-dir").style.transform = "rotateZ(-45deg)";
        //let a = () => document.getElementById("wind-dir").style.transform = "rotateZ(" + parseInt(json.wind.degrees - 45) +"deg)";
        let a = () => $(document.getElementById("add_card")).prev().find('.wind-dir').css('transform', 'rotateZ(' + parseInt(json.wind.degrees - 45) +'deg)');
        setTimeout(a, 5); // need this for correct wind rotation
        // document.getElementById("wind-dir").style.transform = "rotateZ(" + parseInt(json.wind.degrees - 45) +"deg)";

        // document.getElementById("add-button").style.visibility = "visible";
        $('#add-button').css({'visibility': 'visible', 'opacity': '1'});
        console.log(document.getElementById("add-button"));
        // document.getElementById("add-button").style.opacity = "1";
        document.getElementById("search").style.visibility = "hidden";
        document.getElementById("search").style.opacity = "0";
    }

    let promise = fetch(url, {
        headers: header
    })
        .then(res => res.json())
        .then(json => {
            if (json.data.length === 0) {
                $(document.getElementById("add_card")).prev().remove();
                const input = document.getElementById("airport-input");
                input.value = "";
                input.placeholder = "Invalid ICAO";
                input.style.backgroundColor = "#ffbaba";
                throw new Error("Invalid ICAO");
            }

            return addInformation(json.data[0])})
        .catch(err => console.log(err));

}

function search() {
    document.getElementById("add-button").style.visibility = "hidden";
    document.getElementById("add-button").style.opacity = "0";
    document.getElementById("search").style.visibility = "visible";
    document.getElementById("search").style.opacity = "1";
    console.log("OK");
}


const node = document.getElementById("airport-input");
node.addEventListener("keydown", (event) => {
    if (event.keyCode === 13) {
        event.preventDefault();
        add();
    }
});

function flip() {
    console.log(this.className.indexOf('flip'));
    if (this.className.indexOf('flip') !== -1) {
        this.className = this.className.replace(' flip', '');
    }
    else {
        this.className = this.className + ' flip';
    }
}