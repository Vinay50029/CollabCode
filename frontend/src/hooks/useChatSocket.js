import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';

/**
 * Serverless Chat using Firebase Firestore
 */
export function useChatSocket(roomId, displayName) {
  const [connected, setConnected] = useState(false);
  const [peerCount, setPeerCount] = useState(1);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!roomId || !db) return;
    
    setConnected(true);
    
    const messagesRef = collection(db, 'rooms', roomId, 'messages');
    const q = query(messagesRef, orderBy('ts', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = [];
      snapshot.forEach((doc) => {
        msgs.push({
          message: doc.data().text, // Map to what the UI expects
          user: doc.data().user,
          ts: doc.data().ts
        });
      });
      setMessages(msgs);
    });

    return () => {
      unsubscribe();
      setConnected(false);
    };
  }, [roomId]);

  const sendMessage = async (text) => {
    if (!text.trim() || !roomId || !db) return;
    
    try {
      const messagesRef = collection(db, 'rooms', roomId, 'messages');
      await addDoc(messagesRef, {
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        user: displayName,
        text: text.trim(),
        ts: Date.now(),
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  // peerCount is now better handled by Yjs awareness in the EditorWorkspace
  return { connected, peerCount, messages, sendMessage };
}

