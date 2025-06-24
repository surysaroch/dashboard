import { useState } from "react";
import "./svg_components/Filter.tsx";
import Filter from "./svg_components/Filter.tsx";
import Sliders from "./Sliders.tsx";

interface FilterItem {
    metric: string;
    range: { min: number; max: number };
}

interface FilteringProps {
    onFilter: (filters: FilterItem[]) => void;
    onSensorFilter: (sensorId: string) => void;
}

const Filtering: React.FC<FilteringProps> = ({ onFilter, onSensorFilter }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [temperatureRange, setTemperatureRange] = useState({ min: 10, max: 40 })
    const [airQualityRange, setAirQualityRange] = useState({ min: 0, max: 200 })
    const [humidityRange, setHumidityRange] = useState({ min: 0, max: 90 })
    const [sensorId, setSensorId] = useState("")

    const handleFiltering = (metric: string, value: number, isMin: boolean) => {
        switch (metric) {
            case "Temperature":
                setTemperatureRange(prev => ({
                    ...prev,
                    [isMin ? "min" : "max"]: value
                }));
                break;
            case "Humidity":
                setHumidityRange(prev => ({
                    ...prev,
                    [isMin ? "min" : "max"]: value
                }));
                break;
            case "Air Quality":
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

    const clearAll = () => {
        const resetTemperature: { min: number; max: number } = { min: 10, max: 40 };
        const resetHumidity: { min: number; max: number } = { min: 0, max: 90 };
        const resetAirQuality: { min: number; max: number } = { min: 0, max: 200 };
        setTemperatureRange(resetTemperature);
        setHumidityRange(resetHumidity);
        setAirQualityRange(resetAirQuality);
        setSensorId("");
        onFilter([
            { metric: "temperature", range: resetTemperature },
            { metric: "humidity", range: resetHumidity },
            { metric: "airQuality", range: resetAirQuality }
        ]);
        onSensorFilter(""); 
    };
    
    const handleSearching = (searchedSensorId: string) => {
        onSensorFilter(searchedSensorId);
    };

    return (
        <>
            <div className="filter-wrapper-main">
                <button className="filter-toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
                    <Filter />
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

                        <Sliders onSlide={handleFiltering} metric="Temperature" range={temperatureRange} />
                        <Sliders onSlide={handleFiltering} metric="Air Quality" range={airQualityRange} />
                        <Sliders onSlide={handleFiltering} metric="Humidity" range={humidityRange} />


                        <div>
                            <button className="apply-button" onClick={() => {
                                updateFilterValues();
                                handleSearching(sensorId);
                            }}
                            >
                                Apply
                            </button>
                        </div>
                        <div>
                            <button className="clear-button" onClick={clearAll}>Clear</button>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Filtering;  