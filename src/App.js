import "./App.css";
import { useEffect, useState } from "react";
import { data } from "./dataset";
import VisualizerComponent from "./modules/VisualizerComponent/VisualizerComponent";

function App() {
  const [classWiseStats, setClassWiseStats] = useState({});
  const [gammaClassWiseStats, setGammaClassWiseStats] = useState({});

  const calculateMean = (array) => {
    const sum = array.reduce((acc, value) => acc + value, 0);
    return sum / array.length;
  };

  // Utility function to calculate the median of an array
  const calculateMedian = (array) => {
    const sortedArray = array.slice().sort((a, b) => a - b);
    const middleIndex = Math.floor(sortedArray.length / 2);

    if (sortedArray.length % 2 === 0) {
      // If array length is even, return the average of the two middle values
      return (sortedArray[middleIndex - 1] + sortedArray[middleIndex]) / 2;
    } else {
      // If array length is odd, return the middle value
      return sortedArray[middleIndex];
    }
  };

  // Utility function to calculate the mode of an array
  const calculateMode = (array) => {
    const frequencyMap = {};
    array.forEach((value) => {
      frequencyMap[value] = (frequencyMap[value] || 0) + 1;
    });

    let mode;
    let maxFrequency = 0;

    for (const key in frequencyMap) {
      if (frequencyMap[key] > maxFrequency) {
        maxFrequency = frequencyMap[key];
        mode = key;
      }
    }

    return Number(mode);
  };

  // Function to calculate class-wise mean, median, and mode of "Flavanoids"
  const calculateClassWiseStats = (dataset) => {
    const classWiseStats = {};

    dataset.forEach((entry) => {
      const alcoholClass = entry["Alcohol"];
      const flavanoidsValue = parseFloat(entry["Flavanoids"]);

      if (!classWiseStats[alcoholClass]) {
        classWiseStats[alcoholClass] = [];
      }

      classWiseStats[alcoholClass].push(flavanoidsValue);
    });

    const result = {};

    for (const alcoholClass in classWiseStats) {
      const flavanoidsArray = classWiseStats[alcoholClass];

      result[alcoholClass] = {
        mean: calculateMean(flavanoidsArray),
        median: calculateMedian(flavanoidsArray),
        mode: calculateMode(flavanoidsArray),
      };
    }

    return result;
  };
  const calculateGammaAndClassWiseStats = (dataset) => {
    // Calculate "Gamma" for each point in the dataset
    dataset.forEach((entry) => {
      const ash = parseFloat(entry["Ash"]);
      const hue = parseFloat(entry["Hue"]);
      const magnesium = parseFloat(entry["Magnesium"]);

      entry["Gamma"] = (ash * hue) / magnesium;
    });

    // Calculate class-wise stats for "Gamma"
    const classWiseStats = {};

    dataset.forEach((entry) => {
      const alcoholClass = entry["Alcohol"];
      const gammaValue = entry["Gamma"];

      if (!classWiseStats[alcoholClass]) {
        classWiseStats[alcoholClass] = [];
      }

      classWiseStats[alcoholClass].push(gammaValue);
    });

    const result = {};

    for (const alcoholClass in classWiseStats) {
      const gammaArray = classWiseStats[alcoholClass];

      result[alcoholClass] = {
        mean: calculateMean(gammaArray),
        median: calculateMedian(gammaArray),
        mode: calculateMode(gammaArray),
      };
    }

    return result;
  };

  useEffect(() => {
    // Calculate class-wise stats
    const stats = calculateClassWiseStats(data);
    const gammaStats = calculateGammaAndClassWiseStats(data);
    // Update state with the calculated stats
    setClassWiseStats(stats);
    setGammaClassWiseStats(gammaStats);
  }, []);

  return (
    <div>
      {
        <VisualizerComponent
          classWiseStats={classWiseStats}
          gammaClassWiseStats={gammaClassWiseStats}
        />
      }
    </div>
  );
}

export default App;
