// interface pinsProp {
//     pins: [{}]
// }

// const Pins: React.FC<pinsProp> = (pins) => {

//     return (
//         {
//             pins.map(metric => (
//                 <div className="metric-row">
//                     <span className="metric-icon">
//                         {metric.temperature === 'temperature' ? (
//                             <Temperature color="#FF7101" />
//                         ) : metric.humidity === 'humidity' ? (
//                             <Humidity color="#00FF00" />
//                         ) : (
//                             <AirQuality color="#00A3FF" />
//                         )}
//                     </span>
//                     <div className="metric-progress">
//                         <span className="metric-value">
//                             <p>{(metric === 'temperature' ?
//                                 values[0].temperature.toFixed(1) + "°C" :
//                                 metric === 'airQuality' ?
//                                     values[1].airQuality.toFixed(1) :
//                                     values[2].humidity.toFixed(1) + "%")}
//                             </p>
//                             <p>{(metric === 'temperature' ?
//                                 values[0].temperaturePercentage.toFixed(0) :
//                                 metric === 'airQuality' ?
//                                     values[1].airQualityPercentage.toFixed(0) :
//                                     values[2].humidityPercentage.toFixed(0))}%
//                             </p>
//                         </span>
//                         <div className="outer-bar">
//                             <div className={`inner-bar-${metric}`}
//                                 style={{
//                                     width:
//                                         `${metric === 'temperature' ? values[0].temperaturePercentage :
//                                             metric === 'airQuality' ? values[1].airQualityPercentage :
//                                                 values[2].humidity

//                                         }%`
//                                 }}></div>
//                         </div>
//                     </div>
//                 </div>
//             ))
//         }
//     )

// };
// export default Pins;