require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const { YSocketIO } = require('y-socket.io/dist/server');
const { connectDB } = require('./config/db');
const routes = require('./routes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

const clientOrigin = process.env.CLIENT_URL || 'http://localhost:5173';

function corsOrigin(origin, callback) {
  if (!origin) {
    return callback(null, true);
  }
  const allowed =
    origin === clientOrigin || /^http:\/\/localhost:\d+$/.test(origin);
  callback(null, allowed);
}

app.use(
  cors({
    origin: corsOrigin,
    credentials: true,
  }),
);
app.use(express.json({ limit: '4mb' }));

app.use('/api', routes);

app.use(errorHandler);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: corsOrigin,
    credentials: true,
    methods: ['GET', 'POST'],
  },
});

const ysocketio = new YSocketIO(io, { gcEnabled: true });
ysocketio.initialize();

function emitAppRoomCount(ioInstance, roomId) {
  const room = `app:${roomId}`;
  const size = ioInstance.sockets.adapter.rooms.get(room)?.size ?? 0;
  ioInstance.to(room).emit('room:count', { count: size });
}

/** Default namespace: room presence + chat (separate from /yjs|room Yjs namespaces) */
io.on('connection', (socket) => {
  let joinedRoom = null;

  socket.on('room:join', (roomId) => {
    if (joinedRoom) {
      socket.leave(`app:${joinedRoom}`);
      emitAppRoomCount(io, joinedRoom);
    }
    joinedRoom = String(roomId || '');
    if (!joinedRoom) return;
    socket.join(`app:${joinedRoom}`);
    emitAppRoomCount(io, joinedRoom);
  });

  socket.on('chat:message', (payload) => {
    const rid = String(payload?.roomId || '');
    if (!rid || !joinedRoom || rid !== joinedRoom) return;
    const msg = {
      id: `${socket.id}-${Date.now()}`,
      user: String(payload.user || 'Guest'),
      text: String(payload.text || ''),
      ts: Date.now(),
    };
    io.to(`app:${rid}`).emit('chat:message', msg);
  });

  socket.on('disconnecting', () => {
    if (!joinedRoom) return;
    const rid = joinedRoom;
    socket.once('disconnect', () => {
      emitAppRoomCount(io, rid);
    });
  });
});

const PORT = Number(process.env.PORT) || 5001;

async function start() {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`API: http://localhost:${PORT}/api`);
      console.log(`Socket.IO + Yjs namespaces: /yjs|<roomId>`);
    });
  } catch (err) {
    console.error('Failed to start server:', err.message);
    process.exit(1);
  }
}

start();
