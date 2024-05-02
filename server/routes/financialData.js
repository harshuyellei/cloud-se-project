const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = '2XTV4NYBKGKHSQYB';

router.get('/financial-data', async (req, res) => {
    try {
        const { symbol } = req.query;  // Get the symbol from the query string
        const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`;
        const response = await axios.get(url);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching financial data:', error);
        res.status(500).send('Failed to fetch financial data');
    }
});

module.exports = router;
