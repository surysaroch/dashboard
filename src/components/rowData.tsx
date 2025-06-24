import React, { useState, useContext } from 'react';
import Metric from './Metric';
import { DashboardContext } from '../context/DashboardContext';
import Pin from './svg_components/Pin'

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
  const { pinnedDataFunction } = useContext(DashboardContext);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  const minTemperature: number = 10;
  const maxTemperature: number = 40;

  const currentTemperature: number = metric.temperature;
  const temperaturePercentage: number = ((currentTemperature - minTemperature) / (maxTemperature - minTemperature)) * 100;

  const minAirQuality: number = 0;
  const maxAirQuality: number = 200;

  const currentAirQuality: number = metric.airQuality;
  const airQualityPercentage: number = ((currentAirQuality - minAirQuality) / (maxAirQuality - minAirQuality)) * 100;

  const minHumidity: number = 0;
  const maxHumidity: number = 90;

  const currentHumidity: number = metric.humidity;
  const humidityPercentage: number = ((currentHumidity - minHumidity) / (maxHumidity - minHumidity)) * 100;

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
      <div className="sensor-id-container">
        <span className="sensor-id">{metric.sensorId}</span>
      </div>
      <div className="metric-container">
        <Metric metric={"temperature"} values={metricValues} />
        <Metric metric={"airQuality"} values={metricValues} />
        <Metric metric={"humidity"} values={metricValues} />
      </div>
      <div className="pin-and-timestamp-container">
        <div className="pinned-button">
          <button onClick={(e) => { e.stopPropagation(); pinnedDataFunction(metric.sensorId) }}>
            <Pin />
          </button>
        </div>
        <div className="timestamp">
          {new Date(metric.timestamp).toLocaleString()}
        </div>
      </div>

    </li>
  );
};

export default RowData;