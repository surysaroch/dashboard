import React from "react";
interface sliderProps {
    onSlide: (metric: string, value: number, isMin: boolean) => void;
    metric: string;
    range: {
        min: number;
        max: number;
    };
}

// Sliders component: renders min and max range sliders for a given metric
const Sliders: React.FC<sliderProps> = ({ onSlide, metric, range }) => {
    return (
        <div>
            <label className="filter-label">{`${metric}`} Range</label>
            {/* Min value slider */}
            <div className="range-inputs-container">
                <input
                    className="filter-range-input"
                    type="range"
                    min={metric === "Temperature" ? 10 : metric === "Air Quality" ? 0 : 30}
                    max={range.max}
                    step={1}
                    value={range.min}
                    onChange={(e) => onSlide(metric, Number(e.target.value), true)}
                />
                <span className="range-value">
                    Min: {metric === "Temperature" ? range.min + "°C" : metric === "Humidity" ? range.min + "%" : range.min}
                </span>
            </div>
            {/* Max value slider */}
            <div className="range-inputs-container">
                <input
                    className="filter-range-input"
                    type="range"
                    min={range.min}
                    max={metric === "Temperature" ? 40 : metric === "Air Quality" ? 200 : 90}
                    step={1}
                    value={range.max}
                    onChange={(e) => onSlide(metric, Number(e.target.value), false)}
                />
                <span className="range-value">
                    Max: {metric === "Temperature" ? range.max + "°C" : metric === "Humidity" ? range.max + "%" : range.max}
                </span>
            </div>
        </div>
    );
};

export default React.memo(Sliders);