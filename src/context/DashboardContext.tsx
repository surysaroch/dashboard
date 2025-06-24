import { createContext, useState, useEffect, type ReactNode } from 'react';
import SimulateRealTimeData from "../util/SimulateRealTimeData";

const MAX_HISTORY_PER_SENSOR = 10;

interface SensorMetric {
    sensorId: string;
    temperature: number;
    humidity: number;
    airQuality: number;
    timestamp: string;
}

interface DashboardContextType {
    sensorData: SensorMetric[];
    pinnedData: Set<string>;
    pinnedDataFunction: (sensorId: string) => void;
    latestSensorData: Record<string,SensorMetric[]>;
}

export const DashboardContext = createContext<DashboardContextType>({
    sensorData: [],
    pinnedData: new Set<string>(),
    pinnedDataFunction: () => {},
    latestSensorData: {}
});

interface DashboardContextProviderProps {
    children: ReactNode;
}

export default function DashboardContextProvider({ children }: DashboardContextProviderProps) {
    const [sensorData, setSensorData] = useState<SensorMetric[]>([]);
    const [pinnedData, setPinnedData] = useState<Set<string>>(new Set());
    const [latestSensorData, setLatestSensorData] = useState<Record<string, SensorMetric[]>>({});

    useEffect(() => {
        const stopSimulation = SimulateRealTimeData(100, 3000, (updates: SensorMetric[]) => {
            setSensorData(updates);
            setLatestSensorData(prev => {
                const updated: Record<string, SensorMetric[]> = { ...prev };
                updates.forEach(sensor => {
                    const history = updated[sensor.sensorId] ? [...updated[sensor.sensorId]] : [];
                    history.unshift(sensor);
                    if (history.length > MAX_HISTORY_PER_SENSOR) {
                        history.pop();
                    }
                    updated[sensor.sensorId] = history;
                });
                return updated;
            });
        });
    
        return () => {
            stopSimulation();
        };
    }, []);

    const pinnedDataFunction = (sensorId: string) => {
        setPinnedData(prev => {
            const newSet = new Set(prev);
            if (newSet.has(sensorId)) {
                newSet.delete(sensorId); 
            } else {
                newSet.add(sensorId);
            }
            return newSet;
        });
    };

    const value = {
        sensorData,
        pinnedData,
        pinnedDataFunction,
        latestSensorData
    };



    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}