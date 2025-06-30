import React from "react"
import { useState, useCallback } from "react";
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

// Filtering component: handles filter UI and logic for sensor metrics and sensorId
const Filtering: React.FC<FilteringProps> = ({ onFilter, onSensorFilter }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [temperatureRange, setTemperatureRange] = useState({ min: 10, max: 40 })
    const [airQualityRange, setAirQualityRange] = useState({ min: 0, max: 200 })
    const [humidityRange, setHumidityRange] = useState({ min:30, max: 90 })
    const [sensorId, setSensorId] = useState("")

    // Handles slider changes for each metric and updates their state
    const handleFiltering = useCallback((metric: string, value: number, isMin: boolean) => {
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
    }, []);

    // Sends the current filter values to the parent Dashboard component
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

    // Resets all filters and notifies parent to clear filters and sensor search
    const clearAll = () => {
        const resetTemperature: { min: number; max: number } = { min: 10, max: 40 };
        const resetHumidity: { min: number; max: number } = { min: 30, max: 90 };
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

    // Sends the searched sensorId to the parent Dashboard component
    const handleSearching = useCallback((searchedSensorId: string) => {
        onSensorFilter(searchedSensorId);
    }, []);

    // Renders the filter UI: toggles, sliders, text input, and action buttons
    return (
        <div className="filter-wrapper-main">
            <button className="filter-toggle-btn" onClick={() => setIsExpanded(!isExpanded)}>
                <Filter />
                <p>Filter</p>
            </button>
            {isExpanded && (
                <div className="filter-panel-content">
                    <input
                        className="filter-text-input"
                        type="text"
                        placeholder="e.g., Sensor-1"
                        onChange={(e) => setSensorId(e.target.value)}
                    />

                    <Sliders onSlide={handleFiltering} metric="Temperature" range={temperatureRange} />
                    <Sliders onSlide={handleFiltering} metric="Air Quality" range={airQualityRange} />
                    <Sliders onSlide={handleFiltering} metric="Humidity" range={humidityRange} />

                    <button className="apply-button" onClick={() => {
                        updateFilterValues();
                        handleSearching(sensorId);
                    }}
                    >
                        Apply
                    </button>

                    <button className="clear-button" onClick={clearAll}>Clear</button>

                </div>
            )}
        </div>

    )
}

export default React.memo(Filtering);