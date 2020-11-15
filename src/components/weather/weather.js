import './weather.css';
import * as React from 'react';
import 'antd/dist/antd.css';
import './weather-icons.min.css';
import './weather-icons-wind.min.css';
import { useEffect } from 'react';
import { Spin, Statistic, Card, Row, Col, Divider, Result } from 'antd';
import { ArrowUpOutlined } from '@ant-design/icons';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => (
    <div>
        <div className="marker"></div>
        <span className="beacon"></span>
    </div>
);

function Weather(props) {
    useEffect(() => {});
    if (props.errorMessage !== '') {
        return (
            <div className="center">
                <div id="title">
                    <Result status="404" title="404" subTitle={props.errorMessage} />
                </div>
            </div>
        );
    } else if (props.isLoading || props.weatherData == null) {
        return (
            <div className="center">
                <div id="title">
                    <Spin size="large" />
                </div>
            </div>
        );
    } else {
        const condition = props.weatherData.weather.map((cond) => {
            return cond.main;
        });
        let code = props.weatherData.weather[0].id;

        const windSpeed = props.weatherData.wind.speed;
        const windDeg = props.weatherData.wind.deg;
        const pressure = props.weatherData.main.pressure;
        const humidity = props.weatherData.main.humidity;
        const visibility = props.weatherData.visibility;
        const lng = props.weatherData.coord.lon;
        const lat = props.weatherData.coord.lat;

        const date = new Date();
        const sunrise = new Date(props.weatherData.sys.sunrise * 1000); //Convert a Unix timestamp to time
        const sunset = new Date(props.weatherData.sys.sunset * 1000);
        let icon = 'wi wi-owm-800';
        if (date.getHours() >= sunrise.getHours() && date.getHours() < sunset.getHours()) {
            icon = `wi wi-owm-day-${code}`;
        } else if (date.getHours() >= sunset.getHours() || date.getHours() < sunrise.getHours()) {
            icon = `wi wi-owm-night-${code}`;
        }

        return (
            <div className="center">
                <div id="title">
                    <span className="currently">
                        <span className="clear-day-icon-currently currently-icon swip">
                            <i className={icon}></i>
                        </span>
                        <span className="desc swap">
                            <span className="summary swap">
                                {Math.round(props.weatherData.main.temp)}˚&nbsp;
                                {condition.join(',')}.
                            </span>
                            <span className="summary-high-low">
                                <span>
                                    <span className="high-low-label">Feels Like:&nbsp;</span>
                                    <span className="feels-like-text">
                                        {Math.round(props.weatherData.main.feels_like)}˚
                                    </span>
                                </span>
                                <span>
                                    <span className="high-low-label">Low:&nbsp;</span>
                                    <span className="low-temp-text">
                                        {Math.round(props.weatherData.main.temp_min)}˚
                                    </span>
                                </span>
                                <span>
                                    <span className="high-low-label">High:&nbsp;</span>
                                    <span className="high-temp-text">
                                        {Math.round(props.weatherData.main.temp_max)}˚
                                    </span>
                                </span>
                            </span>
                        </span>
                    </span>

                    <div className="site-statistic-demo-card">
                        <Row gutter={16}>
                            <Col span={6}>
                                <Card size="small">
                                    <Statistic
                                        title="Wind"
                                        value={windSpeed}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        prefix={
                                            <ArrowUpOutlined
                                                style={{
                                                    transform: `rotate(${windDeg}deg)`,
                                                }}
                                            />
                                        }
                                        suffix="mph"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card size="small">
                                    <Statistic
                                        title="Pressure"
                                        value={pressure}
                                        precision={0}
                                        valueStyle={{ color: '#3f8600' }}
                                        suffix="hPa"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card size="small">
                                    <Statistic
                                        title="Humidity"
                                        value={humidity}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        suffix="%"
                                    />
                                </Card>
                            </Col>
                            <Col span={6}>
                                <Card size="small">
                                    <Statistic
                                        title="Visibility"
                                        value={visibility / 1000}
                                        precision={2}
                                        valueStyle={{ color: '#3f8600' }}
                                        suffix="km"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </div>

                    <div style={{ height: '40vh', width: '100%' }}>
                        <GoogleMapReact
                            bootstrapURLKeys={{ key: 'AIzaSyCZJFl6ugXV3cdADjF533a-RujWa__iDYo' }}
                            defaultCenter={{
                                lat: lat,
                                lng: lng,
                            }}
                            defaultZoom={11}
                        >
                            <AnyReactComponent lat={lat} lng={lng} />
                        </GoogleMapReact>
                    </div>
                    <Divider />

                    <span className="desc swap">
                        <ul>{props.lastSearches}</ul>
                    </span>
                </div>
            </div>
        );
    }
}

export default Weather;
