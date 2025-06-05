import { useState } from "react";

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
        <div>
            <select value={sortMetric} onChange={handleMetricChange}>
                <option value="sensorId">SensorId</option>
                <option value="temperature">Temperature</option>
                <option value="humidity">Humidity</option>
                <option value="airQuality">Air Quality</option>
            </select>
        </div>
        <div>
            <button onClick={handleOrderChange}>
                {sortOrder}
            </button>
        </div>
        </>

    );
};

export default Sorting;