import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

/**
 * Second Socket.IO connection for room-scoped chat + presence counts.
 * Yjs uses its own namespace (/yjs|room) via y-socket.io.
 */
export function useChatSocket(roomId, displayName) {
  const [connected, setConnected] = useState(false);
  const [peerCount, setPeerCount] = useState(1);
  const [messages, setMessages] = useState([]);
  const socketRef = useRef(null);

  useEffect(() => {
    setMessages([]);
    const socket = io(SOCKET_URL, {
      transports: ['websocket'],
      autoConnect: true,
    });

    socketRef.current = socket;

    const onConnect = () => {
      setConnected(true);
      socket.emit('room:join', roomId);
    };

    const onDisconnect = () => setConnected(false);

    const onChat = (msg) => {
      setMessages((prev) => [...prev, msg]);
    };

    const onCount = ({ count }) => {
      if (typeof count === 'number') setPeerCount(count);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat:message', onChat);
    socket.on('room:count', onCount);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('chat:message', onChat);
      socket.off('room:count', onCount);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [roomId]);

  const sendMessage = (text) => {
    const s = socketRef.current;
    if (!s?.connected || !text.trim()) return;
    s.emit('chat:message', {
      roomId,
      user: displayName,
      text: text.trim(),
    });
  };

  return { connected, peerCount, messages, sendMessage };
}
