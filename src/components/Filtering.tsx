import { useEffect, useState } from "react";
import "./filtering.css";
import "./svgs/filter.tsx";
import Filter from "./svgs/filter.tsx";
import Sliders from "./sliders.tsx";

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
        setTemperatureRange({ min: 10, max: 40 });
        setHumidityRange({ min: 0, max: 90 });
        setAirQualityRange({ min: 0, max: 200 });
        setSensorId("");
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