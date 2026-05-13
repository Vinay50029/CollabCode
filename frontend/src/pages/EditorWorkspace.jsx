import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Link, useParams } from 'react-router-dom';

import Editor from '@monaco-editor/react';

import * as monaco from 'monaco-editor';
import * as Y from 'yjs';

import { MonacoBinding } from '../y-monaco-local.js';

import {
  Copy,
  Play,
  Save,
  Send,
  Users,
  FilePlus,
  Trash2,
  Pencil,
  MessageSquare,
} from 'lucide-react';

import {
  Panel,
  PanelGroup,
  PanelResizeHandle,
} from 'react-resizable-panels';

import { useYjsRoom } from '@/hooks/useYjsRoom';
import { useChatSocket } from '@/hooks/useChatSocket';

import {
  fetchFiles,
  createFile,
  updateFile,
} from '@/services/filesApi';

import { executeCode } from '@/services/pistonApi';

import {
  getLanguageOption,
  LANGUAGE_OPTIONS,
  pistonFileName,
} from '@/utils/languages';

import { Button } from '@/components/Button';

const COLORS = [
  '#38bdf8',
  '#a78bfa',
  '#f472b6',
  '#34d399',
  '#fbbf24',
];

function displayNameStorage(user) {
  if (user?.fullName) return user.fullName;

  return `Dev-${Math.random().toString(36).slice(2, 6)}`;
}

export default function EditorWorkspace() {
  const { user } = useUser();

  const { roomId } = useParams();

  const { doc, provider, sources, langs, synced } =
    useYjsRoom(roomId);

  const displayName = useMemo(
    () => displayNameStorage(user),
    [user],
  );

  const userColor = useMemo(
    () =>
      COLORS[Math.floor(Math.random() * COLORS.length)],
    [],
  );

  const {
    peerCount,
    messages,
    sendMessage,
  } = useChatSocket(roomId, displayName);

  const [fileNames, setFileNames] = useState([]);

  const [activeFile, setActiveFile] =
    useState(null);

  const [language, setLanguage] =
    useState('javascript');

  const [output, setOutput] = useState('');

  const [outputErr, setOutputErr] =
    useState('');

  const [running, setRunning] =
    useState(false);

  const [copyOk, setCopyOk] =
    useState(false);

  const [chatInput, setChatInput] =
    useState('');

  const [awareUsers, setAwareUsers] =
    useState([]);

  const [chatOpen, setChatOpen] =
    useState(true);

  const editorRef = useRef(null);

  const bindingRef = useRef(null);

  const modelRef = useRef(null);

  const mongoByFileRef = useRef(new Map());

  const hydratedRef = useRef(false);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (!roomId) return;

    (async () => {
      try {
        const files = await fetchFiles(roomId);

        const m = new Map();

        files.forEach((f) =>
          m.set(f.filename, f),
        );

        mongoByFileRef.current = m;
      } catch (e) {
        console.warn(e.message);
      }
    })();
  }, [roomId]);

  useEffect(() => {
    hydratedRef.current = false;
  }, [roomId]);

  useEffect(() => {
    if (
      !synced ||
      !doc ||
      !sources ||
      !langs ||
      !roomId
    )
      return;

    if (hydratedRef.current) return;

    hydratedRef.current = true;

    (async () => {
      try {
        const files = await fetchFiles(roomId);

        const m = new Map();

        files.forEach((f) =>
          m.set(f.filename, f),
        );

        mongoByFileRef.current = m;

        doc.transact(() => {
          if (
            files.length === 0 &&
            sources.size === 0
          ) {
            const t = new Y.Text(
              '// Welcome to CollabCode\nconsole.log("Hello World");\n',
            );

            sources.set('main.js', t);

            langs.set(
              'main.js',
              'javascript',
            );
          } else {
            for (const f of files) {
              if (
                !sources.has(f.filename)
              ) {
                sources.set(
                  f.filename,
                  new Y.Text(
                    f.content || '',
                  ),
                );

                langs.set(
                  f.filename,
                  f.language ||
                    'javascript',
                );
              }
            }
          }
        });
      } catch (e) {
        console.warn(e.message);
      }
    })();
  }, [
    synced,
    doc,
    sources,
    langs,
    roomId,
  ]);

  useEffect(() => {
    if (!sources) return;

    const refresh = () => {
      const names = Array.from(
        sources.keys(),
      ).sort();

      setFileNames(names);
    };

    refresh();

    sources.observe(refresh);

    return () =>
      sources.unobserve(refresh);
  }, [sources]);

  useEffect(() => {
    if (
      !activeFile &&
      fileNames.length
    ) {
      setActiveFile(fileNames[0]);
    }

    if (
      activeFile &&
      !fileNames.includes(activeFile)
    ) {
      setActiveFile(
        fileNames[0] || null,
      );
    }
  }, [fileNames, activeFile]);

  useEffect(() => {
    if (!activeFile || !langs)
      return;

    const l = langs.get(activeFile);

    if (typeof l === 'string')
      setLanguage(l);
  }, [activeFile, langs]);

  useEffect(() => {
    if (!provider) return;

    provider.awareness.setLocalStateField(
      'user',
      {
        name: displayName,
        color: userColor,
      },
    );
  }, [
    provider,
    displayName,
    userColor,
  ]);

  useEffect(() => {
    if (!provider) return;

    const upd = () => {
      const rows = [];

      provider.awareness
        .getStates()
        .forEach((st, id) => {
          rows.push({
            id,
            name:
              st?.user?.name ||
              `Peer ${String(id).slice(
                -4,
              )}`,
            color:
              st?.user?.color ||
              '#94a3b8',
          });
        });

      setAwareUsers(rows);
    };

    upd();

    provider.awareness.on(
      'change',
      upd,
    );

    return () =>
      provider.awareness.off(
        'change',
        upd,
      );
  }, [provider]);

  const bindEditor = useCallback(
    (editor, monacoNs) => {
      if (
        !doc ||
        !sources ||
        !provider ||
        !activeFile ||
        !synced
      )
        return;

      bindingRef.current?.destroy();

      let ytext =
        sources.get(activeFile);

      if (!(ytext instanceof Y.Text)) {
        doc.transact(() => {
          const t = new Y.Text('');

          sources.set(
            activeFile,
            t,
          );

          ytext = t;
        });
      }

      const lang =
        langs.get(activeFile) ||
        language;

      const uri = monacoNs.Uri.parse(
        `file:///${roomId}/${activeFile}`,
      );

      let model =
        monacoNs.editor.getModel(
          uri,
        );

      if (!model) {
        model =
          monacoNs.editor.createModel(
            ytext.toString(),
            lang,
            uri,
          );
      }

      modelRef.current = model;

      editor.setModel(model);

      const binding =
        new MonacoBinding(
          monacoNs,
          ytext,
          model,
          new Set([editor]),
          provider.awareness,
        );

      bindingRef.current = binding;

      editorRef.current = editor;

      editor.focus();
    },
    [
      sources,
      provider,
      activeFile,
      langs,
      language,
      doc,
      roomId,
      synced,
    ],
  );

  const onMount = useCallback(
    (editor, monacoNs) => {
      bindEditor(editor, monacoNs);
    },
    [bindEditor],
  );

  useEffect(() => {
    if (
      editorRef.current &&
      activeFile &&
      synced
    ) {
      bindEditor(
        editorRef.current,
        monaco,
      );
    }
  }, [
    activeFile,
    synced,
    bindEditor,
  ]);

  const handleLanguageSelect = (
    next,
  ) => {
    setLanguage(next);

    if (
      !activeFile ||
      !langs ||
      !doc
    )
      return;

    doc.transact(() => {
      langs.set(activeFile, next);
    });

    if (modelRef.current) {
      monaco.editor.setModelLanguage(
        modelRef.current,
        next,
      );
    }
  };

  const handleSave = async () => {
    if (!activeFile || !sources)
      return;

    const ytext =
      sources.get(activeFile);

    const content =
      ytext instanceof Y.Text
        ? ytext.toString()
        : '';

    const meta =
      mongoByFileRef.current.get(
        activeFile,
      );

    try {
      if (meta?._id) {
        await updateFile(meta._id, {
          content,
          language,
        });
      } else {
        const f =
          await createFile({
            roomId,
            filename: activeFile,
            language,
            content,
          });

        mongoByFileRef.current.set(
          activeFile,
          f,
        );
      }

      setOutput(
        'Saved successfully',
      );
    } catch (e) {
      setOutputErr(e.message);
    }
  };

  const handleRun = async () => {
    if (!activeFile || !sources)
      return;

    const ytext =
      sources.get(activeFile);

    const content =
      ytext instanceof Y.Text
        ? ytext.toString()
        : '';

    const opt =
      getLanguageOption(language);

    setRunning(true);

    try {
      const result =
        await executeCode({
          language:
            opt.piston.language,
          version:
            opt.piston.version,
          filename:
            pistonFileName(opt),
          content,
        });

      setOutput(
        result?.run?.output ||
          'No output',
      );
    } catch (e) {
      setOutputErr(e.message);
    } finally {
      setRunning(false);
    }
  };

  const handleNewFile = () => {
    if (
      !doc ||
      !sources ||
      !langs
    )
      return;

    const name = `file-${Date.now()}.js`;

    doc.transact(() => {
      sources.set(
        name,
        new Y.Text(
          '// New file\n',
        ),
      );

      langs.set(name, language);
    });

    setActiveFile(name);
  };

  const handleRenameFile = (
    oldName,
  ) => {
    const newName = prompt(
      'Rename file',
      oldName,
    );

    if (
      !newName ||
      newName === oldName
    )
      return;

    const ytext =
      sources.get(oldName);

    const lang = langs.get(oldName);

    doc.transact(() => {
      sources.delete(oldName);

      langs.delete(oldName);

      sources.set(newName, ytext);

      langs.set(newName, lang);
    });

    setActiveFile(newName);
  };

  const handleDeleteFile = (
    name,
  ) => {
    doc.transact(() => {
      sources.delete(name);

      langs.delete(name);
    });

    if (activeFile === name) {
      setActiveFile(null);
    }
  };

  const copyLink = async () => {
    const url = `${window.location.origin}/editor/${roomId}`;

    await navigator.clipboard.writeText(
      url,
    );

    setCopyOk(true);

    setTimeout(
      () => setCopyOk(false),
      2000,
    );
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView(
      {
        behavior: 'smooth',
      },
    );
  }, [messages]);

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="flex flex-wrap items-center gap-2 border-b border-zinc-800 bg-zinc-900 px-3 py-2">
        <Link
          to="/dashboard"
          className="text-sm font-semibold text-blue-400 hover:underline"
        >
          CollabCode
        </Link>

        <span className="text-zinc-600">
          |
        </span>

        <code className="rounded bg-zinc-800 px-2 py-0.5 text-sm text-amber-200">
          {roomId}
        </code>

        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={copyLink}
          className="gap-1"
        >
          <Copy className="h-4 w-4" />

          {copyOk
            ? 'Copied'
            : 'Copy link'}
        </Button>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {!chatOpen && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                setChatOpen(true)
              }
              className="gap-1"
            >
              <MessageSquare className="h-4 w-4" />
              Chat
            </Button>
          )}

          <select
            value={language}
            onChange={(e) =>
              handleLanguageSelect(
                e.target.value,
              )
            }
            className="rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm"
          >
            {LANGUAGE_OPTIONS.map(
              (o) => (
                <option
                  key={o.id}
                  value={o.id}
                >
                  {o.label}
                </option>
              ),
            )}
          </select>

          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={handleSave}
            className="gap-1"
          >
            <Save className="h-4 w-4" />
            Save
          </Button>

          <Button
            type="button"
            size="sm"
            onClick={handleRun}
            disabled={running}
            className="gap-1"
          >
            <Play className="h-4 w-4" />

            {running
              ? 'Running…'
              : 'Run'}
          </Button>
        </div>
      </header>

      <PanelGroup
        direction="horizontal"
        className="flex-1"
      >
        <Panel
          defaultSize={18}
          minSize={14}
          className="border-r border-zinc-800 bg-zinc-900"
        >
          <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
            <span className="text-sm text-zinc-400">
              FILES
            </span>

            <button
              onClick={handleNewFile}
              className="rounded p-1 hover:bg-zinc-800"
            >
              <FilePlus className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-1 p-2">
            {fileNames.map((name) => (
              <div
                key={name}
                className={`group flex cursor-pointer items-center justify-between rounded px-2 py-2 text-sm ${
                  activeFile === name
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:bg-zinc-800/60'
                }`}
                onClick={() =>
                  setActiveFile(name)
                }
              >
                <span className="truncate">
                  {name}
                </span>

                <div className="hidden items-center gap-1 group-hover:flex">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      handleRenameFile(
                        name,
                      );
                    }}
                  >
                    <Pencil className="h-3.5 w-3.5" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();

                      handleDeleteFile(
                        name,
                      );
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-zinc-800 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs text-zinc-500">
              <Users className="h-3.5 w-3.5" />
              IN ROOM (~
              {peerCount})
            </div>

            <div className="space-y-2">
              {awareUsers.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center gap-2 text-sm"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{
                      background:
                        u.color,
                    }}
                  />

                  <span>{u.name}</span>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        <PanelResizeHandle className="w-[1px] bg-zinc-800" />

        <Panel
          defaultSize={
            chatOpen ? 57 : 82
          }
        >
          <div className="h-full">
            <Editor
              height="100%"
              theme="vs-dark"
              language={language}
              onMount={onMount}
              options={{
                minimap: {
                  enabled: false,
                },
                fontSize: 14,
                automaticLayout: true,
              }}
            />
          </div>
        </Panel>

        {chatOpen && (
          <>
            <PanelResizeHandle className="w-[1px] bg-zinc-800" />

            <Panel
              defaultSize={25}
              minSize={18}
              className="border-l border-zinc-800 bg-zinc-900"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
                <div className="flex items-center gap-2 text-zinc-400">
                  <MessageSquare className="h-4 w-4" />
                  Room chat
                </div>

                <button
                  onClick={() =>
                    setChatOpen(false)
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-md text-lg font-bold hover:bg-zinc-800"
                >
                  −
                </button>
              </div>

              <div className="flex h-[calc(100%-56px)] flex-col">
                <div className="flex-1 space-y-3 overflow-y-auto p-3">
                  {messages.map(
                    (m, i) => (
                      <div key={i}>
                        <p className="text-xs text-zinc-500">
                          {m.user}
                        </p>

                        <p className="text-sm text-zinc-200">
                          {m.message}
                        </p>
                      </div>
                    ),
                  )}

                  <div
                    ref={chatEndRef}
                  />
                </div>

                <div className="flex gap-2 border-t border-zinc-800 p-2">
                  <input
                    value={chatInput}
                    onChange={(e) =>
                      setChatInput(
                        e.target
                          .value,
                      )
                    }
                    placeholder="Message..."
                    className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm outline-none"
                  />

                  <button
                    onClick={() => {
                      if (
                        !chatInput.trim()
                      )
                        return;

                      sendMessage(
                        chatInput,
                      );

                      setChatInput(
                        '',
                      );
                    }}
                    className="rounded-lg bg-blue-600 px-3"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Panel>
          </>
        )}
      </PanelGroup>

      <div className="h-32 overflow-y-auto border-t border-zinc-800 bg-black p-3 text-sm">
        <div className="mb-2 text-zinc-500">
          OUTPUT
        </div>

        {outputErr && (
          <pre className="whitespace-pre-wrap text-red-400">
            {outputErr}
          </pre>
        )}

        {output && (
          <pre className="whitespace-pre-wrap text-green-400">
            {output}
          </pre>
        )}
      </div>
    </div>
  );
}