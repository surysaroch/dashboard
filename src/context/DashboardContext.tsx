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
    pinnedData: Set<string>,
    pinnedDataFunction: (sensorId: string) => void
}

export const DashboardContext = createContext<DashboardContextType>({
    sensorData: [],
    pinnedData: new Set<string>(),
    pinnedDataFunction: () => {}, 
});

interface DashboardContextProviderProps {
    children: ReactNode;
}

export default function DashboardContextProvider({ children }: DashboardContextProviderProps) {
    const [sensorData, setSensorData] = useState<SensorMetric[]>([]);
    const [pinnedData, setPinnedData] = useState<Set<string>>(new Set());

    useEffect(() => {
        const stopSimulation = SimulateRealTimeData(100, 1000, (updates: SensorMetric[]) => {
            setSensorData(updates);


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
        pinnedDataFunction
    };



    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
}