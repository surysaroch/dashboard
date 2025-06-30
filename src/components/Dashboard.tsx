import React, { useMemo, useState, useContext, useCallback, useEffect } from 'react';

import RowData from "./RowData";
import Sorting from "./SortButton";
import Filtering from "./FilterSliders";
import Pagination from './Pagination';
import Pins from './Pins';
import { DashboardContext } from '../context/DashboardContext';

interface SensorMetric {
  sensorId: string;
  temperature: number;
  humidity: number;
  airQuality: number;
  timestamp: string;
}

interface FilterItem {
  metric: string;
  range: { min: number; max: number };
}
const MAX_PAGE_SIZE = 5;

// Main dashboard component, parent of all other components
const Dashboard: React.FC = () => {
  const { sensorData, latestSensorData } = useContext(DashboardContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<SensorMetric[]>([]);
  const [sortedData, setSortedData] = useState({ metric: "sensorId", direction: true });
  const [filteredData, setFilteredData] = useState({
    temperature: { min: 0, max: 40 },
    humidity: { min: 0, max: 90 },
    airQuality: { min: 0, max: 200 }
  });
  const [chosenSensorId, setChosenSensorId] = useState('')

  // Memoized function to process data: applies filters and sorting
  const processData = useMemo(() => {
    let items = []
    if (sortedData.metric === "timestamp" && !sortedData.direction) {
      items = Object.values(latestSensorData).map(sensorHistory => sensorHistory[sensorHistory.length - 1]); //get the oldest sensors
    }
    else {
      items = [...sensorData];
    }
    items = items.filter(item => {
      const filteredTemp: boolean = (item.temperature >= filteredData.temperature.min) && (item.temperature <= filteredData.temperature.max);
      const filteredAir: boolean = (item.airQuality >= filteredData.airQuality.min) && (item.airQuality <= filteredData.airQuality.max);
      const filteredHumidity: boolean = (item.humidity >= filteredData.humidity.min) && (item.humidity <= filteredData.humidity.max);
      const filteredSensorId: boolean = chosenSensorId === '' || item.sensorId.toLowerCase().includes(chosenSensorId.toLowerCase());
      return filteredTemp && filteredAir && filteredHumidity && filteredSensorId;
    })

    if (sortedData.metric === "sensorId") {
      return sortedData.direction ? items : items.reverse() //sort by: sensorId
    }

    else {
      //Sort all the metrics using compare function
      items.sort((a, b) => {
        const valA = a[sortedData.metric as keyof SensorMetric];
        const valB = b[sortedData.metric as keyof SensorMetric];
        if (typeof valA === "number" && typeof valB === "number") {
          return sortedData.direction ? valA - valB : valB - valA;
        }
        else { return 0 }
      });
      return items;
    }
  }, [sortedData, sensorData, filteredData, chosenSensorId]);


  //Slice the data to 5 sensors per page
  useEffect(() => {
    const last_page: number = Math.ceil(processData.length / MAX_PAGE_SIZE);
    const startIndex: number = (currentPage - 1) * MAX_PAGE_SIZE;
    const endIndex: number = startIndex + MAX_PAGE_SIZE;
    if (currentPage > last_page) {
      setCurrentPage(last_page === 0 ? last_page + 1 : last_page);
    }
    setPageData(processData.slice(startIndex, endIndex));
  }, [currentPage, processData]);

  // Handles sorting changes from Sorting component
  const handleSort = useCallback((chosenMetric: string, direction: boolean) => {
    setSortedData({ metric: chosenMetric, direction: direction });
  }, []);

  // Handles filter changes from Filtering component
  const handleFilterChange = useCallback((filters: FilterItem[]) => {
    setFilteredData(prev => {
      return {
        ...prev, // This spreads the previous state and updates the range for each metric (temperature, humidity, airQuality)
        [filters[0].metric]: filters[0].range,
        [filters[1].metric]: filters[1].range,
        [filters[2].metric]: filters[2].range
      }
    });
    setCurrentPage(1)
  }, []);

  // Handles sensorId search from Filtering component
  const handleSensorIdFilter = useCallback((sensorId: string) => {
    setChosenSensorId(sensorId);

  }, []);

  // Handles pagination changes from Pagination component
  const handlePagination = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);


  const summary = useMemo(() => {
    let tempSum = 0, humiditySum = 0, aqiSum = 0;
    processData.forEach(data => {
      tempSum += data.temperature;
      humiditySum += data.humidity;
      aqiSum += data.airQuality;
    });
    const count = processData .length;
    const avgTemp = count ? tempSum / count : 0;
    const avgHumidity = count ? humiditySum / count : 0;
    const avgAqi = count ? aqiSum / count : 0;

    return {
      avgTemp,
      avgHumidity,
      avgAqi
    };
  }, [processData]);

  // Render dashboard UI: features, data rows, and pagination
  return (
    <>

      <div className="dashboard-container">
        <div className="heading-container">
          <h1>LIVE SENSOR DASHBOARD</h1>
          <div className="features-container">

            <div><Pins /></div>
            <div><Filtering onFilter={handleFilterChange} onSensorFilter={handleSensorIdFilter} /></div>
            <div><Sorting onSort={handleSort} /></div>
          </div>
        </div>
        <div className="summary-stats">
        <p>Average Temperature: {summary.avgTemp.toFixed(2)}°C</p>
        <p>Average Air Quality: {summary.avgAqi.toFixed(2)}</p>
        <p>Average Humidity: {summary.avgHumidity.toFixed(2)}%</p>
      </div>
        {pageData && pageData.length > 0 ? (
          <>
            <ul>
              {pageData.map(metric => (
                <RowData key={metric.sensorId} metric={metric} />
              ))}
            </ul>

            <div className="pagination-container">
              <Pagination onChange={handlePagination} currentPage={currentPage} processDataLength={processData.length} maxPageSize={MAX_PAGE_SIZE} />
            </div>
          </>
        ) : <p className="no-match-output">No Data matches the current filter</p>}
      </div>
    </>
  );
};

export default Dashboard;