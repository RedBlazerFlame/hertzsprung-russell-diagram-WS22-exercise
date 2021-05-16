import { COLOR_KEY_POINTS, LETTER_TYPE_TO_NUMERAL_MAP, LUMINOSITY_KEY_POINTS, SUN_TEMPERATURE, TEMP_KEY_POINTS } from "../scripts/constants";
// Returns an RGB color
export const rgb = (r, g, b) => ({
    r: r,
    g: g,
    b: b
});
// Linear Interpolation
export const lerp = (num1, num2, t) => (1 - t) * num1 + t * num2;
export const lerpRGB = (color1, color2, t) => ({
    r: Math.floor(lerp(color1.r, color2.r, t)),
    g: Math.floor(lerp(color1.g, color2.g, t)),
    b: Math.floor(lerp(color1.b, color2.b, t))
});
// Logarithmic Interpolation
export const logerp = (num1, num2, t) => Math.pow(10, lerp(Math.log10(num1), Math.log10(num2), t));
// Converts the spectral type to a number ("O" maps to 0 and "M" maps to 6)
export const spectralLetterTypeToNumber = (letterType) => {
    return LETTER_TYPE_TO_NUMERAL_MAP.get(letterType) || 0;
};
// Converts the spectral type to a number (mapped to the interval [0, 1), where 0 (O0) is the hottest and 1 (M9) is the coolest )
export const spectralTypeToNumber = (spectralType) => {
    return (spectralLetterTypeToNumber(spectralType.letterType) * 10 + spectralType.numberSubtype) / 70;
};
// Converts the spectral type to a temperature in Kelvin ( using linear interpolation )
export const spectralTypeToTemperature = (spectralType) => {
    let lowerIndex = spectralLetterTypeToNumber(spectralType.letterType);
    return lerp(TEMP_KEY_POINTS[lowerIndex], TEMP_KEY_POINTS[lowerIndex + 1], spectralType.numberSubtype / 10);
};
// Converts the spectral type to a color ( using linear interpolation )
export const spectralTypeToColor = (spectralType) => {
    let lowerIndex = spectralLetterTypeToNumber(spectralType.letterType);
    return lerpRGB(COLOR_KEY_POINTS[lowerIndex], COLOR_KEY_POINTS[lowerIndex + 1], spectralType.numberSubtype / 10);
};
// Converts the spectral type to a luminosity ( using logarithmic interpolation )
export const spectralTypeToLuminosity = (spectralType) => {
    let index = spectralLetterTypeToNumber(spectralType.letterType);
    return logerp(LUMINOSITY_KEY_POINTS[index][0], LUMINOSITY_KEY_POINTS[index][1], spectralType.numberSubtype / 10);
};
// Gets the radius of a star (in stellar radii) given the ratio of luminosity between the star and the sun and the temperature of the star (in Kelvin)
export const getRadius = (luminosityRatio, temperature) => {
    return Math.pow(SUN_TEMPERATURE / temperature, 2) * Math.sqrt(luminosityRatio);
};
// Converts the spectral string type to a spectral type
export const toSpectralType = (str) => ({
    letterType: str.charAt(0),
    numberSubtype: (+str.charAt(1))
});
