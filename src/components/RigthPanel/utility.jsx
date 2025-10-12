export const viewSizeCalculator = (value, isPixel = false) => {
  const windowSize = window.innerWidth / window.innerHeight < 2.5;

  let calculatedValue;

  if (windowSize) {
    calculatedValue = isPixel
      ? (value / 1660) * 100
      : ((value * 16) / 1660) * 100;
  } else {
    calculatedValue = isPixel
      ? (value / 1660) * 100 * 0.78
      : ((value * 16) / 1660) * 100 * 0.78;
  }

  // return ${calculatedValue}vw;
  return `${calculatedValue?.toFixed(2)}vw` || 0; // Ensuring two decimal places

  // return addUnit ? ${calculatedValue}vw : calculatedValue;
};

export const viewHeightCalculator = (value, isPixel = false) => {
  const aspectRatioCheck = window.innerWidth / window.innerHeight < 2.5;

  let calculatedValue;

  if (aspectRatioCheck) {
    calculatedValue = isPixel
      ? (value / 900) * 100 // Adjust based on a standard height (900px as an example)
      : ((value * 16) / 900) * 100;
  } else {
    calculatedValue = isPixel
      ? (value / 900) * 100 * 0.78
      : ((value * 16) / 900) * 100 * 0.78;
  }

  return `${calculatedValue?.toFixed(2)}vh` || 0; // Returns value in vh units
};