// Import statements
import { getRadius, spectralTypeToColor, spectralTypeToLuminosity, spectralTypeToNumber, spectralTypeToTemperature, toSpectralType } from "../scripts/methods";
import { STARS } from "../scripts/starData";
import { SPECTRAL_STRING_VALUES } from "../scripts/constants";
// Getting a reference to html elements
const canvas = document.getElementById("drawingCanvas");
// Setting up Canvas
const ctx = canvas.getContext("2d");
const [WIDTH, HEIGHT] = [1123, 696];
// Extrapolating Star Data
STARS.forEach((item) => {
    const COLOR = spectralTypeToColor(item.spectralClass);
    const TEMPERATURE = spectralTypeToTemperature(item.spectralClass);
    const RADIUS = getRadius(item.luminosityRatio, TEMPERATURE);
    item.color = COLOR;
    item.temperature = TEMPERATURE;
    item.radius = RADIUS;
});
console.table(STARS);
// Drawing Black Background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, WIDTH, HEIGHT);
// Drawing Spectral Class Marker
// Seting up fill color
ctx.fillStyle = "white";
// Setting up fonts
ctx.font = "Arial 10px";
["O", "B", "A", "F", "G", "K", "M"].forEach((letter) => {
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((number) => {
        // Calculating coordinates
        const X = (spectralTypeToNumber({
            letterType: letter,
            numberSubtype: number
        }) * 0.99 + 0.005) * WIDTH;
        // Calculating Numerical Representation of Spectral Type
        const SPECTRAL_NUMBER = spectralTypeToNumber({
            letterType: letter,
            numberSubtype: number
        }) * 70;
        // Setting up Line Width
        ctx.lineWidth = 1;
        // Setting up Stroke Color
        ctx.strokeStyle = "rgba(255, 255, 255, 0.125)";
        // Draw Line
        ctx.beginPath();
        ctx.moveTo(X, HEIGHT);
        ctx.lineTo(X, 0);
        ctx.closePath();
        ctx.stroke();
        // Setting up Line Width
        if (SPECTRAL_NUMBER % 4 === 0) {
            ctx.lineWidth = 4;
        }
        else if (SPECTRAL_NUMBER % 2 === 0) {
            ctx.lineWidth = 2;
        }
        else {
            ctx.lineWidth = 1;
        }
        // Setting up Stroke Color
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        // Draw Line
        ctx.beginPath();
        ctx.moveTo(X, HEIGHT);
        ctx.lineTo(X, HEIGHT - 20);
        ctx.closePath();
        ctx.stroke();
        // Draw Label
        ctx.fillText(`${letter}${number}`, X, HEIGHT - 25);
    });
});
// Drawing Luminosity Markers
// Setting up Line Width
ctx.lineWidth = 1;
for (let i = -1; i < 6; i++) {
    // Calculating coordinates
    const Y = (1 - (i + 2) / 7.5) * HEIGHT;
    // Setting up Stroke Color
    ctx.strokeStyle = "rgba(255, 255, 255, 0.125)";
    // Draw Lines
    ctx.beginPath();
    ctx.moveTo(0, Y);
    ctx.lineTo(WIDTH, Y);
    ctx.closePath();
    ctx.stroke();
    // Setting up Stroke Color
    ctx.strokeStyle = "rgba(255, 255, 255, 1)";
    // Draw Lines
    ctx.beginPath();
    ctx.moveTo(0, Y);
    ctx.lineTo(20, Y);
    ctx.closePath();
    ctx.stroke();
    // Setting up fonts
    ctx.font = "Arial 6px";
    // Draw Label
    ctx.fillText(`${i}`, 40, Y);
    // Setting up fonts
    ctx.font = "Arial 10px";
    // Draw Label
    ctx.fillText(`10`, 30, Y + 5);
}
// Drawing Main Sequence Band
// Setting up fonts
ctx.font = "Arial 10px";
// Setting up Line Width
ctx.lineWidth = 1;
SPECTRAL_STRING_VALUES.reduce((acc, cur) => {
    // Calculating Luminosity
    const LUMINOSITY1 = spectralTypeToLuminosity(toSpectralType(acc));
    const LUMINOSITY2 = spectralTypeToLuminosity(toSpectralType(cur));
    // Calculating Coordinates
    const POS1 = {
        x: (spectralTypeToNumber(toSpectralType(`${acc}0`)) * 0.99 + 0.005) * WIDTH,
        y: (1 - (Math.log10(LUMINOSITY1) + 2) / 7.5) * HEIGHT
    };
    const POS2 = {
        x: (spectralTypeToNumber(toSpectralType(`${cur}0`)) * 0.99 + 0.005) * WIDTH,
        y: (1 - (Math.log10(LUMINOSITY2) + 2) / 7.5) * HEIGHT
    };
    // Setting up stroke color
    const COLOR = spectralTypeToColor(toSpectralType(acc));
    ctx.strokeStyle = `rgba(${COLOR.r}, ${COLOR.g}, ${COLOR.b}, 0.25)`;
    // Draw Line
    ctx.beginPath();
    ctx.moveTo(POS1.x, POS1.y);
    ctx.lineTo(POS2.x, POS2.y);
    ctx.closePath();
    ctx.stroke();
    return cur;
});
// Drawing Stars
// Setting up fonts
ctx.font = "Arial 10px";
ctx.textAlign = "center";
STARS.forEach((item) => {
    // Calculating Star Coordinates
    const POS = {
        x: (spectralTypeToNumber(item.spectralClass) * 0.99 + 0.005) * WIDTH,
        y: (1 - (Math.log10(item.luminosityRatio) + 2) / 7.5) * HEIGHT
    };
    // Setting fill color to star color
    ctx.fillStyle = (`rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, ${((Math.log10(item.luminosityRatio) + 2) / 7.5) / 4 * 3 + 0.25})` || "white");
    // Drawing the star
    ctx.beginPath();
    ctx.arc(POS.x, POS.y, Math.log10(item.radius || 10) + 3, 0, 2 * Math.PI);
    ctx.closePath();
    // Coloring in the star
    ctx.fill();
    // Printing Star Name
    // Setting color opacity to 1 (fully opaque)
    ctx.fillStyle = (`rgba(${item.color.r}, ${item.color.g}, ${item.color.b}, 1)` || "white");
    // Little hack... Display the name on the left if the star is Hadar (Hadar, Mimosa, and Spica are clumped together, so their names collide)
    if (item.name === "Hadar (Agena)") {
        ctx.fillText(item.name, POS.x + 40, POS.y);
    }
    else {
        ctx.fillText(item.name, POS.x, POS.y - 7.5);
    }
});
