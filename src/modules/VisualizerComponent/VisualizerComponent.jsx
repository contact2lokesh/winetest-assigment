import React from "react";
import "./style.css";

const VisualizerComponent = ({ classWiseStats, gammaClassWiseStats }) => {
  const classLabels = Object.keys(classWiseStats);
  const gammaClassLabels = Object.keys(gammaClassWiseStats);
  console.log(classLabels);
  console.log(gammaClassLabels);
  return (
    <>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Measure</th>
            {classLabels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean</td>
            {classLabels.map((label) => (
              <td key={label}>{classWiseStats[label].mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Mode</td>
            {classLabels.map((label) => (
              <td key={label}>{classWiseStats[label].mode.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Median</td>
            {classLabels.map((label) => (
              <td key={label}>{classWiseStats[label].median.toFixed(3)}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <hr></hr>
      <table className="stats-table">
        <thead>
          <tr>
            <th>Measure</th>
            {gammaClassLabels.map((label) => (
              <th key={label}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mean Gamma</td>
            {gammaClassLabels.map((label) => (
              <td key={label}>{gammaClassWiseStats[label]?.mean.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Mode Gamma</td>
            {gammaClassLabels.map((label) => (
              <td key={label}>{gammaClassWiseStats[label]?.mode.toFixed(3)}</td>
            ))}
          </tr>
          <tr>
            <td>Median Gamma</td>
            {gammaClassLabels.map((label) => (
              <td key={label}>
                {gammaClassWiseStats[label]?.median.toFixed(3)}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default VisualizerComponent;
