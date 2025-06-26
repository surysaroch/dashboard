# Real-Time Sensor Dashboard

## Overview

This project is a real-time sensor data dashboard built with React and TypeScript. It provides an interactive interface for monitoring, filtering, sorting, and pinning live sensor data. The application is designed with performance in mind and can support to up to 10000 sensors without performance decays.

## Main Features

*   **Live Sensor Data**: Displays real-time updates from multiple sensors.
*   **Filtering**: Filter data by temperature, humidity, air quality, and sensor ID.
*   **Sorting**: Sort by any metric or timestamp, ascending or descending.
*   **Pagination**: Efficiently browse large datasets with fast pagination.
*   **Pinning**: Pin up to 5 sensors for quick access and comparison.
*   **Responsive Design**: Optimized for both desktop and mobile devices.
  
## Project Structure
### Key Components

*   **`Dashboard.tsx`**:
    *   The main parent component.
    *   Manages global application state including filtering, sorting, and pagination logic.
    *   Renders the primary list of sensor data.
*   **`RowData.tsx`**:
    *   Responsible for displaying the metrics of a single sensor.
    *   Includes a pin button to add/remove the sensor from the pinned list.
    *   Displays the timestamp of the latest sensor reading.
*   **`Metric.tsx`**:
    *   A reusable component to display an individual metric (e.g., temperature, humidity, air quality).
    *   Features an icon representing the metric and an animated progress bar indicating its current value relative to its range.
*   **`Pins.tsx`**:
    *   Allows users to pin and unpin sensors.
    *   Displays a list of currently pinned sensors, also showing their recent history for quick comparison.
*   **`FilterSliders.tsx`**:
    * Provides the main filter panel UI, including sensor ID search and metric range filters.
    * Integrates with Sliders.tsx for range selection and passes filter changes up to the dashboard.
*   **`Sliders.tsx`**:
    * Renders a pair of range sliders for each metric (temperature, humidity, air quality), allowing users to set minimum and maximum values for filtering.
    * Designed for reusability and accessibility.
*   **`SortButton.tsx`**:
    * Provides a dropdown for selecting the metric to sort by (sensor ID, temperature, humidity, air quality, or timestamp) and a toggle button for ascending/descending order.
    * Notifies the dashboard of sort changes.
*   **`DashboardContext.tsx`**:
    *   Utilizes React's Context API to provide global state management.
    *   Manages shared data such as the main sensor data array, the set of pinned sensor IDs, and historical data.

## Performance Analysis

The dashboard has been optimized for performance, especially considering real-time data updates.

### Update Speed

*   **Efficient Rendering**: With the help of `React.memo`, `useMemo`, and `useCallback` hooks unecessary re-renders are minimized.
*   **Pagination**: Only the data for the currently visible page is rendered in the DOM, ensuring a fast and responsive UI even when dealing with potentially large underlying datasets.
*   **Update Latency**: Sensor data updates and corresponding UI refreshes typically occur within **20–30ms** with 100 sensors updating per second (measured with React DevTools Profiler).

### Memory Usage

*   **Lightweight State**: To manage memory effectively, especially with many sensors, only the latest 10 readings per sensor are kept in the client-side memory.
*   **Pin Limit**: Users are limited to pinning up to 5 sensors to prevent memory bloat.


## How to Run?

Follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/surysaroch/dashboard.git
    cd dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the application:**
    This will start the development server.
    ```bash
    npm run dev
    ```

---
