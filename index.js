const WebSocket = require('ws');

const cors = require ('cors')
app.use(cors());

const SYMBOL = "btcusdt";

const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${SYMBOL.toLowerCase()}@ticker`);


ws.onmessage = ( event) => {

 console.clear();
  const obj = JSON.parse(event.data);
  
  
  console.log("Crypto:" + obj.s);


  
  const formattedPrice = parseFloat(obj.a).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  console.log("Preço:" + formattedPrice);

}
