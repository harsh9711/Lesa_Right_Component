import def from "ajv/dist/vocabularies/applicator/additionalItems";

export const viewSizeCalculator = (value, isPixel = false) => {
    const isNarrow = window.innerWidth / window.innerHeight < 2.5;
    let calculatedValue;

    if (isNarrow) {
        calculatedValue = isPixel
            ? (value / 1660) * 100
            : ((value * 16) / 1660) * 100;
    } else {
        calculatedValue = isPixel
            ? (value / 1660) * 100 * 0.78
            : ((value * 16) / 1660) * 100 * 0.78;
    }

    return `${calculatedValue.toFixed(2)}vw`;
};

export const viewHeightCalculator = (value, isPixel = false) => {
    const isNarrow = window.innerWidth / window.innerHeight < 2.5;
    let calculatedValue;

    if (isNarrow) {
        calculatedValue = isPixel
            ? (value / 900) * 100
            : ((value * 16) / 900) * 100;
    } else {
        calculatedValue = isPixel
            ? (value / 900) * 100 * 0.78
            : ((value * 16) / 900) * 100 * 0.78;
    }

    return `${calculatedValue.toFixed(2)}vh`;
};
