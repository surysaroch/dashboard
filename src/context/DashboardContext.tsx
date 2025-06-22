import { useMemo, createContext, useState, useEffect, type ReactNode } from 'react';
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
    pinnedData: Set<string>
}

export const DashboardContext = createContext<DashboardContextType>({
    sensorData: [],
    pinnedData:  new Set<string>()
});

interface DashboardContextProviderProps {
    children: ReactNode;
}

export default function DashboardContextProvider({ children }: DashboardContextProviderProps) {
    const [sensorData, setSensorData] = useState<SensorMetric[]>([]);

    useEffect(() => {
        const stopSimulation = SimulateRealTimeData(100, 1000, (updates: SensorMetric[]) => {
          setSensorData(updates);
          
          
        });

        return () => {
          stopSimulation();
        };
    }, []);

    const pinData = useMemo(() => {
        
    }, [isExpanded]);


    const value = {
        sensorData,
        pinnedData: new Set<string>()
    };


    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}