import React, { useState } from 'react';
import './rowData.css';
import Humidity from './svgs/humidity';
import AirQuality from './svgs/airQuality';
import Temperature from './svgs/temperature';

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

  const currentTemperature =  metric.temperature;
  const temperaturePercentage = ((currentTemperature - minTemperature) / (maxTemperature - minTemperature)) * 100;

  const minAirQuality = 0;
  const maxAirQuality = 200;

  const currentAirQuality = metric.airQuality;
  const airQualityPercentage = ((currentAirQuality - minAirQuality) / (maxAirQuality - minAirQuality)) * 100;

  const minHumidity = 0;
  const maxHumidity = 90;

  const currentHumidity = metric.humidity;
  const humidityPercentage = ((currentHumidity - minHumidity) / (maxHumidity - minHumidity)) * 100;

  return (
    <li key={metric.sensorId} onClick={handleToggleExpand} className = "row-data-container">
      <div className = "sensor-metric-container"> 
        <div className = "sensor-id-container"> 
          <span className = "sensor-id">{metric.sensorId}</span>
        </div>

        <div className="metric-container">
          <div className="metric-row">
              <span className="metric-icon"><Temperature color="#FF7101"/></span>
              <div className="metric-progress">
                <span className="metric-value">
                  <p>{metric.temperature.toFixed(1)}%</p>
                  <p>{temperaturePercentage.toFixed(0)}%</p>
                  </span>
                  <div className="outer-bar">
                      <div className="inner-bar-temperature" style={{ width: `${temperaturePercentage}%`}}></div>
                  </div>
              </div>
          </div>

          <div className="metric-row">
              <span className="metric-icon"><AirQuality color="#00C5FF"/></span>
              <div className="metric-progress">
                <span className="metric-value">
                  <p>{metric.airQuality.toFixed(1)}%</p>
                  <p style= {{color:"#d1d5db"}}>{airQualityPercentage.toFixed(0)}%</p>
                </span>
                  <div className="outer-bar">
                      <div className="inner-bar-airquality" style={{ width: `${airQualityPercentage}%`, backgroundColor: '#00C5FF' }}></div>
                  </div>

              </div>
          </div>

          <div className="metric-row">
              <span className="metric-icon"><Humidity color="#00FF19" /></span>
              <div className="metric-progress">
                <span className="metric-value">
                  <p>{metric.humidity.toFixed(1)}%</p>
                  <p>{humidityPercentage.toFixed(0)}%</p>
                </span>
                  <div className="outer-bar">
                      <div className="inner-bar-humidity" style={{ width: `${humidityPercentage}%`, backgroundColor: '#00FF19' }}></div>
                  </div>
              </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className = "expanded-container">
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