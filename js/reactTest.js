import React from 'react';

class AirportHeader extends React.Component {
    render() {
        return (
            <div className="airport header">UKKK / IEV</div>
        );
    }
}

class AirportShort extends React.Component {
    render() {
        return (
            <div className="airport full-name">Kiev Zhuliany International</div>
        );
    }
}

class Data extends React.Component {
    render() {
        return (
            <div className="data-wrapper normal">
                    <div className="information">
                        <div>Time:</div>
                        <div>Wind:</div>
                        <div>Temperature:</div>
                        <div>Humidity:</div>
                        <div>Visibility:</div>
                        <div>Clouds:</div>
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
}


class FrontFace extends React.Component {
    render() {
        return (
            <div className="weather-content-face">
                <AirportHeader/>
                <AirportShort/>
                <Data/>
            </div>
        );
    }
}


ReactDOM.render(<FrontFace/>, document.getElementById("111"));
