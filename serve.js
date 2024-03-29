
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3001;

const apiUrl = 'https://api.binance.com/api/v3';

// Middleware CORS
app.use(cors());

async function getChartData(symbol) {
  // Verificar se o símbolo contém apenas caracteres permitidos
  const regex = /^[A-Z0-9-_.]{1,20}$/;
  if (!regex.test(symbol)) {
    throw new Error("Símbolo inválido");
  }

  try {
    const response = await axios.get(`${apiUrl}/klines`, {
      params: {
        symbol: symbol,
        interval: '1s'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer solicitação para a API da Binance:', error);
    throw error;
  }
}

// Rota para obter dados do gráfico
app.get('/api/getChartData', async (req, res) => {
  try {
    const { symbol } = req.query;
    const data = await getChartData(symbol.trim()); // Remover espaços em branco em excesso
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Função para atualizar os dados do gráfico a cada minuto
async function atualizarDadosDoGrafico(symbol) {
  try {
    const novosDados = await getChartData(symbol);
    io.emit('novosDadosDoGrafico', novosDados); // Emitir evento para todos os clientes conectados
  } catch (error) {
    console.error('Erro ao atualizar dados do gráfico:', error);
  }
}

// Temporizador para chamar a função de atualização dos dados do gráfico a cada minuto
setInterval(() => {
  const symbol = 'BTCUSDT'; // Substitua 'BTCUSDT' pelo símbolo desejado
  atualizarDadosDoGrafico(symbol);
}, 10000); // 60000 milissegundos = 1 minuto

// Iniciar o servidor
server.listen(port, () => {
  console.log(`Servidor back-end está rodando em http://localhost:${port}`);
});