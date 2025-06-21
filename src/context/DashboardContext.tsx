import { createContext, useState, useEffect, type ReactNode } from 'react';
import SimulateRealTimeData from "../util/SimulateRealTimeData";

interface SensorMetric {
    sensorId: string;
    temperature: number;
    humidity: number;
    airQuality: number;
    timestamp: string;
}

interface DashboardContextType {
    sensorData: SensorMetric[];
}

export const DashboardContext = createContext<DashboardContextType>({
    sensorData: [],
});

interface DashboardContextProviderProps {
    children: ReactNode;
}

export default function DashboardContextProvider({ children }: DashboardContextProviderProps) {
    const [sensorData, setSensorData] = useState<SensorMetric[]>([]);

    useEffect(() => {
        const stopSimulation = SimulateRealTimeData(100, 1000, (updates: SensorMetric[]) => {
          setSensorData(updates);
          console.log(updates)
        });

        return () => {
          stopSimulation();
        };
    }, []);

    const value = {
        sensorData,
    };


    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}