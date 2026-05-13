import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code2 } from 'lucide-react';
import { newRoomCode } from '@/utils/roomCode';
// import { Button } from '@/components/Button';
import { UserButton } from "@clerk/clerk-react";


export default function HomePage() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-zinc-900 to-zinc-950 px-4">
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600">
          <Code2 className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-white">CollabCode</h1>
          <p className="text-sm text-zinc-400">Real-time collaborative editor</p>
        </div>
      </div>

      <div className="w-full max-w-md space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl">
        <Button
          type="button"
          className="w-full"
          size="lg"
          onClick={() => navigate(`/r/${newRoomCode()}`)}
        >
          New room
        </Button>

        <div className="relative text-center text-xs text-zinc-500">
          <span className="bg-zinc-900 px-2">or join</span>
        </div>

        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.trim())}
            placeholder="Room code"
            className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500"
          />
          <Button
            type="button"
            variant="secondary"
            onClick={() => code && navigate(`/r/${code}`)}
            disabled={!code}
          >
            Join
          </Button>
        </div>
      </div>
    </div>
  );
}
