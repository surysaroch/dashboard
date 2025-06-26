import React from "react"
import { useMemo } from "react";
import Humidity from './svg_components/Humidity';
import AirQuality from './svg_components/AirQuality';
import Temperature from './svg_components/Temperature';

interface metricType {
    metric: 'temperature' | 'airQuality' | 'humidity'
    values: [
        {
            temperature: number
            temperaturePercentage: number
        },
        {
            airQuality: number
            airQualityPercentage: number
        },
        {
            humidity: number
            humidityPercentage: number
        }];
}

// Metric component: displays a single metric (temperature, air quality, or humidity) with icon and progress bar
const Metric: React.FC<metricType> = ({ metric, values }) => {
    console.log(`Metric ${metric} rendering with values:`, values);

    // Select the appropriate icon, label, value, and progress based on the metric type provided by the parent.
    const { icon, name, value, percentage, progressWidth } = useMemo(() => {
        console.log(`Metric ${metric} useMemo running`);
        const iconMap = {
            temperature: <Temperature color="#FF7101" />,
            humidity: <Humidity color="#00FF00" />,
            airQuality: <AirQuality color="#00A3FF" />
        };

        const nameMap = {
            temperature: 'Temperature',
            airQuality: 'Air Quality',
            humidity: 'Humidity'
        };

        const valueMap = {
            temperature: values[0].temperature.toFixed(1) + "°C",
            airQuality: values[1].airQuality.toFixed(1),
            humidity: values[2].humidity.toFixed(1) + "%"
        };

        const percentageMap = {
            temperature: values[0].temperaturePercentage.toFixed(0),
            airQuality: values[1].airQualityPercentage.toFixed(0),
            humidity: values[2].humidityPercentage.toFixed(0)
        };

        const progressMap = {
            temperature: values[0].temperaturePercentage,
            airQuality: values[1].airQualityPercentage,
            humidity: values[2].humidityPercentage
        };

        return {
            icon: iconMap[metric],
            name: nameMap[metric],
            value: valueMap[metric],
            percentage: percentageMap[metric],
            progressWidth: progressMap[metric]
        };
    }, [metric, values]);

    // Render the metric row: icon, name, value, percentage, and progress bar
    return (
        <div className="metric-row">
            <div className="metric-info">
                <span className="metric-icon">{icon}</span>
                <span className="metric-name">{name}</span>
            </div>
            <div className="metric-progress">
                <span className="metric-value">
                    <p>{value}</p>
                    <p>({percentage}%)</p>
                </span>
                <div className="outer-bar">
                    <div className={`inner-bar-${metric}`}
                        style={{ width: `${progressWidth}%` }}></div>
                </div>
            </div>
        </div>
    );
};
export default React.memo(Metric)