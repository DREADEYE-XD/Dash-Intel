import chartAsJson from "../gameFiles/CapFrameX-Cyberpunk2077.exe-2022-09-17T143631.json";

function calculatePercentile(data, percentile) {
  const sortedData = [...data].sort((a, b) => a - b);
  const index = (percentile / 100) * (sortedData.length - 1);
  if (Number.isInteger(index)) return sortedData[index];
  const lowerIndex = Math.floor(index);
  const upperIndex = Math.ceil(index);
  const lowerValue = sortedData[lowerIndex];
  const upperValue = sortedData[upperIndex];
  const fraction = index - lowerIndex;
  return lowerValue + (upperValue - lowerValue) * fraction;
}

function calculateAverage(data) {
  return data.reduce((sum, value) => sum + value, 0) / data.length;
}

function calculateLowAverage(data, percentage) {
  const threshold = calculatePercentile(data, percentage);
  const lowValues = data.filter((value) => value <= threshold);
  return calculateAverage(lowValues);
}

// Implement fps calculating logic below this and replace chartAsJson with the logic
const msBetweenPresents = chartAsJson.Runs[0].CaptureData.MsBetweenPresents;
const fpsbetweenPresents = msBetweenPresents.map((item) => {
  return 1000 / item;
});

export const percentile95 = calculatePercentile(fpsbetweenPresents, 95);
export const average = calculateAverage(fpsbetweenPresents);
export const percentile5 = calculatePercentile(fpsbetweenPresents, 5);
export const percentile1 = calculatePercentile(fpsbetweenPresents, 1);
export const lowAverage1 = calculateLowAverage(fpsbetweenPresents, 1);
export const percentile0_2 = calculatePercentile(fpsbetweenPresents, 0.2);
export const percentile0_1 = calculatePercentile(fpsbetweenPresents, 0.1);
export const lowAverage0_1 = calculateLowAverage(fpsbetweenPresents, 0.1);