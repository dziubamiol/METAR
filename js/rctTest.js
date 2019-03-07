import React from 'react';
import ReactDOM from 'react-dom'

function Elements() {
    console.log("sdf");
    return (
        <div className="weather-content-face">
            <div className="airport header">UKKK / IEV</div>
            <div className="airport full-name">Kiev Zhuliany International</div>
            <div className="data-wrapper normal">
                <div className="information">
                    <div id="time">Time:</div>
                    <div id="wind">Wind:</div>
                    <div id="temperature">Temperature:</div>
                    <div id="humidity">Humidity:</div>
                    <div id="visibility">Visibility:</div>
                    <div id="ceiling">Clouds:</div>
                </div>
                <div className="graphics">
                    <div className="weather">

                    </div>
                    <div className="wind">

                    </div>
                </div>
            </div>
        </div>
    );
}


ReactDOM.render(<Elements />, document.getElementById("111"));