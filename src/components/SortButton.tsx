import React from "react"
import { useState } from "react";
import Arrow from "./svg_components/Arrow";

interface SortingProps {
    onSort: (metric: string, direction: boolean) => void;
}

// Sorting component: allows user to select metric and order for sorting the data
const Sorting: React.FC<SortingProps> = ({ onSort }) => {
    const [sortMetric, setSortMetric] = useState("sensorId");
    const [isAscending, setIsAscending] = useState(true); //ascnding or descending

    // Handle metric dropdown change and notify parent with onSort
    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMetric: string = event.target.value;
        setSortMetric(newMetric);
        onSort(newMetric, !isAscending);
    };

    // Toggle sort order and notify parent with onSort
    const handleOrderChange = () => {
        setIsAscending(!isAscending);
        onSort(sortMetric, !isAscending);
    };
   
    // Render sorting controls: metric dropdown and order toggle button
    return (
        <div className = "sorting-container">
            <span>Sort by:</span> 
            <div className = "dropdown-container">
                <select value={sortMetric} onChange={handleMetricChange}>                    
                    <option value="sensorId">Sensor ID</option>
                    <option value="temperature">Temperature</option>
                    <option value="airQuality">Air Quality</option>
                    <option value="humidity">Humidity</option>
                    <option value="timestamp">Timestamp</option>
                </select>
            </div>
            <div className = "order-toggle-button">
                <button onClick={handleOrderChange}>
                    <Arrow isFlipped={!isAscending}  /><p>{isAscending?"Ascending":"Descending"}</p>
                </button>
            </div>
        </div>

    );
};

export default React.memo(Sorting);