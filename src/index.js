const express = require('express')
const { createCanvas } = require('canvas');
const { createChart } = require('./chart');

const app = express()
const port = 3000



app.get('/', (req, res) => {
    res.send(`Chart service is running on port ${port}`);
});

app.get('/chart', (req, res) => {
    let decodedConfig, jsonConfig, options = {};
    // console.log(req);

    const config = req.query.config;
    if (req.query.width) {
        options.width = parseInt(req.query.width);
    }

    if (req.query.height) {
        options.height = parseInt(req.query.height);
    }

    try {
        decodedConfig = decodeURIComponent(config);
        jsonConfig = JSON.parse(decodedConfig);
        const chart = createChart(options, jsonConfig);
        res.setHeader('Content-Type', 'image/png');
        res.send(chart);
    } catch (error) {
        returnError(options, res, 'Invalid config');
        return;
    }


});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});


function returnError(options, res, message) {
    // Create a PNG image with the error message and return to the client
    const width = options.width || 800;
    const height = options.height || 400;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    // Set background color
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, width, height);

    // Set text properties
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Draw error message
    ctx.fillText(message, width / 2, height / 2);

    // Convert canvas to PNG and send response
    const buffer = canvas.toBuffer('image/png');
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
}