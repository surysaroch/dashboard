import React from "react"
import { useState } from "react";
import Arrow from "./svg_components/Arrow";

interface SortingProps {
    onSort: (metric: string, direction: string) => void;
}

// Sorting component: allows user to select metric and order for sorting the data
const Sorting: React.FC<SortingProps> = ({ onSort }) => {
    const [sortMetric, setSortMetric] = useState("sensorId");
    const [sortOrder, setSortOrder] = useState("ascending"); //ascnding or descending

    // Handle metric dropdown change and notify parent with onSort
    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMetric: string = event.target.value;
        setSortMetric(newMetric);
        onSort(newMetric, sortOrder);
    };

    // Toggle sort order and notify parent with onSort
    const handleOrderChange = () => {
        const newOrder: string = sortOrder === "ascending" ? "descending" : "ascending";
        setSortOrder(newOrder);
        onSort(sortMetric, newOrder);
    };
   
    // Render sorting controls: metric dropdown and order toggle button
    return (
        <div className = "sorting-container">
            <span>Sort by:</span> 
            <div className = "dropdown-container">
                <select value={sortMetric} onChange={handleMetricChange}>                    
                    <option value="sensorId">Sensor ID</option>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="airQuality">Air Quality</option>
                    <option value="timestamp">Time</option>
                </select>
            </div>
            <div className = "order-toggle-button">
                <button onClick={handleOrderChange}>
                    {sortOrder === "ascending" ?
                        <><Arrow/><p>Ascending</p></>: 
                        <><Arrow isFlipped={true}/> <p>Descending</p></>}
                </button>
            </div>
        </div>

    );
};

export default React.memo(Sorting);