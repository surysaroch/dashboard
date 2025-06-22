import React, { useState } from 'react';
import './rowData.css';
import Metric from './metric';

interface SensorMetric {
  sensorId: string;
  timestamp: string;
  airQuality: number;
  temperature: number;
  humidity: number;
};

interface rowDataProps {
  metric: SensorMetric;
}

const RowData: React.FC<rowDataProps> = ({ metric }) => {

  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  const minTemperature = 10;
  const maxTemperature = 40;

  const currentTemperature = metric.temperature;
  const temperaturePercentage = ((currentTemperature - minTemperature) / (maxTemperature - minTemperature)) * 100;

  const minAirQuality = 0;
  const maxAirQuality = 200;

  const currentAirQuality = metric.airQuality;
  const airQualityPercentage = ((currentAirQuality - minAirQuality) / (maxAirQuality - minAirQuality)) * 100;

  const minHumidity = 0;
  const maxHumidity = 90;

  const currentHumidity = metric.humidity;
  const humidityPercentage = ((currentHumidity - minHumidity) / (maxHumidity - minHumidity)) * 100;

  const metricValues: [{
    temperature: number;
    temperaturePercentage: number;
  }, {
    airQuality: number;
    airQualityPercentage: number;
  }, {
    humidity: number;
    humidityPercentage: number;
  }] = [{
    temperature: currentTemperature,
    temperaturePercentage: temperaturePercentage
  },
  {
    airQuality: currentAirQuality,
    airQualityPercentage: airQualityPercentage
  },
  {
    humidity: currentHumidity,
    humidityPercentage: humidityPercentage
  }];

  return (
    <li key={metric.sensorId} onClick={handleToggleExpand} className="row-data-container">
      <button className="pinned-button" onClick={}>pin</button>
      <div className="sensor-metric-container">
        <div className="sensor-id-container">
          <span className="sensor-id">{metric.sensorId}</span>
        </div>
        <div className="metric-container">
          <Metric metric={"temperature"} values={metricValues} />
          <Metric metric={"airQuality"} values={metricValues} />
          <Metric metric={"humidity"} values={metricValues} />
        </div>
      </div>


      {isExpanded && (
        <div className="expanded-container">
          <p>Temperature: {metric.temperature.toFixed(2)}°C</p>
          <p>Humidity: {metric.humidity.toFixed(2)}%</p>
          <p>Air Quality: {metric.airQuality.toFixed(2)}</p>
          <p>Timestamp: {new Date(metric.timestamp).toLocaleString()}</p>
        </div>
      )}
    </li>
  );
};

export default RowData;