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
};

const Metric: React.FC<metricType> = ({ metric, values }) => {
    return (
        <div className="metric-row">
            <div className="metric-info">
                <span className="metric-icon">
                    {metric === 'temperature' ? (
                        <Temperature color="#FF7101" />
                    ) : metric === 'humidity' ? (
                        <Humidity color="#00FF00" />
                    ) : (
                        <AirQuality color="#00A3FF" />
                    )}
                </span>
                <span className="metric-name">
                    {metric === 'temperature'
                        ? 'Temperature'
                        : metric === 'airQuality'
                            ? 'Air Quality'
                            : 'Humidity'}
                </span>
            </div>
            <div className="metric-progress">
                <span className="metric-value">

                    <p>{(metric === 'temperature' ?
                        values[0].temperature.toFixed(1) + "°C" :
                        metric === 'airQuality' ?
                            values[1].airQuality.toFixed(1) :
                            values[2].humidity.toFixed(1) + "%")}
                    </p>

                    <p>{(metric === 'temperature' ?
                        values[0].temperaturePercentage.toFixed(0) :
                        metric === 'airQuality' ?
                            values[1].airQualityPercentage.toFixed(0) :
                            values[2].humidityPercentage.toFixed(0))}%
                    </p>

                </span>
                <div className="outer-bar">
                    <div className={`inner-bar-${metric}`}
                        style={{
                            width:
                                `${metric === 'temperature' ? values[0].temperaturePercentage :
                                    metric === 'airQuality' ? values[1].airQualityPercentage :
                                        values[2].humidity

                                }%`
                        }}></div>
                </div>
            </div>
        </div>

    );
};
export default Metric