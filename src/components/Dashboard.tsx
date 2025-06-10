import React, { useEffect, useMemo, useState} from 'react';
import SimulateRealTimeData from "../util/SimulateRealTimeData";
import RowData from "./rowData";
import Sorting from "./sorting";
import Filtering from "./Filtering";
import "./dashboard.css" 

interface SensorMetric {
    sensorId: string;
    temperature: number;
    humidity: number;
    airQuality: number;
    timestamp: string;
}
const MAX_PAGE_SIZE = 5;

const Dashboard: React.FC = () => {
  const [sensorData, setSensorData] = useState<SensorMetric[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [sortedData, setSortedData] = useState({ metric: "sensorId", direction: "asc" });
  const [filteredData, setFilteredData] = useState({
    temperature: { min: 0, max: 40 },
    humidity: { min: 0, max: 90 },
    airQuality: { min: 0, max: 200 }
  });
  const [chosenSensorId, setChosenSensorId] = useState('')

  useEffect(() => {
    const stopSimulation = SimulateRealTimeData(100000, 1000, (updates: SensorMetric[]) => { 
      setSensorData(updates);
    });

    return () => {
      stopSimulation();
    };
  }, []);
  
  const processData = useMemo(() => {
    let items = [...sensorData]
    items = items.filter(item => {
      const filteredTemp = (item.temperature >= filteredData.temperature.min) && ( item.temperature <= filteredData.temperature.max);
      const filteredAir = (item.airQuality >= filteredData.airQuality.min) && ( item.airQuality <= filteredData.airQuality.max);
      const filteredHumidity = (item.humidity >= filteredData.humidity.min) && ( item.humidity <= filteredData.humidity.max);
      const filteredSensorId = chosenSensorId === '' || item.sensorId.toLowerCase().includes(chosenSensorId.toLowerCase());
      // const filteredSensorId = chosenSensorId === '' || item.sensorId.toLowerCase() === chosenSensorId.toLowerCase();
      return filteredTemp && filteredAir && filteredHumidity && filteredSensorId;
    })

    if(sortedData.metric === "sensorId"){
      console.log("jhonson")
      return sortedData.direction === "asc"? items: items.reverse()
    }
    else{
      items.sort((a,b) => {
        const valA = a[sortedData.metric as keyof SensorMetric];
        const valB = b[sortedData.metric as keyof SensorMetric];
        if (typeof valA === "number" && typeof valB === "number") {
          return sortedData.direction === 'asc' ? valA - valB : valB - valA;
        }
        else{return 0}
      });
      return items;  
    }
  },[sortedData, sensorData, filteredData, chosenSensorId]);


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const startIndex = (currentPage - 1) * MAX_PAGE_SIZE;
  const endIndex = startIndex + MAX_PAGE_SIZE;
  const pageData = processData.slice(startIndex, endIndex);


  const handleSort = (chosenMetric: string, direction: string) => {
    setSortedData({ metric: chosenMetric, direction: direction });
  };

  const handleFilterChange = (metric: string, newRangeValue: { min: number, max: number }) => {
    setFilteredData(prev => {
      return{
      ...prev,
      [metric]: newRangeValue
      }
    });
  };
  
  const handleSensorIdFilter = (sensorId: string) =>{
    setChosenSensorId(sensorId)
  }
     


  return (
    <div className="dashboard-container">
      <div className="heading-container">
        <h3>Live Sensor Data</h3>
        <div className="features-container">
          <div><Filtering onFilter={handleFilterChange} onSensorFilter={handleSensorIdFilter}/></div>
          <div><Sorting onSort={handleSort} /></div>
        </div>
      </div>

      <ul>
        {pageData.map(metric => (
          <RowData key={metric.sensorId} metric={metric} />
        ))}
      </ul>

      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>Prev</button>
        <span className="page-number">{currentPage}</span>
        <button onClick={handleNextPage} disabled={currentPage === Math.ceil(sensorData.length / MAX_PAGE_SIZE)}>Next</button>
      </div>
    </div>
  );
};

export default Dashboard;