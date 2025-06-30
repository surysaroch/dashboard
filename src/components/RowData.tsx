import React, { useContext, useMemo } from 'react';
import Metric from './Metric';
import { DashboardContext } from '../context/DashboardContext';
import Pin from './svg_components/Pin'
import Unpin from './svg_components/Unpin';

interface SensorMetric {
  sensorId: string;
  timestamp: string;
  airQuality: number;
  temperature: number;
  humidity: number;
}

interface rowDataProps {
  metric: SensorMetric;
}

// RowData component: displays a single sensor's data row with metrics and pin/timestamp
const RowData: React.FC<rowDataProps> = ({ metric }) => {
  const { pinnedData, pinnedDataFunction } = useContext(DashboardContext);
  const isPinned = pinnedData.has(metric.sensorId);
  // Memoize metric values and their percentages for display in Metric components
  const metricValues = useMemo(() => {
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

    return [{
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
    }] as [
        { temperature: number; temperaturePercentage: number },
        { airQuality: number; airQualityPercentage: number },
        { humidity: number; humidityPercentage: number }]
  }, [metric.temperature, metric.airQuality, metric.humidity]);

  // Render the sensor row: sensor id, metrics, pin button, and timestamp in three different containers as items for flexbox
  return (
    <li key={metric.sensorId} className="row-data-container">
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
          <button onClick={(e) => { e.stopPropagation(); pinnedDataFunction(metric.sensorId);}}>
          {isPinned ? <Unpin /> : <Pin />}
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