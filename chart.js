const { createCanvas, registerFont } = require('canvas');
const Chart = require('chart.js/auto');


function createChart(options, config) {
    // console.log(options);
    // console.log(JSON.stringify(config, null, 2));

    const width = options.width || 800;
    const height = options.height || 400;

    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    try {
        new Chart(ctx, config);
    } catch (error) {
        throw new Error('Invalid config');
    }

    return canvas.toBuffer();
}

module.exports = { createChart };