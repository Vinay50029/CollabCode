import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router';
import Editor from '@monaco-editor/react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from '../y-monaco-local';
import { Button } from '../components/Button';
import {
  Code2,
  Users,
  Play,
  Share2,
  MessageSquare,
  ChevronDown,
  Copy,
  Settings,
  Terminal as TerminalIcon,
  Send,
  Minimize2,
  Maximize2,
  Check,
} from 'lucide-react';

export function EditorPage() {
  const { roomId: urlRoomId } = useParams();
  const [roomId, setRoomId] = useState(urlRoomId || 'new-room-' + Math.random().toString(36).substr(2, 6));
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [showChat, setShowChat] = useState(true);
  const [showTerminal, setShowTerminal] = useState(true);
  const [chatMessage, setChatMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const editorRef = useRef(null);

  const connectedUsers = [
    { id: 1, name: 'You (Me)', color: '#3b82f6', active: true },
    { id: 2, name: 'Jane Smith', color: '#8b5cf6', active: true },
  ];

  const chatMessages = [
    { user: 'System', message: 'Welcome to the room!', time: 'Now', color: '#3b82f6' },
  ];

  const languages = ['javascript', 'typescript', 'python', 'html', 'css', 'json'];

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    // Initialize Yjs
    const doc = new Y.Doc();
    
    // Connect to the backend WebSocket
    const backendUrl = import.meta.env.VITE_BACKEND_URL || 'ws://localhost:5001';
    
    const provider = new WebsocketProvider(
      backendUrl, 
      `collab-room-${roomId}`, 
      doc
    );

    const type = doc.getText('monaco');

    // Bind Yjs to Monaco using the local binding
    const binding = new MonacoBinding(
      monaco,
      type, 
      editorRef.current.getModel(), 
      new Set([editorRef.current]), 
      provider.awareness
    );

    console.log(`✅ Connected to Room: ${roomId}`);
  }

  const copyInviteLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-screen bg-gray-950 flex flex-col overflow-hidden text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900/95 backdrop-blur-xl">
        <div className="flex items-center justify-between px-4 py-2.5">
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-white font-bold tracking-tight">CollabCode</span>
            </Link>
            <div className="h-6 w-px bg-gray-800"></div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/50 rounded-lg border border-gray-700">
              <span className="text-gray-400 text-sm">Room:</span>
              <span className="text-blue-400 text-sm font-mono font-medium">{roomId}</span>
              <button 
                onClick={copyInviteLink}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative group">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-gray-800 rounded-lg text-white hover:bg-gray-700 transition-all border border-gray-700">
                <span className="text-sm capitalize">{selectedLanguage}</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full right-0 mt-1 w-40 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 overflow-hidden">
                {languages.map(lang => (
                  <button 
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-blue-600 transition-colors capitalize"
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <Button variant="secondary" size="sm" className="gap-2">
              <Play className="w-4 h-4 text-green-400" />
              Run
            </Button>

            <Button variant="primary" size="sm" onClick={copyInviteLink} className="gap-2">
              <Share2 className="w-4 h-4" />
              {copied ? 'Copied!' : 'Share'}
            </Button>

            <button className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-gray-800">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r border-gray-800 bg-gray-900/50 flex flex-col">
          <div className="p-4 border-b border-gray-800">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-blue-400" />
              <h3 className="text-white font-medium">Collaborators</h3>
              <span className="ml-auto text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
                {connectedUsers.length}
              </span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {connectedUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors"
              >
                <div className="relative">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: user.color }}
                  >
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {user.active && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-gray-900 rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate font-medium">{user.name}</p>
                  <p className="text-gray-500 text-xs">
                    {user.active ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-800">
            <Button variant="secondary" className="w-full text-xs py-2" size="sm" onClick={copyInviteLink}>
              <Users className="w-3.5 h-3.5" />
              Invite Others
            </Button>
          </div>
        </aside>

        <div className="flex-1 flex flex-col">
          <div className="flex-1 bg-gray-950 overflow-hidden relative">
            <Editor
              height="100%"
              language={selectedLanguage}
              defaultValue="// Start coding together! 🚀"
              theme="vs-dark"
              onMount={handleEditorDidMount}
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', monospace",
                minimap: { enabled: true },
                automaticLayout: true,
                padding: { top: 16 },
                lineNumbersMinChars: 3,
                scrollBeyondLastLine: false,
              }}
            />
          </div>

          {showTerminal && (
            <div className="h-48 border-t border-gray-800 bg-gray-900 flex flex-col transition-all">
              <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/50">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="w-4 h-4 text-green-400" />
                  <span className="text-white text-xs font-mono uppercase tracking-wider">Terminal</span>
                </div>
                <button
                  onClick={() => setShowTerminal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1 p-4 font-mono text-sm overflow-auto bg-black/20">
                <div className="text-green-400 flex gap-2">
                  <span className="opacity-50">➜</span>
                  <span>npm run dev</span>
                </div>
                <div className="text-gray-400 mt-2">
                  [Vite] Ready in 240ms.
                  <br />
                  <span className="text-blue-400">➜</span> Local: http://localhost:5173/
                </div>
              </div>
            </div>
          )}

          {!showTerminal && (
            <button
              onClick={() => setShowTerminal(true)}
              className="px-4 py-2 border-t border-gray-800 bg-gray-900 text-gray-400 hover:text-white text-xs flex items-center gap-2 transition-all"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              Terminal
            </button>
          )}
        </div>

        {showChat && (
          <aside className="w-80 border-l border-gray-800 bg-gray-900/50 flex flex-col">
            <div className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900/50">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <h3 className="text-white font-medium">Team Chat</h3>
              </div>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className="group animate-in fade-in slide-in-from-bottom-2">
                  <div className="flex items-start gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0"
                      style={{ backgroundColor: msg.color }}
                    >
                      {msg.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white text-xs font-bold">{msg.user}</span>
                        <span className="text-gray-500 text-[10px]">{msg.time}</span>
                      </div>
                      <p className="text-gray-300 text-sm leading-relaxed">{msg.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  onKeyDown={(e) => e.key === 'Enter' && setChatMessage('')}
                />
                <button className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
