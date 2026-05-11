import { Link } from 'react-router';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import {
  Code2,
  Plus,
  Users,
  Clock,
  Settings,
  LogOut,
  Home,
  FolderCode,
  TrendingUp,
  Activity,
} from 'lucide-react';
import { useState } from 'react';

export function DashboardPage() {
  const [activeTab, setActiveTab] = useState('rooms');

  const recentRooms = [
    { id: '1', name: 'React Dashboard', language: 'React + Tailwind', members: 3, lastActive: '2 hours ago' },
    { id: '2', name: 'Landing Page', language: 'React + Tailwind', members: 5, lastActive: '1 day ago' },
    { id: '3', name: 'Component Library', language: 'React + Tailwind', members: 2, lastActive: '3 days ago' },
  ];

  const stats = [
    { label: 'Total Sessions', value: '24', icon: Activity, color: 'blue' },
    { label: 'Active Rooms', value: '3', icon: FolderCode, color: 'purple' },
    { label: 'Collaborators', value: '12', icon: Users, color: 'pink' },
    { label: 'Hours Coded', value: '48', icon: TrendingUp, color: 'green' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950">
      <div className="flex">
        <aside className="w-64 border-r border-white/10 bg-gray-900/50 backdrop-blur-xl min-h-screen p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-white">CodeSync</span>
          </div>

          <nav className="space-y-2 mb-8">
            <button
              onClick={() => setActiveTab('rooms')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === 'rooms'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Home className="w-5 h-5" />
              <span>My Rooms</span>
            </button>
            <button
              onClick={() => setActiveTab('recent')}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                activeTab === 'recent'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <Clock className="w-5 h-5" />
              <span>Recent</span>
            </button>
            <Link to="/profile">
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-gray-400 hover:bg-white/5 hover:text-white transition-all">
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </Link>
          </nav>

          <div className="mt-auto pt-8">
            <Card glass className="mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white">
                  JD
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm truncate">John Doe</p>
                  <p className="text-gray-400 text-xs">john@example.com</p>
                </div>
              </div>
            </Card>
            <Button variant="ghost" className="w-full justify-start text-gray-400">
              <LogOut className="w-5 h-5" />
              Log out
            </Button>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl text-white mb-2">Welcome back, John</h1>
                <p className="text-gray-400">Ready to code together?</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline">
                  <Plus className="w-5 h-5" />
                  Join Room
                </Button>
                <Link to="/editor">
                  <Button variant="primary">
                    <Plus className="w-5 h-5" />
                    Create Room
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-8">
              {stats.map((stat) => (
                <Card key={stat.label} glass hover>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                      <p className="text-3xl text-white">{stat.value}</p>
                    </div>
                    <div
                      className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}
                    >
                      <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mb-6">
              <h2 className="text-xl text-white mb-4">Recent Rooms</h2>
              <div className="grid gap-4">
                {recentRooms.map((room) => (
                  <Link key={room.id} to={`/editor/${room.id}`}>
                    <Card glass hover className="group">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Code2 className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-white text-lg mb-1">{room.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-gray-400">
                              <span className="flex items-center gap-1">
                                <FolderCode className="w-4 h-4" />
                                {room.language}
                              </span>
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {room.members} members
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {room.lastActive}
                              </span>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" className="group-hover:bg-white/10">
                          Open
                        </Button>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            <Card glass>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <Plus className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white text-lg mb-2">Create your first collaborative room</h3>
                  <p className="text-gray-400 mb-4">
                    Start coding together with your team in real-time. Share your room code and collaborate instantly.
                  </p>
                  <Link to="/editor">
                    <Button variant="primary">
                      <Plus className="w-5 h-5" />
                      Create New Room
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
