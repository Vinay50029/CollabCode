import { useEffect, useRef, useState } from 'react';
import * as Y from 'yjs';
import { SocketIOProvider } from 'y-socket.io';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5001';

/**
 * One Y.Doc + SocketIOProvider per roomId. Cleans up on room change / unmount.
 */
export function useYjsRoom(roomId) {
  const [state, setState] = useState({
    doc: null,
    provider: null,
    sources: null,
    langs: null,
    synced: false,
  });

  const providerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    const doc = new Y.Doc();
    const sources = doc.getMap('sources');
    const langs = doc.getMap('langs');

    const provider = new SocketIOProvider(SOCKET_URL, roomId, doc, {
      disableBc: true,
    });

    providerRef.current = provider;

    setState({ doc, provider, sources, langs, synced: false });

    const onSynced = ([isSynced]) => {
      if (!cancelled) {
        setState({ doc, provider, sources, langs, synced: !!isSynced });
      }
    };

    provider.on('synced', onSynced);
    provider.connect();

    return () => {
      cancelled = true;
      provider.off('synced', onSynced);
      provider.destroy();
      providerRef.current = null;
      setState({
        doc: null,
        provider: null,
        sources: null,
        langs: null,
        synced: false,
      });
    };
  }, [roomId]);

  return state;
}
