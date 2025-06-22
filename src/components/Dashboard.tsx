import React, { useEffect, useMemo, useState, useRef, useContext } from 'react';

import RowData from "./rowData";
import Sorting from "./sorting";
import Filtering from "./Filtering";
import Pagination from './pagination';
import "./dashboard.css"
import Pins from './pins';
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

const Dashboard: React.FC = () => {
  const { sensorData } = useContext(DashboardContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageData, setPageData] = useState<SensorMetric[]>([]);
  const [sortedData, setSortedData] = useState({ metric: "sensorId", direction: "asc" });
  const [filteredData, setFilteredData] = useState({
    temperature: { min: 0, max: 40 },
    humidity: { min: 0, max: 90 },
    airQuality: { min: 0, max: 200 }
  });
  const [chosenSensorId, setChosenSensorId] = useState('')


  const processData = useMemo(() => {
    let items = [...sensorData]
    items = items.filter(item => {
      const filteredTemp = (item.temperature >= filteredData.temperature.min) && (item.temperature <= filteredData.temperature.max);
      const filteredAir = (item.airQuality >= filteredData.airQuality.min) && (item.airQuality <= filteredData.airQuality.max);
      const filteredHumidity = (item.humidity >= filteredData.humidity.min) && (item.humidity <= filteredData.humidity.max);
      const filteredSensorId = chosenSensorId === '' || item.sensorId.toLowerCase().includes(chosenSensorId.toLowerCase());
      return filteredTemp && filteredAir && filteredHumidity && filteredSensorId;
    })

    if (sortedData.metric === "sensorId") {
      // console.log("jhonson")
      return sortedData.direction === "asc" ? items : items.reverse()
    }
    else {
      items.sort((a, b) => {
        const valA = a[sortedData.metric as keyof SensorMetric];
        const valB = b[sortedData.metric as keyof SensorMetric];
        if (typeof valA === "number" && typeof valB === "number") {
          return sortedData.direction === 'asc' ? valA - valB : valB - valA;
        }
        else { return 0 }
      });
      return items;
    }
  }, [sortedData, sensorData, filteredData, chosenSensorId]);



  const sliceData = () => {
    const last_page = Math.ceil(processData.length / MAX_PAGE_SIZE);
    const startIndex = (currentPage - 1) * MAX_PAGE_SIZE;
    const endIndex = startIndex + MAX_PAGE_SIZE;
    if (currentPage > last_page) {
      setCurrentPage(last_page === 0 ? last_page + 1 : last_page);
    };
    setPageData(processData.slice(startIndex, endIndex));

  };

  useMemo(() => {
    sliceData();
  }, [currentPage, processData]);


  const handleSort = (chosenMetric: string, direction: string) => {
    setSortedData({ metric: chosenMetric, direction: direction });
  };

  const handleFilterChange = (filters: FilterItem[]) => {
    setFilteredData(prev => {
      return {
        ...prev,
        [filters[0].metric]: filters[0].range,
        [filters[1].metric]: filters[1].range,
        [filters[2].metric]: filters[2].range
      }
    });
    setCurrentPage(1)
  };

  const handleSensorIdFilter = (sensorId: string) => {
    setChosenSensorId(sensorId);
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div className="dashboard-container">
      <div className="heading-container">
        <h1>Live Sensor Data</h1>
        <div className="features-container">
          
          <div><Pins /></div>
          <div><Filtering onFilter={handleFilterChange} onSensorFilter={handleSensorIdFilter} /></div>
          <div><Sorting onSort={handleSort} /></div>
        </div>
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
      ) : <p className = "no-match-output">No Data matches the current filter</p>}
    </div>

  );
};

export default Dashboard;