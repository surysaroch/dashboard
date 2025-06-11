import { useState } from "react";
import "./sorting.css"
import Arrow from "./svgs/arrow";

interface SortingProps {
    onSort: (metric: string, direction: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ onSort }) => {
    const [sortMetric, setSortMetric] = useState("sensorId");
    const [sortOrder, setSortOrder] = useState("asc");

    const handleMetricChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newMetric = event.target.value;
        setSortMetric(newMetric);
        onSort(newMetric, sortOrder);
    };

    const handleOrderChange = () => {
        const newOrder = sortOrder === "asc" ? "desc" : "asc";
        setSortOrder(newOrder);
        onSort(sortMetric, newOrder);
    };

    return (
        <>
        <div className = "sorting-container">
            <span>Sort by:</span> 
            <div className = "dropdown-container">
                <select value={sortMetric} onChange={handleMetricChange}>                    
                    <option value="sensorId">Sensor ID</option>
                    <option value="temperature">Temperature</option>
                    <option value="humidity">Humidity</option>
                    <option value="airQuality">Air Quality</option>
                </select>
            </div>
            <div className = "order-toggle-button">
                <button onClick={handleOrderChange}>
                    {sortOrder === "asc" ?
                        <><Arrow/><p>Ascending</p></>: 
                        <><Arrow isFlipped={true}/> <p>Descending</p></>}
                </button>
            </div>
        </div>
        </>
    );
};

export default Sorting;