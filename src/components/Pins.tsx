import React from "react"
import { useContext, useState } from 'react';
import { DashboardContext } from '../context/DashboardContext';
import Pin from './svg_components/Pin';
import Temperature from './svg_components/Temperature';
import Humidity from "./svg_components/Humidity";
import AirQuality from "./svg_components/AirQuality";
import RowData from "./RowData";

// Pins component: displays and manages the user's pinned sensors
const Pins = () => {
    const { pinnedData, sensorData, latestSensorData } = useContext(DashboardContext);
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
                        pinnedData.size === 0 ? (
                            <div className="no-pins-message">You Have No Pins</div>
                        ) : (
                            [...pinnedData].map(sensorId => {
                                const sensor = sensorData.find(s => s.sensorId === sensorId);
                                if (!sensor) return null;
                                return (
                                    <div className="pinned-sensor"key={sensorId}>
                                        <RowData metric={sensor} pinIconType="unpin" />
                                        <div className="expanded-container">
                                            {latestSensorData[sensorId].slice(1, 10).map((entry, idx) => (
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
                            })
                        )
                    }
                </div>
            )}
        </div>
    );
};
export default React.memo(Pins);