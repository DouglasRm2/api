const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiUrl = 'https://api.binance.com/api/v3';

app.get('/api/getChartData', async (req, res) => {
  try {
    const { symbol } = req.query;
    const response = await axios.get(`${apiUrl}/klines?symbol=${symbol}&interval=1h`);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao fazer solicitação para a API da Binance:', error);
    res.status(500).json({ error: 'Erro ao fazer solicitação para a API da Binance' });
  }
});

app.listen(port, () => {
  console.log(`Servidor back-end está rodando em http://localhost:${port}`);
});
