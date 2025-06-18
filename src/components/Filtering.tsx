import { useState } from "react";
import "./filtering.css";
import "./svgs/filter.tsx";
import Filter from "./svgs/filter.tsx";

interface FilterItem {
    metric: string;
    range: { min: number; max: number };
}

interface FilteringProps {
    onFilter: (filters: FilterItem[]) => void;
    onSensorFilter: (sensorId: string) => void;
}

const Filtering: React.FC<FilteringProps> = ({ onFilter, onSensorFilter }) => {
    const[isExpanded, setIsExpanded] = useState(false)
    const[temperatureRange, setTemperatureRange] = useState({ min: 10, max: 40 })
    const[airQualityRange, setAirQualityRange] = useState({ min: 0, max: 200 })
    const[humidityRange, setHumidityRange] = useState({ min: 0, max: 90 })
    const[sensorId, setSensorId] = useState("")
    
    const handleFiltering = (metric: string, value: number, isMin: boolean) => {
        switch(metric) {
            case "temperature":
                setTemperatureRange(prev => ({
                    ...prev,
                    [isMin ? "min" : "max"]: value
                }));
                break;
            case "humidity":
                setHumidityRange(prev => ({
                    ...prev,
                    [isMin ? "min" : "max"]: value
                }));
                break;
            case "airQuality":
                setAirQualityRange(prev => ({
                    ...prev,
                    [isMin ? "min" : "max"]: value
                }));
        }
    }

    const updateFilterValues = () => {
        onFilter([
            {
                metric: "temperature",
                range: temperatureRange

            },
            {
                metric: "humidity",
                range: humidityRange
            },
            {
                metric: "airQuality",
                range: airQualityRange
            }
        ])
    }
    
    const handleSearching = (searchedSensorId: string) => {
        onSensorFilter(searchedSensorId);
    }
    return (
        <>
        <div className="filter-wrapper-main"> 
            <button className="filter-toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
                <Filter/>
                <p>Filter</p>
            </button>
            {isExpanded && (
                <div className="filter-panel-content">
                    <div className="filter-input-group">
                        <input
                            className="filter-text-input"
                            type="text"
                            placeholder="e.g., Sensor-1"
                            onChange={(e) => setSensorId(e.target.value)}
                        />
                    </div>


                    <div className="filter-input-group">
                        <label className="filter-label">Temperature Range</label>
                        <div className="range-inputs-container">
                            <input
                                className="filter-range-input"
                                type="range"
                                min={10}
                                max={temperatureRange.max} 
                                step={1}
                                value={temperatureRange.min}
                                onChange={(e) => handleFiltering("temperature", Number(e.target.value), true)}
                            />
                            <span className="range-value">Min: {temperatureRange.min}°C</span>
                        </div>
                        <div className="range-inputs-container">
                            <input
                                className="filter-range-input"
                                type="range"
                                min={temperatureRange.min} 
                                max={40}
                                step={1}
                                value={temperatureRange.max}
                                onChange={(e) => handleFiltering("temperature", Number(e.target.value), false)}
                            />
                            <span className="range-value">Max: {temperatureRange.max}°C</span>
                        </div>
                    </div>
      
                    <div className="filter-input-group">
                        <label className="filter-label">Air Quality Range</label>
                        <div className="range-inputs-container">
                            <input
                                className="filter-range-input"
                                type="range"
                                min={0}
                                max={airQualityRange.max}
                                step={1}
                                value={airQualityRange.min}
                                onChange={(e) => handleFiltering("airQuality", Number(e.target.value), true)}
                            />
                            <span className="range-value">Min: {airQualityRange.min}</span>
                        </div>
                        <div className="range-inputs-container">
                            <input
                                className="filter-range-input"
                                type="range"
                                min={airQualityRange.min}
                                max={200}
                                step={1}
                                value={airQualityRange.max}
                                onChange={(e) => handleFiltering("airQuality", Number(e.target.value), false)}
                            />
                            <span className="range-value">Max: {airQualityRange.max}</span>
                        </div>
                    </div>
                    <div className="filter-input-group">
                        <label className="filter-label">Humidity Range</label>
                        <div className="range-inputs-container">
                            <input
                                className="filter-range-input"
                                type="range"
                                min={0}
                                max={humidityRange.max}
                                step={1}
                                value={humidityRange.min}
                                onChange={(e) => handleFiltering("humidity", Number(e.target.value), true)}
                            />
                            <span className="range-value">Min: {humidityRange.min}%</span>
                        </div>
                        <div className="range-inputs-container">
                            <input
                                className="filter-range-input"
                                type="range"
                                min={humidityRange.min}
                                max={90}
                                step={1}
                                value={humidityRange.max}
                                onChange={(e) => handleFiltering("humidity", Number(e.target.value), false)}
                            />
                            <span className="range-value">Max: {humidityRange.max}%</span>
                        </div>
                    </div>

                <div>
                <button className = "apply-button" onClick={() => {
                    updateFilterValues();
                    handleSearching(sensorId);
                    }}
                    >
                    Apply
                </button>
                </div>
            </div>
            )}
        </div>
        </>
    )
}

export default Filtering;  