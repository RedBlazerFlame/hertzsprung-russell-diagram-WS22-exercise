// Returns an RGB color (copied and pasted from methods.ts to prevent a Reference Error from occuring)
const rgb = (r, g, b) => ({
    r: r,
    g: g,
    b: b
});
// Maps a spectral letter type to a number
export const LETTER_TYPE_TO_NUMERAL_MAP = new Map([
    ["O", 0],
    ["B", 1],
    ["A", 2],
    ["F", 3],
    ["G", 4],
    ["K", 5],
    ["M", 6]
]);
// Contains the maximum and minimum temperatures for each spectral type
export const TEMP_KEY_POINTS = [50000, 28000, 10000, 7500, 6000, 4900, 3500, 2000];
// Contains the colors of each spectral type (not including subtypes)
export const COLOR_KEY_POINTS = [rgb(101, 110, 251), rgb(140, 150, 255), rgb(202, 205, 255), rgb(255, 255, 255), rgb(255, 245, 104), rgb(255, 170, 81), rgb(254, 99, 68), rgb(254, 99, 68)];
// The sun's temperature in Kelvin
export const SUN_TEMPERATURE = 5823;
// Contains the luminosities of each spectral type (for main sequence stars)
export const LUMINOSITY_KEY_POINTS = [
    [800000, 90000],
    [52000, 95],
    [55, 8],
    [6.5, 2],
    [1.5, 0.66],
    [0.42, 0.1],
    [0.08, 0.001]
];
// All possible spectral string types
export const SPECTRAL_STRING_VALUES = ["O0", "O1", "O2", "O3", "O4", "O5", "O6", "O7", "O8", "O9", "B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "A0", "A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "F0", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "G0", "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9", "K0", "K1", "K2", "K3", "K4", "K5", "K6", "K7", "K8", "K9", "M0", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9"];
