import React, { useMemo } from "react"
import { useContext, useState } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import Metric from './Metric';
import Unpin from './svg_components/Unpix';
import Pin from './svg_components/Pin';
import Temperature from './svg_components/Temperature';
import Humidity from "./svg_components/Humidity";
import AirQuality from "./svg_components/AirQuality";

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

// Pins component: displays and manages the user's pinned sensors
const Pins = () => {
    const { pinnedData, sensorData, pinnedDataFunction, latestSensorData } = useContext(DashboardContext);
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Render pins toggle button and the list of pinned sensors if expanded
    return (
        <div className="pins-main-container">
            <button className="pins-toggle-button" onClick={() => setIsExpanded(!isExpanded)}>
                <Pin />{/*svg*/}
                <p>Pins ({pinnedData.size})</p>
                </button> 
            {isExpanded && (
                <div className="pinned-items-panel">
                    {
                        // Show message if no pins, otherwise render each pinned sensor
                        pinnedData.size === 0 ? (<div className="no-pins-message">You Have No Pins</div>) :
                            [...pinnedData].map(sensorId => {
                                const sensor = sensorData.find(s => s.sensorId === sensorId);
                                if (!sensor) return null;
                                const minTemperature = 10, maxTemperature = 40;
                                const minAirQuality = 0, maxAirQuality = 200;
                                const minHumidity = 0, maxHumidity = 90;

                                const metricValues: MetricValues = [
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

                                // Render pinned sensor details, metrics, and unpin button
                                return (
                                    <div key={sensorId} className="pinned-item-content-wrapper">
                                        <div className="pinned-sensor-card">
                                            <div className="pinned-sensor-id-container">
                                                <span className="pinned-sensor-id">{sensor.sensorId}</span>
                                            </div>
                                            <div className="pinned-metric-container">
                                                <Metric metric={"temperature"} values={metricValues} />
                                                <Metric metric={"airQuality"} values={metricValues} />
                                                <Metric metric={"humidity"} values={metricValues} />
                                            </div>

                                            <div className="pin-and-timestamp-container">
                                                <div className="pinned-button">
                                                    <button className="unpin-button" onClick={() => (pinnedDataFunction(sensor.sensorId))}>
                                                        <Unpin />
                                                    </button>
                                                </div>
                                                <div className="pinned-timestamp">
                                                    {new Date(sensor.timestamp).toLocaleString()}
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="expanded-container">
                                            {latestSensorData[sensorId].slice(1, 5).map((entry, idx) => (
                                                <div key={idx} className="sensor-history-entry">
                                                    <p><Temperature color="#FF7101" /> {entry.temperature.toFixed(2)}°C</p>
                                                    <p><AirQuality color="#00A3FF" /> {entry.airQuality.toFixed(2)}</p>
                                                    <p><Humidity color="#00FF00" /> {entry.humidity.toFixed(2)}%</p>
                                                    <p>{new Date(entry.timestamp).toLocaleTimeString()}</p>
                                                </div>
                                            ))}
                                        </div>



                                    </div>
                                );


                            })}
                </div>
            )}
        </div>
    );
};
export default React.memo(Pins);