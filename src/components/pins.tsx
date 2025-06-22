import { useContext, useState } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import Metric from '../components/metric';

type MetricValues = [{
    temperature: number;
    temperaturePercentage: number;
}, {
    airQuality: number;
    airQualityPercentage: number;
}, {
    humidity: number;
    humidityPercentage: number;
}];
const Pins = () => {
    const { pinnedData, sensorData } = useContext(DashboardContext);
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div>
            <button onClick={() => setIsExpanded(!isExpanded)}>Pins</button>
            {
                [...pinnedData].map(sensorId => {
                    const sensor = sensorData.find(s => s.sensorId === sensorId);
                    if (!sensor) return null;

                    const minTemperature = 10, maxTemperature = 40;
                    const minAirQuality = 0, maxAirQuality = 200;
                    const minHumidity = 0, maxHumidity = 90;

                    const metricValues: MetricValues= [
                        {
                            temperature: sensor.temperature,
                            temperaturePercentage: ((sensor.temperature - minTemperature) / (maxTemperature - minTemperature)) * 100
                        },
                        {
                            airQuality: sensor.airQuality,
                            airQualityPercentage: ((sensor.airQuality - minAirQuality) / (maxAirQuality - minAirQuality)) * 100
                        },
                        {
                            humidity: sensor.humidity,
                            humidityPercentage: ((sensor.humidity - minHumidity) / (maxHumidity - minHumidity)) * 100
                        }
                    ];

                    return (
                        <div>
                            {isExpanded && (
                                <div>
                                    <div key={sensor.sensorId} className="metric-row">
                                        <div className="sensor-metric-container">
                                            <div className="sensor-id-container">
                                                <span className="sensor-id">{sensor.sensorId}</span>
                                            </div>
                                            <div className="metric-container">
                                                <Metric metric={"temperature"} values={metricValues} />
                                                <Metric metric={"airQuality"} values={metricValues} />
                                                <Metric metric={"humidity"} values={metricValues} />
                                            </div>
                                        </div>



                                        <div className="expanded-container">
                                            <p>Temperature: {sensor.temperature.toFixed(2)}°C</p>
                                            <p>Humidity: {sensor.humidity.toFixed(2)}%</p>
                                            <p>Air Quality: {sensor.airQuality.toFixed(2)}</p>
                                            <p>Timestamp: {new Date(sensor.timestamp).toLocaleString()}</p>
                                        </div>

                                    </div>

                                </div>
                            )}
                        </div>
                    );


                })}
        </div>
    );
};
export default Pins;