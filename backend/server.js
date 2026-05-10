const express = require('express');
const http = require('http');
const { setupWSConnection } = require('y-websocket/bin/utils');
const WebSocket = require('ws');
const cors = require('cors');

const app = express();
app.use(cors()); // Allows your frontend to talk to this server

const server = http.createServer(app);

// Initialize a WebSocket server
const wss = new WebSocket.Server({ noServer: true });

// This handles the "Upgrade" from standard HTTP to WebSockets
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

wss.on('connection', (conn, req) => {
  // setupWSConnection is a built-in helper from y-websocket 
  // that handles all the Yjs document syncing automatically.
  setupWSConnection(conn, req);
  console.log('✨ A new user joined a coding room');
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`🚀 CollabCode Backend running on http://localhost:${PORT}`);
  console.log(`📡 WebSocket server is ready`);
});