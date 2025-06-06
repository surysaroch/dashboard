import { useState } from "react";

interface FilteringProps {
    onFilter: (metric: string, newRangeValue: { min: number, max: number }) => void;
    onSensorFilter: (sensorId:  string) => void;
}

const Filtering: React.FC<FilteringProps> = ({ onFilter, onSensorFilter }) => {
    const[isExpanded, setIsExpanded] = useState(false)
    const[temperatureRange, setTemperatureRange] = useState({ min: 10, max: 40 })
    const[airQualityRange, setAirQualityRange] = useState({ min: 0, max: 200 })
    const[humidityRange, setHumidityRange] = useState({ min: 0, max: 90 })
    
    const handleFiltering = (metric: string, value: number, isMin: boolean) => {
        switch(metric) {
            case 'temperature':
                setTemperatureRange(prev => ({
                    ...prev,
                    [isMin ? 'min' : 'max']: value
                }));
                onFilter('temperature', {
                    ...temperatureRange,
                    [isMin ? 'min' : 'max']: value
                });
                break;
            case 'humidity':
                setHumidityRange(prev => ({
                    ...prev,
                    [isMin ? 'min' : 'max']: value
                }));
                onFilter('humidity', {
                    ...humidityRange,
                    [isMin ? 'min' : 'max']: value
                });
                break;
            case 'airQuality':
                setAirQualityRange(prev => ({
                    ...prev,
                    [isMin ? 'min' : 'max']: value
                }));
                onFilter('airQuality', {
                    ...airQualityRange,
                    [isMin ? 'min' : 'max']: value
                });
                break;
        }
    }
    
    const handleSearching = (searchedSensorId: string) => {
        onSensorFilter(searchedSensorId);
    }
    return (
        <>
        <button onClick={() => setIsExpanded(!isExpanded)}>Filters</button>
        {isExpanded? (
            <div>
                <input type="text" placeholder="Search by sensorId" onChange={(e) => handleSearching(e.target.value)} />
                <div>
                    <label>Temperature</label>
                    <div>
                        <input 
                            type="range" 
                            min={10} 
                            max={temperatureRange.max} 
                            step={1} 
                            value={temperatureRange.min}
                            onChange={(e) => handleFiltering('temperature', Number(e.target.value), true)} 
                        />
                        <span>Min: {temperatureRange.min}°C</span>
                    </div>
                    <div>
                        <input 
                            type="range" 
                            min={temperatureRange.min} 
                            max={40} 
                            step={1} 
                            value={temperatureRange.max}
                            onChange={(e) => handleFiltering('temperature', Number(e.target.value), false)} 
                        />
                        <span>Max: {temperatureRange.max}°C</span>
                    </div>
                </div>
                <div>
                    <label>Humidity</label>
                    <div>
                        <input 
                            type="range" 
                            min={0} 
                            max={humidityRange.max} 
                            step={1} 
                            value={humidityRange.min}
                            onChange={(e) => handleFiltering('humidity', Number(e.target.value), true)} 
                        />
                        <span>Min: {humidityRange.min}%</span>
                    </div>
                    <div>
                        <input 
                            type="range" 
                            min={humidityRange.min} 
                            max={90} 
                            step={1} 
                            value={humidityRange.max}
                            onChange={(e) => handleFiltering('humidity', Number(e.target.value), false)} 
                        />
                        <span>Max: {humidityRange.max}%</span>
                    </div>
                </div>
                <div>
                    <label>Air Quality</label>
                    <div>
                        <input 
                            type="range" 
                            min={0} 
                            max={airQualityRange.max} 
                            step={1} 
                            value={airQualityRange.min}
                            onChange={(e) => handleFiltering('airQuality', Number(e.target.value), true)} 
                        />
                        <span>Min: {airQualityRange.min}</span>
                    </div>
                    <div>
                        <input 
                            type="range" 
                            min={airQualityRange.min} 
                            max={200} 
                            step={1} 
                            value={airQualityRange.max}
                            onChange={(e) => handleFiltering('airQuality', Number(e.target.value), false)} 
                        />
                        <span>Max: {airQualityRange.max}</span>
                    </div>
                </div>
            </div>
        ) : null}
        </>
    )
}

export default Filtering;  