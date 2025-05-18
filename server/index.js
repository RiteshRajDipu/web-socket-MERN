const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.isAlive = true;

  ws.on('pong', () => (ws.isAlive = true));

  ws.on('message', (msg) => {
    ws.send(`Echo: ${msg}`);
  });

  ws.send('Connected to WebSocket server!');
});

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (!ws.isAlive) return ws.terminate();
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);

app.get('/', (_, res) => res.send('Server is running.'));

server.listen(8080, () => {
  console.log('Server listening on http://localhost:8080');
});
